'use client'
import Image from 'next/image'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { blobUrl } from '@/lib/blob-urls'
import type { ReactNode } from 'react'

/* ─────────────────────────────── types ──────────────────────────────── */

type LayoutMode = 'center' | 'full' | 'split' | 'cover' | 'data' | 'image'

interface SlideLayoutProps {
  children?: ReactNode
  className?: string
  bgImage?: string
  /** Suppress scrim — use when the bg image should show at full intensity */
  rawBg?: boolean
  mode?: LayoutMode
  slideNumber?: number
  /** Text shown in the bottom band (deal terms, note, etc.) */
  footerNote?: string
}

/* ─────────────────────── left cyan bar ─────────────────────────── */
/* This is the brand anchor on EVERY slide — a thin vertical cyan line */

function LeftBar() {
  return (
    <>
      {/* The bar itself */}
      <div
        className="absolute top-0 bottom-0 left-0 z-40 pointer-events-none"
        style={{
          width: 4,
          background: 'linear-gradient(to bottom, rgba(52,233,226,0.4) 0%, rgba(52,233,226,0.85) 20%, rgba(52,233,226,0.85) 80%, rgba(52,233,226,0.4) 100%)',
          boxShadow: '0 0 12px 2px rgba(52,233,226,0.35), 0 0 30px 4px rgba(52,233,226,0.12)',
        }}
      />
      {/* Travelling pulse — a small brighter dot that drifts up the bar */}
      <motion.div
        className="absolute left-0 z-41 pointer-events-none"
        style={{ width: 4, height: 80, background: 'linear-gradient(to bottom, transparent, rgba(52,233,226,0.9), transparent)' }}
        initial={{ top: '110%' }}
        animate={{ top: '-10%' }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
      />
    </>
  )
}

/* ─────────────────────── bottom band + hairline ─────────────────────── */

function BottomBand({ slideNumber, footerNote }: { slideNumber?: number; footerNote?: string }) {
  return (
    <>
      {/* Hairline — drawn from left on entry */}
      <motion.div
        className="absolute bottom-[88px] left-4 right-0 z-40 pointer-events-none"
        style={{ height: 1, background: 'linear-gradient(to right, rgba(52,233,226,0.7) 0%, rgba(52,233,226,0.3) 60%, transparent 100%)', transformOrigin: 'left' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Band */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-8"
        style={{ height: 88, background: 'rgba(5,13,28,0.92)', backdropFilter: 'blur(8px)' }}
      >
        {slideNumber && (
          <span className="font-mono text-[11px] text-[#34E9E2]/50 tracking-[0.25em] ml-4">
            {String(slideNumber).padStart(2, '0')} / 19
          </span>
        )}
        {footerNote && (
          <span className="text-[11px] text-white/30 tracking-[0.12em] uppercase font-light text-center flex-1 mx-8">
            {footerNote}
          </span>
        )}
        <span className="font-mono text-[10px] text-white/15 tracking-[0.2em]">LETIVERSE AI</span>
      </div>
    </>
  )
}

/* ───────────────────────────── main layout ──────────────────────────── */

export function SlideLayout({
  children,
  className,
  bgImage,
  rawBg = false,
  mode = 'full',
  slideNumber,
  footerNote,
}: SlideLayoutProps) {
  const contentPadding = mode === 'image' ? '' : 'pl-10 pr-12 pt-10 pb-[108px]'
  return (
    <div className={cn('relative w-full h-full text-white overflow-hidden select-none', className)}>

      {/* ── base colour ── */}
      <div className="absolute inset-0 bg-[#050D1C]" />

      {/* ── background image ── */}
      {bgImage && (
        <>
          <Image
            src={bgImage} alt="" fill
            className="object-cover"
            style={{ opacity: rawBg ? 1 : 0.92 }}
            priority
          />
          {!rawBg && (
            <>
              {/* Scrim — faithful to original 55-70% opacity over photos */}
              <div className="absolute inset-0" style={{ background: 'rgba(5,13,28,0.62)' }} />
              {/* Directional darkening: left edge darker (left bar area) + bottom darker (band area) */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to right, rgba(5,13,28,0.6) 0%, transparent 15%), linear-gradient(to top, rgba(5,13,28,0.8) 0%, transparent 25%)',
              }} />
            </>
          )}
        </>
      )}

      {/* ── scan-line texture (ultra-subtle) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.005) 2px, rgba(255,255,255,0.005) 3px)',
          backgroundSize: '100% 3px',
        }}
      />

      {/* ── logo — top-right on every slide ── */}
      <motion.div
        className="absolute z-50 pointer-events-none"
        style={{ top: 18, right: 24 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        <Image
          src={blobUrl('/slides/shared/letiverse-logo.jpeg')}
          alt="Letiverse AI"
          width={90}
          height={90}
          className="object-contain rounded-sm"
          style={{
            height: 72, width: 72,
            filter: 'drop-shadow(0 0 10px rgba(52,233,226,0.5))',
          }}
        />
      </motion.div>

      {/* ── left cyan brand bar ── */}
      <LeftBar />

      {/* ── bottom band + hairline ── */}
      <BottomBand slideNumber={slideNumber} footerNote={footerNote} />

      {/* ── content layer ── */}
      <div className={cn(
        'relative z-20 h-full w-full',
        contentPadding,
        mode === 'center' && 'flex items-center justify-center',
        mode === 'full'   && 'flex flex-col',
        mode === 'split'  && 'flex flex-row gap-0',
        mode === 'cover'  && 'flex flex-col items-start justify-end',
        mode === 'data'   && 'flex flex-col',
        mode === 'image'  && 'flex items-center justify-center',
      )}>
        {children}
      </div>
    </div>
  )
}

/* ─────────────────────── eyebrow text ──────────────────────────────── */
/* 14pt cyan, 500 letter-spacing, ALL CAPS — appears on most slides */

export function Eyebrow({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'text-[#34E9E2] font-bold uppercase tracking-[0.35em]',
        'text-[13px] leading-none mb-3',
        className,
      )}
    >
      {children}
    </motion.p>
  )
}

/* ─────────────────────── headline ──────────────────────────────────── */

export function Headline({
  children,
  delay = 0.1,
  size = 'lg',
  className,
}: {
  children: ReactNode
  delay?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}) {
  const sizes = {
    sm:  'text-[clamp(1.6rem,3vw,2.5rem)]',
    md:  'text-[clamp(2rem,4vw,3.5rem)]',
    lg:  'text-[clamp(2.4rem,5vw,4.5rem)]',
    xl:  'text-[clamp(3rem,7vw,6.5rem)]',
  }
  return (
    <motion.h2
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 70, damping: 18 }}
      className={cn(
        'font-bold leading-[1.08] tracking-[-0.025em] text-white',
        sizes[size],
        className,
      )}
    >
      {children}
    </motion.h2>
  )
}

