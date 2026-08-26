/**
 * E2E tests for the mobile per-page deck at /mobile/[slide].
 *
 * Portrait no longer blocks the deck — it shows a dismissible landscape hint
 * banner instead. Tests requiring full deck interaction skip portrait because
 * `loadMobileDeck` needs the start overlay to be dismissible interactively.
 *
 * These specs run against the `mobile-deck-portrait` and `mobile-deck-landscape`
 * Playwright projects, both of which only match this spec file.
 */
import { test, expect } from '@playwright/test'
import { loadMobileDeck, mobileScrollTo, trackPageErrors } from './helpers'

const TOTAL_MOBILE_SLIDES = 22

function isPortraitProject(projectName: string) {
  return projectName.includes('portrait')
}

test.describe('Mobile deck', () => {
  test('portrait shows a landscape prompt overlay', async ({ page }, testInfo) => {
    test.skip(!isPortraitProject(testInfo.project.name), 'Portrait-only assertion')

    await page.goto('/mobile')
    await page.waitForURL('/mobile/1')
    // PortraitPrompt blocks the deck in portrait
    await expect(page.getByTestId('portrait-prompt')).toBeVisible()
    await expect(page.locator('[data-testid="mobile-slide-page"]')).toBeAttached()
  })

  test('/mobile redirects to slide 1', async ({ page }) => {
    await page.goto('/mobile')
    await page.waitForURL('/mobile/1')
    await expect(page.locator('[data-testid="mobile-slide-page"]')).toBeAttached()
  })

  test('renders exactly one slide per page', async ({ page }) => {
    const errors = trackPageErrors(page)
    await loadMobileDeck(page)
    expect(errors()).toHaveLength(0)

    await expect(page.locator('[data-testid="mobile-slide-page"]')).toHaveCount(1)
    await expect(page.locator('[data-slide-num="1"]')).toBeAttached()
  })

  test('automation hook navigates to the requested slide', async ({ page }) => {
    test.skip(isPortraitProject(test.info().project.name), 'Interaction flow tests run in landscape; portrait covered by dedicated portrait test above')

    await loadMobileDeck(page)
    await mobileScrollTo(page, 5)

    await expect(page.getByTestId('mobile-slide-counter')).toBeVisible()
    await expect(page.getByTestId('mobile-slide-counter')).toContainText('05/22')
    await page.waitForURL('/mobile/5')
  })

  test('Next button navigates forward through all slides', async ({ page }) => {
    test.skip(isPortraitProject(test.info().project.name), 'Interaction flow tests run in landscape; portrait covered by dedicated portrait test above')

    const errors = trackPageErrors(page)
    await loadMobileDeck(page)

    await expect(page.getByRole('button', { name: 'Previous slide' })).toBeDisabled()
    await expect(page.getByRole('button', { name: 'Next slide' })).toBeEnabled()

    for (let n = 1; n < TOTAL_MOBILE_SLIDES; n++) {
      await expect(page.locator(`[data-slide-num="${n}"]`)).toBeAttached()
      await expect(page.getByTestId('mobile-slide-counter')).toContainText(`${String(n).padStart(2, '0')}/${TOTAL_MOBILE_SLIDES}`)
      await page.getByRole('button', { name: 'Next slide' }).click()
      await page.waitForURL(`/mobile/${n + 1}`)
    }

    // Verify we're on the last slide
    await expect(page.locator(`[data-slide-num="${TOTAL_MOBILE_SLIDES}"]`)).toBeAttached()
    await expect(page.getByRole('button', { name: 'Next slide' })).toHaveCount(0)

    // Go back one
    await page.getByRole('button', { name: 'Previous slide' }).click()
    await page.waitForURL(`/mobile/${TOTAL_MOBILE_SLIDES - 1}`)
    await expect(page.getByTestId('mobile-slide-counter')).toContainText(`${String(TOTAL_MOBILE_SLIDES - 1).padStart(2, '0')}/${TOTAL_MOBILE_SLIDES}`)

    expect(errors()).toHaveLength(0)
  })

  test('direct URL navigation renders the correct slide', async ({ page }) => {
    await page.goto('/mobile/15')
    await expect(page.locator('[data-slide-num="15"]')).toBeAttached()
    await expect(page.getByTestId('mobile-slide-counter')).toContainText('15/22')
  })

  test('invalid slide URL returns 404', async ({ page }) => {
    const response = await page.goto('/mobile/99')
    expect(response?.status()).toBe(404)
  })

  test('nav has accessible aria-label', async ({ page }) => {
    test.skip(isPortraitProject(test.info().project.name), 'Interaction flow tests run in landscape; portrait covered by dedicated portrait test above')

    await loadMobileDeck(page)
    await expect(page.getByRole('navigation', { name: 'Mobile slide navigation' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Previous slide' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Next slide' })).toBeVisible()
  })

  test('start action unlocks media and mounts narration host', async ({ page }) => {
    await page.goto('/mobile/1')
    const startOverlay = page.getByTestId('mobile-start-overlay')
    await expect(startOverlay).toBeVisible({ timeout: 5_000 })
    await page.getByTestId('mobile-start-button').click()

    await page.waitForFunction(
      () => (window as unknown as { __mobileDeckReady?: boolean }).__mobileDeckReady === true,
    )
    await expect(startOverlay).toBeHidden()
    await expect(page.getByTestId('mobile-narration-host')).toBeAttached()
  })

  test('no JS errors on load', async ({ page }) => {
    const errors = trackPageErrors(page)
    await loadMobileDeck(page)
    expect(errors()).toHaveLength(0)
  })

  test('slide map opens and closes', async ({ page }) => {
    test.skip(isPortraitProject(test.info().project.name), 'Interaction flow tests run in landscape; portrait covered by dedicated portrait test above')

    await loadMobileDeck(page)

    // Map is initially hidden
    await expect(page.getByTestId('mobile-slide-map')).not.toBeAttached()

    // Tap counter badge to open map
    await page.getByTestId('mobile-slide-counter').click()
    await expect(page.getByTestId('mobile-slide-map')).toBeVisible()

    // All 22 slides listed
    await expect(page.getByTestId('mobile-slide-map').getByRole('button')).toHaveCount(TOTAL_MOBILE_SLIDES + 1) // all slides + close button

    // Close via X button
    await page.getByRole('button', { name: 'Close slide map' }).click()
    await expect(page.getByTestId('mobile-slide-map')).not.toBeAttached()
  })

  test('slide map jump navigates to selected slide', async ({ page }) => {
    test.skip(isPortraitProject(test.info().project.name), 'Interaction flow tests run in landscape; portrait covered by dedicated portrait test above')

    await loadMobileDeck(page)

    await page.getByTestId('mobile-slide-counter').click()
    await expect(page.getByTestId('mobile-slide-map')).toBeVisible()

    await page.getByRole('button', { name: /Go to slide 10/ }).click()
    await page.waitForURL('/mobile/10')
    await expect(page.locator('[data-slide-num="10"]')).toBeAttached()
    await expect(page.getByTestId('mobile-slide-map')).not.toBeAttached()
  })
})
