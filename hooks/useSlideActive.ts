'use client'
import { useState, useEffect } from 'react'

/** Returns true shortly after the slide component mounts (becomes active slide) */
export function useSlideActive(delay = 200) {
  const [active, setActive] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setActive(true), delay)
    return () => { clearTimeout(t); setActive(false) }
  }, [delay])
  return active
}
