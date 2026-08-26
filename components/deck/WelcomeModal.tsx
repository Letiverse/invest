'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useDeck } from '@/hooks/useDeck'
import { detectPlatform, type PlatformInfo } from '@/lib/platform'
import { blobUrl } from '@/lib/blob-urls'

const BOOT_READY_EVENT = 'deck:preload-ready'
const LOGO_SRC = blobUrl('/slides/shared/letiverse-logo.jpeg')

export function WelcomeModal() {
  const { setDeckReady, setNarrationEnabled } = useDeck()
  const [visible, setVisible] = useState(false)
  const [platform, setPlatform] = useState<PlatformInfo | null>(null)
  const [bootReady, setBootReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const markReady = () => {
      if (cancelled) return
      setBootReady(true)
    }

    const failSafe = window.setTimeout(markReady, 2000)
    document.addEventListener(BOOT_READY_EVENT, markReady)

    return () => {
      cancelled = true
      clearTimeout(failSafe)
      document.removeEventListener(BOOT_READY_EVENT, markReady)
    }
  }, [])

  useEffect(() => {
    const p = detectPlatform()
    const rafId = window.requestAnimationFrame(() => setPlatform(p))

    let hasWelcomed = false
    try {
      // Restore persisted narration preference from prior sessions
      const savedNarration = localStorage.getItem('letiv-narration')
      if (savedNarration === '0') setNarrationEnabled(false)
      hasWelcomed = sessionStorage.getItem('letiv-welcomed') === '1'
    } catch { /* private browsing — storage unavailable, always show modal */ }

    if (hasWelcomed) {
      // Returning user — unlock deck immediately, no modal
      const unlockId = window.setTimeout(() => setDeckReady(true), 0)
      return () => {
        window.cancelAnimationFrame(rafId)
        clearTimeout(unlockId)
      }
    }
    const showId = window.setTimeout(() => setVisible(true), 0)
    return () => {
      window.cancelAnimationFrame(rafId)
      clearTimeout(showId)
    }
  }, [setDeckReady, setNarrationEnabled])

  const handleStart = () => {
    try { sessionStorage.setItem('letiv-welcomed', '1') } catch { /* private browsing */ }
    setVisible(false)
    setDeckReady(true)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="welcome-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'tween', duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(5,13,28,0.97)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          data-testid="welcome-modal"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              maxWidth: 480,
              width: '92%',
              backgroundColor: '#0A1628',
              border: '1px solid #34E9E2',
              boxShadow: '0 0 48px rgba(52,233,226,0.22)',
              borderRadius: 4,
              textAlign: 'center',
              padding: '40px 36px 32px',
              maxHeight: 'min(90dvh, 90vh)',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
              <img
                src={LOGO_SRC}
                alt="Letiverse logo"
                style={{
                  width: 76,
                  height: 76,
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '1px solid rgba(52,233,226,0.45)',
                  boxShadow: '0 0 26px rgba(52,233,226,0.35)',
                }}
              />
            </div>

            <p style={{ margin: 0, marginBottom: 12, fontSize: 11, fontWeight: 700, letterSpacing: '6px', color: '#34E9E2' }}>
              LETIVERSE AI
            </p>

            <h1 style={{ margin: 0, marginBottom: 14, fontSize: 28, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.4px', lineHeight: 1.2 }}>
              Welcome, Investor
            </h1>

            <p style={{ margin: 0, marginBottom: 24, fontSize: 14, color: 'rgba(255,255,255,0.62)', lineHeight: 1.55 }}>
              A short investor walkthrough — 22 slides, ~5 minutes.
              {' '}Use ← → or the arrows to move.
            </p>

            {!bootReady && (
              <div style={{ marginBottom: 22, padding: '10px 14px', backgroundColor: 'rgba(52,233,226,0.07)', border: '1px solid rgba(52,233,226,0.28)', borderRadius: 3 }}>
                <div style={{ height: 4, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.12)', overflow: 'hidden', marginBottom: 6 }}>
                  <motion.div
                    initial={{ scaleX: 0.2, opacity: 0.55 }}
                    style={{ height: '100%', width: '100%', borderRadius: 999, backgroundColor: '#34E9E2', transformOrigin: 'left center' }}
                    animate={{ scaleX: [0.2, 0.72, 0.45, 0.88], opacity: [0.55, 0.95, 0.62, 0.9] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
                <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.58)' }}>Preparing cinematic visuals…</p>
              </div>
            )}

            {platform?.isPortrait && (
              <div style={{
                marginBottom: 18,
                padding: '12px 14px',
                backgroundColor: 'rgba(52,233,226,0.09)',
                border: '1px solid rgba(52,233,226,0.4)',
                borderRadius: 3,
                textAlign: 'left',
              }}>
                <p style={{ margin: 0, marginBottom: 6, fontSize: 10, letterSpacing: '1.6px', color: 'rgba(52,233,226,0.92)', fontWeight: 700 }}>
                  PORTRAIT MODE DETECTED
                </p>
                <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                  Rotate to landscape for the full cinematic experience.
                </p>
              </div>
            )}

            <button
              onClick={bootReady ? handleStart : undefined}
              disabled={!bootReady}
              style={{
                display: 'inline-block',
                padding: '13px 38px',
                backgroundColor: bootReady ? '#34E9E2' : 'rgba(52,233,226,0.2)',
                color: bootReady ? '#050D1C' : 'rgba(255,255,255,0.75)',
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '2px',
                border: 'none',
                borderRadius: 2,
                cursor: bootReady ? 'pointer' : 'not-allowed',
                boxShadow: bootReady ? '0 0 20px rgba(52,233,226,0.35)' : 'none',
              }}
            >
              {bootReady ? 'Begin →' : 'Preparing Deck…'}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
