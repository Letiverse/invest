'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { NumberTicker } from '@/components/ui/number-ticker'
import { SlideFrame } from '@/components/deck/SlideFrame'
import { blobUrl } from '@/lib/blob-urls'

/**
 * Host roster — single source of truth for slide 16's grid and its derived
 * stat badges (host count, combined years, social posts). Add/remove hosts
 * here only; layout and badge totals recompute automatically.
 *
 * `imgSrc` is left undefined for hosts whose logo hasn't been supplied yet —
 * HostCard renders an initials placeholder in that case.
 */
interface Host { entity: string; name: string; years: number; imgSrc?: string }

const HOSTS: Host[] = [
  { entity: 'E001', name: 'Bradford Bulls Rugby',       years: 4,  imgSrc: blobUrl('/slides/media/image29.png') },
  { entity: 'E002', name: 'Calypso Cricket',              years: 4,  imgSrc: blobUrl('/slides/media/image31.png') },
  { entity: 'E004', name: 'Funding Unlocked Ltd',         years: 10, imgSrc: blobUrl('/slides/media/image30.png') },
  { entity: 'E005', name: 'Hawkinge Cricket Club',        years: 4,  imgSrc: blobUrl('/slides/media/image32.jpeg') },
  { entity: 'E006', name: 'Keenwood Ltd',                 years: 10, imgSrc: blobUrl('/slides/media/image33.png') },
  { entity: 'E007', name: 'My Shining Star Charity',      years: 10, imgSrc: blobUrl('/slides/media/image38.png') },
  { entity: 'E008', name: 'Rochester City FC',            years: 10, imgSrc: blobUrl('/slides/media/image37.png') },
  { entity: 'E009', name: 'Sittingbourne FC',             years: 10, imgSrc: blobUrl('/slides/media/image34.png') },
  { entity: 'E010', name: 'The Ridge Golf Club',          years: 5,  imgSrc: blobUrl('/slides/media/image35.png') },
  { entity: 'E011', name: 'The Ship Inn',                 years: 10, imgSrc: blobUrl('/slides/media/image36.jpeg') },
  { entity: 'E012', name: 'Tonbridge Golf Centre',        years: 4,  imgSrc: blobUrl('/slides/media/image42.png') },
  { entity: 'E029', name: 'West Kent Shooting',           years: 6,  imgSrc: blobUrl('/slides/media/image41.png') },
  { entity: 'E042', name: 'Safe Haven Animal Rescue',     years: 5,  imgSrc: blobUrl('/slides/media/image39.png') },
  { entity: 'E045', name: 'Soar Trampoline Park',         years: 4,  imgSrc: blobUrl('/slides/media/image40.png') },
  { entity: 'E057', name: 'Billericay Town FC',           years: 4,  imgSrc: 'https://tjtvxp4xul5oynxz.public.blob.vercel-storage.com/E057-rm-ima-billericay-town-football-club-logo.webp' },
  { entity: 'E058', name: 'Forever Padel',                years: 5,  imgSrc: 'https://tjtvxp4xul5oynxz.public.blob.vercel-storage.com/E058-rm-ima-forever-padel-logo.webp' },
  { entity: 'E059', name: 'Proper Football',              years: 4,  imgSrc: 'https://tjtvxp4xul5oynxz.public.blob.vercel-storage.com/E059-rm-ima-main-logo.png' },
]

const HOST_COUNT = HOSTS.length
const COMBINED_YEARS = HOSTS.reduce((sum, h) => sum + h.years, 0)
const POSTS_PER_HOST_PER_YEAR = 52
const SOCIAL_POSTS_PER_YEAR = HOST_COUNT * POSTS_PER_HOST_PER_YEAR
const TOTAL_POSTS = COMBINED_YEARS * POSTS_PER_HOST_PER_YEAR

const GRID_COLS = 6
const CARD_W = 268
const CARD_H = 268
const GRID_GAP = 16

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('')
}

