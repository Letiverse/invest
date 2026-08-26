'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ORB_DATA = [
  { pos: [-6, 3, -5],   radius: 2.2, color: '#34E9E2', speed: 0.15, opacity: 0.10 },
  { pos: [7, -2, -8],   radius: 3.0, color: '#1a6f8a', speed: 0.10, opacity: 0.12 },
  { pos: [-3, -5, -10], radius: 2.5, color: '#34E9E2', speed: 0.08, opacity: 0.06 },
  { pos: [4, 5, -6],    radius: 1.8, color: '#0a2a4a', speed: 0.20, opacity: 0.14 },
  { pos: [-8, 0, -12],  radius: 4.0, color: '#34E9E2', speed: 0.06, opacity: 0.05 },
  { pos: [10, -6, -4],  radius: 2.0, color: '#1a6f8a', speed: 0.18, opacity: 0.09 },
]

function Orb({ pos, radius, color, speed, opacity }: typeof ORB_DATA[0]) {
  const ref = useRef<THREE.Mesh>(null)
  const offset = useRef(Math.random() * Math.PI * 2)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * speed + offset.current
    ref.current.position.y = pos[1] + Math.sin(t) * 0.8
    ref.current.position.x = pos[0] + Math.cos(t * 0.7) * 0.5
  })

  return (
    <mesh ref={ref} position={pos as [number, number, number]}>
      <sphereGeometry args={[radius, 12, 12]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        wireframe={false}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

export function FloatingOrbs() {
  return (
    <>
      {ORB_DATA.map((o, i) => <Orb key={i} {...o} />)}
    </>
  )
}
