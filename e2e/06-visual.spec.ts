/**
 * 06 — Visual Screenshot QA
 *
 * Runs on `visual-desktop` and `visual-mobile` projects only.
 * Navigates all 22 slides, waits for real image readiness (not a fixed timeout),
 * captures a full-viewport screenshot, and checks for broken images / JS errors.
 *
 * Screenshots are saved as Playwright test artifacts and uploaded by visual.yml
 * for human review on every PR.  They are NOT stored in the repo.
 *
 * Usage:
 *   npx playwright test --project=visual-desktop,visual-mobile e2e/06-visual.spec.ts
 */

import { test, expect, type Page } from '@playwright/test'
import {
  loadDeck,
  loadMobileDeck,
  goToSlide,
  mobileScrollTo,
  trackPageErrors,
} from './helpers'

const TOTAL_SLIDES = 22

// ─── Image readiness ──────────────────────────────────────────────────────────

/**
 * Wait until all visible <img> elements (bounding box > 0) have finished loading.
 * Respects a 10 s timeout — long enough for Vercel Blob CDN images on slow CI runners.
 */
async function waitForImagesReady(page: Page): Promise<void> {
  await page.waitForFunction(
    () => {
      const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img'))
      const visible = imgs.filter((img) => {
        const r = img.getBoundingClientRect()
        return r.width > 0 && r.height > 0
      })
      return visible.every((img) => img.complete && img.naturalWidth > 0)
    },
    { timeout: 10_000 },
  ).catch(() => {
    // Non-fatal — some slides have no visible <img> elements (pure CSS/3D slides).
    // We still capture the screenshot; broken-image assertions below will catch real failures.
  })
}

// ─── Broken image detector ───────────────────────────────────────────────────

/**
 * Collect any 4xx/5xx responses for image requests (blob CDN + next/image optimised).
 * Returns unsubscribe function.
 */
function trackBrokenImages(page: Page): () => string[] {
  const broken: string[] = []
  const listener = (response: { url: () => string; status: () => number }) => {
    const url = response.url()
    const status = response.status()
    let isTrackedImageRequest = false
    try {
      const parsed = new URL(url)
      const host = parsed.hostname
      const path = parsed.pathname
      isTrackedImageRequest =
        // Exact subdomain check — prevents host-confusion attacks via substring matching
        host.endsWith('.blob.vercel-storage.com') ||
        path.startsWith('/_next/image') ||
        /\.(png|jpg|jpeg|webp|avif|gif|svg)$/i.test(path)
    } catch {
      // Ignore malformed URLs for classification purposes
    }
    if (status >= 400 && isTrackedImageRequest) {
      broken.push(`${status} ${url}`)
    }
  }
  page.on('response', listener)
  return () => [...broken]
}

// ─── Tests ───────────────────────────────────────────────────────────────────

test.describe('Visual screenshot QA', () => {
  // One test per slide so failures are individually labelled in the report
  for (let slideN = 1; slideN <= TOTAL_SLIDES; slideN++) {
    test(
      `Slide ${String(slideN).padStart(2, '0')} — visual + image check`,
      async ({ page }, testInfo) => {
        const errors = trackPageErrors(page)
        const getBroken = trackBrokenImages(page)
        const isMobileVisual = testInfo.project.name === 'visual-mobile'

        if (isMobileVisual) {
          await loadMobileDeck(page)
          await mobileScrollTo(page, slideN)
        } else {
          await loadDeck(page)
          await goToSlide(page, slideN)
        }
        await waitForImagesReady(page)

        // Capture screenshot as named artifact for human review in CI
        const screenshotPath = testInfo.outputPath(`slide-${String(slideN).padStart(2, '0')}.png`)
        await page.screenshot({ path: screenshotPath, fullPage: false })
        await testInfo.attach(`slide-${String(slideN).padStart(2, '0')}`, {
          path: screenshotPath,
          contentType: 'image/png',
        })

        // ── Assertions ────────────────────────────────────────────────────────

        // Slide container is visible and shows the correct slide
        const slideLocator = isMobileVisual
          ? page.locator(`[data-testid="mobile-slide-page"][data-slide-num="${slideN}"]`)
          : page.locator(`[data-testid="slide-container"][data-slide-id="${slideN}"]`)
        await expect(slideLocator).toBeVisible()

        // No broken image URLs (4xx/5xx) on this slide
        const brokenImages = getBroken()
        expect(
          brokenImages,
          `Broken images on slide ${slideN}:\n${brokenImages.join('\n')}`,
        ).toHaveLength(0)

        // No uncaught JS errors
        const jsErrors = errors()
        expect(
          jsErrors,
          `JS errors on slide ${slideN}:\n${jsErrors.map((e) => e.message).join('\n')}`,
        ).toHaveLength(0)
      },
    )
  }
})
