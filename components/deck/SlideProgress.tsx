'use client'
import { motion } from 'motion/react'
import { useCurrentSlide } from '@/hooks/useDeck'
import { TOTAL_SLIDES } from '@/lib/slides'

/** Thin teal progress bar fixed to the very top of the viewport */
export function SlideProgress() {
  const currentSlide = useCurrentSlide()
  const pct = (currentSlide / TOTAL_SLIDES) * 100

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        zIndex: 1100,
        backgroundColor: 'rgba(255,255,255,0.05)',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        data-testid="slide-progress-fill"
        data-pct={pct.toFixed(5)}
        initial={{ width: '0%' }}
        style={{
          height: '100%',
          backgroundColor: '#34E9E2',
          boxShadow: '0 0 8px rgba(52,233,226,0.9), 0 0 16px rgba(52,233,226,0.4)',
          transformOrigin: 'left',
        }}
        animate={{ width: `${pct}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />
    </div>
  )
}
