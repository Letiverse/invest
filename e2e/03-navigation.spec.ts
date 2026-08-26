/**
 * 03 — Navigation
 *
 * Covers all navigation input methods:
 *  - Click (prev/next buttons)
 *  - Keyboard (ArrowRight, ArrowLeft, Space, M, Escape)
 *  - Slide map jump
 *  - Boundary states (first/last slide button disabled)
 *
 * Scroll navigation tests are desktop-only (throttle-aware).
 */

import { test, expect } from '@playwright/test'
import { loadDeck, goToSlide, getCurrentSlide } from './helpers'

const TOTAL_SLIDES = 22

test.describe('Navigation — Click', () => {
  test.beforeEach(async ({ page }) => {
    await loadDeck(page)
  })

  test('next button advances to slide 2', async ({ page, browserName }) => {
    const navTO = browserName === 'chromium' ? 6_000 : 20_000
    await page.click('[aria-label="Next slide"]')
    await expect(
      page.locator('[data-testid="slide-container"][data-slide-id="2"]'),
    ).toBeVisible({ timeout: navTO })
    const n = await getCurrentSlide(page)
    expect(n).toBe(2)
  })

  test('prev button returns to slide 1 from slide 2', async ({ page, browserName }) => {
    // Three.js scene initialises ~1.5s after first load; on slow WebKit CI this can
    // block the JS thread briefly, making the first post-init navigation take longer.
    const navTO = browserName === 'chromium' ? 6_000 : 20_000
    await page.click('[aria-label="Next slide"]')
    await expect(
      page.locator('[data-testid="slide-container"][data-slide-id="2"]'),
    ).toBeVisible({ timeout: navTO })

    await page.click('[aria-label="Previous slide"]')
    await expect(
      page.locator('[data-testid="slide-container"][data-slide-id="1"]'),
    ).toBeVisible({ timeout: navTO })

    const n = await getCurrentSlide(page)
    expect(n).toBe(1)
  })

  test('prev button is disabled on slide 1', async ({ page }) => {
    const prevBtn = page.locator('[aria-label="Previous slide"]')
    await expect(prevBtn).toBeDisabled()
  })

  test('next button is hidden on last slide', async ({ page }) => {
    await goToSlide(page, TOTAL_SLIDES)
    const nextBtn = page.locator('[aria-label="Next slide"]')
    await expect(nextBtn).toBeHidden()
  })

  test('can advance through all 22 slides sequentially', async ({ page, browserName }) => {
    // 22 slides × ~700 ms on Chrome; WebKit CI is ~5× slower → generous 300s budget
    test.setTimeout(300_000)
    const navTO = browserName === 'chromium' ? 10_000 : 30_000
    for (let i = 2; i <= TOTAL_SLIDES; i++) {
      await page.click('[aria-label="Next slide"]')
      await expect(
        page.locator(`[data-testid="slide-container"][data-slide-id="${i}"]`),
      ).toBeVisible({ timeout: navTO })
    }
    const n = await getCurrentSlide(page)
    expect(n).toBe(TOTAL_SLIDES)
  })
})

test.describe('Navigation — Keyboard', () => {
  test.beforeEach(async ({ page, browserName }) => {
    // Keyboard events from page.keyboard.press() are not reliably received on
    // touch-emulated WebKit CI (iphone-landscape, mobile-portrait). Keyboard
    // navigation is a desktop-only interaction — skip these projects entirely.
    test.skip(browserName !== 'chromium', 'Keyboard events are not reliable on touch-emulated WebKit CI')
    await loadDeck(page)
    // Focus the page body so keyboard events are received
    await page.click('body')
  })

  test('ArrowRight advances slide', async ({ page }) => {
    await page.keyboard.press('ArrowRight')
    await expect(
      page.locator('[data-testid="slide-container"][data-slide-id="2"]'),
    ).toBeVisible({ timeout: 6_000 })
  })

  test('ArrowLeft goes to previous slide', async ({ page }) => {
    await page.keyboard.press('ArrowRight')
    await expect(
      page.locator('[data-testid="slide-container"][data-slide-id="2"]'),
    ).toBeVisible({ timeout: 6_000 })

    await page.keyboard.press('ArrowLeft')
    await expect(
      page.locator('[data-testid="slide-container"][data-slide-id="1"]'),
    ).toBeVisible({ timeout: 6_000 })
  })

  test('Space advances slide', async ({ page }) => {
    await page.keyboard.press('Space')
    await expect(
      page.locator('[data-testid="slide-container"][data-slide-id="2"]'),
    ).toBeVisible({ timeout: 6_000 })
  })

  test('M key opens slide map', async ({ page }) => {
    await page.keyboard.press('m')
    await expect(page.locator('[data-testid="slide-map"]')).toBeVisible({ timeout: 4_000 })
  })

  test('Escape closes slide map when open', async ({ page }) => {
    await page.keyboard.press('m')
    await expect(page.locator('[data-testid="slide-map"]')).toBeVisible({ timeout: 4_000 })

    await page.keyboard.press('Escape')
    await expect(page.locator('[data-testid="slide-map"]')).toBeHidden({ timeout: 4_000 })
  })

  test('ArrowRight does not go past last slide', async ({ page }) => {
    await goToSlide(page, TOTAL_SLIDES)
    await page.click('body')
    await page.keyboard.press('ArrowRight')
    // Brief pause — should stay on last slide
    await page.waitForTimeout(500)
    const n = await getCurrentSlide(page)
    expect(n).toBe(TOTAL_SLIDES)
  })
})

