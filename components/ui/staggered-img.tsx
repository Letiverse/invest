'use client'
import { useEffect, useState } from 'react'

interface StaggeredImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  /** Seconds to wait before this image starts fetching. Matches the slide's
   * existing reveal stagger so heavy image-grid slides don't fire every
   * request at once on mount — easing CPU/network pressure on weaker devices. */
  delay?: number
}

/**
 * Defers mounting (and therefore fetching) an <img> until `delay` has
 * elapsed. Pair its delay with the wrapping motion.div's reveal delay so the
 * fetch starts right as the image is about to animate in, instead of every
 * image on the slide fetching simultaneously at mount.
 */
export function StaggeredImg({ src, delay = 0, alt = '', loading, decoding, ...rest }: StaggeredImgProps) {
  const [ready, setReady] = useState(delay <= 0)

  useEffect(() => {
    if (delay <= 0) return
    const id = window.setTimeout(() => setReady(true), delay * 1000)
    return () => clearTimeout(id)
  }, [delay])

  if (!ready) return null

  return <img src={src} alt={alt} loading={loading ?? 'eager'} decoding={decoding ?? 'async'} {...rest} />
}