function HostCard({ host, delay }: { host: Host; delay: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.45, ease: [0.6, 0.01, 0, 1] }}
      whileHover={{ y: -6, scale: 1.04, filter: 'brightness(1.08)', transition: { duration: 0.22, ease: 'easeOut' } }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ position: 'relative', width: CARD_W, height: CARD_H, zIndex: hovered ? 10 : 1, cursor: 'pointer' }}
    >
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#141428', border: hovered ? '1px solid rgba(52,233,226,0.95)' : '1px solid rgba(52,233,226,0.6)', boxShadow: hovered ? '0 0 30px rgba(52,233,226,0.65), 0 8px 24px rgba(0,0,0,0.5)' : '0 0 14px rgba(52,233,226,0.30)', transition: 'all 220ms ease-out' }} />
      <div style={{ position: 'absolute', left: 10, top: 10, right: 10, height: 132, backgroundColor: 'rgba(52,233,226,0.120)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {host.imgSrc ? (
          <img src={host.imgSrc} alt={host.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        ) : (
          <span style={{ fontSize: 40, fontWeight: 700, color: 'rgba(52,233,226,0.55)', letterSpacing: '1px' }}>{initials(host.name)}</span>
        )}
      </div>
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
              padding: '8px 8px 10px', pointerEvents: 'none',
            }}
          >
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#34E9E2', letterSpacing: '1.2px', lineHeight: 1.2 }}>{host.name.toUpperCase()}</p>
            <p style={{ margin: '3px 0 0', fontSize: 10, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.4px' }}>Contract: {host.years} {host.years === 1 ? 'year' : 'years'}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ position: 'absolute', left: 6, top: 150, width: CARD_W - 12, height: 56 }}>
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#FFFFFF' }}>{host.name}</span>
        </p>
      </div>
      <div style={{ position: 'absolute', left: 6, top: 210, width: CARD_W - 12, height: 34 }}>
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#34E9E2' }}>{host.years} {host.years === 1 ? 'year' : 'years'}</span>
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
            <NumberTicker value={HOST_COUNT} delay={0.3} />{' '}
          </span>
          <span style={{ fontSize: '64.0px', fontWeight: 700, letterSpacing: '-0.6px', color: '#FFFFFF', textShadow: '0 0 8px rgba(52,233,226,0.40)' }}>
            Hosts Confirmed
          </span>
        </p>
      </div>

      {/* YearsBadge */}
      <motion.div
        animate={{ boxShadow: ['0 0 6px rgba(52,233,226,0.3)', '0 0 18px rgba(52,233,226,0.8)', '0 0 6px rgba(52,233,226,0.3)'] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{ position: 'absolute', left: 1212, top: 28, width: 155, height: 120, backgroundColor: 'rgba(52,233,226,0.200)', border: '1px solid #34E9E2' }}
      >
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: '24.0px', fontWeight: 700, color: '#34E9E2' }}>Combined</span>
        </p>
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: '36.0px', fontWeight: 700, color: '#FFFFFF' }}><NumberTicker value={COMBINED_YEARS} delay={0.5} /> yrs</span>
        </p>
      </motion.div>

      {/* SocialPostsBadge */}
      <div style={{ position: 'absolute', left: 1377, top: 28, width: 155, height: 120, backgroundColor: 'rgba(52,233,226,0.200)', border: '1px solid #34E9E2' }}>
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: 'nowrap' }}><span style={{ fontSize: '20.0px', fontWeight: 700, color: '#34E9E2' }}>Social Posts</span></p>
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: 'nowrap' }}><span style={{ fontSize: '32.0px', fontWeight: 700, color: '#FFFFFF' }}>{SOCIAL_POSTS_PER_YEAR.toLocaleString('en-GB')}/yr</span></p>
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: 'nowrap' }}><span style={{ fontSize: '16.0px', color: 'rgba(255,255,255,0.700)' }}>{POSTS_PER_HOST_PER_YEAR} per host p/yr</span></p>
      </div>

      {/* TotalPostsBadge — ends at x=1697, just before logo at x=1702 */}
      <div style={{ position: 'absolute', left: 1542, top: 28, width: 155, height: 120, backgroundColor: 'rgba(52,233,226,0.200)', border: '1px solid #34E9E2' }}>
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: 'normal' }}><span style={{ fontSize: '20.0px', fontWeight: 700, color: '#34E9E2' }}>Total Posts</span></p>
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: 'normal' }}><span style={{ fontSize: '32.0px', fontWeight: 700, color: '#FFFFFF' }}>{TOTAL_POSTS.toLocaleString('en-GB')}</span></p>
        <p style={{ textAlign: 'center', margin: 0, padding: 0, lineHeight: 1.15, whiteSpace: 'normal' }}><span style={{ fontSize: '16.0px', color: 'rgba(255,255,255,0.700)' }}>over contracts</span></p>
      </div>

      {/* Host grid — flex-wrap centers any trailing partial row instead of left-aligning it */}
      <div style={{ position: 'absolute', left: 108, top: 184, width: 1704, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: GRID_GAP }}>
        {HOSTS.map((host, i) => (
          <HostCard key={host.entity} host={host} delay={0.4 + i * 0.05} />
        ))}
      </div>

      <img src={blobUrl('/slides/shared/letiverse-logo.jpeg')} alt="" style={{ position: "absolute", left: 1702.6, top: 1.5, width: 217.0, height: 217.0, objectFit: "cover", filter: "drop-shadow(0 0 22.0px rgba(52,233,226,0.40))" }} />
    </SlideFrame>
  )
}
