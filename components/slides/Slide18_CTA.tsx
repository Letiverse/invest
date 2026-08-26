'use client'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Mail, MessageCircle } from 'lucide-react'
import { SlideFrame } from '@/components/deck/SlideFrame'
import { BorderBeam } from '@/components/ui/border-beam'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { blobUrl } from '@/lib/blob-urls'
import { DEAL, raisedSoFar, amountRemaining, progressPct } from '@/lib/dealTerms'
const CONTACT_EMAIL = 'liam@letiverse.co.uk'
const CONTACT_EMAIL_CC = 'admin@letiverse.co.uk'

const CLOSE_DATE = DEAL.closeDate

// Letiverse WhatsApp number for investor enquiries (UK, no + or spaces)
const WHATSAPP_NUMBER = '447707179670'

const EMAIL_HREF = [
  `mailto:${CONTACT_EMAIL}`,
  '?cc=', encodeURIComponent(CONTACT_EMAIL_CC),
  '&subject=', encodeURIComponent('Letiverse AI — Investment Enquiry'),
  '&body=', encodeURIComponent(
    "Hi Letiverse team,\n\nI've just watched the Letiverse AI investment deck and I'm interested in learning more.\n\nMy name is: \nI'm considering investing: £\n\nPlease send me more information.\n\nKind regards,"
  ),
].join('')

const WA_HREF = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Letiverse team, I've just watched the Letiverse AI investment deck and I'm interested in learning more about investing.")}`
  : null

function formatGBP(n: number) {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `£${Math.round(n / 1_000)}K`
  return `£${n.toLocaleString('en-GB')}`
}

function getTimeLeft() {
  const diff = CLOSE_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isClosed: true }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    isClosed: false,
  }
}

function useCountdown() {
  const [t, setT] = useState(getTimeLeft)
  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ textAlign: 'center', minWidth: 74 }}>
      <motion.div
        key={value}
        initial={{ opacity: 0.4, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          fontSize: 44,
          fontWeight: 700,
          color: '#34E9E2',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
          textShadow: '0 0 20px rgba(52,233,226,0.55)',
        }}
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <div style={{ fontSize: 10, letterSpacing: '3px', color: 'rgba(255,255,255,0.42)', marginTop: 6 }}>
        {label}
      </div>
    </div>
  )
}

const DIVIDER = (
  <div style={{ fontSize: 34, color: 'rgba(52,233,226,0.38)', alignSelf: 'center', marginBottom: 12 }}>:</div>
)

// Minimum percentage width (%) a segment must occupy before its inline label is shown
const MIN_LABEL_PCT = 14

