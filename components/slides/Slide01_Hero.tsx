'use client'
import { useState, useCallback } from 'react'
import { motion } from 'motion/react'
import { SlideFrame } from '@/components/deck/SlideFrame'
import { BgVideo } from '@/components/deck/BgVideo'
import { TypingAnimation } from '@/components/ui/typing-animation'
import { NumberTicker } from '@/components/ui/number-ticker'
import { BorderBeam } from '@/components/ui/border-beam'
import { DECK_EFFECTS } from '@/lib/effectFlags'
import { blobUrl } from '@/lib/blob-urls'
import { DEAL } from '@/lib/dealTerms'

const MUX_PLAYBACK_ID = '01tA3S3V2ZHxqIDKaCs5IwgGuJ4oGa5I5b1iXG9VGUg8' // gm — AI-generated background video
const AWARD_WINNER_IMG = blobUrl('/slides/shared/digital-twin-winner-2026.webp')

export function Slide01_Hero() {
  // videoReady gates content reveal — content fades in after the video finishes playing.
  // readyTimeout (8s) is the fallback if the video stalls or errors.
  const [videoReady, setVideoReady] = useState(false)
  const handleVideoReady = useCallback(() => setVideoReady(true), [])

  return (
    <SlideFrame>
      <BgVideo
        playbackId={MUX_PLAYBACK_ID}
        onReady={handleVideoReady}
        readyTimeout={8000}
        contentDelay={400}
      />

      {/* Content renders at t=0. Video is enhancement underneath — if it
          loads, great; if not (codec, network, autoplay block) the deal
          terms still land. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'auto' }}
      >
        {/* Theme_TopWash — denser when video isn't loaded so text still reads */}
        <div style={{ position: "absolute", left: 0.0, top: 0.0, width: 1920.0, height: 220.0, backgroundColor: videoReady ? "rgba(11,26,46,0.820)" : "rgba(11,26,46,0.92)", boxShadow: "0 0 16.0px rgba(52,233,226,0.40)", transition: 'background-color 600ms ease' }} />
        {/* Theme_BotWash */}
        <div style={{ position: "absolute", left: 0.0, top: 720.0, width: 1920.0, height: 360.0, backgroundColor: videoReady ? "rgba(11,26,46,0.820)" : "rgba(11,26,46,0.92)", boxShadow: "0 0 22.0px rgba(52,233,226,0.40)", transition: 'background-color 600ms ease' }} />
        {/* Theme_LeftBar */}
        <div style={{ position: "absolute", left: 0.0, top: 0.0, width: 8.0, height: 1080.0, backgroundColor: "#34E9E2" }} />
        {/* Theme_Halo */}
        <div style={{ position: "absolute", left: 360.0, top: 260.0, width: 1200.0, height: 440.0, background: "transparent", borderRadius: "50%" }} />
        {/* DealTerms */}
        <div style={{ position: "absolute", left: 160.0, top: 881.9, width: 1600.0, height: 155.1 }}>
          <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "48.0px", fontWeight: 700, letterSpacing: "-0.5px", color: "#34E9E2" }}>£<NumberTicker value={995000} delay={0.6} /> </span><span style={{ fontSize: "28.0px", letterSpacing: "2.0px", color: "#FFFFFF" }}>RAISE</span><span style={{ fontSize: "48.0px", fontWeight: 700, color: "rgba(255,255,255,0.350)" }}>  |  </span><span style={{ fontSize: "48.0px", fontWeight: 700, letterSpacing: "-0.5px", color: "#34E9E2" }}>£<NumberTicker value={50} delay={0.8} /> </span><span style={{ fontSize: "28.0px", letterSpacing: "2.0px", color: "#FFFFFF" }}>SHARE PRICE</span><span style={{ fontSize: "48.0px", fontWeight: 700, color: "rgba(255,255,255,0.350)" }}>  |  </span><span style={{ fontSize: "48.0px", fontWeight: 700, letterSpacing: "-0.5px", color: "#34E9E2" }}>£<NumberTicker value={1000} delay={1} /> </span><span style={{ fontSize: "28.0px", letterSpacing: "2.0px", color: "#FFFFFF" }}>MIN BUY-IN</span><span style={{ fontSize: "48.0px", fontWeight: 700, color: "rgba(255,255,255,0.350)" }}>  | </span><span style={{ fontSize: "28.0px", letterSpacing: "2.0px", color: "#FFFFFF" }}>CLOSES</span><span style={{ fontSize: "48.0px", letterSpacing: "2.0px", color: "#FFFFFF" }}> </span><span style={{ fontSize: "48.0px", letterSpacing: "2.0px", color: "#34E9E2" }}>31</span><span style={{ fontSize: "31.2px", letterSpacing: "2.0px", verticalAlign: "super", color: "#34E9E2" }}>ST</span><span style={{ fontSize: "48.0px", letterSpacing: "2.0px", color: "#FFFFFF" }}> </span><span style={{ fontSize: "48.0px", fontWeight: 700, letterSpacing: "-0.5px", color: "#34E9E2" }}>MAY 2026</span></p>
          <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "26.0px", fontWeight: 700, color: "#34E9E2" }}><NumberTicker value={DEAL.sharesRemaining} delay={1.8} /></span><span style={{ fontSize: "24.0px", letterSpacing: "4.0px", color: "#A1A1AA" }}> SHARES REMAINING AS OF </span><span style={{ fontSize: "26.0px", fontWeight: 700, color: "#A1A1AA" }}>{DEAL.sharesRemainingAsOf}</span></p>
        </div>
        {/* Title 1 */}
        <div style={{ position: "absolute", left: 0.0, top: 21.3, width: 1920.0, height: 168.0 }}>
          <p style={{ textAlign: "center", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "132.0px", fontWeight: 700, letterSpacing: "-0.5px", color: "#34E9E2", textShadow: "0 0 36.0px rgba(52,233,226,0.40)" }}><TypingAnimation duration={60} delay={300}>Letiverse AI</TypingAnimation></span></p>
        </div>
        {/* Subtitle 2 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{ position: "absolute", left: 160.0, top: 744.0, width: 906.2, height: 94.8 }}
        >
          <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap" }}><span style={{ fontSize: "48.0px", fontWeight: 700, letterSpacing: "10.0px", color: "#34E9E2", textShadow: "0 0 36.0px rgba(52,233,226,0.40)" }}>INVESTMENT</span><span style={{ fontSize: "48.0px", fontWeight: 700, letterSpacing: "10.0px", color: "#34E9E2" }}> </span><span style={{ fontSize: "48.0px", fontWeight: 700, letterSpacing: "10.0px", color: "#34E9E2", textShadow: "0 0 36.0px rgba(52,233,226,0.40)" }}>OPPORTUNITY</span></p>
        </motion.div>
        {/* Award — single official badge, no duplicates. The PNG itself communicates "Digital Twin Award · Winner 2026". */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.55, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: 1620,
            top: 740,
            width: 240,
            padding: '8px 12px',
            borderRadius: 6,
            border: '1px solid rgba(52,233,226,0.32)',
            background: 'rgba(5,13,28,0.78)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: '0 6px 22px rgba(0,0,0,0.45), 0 0 24px rgba(52,233,226,0.18)',
            zIndex: 2,
          }}
        >
          <img
            src={AWARD_WINNER_IMG}
            alt="Digital Twin Award — Winner 2026"
            width={1920}
            height={1080}
            style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(52,233,226,0.35))' }}
          />
          {DECK_EFFECTS.borderBeamS1Award && (
            <BorderBeam
              size={120}
              duration={14}
              delay={3}
              colorFrom="#34E9E2"
              colorTo="#9EF6F2"
              borderWidth={1}
            />
          )}
        </motion.div>
        {/* Picture 11 */}
        <img src={blobUrl('/slides/shared/letiverse-logo.jpeg')} alt="" style={{ position: "absolute", left: 1702.6, top: 1.5, width: 217.0, height: 217.0, objectFit: "cover", filter: "drop-shadow(0 0 22.0px rgba(52,233,226,0.40))" }} />
      </motion.div>
    </SlideFrame>
  )
}
