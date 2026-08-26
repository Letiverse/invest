'use client'
import { useState } from 'react'
import { motion } from 'motion/react'
import dynamic from 'next/dynamic'
import { useDeckStore } from '@/store/deckStore'
import { SLIDES } from '@/lib/slides'
import { DECK_EFFECTS } from '@/lib/effectFlags'

// Per-chapter animated backgrounds — lazy-loaded, SSR skipped (WebGL/Canvas)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SplashCursor = dynamic<any>(() => import('@/components/SplashCursor') as Promise<any>, { ssr: false })
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SoftAurora = dynamic<any>(() => import('@/components/SoftAurora') as Promise<any>, { ssr: false })
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DotField = dynamic<any>(() => import('@/components/DotField') as Promise<any>, { ssr: false })

function HudCorner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const isTop  = position[0] === 't'
  const isLeft = position[1] === 'l'

  const containerStyle: React.CSSProperties = {
    position: 'absolute', width: 44, height: 44,
    transformOrigin: `${isTop ? 'top' : 'bottom'} ${isLeft ? 'left' : 'right'}`,
    ...(isTop  ? { top: 28 }  : { bottom: 28 }),
    ...(isLeft ? { left: 28 } : { right: 28 }),
  }
  const hLine: React.CSSProperties = {
    position: 'absolute', width: 44, height: 2,
    backgroundColor: '#34E9E2', opacity: 0.7,
    ...(isTop  ? { top: 0 }    : { bottom: 0 }),
    ...(isLeft ? { left: 0 }   : { right: 0 }),
  }
  const vLine: React.CSSProperties = {
    position: 'absolute', width: 2, height: 44,
    backgroundColor: '#34E9E2', opacity: 0.7,
    ...(isTop  ? { top: 0 }    : { bottom: 0 }),
    ...(isLeft ? { left: 0 }   : { right: 0 }),
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={containerStyle}
    >
      <div style={hLine} />
      <div style={vLine} />
    </motion.div>
  )
}

/** Full-deck chapter title card — a first-class slide, no overlay magic. */
export function SlideChapter() {
  // Freeze at mount — prevents title flashing to next slide during exit animation
  const [slide] = useState(() => {
    const id = useDeckStore.getState().currentSlide
    return SLIDES.find(s => s.id === id)
  })
  const chapterId = slide?.id ?? 0

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: '#050D1C' }}
    >
      {/* Per-chapter animated background */}
      {DECK_EFFECTS.reactBitsBackgrounds && chapterId === 6 && <SplashCursor />}

      {DECK_EFFECTS.reactBitsBackgrounds && chapterId === 10 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <SoftAurora
            color1="#050D1C"
            color2="#34E9E2"
            speed={0.4}
            brightness={0.55}
            bandHeight={0.55}
            enableMouseInteraction={false}
          />
        </div>
      )}

      {DECK_EFFECTS.reactBitsBackgrounds && chapterId === 15 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <DotField
            dotRadius={1.5}
            dotSpacing={18}
            gradientFrom="rgba(52,233,226,0.28)"
            gradientTo="rgba(5,13,28,0)"
            glowColor="#34E9E2"
            sparkle={true}
            bulgeStrength={80}
            cursorRadius={300}
          />
        </div>
      )}
      <HudCorner position="tl" />
      <HudCorner position="tr" />
      <HudCorner position="bl" />
      <HudCorner position="br" />

      {/* Chapter label (e.g. "CHAPTER 02 · OPPORTUNITY") */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          fontSize: 11, letterSpacing: '3.5px',
          color: '#34E9E2', fontWeight: 600,
          marginBottom: 20, textTransform: 'uppercase',
          fontFamily: "var(--font-geist-sans), 'Geist', system-ui, -apple-system, sans-serif",
        }}
      >
        {slide?.subtitle ?? ''}
      </motion.div>

      {/* Large headline (e.g. "THE MARKET.") */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
          fontWeight: 900,
          letterSpacing: '-0.01em',
          color: '#ffffff',
          textAlign: 'center',
          lineHeight: 1.05,
        }}
      >
        {slide?.title ?? ''}
      </motion.div>

      {/* Scroll/click hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        style={{
          position: 'absolute',
          bottom: 72,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 10,
          letterSpacing: '2.5px',
          color: '#9EF6F2',
          fontFamily: "var(--font-geist-sans), 'Geist', system-ui, -apple-system, sans-serif",
          whiteSpace: 'nowrap',
        }}
      >
        SCROLL OR CLICK TO CONTINUE →
      </motion.div>
    </div>
  )
}
