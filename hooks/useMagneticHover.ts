'use client'
import { useRef, useCallback } from 'react'
import { useMotionValue, useSpring, MotionValue } from 'motion/react'

interface MagneticHoverOptions {
  /** Distance in px from element centre to start attracting (default 80) */
  threshold?: number
  /** Max attraction distance in px (default 8) */
  strength?: number
}

interface MagneticHoverResult<T extends HTMLElement> {
  ref: React.RefObject<T | null>
  x: MotionValue<number>
  y: MotionValue<number>
  onMouseMove: (e: React.MouseEvent) => void
  onMouseLeave: () => void
}

/**
 * Magnetic hover — element drifts toward the cursor when it enters
 * the threshold radius. Springs back on leave.
 *
 * The center is cached on first move and cleared on leave, preventing
 * the getBoundingClientRect feedback loop that caused jitter.
 *
 * Usage:
 *   const { ref, x, y, onMouseMove, onMouseLeave } = useMagneticHover<HTMLButtonElement>()
 *   <motion.button ref={ref} style={{ x, y }} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
 */
export function useMagneticHover<T extends HTMLElement = HTMLElement>({
  threshold = 80,
  strength = 8,
}: MagneticHoverOptions = {}): MagneticHoverResult<T> {
  const ref = useRef<T>(null)
  const centerRef = useRef<{ cx: number; cy: number } | null>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 200, damping: 20, mass: 0.3 })
  const y = useSpring(rawY, { stiffness: 200, damping: 20, mass: 0.3 })

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return

    // Cache center on first movement to avoid feedback loop from element translation
    if (!centerRef.current) {
      const rect = el.getBoundingClientRect()
      centerRef.current = {
        cx: rect.left + rect.width / 2 - x.get(),
        cy: rect.top + rect.height / 2 - y.get(),
      }
    }

    const { cx, cy } = centerRef.current
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < threshold) {
      const pull = (threshold - dist) / threshold  // 0→1 as cursor approaches
      rawX.set(dx * pull * (strength / threshold))
      rawY.set(dy * pull * (strength / threshold))
    } else {
      // Outside threshold — spring back to rest so it doesn't stick
      rawX.set(0)
      rawY.set(0)
    }
  }, [threshold, strength, rawX, rawY, x, y])

  const onMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
    centerRef.current = null  // Reset cache so center recalculates on next hover
  }, [rawX, rawY])

  return { ref, x, y, onMouseMove, onMouseLeave }
}
