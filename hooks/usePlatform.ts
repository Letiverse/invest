'use client'
import { useEffect, useState } from 'react'
import { detectPlatform, type PlatformInfo } from '@/lib/platform'

const SSR_FALLBACK: PlatformInfo = {
  deviceType: 'desktop',
  isTouchDevice: false,
  connection: 'unknown',
  os: 'other',
  isPortrait: false,
  reducedMotion: false,
}

/**
 * Standardised platform hook wrapping `lib/platform.ts`.
 * Re-evaluates on resize, orientation change and reduced-motion changes
 * so any dependent effect stays correct when the user rotates a device
 * or flips the OS-level reduced-motion setting mid-session.
 *
 * SSR-safe: returns a desktop fallback during the server render and
 * the first client paint, then settles to the real platform on mount.
 */
export function usePlatform(): PlatformInfo {
  const [info, setInfo] = useState<PlatformInfo>(SSR_FALLBACK)

  useEffect(() => {
    const sync = () => setInfo(detectPlatform())
    sync()

    window.addEventListener('resize', sync, { passive: true })
    window.addEventListener('orientationchange', sync, { passive: true })

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMq = () => sync()
    if (mq.addEventListener) mq.addEventListener('change', onMq)
    else mq.addListener(onMq)

    return () => {
      window.removeEventListener('resize', sync)
      window.removeEventListener('orientationchange', sync)
      if (mq.removeEventListener) mq.removeEventListener('change', onMq)
      else mq.removeListener(onMq)
    }
  }, [])

  return info
}
