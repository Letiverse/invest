'use client'
import { useEffect, useLayoutEffect, useState, memo, useCallback } from 'react'
import { MotionConfig } from 'motion/react'
import { useDeck } from '@/hooks/useDeck'
import { SlideNarrator } from '@/components/deck/SlideNarrator'
import { PortraitPrompt } from '@/components/deck/PortraitPrompt'
import { requestAppFullscreen } from '@/lib/fullscreen'

declare global {
  interface Window {
    __mobileDeckReady?: boolean
  }
}

const CI_SKIP_ANIMATIONS = process.env.NEXT_PUBLIC_E2E === 'true'
const STARTED_KEY = 'letiv-mobile-started'

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  const { setDeckReady, deckReady, narrationEnabled, setNarrationEnabled } = useDeck()
  // null = not yet determined (pre-hydration), true = show overlay, false = hide
  const [showStartOverlay, setShowStartOverlay] = useState<boolean | null>(null)

  // Restore narration preference and auto-unlock if user has already started.
  // useLayoutEffect: runs synchronously after DOM mutations but before paint, so
  // the correct narrationEnabled value and overlay visibility are committed in the
  // same frame as hydration — prevents a flash of wrong state.
  useLayoutEffect(() => {
    try {
      const savedNarration = localStorage.getItem('letiv-narration')
      if (savedNarration === '0') setNarrationEnabled(false)
    } catch { /* private browsing */ }

    try {
      if (localStorage.getItem(STARTED_KEY) === '1') {
        setDeckReady(true)
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShowStartOverlay(false)
      } else {
        setShowStartOverlay(true)
      }
    } catch {
      setShowStartOverlay(true)
    }
  }, [setDeckReady, setNarrationEnabled])

  // Sync window.__mobileDeckReady for Playwright automation.
  useEffect(() => {
    window.__mobileDeckReady = deckReady
  }, [deckReady])

  const handleStart = useCallback(() => {
    try { localStorage.setItem(STARTED_KEY, '1') } catch { /* private browsing */ }
    setDeckReady(true)
    setShowStartOverlay(false)
    // Best-effort landscape lock on session start
    requestAppFullscreen({ lockLandscape: true }).catch(() => { /* blocked — user can rotate manually */ })
  }, [setDeckReady])

  const handleToggleNarration = useCallback(() => {
    setNarrationEnabled(!narrationEnabled)
  }, [narrationEnabled, setNarrationEnabled])

  return (
    <main data-testid="mobile-deck-shell" aria-label="Letiverse AI Investment Deck — Mobile" style={{ overflow: 'hidden' }}>
      <MotionConfig skipAnimations={CI_SKIP_ANIMATIONS}>
        {children}
        <div data-testid="mobile-narration-host">
          <SlideNarrator />
        </div>
        {/* Hard landscape gate — blocks deck in portrait until rotated or dismissed */}
        <PortraitPrompt />
        {showStartOverlay === true && (
          <MobileStartOverlay
            narrationEnabled={narrationEnabled}
            onToggleNarration={handleToggleNarration}
            onStart={handleStart}
          />
        )}
      </MotionConfig>
    </main>
  )
}

// ─── Start Overlay ────────────────────────────────────────────────────────────

const MobileStartOverlay = memo(function MobileStartOverlay({
  narrationEnabled,
  onToggleNarration,
  onStart,
}: {
  narrationEnabled: boolean
  onToggleNarration: () => void
  onStart: () => void
}) {
  return (
    <div
      data-testid="mobile-start-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-start-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 900,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: 'linear-gradient(180deg, rgba(5,13,28,0.96), rgba(5,13,28,0.90))',
        backdropFilter: 'blur(10px)',
        color: '#FFFFFF',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 'min(420px, 100%)',
          border: '1px solid rgba(52,233,226,0.45)',
          borderRadius: 16,
          backgroundColor: 'rgba(7,22,43,0.92)',
          boxShadow: '0 18px 70px rgba(0,0,0,0.45)',
          padding: '28px 24px',
        }}
      >
        <p style={{ margin: '0 0 10px', color: '#34E9E2', fontSize: 11, fontWeight: 800, letterSpacing: '0.28em' }}>
          LETIVERSE AI
        </p>
        <h1 id="mobile-start-title" style={{ margin: '0 0 14px', fontSize: 28, lineHeight: 1.12, fontWeight: 800 }}>
          Start the landscape deck
        </h1>
        <p style={{ margin: '0 0 22px', color: 'rgba(255,255,255,0.68)', fontSize: 14, lineHeight: 1.6 }}>
          Tap once to unlock background video, narration and captions for this mobile session.
        </p>
        <div
          style={{
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 14,
            border: '1px solid rgba(52,233,226,0.18)',
            borderRadius: 10,
            backgroundColor: 'rgba(52,233,226,0.06)',
            padding: '12px 14px',
            textAlign: 'left',
          }}
        >
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,0.82)' }}>Narration</p>
            <p style={{ margin: '2px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.48)' }}>UK English audio and captions</p>
          </div>
          <button
            type="button"
            aria-pressed={narrationEnabled}
            onClick={onToggleNarration}
            style={{
              minWidth: 68,
              border: narrationEnabled ? '1px solid #34E9E2' : '1px solid rgba(255,255,255,0.22)',
              borderRadius: 999,
              backgroundColor: narrationEnabled ? 'rgba(52,233,226,0.15)' : 'transparent',
              color: narrationEnabled ? '#34E9E2' : 'rgba(255,255,255,0.48)',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '0.1em',
              padding: '8px 12px',
            }}
          >
            {narrationEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
        <button
          type="button"
          data-testid="mobile-start-button"
          onClick={onStart}
          style={{
            width: '100%',
            border: '1px solid rgba(52,233,226,0.72)',
            borderRadius: 10,
            backgroundColor: 'rgba(52,233,226,0.18)',
            color: '#9EF6F2',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 900,
            letterSpacing: '0.18em',
            padding: '14px 16px',
          }}
        >
          START MOBILE DECK
        </button>
      </div>
    </div>
  )
})
