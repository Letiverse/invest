'use client'
import { motion } from 'motion/react'
import { SlideFrame } from '@/components/deck/SlideFrame'
import { BgVideo } from '@/components/deck/BgVideo'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Meteors } from '@/components/ui/meteors'
import { DECK_EFFECTS } from '@/lib/effectFlags'
import { usePlatform } from '@/hooks/usePlatform'
import { blobUrl } from '@/lib/blob-urls'

const MUX_PLAYBACK_ID = 'Ua4LpwEvSQqE01qcphrIEp00Mn7nihKopkKWjWAFOZt300' // gm — AI-generated background video

export function Slide02_AIShift() {
  const { isTouchDevice, deviceType, reducedMotion } = usePlatform()
  const meteorsEnabled =
    DECK_EFFECTS.meteorsS2 && !reducedMotion && deviceType !== 'mobile'
  const meteorCount = isTouchDevice ? 8 : 14

  return (
    <SlideFrame>
      <BgVideo playbackId={MUX_PLAYBACK_ID} readyTimeout={8000} contentDelay={400} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'auto' }}>
      {/* Theme_Scrim */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(5,13,28,0.700)", boxShadow: "0 0 22.0px rgba(52,233,226,0.40)" }} />
      {/* Meteors — atmospheric, behind content, low opacity. Pointer-events:none on the wrapper. */}
      {meteorsEnabled && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0, right: 0, bottom: 0, left: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            opacity: 0.42,
            zIndex: 1,
          }}
        >
          <Meteors number={meteorCount} minDuration={3} maxDuration={9} className="bg-[#34E9E2]" />
        </div>
      )}
      {/* Theme_LeftBar */}
      <div style={{ position: "absolute", left: 0.0, top: 0.0, width: 8.0, height: 1080.0, backgroundColor: "rgba(52,233,226,0.700)" }} />
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{ position: "absolute", left: 120.0, top: 120.0, width: 893.8, height: 39.8 }}
      >
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "28.0px", fontWeight: 700, letterSpacing: "10.0px", color: "#34E9E2" }}>THE SHIFT OVER THE LAST 10 YEARS</span></p>
      </motion.div>
      {/* Headline */}
      <div style={{ position: "absolute", left: 120.0, top: 260.0, width: 1080.0, height: 400.0 }}>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "120.0px", fontWeight: 700, letterSpacing: "-0.6px", color: "#FFFFFF" }}>AI is here to stay.</span><br /><span style={{ fontSize: "120.0px", fontWeight: 700, letterSpacing: "-0.6px", color: "#FFFFFF" }}>Are you Invested and Involved? </span></p>
      </div>
      {/* RightCol */}
      <div style={{ position: "absolute", left: 1240.0, top: 260.0, width: 600.0, height: 560.0 }}>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "64.0px", fontWeight: 700, letterSpacing: "-0.4px", color: "#34E9E2" }}>£<NumberTicker value={1.3} decimalPlaces={1} delay={0} />T</span></p>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "26.0px", fontWeight: 700, letterSpacing: "6.0px", color: "rgba(255,255,255,0.700)" }}>AI MARKET BY 2030</span></p>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "64.0px", fontWeight: 700, letterSpacing: "-0.4px", color: "#34E9E2" }}><NumberTicker value={78} delay={0} />%</span></p>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "26.0px", fontWeight: 700, letterSpacing: "6.0px", color: "rgba(255,255,255,0.700)" }}>OF BUSINESSES NOW USE AI</span></p>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "64.0px", fontWeight: 700, letterSpacing: "-0.4px", color: "#34E9E2" }}><NumberTicker value={2} delay={0} />x</span></p>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "26.0px", fontWeight: 700, letterSpacing: "6.0px", color: "rgba(255,255,255,0.700)" }}>ADOPTION RATE EVERY 12 MONTHS</span></p>
      </div>
      {/* BottomBand */}
      <div style={{ position: "absolute", left: 0.0, top: 820.0, width: 1920.0, height: 260.0, backgroundColor: "rgba(5,13,28,0.950)", boxShadow: "0 0 22.0px rgba(52,233,226,0.40)" }} />
      {/* Hairline */}
      <div style={{ position: "absolute", left: 0.0, top: 816.0, width: 1920.0, height: 3.0, backgroundColor: "rgba(52,233,226,0.700)" }} />

      {/* InvestorNote — static, readable, no clipped marquee text. */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.45 }}
        style={{ position: "absolute", left: 130, top: 848, width: 1660, height: 150 }}
      >
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.18, whiteSpace: "normal" }}>
          <span style={{ fontSize: "26.0px", fontWeight: 700, letterSpacing: "5.0px", color: "#34E9E2" }}>EARLY INVESTOR CONTEXT</span>
          <br />
          <span style={{ fontSize: "30.0px", color: "#FFFFFF" }}>Amazon IPO: </span><span style={{ fontSize: "30.0px", fontWeight: 700, color: "#FFFFFF" }}>£10k → £23M</span><span style={{ fontSize: "30.0px", color: "#FFFFFF" }}> today · Facebook 2005: </span><span style={{ fontSize: "30.0px", fontWeight: 700, color: "#FFFFFF" }}>2,000×</span><span style={{ fontSize: "30.0px", color: "#FFFFFF" }}> · Nvidia since 2015: </span><span style={{ fontSize: "30.0px", fontWeight: 700, color: "#FFFFFF" }}>~300×</span>
          <br />
          <span style={{ fontSize: "24.0px", fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>The largest gains were made by those who anticipated the change early, not those who waited until it became obvious.</span>
        </p>
      </motion.div>
      {/* Copied Picture 15 */}
      <img src={blobUrl('/slides/shared/letiverse-logo.jpeg')} alt="" style={{ position: "absolute", left: 1702.0, top: 2.0, width: 216.0, height: 216.0, objectFit: "cover", filter: "drop-shadow(0 0 22.0px rgba(52,233,226,0.40))" }} />
      </motion.div>
    </SlideFrame>
  )
}
