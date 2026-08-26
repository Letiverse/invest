'use client'
import { useEffect } from 'react'
import { useDeck } from './useDeck'
import { toggleAppFullscreen } from '@/lib/fullscreen'

export function useKeyboard() {
  const { next, prev, toggleMap } = useDeck()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't capture when focus is in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return

      switch (e.key) {
        case 'ArrowRight': case 'ArrowDown': case ' ':
          e.preventDefault(); next(); break
        case 'ArrowLeft': case 'ArrowUp':
          e.preventDefault(); prev(); break
        case 'm': case 'M':
          toggleMap(); break
        case 'f': case 'F':
          toggleAppFullscreen({ lockLandscape: true }).catch((error: unknown) => {
            console.warn('Fullscreen or landscape lock was blocked.', error)
          })
          break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev, toggleMap])
}
