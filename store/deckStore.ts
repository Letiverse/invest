'use client'
import { create } from 'zustand'
import { SLIDES, TOTAL_SLIDES } from '@/lib/slides'
import type { DeckState, TransitionAxis } from '@/types/deck'

export const useDeckStore = create<DeckState>((set, get) => ({
  currentSlide: 1,
  totalSlides: TOTAL_SLIDES,
  prevSlide: 1,
  direction: 'z' as TransitionAxis,
  isPlaying: false,
  autoAdvance: false,
  mapOpen: false,
  deckReady: false,
  narrationEnabled: true,

  goTo:(index: number) => {
    const { currentSlide } = get()
    const clamped = Math.min(Math.max(1, index), TOTAL_SLIDES)
    if (clamped === currentSlide) return
    const target = SLIDES.find(s => s.id === clamped)
    set({
      prevSlide: currentSlide,
      currentSlide: clamped,
      direction: target?.axis ?? 'z',
    })
  },

  next: () => {
    const { currentSlide, goTo } = get()
    goTo(currentSlide + 1)
  },

  prev: () => {
    const { currentSlide, goTo } = get()
    goTo(currentSlide - 1)
  },

  toggleMap: () => set(s => ({ mapOpen: !s.mapOpen })),
  toggleAutoAdvance: () => set(s => ({ autoAdvance: !s.autoAdvance })),
  setPlaying: (v: boolean) => set({ isPlaying: v }),
  setDeckReady: (v: boolean) => set({ deckReady: v }),
  setNarrationEnabled: (v: boolean) => {
    try { localStorage.setItem('letiv-narration', v ? '1' : '0') } catch { /* private browsing */ }
    set({ narrationEnabled: v })
  },
}))
