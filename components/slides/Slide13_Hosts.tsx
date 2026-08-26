'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { NumberTicker } from '@/components/ui/number-ticker'
import { SlideFrame } from '@/components/deck/SlideFrame'
import { blobUrl } from '@/lib/blob-urls'

const CARD_W = 236
const CARD_H = 400

const cardStyle = (l: number, t: number) => ({
  position: 'absolute' as const,
  left: l,
  top: t,
  width: CARD_W,
  height: CARD_H,
})

interface CardProps {
  l: number; t: number; delay: number
  imgSrc: string; imgL: number; imgT: number; imgW: number; imgH: number
  name: string; years: string
}

function HostCard({ l, t, delay, imgSrc, imgL, imgT, imgW, imgH, name, years }: CardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.45, ease: [0.6, 0.01, 0, 1] }}
      whileHover={{ y: -8, scale: 1.05, filter: 'brightness(1.08)', transition: { duration: 0.22, ease: 'easeOut' } }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ ...cardStyle(l, t), zIndex: hovered ? 10 : 1, cursor: 'pointer' }}
    >
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#141428', border: hovered ? '1px solid rgba(52,233,226,0.95)' : '1px solid rgba(52,233,226,0.6)', boxShadow: hovered ? '0 0 36px rgba(52,233,226,0.65), 0 8px 28px rgba(0,0,0,0.5)' : '0 0 16px rgba(52,233,226,0.30)', transition: 'all 220ms ease-out' }} />
      <div style={{ position: 'absolute', left: 12, top: 12, width: 212, height: 200, backgroundColor: 'rgba(52,233,226,0.120)' }} />
      <img src={imgSrc} alt={name} style={{ position: 'absolute', left: imgL, top: imgT, width: imgW, height: imgH, objectFit: 'cover' }} />
      {/* Hover info overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'absolute', left: 0, top: 0, right: 0, bottom: 0,
              background: 'linear-gradient(180deg, rgba(5,13,28,0.0) 40%, rgba(5,13,28,0.95) 100%)',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              padding: '10px 10px 12px', pointerEvents: 'none',
            }}
          >
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#34E9E2', letterSpacing: '1.5px', lineHeight: 1.2 }}>{name.toUpperCase()}</p>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.5px' }}>Contract: {years}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ position: 'absolute', left: 8, top: 222, width: 220, height: 88 }}>
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15 }}>
          <span style={{ fontSize: '22.0px', fontWeight: 700, color: '#FFFFFF' }}>{name}</span>
        </p>
      </div>
      <div style={{ position: 'absolute', left: 8, top: 318, width: 220, height: 44 }}>
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15 }}>
          <span style={{ fontSize: '22.0px', fontWeight: 700, color: '#34E9E2' }}>{years}</span>
        </p>
      </div>
    </motion.div>
  )
}

export function Slide13_Hosts() {
  return (
    <SlideFrame>
      {/* Theme_LeftBar */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 5.8, height: 1080, backgroundColor: '#34E9E2' }} />

      {/* Eyebrow */}
      <div style={{ position: 'absolute', left: 108, top: 16, width: 1296, height: 36 }}>
        <p style={{ textAlign: 'left', margin: 0, padding: 0, lineHeight: 1.15 }}>
          <span style={{ fontSize: '28.0px', fontWeight: 700, letterSpacing: '10.0px', color: '#34E9E2' }}>LETIVERSE - HOSTS SIGNED SO FAR</span>
        </p>
      </div>

      {/* MainTitle */}
      <div style={{ position: 'absolute', left: 108, top: 52, width: 1080, height: 100 }}>
        <p style={{ textAlign: 'left', margin: 0, padding: 0, lineHeight: 1.15 }}>
          <span style={{ fontSize: '64.0px', fontWeight: 700, letterSpacing: '-0.6px', color: '#34E9E2', textShadow: '0 0 8px rgba(52,233,226,0.40)' }}>
            <NumberTicker value={14} delay={0.3} />{' '}
          </span>
          <span style={{ fontSize: '64.0px', fontWeight: 700, letterSpacing: '-0.6px', color: '#FFFFFF', textShadow: '0 0 8px rgba(52,233,226,0.40)' }}>
            Hosts Confirmed
          </span>
        </p>
      </div>

      {/* YearsBadge — width reduced from 204 to 155 so all 3 badges clear the logo at x=1702 */}
      <motion.div
        animate={{ boxShadow: ['0 0 6px rgba(52,233,226,0.3)', '0 0 18px rgba(52,233,226,0.8)', '0 0 6px rgba(52,233,226,0.3)'] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{ position: 'absolute', left: 1212, top: 28, width: 155, height: 120, backgroundColor: 'rgba(52,233,226,0.200)', border: '1px solid #34E9E2' }}
      >
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: '24.0px', fontWeight: 700, color: '#34E9E2' }}>Combined</span>
        </p>
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: '36.0px', fontWeight: 700, color: '#FFFFFF' }}><NumberTicker value={102} delay={0.5} /> yrs</span>
        </p>
      </motion.div>

      {/* SocialPostsBadge */}
      <div style={{ position: 'absolute', left: 1377, top: 28, width: 155, height: 120, backgroundColor: 'rgba(52,233,226,0.200)', border: '1px solid #34E9E2' }}>
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: 'nowrap' }}><span style={{ fontSize: '20.0px', fontWeight: 700, color: '#34E9E2' }}>Social Posts</span></p>
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: 'nowrap' }}><span style={{ fontSize: '32.0px', fontWeight: 700, color: '#FFFFFF' }}>728/yr</span></p>
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: 'nowrap' }}><span style={{ fontSize: '16.0px', color: 'rgba(255,255,255,0.700)' }}>52 per host p/yr</span></p>
      </div>

      {/* TotalPostsBadge — ends at x=1697, just before logo at x=1702 */}
      <div style={{ position: 'absolute', left: 1542, top: 28, width: 155, height: 120, backgroundColor: 'rgba(52,233,226,0.200)', border: '1px solid #34E9E2' }}>
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: 'normal' }}><span style={{ fontSize: '20.0px', fontWeight: 700, color: '#34E9E2' }}>Total Posts</span></p>
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: 'normal' }}><span style={{ fontSize: '32.0px', fontWeight: 700, color: '#FFFFFF' }}>5,304</span></p>
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: 'normal' }}><span style={{ fontSize: '16.0px', color: 'rgba(255,255,255,0.700)' }}>over contracts</span></p>
      </div>

      {/* Row 1 — 7 cards */}
      <HostCard l={108}  t={184} delay={0.40} name="Bradford Bulls Rugby"    years="10 years"
        imgSrc={blobUrl('/slides/media/image29.png')}  imgL={28}   imgT={22}   imgW={180}   imgH={180} />
      <HostCard l={356}  t={184} delay={0.48} name="The Ship Inn"             years="10 years"
        imgSrc={blobUrl('/slides/media/image36.jpeg')} imgL={22}   imgT={37.9} imgW={192}   imgH={148.2} />
      <HostCard l={604}  t={184} delay={0.56} name="Sittingbourne FC"         years="10 years"
        imgSrc={blobUrl('/slides/media/image34.png')}  imgL={22}   imgT={48}   imgW={192}   imgH={128} />
      <HostCard l={852}  t={184} delay={0.64} name="Rochester City FC"        years="10 years"
        imgSrc={blobUrl('/slides/media/image37.png')}  imgL={53.6} imgT={22}   imgW={128.9} imgH={180} />
      <HostCard l={1100} t={184} delay={0.72} name="Keenwood Ltd"             years="10 years"
        imgSrc={blobUrl('/slides/media/image33.png')}  imgL={40.6} imgT={22}   imgW={154.8} imgH={180} />
      <HostCard l={1348} t={184} delay={0.80} name="Funding Unlocked Ltd"     years="10 years"
        imgSrc={blobUrl('/slides/media/image30.png')}  imgL={28}   imgT={22}   imgW={180}   imgH={180} />
      <HostCard l={1596} t={184} delay={0.88} name="My Shining Star Charity"  years="10 years"
        imgSrc={blobUrl('/slides/media/image38.png')}  imgL={22}   imgT={57.1} imgW={192}   imgH={109.8} />

      {/* Row 2 — 7 cards */}
      <HostCard l={108}  t={600} delay={0.96} name="West Kent Shooting"       years="6 years"
        imgSrc={blobUrl('/slides/media/image41.png')}  imgL={22}   imgT={33.9} imgW={192}   imgH={156.2} />
      <HostCard l={356}  t={600} delay={1.04} name="The Ridge Golf Club"      years="5 years"
        imgSrc={blobUrl('/slides/media/image35.png')}  imgL={22}   imgT={61.9} imgW={192}   imgH={100.3} />
      <HostCard l={604}  t={600} delay={1.12} name="Safe Haven Animal Rescue" years="5 years"
        imgSrc={blobUrl('/slides/media/image39.png')}  imgL={27.3} imgT={22}   imgW={181.4} imgH={180} />
      <HostCard l={852}  t={600} delay={1.20} name="Calypso Cricket"          years="4 years"
        imgSrc={blobUrl('/slides/media/image31.png')}  imgL={28}   imgT={22}   imgW={180}   imgH={180} />
      <HostCard l={1100} t={600} delay={1.28} name="Hawkinge Cricket Club"    years="4 years"
        imgSrc={blobUrl('/slides/media/image32.jpeg')} imgL={22}   imgT={58}   imgW={192}   imgH={108} />
      <HostCard l={1348} t={600} delay={1.36} name="Tonbridge Golf Centre"    years="4 years"
        imgSrc={blobUrl('/slides/media/image42.png')}  imgL={28}   imgT={22}   imgW={180}   imgH={180} />
      <HostCard l={1596} t={600} delay={1.44} name="Soar Trampoline Park"     years="4 years"
        imgSrc={blobUrl('/slides/media/image40.png')}  imgL={22}   imgT={55.5} imgW={192}   imgH={113} />
      <img src={blobUrl('/slides/shared/letiverse-logo.jpeg')} alt="" style={{ position: "absolute", left: 1702.6, top: 1.5, width: 217.0, height: 217.0, objectFit: "cover", filter: "drop-shadow(0 0 22.0px rgba(52,233,226,0.40))" }} />
    </SlideFrame>
  )
}
