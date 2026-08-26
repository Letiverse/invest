'use client'
import { useShallow } from 'zustand/react/shallow'
import { useDeckStore } from '@/store/deckStore'

export function useDeck() {
  return useDeckStore(
    useShallow(s => ({
      currentSlide: s.currentSlide,
      prevSlide: s.prevSlide,
      totalSlides: s.totalSlides,
      direction: s.direction,
      mapOpen: s.mapOpen,
      autoAdvance: s.autoAdvance,
      isPlaying: s.isPlaying,
      next: s.next,
      prev: s.prev,
      goTo: s.goTo,
      toggleMap: s.toggleMap,
      toggleAutoAdvance: s.toggleAutoAdvance,
      setPlaying: s.setPlaying,
      deckReady: s.deckReady,
      setDeckReady: s.setDeckReady,
      narrationEnabled: s.narrationEnabled,
      setNarrationEnabled: s.setNarrationEnabled,
    }))
  )
}

export function useCurrentSlide() {
  return useDeckStore(s => s.currentSlide)
}

export function useDeckReady() {
  return useDeckStore(s => s.deckReady)
}

export function useSlideDirection() {
  return useDeckStore(
    useShallow(s => ({ prevSlide: s.prevSlide, direction: s.direction, currentSlide: s.currentSlide }))
  )
}
