'use client'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT_DESKTOP = 1200  // halved from 2400 — dense but much cheaper
const COUNT_MOBILE  = 600   // halved from 800 — GPU friendly

export function ParticleField({ mobile = false }: { mobile?: boolean }) {
  const mesh = useRef<THREE.Points>(null)
  const frameCount = useRef(0)
  const COUNT = mobile ? COUNT_MOBILE : COUNT_DESKTOP

  const [positions, colors, sizes, baseZ] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const col = new Float32Array(COUNT * 3)
    const siz = new Float32Array(COUNT)
    const bz  = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 35
      bz[i] = pos[i * 3 + 2]
      // Mix cyan, white, and faint teal — gives subtle depth chromatic variance
      const r = Math.random()
      if (r > 0.55) {
        col[i * 3]     = 0.2
        col[i * 3 + 1] = 0.91
        col[i * 3 + 2] = 0.89
      } else if (r > 0.2) {
        col[i * 3]     = 1
        col[i * 3 + 1] = 1
        col[i * 3 + 2] = 1
      } else {
        col[i * 3]     = 0.5
        col[i * 3 + 1] = 0.96
        col[i * 3 + 2] = 0.93
      }
      // Variable sizes — closer particles look bigger
      siz[i] = 0.3 + Math.random() * 0.7
    }
    return [pos, col, siz, bz]
  }, [COUNT])

  useFrame((state, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.y += delta * 0.012
    mesh.current.rotation.x += delta * 0.004

    // Z-drift runs every third frame — reduces per-particle CPU cost with no visible difference
    frameCount.current++
    if (frameCount.current % 3 !== 0) return

    const geom = mesh.current.geometry as THREE.BufferGeometry
    const posAttr = geom.attributes.position as THREE.BufferAttribute
    const t = state.clock.elapsedTime
    for (let i = 0; i < COUNT; i++) {
      const phase = i * 0.07
      posAttr.array[i * 3 + 2] = baseZ[i] + Math.sin(t * 0.4 + phase) * 0.4
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
        <bufferAttribute attach="attributes-size"     args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors sizeAttenuation transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

