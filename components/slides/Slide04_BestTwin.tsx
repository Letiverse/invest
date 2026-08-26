'use client'
import { motion, type Variants } from 'motion/react'
import { BorderBeam } from '@/components/ui/border-beam'
import { SlideFrame } from '@/components/deck/SlideFrame'
import { BgVideo } from '@/components/deck/BgVideo'
import { blobUrl } from '@/lib/blob-urls'

const watchPulse: Variants = {
  pulse: {
    opacity: [1, 0.55, 1],
    textShadow: ['0 0 0px transparent', '0 0 16px rgba(52,233,226,0.95)', '0 0 0px transparent'],
  },
}

const MUX_PLAYBACK_ID = 'GC00xY5Mt01RKRuM0002rGiMkKtdMXOCn7tYXYnUo5PZaQc' // gm — AI-generated background video
const TOUR_PREVIEW_URL = 'https://player.mux.com/X45u02RbgqQ8DOcCtCVocVirNJZ1gS1ZBj3E9e7HR5SU'
const AWARD_WINNER_IMG = blobUrl('/slides/shared/digital-twin-winner-2026.webp')

export function Slide04_BestTwin() {
  return (
    <SlideFrame>
      <BgVideo playbackId={MUX_PLAYBACK_ID} readyTimeout={8000} contentDelay={400} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'auto' }}>
      {/* Picture 5 */}
      <img src={blobUrl('/slides/shared/letiverse-logo.jpeg')} alt="Letiverse Logo" style={{ position: "absolute", left: 1748, top: 16, width: 150, height: 150, borderRadius: "50%", objectFit: "cover", filter: "drop-shadow(0 0 28px rgba(52,233,226,0.42))", zIndex: 4 }} />
      {/* TextBox 10 */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.7, duration: 0.6 }}
        style={{ position: "absolute", left: 90, top: 548, width: 590, backgroundColor: "rgba(0,0,0,0.88)", border: "1px solid #34E9E2", boxShadow: "0 0 22.0px rgba(52,233,226,0.40)", padding: "16px 18px", zIndex: 3 }}
      >
        {/* GOVERNANCE-EXEMPTION: "Digital Twin" below is the verbatim name of an external
            third-party industry award. Strictly quoting the award title. Exemption confirmed
            by project owner — see PR #35 comments. */}
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.12, whiteSpace: "normal" }}><span style={{ fontSize: "25px", color: "#FFFFFF" }}>Our </span><span style={{ fontSize: "25px", color: "#34E9E2" }}>First Ever </span><span style={{ fontSize: "25px", color: "#FFFFFF" }}>Letiverse Tour Won </span><span style={{ fontSize: "25px", color: "#34E9E2" }}>Best Digital Twin in the World 2026</span><br /><br /><span style={{ fontSize: "25px", color: "#FFFFFF" }}>&quot;The Ship Inn, down in Medway&quot; </span><br /><br /><span style={{ fontSize: "25px", color: "#FFFFFF" }}>Beating 3D Spatial Companies from </span><span style={{ fontSize: "25px", color: "#34E9E2" }}>170 Countries </span><span style={{ fontSize: "25px", color: "#FFFFFF" }}>across the Globe</span><br /><br /><motion.a href={TOUR_PREVIEW_URL} target="_blank" rel="noopener noreferrer" variants={watchPulse} animate="pulse" transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }} style={{ fontSize: "26px", color: "#34E9E2", textDecoration: "none", cursor: "pointer", display: "inline-block", fontWeight: 700 }}>▶ Watch the tour preview</motion.a></p>
      </motion.div>
      {/* Header card — dark backdrop so eyebrow + headline read over the video background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{
          position: 'absolute', left: 80, top: 44, width: 1580, height: 258,
          background: 'rgba(5,13,28,0.72)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: 4,
          borderBottom: '1px solid rgba(52,233,226,0.18)',
        }}
      />
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        style={{ position: "absolute", left: 120.0, top: 61.5, width: 928.4, height: 44.0 }}
      >
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "28.0px", fontWeight: 700, letterSpacing: "10.0px", color: "#34E9E2" }}>WHAT IS THE LETIVERSE?</span></p>
      </motion.div>
      {/* Question */}
      <div style={{ position: "absolute", left: 120.0, top: 120.0, width: 1680.0, height: 160.0 }}>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "96.0px", letterSpacing: "-0.6px", color: "#FFFFFF" }}>Where </span><span style={{ fontSize: "96.0px", letterSpacing: "-0.6px", color: "#34E9E2" }}>AI</span><span style={{ fontSize: "96.0px", letterSpacing: "-0.6px", color: "#FFFFFF" }}> Meets </span><span style={{ fontSize: "96.0px", letterSpacing: "-0.6px", color: "#34E9E2" }}>3D Websites</span></p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.55 }}
        style={{
          position: 'absolute',
          left: 90,
          top: 322,
          width: 590,
          padding: '14px 14px 12px',
          borderRadius: 4,
          border: '1px solid rgba(52,233,226,0.38)',
          background: 'rgba(5,13,28,0.78)',
          boxShadow: '0 0 24px rgba(52,233,226,0.26)',
          zIndex: 3,
        }}
      >
        <p style={{ margin: 0, marginBottom: 10, fontSize: 11, letterSpacing: '2.4px', fontWeight: 700, color: '#34E9E2' }}>
          AWARD-WINNING FIRST TOUR
        </p>
        <img
          src={AWARD_WINNER_IMG}
          alt="Digital Twin Award — Winner 2026"
          width={540}
          height={180}
          style={{ display: 'block', width: '100%', maxWidth: 540, height: 156, objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(52,233,226,0.32))' }}
        />
      </motion.div>
      {/* Mux video - Ship Inn tour */}
      <div style={{ position: "absolute", left: 714.9, top: 365.5, width: 1161.5, height: 653.0, background: "#000", overflow: "hidden", filter: "drop-shadow(0 0 22px rgba(52,233,226,0.40))", borderRadius: 4, border: '1px solid rgba(52,233,226,0.35)' }}>
        <iframe
          title="The Ship Inn — Letiverse Interactive 3D Tour"
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
      </motion.div>
    </SlideFrame>
  )
}
