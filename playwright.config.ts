import { defineConfig, devices } from '@playwright/test'

/**
 * Letiverse Investment Deck — Playwright E2E Config
 *
 * webServer auto-management:
 *   CI  → `npm start`  (requires prior `npm run build`)
 *   Dev → `npm run dev`  (reuses existing server if already running)
 *
 * Run all functional tests:  npm run test:e2e
 * Run visual screenshots:    npx playwright test --project=visual-desktop,visual-mobile
 */

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 3,
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ignoreHTTPSErrors: true,
  },

  webServer: {
    // CI: uses production build output. Dev: starts dev server, reuses if running.
    command: process.env.CI ? 'npm start' : 'npm run dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },

  projects: [
    // ── Desktop ────────────────────────────────────────────────
    {
      name: 'desktop-chrome',
      testMatch: /e2e\/0[1-5]-.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'desktop-firefox',
      testMatch: /e2e\/0[1-5]-.*\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'desktop-webkit',
      testMatch: /e2e\/0[1-5]-.*\.spec\.ts/,
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1440, height: 900 },
      },
    },

    // ── Tablet ─────────────────────────────────────────────────
    {
      name: 'tablet-landscape',
      testMatch: /e2e\/0[1-5]-.*\.spec\.ts/,
      use: {
        ...devices['iPad Pro 11 landscape'],
        viewport: { width: 1024, height: 768 },
      },
    },
    {
      name: 'tablet-portrait',
      testMatch: /e2e\/0[1-5]-.*\.spec\.ts/,
      use: {
        ...devices['iPad Pro 11'],
        viewport: { width: 768, height: 1024 },
      },
    },

    // ── Performance (Chromium only, needs production build) ────
    {
      name: 'perf-chrome',
      testMatch: '**/01-loading.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    // ── Visual screenshot QA ───────────────────────────────────
    // Run with: npx playwright test --project=visual-desktop,visual-mobile
    {
      name: 'visual-desktop',
      testMatch: '**/06-visual.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'visual-mobile',
      testMatch: '**/06-visual.spec.ts',
      use: {
        // iPhone 14 landscape dimensions on Chromium — faithful mobile layout,
        // faster than WebKit, avoids H.264 codec issues in headless Chromium.
        ...devices['iPhone 14 landscape'],
        browserName: 'chromium',
        viewport: { width: 844, height: 390 },
      },
    },

    // ── Mobile per-page deck (/mobile/[slide]) ──────────────────────────────
    // Run with: npx playwright test --project=mobile-deck-portrait,mobile-deck-landscape
    {
      name: 'mobile-deck-portrait',
      testMatch: '**/08-mobile.spec.ts',
      timeout: 90_000,
      use: {
        ...devices['iPhone 13'],
        viewport: { width: 375, height: 812 },
        actionTimeout: 60_000,
      },
    },
    {
      name: 'mobile-deck-landscape',
      testMatch: '**/08-mobile.spec.ts',
      timeout: 90_000,
      use: {
        ...devices['iPhone 14 landscape'],
        browserName: 'chromium',
        viewport: { width: 844, height: 390 },
        actionTimeout: 60_000,
      },
    },

    // ── UX quality review ──────────────────────────────────────────────────
    // Run with: npx playwright test --project=ux-desktop,ux-mobile
    {
      name: 'ux-desktop',
      testMatch: '**/07-ux.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'ux-mobile',
      testMatch: '**/07-ux.spec.ts',
      timeout: 90_000,
      use: {
        ...devices['iPhone 14 landscape'],
        browserName: 'chromium',
        viewport: { width: 844, height: 390 },
        actionTimeout: 60_000,
      },
    },
  ],
})
