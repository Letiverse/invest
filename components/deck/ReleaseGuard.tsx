'use client'

import { useEffect } from 'react'

const RELEASE_STORAGE_KEY = 'letiv-release-version'
const RELEASE_CHECK_INTERVAL_MS = 60_000
const RELEASE_RELOAD_ATTEMPT_PREFIX = 'letiv-release-reload-attempts:'
const MAX_RELEASE_RELOADS_PER_TARGET = 1

interface ReleaseGuardProps {
  currentRelease: string
}

export function ReleaseGuard({ currentRelease }: ReleaseGuardProps) {
  useEffect(() => {
    if (!currentRelease) return

    let cancelled = false
    let reloadScheduled = false

    const getReloadAttemptKey = (targetRelease: string) =>
      `${RELEASE_RELOAD_ATTEMPT_PREFIX}${targetRelease}`

    const persistCurrentRelease = () => {
      try {
        localStorage.setItem(RELEASE_STORAGE_KEY, currentRelease)
      } catch (error) {
        console.warn('[release] Could not persist release version.', error)
      }
    }

    const getReloadAttempts = (targetRelease: string) => {
      try {
        return Number(sessionStorage.getItem(getReloadAttemptKey(targetRelease)) ?? '0')
      } catch (error) {
        console.warn('[release] Could not read reload attempts.', error)
        return 0
      }
    }

    const persistReloadAttempt = (targetRelease: string, attempts: number) => {
      try {
        sessionStorage.setItem(getReloadAttemptKey(targetRelease), String(attempts))
        sessionStorage.setItem('letiv-release-reloaded-from', currentRelease)
      } catch (error) {
        console.warn('[release] Could not persist reload marker.', error)
      }
    }

    const checkForFreshRelease = async () => {
      try {
        const response = await fetch(`/api/release?t=${Date.now()}`, {
          cache: 'no-store',
          headers: { Accept: 'application/json' },
        })

        if (!response.ok) {
          console.warn('[release] Version check failed.', response.status)
          return
        }

        const payload = await response.json() as { version?: unknown }
        const latestRelease = payload.version

        if (cancelled) return

        if (typeof latestRelease !== 'string' || latestRelease.length === 0) {
          console.warn('[release] Version check returned an invalid payload.', payload)
          return
        }

        if (latestRelease !== currentRelease) {
          if (reloadScheduled) return

          const attempts = getReloadAttempts(latestRelease)

          if (attempts >= MAX_RELEASE_RELOADS_PER_TARGET) {
            console.warn('[release] New release is still not active after reload.', {
              currentRelease,
              latestRelease,
            })
            return
          }

          reloadScheduled = true
          persistReloadAttempt(latestRelease, attempts + 1)
          window.location.reload()
          return
        }

        try {
          sessionStorage.removeItem(getReloadAttemptKey(latestRelease))
        } catch (error) {
          console.warn('[release] Could not clear reload attempts.', error)
        }
        persistCurrentRelease()
      } catch (error) {
        console.warn('[release] Could not check release version.', error)
      }
    }

    persistCurrentRelease()
    void checkForFreshRelease()

    const interval = window.setInterval(() => {
      void checkForFreshRelease()
    }, RELEASE_CHECK_INTERVAL_MS)
    const onFocus = () => void checkForFreshRelease()
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') void checkForFreshRelease()
    }

    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelled = true
      window.clearInterval(interval)
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [currentRelease])

  return null
}
