'use client'
import { useEffect } from 'react'
import { useDeckStore } from '@/store/deckStore'

/**
 * Web Audio API micro-sounds — no MP3 files, generated in-browser.
 *
 * - click: 440Hz sine, 50ms — crisp tick for nav presses
 * - whoosh: freq sweep 200→80Hz, 250ms — soft swish on slide change
 *
 * iOS unlock: AudioContext is resumed on first user gesture automatically.
 * The component mounts silently and subscribes to the deck store for
 * slide changes. Use playClick() from the returned object to play on nav.
 */

let ctx: AudioContext | null = null

function getAudioContext(): AudioContext {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  }
  return ctx
}

function playClick(volume = 0.08): void {
  try {
    // Respect narration/audio mute toggle — skip if explicitly disabled
    if (useDeckStore.getState().narrationEnabled === false) return
    const ac = getAudioContext()
    if (ac.state === 'suspended') ac.resume()
    const osc = ac.createOscillator()
    const gain = ac.createGain()
    osc.connect(gain)
    gain.connect(ac.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(440, ac.currentTime)
    gain.gain.setValueAtTime(0, ac.currentTime)
    gain.gain.linearRampToValueAtTime(volume, ac.currentTime + 0.005)
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.05)
    osc.start(ac.currentTime)
    osc.stop(ac.currentTime + 0.06)
  } catch {
    // AudioContext not available (SSR / blocked)
  }
}

function playWhoosh(volume = 0.06): void {
  try {
    // Respect narration/audio mute toggle — skip if explicitly disabled
    if (useDeckStore.getState().narrationEnabled === false) return
    const ac = getAudioContext()
    if (ac.state === 'suspended') ac.resume()
    const osc = ac.createOscillator()
    const gain = ac.createGain()
    osc.connect(gain)
    gain.connect(ac.destination)
    osc.type = 'sine'
    const t = ac.currentTime
    osc.frequency.setValueAtTime(200, t)
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.25)
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(volume, t + 0.04)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25)
    osc.start(t)
    osc.stop(t + 0.28)
  } catch {
    // AudioContext not available (SSR / blocked)
  }
}

export { playClick, playWhoosh }

/**
 * UISounds — mounts as a side-effect component.
 * Subscribes to the deck store and plays whoosh on every slide change.
 * Respects narrationEnabled — if audio is muted, sounds are completely skipped.
 */
export function UISounds() {
  // Unlock AudioContext on first interaction (iOS requires user gesture)
  useEffect(() => {
    const unlock = () => getAudioContext().resume().catch(() => {})
    window.addEventListener('pointerdown', unlock, { once: true })
    return () => window.removeEventListener('pointerdown', unlock)
  }, [])

  // Subscribe to slide changes and play whoosh
  useEffect(() => {
    let prev = useDeckStore.getState().currentSlide

    const unsub = useDeckStore.subscribe((state) => {
      if (state.currentSlide !== prev) {
        prev = state.currentSlide
        playWhoosh()  // narration check is now inside playWhoosh
      }
    })

    return unsub
  }, [])

  return null
}
