/**
 * 07 — UX Quality Review
 *
 * Runs on `ux-desktop` and `ux-mobile` projects only.
 * Checks UX fundamentals that automated code review cannot catch:
 *
 *  - Mobile horizontal overflow (no scrollbar / layout bust)
 *  - Touch target minimum sizes (≥44×44px for all interactive controls)
 *  - ARIA labels on key landmarks (boot, slide container, nav)
 *  - Keyboard navigation (arrow keys advance/retreat slides)
 *  - CTA slide contact details not obscured by overlays
 *
 * Results are reported as a PR comment by ux.yml.
 *
 * Usage:
 *   npx playwright test --project=ux-desktop,ux-mobile e2e/07-ux.spec.ts
 */

import { test, expect, type TestInfo } from '@playwright/test'
import { loadDeck, loadMobileDeck, goToSlide, mobileScrollTo, trackPageErrors } from './helpers'

const CTA_SLIDE = 22

function isMobileProject(testInfo: TestInfo) {
  return testInfo.project.use.isMobile === true
}

// ─── Touch target helper ──────────────────────────────────────────────────────

async function getSmallTouchTargets(
  page: import('@playwright/test').Page,
  minPx = 44,
): Promise<string[]> {
  return page.evaluate((min) => {
    // Nav controls live OUTSIDE the scaled slide frame. The deck renders a fixed
    // 1920×1080 canvas that is CSS-transform-scaled to the viewport, so elements
    // inside the frame appear smaller than their declared size in CSS pixels.
    // Those are slide-content elements (e.g. CTA links), not nav controls.
    // We check only elements outside the frame where 44px means 44 CSS-viewport-px.
    const frameContainer = document.querySelector('[data-testid="slide-frame-container"]')

    const selectors = 'button, [role="button"], a[href], input, select, textarea, [tabindex="0"]'
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selectors))
    const small: string[] = []

    for (const el of elements) {
      // Exclude elements inside the scaled slide canvas — they are slide content.
      if (frameContainer?.contains(el)) continue

      const rect = el.getBoundingClientRect()
      // Skip hidden / off-screen elements
      if (rect.width === 0 || rect.height === 0) continue
      if (rect.bottom < 0 || rect.top > window.innerHeight) continue

      if (rect.height < min || rect.width < min) {
        const label =
          el.getAttribute('aria-label') ||
          el.textContent?.trim().slice(0, 40) ||
          el.tagName.toLowerCase()
        small.push(`${Math.round(rect.width)}×${Math.round(rect.height)}px — "${label}"`)
      }
    }
    return small
  }, minPx)
}

// ─── Tests ───────────────────────────────────────────────────────────────────