/* ─────────────────────── halo glow (behind headline text) ───────────── */

export function Halo({ className }: { className?: string }) {
  return (
    <div
      className={cn('absolute pointer-events-none z-0', className)}
      style={{
        width: '55vw', height: '30vh',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(52,233,226,0.07) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

/* ─────────────────────── cyan accent text ───────────────────────────── */

export function Cyan({ children, glow = false }: { children: ReactNode; glow?: boolean }) {
  return (
    <span
      className="text-[#34E9E2]"
      style={glow ? { textShadow: '0 0 20px rgba(52,233,226,0.6), 0 0 40px rgba(52,233,226,0.25)' } : undefined}
    >
      {children}
    </span>
  )
}

/* ─────────────────────── animated word reveal ───────────────────────── */

export function AnimatedWords({
  children,
  delay = 0,
  className,
  wordClass,
}: {
  children: string
  delay?: number
  className?: string
  wordClass?: string
}) {
  const words = children.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.06, type: 'spring', stiffness: 100, damping: 20 }}
          className={cn('inline-block mr-[0.22em]', wordClass)}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

/* ─────────────────────────── glass card ────────────────────────────── */

export function GlassCard({
  children,
  className,
  glow = false,
  delay = 0,
  fromLeft = false,
}: {
  children: ReactNode
  className?: string
  glow?: boolean
  delay?: number
  fromLeft?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -60 : 0, y: fromLeft ? 0 : 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 70, damping: 18 }}
      className={cn(
        'rounded-xl p-5',
        'bg-gradient-to-br from-white/[0.06] to-white/[0.02]',
        'backdrop-blur-sm',
        'border border-white/[0.08]',
        glow && 'border-[#34E9E2]/25 shadow-[0_0_24px_rgba(52,233,226,0.08)]',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}

/* ──────────────────────── stat display ─────────────────────────────── */

export function Stat({
  value,
  label,
  delay = 0,
  cyan = true,
  size = 'lg',
}: {
  value: string
  label: string
  delay?: number
  cyan?: boolean
  size?: 'md' | 'lg' | 'xl'
}) {
  const sizes = {
    md:  'text-[clamp(1.8rem,3.5vw,3rem)]',
    lg:  'text-[clamp(2.4rem,4.5vw,4rem)]',
    xl:  'text-[clamp(3rem,5.5vw,5rem)]',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 75, damping: 18 }}
      className="flex flex-col gap-1"
    >
      <span className={cn('font-bold leading-none tracking-tight', sizes[size], cyan ? 'text-[#34E9E2]' : 'text-white')}>
        {value}
      </span>
      <span className="text-[11px] text-white/40 font-medium tracking-[0.18em] uppercase">{label}</span>
    </motion.div>
  )
}

/* ─────────────────────────── cyan badge ────────────────────────────── */

export function CyanBadge({ children, pulse = false }: { children: ReactNode; pulse?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#34E9E2]/35 bg-[#34E9E2]/8 text-[#34E9E2] text-[11px] font-mono uppercase tracking-[0.2em]">
      {pulse && <span className="w-1.5 h-1.5 rounded-full bg-[#34E9E2] animate-pulse" />}
      {children}
    </span>
  )
}

/* ──────────────────────────── hairline divider ──────────────────────── */

export function SlashDivider({ delay = 0, className }: { delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: 'left' }}
      className={cn('h-px w-full bg-gradient-to-r from-[#34E9E2]/45 via-white/8 to-transparent', className)}
    />
  )
}

/* ─────────────── backward-compat aliases ───────────────────────────── */

export const DisplayStat = Stat

export function SlideHeadline({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <Headline>{title}</Headline>
      {subtitle && <p className="mt-3 text-lg text-[#34E9E2]">{subtitle}</p>}
    </div>
  )
}

export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-4 rounded-xl border border-[#34E9E2]/20 bg-[#34E9E2]/5 flex flex-col gap-1">
      <div className="text-2xl font-bold text-[#34E9E2]">{value}</div>
      <div className="text-xs text-white/50 leading-tight">{label}</div>
    </div>
  )
}
