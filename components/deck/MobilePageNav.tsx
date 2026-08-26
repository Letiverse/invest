'use client'
import { useState, useCallback, memo } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, ChevronUp, LayoutGrid, X } from 'lucide-react'
import { SLIDES, TOTAL_SLIDES } from '@/lib/slides'

interface MobilePageNavProps {
  currentSlide: number
}

/**
 * Fixed prev/next nav + slide-map quick-jump for the mobile per-page deck.
 * Tap the counter badge to open a full-screen grid of all slides.
 */
export const MobilePageNav = memo(function MobilePageNav({ currentSlide }: MobilePageNavProps) {
  const router = useRouter()
  const [mapOpen, setMapOpen] = useState(false)
  const atStart = currentSlide <= 1
  const atEnd = currentSlide >= TOTAL_SLIDES

  const goTo = useCallback(
    (n: number) => {
      setMapOpen(false)
      router.push(`/mobile/${n}`)
    },
    [router],
  )

  return (
    <>
      {/* ── Slide map overlay ───────────────────────────────────── */}
      <AnimatePresence>
        {mapOpen && (
          <motion.div
            key="mobile-slide-map"
            data-testid="mobile-slide-map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 900,
              backgroundColor: 'rgba(5,13,28,0.94)',
              backdropFilter: 'blur(12px)',
              overflowY: 'auto',
              padding: '56px 16px 32px',
            }}
            onClick={() => setMapOpen(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.06, duration: 0.22 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                gap: 10,
              }}
              onClick={e => e.stopPropagation()}
            >
              {SLIDES.map(slide => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to slide ${slide.id}: ${slide.title}`}
                  aria-current={slide.id === currentSlide ? 'page' : undefined}
                  onClick={() => goTo(slide.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 5,
                    padding: '10px 6px',
                    borderRadius: 10,
                    border: slide.id === currentSlide
                      ? '1px solid rgba(52,233,226,0.85)'
                      : '1px solid rgba(52,233,226,0.18)',
                    backgroundColor: slide.id === currentSlide
                      ? 'rgba(52,233,226,0.14)'
                      : 'rgba(255,255,255,0.04)',
                    cursor: 'pointer',
                    boxShadow: slide.id === currentSlide
                      ? '0 0 14px rgba(52,233,226,0.24)'
                      : 'none',
                  }}
                >
                  <span style={{ fontSize: 18, fontWeight: 800, color: slide.id === currentSlide ? '#34E9E2' : 'rgba(255,255,255,0.65)', lineHeight: 1 }}>
                    {String(slide.id).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', textAlign: 'center', lineHeight: 1.3, letterSpacing: '0.03em', wordBreak: 'break-word' }}>
                    {slide.title.length > 18 ? slide.title.slice(0, 16) + '\u2026' : slide.title}
                  </span>
                </button>
              ))}
            </motion.div>

            <button
              type="button"
              aria-label="Close slide map"
              onClick={() => setMapOpen(false)}
              style={{ position: 'fixed', top: 14, right: 14, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(52,233,226,0.4)', borderRadius: '50%', backgroundColor: 'rgba(5,13,28,0.8)', color: '#9EF6F2', cursor: 'pointer', zIndex: 910 }}
            >
              <X aria-hidden size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Nav rail ────────────────────────────────────────────── */}
      <nav
        role="navigation"
        aria-label="Mobile slide navigation"
        style={{ position: 'fixed', right: 10, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, zIndex: 850, pointerEvents: 'auto' }}
      >
        <ArrowButton label="Previous slide" disabled={atStart} onClick={() => router.push(`/mobile/${currentSlide - 1}`)} direction="up" />

        <button
          type="button"
          data-testid="mobile-slide-counter"
          aria-label="Open slide map"
          onClick={() => setMapOpen(true)}
          className="min-w-14 min-h-14 rounded-full border border-[#34E9E2]/55 bg-[#041229] text-white/[0.92] text-[10px] font-extrabold tracking-[0.12em] px-[7px] py-2.5 text-center cursor-pointer"
        >
          {String(currentSlide).padStart(2, '0')}/{TOTAL_SLIDES}
          <div className="mt-[3px]"><LayoutGrid aria-hidden size={12} className="text-[#34E9E2]/85" /></div>
        </button>

        {/* Hide the next arrow on the last slide — no false promise of more content */}
        {!atEnd && <ArrowButton label="Next slide" disabled={false} onClick={() => router.push(`/mobile/${currentSlide + 1}`)} direction="down" />}
      </nav>
    </>
  )
})

function ArrowButton({
  label,
  disabled,
  onClick,
  direction,
}: {
  label: string
  disabled: boolean
  onClick: () => void
  direction: 'up' | 'down'
}) {
  const Icon = direction === 'up' ? ChevronUp : ChevronDown

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      style={{
        width: 56,
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: disabled ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(52,233,226,0.7)',
        borderRadius: '50%',
        backgroundColor: disabled ? 'rgba(5,13,28,0.38)' : '#041229',
        color: disabled ? 'rgba(255,255,255,0.18)' : '#9EF6F2',
        cursor: disabled ? 'default' : 'pointer',
        padding: 0,
      }}
    >
      <Icon aria-hidden size={26} strokeWidth={2.6} />
    </button>
  )
}