function FundraisingProgress() {
  const soldPct = progressPct
  const leftPct = 100 - progressPct

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      style={{ marginBottom: 18 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <span style={{ fontSize: 10, letterSpacing: '3px', color: 'rgba(255,255,255,0.38)' }}>ROUND PROGRESS</span>
        <span style={{ fontSize: 10, letterSpacing: '2px', color: '#34E9E2', fontWeight: 700 }}>
          {formatGBP(raisedSoFar)} RAISED · {formatGBP(amountRemaining)} LEFT
        </span>
      </div>

      {/* Segmented slider — sold (teal) | remaining (dim) */}
      <div style={{
        position: 'relative',
        height: 28,
        borderRadius: 6,
        background: 'rgba(255,255,255,0.07)',
        overflow: 'hidden',
        border: '1px solid rgba(52,233,226,0.18)',
      }}>
        {/* Sold segment */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${soldPct}%` }}
          transition={{ delay: 1.0, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: 0, left: 0, bottom: 0,
            background: 'linear-gradient(90deg, rgba(52,233,226,0.85), rgba(152,248,243,0.75))',
            boxShadow: '2px 0 12px rgba(52,233,226,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {soldPct > MIN_LABEL_PCT && (
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', color: '#041229', whiteSpace: 'nowrap' }}>
              {soldPct.toFixed(1)}% SOLD
            </span>
          )}
        </motion.div>

        {/* Remaining label */}
        {leftPct > MIN_LABEL_PCT && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.4 }}
            style={{
              position: 'absolute',
              top: 0, right: 0, bottom: 0,
              width: `${leftPct}%`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap' }}>
              {leftPct.toFixed(1)}% LEFT
            </span>
          </motion.div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: '#34E9E2', fontWeight: 600 }}>
          {formatGBP(raisedSoFar)} raised
        </span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
          {formatGBP(amountRemaining)} of {formatGBP(DEAL.totalRaise)} remaining
        </span>
      </div>
    </motion.div>
  )
}

export function Slide18_CTA() {
  const { days, hours, minutes, seconds, isClosed } = useCountdown()

  return (
    <SlideFrame>
      {/* Dark base so beams draw on a rich dark background */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#050D1C' }} />

      {/* Animated beam background — replaces static cta-bg.png */}
      <BackgroundBeams />

      {/* Letiverse logo — top-right brand mark */}
      <img
        src={blobUrl('/slides/shared/letiverse-logo.jpeg')}
        alt="Letiverse Logo"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: 217,
          height: 217,
          objectFit: 'contain',
          filter: 'drop-shadow(0 0 22px rgba(52,233,226,0.40))',
          pointerEvents: 'none',
        }}
      />

      {/* Radial teal glow centred on the card */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(65% 55% at 50% 54%, rgba(52,233,226,0.07) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'auto' }}
      >

        {/* Centring wrapper — plain div so motion.div doesn't overwrite transform */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '53%',
            transform: 'translate(-50%, -50%)',
            width: 760,
          }}
        >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.55, ease: 'easeOut' }}
          style={{
            position: 'relative',
            width: '100%',
            borderRadius: 10,
            border: '1px solid rgba(52,233,226,0.28)',
            background: 'rgba(5,13,28,0.72)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: '0 14px 54px rgba(0,0,0,0.6)',
            padding: '34px 44px 32px',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          <BorderBeam
            size={210}
            duration={9}
            colorFrom="#34E9E2"
            colorTo="#98F8F3"
            borderWidth={1}
          />

          <p style={{ margin: 0, marginBottom: 10, fontSize: 11, fontWeight: 700, letterSpacing: '5px', color: '#34E9E2' }}>
            INVESTMENT OPPORTUNITY
          </p>

          <h1 style={{ margin: 0, marginBottom: 8, fontSize: 60, fontWeight: 700, letterSpacing: '-1.1px', color: '#FFFFFF', lineHeight: 1.06 }}>
            Join the Letiverse
          </h1>

          {!isClosed && (
            <motion.p
              style={{ margin: 0, marginBottom: 10, fontSize: 11, fontWeight: 700, letterSpacing: '3px', color: '#34E9E2' }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              LIVE ROUND · CLOSING {CLOSE_DATE.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase()}
            </motion.p>
          )}

          <p style={{ margin: 0, marginBottom: 22, fontSize: 20, color: 'rgba(255,255,255,0.74)' }}>
            The spatial web is here. Be part of what comes next.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 34, marginBottom: 18 }}>
            {[
              { label: 'SHARE PRICE', value: `£${DEAL.sharePrice}` },
              { label: 'MINIMUM', value: `£${DEAL.minInvestment.toLocaleString('en-GB')}` },
              { label: 'TOTAL RAISE', value: '£995K' },
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 30, fontWeight: 700, color: '#34E9E2', textShadow: '0 0 14px rgba(52,233,226,0.55)' }}>
                  {value}
                </div>
                <div style={{ fontSize: 9, letterSpacing: '3px', color: 'rgba(255,255,255,0.42)', marginTop: 4 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          <FundraisingProgress />

          <div style={{ marginBottom: 24 }}>
            {isClosed ? (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: '4px', color: '#34E9E2' }}>
                  THIS ROUND IS NOW CLOSED
                </p>
                <p style={{ margin: '8px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.58)' }}>
                  Contact us directly to discuss future investment opportunities.
                </p>
              </div>
            ) : (
              <>
                <p style={{ margin: 0, marginBottom: 14, fontSize: 10, letterSpacing: '4px', color: 'rgba(255,255,255,0.34)' }}>
                  ROUND CLOSES IN
                </p>
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', gap: 16, alignItems: 'flex-start' }}>
                  {/* 1Hz teal pulse ring — urgency signal without clutter */}
                  <motion.div
                    aria-hidden
                    initial={{ opacity: 0.5, scale: 0.85 }}
                    animate={{ opacity: [0.5, 0, 0.5], scale: [0.85, 1.18, 0.85] }}
                    transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      inset: -14,
                      borderRadius: 8,
                      border: '1px solid rgba(52,233,226,0.55)',
                      boxShadow: '0 0 18px rgba(52,233,226,0.32) inset, 0 0 26px rgba(52,233,226,0.22)',
                      pointerEvents: 'none',
                    }}
                  />
                  <TimeUnit value={days} label="DAYS" />
                  {DIVIDER}
                  <TimeUnit value={hours} label="HRS" />
                  {DIVIDER}
                  <TimeUnit value={minutes} label="MIN" />
                  {DIVIDER}
                  <TimeUnit value={seconds} label="SEC" />
                </div>
              </>
            )}
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 14 }}>
            <motion.a
              href={EMAIL_HREF}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: '0 0 34px rgba(52,233,226,0.62)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 34px',
                minHeight: 44,
                borderRadius: 6,
                backgroundColor: '#34E9E2',
                color: '#041229',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '2.1px',
                textDecoration: 'none',
                boxShadow: '0 0 20px rgba(52,233,226,0.45)',
              }}
            >
              <Mail size={15} strokeWidth={2.5} />
              EMAIL LETIVERSE
            </motion.a>

            {WA_HREF && (
              <motion.a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(37,211,102,0.45)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 34px',
                  minHeight: 44,
                  borderRadius: 6,
                  border: '1px solid #25D366',
                  color: '#25D366',
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '2.1px',
                  textDecoration: 'none',
                  background: 'rgba(5,13,28,0.3)',
                }}
              >
                <MessageCircle size={15} strokeWidth={2.5} />
                WHATSAPP
              </motion.a>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 18, flexWrap: 'wrap', fontSize: 14, color: 'rgba(255,255,255,0.72)', letterSpacing: '0.8px' }}>
            <span>{CONTACT_EMAIL}</span>
            <span style={{ color: '#34E9E2' }}>+44 7707 179670</span>
          </div>

        </motion.div>
        </div>
      </motion.div>
    </SlideFrame>
  )
}

