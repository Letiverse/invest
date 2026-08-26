/**
 * Standalone verification script for the 8 UX regression fixes.
 * Run: node e2e/verify-fixes.mjs
 * Requires the dev server on http://localhost:3007
 */

import { chromium } from 'playwright'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const BASE_URL = 'http://localhost:3007'
const SCREENSHOTS_DIR = 'e2e/verify-screenshots'

// Ensure screenshots dir exists
if (!existsSync(SCREENSHOTS_DIR)) mkdirSync(SCREENSHOTS_DIR, { recursive: true })

const results = []

function log(msg) { console.log(`[verify] ${msg}`) }

async function screenshot(page, name) {
  const path = join(SCREENSHOTS_DIR, `${name}.png`)
  await page.screenshot({ path, fullPage: false })
  log(`  📸 Screenshot: ${path}`)
  return path
}

async function setupPage(browser) {
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    colorScheme: 'dark',
  })
  const page = await context.newPage()

  // Inject session storage bypasses BEFORE navigation
  await page.addInitScript(() => {
    sessionStorage.setItem('letiv-boot-seen', '1')
    sessionStorage.setItem('letiv-welcomed', '1')
  })

  const errors = []
  const fourOhFours = []
  const consoleMessages = []

  page.on('pageerror', (err) => errors.push(err.message))
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleMessages.push(msg.text())
  })
  page.on('response', (res) => {
    if (res.status() >= 400) {
      fourOhFours.push(`${res.status()} ${res.url()}`)
    }
  })

  return { page, context, errors, fourOhFours, consoleMessages }
}

async function waitForDeck(page, timeout = 15000) {
  try {
    await page.waitForSelector('[data-testid="slide-container"]', { timeout })
    log('  ✅ Deck ready')
    return true
  } catch {
    log('  ❌ Deck NOT ready after timeout')
    return false
  }
}

async function goToSlide(page, n, timeout = 8000) {
  await page.evaluate((slideN) => {
    const goTo = window.__deckGoTo
    if (typeof goTo === 'function') goTo(slideN)
  }, n)
  try {
    await page.waitForSelector(`[data-testid="slide-container"][data-slide-id="${n}"]`, { timeout })
    return true
  } catch {
    return false
  }
}

