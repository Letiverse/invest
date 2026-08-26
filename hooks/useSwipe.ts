'use client'
import { useEffect, useRef } from 'react'
import { useDeck } from './useDeck'

export function useSwipe(el?: React.RefObject<HTMLElement>) {
  const { next, prev } = useDeck()
  const startRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    // Disable swipe gestures whenever any coarse-pointer input is available.
    // We use `any-pointer: coarse` (not `pointer: coarse`) so this also matches
    // hybrid touch laptops where mouse/trackpad is the *primary* pointer — the
    // exact device class that was triggering accidental slide changes during
    // content interaction. The mobile deck route (/mobile/[slide]) uses
    // dedicated nav buttons, so nothing of value is lost on phones either.
    // Mouse-only devices never fired these touch listeners anyway.
    if (typeof window !== 'undefined' && window.matchMedia('(any-pointer: coarse)').matches) {
      return
    }

    const target = el?.current ?? window

    const onStart = (e: TouchEvent) => {
      startRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    const onEnd = (e: TouchEvent) => {
      if (!startRef.current) return
      const dx = e.changedTouches[0].clientX - startRef.current.x
      const dy = e.changedTouches[0].clientY - startRef.current.y
      startRef.current = null

      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > 50) { if (dx < 0) next(); else prev() }
      } else {
        if (Math.abs(dy) > 80) { if (dy < 0) next(); else prev() }
      }
    }

    target.addEventListener('touchstart', onStart as EventListener, { passive: true })
    target.addEventListener('touchend', onEnd as EventListener, { passive: true })
    return () => {
      target.removeEventListener('touchstart', onStart as EventListener)
      target.removeEventListener('touchend', onEnd as EventListener)
    }
  }, [next, prev, el])
}
