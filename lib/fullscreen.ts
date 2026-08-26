type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null
  webkitExitFullscreen?: () => Promise<void> | void
}

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void
}

type OrientationLockValue = 'landscape' | 'landscape-primary'

type LockableScreenOrientation = ScreenOrientation & {
  lock?: (orientation: OrientationLockValue) => Promise<void>
  unlock?: () => void
}

export interface FullscreenOptions {
  lockLandscape?: boolean
}

export function getFullscreenElement(): Element | null {
  const doc = document as FullscreenDocument
  return document.fullscreenElement ?? doc.webkitFullscreenElement ?? null
}

export function isFullscreenSupported(): boolean {
  if (typeof document === 'undefined') return false
  const root = document.documentElement as FullscreenElement
  return typeof root.requestFullscreen === 'function' || typeof root.webkitRequestFullscreen === 'function'
}

export function isLandscapeLockSupported(): boolean {
  if (typeof screen === 'undefined') return false
  const orientation = screen.orientation as LockableScreenOrientation | undefined
  return typeof orientation?.lock === 'function'
}

export async function requestLandscapeLock() {
  const orientation = screen.orientation as LockableScreenOrientation | undefined
  if (typeof orientation?.lock !== 'function') {
    return // orientation lock not supported — skip silently
  }

  await orientation.lock('landscape')
}

export function unlockOrientation() {
  const orientation = screen.orientation as LockableScreenOrientation | undefined
  if (typeof orientation?.unlock === 'function') {
    orientation.unlock()
  }
}

async function tryLandscapeLock() {
  if (!isLandscapeLockSupported()) return
  try { await requestLandscapeLock() } catch { /* best-effort — orientation lock not mandatory */ }
}

export async function requestAppFullscreen(options: FullscreenOptions = {}) {
  const root = document.documentElement as FullscreenElement
  if (typeof root.requestFullscreen === 'function') {
    await root.requestFullscreen()
    if (options.lockLandscape) await tryLandscapeLock()
    return
  }
  if (typeof root.webkitRequestFullscreen === 'function') {
    await root.webkitRequestFullscreen()
    if (options.lockLandscape) await tryLandscapeLock()
    return
  }
  throw new Error('Fullscreen is not supported in this browser.')
}

export async function exitAppFullscreen() {
  const doc = document as FullscreenDocument
  unlockOrientation()
  if (typeof document.exitFullscreen === 'function') {
    await document.exitFullscreen()
    return
  }
  if (typeof doc.webkitExitFullscreen === 'function') {
    await doc.webkitExitFullscreen()
  }
}

export async function toggleAppFullscreen(options: FullscreenOptions = {}) {
  if (getFullscreenElement()) {
    await exitAppFullscreen()
  } else {
    await requestAppFullscreen(options)
  }
}
