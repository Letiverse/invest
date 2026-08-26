export interface PlatformInfo {
  deviceType: 'mobile' | 'tablet' | 'desktop'
  isTouchDevice: boolean
  connection: 'fast' | 'slow' | 'unknown'
  os: 'ios' | 'android' | 'macos' | 'windows' | 'other'
  isPortrait: boolean
  reducedMotion: boolean
}

export function detectPlatform(): PlatformInfo {
  if (typeof window === 'undefined') {
    return {
      deviceType: 'desktop',
      isTouchDevice: false,
      connection: 'unknown',
      os: 'other',
      isPortrait: false,
      reducedMotion: false,
    }
  }

  const ua = navigator.userAgent

  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  const isAndroid = /Android/.test(ua)
  const isWindows = /Windows/.test(ua)
  const isMac = /Mac/.test(ua) && !isIOS

  const w = window.innerWidth
  const h = window.innerHeight
  const isMobile = w < 768
  const isTablet = w >= 768 && w < 1200

  const isTouchDevice =
    navigator.maxTouchPoints > 0 || 'ontouchstart' in window

  // Network Information API — widely supported except Safari
  type NavConn = { effectiveType?: string; downlink?: number; saveData?: boolean }
  const conn =
    ((navigator as unknown as { connection?: NavConn }).connection) ??
    ((navigator as unknown as { mozConnection?: NavConn }).mozConnection) ??
    ((navigator as unknown as { webkitConnection?: NavConn }).webkitConnection)

  let connection: PlatformInfo['connection'] = 'unknown'
  if (conn) {
    const et = conn.effectiveType ?? ''
    const isMobileDevice = isMobile || isTablet
    // 2G/slow-2G always slow; 3G on mobile treated as slow; saveData flag respected
    if (
      et === 'slow-2g' ||
      et === '2g' ||
      (et === '3g' && isMobileDevice) ||
      conn.saveData === true
    ) {
      connection = 'slow'
    } else if (et || (conn.downlink !== undefined && conn.downlink >= 1)) {
      connection = 'fast'
    }
  }

  return {
    deviceType: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
    isTouchDevice,
    connection,
    os: isIOS ? 'ios' : isAndroid ? 'android' : isMac ? 'macos' : isWindows ? 'windows' : 'other',
    isPortrait: w < h,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  }
}
