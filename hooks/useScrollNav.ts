'use client'
import { useEffect, useRef } from 'react'
import { useDeck } from './useDeck'

export function useScrollNav() {
  const { next, prev } = useDeck()
  const lastRef = useRef(0)

  useEffect(() => {
    const handler = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      if (now - lastRef.current < 600) return
      lastRef.current = now
      if (e.deltaY > 0) next()
      else prev()
    }
    window.addEventListener('wheel', handler, { passive: false })
    return () => window.removeEventListener('wheel', handler)
  }, [next, prev])
}
