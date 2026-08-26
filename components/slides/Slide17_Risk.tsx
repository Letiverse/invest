'use client'
import { motion } from 'motion/react'
import { TypingAnimation } from '@/components/ui/typing-animation'
import { SlideFrame } from '@/components/deck/SlideFrame'
import { blobUrl } from '@/lib/blob-urls'

export function Slide17_Risk(){
  return (
    <SlideFrame>
      {/* Picture 2 */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.9 }} style={{ position: "absolute", left: 0.5, top: 0.0, width: 1919.0, height: 1080.0 }}>
        <img src={blobUrl('/slides/slide-17/risk-moats.png')} alt="" style={{ width: '100%', height: '100%', objectFit: "cover" }} />
      </motion.div>
      {/* Eyebrow */}
      <div style={{ position: "absolute", left: 80, top: 21.2, width: 1700, height: 52.0, backgroundColor: "#000000", borderRadius: 4 }}>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}><TypingAnimation duration={25} delay={600} style={{ fontSize: "28.0px", fontWeight: 700, letterSpacing: "10.0px", color: "#34E9E2" }}>RISK MITIGATION &amp; DEFENSIVE MOATS</TypingAnimation></p>
      </div>

    </SlideFrame>
  )
}
