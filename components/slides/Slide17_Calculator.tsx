'use client'
import { useState } from 'react'
import { motion } from 'motion/react'
import dynamic from 'next/dynamic'
import { SlideFrame } from '@/components/deck/SlideFrame'
import { DEAL, EXIT_SCENARIOS } from '@/lib/dealTerms'
import { blobUrl } from '@/lib/blob-urls'
import { DECK_EFFECTS } from '@/lib/effectFlags'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Aurora = dynamic<any>(() => import('@/components/Aurora') as Promise<any>, { ssr: false })

const MIN = DEAL.minInvestment       // £1,000
const MAX = 100_000                  // £100,000
const STEP = DEAL.sharePrice         // £50 increments = 1 share

function formatGBP(n: number) {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M`
  if (n >= 1_000)     return `£${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}K`
  return `£${n.toLocaleString('en-GB')}`
}

function formatMultiple(exitPerShare: number) {
  const m = exitPerShare / DEAL.sharePrice
  return `${m % 1 === 0 ? m : m.toFixed(1)}×`
}

interface ScenarioCardProps {
  key: string
  scenario: typeof EXIT_SCENARIOS.bear | typeof EXIT_SCENARIOS.base | typeof EXIT_SCENARIOS.bull
  investment: number
  index: number
}

function ScenarioCard({ scenario, investment, index }: Omit<ScenarioCardProps, 'key'>) {
  const exitValue = Math.round((investment / DEAL.sharePrice) * scenario.exitPerShare)
  const gain = exitValue - investment
  const gainPct = Math.round((gain / investment) * 100)
  const multiple = formatMultiple(scenario.exitPerShare)
  const isGain = gain >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.45, ease: 'easeOut' }}
      style={{
        flex: 1,
        borderRadius: 10,
        border: `1px solid ${scenario.color}44`,
        background: `linear-gradient(160deg, rgba(5,13,28,0.9) 0%, ${scenario.color}12 100%)`,
        padding: '26px 24px 22px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* glow corner accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${scenario.color}, transparent)`,
        opacity: 0.7,
      }} />

      <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, letterSpacing: '4px', color: scenario.color }}>
        {scenario.icon} {scenario.label}
      </p>

      <p style={{ margin: '0 0 16px', fontSize: 15, color: 'rgba(255,255,255,0.58)', letterSpacing: '1px' }}>
        {scenario.exitValuation} exit
      </p>

      <motion.p
        key={exitValue}
        initial={{ opacity: 0.5, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18 }}
        style={{ margin: '0 0 6px', fontSize: 46, fontWeight: 700, color: '#FFFFFF', lineHeight: 1, textShadow: `0 0 20px ${scenario.color}55` }}
      >
        {formatGBP(exitValue)}
      </motion.p>

      <p style={{ margin: '0 0 16px', fontSize: 16, color: scenario.color, fontWeight: 700 }}>
        {multiple} · {isGain ? '+' : ''}{gainPct}%
      </p>

      <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 12 }} />

      <p style={{ margin: 0, fontSize: 16, color: 'rgba(255,255,255,0.62)', lineHeight: 1.45 }}>
        {scenario.description}
      </p>
    </motion.div>
  )
}