async function main() {
  log('Launching browser...')
  const browser = await chromium.launch({ headless: true })

  try {
    // === Page setup ===
    log('\n=== Setting up page ===')
    const { page, context, errors, fourOhFours, consoleMessages } = await setupPage(browser)

    log('Navigating to deck...')
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.waitForTimeout(2000)

    const deckReady = await waitForDeck(page)
    if (!deckReady) {
      await screenshot(page, 'deck-not-ready')
      log('Deck failed to load. Exiting.')
      process.exit(1)
    }

    await screenshot(page, '00-initial-state')

    // =========================================================
    // FIX 1: Slides 02, 03, 04, 06, 07, 08, 15 should not flash/disappear
    // =========================================================
    log('\n=== FIX 1: Slide content visibility ===')
    const slidesToCheck = [2, 3, 4, 6, 7, 8, 15]
    const fix1Results = {}

    for (const slideN of slidesToCheck) {
      log(`  Navigating to slide ${slideN}...`)
      await goToSlide(page, slideN)
      await page.waitForTimeout(1500) // allow content to render

      const slideEl = page.locator(`[data-testid="slide-container"][data-slide-id="${slideN}"]`)
      const visible = await slideEl.isVisible()

      // Check if slide has substantial content (not blank)
      const contentCheck = await page.evaluate((n) => {
        const el = document.querySelector(`[data-testid="slide-container"][data-slide-id="${n}"]`)
        if (!el) return { hasContent: false, childCount: 0, textLength: 0, innerText: '' }
        return {
          hasContent: el.children.length > 0,
          childCount: el.children.length,
          textLength: el.textContent?.trim().length ?? 0,
          innerText: (el.textContent?.trim().slice(0, 100)) ?? '',
        }
      }, slideN)

      const pass = visible && contentCheck.hasContent && contentCheck.textLength > 10
      fix1Results[slideN] = { pass, visible, ...contentCheck }
      log(`  Slide ${slideN}: visible=${visible}, childCount=${contentCheck.childCount}, textLen=${contentCheck.textLength} → ${pass ? 'PASS' : 'FAIL'}`)
      await screenshot(page, `fix1-slide${String(slideN).padStart(2, '0')}`)
    }

    const fix1Pass = Object.values(fix1Results).every((r) => r.pass)
    results.push({
      fix: 1,
      title: 'Slides no longer flash and disappear',
      status: fix1Pass ? 'PASS' : Object.values(fix1Results).some((r) => r.pass) ? 'PARTIAL' : 'FAIL',
      details: fix1Results,
    })

    // =========================================================
    // FIX 2: Progress bar visibility
    // =========================================================
    log('\n=== FIX 2: Progress bar ===')
    await goToSlide(page, 1)
    await page.waitForTimeout(1000)

    const progressBarCheck = await page.evaluate(() => {
      const fill = document.querySelector('[data-testid="slide-progress-fill"]')
      const bar = document.querySelector('[data-testid="slide-progress"]') || fill?.parentElement
      if (!fill) return { hasFill: false, fillVisible: false, barVisible: false, fillWidth: 0, fillOpacity: '?' }
      const fillStyle = window.getComputedStyle(fill)
      const barEl = document.querySelector('[data-testid="slide-progress"]')
      const barStyle = barEl ? window.getComputedStyle(barEl) : null
      return {
        hasFill: true,
        fillVisible: fillStyle.display !== 'none' && fillStyle.visibility !== 'hidden',
        fillOpacity: fillStyle.opacity,
        fillWidth: fill.getBoundingClientRect().width,
        barVisible: barStyle ? (barStyle.display !== 'none' && barStyle.opacity !== '0') : true,
        barZIndex: barStyle?.zIndex ?? 'n/a',
      }
    })

    log(`  Progress fill: exists=${progressBarCheck.hasFill}, visible=${progressBarCheck.fillVisible}, opacity=${progressBarCheck.fillOpacity}, width=${progressBarCheck.fillWidth}px`)
    await screenshot(page, 'fix2-progress-bar-slide1')

    // Check slides 2-5
    const progressWidths = [{ slide: 1, width: progressBarCheck.fillWidth }]
    for (const sn of [2, 3, 5]) {
      await goToSlide(page, sn)
      await page.waitForTimeout(600)
      const w = await page.evaluate(() => {
        const fill = document.querySelector('[data-testid="slide-progress-fill"]')
        return fill ? fill.getBoundingClientRect().width : 0
      })
      progressWidths.push({ slide: sn, width: w })
    }
    log(`  Progress widths: ${progressWidths.map((p) => `s${p.slide}=${Math.round(p.width)}px`).join(', ')}`)

    const progressAdvances = progressWidths[progressWidths.length - 1].width > progressWidths[0].width
    await screenshot(page, 'fix2-progress-bar-slide5')

    results.push({
      fix: 2,
      title: 'Progress bar visibility and advancement',
      status: progressBarCheck.hasFill && progressBarCheck.fillVisible && progressAdvances ? 'PASS' : 'FAIL',
      details: { ...progressBarCheck, progressWidths, progressAdvances },
    })

    // =========================================================
    // FIX 3: Cursor glow visibility
    // =========================================================
    log('\n=== FIX 3: Cursor glow ===')
    await goToSlide(page, 1)
    await page.waitForTimeout(500)

    // Move mouse around
    await page.mouse.move(960, 540)
    await page.waitForTimeout(200)
    await page.mouse.move(800, 400)
    await page.waitForTimeout(200)
    await page.mouse.move(1100, 600)
    await page.waitForTimeout(300)

    const cursorGlowCheck = await page.evaluate(() => {
      // Look for cursor glow element (various possible selectors)
      const possibleSelectors = [
        '[data-testid="cursor-glow"]',
        '.cursor-glow',
        '[class*="cursor"]',
        '[class*="glow"]',
        '[class*="spotlight"]',
      ]
      for (const sel of possibleSelectors) {
        const el = document.querySelector(sel)
        if (el) {
          const style = window.getComputedStyle(el)
          return { found: true, selector: sel, opacity: style.opacity, display: style.display, visibility: style.visibility }
        }
      }
      // Check canvas cursor
      const canvas = document.querySelector('canvas')
      return { found: false, hasCanvas: !!canvas, fallback: 'No explicit cursor glow element found' }
    })

    log(`  Cursor glow: ${JSON.stringify(cursorGlowCheck)}`)
    await screenshot(page, 'fix3-cursor-glow')

    results.push({
      fix: 3,
      title: 'Cursor glow visibility',
      status: cursorGlowCheck.found ? 'PASS' : 'PARTIAL',
      details: cursorGlowCheck,
      note: 'Cursor glow may be canvas-rendered — visual inspection required',
    })

    // =========================================================
    // FIX 4: Frame glow around slides
    // =========================================================
    log('\n=== FIX 4: Frame glow ===')
    await goToSlide(page, 1)
    await page.waitForTimeout(500)

    const frameGlowCheck = await page.evaluate(() => {
      // Look for the slide frame wrapper
      const frameSelectors = [
        '[data-testid="slide-frame"]',
        '[class*="SlideFrame"]',
        '[class*="frame"]',
        '[class*="slide-frame"]',
      ]
      for (const sel of frameSelectors) {
        const el = document.querySelector(sel)
        if (el) {
          const style = window.getComputedStyle(el)
          return {
            found: true,
            selector: sel,
            boxShadow: style.boxShadow,
            outline: style.outline,
            filter: style.filter,
          }
        }
      }
      // Check the slide container itself
      const container = document.querySelector('[data-testid="slide-container"]')
      if (container) {
        const parent = container.parentElement
        const parentStyle = parent ? window.getComputedStyle(parent) : null
        const containerStyle = window.getComputedStyle(container)
        return {
          found: false,
          containerBoxShadow: containerStyle.boxShadow,
          parentBoxShadow: parentStyle?.boxShadow ?? 'n/a',
          note: 'Checked slide-container and its parent',
        }
      }
      return { found: false }
    })

    log(`  Frame glow: ${JSON.stringify(frameGlowCheck)}`)
    await screenshot(page, 'fix4-frame-glow')

    const hasGlow = frameGlowCheck.found
      ? (frameGlowCheck.boxShadow && frameGlowCheck.boxShadow !== 'none')
      : (frameGlowCheck.containerBoxShadow && frameGlowCheck.containerBoxShadow !== 'none') ||
        (frameGlowCheck.parentBoxShadow && frameGlowCheck.parentBoxShadow !== 'none' && frameGlowCheck.parentBoxShadow !== 'n/a')

    results.push({
      fix: 4,
      title: 'Frame glow around slides',
      status: hasGlow ? 'PASS' : 'FAIL',
      details: frameGlowCheck,
    })

    // =========================================================
    // FIX 5: Typewriter effect on slides 06 and 08
    // =========================================================
    log('\n=== FIX 5: Typewriter effect ===')

    // Check slide 6
    await goToSlide(page, 6)
    await page.waitForTimeout(500)
    await screenshot(page, 'fix5-slide06-initial')

    // Immediately check the eyebrow text
    const slide6Eyebrow1 = await page.evaluate(() => {
      // Look for TypewriterText output or eyebrow elements
      const selectors = [
        '[data-testid="typewriter-text"]',
        '[class*="typewriter"]',
        '[class*="eyebrow"]',
        '[class*="Typewriter"]',
      ]
      for (const sel of selectors) {
        const el = document.querySelector(sel)
        if (el) return { found: true, selector: sel, text: el.textContent?.slice(0, 50) }
      }
      // Fall back — look for slide 6 content
      const slide = document.querySelector('[data-slide-id="6"]')
      if (!slide) return { found: false, note: 'slide 6 not in DOM' }
      // Check text content
      const allText = slide.textContent?.slice(0, 200) ?? ''
      return { found: false, slideText: allText, note: 'No typewriter element found' }
    })

    log(`  Slide 6 typewriter: ${JSON.stringify(slide6Eyebrow1)}`)

    // Wait 2 seconds and check again (typewriter should have more chars)
    await page.waitForTimeout(2000)
    const slide6Eyebrow2 = await page.evaluate(() => {
      const selectors = ['[data-testid="typewriter-text"]', '[class*="typewriter"]', '[class*="eyebrow"]']
      for (const sel of selectors) {
        const el = document.querySelector(sel)
        if (el) return { found: true, selector: sel, text: el.textContent?.slice(0, 50) }
      }
      return { found: false }
    })

    await screenshot(page, 'fix5-slide06-after2s')

    // Check for TypewriterText component in DOM (look for data attrs or component structure)
    const typewriterCheck = await page.evaluate(() => {
      // Check if TypewriterText spans exist (character-by-character spans)
      const spans = document.querySelectorAll('[data-slide-id="6"] span')
      const shortSpans = Array.from(spans).filter((s) => s.textContent?.length === 1)
      return {
        totalSpans: spans.length,
        singleCharSpans: shortSpans.length,
        note: shortSpans.length > 3 ? 'Likely typewriter (many single-char spans)' : 'May be block rendering',
      }
    })

    log(`  Typewriter structure: ${JSON.stringify(typewriterCheck)}`)
    await screenshot(page, 'fix5-slide06-final')

    results.push({
      fix: 5,
      title: 'Typewriter effect on slide 06 and 08',
      status: typewriterCheck.singleCharSpans > 3 ? 'PASS' : 'PARTIAL',
      details: { slide6Initial: slide6Eyebrow1, slide6After2s: slide6Eyebrow2, structure: typewriterCheck },
      note: 'Visual inspection recommended for character-by-character animation',
    })

    // =========================================================
    // FIX 6: Host cards interactive (Slide 13)
    // =========================================================
    log('\n=== FIX 6: Host cards (Slide 13) ===')
    await goToSlide(page, 13)
    await page.waitForTimeout(1500)

    const hostCardsCheck = await page.evaluate(() => {
      // Look for host card elements
      const selectors = [
        '[data-testid="host-card"]',
        '[class*="host-card"]',
        '[class*="HostCard"]',
        '[class*="host"]',
      ]
      for (const sel of selectors) {
        const cards = document.querySelectorAll(sel)
        if (cards.length > 0) {
          const first = cards[0]
          const style = window.getComputedStyle(first)
          return {
            found: true,
            selector: sel,
            count: cards.length,
            cursor: style.cursor,
            hasHoverClass: first.className.includes('hover') || first.className.includes('group'),
          }
        }
      }
      // Broader search in slide 13
      const slide = document.querySelector('[data-slide-id="13"]')
      if (!slide) return { found: false, note: 'Slide 13 not in DOM' }
      // Look for grid items
      const gridItems = slide.querySelectorAll('button, [role="button"], [tabindex]')
      return {
        found: gridItems.length > 0,
        count: gridItems.length,
        note: 'Found interactive elements in slide 13',
        sample: gridItems[0]?.className?.slice(0, 100) ?? 'n/a',
      }
    })

    log(`  Host cards: ${JSON.stringify(hostCardsCheck)}`)
    await screenshot(page, 'fix6-host-cards-initial')

    // Try hovering over a host card
    if (hostCardsCheck.found && hostCardsCheck.count > 0) {
      try {
        const cardSel = hostCardsCheck.selector || '[data-slide-id="13"] button'
        const firstCard = page.locator(cardSel).first()
        await firstCard.hover()
        await page.waitForTimeout(500)
        await screenshot(page, 'fix6-host-card-hover')

        // Check if hover overlay appeared
        const overlayCheck = await page.evaluate(() => {
          const overlaySelectors = ['[data-testid="host-overlay"]', '[class*="overlay"]', '[class*="info"]']
          for (const sel of overlaySelectors) {
            const el = document.querySelector(sel)
            if (el) {
              const style = window.getComputedStyle(el)
              return { found: true, selector: sel, opacity: style.opacity, visible: style.opacity !== '0' && style.display !== 'none' }
            }
          }
          return { found: false }
        })
        hostCardsCheck.hoverOverlay = overlayCheck
        log(`  Hover overlay: ${JSON.stringify(overlayCheck)}`)
      } catch (e) {
        log(`  Could not hover: ${e.message}`)
      }
    }

    const fix6Pass = hostCardsCheck.found && hostCardsCheck.count >= 10
    results.push({
      fix: 6,
      title: 'Host cards interactive (Slide 13)',
      status: fix6Pass ? 'PASS' : hostCardsCheck.found ? 'PARTIAL' : 'FAIL',
      details: hostCardsCheck,
    })

    // =========================================================
    // FIX 7: Slide 18 background
    // =========================================================
    log('\n=== FIX 7: Slide 18 background ===')
    await goToSlide(page, 18)
    await page.waitForTimeout(1500)

    const slide18BgCheck = await page.evaluate(() => {
      const slide = document.querySelector('[data-slide-id="18"]')
      if (!slide) return { found: false }

      // Look for background image
      const allEls = slide.querySelectorAll('*')
      const bgImages = []
      for (const el of allEls) {
        const style = window.getComputedStyle(el)
        const bg = style.backgroundImage
        if (bg && bg !== 'none') bgImages.push({ tag: el.tagName, class: el.className.slice(0, 60), bg: bg.slice(0, 120) })
        // Check img tags
        if (el.tagName === 'IMG') {
          const img = el
          bgImages.push({ tag: 'IMG', src: img.src?.slice(-60), naturalWidth: img.naturalWidth, complete: img.complete })
        }
      }

      // Check if slide has visible background color
      const slideStyle = window.getComputedStyle(slide)
      return {
        found: true,
        bgImages: bgImages.slice(0, 10),
        bgColor: slideStyle.backgroundColor,
        hasCtaBgImage: bgImages.some((b) => b.bg?.includes('cta-bg') || b.src?.includes('cta-bg')),
      }
    })

    log(`  Slide 18 bg: hasCtaBg=${slide18BgCheck.hasCtaBgImage}, images=${slide18BgCheck.bgImages?.length}`)
    if (slide18BgCheck.bgImages?.length > 0) {
      log(`  BG images: ${JSON.stringify(slide18BgCheck.bgImages.slice(0, 3))}`)
    }
    await screenshot(page, 'fix7-slide18-background')

    const fix7Pass = slide18BgCheck.found && (
      slide18BgCheck.hasCtaBgImage ||
      (slide18BgCheck.bgImages?.some((b) => b.naturalWidth > 0 || b.bg?.includes('url(')))
    )

    results.push({
      fix: 7,
      title: 'Slide 18 has a background',
      status: fix7Pass ? 'PASS' : 'FAIL',
      details: slide18BgCheck,
    })

    // =========================================================
    // FIX 8: Ambient layers / deck heartbeat
    // =========================================================
    log('\n=== FIX 8: Ambient layers / deck heartbeat ===')
    await goToSlide(page, 1)
    await page.waitForTimeout(500)

    const ambientCheck = await page.evaluate(() => {
      // Look for animated ambient layers
      const selectors = [
        '[class*="heartbeat"]',
        '[class*="ambient"]',
        '[class*="particle"]',
        '[class*="deck-heartbeat"]',
        '[class*="background-layer"]',
        '[class*="orb"]',
        '.deck-heartbeat',
      ]
      const found = []
      for (const sel of selectors) {
        const els = document.querySelectorAll(sel)
        if (els.length > 0) {
          found.push({ selector: sel, count: els.length })
        }
      }

      // Check for canvas (R3F background)
      const canvas = document.querySelector('canvas')
      const canvasStyle = canvas ? window.getComputedStyle(canvas) : null

      // Check CSS animations on body/root
      const body = document.body
      const bodyStyle = window.getComputedStyle(body)
      const root = document.documentElement
      const rootStyle = window.getComputedStyle(root)

      // Look for animation keyframes in stylesheets
      const hasHeartbeatKeyframe = Array.from(document.styleSheets).some((sheet) => {
        try {
          return Array.from(sheet.cssRules || []).some((rule) =>
            rule.cssText?.includes('heartbeat') || rule.cssText?.includes('ambient')
          )
        } catch { return false }
      })

      return {
        foundElements: found,
        hasCanvas: !!canvas,
        canvasZIndex: canvasStyle?.zIndex ?? 'n/a',
        canvasOpacity: canvasStyle?.opacity ?? 'n/a',
        hasHeartbeatKeyframe,
        bodyAnimation: bodyStyle.animationName,
        note: found.length > 0 ? 'Found animated layer elements' : 'No explicit animated layers found in DOM',
      }
    })

    log(`  Ambient layers: ${JSON.stringify(ambientCheck)}`)
    await screenshot(page, 'fix8-ambient-layers')

    const fix8Pass = ambientCheck.hasCanvas || ambientCheck.foundElements.length > 0 || ambientCheck.hasHeartbeatKeyframe

    results.push({
      fix: 8,
      title: 'Ambient layers / deck heartbeat more visible',
      status: fix8Pass ? 'PASS' : 'PARTIAL',
      details: ambientCheck,
      note: 'Animation visibility is subjective — screenshot comparison needed',
    })

    // =========================================================
    // ADDITIONAL: Console errors and 404s
    // =========================================================
    log('\n=== Additional: Console errors and 404s ===')

    // Navigate all slides to collect any 404s
    for (let i = 1; i <= 18; i++) {
      await goToSlide(page, i)
      await page.waitForTimeout(300)
    }

    await screenshot(page, 'additional-final-state')

    // =========================================================
    // ADDITIONAL: Slide 01 logo check
    // =========================================================
    log('\n=== Additional: Slide 01 logo ===')
    await goToSlide(page, 1)
    await page.waitForTimeout(1000)

    const logoCheck = await page.evaluate(() => {
      const slide = document.querySelector('[data-slide-id="1"]')
      if (!slide) return { found: false }
      const imgs = slide.querySelectorAll('img')
      return {
        found: true,
        images: Array.from(imgs).map((img) => ({
          src: img.src?.slice(-80),
          alt: img.alt,
          naturalWidth: img.naturalWidth,
          complete: img.complete,
          broken: img.naturalWidth === 0 && img.complete,
        })),
      }
    })

    log(`  Slide 01 images: ${JSON.stringify(logoCheck)}`)
    await screenshot(page, 'additional-slide01-logo')

    // =========================================================
    // REPORT
    // =========================================================
    log('\n\n========================================')
    log('   VERIFICATION REPORT')
    log('========================================\n')

    let passCount = 0
    let failCount = 0
    let partialCount = 0

    for (const r of results) {
      const icon = r.status === 'PASS' ? '✅' : r.status === 'FAIL' ? '❌' : '⚠️'
      log(`${icon} Fix ${r.fix}: ${r.title}`)
      log(`   Status: ${r.status}`)
      if (r.note) log(`   Note: ${r.note}`)
      if (r.status === 'PASS') passCount++
      else if (r.status === 'FAIL') failCount++
      else partialCount++
    }

    log('\n--- Console Errors ---')
    if (errors.length === 0) {
      log('✅ No uncaught JS errors')
    } else {
      for (const e of errors) log(`  ❌ ${e}`)
    }

    log('\n--- Network Errors (4xx/5xx) ---')
    const relevant404s = fourOhFours.filter(
      (u) => !u.includes('favicon') && !u.includes('_next/static') && !u.includes('hot-reload')
    )
    if (relevant404s.length === 0) {
      log('✅ No significant network errors')
    } else {
      for (const u of relevant404s) log(`  ❌ ${u}`)
    }

    log('\n--- Summary ---')
    log(`Pass: ${passCount} | Partial: ${partialCount} | Fail: ${failCount}`)
    log(`Screenshots: ${SCREENSHOTS_DIR}/`)

    // Write JSON report
    const report = {
      timestamp: new Date().toISOString(),
      results,
      consoleErrors: errors,
      networkErrors: relevant404s,
      logoCheck,
    }
    writeFileSync(join(SCREENSHOTS_DIR, 'report.json'), JSON.stringify(report, null, 2))
    log('Report written to e2e/verify-screenshots/report.json')

  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
