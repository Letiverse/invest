'use client'

/**
 * DeckCanvasFallback — quiet gradient backdrop shown when WebGL is unavailable
 * or the Scene ErrorBoundary catches a render error.
 *
 * Per LOCKED Cinematic Pass D11. The fallback must:
 *  - Match the deck's tone (deep navy + teal accents, no jarring switch)
 *  - Surface a one-line dismissable banner explaining the visual is paused
 *  - Never block content — it's purely background
 *  - Cost ~0 perf — pure CSS gradients + 1 motion.div
 */
import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'

const BANNER_DISMISSED_KEY = 'letiv-webgl-banner-dismissed'

export function DeckCanvasFallback() {
  const [bannerDismissed, setBannerDismissed] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      setBannerDismissed(sessionStorage.getItem(BANNER_DISMISSED_KEY) === '1')
    } catch {
      setBannerDismissed(false)
    }
  }, [])

  const dismiss = () => {
    setBannerDismissed(true)
    try { sessionStorage.setItem(BANNER_DISMISSED_KEY, '1') } catch {}
  }

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(52,233,226,0.08) 0%, transparent 55%),' +
            'radial-gradient(ellipse at 70% 80%, rgba(52,233,226,0.05) 0%, transparent 60%),' +
            'linear-gradient(180deg, #050D1C 0%, #07142A 50%, #050D1C 100%)',
        }}
      >
        {/* Static teal star-points to retain depth signal */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(1px 1px at 20% 30%, rgba(52,233,226,0.6), transparent),' +
              'radial-gradient(1px 1px at 50% 70%, rgba(255,255,255,0.4), transparent),' +
              'radial-gradient(1px 1px at 80% 20%, rgba(52,233,226,0.5), transparent),' +
              'radial-gradient(1px 1px at 90% 60%, rgba(158,246,242,0.4), transparent),' +
              'radial-gradient(1px 1px at 15% 85%, rgba(255,255,255,0.3), transparent)',
          }}
        />
      </div>

      <AnimatePresence>
        {!bannerDismissed && (
          <motion.div
            key="webgl-banner"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, ease: [0.6, 0.01, 0, 1] }}
            style={{
              position: 'fixed',
              top: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 60,
              padding: '8px 14px',
              backgroundColor: 'rgba(4,18,41,0.92)',
              border: '1px solid rgba(52,233,226,0.4)',
              borderRadius: 3,
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
            role="status"
          >
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.78)', letterSpacing: 0.4 }}>
              3D visuals paused — view on desktop with WebGL for full cinematic experience.
            </span>
            <button
              onClick={dismiss}
              style={{
                background: 'transparent',
                border: '1px solid rgba(52,233,226,0.5)',
                color: '#34E9E2',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1,
                padding: '3px 9px',
                borderRadius: 2,
                cursor: 'pointer',
              }}
              aria-label="Dismiss WebGL notice"
            >
              DISMISS
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/** Pure utility: detect WebGL2 or WebGL1 availability synchronously. */
export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl' as 'webgl')
    return !!gl
  } catch {
    return false
  }
}
