'use client'
import { useEffect, useRef, useCallback } from 'react'
import { useCurrentSlide, useDeckReady } from '@/hooks/useDeck'

/** Max attempts to reload video on fatal HLS errors before giving up */
const MAX_RETRIES = 3
/** Exponential backoff base (ms) */
const RETRY_BASE_MS = 1500

interface BgVideoProps {
  playbackId: string
  poster?: string
  onReady?: () => void
  readyTimeout?: number
  contentDelay?: number
  style?: React.CSSProperties
}

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'mux-video': React.DetailedHTMLProps<
          React.VideoHTMLAttributes<HTMLVideoElement>,
          HTMLVideoElement
        > & {
          'playback-id'?: string
          'stream-type'?: string
          'prefer-playback'?: string
          preload?: string
        }
      }
    }
  }
}

export function BgVideo({
  playbackId,
  poster,
  onReady,
  readyTimeout = 5000,
  contentDelay = 0,
  style,
}: BgVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  // Keep callback ref current during render so effects never hold a stale closure
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady

  const retryCount = useRef(0)

  const deckReady = useDeckReady()
  const currentSlide = useCurrentSlide()

  // Retry handler: reload the video source on fatal HLS error
  const retryLoad = useCallback(() => {
    const el = ref.current as HTMLVideoElement & { _hlsConfig?: unknown }
    if (!el || retryCount.current >= MAX_RETRIES) return false
    retryCount.current++
    // Force mux-video to re-fetch by toggling the playback-id attribute
    const pid = el.getAttribute('playback-id')
    if (pid) {
      el.removeAttribute('playback-id')
      setTimeout(() => {
        el.setAttribute('playback-id', pid)
        if (typeof el.play === 'function') {
          el.play().catch(() => { /* autoplay blocked — handled by timeout */ })
        }
      }, RETRY_BASE_MS * retryCount.current)
    }
    return true
  }, [])

  useEffect(() => {
    let cancelled = false
    let contentTimer: number | null = null

    // fire() handles delay; fireReady() does the actual work + dispatches content-ready signal for narration
    let fired = false
    const fireReady = () => {
      if (cancelled) return
      onReadyRef.current?.()
      window.setTimeout(() => document.dispatchEvent(new CustomEvent('deck:content-ready')), 0)
    }
    const fire = () => {
      if (fired) return
      fired = true
      if (contentDelay > 0) {
        contentTimer = window.setTimeout(fireReady, contentDelay)
      } else {
        fireReady()
      }
    }

    // Normal path: wait until user has accepted the welcome modal
    if (!deckReady) return () => { cancelled = true }

    const el = ref.current as (HTMLVideoElement & { _hlsConfig?: Record<string, unknown> }) | null
    if (!el) {
      fire()
      return () => { cancelled = true; if (contentTimer !== null) clearTimeout(contentTimer) }
    }

    const mobileSlideNum = Number(el.closest<HTMLElement>('[data-slide-num]')?.dataset.slideNum)
    if (mobileSlideNum && mobileSlideNum !== currentSlide) {
      if (typeof el.pause === 'function') el.pause()
      return () => { cancelled = true; if (contentTimer !== null) clearTimeout(contentTimer) }
    }

    // Detect conditions where video should be skipped
    type NavConn = { effectiveType?: string; saveData?: boolean }
    const conn = (navigator as unknown as { connection?: NavConn }).connection
    const isMobileViewport = window.innerWidth < 1200
    const et = conn?.effectiveType ?? ''
    const slowConn =
      et === 'slow-2g' || et === '2g' || (et === '3g' && isMobileViewport) || conn?.saveData === true
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || slowConn) {
      // Skip video — but still gate content reveal on deck readiness
      fire()
      return () => { cancelled = true; if (contentTimer !== null) clearTimeout(contentTimer) }
    }

    const timer = window.setTimeout(fire, readyTimeout)

    const handleReady = () => {
      clearTimeout(timer)
      fire()
    }

    // Fires when the video starts playing — signals narration to begin, independently of content reveal.
    const handleVideoPlaying = () => {
      document.dispatchEvent(new CustomEvent('deck:video-playing'))
    }

    // Handle fatal HLS errors — retry before giving up
    const handleError = () => {
      if (cancelled) return
      // Try to retry; if exhausted, just fire ready (show content over stalled video)
      if (!retryLoad()) {
        handleReady()
      }
    }

    // Import the custom element first — only then is el.play() available,
    // because before registration it's a plain HTMLElement with no play()
    import('@mux/mux-video').then(() => {
      if (cancelled) return

      // Configure HLS.js for better resilience:
      // - More retries for manifest and level loads (default is 2)
      // - Longer max retry delay
      // - Enable low-latency optimizations
      el._hlsConfig = {
        manifestLoadingMaxRetry: 6,
        manifestLoadingRetryDelay: 1000,
        manifestLoadingMaxRetryTimeout: 30000,
        levelLoadingMaxRetry: 6,
        levelLoadingRetryDelay: 1000,
        levelLoadingMaxRetryTimeout: 30000,
        fragLoadingMaxRetry: 6,
        fragLoadingRetryDelay: 1000,
        fragLoadingMaxRetryTimeout: 30000,
        startLevel: -1, // Auto-select initial quality based on bandwidth
        testBandwidth: true,
      }

      // Must set muted via DOM property for autoplay to be allowed by browsers
      el.muted = true

      // 'playing' fires on first rendered frame — used to start narration in sync with video.
      el.addEventListener('playing', handleVideoPlaying, { once: true })
      // 'ended' fires when the video reaches its last frame —
      // content fades in over the held end frame.
      el.addEventListener('ended', handleReady, { once: true })
      // 'error' (codec/network/blocked) — attempt retry before firing content reveal
      el.addEventListener('error', handleError, { once: true })

      if (typeof (el as HTMLVideoElement).play === 'function') {
        ;(el as HTMLVideoElement).play().catch(() => {
          // Autoplay blocked — show content immediately
          clearTimeout(timer)
          fire()
        })
      }
    })

    return () => {
      cancelled = true
      clearTimeout(timer)
      if (contentTimer !== null) clearTimeout(contentTimer)
      if (typeof el.pause === 'function') el.pause()
      el.removeEventListener('playing', handleVideoPlaying)
      el.removeEventListener('ended', handleReady)
      el.removeEventListener('error', handleError)
    }
  }, [deckReady, currentSlide, readyTimeout, contentDelay, retryLoad])

  return (
    <mux-video
      ref={ref}
      playback-id={playbackId}
      stream-type="on-demand"
      prefer-playback="mse"
      preload="auto"
      poster={poster}
      playsInline
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        pointerEvents: 'none', // pure background — no controls, no interaction
        ...style,
      }}
    />
  )
}

