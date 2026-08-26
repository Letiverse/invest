'use client'
import { motion } from 'motion/react'
import { SlideFrame } from '@/components/deck/SlideFrame'
import { BgVideo } from '@/components/deck/BgVideo'
import { TypingAnimation } from '@/components/ui/typing-animation'
import { blobUrl } from '@/lib/blob-urls'

const MUX_PLAYBACK_ID = 'Kw5yIeY8acLOmVtP00fNb7dPNHe01h02YE004PnyI8OT2fo' // gm — AI-generated background video

export function Slide03_SpatialWeb() {
  return (
    <SlideFrame>
      <BgVideo playbackId={MUX_PLAYBACK_ID} readyTimeout={8000} contentDelay={400} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'auto' }}>
        {/* Theme_LeftBar */}
        <div style={{ position: "absolute", left: 0.0, top: 0.0, width: 8.0, height: 1080.0, backgroundColor: "rgba(52,233,226,0.600)" }} />

        {/* Glass Card 1 — header (eyebrow + headline) */}
        <div style={{ position: 'absolute', left: 88, top: 46, width: 1450, height: 258, backgroundColor: 'rgba(5,13,28,0.52)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(52,233,226,0.15)', borderRadius: 6, boxShadow: '0 4px 24px rgba(0,0,0,0.32)', pointerEvents: 'none' }} />

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={{ position: "absolute", left: 120.0, top: 70.0, width: 928.4, height: 44.0 }}
        >
          <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "28.0px", fontWeight: 700, letterSpacing: "10.0px", color: "#34E9E2" }}>THE SHIFT OVER THE NEXT 10 YEARS</span></p>
        </motion.div>

        {/* Headline */}
        <div style={{ position: "absolute", left: 120.0, top: 120.0, width: 1680.0, height: 160.0 }}>
          <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "96.0px", letterSpacing: "-0.6px", color: "#FFFFFF" }}>The web is </span><span style={{ fontSize: "96.0px", fontWeight: 700, letterSpacing: "-0.6px", color: "#FFFFFF" }}>flat.</span><span style={{ fontSize: "96.0px", letterSpacing: "-0.6px", color: "#FFFFFF" }}> The world </span><span style={{ fontSize: "96.0px", fontWeight: 700, letterSpacing: "-0.6px", color: "#34E9E2", textShadow: "0 0 8.0px rgba(52,233,226,0.40)" }}><TypingAnimation duration={35} delay={600} style={{ fontSize: "96.0px", fontWeight: 700, letterSpacing: "-0.6px", color: "#34E9E2" }}>{"isn't."}</TypingAnimation></span></p>
        </div>

        {/*
         * Two-column layout below the headline:
         *   Left  (88–900)  → body copy in a dedicated glass card, no image overlap
         *   Right (920–1832) → comparison image, labelled at the bottom
         */}

        {/* Left glass card — body copy */}
        <div style={{ position: 'absolute', left: 88, top: 322, width: 800, height: 690, backgroundColor: 'rgba(5,13,28,0.60)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(52,233,226,0.15)', borderRadius: 6, boxShadow: '0 4px 24px rgba(0,0,0,0.32)', pointerEvents: 'none' }} />

        {/* Body paragraph — left column */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.55 }}
          style={{ position: "absolute", left: 120.0, top: 348.0, width: 740.0 }}
        >
          <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.35, whiteSpace: "normal", fontSize: "36.0px", letterSpacing: "-0.2px", color: "rgba(255,255,255,0.800)" }}>The next shift in Digital Services and AI, is 3D technology. As people spend more time on their devices, they are now after an <span style={{ fontWeight: 700, color: "#31DED7" }}>experience</span> when they are online.<br /><br />Letiverse AI is the <span style={{ fontWeight: 700, color: "#34E9E2" }}>operating layer for the spatial web.</span></p>
        </motion.div>

        {/* Right column — comparison image + labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.65 }}
          style={{ position: "absolute", left: 912, top: 322, width: 930, height: 690 }}
        >
          {/* gm — AI-generated split-screen comparison image, Slide 03 Spatial Web */}
          <img
            src={blobUrl('/slides/slide-03/spatial-comparison.jpg')}
            alt="Comparison of flat website experiences and spatial web experiences"
            style={{ width: '100%', height: 'calc(100% - 74px)', objectFit: "cover", borderRadius: 8, filter: "drop-shadow(0 0 22.0px rgba(52,233,226,0.40))" }}
          />
          {/* Labels row below the image */}
          <div style={{ display: 'flex', width: '100%', height: 74 }}>
            {/* Glass Card YESTERDAY */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(5,13,28,0.70)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(52,233,226,0.15)', borderRadius: 6, boxShadow: '0 4px 24px rgba(0,0,0,0.32)', marginRight: 8 }}>
              <span style={{ fontSize: "22.0px", fontWeight: 700, letterSpacing: "8px", color: "rgba(255,255,255,0.550)" }}>YESTERDAY · WEBSITES</span>
            </div>
            {/* Glass Card FUTURE */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(5,13,28,0.70)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(52,233,226,0.15)', borderRadius: 6, boxShadow: '0 4px 24px rgba(0,0,0,0.32)' }}>
              <span style={{ fontSize: "22.0px", fontWeight: 700, letterSpacing: "8px", color: "#34E9E2", filter: 'drop-shadow(0 0 8px rgba(52,233,226,0.6))' }}>THE FUTURE · SPATIAL</span>
            </div>
          </div>
        </motion.div>

        {/* Letiverse logo */}
        <img src={blobUrl('/slides/shared/letiverse-logo.jpeg')} alt="Letiverse Logo" style={{ position: "absolute", left: 1702.6, top: 1.5, width: 217.0, height: 217.0, objectFit: "cover", filter: "drop-shadow(0 0 22.0px rgba(52,233,226,0.40))" }} />
      </motion.div>
    </SlideFrame>
  )
}
