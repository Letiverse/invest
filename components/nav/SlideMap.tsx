'use client'
import { useEffect } from 'react'
import { X } from 'lucide-react'
import { motion } from 'motion/react'
import { useDeck } from '@/hooks/useDeck'
import { SLIDES } from '@/lib/slides'

const CHAPTERS = [
  { label: 'Vision',      slides: [1, 2, 3] },
  { label: 'Proof',       slides: [4, 5] },
  { label: 'Opportunity', slides: [6, 7, 8, 9] },
  { label: 'Revenue',     slides: [10, 11, 12, 13, 14] },
  { label: 'Evidence',    slides: [15, 16, 17, 18, 19] },
  { label: 'Numbers',     slides: [20, 21, 22] },
]

const slideById = (id: number) => SLIDES.find(s => s.id === id)

export function SlideMap() {
  const { currentSlide, goTo, toggleMap } = useDeck()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') toggleMap() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [toggleMap])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'tween', duration: 0.3 }}
      data-testid="slide-map"
      className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center p-6 overflow-y-auto"
    >
      <div className="relative w-full max-w-5xl py-2">
        <button
          data-testid="slide-map-close"
          onClick={toggleMap}
          className="absolute -top-1 right-0 text-white/60 hover:text-white"
        >
          <X size={20} />
        </button>
        <h2 className="text-cyan-400 text-sm font-mono mb-6 tracking-widest uppercase">Navigation</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex gap-4 lg:gap-6 lg:flex-wrap">
          {CHAPTERS.map((chapter, ci) => (
            <div key={chapter.label} className="flex-1 min-w-[140px]">
              {/* Chapter label */}
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase mb-3 text-[#34E9E2]/70">
                {chapter.label}
              </div>
              {/* Slide buttons in column */}
              <div className="flex flex-col gap-2">
                {chapter.slides.map((id, idx) => {
                  const slide = slideById(id)
                  if (!slide) return null
                  return (
                    <motion.button
                      key={id}
                      data-testid="slide-map-btn"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: ci * 0.05 + idx * 0.04, duration: 0.3 }}
                      onClick={() => { goTo(id); toggleMap() }}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        id === currentSlide
                          ? 'border-cyan-400 bg-cyan-400/10'
                          : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/8'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-white/35 mb-0.5">
                        {String(id).padStart(2, '0')}
                      </div>
                      <div className="text-[11px] text-white/80 leading-tight line-clamp-2">
                        {slide.title}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
