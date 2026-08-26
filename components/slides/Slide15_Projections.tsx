'use client'
import { useState, useCallback } from 'react'
import { motion } from 'motion/react'
import { SlideFrame } from '@/components/deck/SlideFrame'
import { BgVideo } from '@/components/deck/BgVideo'
import { NumberTicker } from '@/components/ui/number-ticker'
import { DECK_EFFECTS } from '@/lib/effectFlags'
import { blobUrl } from '@/lib/blob-urls'

const MUX_PLAYBACK_ID = '7j7Ed74H88DAQ702XeJNUk101gV7lZGbokShUsmV02hqqo' // gm — AI-generated background video

export function Slide15_Projections() {
  const [videoReady, setVideoReady] = useState(false)
  const handleVideoReady = useCallback(() => setVideoReady(true), [])

  return (
    <SlideFrame>
      <BgVideo playbackId={MUX_PLAYBACK_ID} onReady={handleVideoReady} readyTimeout={8000} contentDelay={400} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'auto' }}>
      {/* Glass card — mounts eyebrow + text block */}
      <div style={{ position: 'absolute', left: 45, top: 22, width: 1110, height: 248, backgroundColor: 'rgba(5,13,28,0.45)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', border: '1px solid rgba(52,233,226,0.18)', borderRadius: 8, boxShadow: '0 4px 28px rgba(0,0,0,0.28)', pointerEvents: 'none' }} />
      {/* Eyebrow */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }} style={{ position: "absolute", left: 57.1, top: 38.0, width: 1124.3, height: 44.0 }}>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "28.0px", fontWeight: 700, letterSpacing: "10.0px", color: "#34E9E2" }}>WHAT DO THE NEXT 3 YEARS LOOK LIKE?</span></p>
      </motion.div>
      {/* Question */}
      <div style={{ position: "absolute", left: 57.1, top: 88.0, width: 1050, height: 170 }}>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.12, whiteSpace: "normal" }}><span style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "-0.3px", color: "#FFFFFF", textShadow: "0 0 8.0px rgba(52,233,226,0.40)" }}>Letiverse are currently averaging £5,000 sponsorship per year, per tour. This will </span><span style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "-0.3px", color: "#34E9E2", textShadow: "0 0 8.0px rgba(52,233,226,0.40)" }}>increase</span><span style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "-0.3px", color: "#FFFFFF", textShadow: "0 0 8.0px rgba(52,233,226,0.40)" }}> as the network grows. </span><br /><span style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "-0.3px", color: "#FFFFFF", textShadow: "0 0 8.0px rgba(52,233,226,0.40)" }}>Phase 2 adds transaction and ecommerce revenue.</span><br /><span style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.3px", color: "#FFFFFF", textShadow: "0 0 8.0px rgba(52,233,226,0.40)" }}>*Hardware sales and rental income not included*</span></p>
      </div>
      {/* Picture 15 */}
      <img src={blobUrl('/slides/shared/letiverse-logo.jpeg')} alt="Letiverse Logo" style={{ position: "absolute", left: 1702.6, top: 1.5, width: 217.0, height: 217.0, objectFit: "cover", filter: "drop-shadow(0 0 22.0px rgba(52,233,226,0.40))" }} />
      {/* Year-3 callout — overlay glass card pulling out the headline number from the projection chart */}
      {DECK_EFFECTS.slide15Callout && (
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'absolute',
            left: 1596,
            top: 314,
            width: 296,
            padding: '14px 18px 16px',
            borderRadius: 8,
            border: '1.5px solid rgba(52,233,226,0.55)',
            background: 'linear-gradient(135deg, rgba(5,13,28,0.86) 0%, rgba(13,45,45,0.78) 100%)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: '0 14px 44px rgba(0,0,0,0.55), 0 0 28px rgba(52,233,226,0.28)',
            zIndex: 3,
          }}
        >
          <p style={{ margin: 0, padding: 0, lineHeight: 1.05 }}>
             <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '3.4px', color: '#34E9E2' }}>YEAR 3 PROJECTED</span>
          </p>
          <motion.p
            animate={{ textShadow: ['0 0 0px transparent', '0 0 22px rgba(52,233,226,0.85)', '0 0 0px transparent'] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: 2.4, ease: 'easeInOut' }}
            style={{ margin: '6px 0 0', padding: 0, lineHeight: 1, fontSize: 54, fontWeight: 700, letterSpacing: '-1px', color: '#FFFFFF' }}
          >
            £<NumberTicker value={7.4} decimalPlaces={1} delay={1.9} />M
          </motion.p>
          <p style={{ margin: '5px 0 0', padding: 0, fontSize: 11, color: 'rgba(255,255,255,0.72)', letterSpacing: '1.2px' }}>
            SPONSORSHIP REVENUE · BOTTOM-UP MODEL
          </p>
        </motion.div>
      )}
      </motion.div>
    </SlideFrame>
  )
}
