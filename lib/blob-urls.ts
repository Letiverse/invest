import blobMap from '../blob_url_mapping.json'

const map = blobMap as Record<string, string>

/**
 * Resolves a local asset path to its Vercel Blob CDN URL.
 * Falls back to the original path if no mapping exists (e.g. PNG files served locally).
 */
export function blobUrl(localPath: string): string {
  const key = localPath.startsWith('/') ? localPath : `/${localPath}`
  return map[key] ?? localPath
}
