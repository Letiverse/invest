import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  { key: 'X-DNS-Prefetch-Control',   value: 'on' },
  { key: 'X-Content-Type-Options',   value: 'nosniff' },
  { key: 'X-Frame-Options',          value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',       value: 'camera=(), microphone=(), geolocation=()' },
  // HSTS: enforce HTTPS for 1 year, include subdomains + preload. Essential for a financial pitch deck.
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  // TODO: add CSP after launch — the enforcing policy broke Mux HLS.js blob
  // workers which crashed the entire React tree (no nav, no video, no narration).

];

const NO_STORE_HEADERS = [
  { key: 'Cache-Control', value: 'no-store, max-age=0, must-revalidate' },
  { key: 'CDN-Cache-Control', value: 'no-store' },
  { key: 'Vercel-CDN-Cache-Control', value: 'no-store' },
];

const REVALIDATE_STATIC_HEADERS = [
  { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
];

const nextConfig: NextConfig = {
  experimental: {
    // Tree-shake large packages to smaller per-page chunks
    optimizePackageImports: [
      'motion/react',
      'framer-motion',
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-slot',
      'three',
    ],
  },
  images: {
    remotePatterns: [
      // Vercel Blob storage (OG images, slide assets)
      { protocol: 'https', hostname: 'tjtvxp4xul5oynxz.public.blob.vercel-storage.com' },
      // Mux video thumbnails
      { protocol: 'https', hostname: 'image.mux.com' },
      { protocol: 'https', hostname: 'stream.mux.com' },
    ],
    // Serve modern formats for everything that goes through next/image
    formats: ['image/avif', 'image/webp'],
    // Longer cache for optimised images (7 days)
    minimumCacheTTL: 604800,
  },

  async headers() {
    return [
      // Security headers on every route
      {
        source: '/(.*)',
        headers: SECURITY_HEADERS,
      },
      // App shell routes must always revalidate so users do not stay on an old
      // HTML/client bundle after a Vercel release.
      {
        source: '/',
        headers: NO_STORE_HEADERS,
      },
      {
        source: '/mobile',
        headers: NO_STORE_HEADERS,
      },
      // Per-URL desktop slide pages — must revalidate on release.
      {
        source: '/:slide(\\d{1,2})',
        headers: NO_STORE_HEADERS,
      },
      {
        source: '/api/release',
        headers: NO_STORE_HEADERS,
      },

      // Next.js content-hashed static assets → immutable forever
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Audio narration files use stable names, so force revalidation on each
      // release-sensitive request. Low traffic makes this safer than SWR staleness.
      {
        source: '/audio/:path*',
        headers: REVALIDATE_STATIC_HEADERS,
      },
      // Other public static assets (fonts, icons, images)
      {
        source: '/(.*\\.(?:woff2?|ttf|otf|ico|svg|png|jpg|jpeg|webp|gif|avif))',
        headers: REVALIDATE_STATIC_HEADERS,
      },
      // Slide media uses stable filenames (must come after the general
      // file-extension rule so it wins for /slides/* paths).
      {
        source: '/slides/:path*',
        headers: REVALIDATE_STATIC_HEADERS,
      },
    ];
  },
};

export default nextConfig;
