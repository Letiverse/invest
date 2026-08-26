'use client'
import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

/**
 * SceneCamera — mounts inside the R3F Canvas.
 * Smoothly drifts the camera toward the cursor position, making
 * the particle field and floating orbs appear to exist at different
 * depths (closer particles parallax faster than distant orbs).
 *
 * Uses window.addEventListener('mousemove') instead of R3F's useThree().pointer
 * because the Scene wrapper has pointer-events:none which blocks R3F's internal
 * event system — pointer always reports {0, 0} with the R3F approach.
 *
 * Max offset: ±0.5 horizontal, ±0.25 vertical — subtle ~2.5% drift.
 * Touch guard: mousemove never fires on touch, so values stay 0,0.
 */
export function SceneCamera() {
  const { camera } = useThree()
  const targetX = useRef(0)
  const targetY = useRef(0)
  const currentX = useRef(0)
  const currentY = useRef(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Normalise to [-1, 1] range
      targetX.current = (e.clientX / window.innerWidth - 0.5) * 2
      targetY.current = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((_, delta) => {
    // Frame-rate independent lerp: 0.04 target speed at 60fps
    const t = 1 - Math.pow(1 - 0.04, delta * 60)
    currentX.current += (targetX.current * 0.5 - currentX.current) * t
    currentY.current += (targetY.current * 0.25 - currentY.current) * t
    camera.position.x = currentX.current
    camera.position.y = currentY.current
    camera.lookAt(0, 0, 0)
  })

  return null
}
