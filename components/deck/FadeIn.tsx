'use client'
import { motion } from 'motion/react'
import { useSlideActive } from '@/hooks/useSlideActive'

interface Props {
  children: React.ReactNode
  delay?: number
  duration?: number
  from?: 'left' | 'right' | 'top' | 'bottom' | 'none'
  distance?: number
  style?: React.CSSProperties
  className?: string
}

export function FadeIn({ children, delay = 0, duration = 0.5, from = 'none', distance = 24, style, className }: Props) {
  const active = useSlideActive(delay)
  const x = from === 'left' ? -distance : from === 'right' ? distance : 0
  const y = from === 'top' ? -distance : from === 'bottom' ? distance : 0
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      animate={active ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}
