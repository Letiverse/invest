'use client'
import { motion } from 'motion/react'
import { SlideFrame } from '@/components/deck/SlideFrame'
import { BgVideo } from '@/components/deck/BgVideo'
import { CursorSpotlight } from '@/components/deck/CursorSpotlight'
import { blobUrl } from '@/lib/blob-urls'

const MUX_PLAYBACK_ID = 'dhPDEe6tx7kr67AX7sH01js01Jmkkfabkb4Q6rkEBnO7Q' // gm — AI-generated background video

export function Slide07_BackwardsModel() {
  return (
    <SlideFrame>
      <BgVideo playbackId={MUX_PLAYBACK_ID} readyTimeout={8000} contentDelay={400} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'auto' }}>
      <CursorSpotlight size={560} intensity={0.32} introDuration={1800} />
      {/* Eyebrow */}
      <div style={{ position: "absolute", left: 120, top: 33.4, width: 885.1, height: 44.0, backgroundColor: 'rgba(5,13,28,0.94)', border: '1px solid rgba(52,233,226,0.18)', borderRadius: 4, padding: '6px 16px' }}>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "28.0px", fontWeight: 700, letterSpacing: "10.0px", color: "#34E9E2" }}>THE BACKWARDS BUSINESS MODEL</span></p>
      </div>
      {/* Question/Headline */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{ position: "absolute", left: 120.0, top: 79.8, width: 1680.0, height: 202.2, backgroundColor: "rgba(5,13,28,0.94)", border: "1px solid rgba(52,233,226,0.20)", padding: '16px 24px' }}
      >
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "80.0px", fontWeight: 700, letterSpacing: "-0.6px", color: "#FFFFFF", textShadow: "0 0 8.0px rgba(52,233,226,0.40)" }}>We </span><span style={{ fontSize: "80.0px", fontWeight: 700, letterSpacing: "-0.6px", color: "#34E9E2", textShadow: "0 0 8.0px rgba(52,233,226,0.40)" }}>do not </span><span style={{ fontSize: "80.0px", fontWeight: 700, letterSpacing: "-0.6px", color: "#FFFFFF", textShadow: "0 0 8.0px rgba(52,233,226,0.40)" }}>Charge our Hosts for their Letiverse Tours </span></p>
      </motion.div>

      {/* Central infographic image — smaller, positioned between text panels */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        style={{ position: "absolute", left: 510, top: 310, width: 900, height: 680, borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(52,233,226,0.18)', boxShadow: '0 0 40px rgba(52,233,226,0.12)' }}
      >
        <img src={blobUrl('/slides/slide-07/backwards-model.png')} alt="" style={{ width: '100%', height: '100%', objectFit: "contain", filter: 'brightness(1.1)' }} />
      </motion.div>

      {/* Left text panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        style={{ position: "absolute", left: 57.1, top: 445.1, width: 423.9, height: 623.8, backgroundColor: "rgba(5,13,28,0.96)", border: "1px solid rgba(52,233,226,0.22)", boxShadow: "0 0 22px rgba(52,233,226,0.38)", padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        {[
          'AI Companies Are Currently Charging Small Businesses High Fees for AI',
          'As the AI market grows competitive, prices are expected to drop significantly with more entrants',
          'The Marketing Spend needed for an AI company is Astronomical',
        ].map((text, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.2 + i * 0.2 }} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34E9E2', boxShadow: '0 0 10px #34E9E2', marginTop: 10, flexShrink: 0 }} />
            <span style={{ fontSize: "26.0px", fontWeight: 400, color: "#FFFFFF", textShadow: "0 0 8.0px rgba(52,233,226,0.30)", lineHeight: 1.3 }}>{text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Right text panel */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.5, duration: 0.6 }}
        style={{ position: "absolute", left: 1438.5, top: 450.2, width: 423.9, height: 623.8, backgroundColor: "rgba(5,13,28,0.96)", border: "1px solid rgba(52,233,226,0.22)", boxShadow: "0 0 22px rgba(52,233,226,0.38)", padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        {[
          'Our Hosts Sign Long Term Contracts with Letiverse (4 to 10 years)',
          'For the tour to remain free, they must share Letiverse on social media once per week',
          'Letiverse values partnerships over short term extraction',
        ].map((text, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3.7 + i * 0.2 }} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34E9E2', boxShadow: '0 0 10px #34E9E2', marginTop: 10, flexShrink: 0 }} />
            <span style={{ fontSize: "26.0px", fontWeight: 400, color: "#FFFFFF", textShadow: "0 0 8.0px rgba(52,233,226,0.30)", lineHeight: 1.3 }}>{text}</span>
          </motion.div>
        ))}
      </motion.div>

      <img src={blobUrl('/slides/shared/letiverse-logo.jpeg')} alt="" style={{ position: "absolute", right: 0, top: 0, width: 217.0, height: 217.0, objectFit: "cover", filter: "drop-shadow(0 0 22.0px rgba(52,233,226,0.40))" }} />
      </motion.div>
    </SlideFrame>
  )
}
