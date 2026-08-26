'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { usePlatform } from '@/hooks/usePlatform'
import { DECK_EFFECTS } from '@/lib/effectFlags'

interface CursorSpotlightProps {
  /** Diameter of the focused spotlight area (px). Default 520. */
  size?: number
  /** Strength of the surrounding dim. 0 = no dim, 1 = full black. Default 0.45. */
  intensity?: number
  /** Spotlight tint hex (no #). Default teal. */
  tint?: string
  /** Initial "centred" focus duration before it follows the cursor (ms). Default 1500. */
  introDuration?: number
  /** Idle ms before the spotlight fades open again. Default 6000. */
  idleTimeout?: number
}

/**
 * Cursor-following spotlight overlay.
 *
 * - Mounts ABOVE slide content with `pointer-events: none` so it never
 *   intercepts clicks on links/buttons/CTAs.
 * - First 1.5s: spotlight is locked centre-frame so the headline reads cleanly.
 * - On pointer movement: tracks the cursor with a soft easing.
 * - After 6s of no movement: fades the dim down to 0 so reading is unobstructed.
 * - Disabled automatically on touch devices, reduced-motion, and via the
 *   `DECK_EFFECTS.cursorSpotlight` kill switch.
 */
export function CursorSpotlight({
  size = 520,
  intensity = 0.45,
  tint = '52,233,226',
  introDuration = 1500,
  idleTimeout = 6000,
}: CursorSpotlightProps) {
  const { isTouchDevice, reducedMotion, deviceType } = usePlatform()
  const enabled =
    DECK_EFFECTS.cursorSpotlight &&
    !isTouchDevice &&
    !reducedMotion &&
    deviceType === 'desktop'

  const ref = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const idleRef = useRef<number | null>(null)
  const [active, setActive] = useState(false)
  const [intro, setIntro] = useState(true)

  useEffect(() => {
    if (!enabled) return

    // Centre on mount so the spotlight reads "look here" rather than hiding content.
    const el = ref.current
    if (el) {
      el.style.setProperty('--sx', '50%')
      el.style.setProperty('--sy', '50%')
    }

    const introTimer = window.setTimeout(() => setIntro(false), introDuration)

    const onMove = (e: PointerEvent) => {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        const node = ref.current
        if (!node) return
        const rect = node.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        node.style.setProperty('--sx', `${x}%`)
        node.style.setProperty('--sy', `${y}%`)
      })
      setActive(true)
      if (idleRef.current) window.clearTimeout(idleRef.current)
      idleRef.current = window.setTimeout(() => setActive(false), idleTimeout)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.clearTimeout(introTimer)
      if (idleRef.current) window.clearTimeout(idleRef.current)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [enabled, introDuration, idleTimeout])

  if (!enabled) return null

  // Effective dim: full intensity during intro and while active, fades to 0 when idle.
  const effectiveIntensity = intro || active ? intensity : 0

  return (
    <motion.div
      ref={ref}
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        top: 0, right: 0, bottom: 0, left: 0,
        pointerEvents: 'none',
        zIndex: 4,
        // Two-stop radial — bright tint at centre, fades to dim outside.
        background: `radial-gradient(circle ${size / 2}px at var(--sx, 50%) var(--sy, 50%),
          rgba(${tint}, 0.22) 0%,
          rgba(${tint}, 0.06) 35%,
          rgba(0, 0, 0, ${effectiveIntensity}) 100%)`,
        transition: 'background 320ms ease-out',
        mixBlendMode: 'screen',
      }}
    />
  )
}
