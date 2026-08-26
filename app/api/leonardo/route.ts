import { NextRequest, NextResponse } from 'next/server'

/**
 * Leonardo AI webhook endpoint.
 * Leonardo POSTs here when an async generation completes.
 * Configured at: https://app.leonardo.ai → Settings → Webhooks
 * URL: https://investment-silk.vercel.app/api/leonardo
 *
 * Auth: expects Bearer token in Authorization header matching LEONARDO_WEBHOOK_SECRET env var.
 * If the env var is not set, auth is skipped (dev mode).
 */
export async function POST(req: NextRequest) {
  const secret = process.env.LEONARDO_WEBHOOK_SECRET
  if (secret) {
    const auth = req.headers.get('authorization')
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    const payload = await req.json()

    const type = payload?.type ?? 'unknown'
    const genId = payload?.data?.object?.id ?? payload?.data?.generation_id ?? 'unknown'
    const images: Array<{ url: string; id: string }> = payload?.data?.object?.images ?? []
    const status = payload?.data?.object?.status ?? 'unknown'

    // Log to Vercel function logs (visible in Vercel dashboard → Functions tab)
    console.log('[Leonardo webhook]', JSON.stringify({ type, genId, status, imageCount: images.length, imageUrls: images.map(i => i.url) }))

    return NextResponse.json({ received: true, type, genId, status, imageCount: images.length }, { status: 200 })
  } catch (err) {
    console.error('[Leonardo webhook] Parse error:', err)
    return NextResponse.json({ received: true }, { status: 200 }) // always 200 so Leonardo stops retrying
  }
}

// Leonardo sends a GET to verify the endpoint during setup
export async function GET() {
  return NextResponse.json({ ok: true, service: 'Letiverse Investment Deck — Leonardo webhook' }, { status: 200 })
}
