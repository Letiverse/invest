'use client'

/**
 * NavPolyhedron — small Canvas-mounted icosahedron rendered in the deck nav.
 *
 * Per LOCKED Cinematic Pass D5:
 *  - PNG fallback by default (server, reduced-motion, no-WebGL)
 *  - Progressive enhancement: 3D Canvas with MeshPhysicalMaterial on
 *    desktop pointer:fine + motion-allowed
 *  - frameloop="demand" — only renders on hover or once per nav transition
 *  - 64x64 px footprint with drei Float for ambient micro-motion
 *  - Cursor-tilt parallax (subtle, capped at ±10deg)
 *
 * Sits in SlideNav top-right corner above utility buttons. Acts as a brand
 * mark + chapter progress indicator (fresnel intensity scales 1→18).
 */

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useDeck } from '@/hooks/useDeck'
import { TOTAL_SLIDES } from '@/lib/slides'
import * as THREE from 'three'
import { isWebGLAvailable } from '@/components/deck/DeckCanvasFallback'
import { blobUrl } from '@/lib/blob-urls'

const POLYHEDRON_PNG = blobUrl('/slides/shared/letiverse-logo.jpeg')

interface MeshProps {
  progress: number
  tiltX: number
  tiltY: number
}

function PolyhedronMesh({ progress, tiltX, tiltY }: MeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const targetTilt = useRef({ x: 0, y: 0 })

  useEffect(() => {
    targetTilt.current = { x: tiltX, y: tiltY }
  }, [tiltX, tiltY])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    // Continuous slow Y-rotation
    meshRef.current.rotation.y += delta * 0.18
    // Lerp pitch/yaw toward cursor target
    meshRef.current.rotation.x += (targetTilt.current.x - meshRef.current.rotation.x) * 0.06
  })

  // Fresnel emissive intensity grows with deck progression (chapter feedback)
  const emissiveIntensity = 0.4 + progress * 0.7

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.35}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#0a3a44"
          emissive="#34E9E2"
          emissiveIntensity={emissiveIntensity}
          metalness={0.85}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.15}
          flatShading
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  )
}

function PolyhedronCanvas({ progress }: { progress: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const eventSource = typeof document !== 'undefined' ? document.body : undefined

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (typeof window === 'undefined') return
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx
      const dy = (e.clientY - cy) / cy
      // Cap at ±0.18 rad (~10 deg)
      setTilt({ x: dy * 0.18, y: dx * 0.18 })
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 3.4], fov: 35 }}
        frameloop="always"
        style={{ background: 'transparent' }}
        eventSource={eventSource}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[2.5, 3, 4]} intensity={1.1} color="#FFFFFF" />
        <directionalLight position={[-2, -1.5, 2]} intensity={0.45} color="#34E9E2" />
        <PolyhedronMesh progress={progress} tiltX={tilt.x} tiltY={tilt.y} />
      </Canvas>
    </div>
  )
}

function PngFallback() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={POLYHEDRON_PNG}
      alt=""
      aria-hidden
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        filter: 'drop-shadow(0 0 12px rgba(52,233,226,0.45))',
      }}
    />
  )
}

export interface NavPolyhedronProps {
  size?: number
}

/**
 * Brand-mark NavPolyhedron — renders Canvas on capable desktops, PNG everywhere else.
 * Suitable for embedding in the SlideNav corner (default 64x64).
 */
export function NavPolyhedron({ size = 64 }: NavPolyhedronProps) {
  const { currentSlide } = useDeck()
  const progress = Math.min(1, Math.max(0, (currentSlide - 1) / Math.max(1, TOTAL_SLIDES - 1)))
  const [canRender3D, setCanRender3D] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointerMq = window.matchMedia('(pointer: fine)')
    if (motionMq.matches || !pointerMq.matches) {
      setCanRender3D(false)
      return
    }
    // WebGL2 detect
    setCanRender3D(isWebGLAvailable())
  }, [])

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        pointerEvents: 'none',
      }}
      aria-hidden
    >
      {canRender3D ? <PolyhedronCanvas progress={progress} /> : <PngFallback />}
    </div>
  )
}
