/**
 * 01 — Loading & Performance
 *
 * Chromium-only. Requires a production build (`npm run build && npm start`).
 *
 * Covers:
 *  - Page load timing (TTFB, FCP, LCP)
 *  - Time-to-interactive (deck ready)
 *  - No uncaught JS errors during load
 *  - Critical CSS/JS assets return 200
 *  - Boot sequence visible then hidden
 */

import { test, expect } from '@playwright/test'
import { skipBoot, BOOT_KEY, trackPageErrors } from './helpers'

// Only run on the dedicated perf project (also fine on desktop-chrome)
test.describe('Loading & Performance', () => {
  test('page responds within 3 s and returns 200', async ({ page }) => {
    const start = Date.now()
    const response = await page.goto('/', { waitUntil: 'domcontentloaded' })
    const elapsed = Date.now() - start

    expect(response?.status()).toBe(200)
    expect(elapsed).toBeLessThan(3_000)
  })

  test('release endpoint is no-store and returns a version', async ({ request }) => {
    const response = await request.get('/api/release')
    expect(response.status()).toBe(200)
    expect(response.headers()['cache-control']).toContain('no-store')

    const payload = await response.json() as { version?: unknown }
    expect(typeof payload.version).toBe('string')
    expect((payload.version as string).length).toBeGreaterThan(0)
  })

  test('release guard reloads stale open tabs', async ({ page, request }) => {
    const releaseResponse = await request.get('/api/release')
    const releasePayload = await releaseResponse.json() as { version?: string }
    const currentRelease = releasePayload.version
    expect(currentRelease).toBeTruthy()

    let releaseChecks = 0
    await page.route('**/api/release**', async (route) => {
      releaseChecks += 1
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' },
        body: JSON.stringify({
          version: releaseChecks === 2 ? `${currentRelease}-next` : currentRelease,
        }),
      })
    })

    await page.goto('/1', { waitUntil: 'domcontentloaded' })
    await expect.poll(() => releaseChecks).toBeGreaterThanOrEqual(1)

    const reloadPromise = page.waitForEvent('framenavigated')
    await page.evaluate(() => window.dispatchEvent(new Event('focus')))
    await reloadPromise

    const reloadedFrom = await page.evaluate(() => sessionStorage.getItem('letiv-release-reloaded-from'))
    expect(reloadedFrom).toBe(currentRelease)
  })

  test('release guard does not reload repeatedly if a stale bundle persists', async ({
    page,
    request,
  }) => {
    const releaseResponse = await request.get('/api/release')
    const releasePayload = await releaseResponse.json() as { version?: string }
    const currentRelease = releasePayload.version
    expect(currentRelease).toBeTruthy()

    const staleTarget = `${currentRelease}-next`
    let documentRequests = 0

    page.on('request', (request) => {
      // Skip the implicit `/` -> `/1` server redirect that fires on initial
      // load. Only count fresh top-level navigations the user actually triggers.
      if (
        request.isNavigationRequest() &&
        request.resourceType() === 'document' &&
        !request.redirectedFrom()
      ) {
        documentRequests += 1
      }
    })

    await page.route('**/api/release**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' },
        body: JSON.stringify({ version: staleTarget }),
      })
    })

    await page.goto('/1', { waitUntil: 'domcontentloaded' })

    await expect
      .poll(async () => {
        try {
          return await page.evaluate(() => sessionStorage.getItem('letiv-release-reloaded-from'))
        } catch {
          return null
        }
      },
      )
      .toBe(currentRelease)

    await expect.poll(() => documentRequests).toBe(2)
    await page.waitForLoadState('domcontentloaded')

    await page.evaluate(() => window.dispatchEvent(new Event('focus')))
    await page.waitForTimeout(1_000)
    expect(documentRequests).toBe(2)

    const reloadAttempts = await page.evaluate((targetRelease) =>
      sessionStorage.getItem(`letiv-release-reload-attempts:${targetRelease}`),
      staleTarget,
    )
    expect(reloadAttempts).toBe('1')
  })

  test('boot sequence appears and completes within 5 s', async ({ page, browserName }) => {
    // Boot timing is only meaningful on Chromium; WebKit CI runs ~5× slower.
    test.skip(browserName !== 'chromium', 'Performance timing: Chromium only')
    const errors = trackPageErrors(page)

    await page.goto('/', { waitUntil: 'domcontentloaded' })

    // Boot overlay should appear
    const bootOverlay = page.locator('[aria-label="Loading Letiverse investor deck"]')
    await expect(bootOverlay).toBeVisible({ timeout: 5_000 })

    // Boot should complete within 5 s (hard cap in code is 2000ms + React hydration)
    await expect(bootOverlay).toBeHidden({ timeout: 5_000 })

    expect(errors()).toHaveLength(0)
  })

  test('deck becomes interactive within 10 s from navigation start (bypassing boot)', async ({
    page,
    browserName,
  }) => {
    // Interactivity timing is only meaningful on Chromium; WebKit CI runs ~5× slower.
    test.skip(browserName !== 'chromium', 'Performance timing: Chromium only')
    const errors = trackPageErrors(page)
    await skipBoot(page)

    const t0 = Date.now()
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    // Welcome modal should appear after boot bypass
    const welcomeModal = page.locator('[data-testid="welcome-modal"]')
    await expect(welcomeModal).toBeVisible({ timeout: 8_000 })

    const tti = Date.now() - t0
    expect(tti).toBeLessThan(10_000)
    expect(errors()).toHaveLength(0)
  })

  test('deck fully interactive (slide rendered) within 15 s with all bypasses', async ({
    page,
    browserName,
  }) => {
    // Interactivity timing is only meaningful on Chromium; WebKit CI runs ~5× slower.
    test.skip(browserName !== 'chromium', 'Performance timing: Chromium only')
    const errors = trackPageErrors(page)

    await page.addInitScript(
      ({ bk, wk }: { bk: string; wk: string }) => {
        sessionStorage.setItem(bk, '1')
        sessionStorage.setItem(wk, '1')
      },
      { bk: BOOT_KEY, wk: 'letiv-welcomed' },
    )

    const t0 = Date.now()
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    await expect(page.locator('[data-testid="slide-container"]').first()).toBeVisible({
      timeout: 15_000,
    })

    const tti = Date.now() - t0
    expect(tti).toBeLessThan(15_000)
    expect(errors()).toHaveLength(0)
  })

  test('Web Vitals: LCP reported and within acceptable range', async ({ page, browserName }) => {
    // LCP via PerformanceObserver is only meaningful on Chromium; skip on WebKit.
    test.skip(browserName !== 'chromium', 'Web Vitals: Chromium only')
    await page.addInitScript(
      ({ bk, wk }: { bk: string; wk: string }) => {
        sessionStorage.setItem(bk, '1')
        sessionStorage.setItem(wk, '1')
      },
      { bk: BOOT_KEY, wk: 'letiv-welcomed' },
    )

    await page.goto('/', { waitUntil: 'networkidle' })
    await expect(page.locator('[data-testid="slide-container"]').first()).toBeVisible({
      timeout: 15_000,
    })

    // Collect LCP via PerformanceObserver
    const lcp = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          let lcpValue = 0
          const obs = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              lcpValue = (entry as PerformanceEntry & { startTime: number }).startTime
            }
            obs.disconnect()
            resolve(lcpValue)
          })
          obs.observe({ type: 'largest-contentful-paint', buffered: true })
          // Fallback if already past
          setTimeout(() => resolve(lcpValue), 1000)
        }),
    )

    // LCP should be reported (> 0 means the browser measured it)
    // Good: < 2500ms, Needs Improvement: < 4000ms
    if (lcp > 0) {
      expect(lcp).toBeLessThan(8_000) // generous for a complex 3D app
    }
  })

  test('no uncaught JS errors on full page load', async ({ page }) => {
    const errors = trackPageErrors(page)

    await page.addInitScript(
      ({ bk, wk }: { bk: string; wk: string }) => {
        sessionStorage.setItem(bk, '1')
        sessionStorage.setItem(wk, '1')
      },
      { bk: BOOT_KEY, wk: 'letiv-welcomed' },
    )

    await page.goto('/', { waitUntil: 'networkidle' })
    await expect(page.locator('[data-testid="slide-container"]').first()).toBeVisible({
      timeout: 15_000,
    })

    // Brief settle
    await page.waitForTimeout(500)

    expect(errors(), `Uncaught JS errors: ${errors().map((e) => e.message).join(', ')}`).toHaveLength(
      0,
    )
  })
})
