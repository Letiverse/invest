'use client'
import { useEffect, useRef } from 'react'
import { useDeck } from '@/hooks/useDeck'
import { blobUrl } from '@/lib/blob-urls'

const PRELOAD_READY_EVENT = 'deck:preload-ready'
const PRECONNECT_ORIGINS = [
  'https://tjtvxp4xul5oynxz.public.blob.vercel-storage.com',
]

/** Core imagery needed for smooth first-impression progression.
 *  Keep this lean — only assets used on Slide 1 that block the welcome gate.
 *  Everything else is lazily preloaded via SLIDE_ASSETS. */
const BOOTSTRAP_ASSETS = [
  blobUrl('/slides/shared/letiverse-logo.jpeg'),
]

/** Local images indexed by slide number */
const SLIDE_ASSETS: Record<number, string[]> = {
  3:  [blobUrl('/slides/slide-03/spatial-comparison.jpg')],
  7:  [blobUrl('/slides/slide-06/market-size.png'), blobUrl('/slides/shared/letiverse-logo.jpeg')],
  8:  [blobUrl('/slides/slide-07/backwards-model.png')],
  11: [
    blobUrl('/slides/media/image12.png'),
    blobUrl('/slides/media/image13.png'),
    blobUrl('/slides/media/image14.png'),
    blobUrl('/slides/media/image15.png'),
    blobUrl('/slides/media/image16.png'),
    blobUrl('/slides/media/image17.png'),
  ],
  12: [
    blobUrl('/slides/media/image18.jpg'),
    blobUrl('/slides/media/image19.png'),
    blobUrl('/slides/media/image20.jpg'),
  ],
  13: [
    blobUrl('/slides/slide-11/phase1.jpg'),
    blobUrl('/slides/slide-11/phase2.jpg'),
  ],
  14: [
    blobUrl('/slides/media/image23.png'),
    blobUrl('/slides/media/image24.png'),
    blobUrl('/slides/media/image25.png'),
    blobUrl('/slides/media/image26.png'),
    blobUrl('/slides/media/image27.png'),
    blobUrl('/slides/media/image28.png'),
  ],
  16: [
    blobUrl('/slides/media/image29.png'),
    blobUrl('/slides/media/image30.png'),
    blobUrl('/slides/media/image31.png'),
    blobUrl('/slides/media/image32.jpeg'),
    blobUrl('/slides/media/image33.png'),
    blobUrl('/slides/media/image34.png'),
    blobUrl('/slides/media/image35.png'),
    blobUrl('/slides/media/image36.jpeg'),
    blobUrl('/slides/media/image37.png'),
    blobUrl('/slides/media/image38.png'),
    blobUrl('/slides/media/image39.png'),
    blobUrl('/slides/media/image40.png'),
    blobUrl('/slides/media/image41.png'),
    blobUrl('/slides/media/image42.png'),
  ],
  18: [blobUrl('/slides/slide-15/projections-chart.png')],
  19: [blobUrl('/slides/slide-16/financials.png')],
  21: [blobUrl('/slides/slide-17/risk-moats.png')],
}

/** Mux playback IDs for slides with a BgVideo background, indexed by slide number.
 *  Prefetching the HLS manifest ahead of arrival warms the connection/cache so
 *  playback can start immediately instead of only beginning the fetch on mount. */
const VIDEO_ASSETS: Record<number, string> = {
  1:  '01tA3S3V2ZHxqIDKaCs5IwgGuJ4oGa5I5b1iXG9VGUg8',
  2:  'Ua4LpwEvSQqE01qcphrIEp00Mn7nihKopkKWjWAFOZt300',
  3:  'Kw5yIeY8acLOmVtP00fNb7dPNHe01h02YE004PnyI8OT2fo',
  4:  'GC00xY5Mt01RKRuM0002rGiMkKtdMXOCn7tYXYnUo5PZaQc',
  7:  'PZXipz3P02ROgd62EQx02jjBConMMfhS7Pz593W9dNPvA',
  8:  'dhPDEe6tx7kr67AX7sH01js01Jmkkfabkb4Q6rkEBnO7Q',
  9:  '02TVW6e00k2c00qufHOSvUb01DkSQWfsuJMZB2hJ01zVwxZA',
  18: '7j7Ed74H88DAQ702XeJNUk101gV7lZGbokShUsmV02hqqo',
}

const prefetchedVideos = new Set<number>()

function prefetchVideo(slide: number) {
  const playbackId = VIDEO_ASSETS[slide]
  if (!playbackId || prefetchedVideos.has(slide)) return
  prefetchedVideos.add(slide)
  // Warms DNS/TLS + primes the HLS manifest in HTTP cache; the actual player
  // still does its own segment fetching once mounted.
  fetch(`https://stream.mux.com/${playbackId}.m3u8`, { mode: 'cors', credentials: 'omit' }).catch(() => {
    /* best-effort — playback still works if this fails */
  })
}

function preloadImages(urls: string[]) {
  urls.forEach(url => {
    const img = new window.Image()
    img.decoding = 'async'
    img.src = url
  })
}

function preloadImage(url: string) {
  return new Promise<void>(resolve => {
    const img = new window.Image()
    img.decoding = 'async'
    const done = () => resolve()
    img.onload = done
    img.onerror = done
    img.src = url
  })
}

function primeConnections() {
  PRECONNECT_ORIGINS.forEach(origin => {
    if (document.head.querySelector(`link[data-preconnect="${origin}"]`)) return
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = origin
    link.crossOrigin = 'anonymous'
    link.dataset.preconnect = origin
    document.head.appendChild(link)
  })
}

export function SlidePreloader() {
  const { currentSlide } = useDeck()
  const bootReadySent = useRef(false)

  useEffect(() => {
    let cancelled = false
    primeConnections()

    const dispatchReady = () => {
      if (cancelled || bootReadySent.current) return
      bootReadySent.current = true
      document.dispatchEvent(new CustomEvent(PRELOAD_READY_EVENT))
    }

    const failSafe = window.setTimeout(dispatchReady, 2000)

    Promise.all(BOOTSTRAP_ASSETS.map(asset => preloadImage(asset)))
      .then(dispatchReady)
      .catch(dispatchReady)

    return () => {
      cancelled = true
      clearTimeout(failSafe)
    }
  }, [])

  useEffect(() => {
    const toLoad = [currentSlide + 1, currentSlide + 2, currentSlide + 3]
    toLoad.forEach(slide => {
      const assets = SLIDE_ASSETS[slide]
      if (assets) preloadImages(assets)
    })
    // Only prefetch the very next slide's video — manifests are heavier than
    // images and we don't want to burn bandwidth on slides the viewer may skip.
    prefetchVideo(currentSlide + 1)
  }, [currentSlide])

  return null
}
