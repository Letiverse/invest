'use client'

/**
 * BootSequence — first-paint cinematic intro per LOCKED Cinematic Pass D3+D4.
 *
 * Phase timeline (1400ms preferred, 2000ms hard cap):
 *   0-200ms  : dark teal radial wash settles
 *   200-700ms: SVG wireframe spatial grid draws in (stroke-dasharray)
 *   700-1100ms: grid folds toward centre (scale + rotate)
 *   1100-1400ms: icosahedron silhouette pulses + cross-fades to deck
 *
 * Skippable from 500ms via any keypress / click / touch.
 * Returning visitors (sessionStorage flag) skip entirely.
 * Reduced-motion variant: 600ms simple fade-in only.
 * WebGL-disabled variant: SVG-only path (no Canvas needed; we render SVG already).
 *
 * Dispatches `deck:boot-complete` event on finish for downstream consumers
 * (e.g. SlidePreloader can drop its own splash).
 */

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const STORAGE_KEY = 'letiv-boot-seen'
const BOOT_COMPLETE_EVENT = 'deck:boot-complete'

const T_PHASE1_MS = 200
const T_PHASE2_MS = 500
const T_PHASE3_MS = 400
const T_PHASE4_MS = 300
const T_TOTAL_MS = T_PHASE1_MS + T_PHASE2_MS + T_PHASE3_MS + T_PHASE4_MS // 1400ms
const T_SKIPPABLE_FROM_MS = 500
const T_HARD_CAP_MS = 2000

type Phase = 'wash' | 'grid' | 'fold' | 'pulse' | 'done'

function dispatchBootComplete() {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {}
  document.dispatchEvent(new CustomEvent(BOOT_COMPLETE_EVENT))
}

