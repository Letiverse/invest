'use client'
import { useEffect, useLayoutEffect } from 'react'
import dynamic from 'next/dynamic'
import { MotionConfig, MotionGlobalConfig } from 'motion/react'
import { useDeckStore } from '@/store/deckStore'
import { TOTAL_SLIDES } from '@/lib/slides'

// NEXT_PUBLIC_E2E is baked into the bundle at build time by CI workflows.
const CI_SKIP_ANIMATIONS = process.env.NEXT_PUBLIC_E2E === 'true'

// skipAnimations is a global runtime flag, not a MotionConfig prop — apply it
// once at module load so E2E runs disable animations before anything mounts.
MotionGlobalConfig.skipAnimations = CI_SKIP_ANIMATIONS

const DeckController = dynamic(
  () => import('@/components/deck/DeckController').then(m => m.DeckController),
  { ssr: false }
)

interface Props { slideNum: number }

/**
 * Desktop per-URL wrapper. Mirrors the mobile pattern:
 *   1. Sync URL → store on mount, before paint, so DeckController never
 *      renders the wrong slide (useLayoutEffect required to win the race).
 *   2. Subscribe to store changes and reflect them back into the URL via
 *      pushState — async event wiring, plain useEffect is fine.
 * The store remains the runtime source of truth so all 22 slide components,
 * SlideNav, SlideMap, useKeyboard etc. continue to work without modification.
 */
export function DesktopSlidePageWrapper({ slideNum }: Props) {
  // 1. URL → store. Must run synchronously before paint to avoid a flash of
  // whichever slide the store last had (e.g. slide 1 on first load).
  useLayoutEffect(() => {
    useDeckStore.getState().goTo(slideNum)
  }, [slideNum])

  // 2. store → URL + popstate handler. Pure event wiring — useEffect is the
  // right tool; useLayoutEffect would just block paint for no reason.
  useEffect(() => {
    const unsub = useDeckStore.subscribe((state, prev) => {
      if (state.currentSlide === prev.currentSlide) return
      if (state.currentSlide < 1 || state.currentSlide > TOTAL_SLIDES) return
      const path = `/${state.currentSlide}`
      // Guard against redundant pushState — the store can fire multiple times
      // for the same slide (e.g. on hydration / replay) and we don't want to
      // pollute browser history with no-op entries.
      if (window.location.pathname !== path) {
        window.history.pushState(null, '', path)
      }
    })

    // Reflect popstate (back/forward) into the store.
    const onPop = () => {
      const m = window.location.pathname.match(/^\/(\d{1,2})\/?$/)
      if (!m) return
      const n = parseInt(m[1], 10)
      if (n < 1 || n > TOTAL_SLIDES) return
      useDeckStore.getState().goTo(n)
    }
    window.addEventListener('popstate', onPop)
    return () => {
      unsub()
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  return (
    <MotionConfig>
      <DeckController />
    </MotionConfig>
  )
}
