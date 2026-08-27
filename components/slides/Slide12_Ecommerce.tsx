'use client'
import { motion } from 'motion/react'
import { SlideFrame } from '@/components/deck/SlideFrame'
import { StaggeredImg } from '@/components/ui/staggered-img'
import { blobUrl } from '@/lib/blob-urls'

const ECOMM_IMAGES = [
  { src: '/slides/media/image23.png', label: 'Virtual Storefront' },
  { src: '/slides/media/image24.png', label: 'In-World Shopping' },
  { src: '/slides/media/image25.png', label: 'Digital Products' },
  { src: '/slides/media/image26.png', label: 'Physical Goods' },
  { src: '/slides/media/image27.png', label: 'Brand Experiences' },
  { src: '/slides/media/image28.png', label: 'Live Commerce' },
]

export function Slide12_Ecommerce() {
  return (
    <SlideFrame>
      {/* Theme_LeftBar */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 5.8, height: 1080, backgroundColor: "#34E9E2" }} />

      {/* Eyebrow */}
      <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.2 }} style={{ position: "absolute", left: 120, top: 64, width: 1680, height: 44 }}>
        <p style={{ margin: 0, padding: 0, lineHeight: 1.15 }}><span style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "10px", color: "#34E9E2" }}>LETIVERSE TRANSACTION &amp; ECOMMERCE PHASE</span></p>
      </motion.div>

      {/* MainTitle */}
      <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }} style={{ position: "absolute", left: 120, top: 116, width: 1680, height: 104 }}>
        <p style={{ margin: 0, padding: 0, lineHeight: 1.15 }}><span style={{ fontSize: "64px", fontWeight: 700, letterSpacing: "-0.6px", color: "#34E9E2", textShadow: "0 0 8px rgba(52,233,226,0.40)" }}>Phase 2 </span><span style={{ fontSize: "64px", fontWeight: 700, letterSpacing: "-0.6px", color: "#FFFFFF", textShadow: "0 0 8px rgba(52,233,226,0.40)" }}>= Transactions &amp; Ecommerce</span></p>
      </motion.div>

      {/* SubLabel */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }} style={{ position: "absolute", left: 120, top: 220, width: 1680, height: 44 }}>
        <p style={{ margin: 0, padding: 0, lineHeight: 1.15 }}><span style={{ fontSize: "24px", letterSpacing: "2px", color: "rgba(255,255,255,0.55)" }}>Virtual storefronts, in-world purchases, and real commerce — any business can have a digital shop</span></p>
      </motion.div>

      {/* Image grid — 3×2 with hover effects */}
      {ECOMM_IMAGES.map(({ src, label }, index) => {
        const col = index % 3
        const row = Math.floor(index / 3)
        const left = 95 + col * (560 + 53)
        const top = 290 + row * (306 + 20)
        return (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.93, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.12 }}
            whileHover={{
              scale: 1.04,
              y: -6,
              boxShadow: '0 0 40px rgba(52,233,226,0.55), 0 20px 50px rgba(0,0,0,0.6)',
              transition: { duration: 0.2 },
            }}
            style={{
              position: 'absolute', left, top, width: 560, height: 306,
              borderRadius: 8,
              border: '1px solid rgba(52,233,226,0.35)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4), 0 0 12px rgba(52,233,226,0.12)',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            <StaggeredImg src={blobUrl(src)} delay={0.5 + index * 0.12} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'filter 0.3s ease', filter: 'brightness(0.95) saturate(1.1)' }} />
            {/* Label overlay on hover */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(180deg, transparent 0%, rgba(5,13,28,0.9) 100%)',
              padding: '24px 14px 12px',
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#34E9E2', letterSpacing: '2px', textTransform: 'uppercase' }}>{label}</span>
            </div>
            {/* Corner accent */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: 0, height: 0, borderTop: '28px solid rgba(52,233,226,0.45)', borderLeft: '28px solid transparent' }} />
          </motion.div>
        )
      })}

      {/* Logo */}
      <img src={blobUrl('/slides/shared/letiverse-logo.jpeg')} alt="" style={{ position: "absolute", right: 0, top: 0, width: 217, height: 217, objectFit: "cover", filter: "drop-shadow(0 0 22px rgba(52,233,226,0.40))" }} />
    </SlideFrame>
  )
}