test.describe('Navigation — Slide Map', () => {
  test.beforeEach(async ({ page }) => {
    await loadDeck(page)
  })

  test('slide map opens via button', async ({ page }) => {
    await page.click('[aria-label="Slide map"]')
    await expect(page.locator('[data-testid="slide-map"]')).toBeVisible({ timeout: 4_000 })
  })

  test('slide map closes via button click again', async ({ page }) => {
    await page.click('[aria-label="Slide map"]')
    await expect(page.locator('[data-testid="slide-map"]')).toBeVisible({ timeout: 4_000 })

    await page.click('[aria-label="Slide map"]')
    await expect(page.locator('[data-testid="slide-map"]')).toBeHidden({ timeout: 10_000 })
  })

  test('clicking slide 10 in map navigates to slide 10', async ({ page }) => {
    await page.click('[aria-label="Slide map"]')
    await expect(page.locator('[data-testid="slide-map"]')).toBeVisible({ timeout: 4_000 })

    // Map buttons are indexed; click the 10th slide button
    const slideButtons = page.locator('[data-testid="slide-map-btn"]')
    await slideButtons.nth(9).click()

    await expect(
      page.locator('[data-testid="slide-container"][data-slide-id="10"]'),
    ).toBeVisible({ timeout: 8_000 })

    const n = await getCurrentSlide(page)
    expect(n).toBe(10)
  })

  test('map closes after navigating to a slide', async ({ page }) => {
    await page.click('[aria-label="Slide map"]')
    await expect(page.locator('[data-testid="slide-map"]')).toBeVisible({ timeout: 4_000 })

    const slideButtons = page.locator('[data-testid="slide-map-btn"]')
    await slideButtons.nth(4).click()

    // Map should auto-close
    await expect(page.locator('[data-testid="slide-map"]')).toBeHidden({ timeout: 4_000 })
  })
})

test.describe('Navigation — Scroll (desktop only)', () => {
  test.skip(({ viewport }) => {
    if (!viewport) return true
    // Tablet-landscape is 1024px — mouse.wheel doesn't reliably fire scroll events
    // on touch-capable device emulations. Only test on true desktop (> 1024px).
    return viewport.width <= 1024
  }, 'Scroll navigation only tested on desktop viewports (> 1024px)')

  test.beforeEach(async ({ page }) => {
    await loadDeck(page)
    await page.click('body')
  })

  test('scroll down advances the slide', async ({ page }) => {
    const before = await getCurrentSlide(page)

    await page.mouse.wheel(0, 200)

    // Scroll nav has 600ms throttle — wait for it to register
    await expect.poll(
      async () => getCurrentSlide(page),
      { timeout: 4_000, intervals: [300, 300, 300, 300, 300] },
    ).not.toBe(before)

    const after = await getCurrentSlide(page)
    expect(after).toBeGreaterThan(before ?? 0)
  })

  test('scroll up goes to previous slide', async ({ page }) => {
    // Move to slide 2 first
    await goToSlide(page, 2)
    await page.mouse.wheel(0, -200)

    await expect.poll(
      async () => getCurrentSlide(page),
      { timeout: 4_000, intervals: [300, 300, 300, 300, 300] },
    ).toBe(1)
  })
})
