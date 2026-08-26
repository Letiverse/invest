'use client'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'

const POSTFX_FAIL_FLAG = 'letiv-postfx-failed'

export function PostFX() {
  const { gl } = useThree()
  const [ready, setReady] = useState(false)
  // Mount-once guard: prevents StrictMode double-invocation from re-mounting
  // EffectComposer twice in dev. EffectComposer.addPass() is internally stateful
  // and the second mount throws a null-alpha TypeError even when the renderer
  // is correctly configured. By tracking mount intent in a ref, we only allow
  // the FIRST attempt to construct the EffectComposer subtree this component
  // lifetime. If the first attempt fails (caught by parent error boundary),
  // the session-scoped flag prevents future mounts entirely.
  const hasMountedRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Skip if we've already failed once this session
    try {
      if (sessionStorage.getItem(POSTFX_FAIL_FLAG) === '1') return
    } catch {}
    if (!gl || !gl.domElement) return
    if (hasMountedRef.current) return
    let rafId = 0
    rafId = requestAnimationFrame(() => {
      try {
        const ctx = gl.getContext()
        const attrs = ctx?.getContextAttributes?.()
        if (attrs && attrs.alpha === false) {
          hasMountedRef.current = true
          setReady(true)
        }
      } catch {
        // leave ready=false; effects simply won't mount
      }
    })
    return () => cancelAnimationFrame(rafId)
  }, [gl])

  if (!ready) return null

  return (
    <EffectComposer enabled multisampling={0}>
      <Bloom
        intensity={0.45}
        luminanceThreshold={0.55}
        luminanceSmoothing={0.92}
        mipmapBlur={true}
      />
      <Vignette
        offset={0.28}
        darkness={0.55}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  )
}
