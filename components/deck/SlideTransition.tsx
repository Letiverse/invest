'use client'
import { AnimatePresence, motion } from 'motion/react'
import { useSlideDirection } from '@/hooks/useDeck'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { selectVariant, CHAPTER_SLIDES } from '@/lib/motion'
import { ChapterSweep } from './ChapterSweep'

interface SlideTransitionProps {
  children: React.ReactNode
  slideId: number
}

/**
 * Per LOCKED Cinematic Pass D1 — two-tier transitions:
 *  - Default: 400ms scale/y/opacity dissolve, cubic-bezier(0.6, 0.01, 0, 1)
 *  - Chapter (slides 6/9/12/18 forward): 650ms with branded ChapterSweep overlay
 *  - Reduced motion: 200ms opacity-only fade
 */
export function SlideTransition({ children, slideId }: SlideTransitionProps) {
  const { currentSlide, prevSlide } = useSlideDirection()
  const dir = currentSlide >= prevSlide ? 1 : -1
  const reducedMotion = useReducedMotion()
  const { variants, transition, isChapter } = selectVariant(currentSlide, reducedMotion)

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={slideId}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="absolute inset-0"
          data-testid="slide-container"
          data-slide-id={slideId}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <ChapterSweep active={isChapter && CHAPTER_SLIDES.has(slideId)} direction={dir} />
    </div>
  )
}
