'use client'
import { useEffect, useState } from 'react'

export type DeckViewportMode =
  | 'desktop-landscape'
  | 'tablet-landscape'
  | 'tablet-portrait'
  | 'phone-landscape'
  | 'phone-portrait'

export interface DeckViewport {
  width: number
  height: number
  mode: DeckViewportMode
  isPhone: boolean
  isTablet: boolean
  isPortrait: boolean
  isMobileDevice: boolean
}

function classify(width: number, height: number, isMobileDevice: boolean): DeckViewport {
  const isPortrait = height > width
  const shortestSide = Math.min(width, height)
  const longestSide = Math.max(width, height)
  const isPhone = shortestSide < 520 && longestSide < 950
  const isTablet = shortestSide >= 520 && shortestSide < 900

  return {
    width,
    height,
    isPhone,
    isTablet,
    isPortrait,
    isMobileDevice,
    mode: isPhone
      ? isPortrait ? 'phone-portrait' : 'phone-landscape'
      : isTablet ? isPortrait ? 'tablet-portrait' : 'tablet-landscape' : 'desktop-landscape',
  }
}

function readMobileDeviceSignal() {
  if (typeof window === 'undefined') return false

  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches
  const hasMobileUserAgent = /Android|iPhone|iPad|iPod|Mobile/i.test(window.navigator.userAgent)

  return hasCoarsePointer || hasMobileUserAgent
}

function readViewport() {
  if (typeof window === 'undefined') {
    return classify(1920, 1080, false)
  }
  const visual = window.visualViewport
  return classify(
    Math.round(visual?.width ?? window.innerWidth),
    Math.round(visual?.height ?? window.innerHeight),
    readMobileDeviceSignal(),
  )
}

// SSR-safe default — must match the server-side path of readViewport() so that
// client hydration produces the same HTML as SSR. We only switch to real
// viewport dimensions after the first effect fires (post-hydration).
const SSR_DEFAULT: DeckViewport = classify(1920, 1080, false)

export function useDeckViewport(): DeckViewport {
  // Intentionally NOT a lazy initializer (no `useState(readViewport)`) —
  // lazy initializers run on the client during hydration and return real
  // window dimensions, which differ from SSR, causing React error #418.
  const [viewport, setViewport] = useState<DeckViewport>(SSR_DEFAULT)

  useEffect(() => {
    const update = () => setViewport(readViewport())
    update() // sync to real viewport after hydration

    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    window.visualViewport?.addEventListener('resize', update)
    const coarsePointerQuery = window.matchMedia('(pointer: coarse)')
    coarsePointerQuery.addEventListener('change', update)

    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
      window.visualViewport?.removeEventListener('resize', update)
      coarsePointerQuery.removeEventListener('change', update)
    }
  }, [])

  return viewport
}
