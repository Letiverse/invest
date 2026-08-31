import { expect, test } from '@playwright/test'

test.describe('investment benchmark homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('communicates the proposition and proof immediately', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: /digital network for real-world venues/i })).toBeVisible()
    await expect(page.getByText('18', { exact: true }).first()).toBeVisible()
    await expect(page.getByText('36,423', { exact: true }).first()).toBeVisible()
    await expect(page.getByText(/best digital twin/i).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /enter the winning tour/i }).first()).toBeVisible()
  })

  test('contains all 18 contracted Hosts including Club AUsome', async ({ page }) => {
    const hostGrid = page.getByLabel('Letiverse Hosts')
    await expect(hostGrid.locator('article')).toHaveCount(18)
    await expect(hostGrid.getByText('Club AUsome')).toBeVisible()
    await expect(hostGrid.getByText('Autism charity')).toBeVisible()
    await expect(hostGrid.getByText('Contracted Host')).toHaveCount(18)
    await expect(hostGrid.getByText(/^Live$/)).toHaveCount(0)
    await expect(hostGrid.getByText(/^Preview$/)).toHaveCount(0)
  })

  test('makes the weekly multi-year Host partnership explicit without a welcome gate', async ({ page }) => {
    await expect(page.getByText('One contract. Weekly distribution.')).toBeAttached()
    await expect(page.getByText('One official social post')).toBeAttached()
    await expect(page.getByText('every week', { exact: true }).first()).toBeAttached()
    await expect(page.getByText('for the full contract term')).toBeAttached()
    await expect(page.getByText(/every contract adds recurring distribution/i)).toBeAttached()
    await expect(page.getByText('AVERAGE USER TIME')).toBeAttached()
    await expect(page.locator('iframe')).toHaveCount(0)
    await expect(page.locator('video')).toHaveCount(0)
    await expect(page.getByText(/^Begin$/i)).toHaveCount(0)
  })

  test('supports normal scrolling and anchored navigation without horizontal overflow', async ({ page }) => {
    const dimensions = await page.evaluate(() => ({
      scrollHeight: document.documentElement.scrollHeight,
      innerHeight: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))

    expect(dimensions.scrollHeight).toBeGreaterThan(dimensions.innerHeight * 2)
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1)

    await page.getByRole('link', { name: /see the host partnership/i }).click()
    await expect(page).toHaveURL(/#model$/)
    await expect(page.getByRole('heading', { level: 2, name: /one contract/i })).toBeVisible()
  })

  test('retains the complete story on a 375-pixel mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.reload()
    await expect(page.getByRole('heading', { level: 1, name: /digital network for real-world venues/i })).toBeVisible()
    await expect(page.getByText('One contract. Weekly distribution.')).toBeAttached()
    await expect(page.getByText('The network already has momentum.')).toBeAttached()

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(1)
  })

  test('stops explanatory motion when reduced motion is requested', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.reload()

    await expect(page.locator('[data-motion="signal-dot"]').first()).toHaveCSS('display', 'none')
    await expect(page.locator('[data-motion="signal-path"]')).toHaveCSS('animation-name', 'none')
    await expect(page.locator('[data-motion="contract-pulse"]')).toHaveCSS('animation-name', 'none')
  })

  test('loads the visible visual evidence successfully', async ({ page }) => {
    const brokenImages = await page.locator('img').evaluateAll((images) =>
      images
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.getAttribute('src')),
    )

    expect(brokenImages).toEqual([])
  })
})
