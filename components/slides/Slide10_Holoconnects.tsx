'use client'
import dynamic from 'next/dynamic'
import { motion } from 'motion/react'
import { NumberTicker } from '@/components/ui/number-ticker'
import { SlideFrame } from '@/components/deck/SlideFrame'
import { DECK_EFFECTS } from '@/lib/effectFlags'
import { blobUrl } from '@/lib/blob-urls'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DotField = dynamic<any>(() => import('@/components/DotField') as Promise<any>, { ssr: false })

export function Slide10_Holoconnects() {
  return (
    <SlideFrame>
      {/* DotField animated background with mouse interaction */}
      {DECK_EFFECTS.reactBitsBackgrounds && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <DotField
            dotRadius={1.2}
            dotSpacing={22}
            gradientFrom="rgba(52,233,226,0.22)"
            gradientTo="rgba(5,13,28,0)"
            glowColor="#34E9E2"
            sparkle={true}
            bulgeStrength={90}
            cursorRadius={280}
          />
        </div>
      )}
      {/* Theme_LeftBar */}
      <div style={{ position: "absolute", left: 0.0, top: 0.0, width: 8.0, height: 1080.0, backgroundColor: "rgba(52,233,226,0.600)" }} />
      {/* Eyebrow */}
      <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.2 }} style={{ position: "absolute", left: 120.0, top: 70.0, width: 928.4, height: 44.0 }}>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "28.0px", fontWeight: 700, letterSpacing: "10.0px", color: "#34E9E2" }}>HOW DOES LETIVERSE MAKE MONEY? </span></p>
      </motion.div>
      {/* Question */}
      <div style={{ position: "absolute", left: 120.0, top: 120.0, width: 1680.0, height: 160.0 }}>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "64.0px", fontWeight: 700, letterSpacing: "-0.6px", color: "#34E9E2", textShadow: "0 0 8.0px rgba(52,233,226,0.40)" }}>UK Exclusive Rights </span><span style={{ fontSize: "64.0px", fontWeight: 700, letterSpacing: "-0.6px", color: "#FFFFFF", textShadow: "0 0 8.0px rgba(52,233,226,0.40)" }}>to Sell and Rent </span><span style={{ fontSize: "64.0px", fontWeight: 700, letterSpacing: "-0.6px", color: "#FFFFFF", textShadow: "0 0 8.0px rgba(52,233,226,0.40)" }}>Holo Connects</span><span style={{ fontSize: "64.0px", fontWeight: 700, letterSpacing: "-0.6px", color: "#FFFFFF", textShadow: "0 0 8.0px rgba(52,233,226,0.40)" }}> </span><span style={{ fontSize: "64.0px", fontWeight: 700, letterSpacing: "-0.6px", color: "#34E9E2", textShadow: "0 0 8.0px rgba(52,233,226,0.40)" }}>Holographic Technology</span></p>
      </div>
      {/* Picture 12 */}
      <img src={blobUrl('/slides/shared/letiverse-logo.jpeg')} alt="" style={{ position: "absolute", left: 1702.6, top: 1.5, width: 217.0, height: 217.0, objectFit: "cover", filter: "drop-shadow(0 0 22.0px rgba(52,233,226,0.40))" }} />
      {/* Picture 3 — tall holographic display, right side — hover to tilt/glow */}
      <motion.div
        initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.5 }}
        whileHover={{ scale: 1.04, rotateY: -4, rotateX: 2, filter: 'drop-shadow(0 0 28px rgba(52,233,226,0.85))' }}
        style={{ position: "absolute", left: 1342.4, top: 224.5, width: 538.0, height: 801.9, filter: 'drop-shadow(0 0 16px rgba(52,233,226,0.5))', perspective: 800, cursor: 'pointer', transformStyle: 'preserve-3d' }}
      >
        <img src={blobUrl('/slides/media/image18.jpg')} alt="" style={{ width: '100%', height: '100%', objectFit: "cover" }} />
      </motion.div>
      {/* Picture 17 — hologram unit left — hover to tilt/glow */}
      <motion.div
        initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.4 }}
        whileHover={{ scale: 1.05, rotateY: 4, rotateX: -2, filter: 'drop-shadow(0 0 24px rgba(52,233,226,0.75))' }}
        style={{ position: "absolute", left: 39.7, top: 303.8, width: 565.7, height: 339.6, cursor: 'pointer', transformStyle: 'preserve-3d' }}
      >
        <img src={blobUrl('/slides/media/image19.png')} alt="" style={{ width: '100%', height: '100%', objectFit: "cover" }} />
      </motion.div>
      {/* Picture 19 — bottom centre — hover to scale/glow */}
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
        whileHover={{ scale: 1.04, rotateX: -2, filter: 'drop-shadow(0 0 24px rgba(52,233,226,0.75))' }}
        style={{ position: "absolute", left: 605.4, top: 660.6, width: 714.6, height: 378.7, cursor: 'pointer', transformStyle: 'preserve-3d' }}
      >
        <img src={blobUrl('/slides/media/image20.jpg')} alt="" style={{ width: '100%', height: '100%', objectFit: "cover" }} />
      </motion.div>
      {/* TextBox 21 — centre description with glass card */}
      <motion.div
        initial={{ opacity:0, y: 10 }}
        animate={{ opacity:1, y: 0 }}
        transition={{ delay:0.6 }}
        style={{
          position: "absolute", left: 650, top: 285, width: 615, height: 380,
          backgroundColor: 'rgba(5,13,28,0.82)',
          border: '1px solid rgba(52,233,226,0.25)',
          borderRadius: 8,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 28px rgba(52,233,226,0.12), 0 12px 40px rgba(0,0,0,0.4)',
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {[
          'Holographic Technology drives physical footfall to our Letiverse Tours when placed inside hosts\' venues',
          'Letiverse Tours send traffic to physical venues; holograms send traffic back to tours — a two-way loop',
        ].map((text, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.18 }} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34E9E2', boxShadow: '0 0 10px #34E9E2', marginTop: 8, flexShrink: 0 }} />
            <span style={{ fontSize: '26px', color: '#FFFFFF', lineHeight: 1.4, textShadow: '0 0 6px rgba(52,233,226,0.20)' }}>{text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* TextBox 22 — bottom-left with glass card + animated number */}
      <motion.div
        initial={{ opacity:0, y: 10 }}
        animate={{ opacity:1, y: 0 }}
        transition={{ delay:1.0 }}
        style={{
          position: "absolute", left: 9.7, top: 700, width: 595, height: 290,
          backgroundColor: 'rgba(5,13,28,0.82)',
          border: '1px solid rgba(52,233,226,0.25)',
          borderRadius: 8,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 28px rgba(52,233,226,0.12), 0 12px 40px rgba(0,0,0,0.4)',
          padding: '24px 28px',
        }}
      >
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 12 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFC000', boxShadow: '0 0 10px #FFC000', marginTop: 8, flexShrink: 0 }} />
          <span style={{ fontSize: '26px', color: '#FFFFFF', lineHeight: 1.4 }}>
            Over the last few months, Letiverse have sold over{' '}
            <span style={{ color: '#34E9E2', fontWeight: 700, textShadow: '0 0 14px rgba(52,233,226,0.6)' }}>
              £<NumberTicker value={75000} delay={0.8} />
            </span>
            {' '}of holographic technology
          </span>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFC000', boxShadow: '0 0 10px #FFC000', marginTop: 8, flexShrink: 0 }} />
          <span style={{ fontSize: '26px', color: '#FFFFFF', lineHeight: 1.4 }}>The long-term aim is to have the best physical tech as well as the best online</span>
        </div>
      </motion.div>
    </SlideFrame>
  )
}
