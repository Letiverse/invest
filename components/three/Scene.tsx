'use client'
import { Canvas } from '@react-three/fiber'
import { Suspense, Component, ReactNode, useState, useEffect } from 'react'
import { ParticleField } from './ParticleField'
import { FloatingOrbs } from './FloatingOrbs'
import { SceneCamera } from './SceneCamera'
import { PostFX } from './PostFX'
import { DeckCanvasFallback, isWebGLAvailable } from '@/components/deck/DeckCanvasFallback'

class SceneErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error: Error) {
    if (typeof window !== 'undefined') {
      try { sessionStorage.setItem('letiv-scene-failed', '1') } catch {}
      console.warn('[Scene] WebGL render failed, falling back:', error.message)
    }
  }
  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

// Inner error boundary scoped to PostFX only — if postprocessing throws,
// we lose bloom/vignette but keep the entire 3D scene intact.
class PostFXErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error: Error) {
    if (typeof window !== 'undefined') {
      // Persist failure so subsequent mounts skip PostFX entirely this session
      try { sessionStorage.setItem('letiv-postfx-failed', '1') } catch {}
      console.warn('[PostFX] disabled after error:', error.message)
    }
  }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

function postFxAllowed(): boolean {
  if (typeof window === 'undefined') return false
  try { return sessionStorage.getItem('letiv-postfx-failed') !== '1' } catch { return true }
}

export function Scene() {
  // null = not yet detected; defer Canvas render until we know touch state
  // so gl props are stable from the first render and never change
  const [isTouch, setIsTouch] = useState<boolean | null>(null)
  const [reducedMotion, setReducedMotion] = useState(true)
  const [webglOk, setWebglOk] = useState<boolean | null>(null)

  useEffect(() => {
    // Synchronous WebGL detect first — avoids mounting Canvas at all if unsupported
    setWebglOk(isWebGLAvailable())
    // Don't even try if a previous mount caught a Scene render error
    try {
      if (sessionStorage.getItem('letiv-scene-failed') === '1') setWebglOk(false)
    } catch {}
  }, [])

  useEffect(() => {
    const touchMq = window.matchMedia('(pointer: coarse)')
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const rafId = window.requestAnimationFrame(() => {
      setIsTouch(touchMq.matches)
      setReducedMotion(motionMq.matches)
    })

    const onTouchChange = (e: MediaQueryListEvent) => setIsTouch(e.matches)
    const onMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)

    if (touchMq.addEventListener) {
      touchMq.addEventListener('change', onTouchChange)
    } else {
      touchMq.addListener(onTouchChange)
    }
    if (motionMq.addEventListener) {
      motionMq.addEventListener('change', onMotionChange)
    } else {
      motionMq.addListener(onMotionChange)
    }

    return () => {
      window.cancelAnimationFrame(rafId)
      if (touchMq.removeEventListener) {
        touchMq.removeEventListener('change', onTouchChange)
      } else {
        touchMq.removeListener(onTouchChange)
      }
      if (motionMq.removeEventListener) {
        motionMq.removeEventListener('change', onMotionChange)
      } else {
        motionMq.removeListener(onMotionChange)
      }
    }
  }, [])

  // Don't mount the Canvas until touch detection resolves (one RAF delay)
  // This prevents R3F from trying to update powerPreference after context creation
  if (isTouch === null || webglOk === null) return null

  // Hard fallback path: no WebGL, render gradient backdrop only
  if (!webglOk) return <DeckCanvasFallback />

  const enablePostFx = !isTouch && !reducedMotion && postFxAllowed()
  const eventSource = typeof document !== 'undefined' ? document.body : undefined

  return (
    <SceneErrorBoundary fallback={<DeckCanvasFallback />}>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: false, alpha: false, stencil: false, depth: true, powerPreference: isTouch ? 'default' : 'high-performance', failIfMajorPerformanceCaveat: false }}
          dpr={[1, 1.5]}
          eventSource={eventSource}
        >
          <color attach="background" args={['#050D1C']} />
          {/* Cinematic light rig — tuned LOWER than typical defaults because
              FloatingOrbs were originally tuned for ambient-only and use emissive
              materials at low opacity. Goal: give 3D meshes (orbs, future nav
              polyhedron) directional shading without flattening the orbs into
              shaded balls or over-brightening the deep-space backdrop. */}
          <ambientLight intensity={0.18} />
          {/* Key light: top-right white, casts subtle directional shadow language */}
          <directionalLight position={[4, 6, 5]} intensity={0.5} color="#ffffff" />
          {/* Teal fill: from below-left, brand-aligned, lifts shadow side */}
          <directionalLight position={[-4, -2, 2]} intensity={0.25} color="#34E9E2" />
          {/* Teal underlight: subtle kiss from below to add depth without harsh contrast */}
          <pointLight position={[0, -3, 4]} intensity={0.3} color="#7EF1EC" distance={12} decay={2} />
          <Suspense fallback={null}>
            <SceneCamera />
            <ParticleField mobile={isTouch} />
            <FloatingOrbs />
            {enablePostFx && (
              <PostFXErrorBoundary>
                <PostFX />
              </PostFXErrorBoundary>
            )}
          </Suspense>
        </Canvas>
      </div>
    </SceneErrorBoundary>
  )
}
