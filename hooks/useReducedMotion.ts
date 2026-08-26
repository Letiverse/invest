'use client'
import { useEffect, useState } from 'react'

/**
 * useReducedMotion — single source of truth for the prefers-reduced-motion
 * media query. Reactive (re-evaluates on system changes).
 *
 * SSR-safe: returns false during initial server render, settles to actual
 * value after mount. Components that gate effects on this should treat
 * the returned value as advisory and never block content rendering.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    if (mq.addEventListener) {
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }
    // legacy Safari
    mq.addListener(handler)
    return () => mq.removeListener(handler)
  }, [])

  return reduced
}
