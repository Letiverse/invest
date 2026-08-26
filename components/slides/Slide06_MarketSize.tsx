'use client'
import { motion } from 'motion/react'
import { SlideFrame } from '@/components/deck/SlideFrame'
import { BgVideo } from '@/components/deck/BgVideo'

import { TypingAnimation } from '@/components/ui/typing-animation'
import { blobUrl } from '@/lib/blob-urls'

const MUX_PLAYBACK_ID = 'PZXipz3P02ROgd62EQx02jjBConMMfhS7Pz593W9dNPvA' // gm — AI-generated background video

export function Slide06_MarketSize() {
  return (
    <SlideFrame>
      <BgVideo playbackId={MUX_PLAYBACK_ID} readyTimeout={8000} contentDelay={400} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'auto' }}>
      {/* Picture 11 - chartwith clipPath reveal */}
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ delay: 0.3, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ position: "absolute", left: -12.2, top: 0.0, width: 1939.3, height: 1118.5 }}
      >
        <img src={blobUrl('/slides/slide-06/market-size.png')} alt="" style={{ width: '100%', height: '100%', objectFit: "cover", filter: "drop-shadow(0 0 22.0px rgba(52,233,226,0.40))" }} />
      </motion.div>
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{ position: "absolute", left: 57.1, top: 33.4, width: 1124.3, height: 44.0 }}
      >
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><TypingAnimation duration={28} delay={600} style={{ fontSize: "28.0px", fontWeight: 700, letterSpacing: "10.0px", color: "#34E9E2" }}>THE SIZE OF THE 3D WEB EXPERIENCE MARKET</TypingAnimation></p>
      </motion.div>
      {/* Question */}
      <div style={{ position: "absolute", left: 57.1, top: 77.4, width: 1680.0, height: 160.0 }}>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "80.0px", fontWeight: 700, letterSpacing: "-0.6px", color: "#FFFFFF", textShadow: "0 0 8.0px rgba(52,233,226,0.40)" }}>We are at the start of the </span><motion.span
          animate={{ textShadow: ['0 0 8px rgba(52,233,226,0.4)', '0 0 24px rgba(52,233,226,0.9)', '0 0 8px rgba(52,233,226,0.4)'] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
          style={{ fontSize: "80.0px", fontWeight: 700, letterSpacing: "-0.6px", color: "#34E9E2", filter: 'drop-shadow(0 0 12px rgba(52,233,226,0.8))' }}
        >Growth Era.</motion.span></p>
      </div>
      {/* Picture 15 — removed per user request */}
      </motion.div>
    </SlideFrame>
  )
}
