'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { RotateCcw } from 'lucide-react'
import { useDeckViewport } from '@/hooks/useDeckViewport'
import { requestAppFullscreen } from '@/lib/fullscreen'

export function PortraitPrompt() {
  const viewport = useDeckViewport()
  const [dismissed, setDismissed] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const visible = viewport.isMobileDevice && viewport.isPortrait && (viewport.isPhone || viewport.isTablet) && !dismissed
  const deviceLabel = viewport.isTablet ? 'tablet' : 'phone'

  const openLandscapeView = async () => {
    try {
      await requestAppFullscreen({ lockLandscape: true })
      setMessage('Landscape view requested. If your browser keeps this portrait, rotate the device to continue.')
    } catch (error) {
      console.warn('Landscape orientation lock was blocked.', error)
      setMessage('This browser will not allow automatic landscape lock. Please rotate the device to continue.')
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // Use tween so the exit animation completes in a fixed, predictable time (no spring overshoot)
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed inset-0 z-[500] flex items-center justify-center bg-[#050D1C]/95 px-6 text-center backdrop-blur-md"
          data-testid="portrait-prompt"
        >
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="max-w-[340px] rounded-lg border border-[#34E9E2]/55 bg-[#07162B]/92 p-6 shadow-[0_0_42px_rgba(52,233,226,0.20)]"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#34E9E2]/55 text-[#34E9E2]">
              <RotateCcw size={26} />
            </div>
            <p className="mb-2 text-[11px] font-bold tracking-[0.28em] text-[#34E9E2]">
              LANDSCAPE REQUIRED
            </p>
            <h2 className="mb-3 text-2xl font-bold leading-tight text-white">
              Rotate your {deviceLabel} for the investor deck
            </h2>
            <p className="mb-5 text-sm leading-6 text-white/68">
              This deck is built as a cinematic 16:9 presentation. On phones and tablets it uses landscape snap mode for maximum readability.
            </p>
            {message && (
              <p className="mb-4 rounded-md border border-[#34E9E2]/35 bg-[#34E9E2]/8 px-3 py-2 text-xs leading-5 text-white/70">
                {message}
              </p>
            )}
            <button
              type="button"
              onClick={openLandscapeView}
              className="w-full rounded-md border border-[#34E9E2]/65 bg-[#34E9E2]/12 px-4 py-3 text-sm font-bold tracking-[0.16em] text-[#9EF6F2]"
            >
              OPEN LANDSCAPE VIEW
            </button>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="mt-3 w-full rounded-md px-4 py-2 text-xs font-bold tracking-[0.16em] text-white/45"
            >
              CONTINUE ANYWAY
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
