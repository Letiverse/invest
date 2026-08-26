import { NextResponse } from 'next/server'
import { getReleaseVersion } from '@/lib/release'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, max-age=0, must-revalidate',
  'CDN-Cache-Control': 'no-store',
  'Vercel-CDN-Cache-Control': 'no-store',
}

export function GET() {
  return NextResponse.json(
    { version: getReleaseVersion() },
    { headers: NO_STORE_HEADERS },
  )
}
