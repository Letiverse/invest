'use client'
import { motion } from 'motion/react'
import dynamic from 'next/dynamic'
import { SlideFrame } from '@/components/deck/SlideFrame'
import { blobUrl } from '@/lib/blob-urls'
import { DECK_EFFECTS } from '@/lib/effectFlags'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LaserFlow = dynamic<any>(() => import('@/components/LaserFlow') as Promise<any>, { ssr: false })

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const PHASES = [
  {
    num: '01',
    label: 'CURRENT PHASE',
    title: 'Sponsorship & Hardware',
    bullets: [
      '50/50 sponsorship revenue split with hosts',
      'UK exclusive rights to sell & rent Holo Connects holographic technology',
      'Long-term host contracts (4–10 years)',
    ],
    accent: '#34E9E2',
    delay: 0.5,
    imgSrc: '/slides/slide-11/phase1.jpg',
  },
  {
    num: '02',
    label: 'NEXT PHASE',
    title: 'Transactions & Ecommerce',
    bullets: [
      'Virtual storefronts embedded inside Letiverse tours',
      'In-world purchases — physical & digital goods',
      'Standalone digital shops for any business',
    ],
    accent: '#98F8F3',
    delay: 0.75,
    imgSrc: '/slides/slide-11/phase2.jpg',
  },
]

export function Slide11_Phases() {
  return (
    <SlideFrame>
      {/* LaserFlow ambient background */}
      {DECK_EFFECTS.reactBitsBackgrounds && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <LaserFlow
            color="#34E9E2"
            flowSpeed={0.25}
            wispIntensity={3.5}
            fogIntensity={0.55}
            wispDensity={0.7}
          />
        </div>
      )}

      {/* Dark overlay so content stays readable */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,13,28,0.68)', pointerEvents: 'none' }} />

      {/* Theme_LeftBar */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 8, height: 1080, backgroundColor: 'rgba(52,233,226,0.6)' }} />

      {/* Eyebrow */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.55, ease: EASE }} style={{ position: 'absolute', left: 120, top: 42, width: 1680, height: 44 }}>
        <p style={{ margin: 0, padding: 0, lineHeight: 1.15 }}><span style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '10px', color: '#34E9E2' }}>HOW DOES LETIVERSE MAKE MONEY?</span></p>
      </motion.div>

      {/* Headline */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.55, ease: EASE }} style={{ position: 'absolute', left: 120, top: 90, width: 1680, height: 100 }}>
        <p style={{ margin: 0, padding: 0, lineHeight: 1.1 }}>
          <span style={{ fontSize: '64px', fontWeight: 700, letterSpacing: '-0.6px', color: '#34E9E2', textShadow: '0 0 8px rgba(52,233,226,0.40)' }}>Phase 1 </span>
          <span style={{ fontSize: '64px', fontWeight: 700, letterSpacing: '-0.6px', color: '#FFFFFF', textShadow: '0 0 8px rgba(52,233,226,0.40)' }}>→ </span>
          <span style={{ fontSize: '64px', fontWeight: 700, letterSpacing: '-0.6px', color: '#34E9E2', textShadow: '0 0 8px rgba(52,233,226,0.40)' }}>Phase 2</span>
        </p>
      </motion.div>

      {/* Phase cards */}
      <div style={{ position: 'absolute', left: 120, top: 210, right: 120, display: 'flex', gap: 40 }}>
        {PHASES.map((phase) => (
          <motion.div
            key={phase.num}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: phase.delay, duration: 0.6, ease: EASE }}
            whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
            style={{
              flex: 1,
              borderRadius: 12,
              border: `1px solid ${phase.accent}44`,
              background: 'linear-gradient(160deg, rgba(5,13,28,0.9) 0%, rgba(5,13,28,0.75) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(52,233,226,0.10)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Card image */}
            <div style={{ position: 'relative', height: 340, overflow: 'hidden' }}>
              <img
                src={blobUrl(phase.imgSrc)}
                alt={phase.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85) saturate(1.2)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 50%, rgba(5,13,28,0.9) 100%)` }} />
              {/* Phase badge */}
              <div style={{
                position: 'absolute', top: 16, left: 16,
                background: `${phase.accent}22`, border: `1px solid ${phase.accent}88`,
                borderRadius: 6, padding: '4px 12px',
                fontSize: 11, fontWeight: 700, letterSpacing: '3px', color: phase.accent,
              }}>
                {phase.label}
              </div>
            </div>

            {/* Card content */}
            <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontSize: 52, fontWeight: 900, color: phase.accent, lineHeight: 1, textShadow: `0 0 20px ${phase.accent}66`, letterSpacing: '-2px' }}>
                  {phase.num}
                </span>
                <span style={{ fontSize: 32, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>{phase.title}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {phase.bullets.map((bullet, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: phase.delay + 0.3 + i * 0.12 }}
                    style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
                  >
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: phase.accent, boxShadow: `0 0 8px ${phase.accent}`, marginTop: 8, flexShrink: 0 }} />
                    <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.88)', lineHeight: 1.4 }}>{bullet}</span>
                  </motion.div>
                ))}
              </div>

              {/* Bottom glow line */}
              <motion.div
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: phase.delay }}
                style={{ height: 2, borderRadius: 1, background: `linear-gradient(90deg, transparent, ${phase.accent}, transparent)`, marginTop: 'auto' }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Logo */}
      <img src={blobUrl('/slides/shared/letiverse-logo.jpeg')} alt="" style={{ position: 'absolute', right: 0, top: 0, width: 217, height: 217, objectFit: 'cover', filter: 'drop-shadow(0 0 22px rgba(52,233,226,0.40))' }} />
    </SlideFrame>
  )
}
