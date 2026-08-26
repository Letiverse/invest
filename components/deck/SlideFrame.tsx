'use client'
import { useRef, useEffect, useState, useCallback } from 'react'
import { useMotionValue, useSpring, motion } from 'motion/react'

const REF_W = 1920
const REF_H = 1080

interface SlideFrameProps {
  children: React.ReactNode
}

const TILT_MAX = 1.5   // degrees
const PERSPECTIVE = 1600 // px

/**
 * Scales a fixed 1920×1080 slide to fill the parent container,
 * maintaining 16:9 aspect ratio with letterbox/pillarbox as needed.
 *
 * On non-touch desktop, adds a subtle 3D tilt (±1.5°) driven by the
 * cursor position. Guard: skips on touch devices and prefers-reduced-motion.
 */
export function SlideFrame({ children }: SlideFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 })
  const [reducedMotion, setReducedMotion] = useState(
    () => (typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : true)
  )
  const [isTouch, setIsTouch] = useState(
    () => (typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : true)
  )

  // Raw motion values — normalised offset [-0.5, 0.5]
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Springy rotate values
  const rotateY = useSpring(rawX, { stiffness: 80, damping: 25, mass: 0.5 })
  const rotateX = useSpring(rawY, { stiffness: 80, damping: 25, mass: 0.5 })

  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointerMq = window.matchMedia('(pointer: coarse)')
    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    const pointerHandler = (e: MediaQueryListEvent) => setIsTouch(e.matches)

    motionMq.addEventListener('change', motionHandler)
    pointerMq.addEventListener('change', pointerHandler)

    return () => {
      motionMq.removeEventListener('change', motionHandler)
      pointerMq.removeEventListener('change', pointerHandler)
    }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      const w = el.offsetWidth
      const h = el.offsetHeight
      // Portrait mobile: fill height so content is readable (16:9 content is wider
      // than the viewport, left/right will crop — vastly better than tiny letterbox).
      // Landscape + desktop: contain (letterbox) to show the full slide.
      // Small landscape (≤900px wide or ≤700px tall): allow up to 4% crop on the
      // shorter axis so content reads larger without losing meaningful pixels.
      const isPortraitMobile = isTouch && h > w
      let s: number
      if (isPortraitMobile) {
        s = h / REF_H
      } else {
        const contain = Math.min(w / REF_W, h / REF_H)
        const cover = Math.max(w / REF_W, h / REF_H)
        const isSmall = w < 900 || h < 700
        // On small screens (phones/small tablets in landscape) fill 95% of the
        // available height — enough to read comfortably while leaving room for
        // the nav buttons at the edges. Capped at cover to avoid over-cropping.
        s = isSmall ? Math.min(cover, Math.max(contain, (h * 0.95) / REF_H)) : contain
      }
      setTransform({ scale: s, x: (w - REF_W * s) / 2, y: (h - REF_H * s) / 2 })
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [isTouch])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || isTouch) return
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5   // -0.5 → 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    rawX.set(nx * TILT_MAX * 2)
    rawY.set(-ny * TILT_MAX * 2)
  }, [reducedMotion, isTouch, rawX, rawY])

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  const tiltEnabled = !reducedMotion && !isTouch

  return (
    <div
      ref={containerRef}
      data-testid="slide-frame-container"
      className="absolute inset-0 overflow-hidden"
      style={{ perspective: tiltEnabled ? `${PERSPECTIVE}px` : undefined }}
      onMouseMove={tiltEnabled ? handleMouseMove : undefined}
      onMouseLeave={tiltEnabled ? handleMouseLeave : undefined}
    >
      {/* Outer: layout scaling (plain div — no transform conflict) */}
      <div
        style={{
          position: 'absolute',
          width: REF_W,
          height: REF_H,
          transformOrigin: 'top left',
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
        }}
      >
        {/* Inner: 3D tilt only + vignette glow (motion.div — owns rotateX/Y) */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            fontFamily: "var(--font-geist-sans), 'Geist', system-ui, -apple-system, sans-serif",
            boxShadow: '0 0 40px rgba(52,233,226,0.25), 0 0 0 1px rgba(52,233,226,0.18), inset 0 0 120px rgba(52,233,226,0.07)',
            rotateX: tiltEnabled ? rotateX : 0,
            rotateY: tiltEnabled ? rotateY : 0,
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
