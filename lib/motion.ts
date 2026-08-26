/**
 * Motion constants for the LOCKED Cinematic Pass (research/04-decision-register.md D1).
 *
 * Two-tier transition philosophy:
 *  - Default: every slide gets a fast 400ms scale/y/opacity dissolve.
 *  - Chapter signature: slides 6 / 10 / 15 / 22 (the four chapter slide IDs)
 *    get a 650ms branded sweep on top of the default.
 *
 * Rejected: 1100ms Locomotive sweep on every slide (cargo-culted from agency
 * portfolio sites; investors clicking forward 17 times perceive it as sluggish).
 *
 * Easing: cubic-bezier(0.6, 0.01, 0, 1) — premium-tech quick-out, gentle-in.
 * Used by Linear, Vercel, Anthropic for product UI transitions.
 */

import type { Variants, Transition } from 'motion/react'

/** Premium tech quick-out / gentle-in — Linear / Vercel / Anthropic flavour. */
export const EASE_INVESTOR = [0.6, 0.01, 0, 1] as [number, number, number, number]

/** Sharper version for chapter sweep — Material easeOutExpo flavour. */
export const EASE_CHAPTER = [0.16, 1, 0.3, 1] as [number, number, number, number]

/** Default slide-to-slide transition: 400ms. */
export const T_DEFAULT_S = 0.4

/** Chapter signature transition: 650ms (hard cap). Only at chapter slide IDs. */
export const T_CHAPTER_S = 0.65

/** Chapter slides where the signature sweep replaces the default dissolve. */
export const CHAPTER_SLIDES = new Set([6, 10, 15, 22])

/** Stagger for in-slide reveal sequencing. */
export const STAGGER_BASE_S = 0.06

/** Vertical lift in px for default dissolve. */
export const Y_LIFT_PX = 8

/** Spring presets matched to the easing system. */
export const TRANSITION_DEFAULT: Transition = {
  type: 'tween',
  duration: T_DEFAULT_S,
  ease: EASE_INVESTOR,
}

export const TRANSITION_CHAPTER: Transition = {
  type: 'tween',
  duration: T_CHAPTER_S,
  ease: EASE_CHAPTER,
}

/**
 * Default investor dissolve — scale 0.985→1, y 8→0, opacity 0→1.
 * Total time: 400ms. Used for slides NOT in CHAPTER_SLIDES.
 */
export const investorDissolve: Variants = {
  enter: {
    opacity: 0,
    scale: 0.985,
    y: Y_LIFT_PX,
    willChange: 'transform, opacity',
  },
  center: {
    opacity: 1,
    scale: 1,
    y: 0,
    willChange: 'transform, opacity',
  },
  exit: {
    opacity: 0,
    scale: 1.005,
    y: -Y_LIFT_PX / 2,
    willChange: 'transform, opacity',
  },
}

/**
 * Chapter signature — wider scale/y travel + held longer.
 * The accompanying mask sweep is rendered as a sibling overlay in SlideTransition.
 * Total time: 650ms.
 */
export const chapterSignature: Variants = {
  enter: {
    opacity: 0,
    scale: 0.97,
    y: 18,
    willChange: 'transform, opacity',
  },
  center: {
    opacity: 1,
    scale: 1,
    y: 0,
    willChange: 'transform, opacity',
  },
  exit: {
    opacity: 0,
    scale: 1.01,
    y: -10,
    willChange: 'transform, opacity',
  },
}

/**
 * Reduced-motion variant — opacity only, 200ms. Strictly applied when
 * prefers-reduced-motion is set.
 */
export const reducedMotionVariant: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
}

export const TRANSITION_REDUCED: Transition = {
  type: 'tween',
  duration: 0,
  ease: 'linear',
}

/**
 * Helper: choose variant + transition for the current slide ID.
 *
 * Pass `isTouchDevice` from `usePlatform()` to get spring-based transitions
 * on touch devices (better iOS/Android swipe feel). Chapter slides keep their
 * cinematic tween regardless of device.
 */
export function selectVariant(
  currentSlide: number,
  prefersReducedMotion: boolean,
  isTouchDevice = false,
) {
  if (prefersReducedMotion) {
    return { variants: reducedMotionVariant, transition: TRANSITION_REDUCED, isChapter: false }
  }
  if (CHAPTER_SLIDES.has(currentSlide)) {
    return { variants: chapterSignature, transition: TRANSITION_CHAPTER, isChapter: true }
  }
  const transition = isTouchDevice ? getPlatformTransition(true) : TRANSITION_DEFAULT
  return { variants: investorDissolve, transition, isChapter: false }
}

/**
 * Slide content container — orchestrates children stagger entrance.
 *
 * Usage:
 *   <motion.div variants={slideContentContainer} initial="hidden" animate="show">
 *     <motion.div variants={slideContentItem}>headline</motion.div>
 *     <motion.div variants={slideContentItem}>body</motion.div>
 *   </motion.div>
 *
 * Children animate sequentially at 80ms intervals after a 150ms initial delay.
 * No manual per-element delay needed.
 */
export const slideContentContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

/**
 * Slide content item — blur-fade-up entrance for each staggered child.
 * Pairs with slideContentContainer.
 */
export const slideContentItem: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: 'blur(4px)',
  },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'tween',
      duration: 0.5,
      ease: EASE_INVESTOR,
    },
  },
}

/**
 * Platform-adaptive transition — spring for touch devices (iOS/Android feel),
 * tween for desktop (premium control feel).
 *
 * Pass `isTouchDevice` from `usePlatform()`.
 */
export function getPlatformTransition(isTouchDevice: boolean): import('motion/react').Transition {
  if (isTouchDevice) {
    return { type: 'spring', stiffness: 280, damping: 24 }
  }
  return TRANSITION_DEFAULT
}
