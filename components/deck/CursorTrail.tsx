'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  alpha: number
  size: number
  vx: number
  vy: number
}

/** Subtle teal particle trail following the cursor — canvas overlay, pointer-events none */
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          alpha: 0.5 + Math.random() * 0.2,
          size: Math.random() * 2.5 + 0.8,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
        })
      }
      if (particlesRef.current.length > 60) {
        particlesRef.current = particlesRef.current.slice(-60)
      }
    }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.shadowBlur = 14
      ctx.shadowColor = 'rgba(52,233,226,0.85)'
      particlesRef.current = particlesRef.current.filter(p => p.alpha > 0.02)
      for (const p of particlesRef.current) {
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
        gradient.addColorStop(0, `rgba(52,233,226,${p.alpha.toFixed(3)})`)
        gradient.addColorStop(1, 'rgba(52,233,226,0)')
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
        p.alpha *= 0.88
        p.size *= 0.97
        p.x += p.vx
        p.y += p.vy
      }
      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0, left: 0,
        pointerEvents: 'none',
        zIndex: 400,
      }}
    />
  )
}
