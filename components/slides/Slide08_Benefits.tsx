'use client'
import { motion } from 'motion/react'
import { SlideFrame } from '@/components/deck/SlideFrame'
import { BgVideo } from '@/components/deck/BgVideo'
import { TypingAnimation } from '@/components/ui/typing-animation'
import { blobUrl } from '@/lib/blob-urls'

const MUX_PLAYBACK_ID = '02TVW6e00k2c00qufHOSvUb01DkSQWfsuJMZB2hJ01zVwxZA' // gm — AI-generated background video

const BENEFITS = [
  {
    title: 'Frictionless acquisition',
    body: 'Free tours remove the barriers of time, money and AI knowledge. Hosts can say yes quickly because Letiverse creates, updates and improves the experience for them.',
  },
  {
    title: 'Zero marketing budget and the "Halo Effect"',
    body: 'Hosts pay with audience access instead of cash: 52 contracted posts per host, per year, turning their followers into Letiverse distribution.',
    accent: '#FFC000',
  },
  {
    title: 'Long-term relationships over short-term profits',
    body: 'We build multi-year partnerships with hosts, compounding trust, content, data and commercial surface area instead of extracting one-off fees.',
  },
  {
    title: 'A network of Letiverse tours',
    body: 'Each new host strengthens the wider network. More tours create more shares, more audience reach and more value for every participant.',
  },
]

export function Slide08_Benefits() {
  return (
    <SlideFrame>
      <BgVideo playbackId={MUX_PLAYBACK_ID} readyTimeout={8000} contentDelay={400} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'auto' }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(5,13,28,0.94) 0%, rgba(5,13,28,0.82) 52%, rgba(5,13,28,0.16) 100%)" }} />
      {/* Eyebrow */}
      <div style={{ position: "absolute", left: 120, top: 38, width: 1040, height: 48, boxShadow: "0 0 36.0px rgba(52,233,226,0.40)" }}>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><TypingAnimation duration={22} delay={300} style={{ fontSize: "28.0px", fontWeight: 700, letterSpacing: "10.0px", color: "#34E9E2" }}>BACKWARDS BUSINESS MODEL</TypingAnimation></p>
      </div>
      {/* Main narrative card */}
      <div style={{ position: "absolute", left: 116, top: 116, width: 1124, height: 880, backgroundColor: "rgba(5,13,28,0.93)", border: "1px solid rgba(52,233,226,0.52)", boxShadow: "0 0 36.0px rgba(52,233,226,0.34)", padding: "40px 48px 44px" }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}>
          <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.06, whiteSpace: "normal" }}><span style={{ fontSize: "64.0px", letterSpacing: "-0.6px", color: "#34E9E2" }}>Why</span><span style={{ fontSize: "64.0px", letterSpacing: "-0.6px", color: "#FFFFFF" }}> not charge?</span><br /><span style={{ fontSize: "64.0px", letterSpacing: "-0.6px", color: "#FFFFFF" }}>Because the </span><span style={{ fontSize: "64.0px", letterSpacing: "-0.6px", color: "#34E9E2" }}>network</span><span style={{ fontSize: "64.0px", letterSpacing: "-0.6px", color: "#FFFFFF" }}> is the value.</span></p>
        </motion.div>
        <div style={{ display: "grid", gap: 20, marginTop: 34 }}>
          {BENEFITS.map(({ title, body, accent }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65 + index * 0.18, duration: 0.45 }}
              style={{ display: "grid", gridTemplateColumns: "22px 1fr", gap: 18, alignItems: "start" }}
            >
              <span style={{ width: 9, height: 9, marginTop: 14, borderRadius: 999, background: accent ?? "#34E9E2", boxShadow: `0 0 18px ${accent ?? "#34E9E2"}` }} />
              <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.18, whiteSpace: "normal" }}>
                <span style={{ fontSize: "27.0px", fontWeight: 700, color: accent ?? "#34E9E2" }}>{title}</span>
                <span style={{ fontSize: "27.0px", fontWeight: 700, color: "#FFFFFF" }}> - {body}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      </motion.div>
    </SlideFrame>
  )
}
