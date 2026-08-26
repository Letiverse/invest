'use client'
import { useCurrentSlide } from '@/hooks/useDeck'

/**
 * Radial teal burst that fires on every slide change.
 * Gives transitions a subtle "cut" sensation — like a camera flash.
 * Uses a CSS animation rather than Framer Motion to avoid setting inline
 * opacity styles (which can trigger Playwright's CDP CSS-injection crash).
 */
export function TransitionFlash() {
  const currentSlide = useCurrentSlide()

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'none', zIndex: 500, overflow: 'hidden' }}>
      {/* key forces remount on each slide change, restarting the CSS animation */}
      <div
        key={currentSlide}
        className="transition-flash"
        style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0, left: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(52,233,226,0.2) 0%, rgba(52,233,226,0.06) 42%, transparent 68%)',
        }}
      />
    </div>
  )
}