export function BootSequence() {
  const reducedMotion = useReducedMotion()
  // Lazy-initialize: skip immediately for returning visitors to avoid a
  // first-render flash of the motion.div (which can crash some environments).
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    try {
      return sessionStorage.getItem(STORAGE_KEY) !== '1'
    } catch {
      return true
    }
  })
  const [phase, setPhase] = useState<Phase>('wash')
  const [canSkip, setCanSkip] = useState(false)
  const phaseTimers = useRef<number[]>([])
  const startTime = useRef<number>(0)

  // Returning visitor — skip entirely
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') {
        setVisible(false)
        dispatchBootComplete()
      }
    } catch {}
  }, [])

  useEffect(() => {
    if (!visible) return
    startTime.current = performance.now()

    const sched = (ms: number, fn: () => void) => {
      phaseTimers.current.push(window.setTimeout(fn, ms))
    }

    if (reducedMotion) {
      // Simple 600ms fade — no phases
      sched(600, () => {
        setVisible(false)
        dispatchBootComplete()
      })
    } else {
      sched(T_PHASE1_MS, () => setPhase('grid'))
      sched(T_PHASE1_MS + T_PHASE2_MS, () => setPhase('fold'))
      sched(T_PHASE1_MS + T_PHASE2_MS + T_PHASE3_MS, () => setPhase('pulse'))
      sched(T_TOTAL_MS, () => {
        setPhase('done')
        setVisible(false)
        dispatchBootComplete()
      })
      // Hard cap insurance — if anything stalls
      sched(T_HARD_CAP_MS, () => {
        setVisible(false)
        dispatchBootComplete()
      })
      sched(T_SKIPPABLE_FROM_MS, () => setCanSkip(true))
    }

    return () => {
      phaseTimers.current.forEach(t => clearTimeout(t))
      phaseTimers.current = []
    }
  }, [visible, reducedMotion])

  useEffect(() => {
    if (!visible || !canSkip) return
    const handler = (e: Event) => {
      // Only honour user-input gestures
      if (
        e.type === 'keydown' ||
        e.type === 'click' ||
        e.type === 'touchstart' ||
        e.type === 'pointerdown'
      ) {
        setVisible(false)
        dispatchBootComplete()
      }
    }
    window.addEventListener('keydown', handler)
    window.addEventListener('click', handler)
    window.addEventListener('touchstart', handler, { passive: true })
    window.addEventListener('pointerdown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      window.removeEventListener('click', handler)
      window.removeEventListener('touchstart', handler)
      window.removeEventListener('pointerdown', handler)
    }
  }, [visible, canSkip])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.6, 0.01, 0, 1] } }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              'radial-gradient(ellipse at center, #062236 0%, #041229 45%, #02070F 100%)',
            cursor: canSkip ? 'pointer' : 'default',
          }}
          aria-label="Loading Letiverse investor deck"
          role="status"
        >
          {!reducedMotion && <WireframeGrid phase={phase} />}
          {reducedMotion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{ color: '#34E9E2', fontSize: 12, letterSpacing: 4, fontWeight: 700 }}
            >
              LETIVERSE
            </motion.div>
          )}
          {canSkip && !reducedMotion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                bottom: 28,
                color: 'rgba(255,255,255,0.55)',
                fontSize: 10,
                letterSpacing: 2.5,
                fontWeight: 600,
              }}
            >
              CLICK / KEY TO SKIP
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function WireframeGrid({ phase }: { phase: Phase }) {
  // Build a 6x6 wireframe grid + diagonals; will fold + pulse via transforms
  const cells: { x1: number; y1: number; x2: number; y2: number }[] = []
  const N = 6
  const SIZE = 240
  const STEP = SIZE / N
  for (let i = 0; i <= N; i++) {
    cells.push({ x1: 0, y1: i * STEP, x2: SIZE, y2: i * STEP })
    cells.push({ x1: i * STEP, y1: 0, x2: i * STEP, y2: SIZE })
  }
  cells.push({ x1: 0, y1: 0, x2: SIZE, y2: SIZE })
  cells.push({ x1: SIZE, y1: 0, x2: 0, y2: SIZE })

  // Phase-driven transform on the SVG group
  const groupTransform = (() => {
    switch (phase) {
      case 'wash':
        return { scale: 1, rotate: 0, opacity: 0 }
      case 'grid':
        return { scale: 1, rotate: 0, opacity: 1 }
      case 'fold':
        return { scale: 0.55, rotate: 22, opacity: 0.95 }
      case 'pulse':
        return { scale: 0.42, rotate: 38, opacity: 1 }
      default:
        return { scale: 0.4, rotate: 45, opacity: 0 }
    }
  })()

  return (
    <motion.svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      style={{ position: 'absolute' }}
    >
      <motion.g
        initial={{ opacity: 0, scale: 1, rotate: 0 }}
        animate={groupTransform}
        transition={{ duration: 0.45, ease: [0.6, 0.01, 0, 1] }}
        style={{ transformOrigin: `${SIZE / 2}px ${SIZE / 2}px` }}
      >
        {cells.map((c, i) => (
          <motion.line
            key={i}
            x1={c.x1}
            y1={c.y1}
            x2={c.x2}
            y2={c.y2}
            stroke="#34E9E2"
            strokeWidth={1}
            strokeOpacity={0.55}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              phase === 'wash'
                ? { pathLength: 0, opacity: 0 }
                : phase === 'grid'
                  ? { pathLength: 1, opacity: 0.65 }
                  : { pathLength: 1, opacity: 0.85 }
            }
            transition={{
              duration: phase === 'grid' ? 0.45 : 0.25,
              ease: [0.6, 0.01, 0, 1],
              delay: phase === 'grid' ? (i % N) * 0.018 : 0,
            }}
          />
        ))}
      </motion.g>

      {/* Icosahedron silhouette — appears in pulse phase */}
      {(phase === 'fold' || phase === 'pulse' || phase === 'done') && (
        <motion.polygon
          points={(() => {
            // 2D projection of icosahedron front-face triangulation (stylised)
            const cx = SIZE / 2
            const cy = SIZE / 2
            const r = 60
            const pts: string[] = []
            for (let i = 0; i < 6; i++) {
              const a = (i / 6) * Math.PI * 2 - Math.PI / 2
              pts.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`)
            }
            return pts.join(' ')
          })()}
          fill="none"
          stroke="#34E9E2"
          strokeWidth={1.2}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: phase === 'pulse' ? 1 : 0.45,
            scale: phase === 'pulse' ? 1.05 : 0.85,
          }}
          transition={{ duration: 0.32, ease: [0.6, 0.01, 0, 1] }}
          style={{
            transformOrigin: `${SIZE / 2}px ${SIZE / 2}px`,
            filter: 'drop-shadow(0 0 12px rgba(52,233,226,0.85))',
          }}
        />
      )}
    </motion.svg>
  )
}