export function Slide17_Calculator() {
  const [investment, setInvestment] = useState(10_000)
  const shares = investment / DEAL.sharePrice
  const sliderPct = ((investment - MIN) / (MAX - MIN)) * 100

  return (
    <SlideFrame>
      {/* Aurora animated background */}
      {DECK_EFFECTS.reactBitsBackgrounds && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <Aurora
            colorStops={['#34E9E2', '#050D1C', '#0A2A50']}
            amplitude={1.0}
            blend={0.4}
          />
        </div>
      )}

      {/* Dark overlay for readability */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
        background: 'rgba(5,13,28,0.70)',
        pointerEvents: 'none',
      }} />

      {/* Subtle scanline overlay */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 700, letterSpacing: '5px', color: '#34E9E2' }}
        >
          CHAPTER 05 · INVESTOR RETURNS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
          style={{ margin: '0 0 18px', fontSize: 60, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.5px', lineHeight: 1.05 }}
        >
          Investment Calculator
        </motion.h2>

        {/* Usage instructions */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22, duration: 0.4 }}
          style={{ margin: '0 0 16px', fontSize: 16, color: 'rgba(255,255,255,0.62)', letterSpacing: '1.5px', textAlign: 'center' }}
        >
          DRAG THE SLIDER OR USE − / + TO SEE YOUR PROJECTED RETURNS ACROSS THREE EXIT SCENARIOS
        </motion.p>

        {/* Slider card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          style={{
            width: '100%', maxWidth: 1120,
            borderRadius: 12,
            border: '1px solid rgba(52,233,226,0.22)',
            background: 'rgba(5,13,28,0.75)',
            backdropFilter: 'blur(16px)',
            padding: '24px 44px 22px',
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.60)', letterSpacing: '2px' }}>
              YOUR INVESTMENT
            </p>
            <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.55)', letterSpacing: '1px' }}>
              {shares.toLocaleString('en-GB')} shares at £{DEAL.sharePrice}/share
            </p>
          </div>

          <motion.p
            key={investment}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            style={{ margin: '0 0 20px', fontSize: 68, fontWeight: 700, color: '#34E9E2', letterSpacing: '-1px', textShadow: '0 0 28px rgba(52,233,226,0.45)', lineHeight: 1 }}
          >
            {`£${investment.toLocaleString('en-GB')}`}
          </motion.p>

          {/* Styled range slider with ±step buttons for touch/phone */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
            {/* Decrement button */}
            <button
              aria-label={`Decrease investment by £${STEP.toLocaleString('en-GB')}`}
              onClick={() => setInvestment(v => Math.max(MIN, v - STEP))}
              style={{
                flexShrink: 0,
                width: 44, height: 44,
                borderRadius: 8,
                border: '1px solid rgba(52,233,226,0.35)',
                background: 'rgba(52,233,226,0.08)',
                color: '#34E9E2',
                fontSize: 22,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                userSelect: 'none',
                touchAction: 'manipulation',
              }}
            >−</button>

            {/* Slider track + fill */}
            <div style={{ position: 'relative', flex: 1 }}>
              <div style={{
                position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                height: 4, borderRadius: 2,
                width: `${sliderPct}%`,
                background: 'linear-gradient(90deg, #34E9E2, #98F8F3)',
                pointerEvents: 'none', zIndex: 1,
              }} />
              <input
                type="range"
                min={MIN}
                max={MAX}
                step={STEP}
                value={investment}
                onChange={e => setInvestment(Number(e.target.value))}
                className="calc-slider"
                style={{
                  width: '100%',
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  height: 4,
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.12)',
                  outline: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 2,
                  touchAction: 'none',
                }}
              />
            </div>

            {/* Increment button */}
            <button
              aria-label={`Increase investment by £${STEP.toLocaleString('en-GB')}`}
              onClick={() => setInvestment(v => Math.min(MAX, v + STEP))}
              style={{
                flexShrink: 0,
                width: 44, height: 44,
                borderRadius: 8,
                border: '1px solid rgba(52,233,226,0.35)',
                background: 'rgba(52,233,226,0.08)',
                color: '#34E9E2',
                fontSize: 22,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                userSelect: 'none',
                touchAction: 'manipulation',
              }}
            >+</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)', letterSpacing: '2px' }}>£{MIN.toLocaleString('en-GB')} MIN</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)', letterSpacing: '2px' }}>£{MAX.toLocaleString('en-GB')} MAX</span>
          </div>
        </motion.div>

        {/* Scenario cards */}
        <div style={{ display: 'flex', gap: 16, width: '100%', maxWidth: 1120, marginBottom: 14 }}>
          {(Object.values(EXIT_SCENARIOS) as (typeof EXIT_SCENARIOS.bear)[]).map((scenario, i) => (
            <ScenarioCard
              key={scenario.label}
              scenario={scenario}
              investment={investment}
              index={i}
            />
          ))}
        </div>

        {/* Risk disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{
            width: '100%', maxWidth: 1120,
            borderRadius: 8,
            border: '1px solid rgba(239,68,68,0.25)',
            background: 'rgba(239,68,68,0.06)',
            padding: '10px 16px',
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
          }}
        >
          <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>⚠️</span>
           <p style={{ margin: 0, fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.55, letterSpacing: '0.2px' }}>
            <strong style={{ color: 'rgba(239,68,68,0.8)', letterSpacing: '1px' }}>RISK WARNING:</strong>{' '}
            This calculator is for <em>illustrative purposes only</em> and does not constitute financial advice.
            Scenarios assume no dilution, liquidation preferences, fees, or tax treatment.
            Actual returns will vary based on future funding rounds, exit timing, and company performance.
            Investing in early-stage companies carries significant risk — you may lose some or all of your capital.
            Past performance is not indicative of future results.
            Only invest what you can afford to lose. Letiverse AI Limited is an unregulated, high-risk investment.
          </p>
        </motion.div>
      </motion.div>

      <img src={blobUrl('/slides/shared/letiverse-logo.jpeg')} alt="Letiverse Logo" style={{ position: "absolute", left: 1800, top: 8, width: 110, height: 110, objectFit: "cover", filter: "drop-shadow(0 0 22.0px rgba(52,233,226,0.40))" }} />
    </SlideFrame>
  )
}
