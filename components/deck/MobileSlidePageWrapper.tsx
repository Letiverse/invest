'use client'
import { useEffect, useLayoutEffect, useRef, memo } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { useDeck } from '@/hooks/useDeck'
import { useDeckStore } from '@/store/deckStore'
import { slideComponents } from '@/lib/slideComponents'
import { SLIDES, TOTAL_SLIDES } from '@/lib/slides'
import { MobilePageNav } from './MobilePageNav'
import { SlideFrame } from './SlideFrame'

declare global {
  interface Window {
    __mobileCurrentSlide?: number
    __mobileGoTo?: (n: number) => void
  }
}

interface Props {
  slideNum: number
}

// Synchronously update the Zustand store for the given slide number.
// Called during render (ref-guarded) so that children (SlideChapter,
// BgVideo) see the correct currentSlide value on their very first render,
// eliminating the race condition caused by goTo() being deferred to an effect.
function syncStoreToSlide(slideNum: number, lastSynced: React.MutableRefObject<number | null>) {
  if (lastSynced.current === slideNum) return
  lastSynced.current = slideNum
  const s = useDeckStore.getState()
  if (s.currentSlide !== slideNum) {
    const target = SLIDES.find(sl => sl.id === slideNum)
    useDeckStore.setState({
      prevSlide: s.currentSlide,
      currentSlide: slideNum,
      direction: target?.axis ?? 'z',
    })
  }
}

export const MobileSlidePageWrapper = memo(function MobileSlidePageWrapper({ slideNum }: Props) {
  const router = useRouter()
  const { prevSlide } = useDeck()
  const Component = slideComponents[slideNum]
  const lastSyncedRef = useRef<number | null>(null)

  // Sync store synchronously after render but before browser paint (useLayoutEffect).
  // Must NOT run during render — calling useDeckStore.setState() in the render
  // phase mutates a store that other SSR-rendered components subscribe to, causing
  // React 19 hydration mismatch (error #418). useLayoutEffect is suppressed during
  // SSR so server + client hydration render with the same default store values.
  // The re-render triggered here happens before the first paint, so children
  // (SlideChapter, BgVideo) still see the correct currentSlide on screen.
  useLayoutEffect(() => {
    syncStoreToSlide(slideNum, lastSyncedRef)
  }, [slideNum])

  // Direction: forward (+1) or backward (-1) determines swipe direction of transition.
  const isForward = slideNum >= (prevSlide ?? slideNum)
  const xFrom = isForward ? '35%' : '-35%'
  const xTo = isForward ? '-35%' : '35%'

  // Playwright automation hooks — mirrors __deckGoTo / __deckCurrentSlide on desktop.
  useEffect(() => {
    const navigate = (n: number) => {
      const clamped = Math.min(TOTAL_SLIDES, Math.max(1, n))
      router.push(`/mobile/${clamped}`)
    }
    window.__mobileCurrentSlide = slideNum
    window.__mobileGoTo = navigate
    return () => {
      delete window.__mobileCurrentSlide
      delete window.__mobileGoTo
    }
  }, [slideNum, router])

  // Prefetch adjacent slide pages for instant navigation.
  useEffect(() => {
    if (slideNum > 1) router.prefetch(`/mobile/${slideNum - 1}`)
    if (slideNum < TOTAL_SLIDES) router.prefetch(`/mobile/${slideNum + 1}`)
  }, [slideNum, router])

  return (
    <div
      style={{ position: 'relative', height: '100dvh', overflow: 'hidden', backgroundColor: '#050D1C', touchAction: 'manipulation' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.section
          key={slideNum}
          data-testid="mobile-slide-page"
          data-slide-num={slideNum}
          aria-label={`Slide ${slideNum} of ${TOTAL_SLIDES}`}
          initial={{ opacity: 0, x: xFrom }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: xTo }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
          }}
        >
          <SlideFrame>{Component && <Component />}</SlideFrame>
        </motion.section>
      </AnimatePresence>
      <MobilePageNav currentSlide={slideNum} />
    </div>
  )
})