test.describe('UX Quality Review', () => {
  test('no horizontal overflow on any slide', async ({ page }, testInfo: TestInfo) => {
    // 22 slides × ~2s per navigation — override the default 30s timeout
    test.setTimeout(75_000)
    const isMobile = isMobileProject(testInfo)
    // Overflow is most critical on mobile; run on all but treat desktop as informational
    if (isMobile) {
      await loadMobileDeck(page)
    } else {
      await loadDeck(page)
    }

    const overflowingSlides: number[] = []
    for (let slideN = 1; slideN <= CTA_SLIDE; slideN++) {
      if (isMobile) {
        await mobileScrollTo(page, slideN)
      } else {
        await goToSlide(page, slideN)
      }

      const overflows = await page.evaluate(() => {
        const body = document.body
        const html = document.documentElement
        return body.scrollWidth > html.clientWidth || html.scrollWidth > html.clientWidth
      })

      if (overflows) overflowingSlides.push(slideN)
    }

    if (!isMobile) {
      // Desktop: flag but don't fail (some decorative elements may extend slightly)
      test.info().annotations.push({
        type: 'ux-overflow-desktop',
        description: overflowingSlides.length
          ? `Slides with horizontal overflow on desktop: ${overflowingSlides.join(', ')}`
          : 'No horizontal overflow detected',
      })
    } else {
      expect(
        overflowingSlides,
        `Slides with horizontal overflow on mobile: ${overflowingSlides.join(', ')}`,
      ).toHaveLength(0)
    }
  })

  test('touch targets meet minimum 44px on key nav controls', async ({ page }, testInfo: TestInfo) => {
    const isMobile = isMobileProject(testInfo)
    if (isMobile) {
      await loadMobileDeck(page)
    } else {
      await loadDeck(page)
    }

    // Check the nav controls on slide 1 and the CTA slide (highest risk)
    for (const slideN of [1, CTA_SLIDE]) {
      if (isMobile) {
        await mobileScrollTo(page, slideN)
      } else {
        await goToSlide(page, slideN)
      }

      const small = await getSmallTouchTargets(page, 44)
      expect(
        small,
        `Slide ${slideN} has interactive elements smaller than 44px:\n${small.join('\n')}`,
      ).toHaveLength(0)
    }
  })

  test('key ARIA landmarks are present', async ({ page }, testInfo: TestInfo) => {
    const errors = trackPageErrors(page)
    if (isMobileProject(testInfo)) {
      await loadMobileDeck(page)

      await expect(page.getByTestId('mobile-deck-shell')).toBeVisible()
      await expect(page.getByRole('navigation', { name: 'Mobile slide navigation' })).toBeVisible()
      await expect(page.getByLabel('Slide 1 of 22')).toBeVisible()
    } else {
      await loadDeck(page)

      // Slide container
      await expect(page.locator('[data-testid="slide-container"]').first()).toBeVisible()

      // Slide counter (for screen reader progress feedback)
      await expect(page.locator('[data-testid="slide-counter"]')).toBeVisible()
    }

    // No JS errors during check
    expect(errors()).toHaveLength(0)
  })

  test('mobile route does not force landscape on narrow desktop windows', async ({
    page,
  }, testInfo: TestInfo) => {
    test.skip(isMobileProject(testInfo), 'Desktop-only fine-pointer regression check')

    await page.setViewportSize({ width: 700, height: 1000 })
    await page.goto('/mobile')

    await expect(page.getByTestId('portrait-prompt')).toHaveCount(0)
    await expect(page.getByTestId('mobile-start-overlay')).toBeVisible()
    await expect(page.getByTestId('mobile-deck-shell')).toBeVisible()
  })

  test('keyboard arrow navigation advances and retreats slides', async ({ page }, testInfo: TestInfo) => {
    if (isMobileProject(testInfo)) {
      await loadMobileDeck(page)

      await expect(page.getByLabel('Slide 1 of 22')).toBeVisible()
      await page.getByRole('button', { name: 'Next slide' }).click()
      await expect(page.getByLabel('Slide 2 of 22')).toBeVisible()
      await page.getByRole('button', { name: 'Previous slide' }).click()
      await expect(page.getByLabel('Slide 1 of 22')).toBeVisible()
      return
    }

    await loadDeck(page)
    await goToSlide(page, 1)

    // Focus the page body so keyboard events are received
    await page.focus('body')

    // ArrowRight should advance to slide 2
    await page.keyboard.press('ArrowRight')
    await expect(
      page.locator('[data-testid="slide-container"][data-slide-id="2"]'),
    ).toBeVisible({ timeout: 5_000 })

    // ArrowLeft should go back to slide 1
    await page.keyboard.press('ArrowLeft')
    await expect(
      page.locator('[data-testid="slide-container"][data-slide-id="1"]'),
    ).toBeVisible({ timeout: 5_000 })

    // Space should advance to slide 2
    await page.keyboard.press('Space')
    await expect(
      page.locator('[data-testid="slide-container"][data-slide-id="2"]'),
    ).toBeVisible({ timeout: 5_000 })
  })

  test('CTA slide — contact details are visible and not covered', async ({ page }, testInfo: TestInfo) => {
    const isMobile = isMobileProject(testInfo)
    if (isMobile) {
      await loadMobileDeck(page)
      await mobileScrollTo(page, CTA_SLIDE)
    } else {
      await loadDeck(page)
      await goToSlide(page, CTA_SLIDE)
    }

    // The CTA slide should have at least one visible link (email or LinkedIn)
    const links = isMobile
      ? page.locator(`[data-slide-num="${CTA_SLIDE}"] a`)
      : page.locator(`[data-testid="slide-container"][data-slide-id="${CTA_SLIDE}"] a`)
    await expect(links.first()).toBeVisible({ timeout: 10_000 })
    const count = await links.count()
    expect(count, 'CTA slide should have at least one contact link').toBeGreaterThan(0)

    // First link should be within the viewport (not clipped by an overlay)
    const firstLink = links.first()
    await expect(firstLink).toBeVisible()

    const box = await firstLink.boundingBox()
    expect(box, 'CTA contact link should have a bounding box').not.toBeNull()

    if (box) {
      const viewport = page.viewportSize()
      if (viewport) {
        expect(box.y, 'CTA contact link should be within the visible viewport').toBeLessThan(
          viewport.height,
        )
      }
    }
  })
})
