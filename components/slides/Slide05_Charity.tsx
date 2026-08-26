'use client'
import { motion, type Variants } from 'motion/react'
import dynamic from 'next/dynamic'
import { SlideFrame } from '@/components/deck/SlideFrame'
import { BorderBeam } from '@/components/ui/border-beam'
import { blobUrl } from '@/lib/blob-urls'
import { DECK_EFFECTS } from '@/lib/effectFlags'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Threads = dynamic<any>(() => import('@/components/Threads') as Promise<any>, { ssr: false })

const watchPulse: Variants = {
  pulse: {
    opacity: [1, 0.55, 1],
    textShadow: ['0 0 0px transparent', '0 0 16px rgba(52,233,226,0.95)', '0 0 0px transparent'],
  },
}
const TOUR_PREVIEW_URL = 'https://player.mux.com/01eBWAY0143PBd9whQ7MrQ6WwCJ02jAJmEzpmdkrVmBsNo'

export function Slide05_Charity() {
  return (
    <SlideFrame>
      {/* Threads animated background */}
      {DECK_EFFECTS.reactBitsBackgrounds && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <Threads
            color={[52 / 255, 233 / 255, 226 / 255]}
            amplitude={1.2}
            distance={0.3}
            enableMouseInteraction={false}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
      {/* Dark overlay to keep content legible */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,13,28,0.72)', pointerEvents: 'none' }} />
      {/* Theme_LeftBar */}
      <div style={{ position: "absolute", left: 0.0, top: 0.0, width: 8.0, height: 1080.0, backgroundColor: "rgba(52,233,226,0.600)" }} />
      {/* Picture 12 */}
      <img src={blobUrl('/slides/shared/letiverse-logo.jpeg')} alt="Letiverse Logo" style={{ position: "absolute", left: 1768, top: 18, width: 128, height: 128, borderRadius: "50%", objectFit: "cover", filter: "drop-shadow(0 0 22.0px rgba(52,233,226,0.40))", zIndex: 4 }} />
      {/* TextBox 17 */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{ position: "absolute", left: 132.2, top: 291.0, width: 498.0, height: 790.0, border: "1px solid #34E9E2", boxShadow: "0 0 22.0px rgba(52,233,226,0.29)" }}
      >
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "32.0px", color: "#FFFFFF" }}>Our Second Ever </span><span style={{ fontSize: "32.0px", color: "#34E9E2" }}>Letiverse Tour </span><span style={{ fontSize: "32.0px", color: "#FFFFFF" }}>was for a Children&apos;s Cancer Charity, Called </span><span style={{ fontSize: "32.0px", color: "#34E9E2" }}>My Shining Star</span><span style={{ fontSize: "32.0px", color: "#FFFFFF" }}>. </span><br /><br /><span style={{ fontSize: "32.0px", color: "#FFFFFF" }}>Within the Tour you can explore all of the </span><span style={{ fontSize: "32.0px", color: "#34E9E2" }}>amazing work </span><span style={{ fontSize: "32.0px", color: "#FFFFFF" }}>the charity does, you can create your own storybook, create recipes by uploading a photo of your cupboard at home, listen to the song Letiverse AI created for them and much more</span><br /><br /><motion.a href={TOUR_PREVIEW_URL} target="_blank" rel="noopener noreferrer" variants={watchPulse} animate="pulse" transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }} style={{ fontSize: "32.0px", color: "#34E9E2", textDecoration: "none", cursor: "pointer", display: "inline-block", fontWeight: 700 }}>▶ Watch the tour preview</motion.a></p>
      </motion.div>
      {/* Eyebrow */}
      <div style={{ position: "absolute", left: 120.0, top: 61.5, width: 928.4, height: 44.0 }}>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "28.0px", fontWeight: 700, letterSpacing: "10.0px", color: "#34E9E2" }}>WHAT IS THE LETIVERSE?</span></p>
      </div>
      {/* Question */}
      <div style={{ position: "absolute", left: 120.0, top: 120.0, width: 1680.0, height: 160.0 }}>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "96.0px", letterSpacing: "-0.6px", color: "#FFFFFF" }}>Changing the world from </span><span style={{ fontSize: "96.0px", letterSpacing: "-0.6px", color: "#34E9E2" }}>2D to 3D</span></p>
      </div>
      {/* Mux video - My Shining Star */}
      <div style={{ position: "absolute", left: 707.7, top: 374.4, width: 1164.3, height: 662.6, background: "#000", overflow: "hidden", filter: "drop-shadow(0 0 22px rgba(52,233,226,0.40))", borderRadius: 4, border: '1px solid rgba(52,233,226,0.35)' }}>
        <iframe
          title="My Shining Star — Letiverse Interactive 3D Tour"
          src={`${TOUR_PREVIEW_URL}?autoplay=true&muted=true&playsinline=true`}
          style={{ width: "100%", height: "100%", border: "none" }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
        />
        <BorderBeam
          size={220}
          duration={7}
          colorFrom="#34E9E2"
          colorTo="#9EF6F2"
          borderWidth={2}
        />
        <motion.a
          href={TOUR_PREVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          animate={{
            opacity: [0.9, 1, 0.9],
            y: [0, -1, 0],
            boxShadow: [
              '0 0 12px rgba(52,233,226,0.35)',
              '0 0 28px rgba(52,233,226,0.72)',
              '0 0 12px rgba(52,233,226,0.35)',
            ],
          }}
          transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            right: 22,
            bottom: 18,
            zIndex: 4,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '11px 18px',
            borderRadius: 4,
            border: '1px solid rgba(52,233,226,0.8)',
            background: 'rgba(5,13,28,0.78)',
            color: '#34E9E2',
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '1px',
            textDecoration: 'none',
          }}
        >
          ▶ PLAY TOUR
        </motion.a>
      </div>
    </SlideFrame>
  )
}
