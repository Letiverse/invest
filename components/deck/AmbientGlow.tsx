'use client'

/**
 * Subliminal teal heartbeat overlaying the Three.js scene.
 * Pulses 10–25% opacity over 8s — visible on dark backgrounds,
 * creates a sense the platform is breathing/alive.
 */
export function AmbientGlow() {
  return (
    <>
      <style>{`
        @keyframes deck-heartbeat {
          0%, 100% { opacity: 0.10; }
          50%       { opacity: 0.25; }
        }
      `}</style>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: 'radial-gradient(ellipse 60% 50% at center, rgba(52,233,226,0.18) 0%, rgba(52,233,226,0.04) 45%, transparent 70%)',
          animation: 'deck-heartbeat 8s ease-in-out infinite',
        }}
      />
    </>
  )
}
