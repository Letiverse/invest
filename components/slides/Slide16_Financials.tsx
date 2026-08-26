'use client'
import { motion } from 'motion/react'
import { SlideFrame } from '@/components/deck/SlideFrame'
import { blobUrl } from '@/lib/blob-urls'

export function Slide16_Financials(){
  return (
    <SlideFrame>
      {/* Picture 4 */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8 }} style={{ position: "absolute", inset: 0 }}>
        <img src={blobUrl('/slides/slide-16/financials.png')} alt="" style={{ width: '100%', height: '100%', objectFit: "cover" }} />
        <div style={{ position:'absolute', top:0, right:0, bottom:0, left:0, backgroundImage:'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)', pointerEvents:'none', zIndex:1 }} />
      </motion.div>
      <img src={blobUrl('/slides/shared/letiverse-logo.jpeg')}alt="" style={{ position: "absolute", left: 1702.6, top: 1.5, width: 217.0, height: 217.0, objectFit: "cover", filter: "drop-shadow(0 0 22.0px rgba(52,233,226,0.40))" }} />
    </SlideFrame>
  )
}