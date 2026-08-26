/**
 * 04 — All 22 Slides
 *
 * Verifies each slide renders correctly:
 *  - data-slide-id attribute matches slide number
 *  - Slide counter text contains current slide number
 *  - Chapter badge reflects correct chapter
 *  - Progress bar advances as slides progress
 *
 * Uses window.__deckGoTo() for fast programmatic navigation.
 *
 * Data-correctness tests (per-slide loop) run on Chromium only.
 * Content assertions are browser-agnostic; skipping WebKit reduces CI
 * from ~2 hours to ~20 minutes without losing coverage.
 */

import { test, expect } from '@playwright/test'
import { loadDeck, goToSlide, getCurrentSlide } from './helpers'

const TOTAL_SLIDES = 22

// Chapter mapping (1-indexed slide → chapter name)
const CHAPTER_MAP: Record<number, string> = {
  1: 'VISION', 2: 'VISION', 3: 'VISION',
  4: 'PROOF', 5: 'PROOF',
  6: 'OPPORTUNITY', 7: 'OPPORTUNITY', 8: 'OPPORTUNITY', 9: 'OPPORTUNITY',
  10: 'REVENUE', 11: 'REVENUE', 12: 'REVENUE', 13: 'REVENUE', 14: 'REVENUE',
  15: 'EVIDENCE', 16: 'EVIDENCE', 17: 'EVIDENCE', 18: 'EVIDENCE', 19: 'EVIDENCE',
  20: 'NUMBERS', 21: 'NUMBERS', 22: 'NUMBERS',
}

test.describe('All 22 Slides', () => {
  // --- Functional tests — run on ALL browsers (including WebKit CI) ---

  test('progress bar increases from slide 1 to slide 22', async ({ page }) => {
    await loadDeck(page)

    // Read the progress percentage directly from the data-pct attribute set by SlideProgress.
    // This is more reliable than measuring Framer Motion's animated style.width.
    const getPct = async () =>
      page
        .locator('[data-testid="slide-progress-fill"]')
        .evaluate((el: HTMLElement) => parseFloat(el.getAttribute('data-pct') ?? 'NaN') || 0)
        .catch(() => 0)

    const pct1 = await getPct()   // Should be ~4.55 (1/22 × 100)

    await goToSlide(page, 22)
    const pct22 = await getPct()  // Should be 100 (22/22 × 100)

    expect(pct22).toBeGreaterThan(pct1)
  })

  test('no uncaught errors while traversing all slides', async ({ page, browserName }) => {
    // 22 slides × ~2s per nav = ~44s on Chrome; WebKit CI is ~5× slower → 300s budget
    test.setTimeout(300_000)
    await loadDeck(page)

    const errors: Error[] = []
    page.on('pageerror', (e) => errors.push(e))

    const slideTO = browserName === 'chromium' ? 20_000 : 30_000
    for (let i = 1; i <= TOTAL_SLIDES; i++) {
      await goToSlide(page, i, slideTO)
    }

    // Brief settle on last slide
    await page.waitForTimeout(300)

    expect(
      errors,
      `Errors while traversing slides: ${errors.map((e) => e.message).join('\n')}`,
    ).toHaveLength(0)
  })

  // --- Data-correctness tests — Chromium only ---
  //
  // These 66 tests (22 slides × 3 assertions) verify slide IDs, counters, and chapter
  // badges. Content is entirely browser-agnostic; running them on WebKit would consume
  // ~2 hours of CI time (66 × ~55s loadDeck) for zero additional coverage value.
  test.describe('content verification', () => {
    test.beforeEach(async ({ page, browserName }) => {
      test.skip(browserName !== 'chromium', 'Data-correctness: Chromium-only for CI efficiency')
      await loadDeck(page)
    })

    for (let slideN = 1; slideN <= TOTAL_SLIDES; slideN++) {
      test(`Slide ${slideN} — renders with correct data-slide-id`, async ({ page }) => {
        await goToSlide(page, slideN)

        // Verify the slide container has the correct ID
        await expect(
          page.locator(`[data-testid="slide-container"][data-slide-id="${slideN}"]`),
        ).toBeVisible({ timeout: 8_000 })

        // Verify store state matches
        const current = await getCurrentSlide(page)
        expect(current).toBe(slideN)
      })

      test(`Slide ${slideN} — counter text contains ${slideN}`, async ({ page }) => {
        await goToSlide(page, slideN)

        const counter = page.locator('[data-testid="slide-counter"]')
        await expect(counter).toBeVisible()

        // Wait for counter animation to settle
        await expect
          .poll(async () => (await counter.textContent()) ?? '', { timeout: 4_000 })
          .toContain(String(slideN))
      })

      test(`Slide ${slideN} — chapter badge shows "${CHAPTER_MAP[slideN]}"`, async ({ page }) => {
        await goToSlide(page, slideN)

        const badge = page.locator('[data-testid="chapter-badge"]')
        await expect(badge).toBeVisible()

        await expect
          .poll(
            async () => ((await badge.textContent()) ?? '').toUpperCase(),
            { timeout: 4_000 },
          )
          .toContain(CHAPTER_MAP[slideN])
      })
    }
  })
})
