'use client'
import { useEffect, useRef, useCallback, useMemo } from 'react'
import { Howl } from 'howler'
import { useDeck } from '@/hooks/useDeck'
import { NARRATION } from '@/lib/narration'
import { DECK_EFFECTS } from '@/lib/effectFlags'

/**
 * Plays the per-slide narration audio. Renders nothing — the floating
 * subtitle panel was removed in Phase 2 (the narration toggle button in
 * SlideNav is now the only affordance, and its lit state communicates that
 * audio is on). All audio engine logic (Howler, BG-video sync, fallbacks,
 * stereo pan) is preserved unchanged.
 */
export function SlideNarrator() {
  const { currentSlide, narrationEnabled, deckReady } = useDeck()
  const config = useMemo(() => NARRATION.find(n => n.id === currentSlide), [currentSlide])

  const howlRef = useRef<Howl | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Tracks which slide last fired deck:content-ready so re-enable plays immediately
  const contentReadyForSlide = useRef<number | null>(null)

  const stop = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.stop()
      howlRef.current.unload()
      howlRef.current = null
    }
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    stop()
    if (!narrationEnabled || !deckReady) return

    if (!config) return

    const showTextOnly = () => {
      // Audio missing / failed — brief no-op tick so cleanup runs symmetrically.
      timerRef.current = setTimeout(() => {
        timerRef.current = null
      }, 5200)
    }

    const play = () => {
      if (!config.audioSrc) {
        showTextOnly()
        return
      }

      // html5: false → Web Audio graph required for stereo panning.
      // We default to false when spatial audio is enabled; otherwise fall back
      // to streaming HTML5 mode for fastest start.
      const useWebAudio = DECK_EFFECTS.spatialAudio
      const h = new Howl({
        src: [config.audioSrc],
        html5: !useWebAudio,
        onplay: () => {
          // Apply per-slide stereo pan once playback has actually started
          // (Howler attaches the panner only after the first onplay).
          if (useWebAudio && typeof config.pan === 'number') {
            try {
              h.stereo(config.pan)
            } catch {
              /* swallow — older browsers without StereoPannerNode */
            }
          }
        },
        onend: () => {
          if (timerRef.current !== null) clearTimeout(timerRef.current)
          timerRef.current = setTimeout(() => {
            timerRef.current = null
            // Guard: if slide changed before timer fired, skip stale update
            if (howlRef.current !== h) return
            h.unload()
            howlRef.current = null
          }, config.id === 1 ? 900 : 250)
        },
        onloaderror: (_id, error) => {
          console.warn(`Narration failed to load: ${config.audioSrc}`, error)
          showTextOnly()
          h.unload()
          howlRef.current = null
        },
        onplayerror: (_id, error) => {
          console.warn(`Narration failed to play: ${config.audioSrc}`, error)
          showTextOnly()
          h.unload()
          howlRef.current = null
        },
      })
      howlRef.current = h
      h.play()
    }

    if (config.hasBgVideo) {
      // Re-enable case: video already playing for this slide, play after short delay
      if (contentReadyForSlide.current === currentSlide) {
        timerRef.current = setTimeout(play, 800)
        return () => stop()
      }
      let played = false
      const doPlay = () => { if (!played) { played = true; play() } }
      // deck:video-playing fires when the bg video starts playing (first frame rendered)
      // — narration begins in sync with the video, not after it ends.
      document.addEventListener('deck:video-playing', doPlay, { once: true })
      // deck:content-ready fires if the video is skipped, blocked, errors, or reaches
      // its hold frame. If video-playing already fired, played guards this path.
      document.addEventListener('deck:content-ready', doPlay, { once: true })
      // 12s fallback in case video never fires (slow connection, autoplay blocked, etc.)
      const fallback = setTimeout(doPlay, 12000)
      return () => {
        document.removeEventListener('deck:video-playing', doPlay)
        document.removeEventListener('deck:content-ready', doPlay)
        clearTimeout(fallback)
        stop()
      }
    }

    timerRef.current = setTimeout(play, 1500)
    return () => stop()
  }, [currentSlide, narrationEnabled, deckReady, config, stop])

  // Track deck:video-playing per slide so re-enable works instantly; reset on slide change
  useEffect(() => {
    const handler = () => { contentReadyForSlide.current = currentSlide }
    document.addEventListener('deck:video-playing', handler)
    document.addEventListener('deck:content-ready', handler)
    return () => {
      document.removeEventListener('deck:video-playing', handler)
      document.removeEventListener('deck:content-ready', handler)
      contentReadyForSlide.current = null
    }
  }, [currentSlide])

  // Cleanup on unmount
  useEffect(() => stop, [stop])

  return null
}
