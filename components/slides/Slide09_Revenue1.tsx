'use client'
import { motion } from 'motion/react'
import { SlideFrame } from '@/components/deck/SlideFrame'
import { StaggeredImg } from '@/components/ui/staggered-img'
import { blobUrl } from '@/lib/blob-urls'

export function Slide09_Revenue1() {
  return (
    <SlideFrame>
      {/* Theme_LeftBar */}
      <div style={{ position: "absolute", left: 0.0, top: 0.0, width: 8.0, height: 1080.0, backgroundColor: "rgba(52,233,226,0.600)" }} />
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{ position: "absolute", left: 120.0, top: 70.0, width: 928.4, height: 44.0 }}
      >
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "28.0px", fontWeight: 700, letterSpacing: "10.0px", color: "#34E9E2" }}>HOW DOES LETIVERSE MAKE MONEY?</span></p>
      </motion.div>
      {/* Question */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        style={{ position: "absolute", left: 120.0, top: 120.0, width: 1680.0, height: 160.0 }}
      >
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "56.0px", letterSpacing: "-0.6px", color: "#FFFFFF" }}>Letiverse </span><span style={{ fontSize: "56.0px", letterSpacing: "-0.6px", color: "#34E9E2" }}>Share</span><span style={{ fontSize: "56.0px", letterSpacing: "-0.6px", color: "#FFFFFF" }}> Sponsorship Revenue with the Hosts &ndash; </span><span style={{ fontSize: "56.0px", letterSpacing: "-0.6px", color: "#34E9E2" }}>50/50</span></p>
      </motion.div>
      {/* Answer */}
      <div style={{ position: "absolute", left: 120.0, top: 202.0, width: 1680.0, height: 175.4 }}>
        <p style={{ textAlign: "left", margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: "normal" }}><span style={{ fontSize: "36.0px", color: "#FFFFFF" }}>In a Letiverse, local businesses sponsor placements to increase their visibility. These interactive ads allow users to click on the banner, which opens a full page featuring the business. Revenue generated is split evenly, with 50% going to the host and the remaining 50% to Letiverse.</span></p>
      </div>
      {/* Picture 12 */}
      <img src={blobUrl('/slides/shared/letiverse-logo.jpeg')} alt="" style={{ position: "absolute", left: 1702.6, top: 1.5, width: 217.0, height: 217.0, objectFit: "cover", filter: "drop-shadow(0 0 22.0px rgba(52,233,226,0.40))" }} />
      {/* Picture 13 */}
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.06, zIndex: 10, filter: 'drop-shadow(0 0 20px rgba(52,233,226,0.7))' }} whileTap={{ scale: 0.97 }} transition={{ delay: 0.5, duration: 0.5, type: 'spring', stiffness: 280, damping: 22 }} style={{ position: "absolute", left: 58.0, top: 410.9, width: 566.7, height: 319.4, cursor: 'pointer' }}>
        <StaggeredImg src={blobUrl('/slides/media/image12.png')} delay={0.5} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </motion.div>
      {/* Picture 15 */}
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.06, zIndex: 10, filter: 'drop-shadow(0 0 20px rgba(52,233,226,0.7))' }} whileTap={{ scale: 0.97 }} transition={{ delay: 0.65, duration: 0.5, type: 'spring', stiffness: 280, damping: 22 }} style={{ position: "absolute", left: 677.8, top: 407.9, width: 564.3, height: 319.4, cursor: 'pointer' }}>
        <StaggeredImg src={blobUrl('/slides/media/image13.png')} delay={0.65} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </motion.div>
      {/* Picture 23 */}
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.06, zIndex: 10, filter: 'drop-shadow(0 0 20px rgba(52,233,226,0.7))' }} whileTap={{ scale: 0.97 }} transition={{ delay: 0.8, duration: 0.5, type: 'spring', stiffness: 280, damping: 22 }} style={{ position: "absolute", left: 1306.8, top: 406.4, width: 567.7, height: 319.4, cursor: 'pointer' }}>
        <StaggeredImg src={blobUrl('/slides/media/image17.png')} delay={0.8} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </motion.div>
      {/* Picture 19 */}
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.06, zIndex: 10, filter: 'drop-shadow(0 0 20px rgba(52,233,226,0.7))' }} whileTap={{ scale: 0.97 }} transition={{ delay: 0.95, duration: 0.5, type: 'spring', stiffness: 280, damping: 22 }} style={{ position: "absolute", left: 58.0, top: 740.0, width: 564.4, height: 319.4, cursor: 'pointer' }}>
        <StaggeredImg src={blobUrl('/slides/media/image15.png')} delay={0.95} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </motion.div>
      {/* Picture 21 */}
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.06, zIndex: 10, filter: 'drop-shadow(0 0 20px rgba(52,233,226,0.7))' }} whileTap={{ scale: 0.97 }} transition={{ delay: 1.1, duration: 0.5, type: 'spring', stiffness: 280, damping: 22 }} style={{ position: "absolute", left: 672.4, top: 740.0, width: 565.7, height: 319.4, cursor: 'pointer' }}>
        <StaggeredImg src={blobUrl('/slides/media/image16.png')} delay={1.1} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </motion.div>
      {/* Picture 17 */}
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.06, zIndex: 10, filter: 'drop-shadow(0 0 20px rgba(52,233,226,0.7))' }} whileTap={{ scale: 0.97 }} transition={{ delay: 1.25, duration: 0.5, type: 'spring', stiffness: 280, damping: 22 }} style={{ position: "absolute", left: 1306.8, top: 740.0, width: 566.4, height: 319.4, cursor: 'pointer' }}>
        <StaggeredImg src={blobUrl('/slides/media/image14.png')} delay={1.25} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </motion.div>
    </SlideFrame>
  )
}