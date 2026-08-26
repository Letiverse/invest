'use client'
import { useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'
import type { MediaConfig } from '@/types/deck'

interface MediaPlayerProps {
  media: MediaConfig
}

export function MediaPlayer({ media }: MediaPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else          { v.pause(); setPlaying(false) }
  }

  const onTimeUpdate = () => {
    const v = videoRef.current
    if (!v || !v.duration) return
    setProgress((v.currentTime / v.duration) * 100)
  }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-cyan-400/20 group bg-black">
      <video
        ref={videoRef}
        src={media.src}
        poster={media.thumbnail}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setPlaying(false)}
        className="w-full h-full object-cover"
        playsInline
      />

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
        <div
          className="h-full bg-cyan-400 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
        <button
          onClick={toggle}
          className="w-14 h-14 rounded-full bg-cyan-400/90 flex items-center justify-center text-[#050D1C] hover:scale-105 transition-transform"
        >
          {playing ? <Pause size={22} /> : <Play size={22} className="ml-1" />}
        </button>
      </div>

      {/* Click to play when not playing */}
      {!playing && (
        <button
          onClick={toggle}
          className="absolute inset-0 flex items-center justify-center"
          aria-label="Play video"
        >
          <div className="w-16 h-16 rounded-full bg-cyan-400/80 flex items-center justify-center">
            <Play size={26} className="ml-1 text-[#050D1C]" />
          </div>
        </button>
      )}
    </div>
  )
}
