'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence } from 'motion/react'
import { useKeyboard } from '@/hooks/useKeyboard'
import { useSwipe } from '@/hooks/useSwipe'
import { useScrollNav } from '@/hooks/useScrollNav'
import { SlideStage } from './SlideStage'
import { SlideNav } from '@/components/nav/SlideNav'
import { SlideMap } from '@/components/nav/SlideMap'
import { useDeck } from '@/hooks/useDeck'
import { SlidePreloader } from './SlidePreloader'
import { WelcomeModal } from './WelcomeModal'
import { BootSequence } from './BootSequence'
import { SlideNarrator } from './SlideNarrator'
import { SlideProgress } from './SlideProgress'
import { CursorTrail } from './CursorTrail'
import { TransitionFlash } from './TransitionFlash'
import { AmbientGlow } from './AmbientGlow'
import { UISounds } from './UISounds'
import { PortraitPrompt } from './PortraitPrompt'
import { SLIDES } from '@/lib/slides'

// Lazy-load Three.js: defer the 352 KB R3F bundle until after the welcome modal
// is visible. Removes Three.js from the critical rendering path → cuts mobile LCP.
const Scene = dynamic(
  () => import('@/components/three/Scene').then(m => ({ default: m.Scene })),
  { ssr: false }
)

export function DeckController() {
  useKeyboard()
  useSwipe()
  useScrollNav()

  const { mapOpen, currentSlide, goTo } = useDeck()

  // Defer Three.js canvas mount by 1500ms — gives the welcome modal time to
  // render and reach LCP before the heavy WebGL bundle is fetched.
  const [sceneReady, setSceneReady] = useState(false)
  useEffect(() => {
    const id = window.setTimeout(() => setSceneReady(true), 1500)
    return () => clearTimeout(id)
  }, [])

  // Local automation hooks for Playwright visual checks; never expose them on the public host.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const w = window as Window & {
        __deckCurrentSlide?: number
        __deckGoTo?: (index: number) => void
      }
      const isLocalAutomationHost = w.location.hostname === 'localhost' || w.location.hostname === '127.0.0.1'

      if (isLocalAutomationHost) {
        w.__deckCurrentSlide = currentSlide
        w.__deckGoTo = goTo
      } else {
        delete w.__deckCurrentSlide
        delete w.__deckGoTo
      }
    }
  }, [currentSlide, goTo])

  return (
    <main id="deck-main" aria-label="Letiverse AI Investment Deck" className="relative w-screen h-screen overflow-hidden bg-[#050D1C]">
      {/* Screen reader announcement for slide changes */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Slide {currentSlide} of {SLIDES.length}: {SLIDES[currentSlide - 1]?.title}
      </div>
      {/* Cinematic boot sequence — first paint, 1400ms / skippable */}
      <BootSequence />
      {/* Slide progress bar — fixed at very top */}
      <SlideProgress />
      {/* Teal radial flash on each slide change */}
      <TransitionFlash />
      {/* Subtle cursor particle trail */}
      <CursorTrail />
      {/* Welcome/orientation modal — shown once per session */}
      <WelcomeModal />
      {/* Phone portrait guard — landscape snap mode is the intended mobile presentation. */}
      <PortraitPrompt />
      {/* Per-slide narration audio player */}
      <SlideNarrator />
      {/* Subliminal teal heartbeat — overlaying Three.js scene */}
      <AmbientGlow />
      {/* Web Audio micro-sounds (click + whoosh) */}
      <UISounds />
      {/* Fixed 3D background — deferred 1500ms to clear the LCP critical path */}
      {sceneReady && (
        <div style={{ opacity: 0, animation: 'scene-fade-in 1.5s ease forwards' }}>
          <Scene />
        </div>
      )}

      {/*
       * SlideStage is inset by a chrome safe-zone so global UI (chapter pill, utility
       * buttons, nav arrows, ticker, counter) sits in a reserved gutter rather than
       * over slide content. Insets sized to clear:
       *   top 80px  → chapter pill (top:16 + h~50) and utility buttons (top:16 + h:40)
       *   sides 80px → nav arrows (left/right:20 + w:56)
       *   bottom 64px → ticker (h:40) + slide counter sitting above it
       */}
      <div className="deck-stage-inset">
        <SlideStage />
      </div>

      {/* Navigation */}
      <SlideNav />

      {/* Slide map overlay — AnimatePresence enables exit animation */}
      <AnimatePresence>
        {mapOpen && <SlideMap key="slide-map" />}
      </AnimatePresence>

      {/* Background image preloader */}
      <SlidePreloader />
    </main>
  )
}
