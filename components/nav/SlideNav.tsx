'use client'
import { ChevronLeft, ChevronRight, Map, Volume2, VolumeX } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useDeck } from '@/hooks/useDeck'
import { TOTAL_SLIDES } from '@/lib/slides'
import { useMagneticHover } from '@/hooks/useMagneticHover'
import { playClick } from '@/components/deck/UISounds'
import { NavPolyhedron } from '@/components/three/NavPolyhedron'
import { cn } from '@/lib/utils'

const glowPulse = {
  boxShadow: [
    '0 0 8px rgba(52,233,226,0.45)',
    '0 0 22px rgba(52,233,226,0.95), 0 0 40px rgba(52,233,226,0.45)',
    '0 0 8px rgba(52,233,226,0.45)',
  ],
}

const CHAPTERS = [
  { label: 'VISION',      range: [1, 3] as const },
  { label: 'PROOF',       range: [4, 5] as const },
  { label: 'OPPORTUNITY', range: [6, 9] as const },
  { label: 'REVENUE',     range: [10, 14] as const },
  { label: 'EVIDENCE',    range: [15, 19] as const },
  { label: 'NUMBERS',     range: [20, 22] as const },
]

function chapterForSlide(slide: number) {
  return CHAPTERS.find(ch => slide >= ch.range[0] && slide <= ch.range[1])?.label ?? 'DECK'
}

export function SlideNav() {
  const { currentSlide, next, prev, toggleMap, narrationEnabled, setNarrationEnabled } = useDeck()
  const chapter = chapterForSlide(currentSlide)
  const prevMag = useMagneticHover()
  const nextMag = useMagneticHover()

  return (
    <>
      {/* Chapter orientation badge with NavPolyhedron brand-mark */}
      <motion.div
        key={`chapter-${chapter}`}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        data-testid="chapter-badge"
        className="hidden min-[521px]:flex absolute top-4 left-4 z-50 pointer-events-none select-none rounded-md border border-[#34E9E2]/45 bg-[#041229]/82 px-3 py-2 backdrop-blur-sm items-center gap-3"
      >
        <div style={{ width: 38, height: 38, flexShrink: 0 }}>
          <NavPolyhedron size={38} />
        </div>
        <div>
          <div style={{ fontSize: 9, letterSpacing: '2.4px', color: 'rgba(255,255,255,0.45)', marginBottom: 3 }}>
            CHAPTER
          </div>
          <div style={{ fontSize: 11, letterSpacing: '2.8px', color: '#9EF6F2', fontWeight: 700 }}>
            {chapter}
          </div>
        </div>
      </motion.div>

      {/* Left-side prev arrow — vertically centred */}
      <motion.button
        ref={prevMag.ref as React.RefObject<HTMLButtonElement>}
        onClick={() => { playClick(); prev() }}
        disabled={currentSlide <= 1}
        animate={currentSlide > 1 ? glowPulse : { boxShadow: '0 0 0px rgba(52,233,226,0)' }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ boxShadow: '0 0 8px rgba(52,233,226,0.35)' }}
        className="absolute left-5 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#041229]/85 backdrop-blur-md border border-[#34E9E2]/65 flex items-center justify-center text-[#9EF6F2] hover:text-[#34E9E2] hover:bg-[#041229]/95 hover:border-[#34E9E2] disabled:opacity-35 disabled:cursor-not-allowed transition-colors z-50"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </motion.button>

      {/* Right-side next arrow — hidden on last slide so there's no false promise of more content */}
      <AnimatePresence>
        {currentSlide < TOTAL_SLIDES && (
          <motion.button
            key="next-btn"
            ref={nextMag.ref as React.RefObject<HTMLButtonElement>}
            onClick={() => { playClick(); next() }}
            animate={glowPulse}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ opacity: 1, boxShadow: '0 0 8px rgba(52,233,226,0.35)' }}
            className="absolute right-5 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#041229]/85 backdrop-blur-md border border-[#34E9E2]/65 flex items-center justify-center text-[#9EF6F2] hover:text-[#34E9E2] hover:bg-[#041229]/95 hover:border-[#34E9E2] transition-colors z-50"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Top-right utility buttons — z-[60] keeps them above the slide map overlay (z-50) */}
      <div className="absolute top-4 right-4 flex gap-2 z-[60]">
        <button
          onClick={() => setNarrationEnabled(!narrationEnabled)}
          className={cn(
            'w-11 h-11 rounded-full flex items-center justify-center transition-[colors,box-shadow]',
            narrationEnabled
              ? 'bg-[#34E9E2] border border-[#34E9E2] text-[#050D1C] shadow-[0_0_12px_rgba(52,233,226,0.55)] hover:shadow-[0_0_16px_rgba(52,233,226,0.75)]'
              : 'bg-[#041229]/80 backdrop-blur-sm border border-[#34E9E2]/30 text-white/70 hover:text-[#34E9E2] hover:border-[#34E9E2]/70',
          )}
          aria-label={narrationEnabled ? 'Mute narration' : 'Unmute narration'}
          aria-pressed={narrationEnabled}
          title={narrationEnabled ? 'Narration ON' : 'Narration OFF'}
        >
          {narrationEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
        </button>
        <button
          onClick={toggleMap}
          className="w-11 h-11 rounded-full bg-[#041229]/80 backdrop-blur-sm border border-[#34E9E2]/30 flex items-center justify-center text-white/70 hover:text-[#34E9E2] hover:border-[#34E9E2]/70 transition-colors"
          aria-label="Slide map"
          title="Slide map (all slides)"
        >
          <Map size={15} />
        </button>
      </div>

      {/* Bottom-left slide counter */}
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        data-testid="slide-counter"
        className="absolute bottom-12 left-4 z-50 pointer-events-none select-none"
        style={{ fontFamily: 'monospace' }}
      >
        <span style={{ fontSize: 13, fontWeight: 700, color: '#34E9E2', letterSpacing: '1px' }}>
          {String(currentSlide).padStart(2, '0')}
        </span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '1px' }}>
          {' '}/ {String(TOTAL_SLIDES).padStart(2, '0')}
        </span>
      </motion.div>
    </>
  )
}
