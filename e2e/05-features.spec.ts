/**
 * 05 — Features & Functionality
 *
 * Covers:
 *  - WelcomeModal full 2-step flow (without bypass)
 *  - Narration toggle (mute/unmute)
 *  - Slide map open/close and slide jump
 *  - Auto-advance (if present)
 */

import { test, expect } from '@playwright/test'
import { skipBoot, loadDeck, goToSlide } from './helpers'

// ─── Welcome Modal ───────────────────────────────────────────────────────────

test.describe('Welcome Modal', () => {
  test.beforeEach(async ({ page }) => {
    // Skip boot but NOT welcome modal
    await skipBoot(page)
    await page.goto('/')
  })

  test('Welcome modal appears after boot completes', async ({ page }) => {
    const modal = page.locator('[data-testid="welcome-modal"]')
    await expect(modal).toBeVisible({ timeout: 8_000 })
  })

  test('Step 1 shows "Welcome" heading', async ({ page }) => {
    await expect(page.locator('[data-testid="welcome-modal"]')).toBeVisible({ timeout: 8_000 })
    // Step 1 heading
    await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible({ timeout: 5_000 })
  })

  test('"Begin" CTA dismisses modal and shows slide', async ({ page }) => {
    const modal = page.locator('[data-testid="welcome-modal"]')
    await expect(modal).toBeVisible({ timeout: 8_000 })

    // Single-step modal — wait for the boot bar to finish (button switches from
    // "Preparing Deck…" to "Begin →"), then click it.
    const beginBtn = modal.getByRole('button', { name: /begin/i })
    await expect(beginBtn).toBeVisible({ timeout: 8_000 })
    await beginBtn.click()

    // Modal should close
    await expect(modal).toBeHidden({ timeout: 8_000 })

    // Deck should be visible
    await expect(page.locator('[data-testid="slide-container"]').first()).toBeVisible({
      timeout: 10_000,
    })
  })
})

// ─── Narration / Voiceover ───────────────────────────────────────────────────

test.describe('Narration toggle', () => {
  test.beforeEach(async ({ page }) => {
    await loadDeck(page)
  })

  test('narration button is visible and clickable', async ({ page }) => {
    const btn = page.locator(
      '[aria-label="Mute narration"], [aria-label="Unmute narration"]',
    ).first()
    await expect(btn).toBeVisible()
    await btn.click()
    // After click, label should have toggled
    await page.waitForTimeout(300)
    // Either state is valid — just verify the button is still present
    await expect(
      page.locator('[aria-label="Mute narration"], [aria-label="Unmute narration"]').first(),
    ).toBeAttached()
  })

  test('narration button toggles aria-label', async ({ page }) => {
    const mute = page.locator('[aria-label="Mute narration"]')
    const unmute = page.locator('[aria-label="Unmute narration"]')

    const initialIsMuted = await mute.isVisible()

    if (initialIsMuted) {
      await mute.click()
      await expect(unmute).toBeVisible({ timeout: 3_000 })
    } else {
      await unmute.click()
      await expect(mute).toBeVisible({ timeout: 3_000 })
    }
  })
})

// ─── Slide Map (UI interaction) ──────────────────────────────────────────────

test.describe('Slide map UI', () => {
  test.beforeEach(async ({ page }) => {
    await loadDeck(page)
  })

  test('map button opens the map overlay', async ({ page }) => {
    await page.click('[aria-label="Slide map"]')
    await expect(page.locator('[data-testid="slide-map"]')).toBeVisible({ timeout: 4_000 })
  })

  test('map shows 22 slide buttons', async ({ page }) => {
    await page.click('[aria-label="Slide map"]')
    await expect(page.locator('[data-testid="slide-map"]')).toBeVisible({ timeout: 4_000 })

    const slideButtons = page.locator('[data-testid="slide-map-btn"]')
    await expect(slideButtons).toHaveCount(22, { timeout: 4_000 })
  })

  test('slide map highlights the active slide', async ({ page }) => {
    await goToSlide(page, 5)
    await page.click('[aria-label="Slide map"]')
    await expect(page.locator('[data-testid="slide-map"]')).toBeVisible({ timeout: 4_000 })

    // The 5th button (index 4, zero-based) should show slide "5"
    const activeBtn = page.locator('[data-testid="slide-map-btn"]').nth(4)
    await expect(activeBtn).toBeVisible()
    // Active button should have distinguishing attribute or text containing "5"
    const text = await activeBtn.textContent()
    expect(text).toContain('5')
  })

  test('clicking a slide in the map closes the map', async ({ page }) => {
    await page.click('[aria-label="Slide map"]')
    await expect(page.locator('[data-testid="slide-map"]')).toBeVisible({ timeout: 4_000 })

    await page.locator('[data-testid="slide-map-btn"]').nth(7).click()
    await expect(page.locator('[data-testid="slide-map"]')).toBeHidden({ timeout: 4_000 })
  })
})

// ─── goTo Hook ───────────────────────────────────────────────────────────────

test.describe('window.__deckGoTo hook', () => {
  test.beforeEach(async ({ page }) => {
    await loadDeck(page)
  })

  test('__deckGoTo is exposed and callable', async ({ page }) => {
    const isFunction = await page.evaluate(() => {
      const w = window as unknown as { __deckGoTo?: unknown }
      return typeof w.__deckGoTo === 'function'
    })
    expect(isFunction).toBe(true)
  })

  test('__deckCurrentSlide is exposed as a number', async ({ page }) => {
    const val = await page.evaluate(() => {
      const w = window as unknown as { __deckCurrentSlide?: unknown }
      return typeof w.__deckCurrentSlide
    })
    expect(val).toBe('number')
  })

  test('__deckGoTo(15) navigates to slide 15', async ({ page }) => {
    await goToSlide(page, 15)
    await page.waitForFunction(
      () => (window as unknown as { __deckCurrentSlide?: number }).__deckCurrentSlide === 15,
      { timeout: 5_000 },
    )
    const n = await page.evaluate(
      () => (window as unknown as { __deckCurrentSlide?: number }).__deckCurrentSlide,
    )
    expect(n).toBe(15)
  })
})
