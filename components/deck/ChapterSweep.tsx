'use client'

/**
 * ChapterSweep — the branded mask-sweep overlay rendered on top of the
 * default slide transition for chapter slides (6/9/12/18 forward).
 *
 * Per research/04-decision-register.md D1: 650ms hard cap. Only on forward
 * direction at chapter boundaries. NOT a per-slide effect.
 *
 * Two layers:
 *   1. Teal underline scribe (left → right, 1px tall)
 *   2. Subtle radial mask wash (centre → out, 8% teal)
 *
 * Animation runs once per mount, then fades. Sibling to the slide content,
 * z-index above so the slide reads behind it.
 */
import { motion } from 'motion/react'
import { EASE_CHAPTER } from '@/lib/motion'

interface ChapterSweepProps {
  active: boolean
  /** 1 forward, -1 backward; sweep only renders forward */
  direction: number
}

export function ChapterSweep({ active, direction }: ChapterSweepProps) {
  if (!active || direction !== 1) return null

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 25,
        overflow: 'hidden',
      }}
    >
      {/* Teal scribe — appears immediately, sweeps L→R, fades */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0.95 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ duration: 0.65, ease: EASE_CHAPTER }}
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent 0%, rgba(52,233,226,0.85) 35%, rgba(52,233,226,1) 50%, rgba(52,233,226,0.85) 65%, transparent 100%)',
          transformOrigin: 'left center',
          boxShadow: '0 0 18px rgba(52,233,226,0.8)',
        }}
      />

      {/* Radial wash — soft teal pulse from centre, fades */}
      <motion.div
        initial={{ opacity: 0.18, scale: 0.8 }}
        animate={{ opacity: 0, scale: 1.4 }}
        transition={{ duration: 0.6, ease: EASE_CHAPTER, delay: 0.05 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(52,233,226,0.22) 0%, rgba(52,233,226,0.08) 35%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}
