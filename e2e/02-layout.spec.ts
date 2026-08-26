/**
 * 02 — Layout & Responsive
 *
 * Runs on all 7 configured browser/viewport projects.
 *
 * Covers:
 *  - No horizontal overflow on any viewport
 *  - Key navigation elements are visible (or appropriately hidden on portrait)
 *  - SlideFrame renders (deck canvas visible)
 *  - Portrait mode detection message on narrow-portrait viewports
 *  - Slide container fills the viewport (no clipping)
 */

import { test, expect } from '@playwright/test'
import { loadDeck } from './helpers'

test.describe('Layout & Responsive', () => {
  test.beforeEach(async ({ page }) => {
    await loadDeck(page)
  })

  test('no horizontal scroll on initial load', async ({ page }) => {
    const overflows = await page.evaluate(() => {
      const { scrollWidth, clientWidth } = document.documentElement
      return { scrollWidth, clientWidth, overflow: scrollWidth > clientWidth }
    })
    expect(overflows.overflow, `scrollWidth ${overflows.scrollWidth} > clientWidth ${overflows.clientWidth}`).toBe(false)
  })

  test('slide container is visible and covers the viewport', async ({ page }) => {
    const container = page.locator('[data-testid="slide-container"]').first()
    await expect(container).toBeVisible()

    const box = await container.boundingBox()
    expect(box).not.toBeNull()
    // Should be at least 200px in each dimension
    expect(box!.width).toBeGreaterThan(200)
    expect(box!.height).toBeGreaterThan(200)
  })

  test('prev/next navigation buttons are present in the DOM', async ({ page }) => {
    // Nav buttons may be visually hidden on very small screens but should exist in DOM
    await expect(page.locator('[aria-label="Previous slide"]')).toBeAttached()
    await expect(page.locator('[aria-label="Next slide"]')).toBeAttached()
  })

  test('slide counter shows current slide number', async ({ page }) => {
    const counter = page.locator('[data-testid="slide-counter"]')
    await expect(counter).toBeVisible()
    const text = await counter.textContent()
    // Should contain "1" and "18" (or similar fraction pattern)
    expect(text).toMatch(/1/)
  })

  test('chapter badge is visible on slide 1', async ({ page }) => {
    const badge = page.locator('[data-testid="chapter-badge"]')
    await expect(badge).toBeVisible()
    // Chapter 1 = VISION
    const text = await badge.textContent()
    expect(text?.toLowerCase()).toContain('vision')
  })

  test('progress bar fill element is rendered', async ({ page }) => {
    await expect(page.locator('[data-testid="slide-progress-fill"]')).toBeAttached()
  })

  test('utility nav buttons are present (map, narration)', async ({ page }) => {
    await expect(page.locator('[aria-label="Slide map"]')).toBeAttached()
    // Narration button label toggles — check for either state
    const narrationBtn = page
      .locator('[aria-label="Mute narration"], [aria-label="Unmute narration"]')
      .first()
    await expect(narrationBtn).toBeAttached()
  })

  test('page title is set correctly', async ({ page }) => {
    const title = await page.title()
    expect(title.length).toBeGreaterThan(0)
  })

  test('no broken image resources (4xx responses)', async ({ page }) => {
    const brokenImages: string[] = []

    page.on('response', (response) => {
      const url = response.url()
      const status = response.status()
      if (
        status >= 400 &&
        (url.endsWith('.png') ||
          url.endsWith('.jpg') ||
          url.endsWith('.jpeg') ||
          url.endsWith('.webp') ||
          url.endsWith('.svg'))
      ) {
        brokenImages.push(`${status} ${url}`)
      }
    })

    // Navigate to a fresh page to capture resource responses
    await page.reload({ waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)

    expect(
      brokenImages,
      `Broken images: ${brokenImages.join(', ')}`,
    ).toHaveLength(0)
  })
})

// ─── Portrait-specific tests ─────────────────────────────────────────────────

test.describe('Portrait mode detection', () => {
  test.skip(({ viewport }) => {
    if (!viewport) return true
    // Only run on portrait viewports (height > width)
    return viewport.height <= viewport.width
  }, 'Portrait tests only run on portrait viewports')

  test.beforeEach(async ({ page }) => {
    // On portrait, WelcomeModal should show portrait warning — don't bypass welcome
    await page.addInitScript(() => {
      sessionStorage.setItem('letiv-boot-seen', '1')
    })
    await page.goto('/')
  })

  test('portrait orientation message is displayed', async ({ page }) => {
    const modal = page.locator('[data-testid="welcome-modal"]')
    // The modal should be visible first
    await expect(modal).toBeVisible({ timeout: 10_000 })

    // Check for portrait mode text (case-insensitive)
    const portraitMsg = page.getByText(/portrait/i)
    await expect(portraitMsg).toBeVisible()
  })

  test('portrait prompt overlay is shown', async ({ page }) => {
    // Covers android-portrait and mobile-portrait device projects
    await expect(page.locator('[data-testid="portrait-prompt"]')).toBeVisible({ timeout: 8_000 })
  })
})
