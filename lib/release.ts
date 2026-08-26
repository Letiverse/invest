const LOCAL_RELEASE_VERSION = 'local-dev'

function getVercelReleaseVersion() {
  const parts = [
    process.env.VERCEL_GIT_COMMIT_SHA,
    process.env.VERCEL_DEPLOYMENT_ID,
    process.env.VERCEL_URL,
  ].filter(Boolean)

  return parts.length > 0 ? parts.join(':') : undefined
}

export function getReleaseVersion() {
  return (
    process.env.NEXT_PUBLIC_RELEASE_VERSION ||
    getVercelReleaseVersion() ||
    LOCAL_RELEASE_VERSION
  )
}
