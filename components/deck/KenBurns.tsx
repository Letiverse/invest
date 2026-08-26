'use client'
import { useEffect } from 'react'

const CSS = `@keyframes kenBurns { from { transform: scale(1) translate(0,0); } to { transform: scale(1.06) translate(-1%,-1%); } }`
let injected = false
function inject() {
  if (injected || typeof document === 'undefined') return
  const s = document.createElement('style'); s.textContent = CSS
  document.head.appendChild(s); injected = true
}

interface Props { src: string; alt?: string; duration?: number; style?: React.CSSProperties; imgStyle?: React.CSSProperties }

export function KenBurns({ src, alt = '', duration = 20, style, imgStyle }: Props) {
  useEffect(() => inject(), [])
  return (
    <div style={{ overflow: 'hidden', ...style }}>
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: `kenBurns ${duration}s ease-in-out infinite alternate`, ...imgStyle }} />
    </div>
  )
}
