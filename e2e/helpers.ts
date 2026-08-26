/**
 * Shared Playwright helpers for the Letiverse Investment Deck E2E suite.
 *
 * Key bypass mechanism:
 *   - sessionStorage 'letiv-boot-seen' = '1'  → skips BootSequence
 *   - sessionStorage 'letiv-welcomed'  = '1'  → skips WelcomeModal, calls setDeckReady immediately
 *
 * These MUST be injected via page.addInitScript() before page.goto() so they
 * are available on the very first script execution (not after hydration).
 */

import { type Page, expect } from '@playwright/test'

// ─── sessionStorage keys ───────────────────────────────────────────────────

export const BOOT_KEY = 'letiv-boot-seen'
export const WELCOME_KEY = 'letiv-welcomed'

// ─── Injection helpers ─────────────────────────────────────────────────────

/**
 * Inject sessionStorage bypasses BEFORE navigating to the page.
 * Call this once per test that doesn't need to observe boot/modal.
 */
export async function skipBootAndModal(page: Page): Promise<void> {
  await page.addInitScript(
    ({ bootKey, welcomeKey }: { bootKey: string; welcomeKey: string }) => {
      sessionStorage.setItem(bootKey, '1')
      sessionStorage.setItem(welcomeKey, '1')
    },
    { bootKey: BOOT_KEY, welcomeKey: WELCOME_KEY },
  )
}

/**
 * Skip only the boot sequence (BootSequence.tsx), leave WelcomeModal visible.
 */
export async function skipBoot(page: Page): Promise<void> {
  await page.addInitScript(
    ({ bootKey }: { bootKey: string }) => {
      sessionStorage.setItem(bootKey, '1')
    },
    { bootKey: BOOT_KEY },
  )
}

// ─── Deck readiness ────────────────────────────────────────────────────────

/**
 * Wait until the deck is fully interactive:
 *   1. No boot sequence overlay visible
 *   2. No welcome modal visible
 *   3. The slide-container DOM element is present
 *   4. DeckController has mounted and exposed window.__deckGoTo (hydration sentinel)
 *   5. Portrait prompt dismissed (if shown) — allows tests to interact with deck elements
 *      that would otherwise be covered by the z-[500] portrait overlay
 */
export async function waitForDeckReady(page: Page, timeout = 15_000): Promise<void> {
  await expect(page.locator('[aria-label="Loading Letiverse investor deck"]')).toBeHidden({
    timeout,
  })
  await expect(page.locator('[data-testid="welcome-modal"]')).toBeHidden({ timeout })
  await expect(page.locator('[data-testid="slide-container"]').first()).toBeVisible({ timeout })
  // Wait for DeckController to mount and wire up the goTo hook — the slide-container
  // can be visible from the initial client render before React event handlers attach.
  await page.waitForFunction(
    () => typeof (window as unknown as { __deckGoTo?: unknown }).__deckGoTo === 'function',
    { timeout },
  )

  // Dismiss portrait prompt if visible — it uses z-[500] and covers all nav/deck elements,
  // blocking .click() calls on phone-portrait viewports.
  const portraitPrompt = page.locator('[data-testid="portrait-prompt"]')
  const promptVisible = await portraitPrompt.isVisible({ timeout: 500 }).catch(() => false)
  if (promptVisible) {
    await page.getByRole('button', { name: /continue anyway/i }).click()
    await expect(portraitPrompt).toBeHidden({ timeout: 8_000 })
  }
}

// ─── Slide navigation ──────────────────────────────────────────────────────

/**
 * Get the current slide number (1-indexed) from the window hook.
 */
export async function getCurrentSlide(page: Page): Promise<number | undefined> {
  return page.evaluate(
    () => (window as unknown as { __deckCurrentSlide?: number }).__deckCurrentSlide,
  )
}

/**
 * Jump to a slide by 1-indexed number using the window hook, then wait for
 * the corresponding data-slide-id attribute to appear in the DOM.
 */
export async function goToSlide(page: Page, slideN: number, timeout = 20_000): Promise<void> {
  await page.evaluate((n: number) => {
    const goTo = (window as unknown as { __deckGoTo?: (n: number) => void }).__deckGoTo
    if (typeof goTo === 'function') goTo(n)
  }, slideN)
  await expect(
    page.locator(`[data-testid="slide-container"][data-slide-id="${slideN}"]`),
  ).toBeVisible({ timeout })
}

// ─── Common page setup ─────────────────────────────────────────────────────

/**
 * Inject bypasses → navigate → wait for deck ready.
 */
export async function loadDeck(page: Page, path = '/'): Promise<void> {
  await skipBootAndModal(page)
  await page.goto(path)
  await waitForDeckReady(page)
}

// ─── Mobile deck helpers ───────────────────────────────────────────────────

/**
 * Navigate to /mobile/1 and wait until the slide page is ready.
 * Dismisses the start overlay (shown on every fresh browser context).
 */
export async function loadMobileDeck(page: Page, timeout = 20_000): Promise<void> {
  await page.goto('/mobile/1')

  const startButton = page.getByTestId('mobile-start-button')
  await expect(startButton).toBeVisible({ timeout: 5_000 })
  await startButton.click()

  await page.waitForFunction(
    () => (window as unknown as { __mobileDeckReady?: boolean }).__mobileDeckReady === true,
    { timeout },
  )
  await page.waitForSelector('[data-testid="mobile-slide-page"]', { timeout })
}

/**
 * Navigate the mobile deck to a slide by 1-indexed number via the automation
 * hook (router.push), then wait for the URL to reflect the new slide.
 */
export async function mobileScrollTo(page: Page, slideN: number, timeout = 14_000): Promise<void> {
  await page.evaluate((n: number) => {
    const fn = (window as unknown as { __mobileGoTo?: (n: number) => void }).__mobileGoTo
    if (typeof fn === 'function') fn(n)
  }, slideN)
  await page.waitForURL(`/mobile/${slideN}`, { timeout })
}

/**
 * Known-benign error patterns to ignore in headless Chromium.
 *
 * - Mux HLS codec errors: headless Chromium ships without H.264/AAC support.
 *   These are NOT production bugs — real browsers have the codec.
 * - THREE.Clock deprecation: non-breaking, from Three.js dependency.
 */
const KNOWN_BENIGN_PATTERNS = [
  /manifestIncompatibleCodecsError/i,
  /hlsError/i,
  /MediaError/i,
  /THREE\.Clock/i,
]

/**
 * Attach a pageerror listener that records uncaught JS errors.
 * Returns a getter that yields the collected errors, filtered to exclude
 * known-benign headless-environment errors.
 */
export function trackPageErrors(page: Page): () => Error[] {
  const errors: Error[] = []
  page.on('pageerror', (err) => {
    const benign = KNOWN_BENIGN_PATTERNS.some((re) => re.test(err.message))
    if (!benign) errors.push(err)
  })
  return () => [...errors]
}
