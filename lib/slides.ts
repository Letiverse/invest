import type { SlideConfig } from '@/types/deck'

export const SLIDES: SlideConfig[] = [
  {
    id: 1, slug: 'hero',
    title: 'Letiverse AI',
    subtitle: 'Investment Opportunity',
    axis: 'z', direction: 1,
    cameraPosition: [0, 0, 5], cameraTarget: [0, 0, 0],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: ['slides/slide-01/hero-bg.jpeg', 'slides/slide-01/hero-overlay.png', 'slides/shared/letiverse-logo.jpeg'],
    tags: ['hero', 'title', 'deal-terms', 'spline'],

  },
  {
    id: 2, slug: 'ai-shift',
    title: 'AI is here to stay',
    axis: 'z', direction: 1,
    cameraPosition: [0, 0, 0], cameraTarget: [0, 0, -5],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: ['slides/slide-02/ai-cloud.png', 'slides/shared/letiverse-logo.jpeg'],
    tags: ['market', 'ai', 'stats', 'data'],

  },
  {
    id: 3, slug: 'spatial-web',
    title: 'The web is flat.',
    subtitle: 'The world isn\'t.',
    axis: 'z', direction: 1,
    cameraPosition: [-2, 0, 0], cameraTarget: [0, 0, -5],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: ['slides/slide-03/spatial-comparison.jpg', 'slides/shared/letiverse-logo.jpeg'],
    tags: ['spatial-web', 'vision', 'product', 'illustration'],

  },
  {
    id: 4, slug: 'best-twin',
    // GOVERNANCE-EXEMPTION: "Digital Twin" is the verbatim legal name of an external
    // third-party industry award. Strictly quoting the award title. Exemption confirmed
    // by project owner — see PR #35 comments.
    title: 'Best Digital Twin in the World 2026',
    axis: 'y', direction: 1,
    cameraPosition: [-2, -2, 0], cameraTarget: [0, 0, -5],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: ['slides/slide-04/best-twin.jpg', 'slides/shared/letiverse-logo.jpeg'],
    tags: ['product', 'award', 'ship-inn'],
  },
  {
    id: 5, slug: 'charity-tour',
    title: 'My Shining Star',
    subtitle: 'Charity AI Tour',
    axis: 'y', direction: 1,
    cameraPosition: [2, -2, 0], cameraTarget: [0, 0, -5],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: ['slides/slide-05/charity-tour.png', 'slides/shared/letiverse-logo.jpeg'],
    tags: ['product', 'charity', 'my-shining-star'],
  },

  // ── Chapter 02 interstitial ──────────────────────────────────────────────
  {
    id: 6, slug: 'chapter-market',
    title: 'THE MARKET.',
    subtitle: 'CHAPTER 02 · OPPORTUNITY',
    axis: 'z', direction: 1,
    cameraPosition: [0, 0, 5], cameraTarget: [0, 0, 0],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: [],
    tags: ['chapter'],
  },

  {
    id: 7, slug: 'market-size',
    title: 'We are at the start of the Growth Era',
    axis: 'z', direction: 1,
    cameraPosition: [0, 0, -2], cameraTarget: [0, 0, -7],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: ['slides/slide-06/market-size.png'],
    tags: ['market', 'data', 'chart', 'opportunity'],
  },
  {
    id: 8, slug: 'backwards-model',
    title: 'The Backwards Business Model',
    axis: 'x', direction: 1,
    cameraPosition: [4, 0, -2], cameraTarget: [0, 0, -5],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: ['slides/slide-07/backwards-model.png', 'slides/shared/letiverse-logo.jpeg'],
    tags: ['business-model', 'strategy', 'moat'],
  },
  {
    id: 9, slug: 'why-not-charge',
    title: 'Why Not Charge?',
    axis: 'x', direction: 1,
    cameraPosition: [6, 0, -2], cameraTarget: [2, 0, -5],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: ['slides/slide-08/benefits.jpg', 'slides/shared/letiverse-logo.jpeg'],
    tags: ['business-model', 'strategy', 'benefits'],
  },

  // ── Chapter 03 interstitial ──────────────────────────────────────────────
  {
    id: 10, slug: 'chapter-money',
    title: 'THE MONEY.',
    subtitle: 'CHAPTER 03 · REVENUE MODEL',
    axis: 'z', direction: 1,
    cameraPosition: [0, 0, 5], cameraTarget: [0, 0, 0],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: [],
    tags: ['chapter'],
  },

  {
    id: 11, slug: 'revenue-1',
    title: 'Revenue Model 1',
    subtitle: '50/50 Sponsorship Split',
    axis: 'x', direction: 1,
    cameraPosition: [8, 0, -2], cameraTarget: [4, 0, -5],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: Array.from({ length: 6 }, (_, i) => `slides/slide-09/revenue-0${i + 1}.png`).concat('slides/shared/letiverse-logo.jpeg'),
    tags: ['revenue', 'sponsorship', 'business-model'],
  },
  {
    id: 12, slug: 'holoconnects',
    title: 'Revenue Model 2',
    subtitle: 'UK Exclusive Holo Connects Technology',
    axis: 'x', direction: 1,
    cameraPosition: [10, 0, -2], cameraTarget: [6, 0, -5],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: ['slides/slide-10/holoconnects-01.jpg', 'slides/slide-10/holoconnects-02.png', 'slides/slide-10/holoconnects-03.jpg', 'slides/shared/letiverse-logo.jpeg'],
    tags: ['revenue', 'holographic', 'hardware', 'holoconnects'],
  },
  {
    id: 13, slug: 'phases',
    title: 'Phase 1 → Phase 2',
    axis: 'x', direction: 1,
    cameraPosition: [4, 0, -4], cameraTarget: [2, 0, -8],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: ['slides/slide-11/phase1.jpg', 'slides/slide-11/phase2.jpg', 'slides/shared/letiverse-logo.jpeg'],
    tags: ['phases', 'roadmap', 'strategy'],
  },
  {
    id: 14, slug: 'ecommerce',
    title: 'The Ecommerce Phase',
    axis: 'z', direction: 1,
    cameraPosition: [0, 0, -5], cameraTarget: [0, 0, -10],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: Array.from({ length: 6 }, (_, i) => `slides/slide-12/ecomm-0${i + 1}.png`),
    tags: ['ecommerce', 'transactions', 'phase-2', 'product'],
  },

  // ── Chapter 04 interstitial ──────────────────────────────────────────────
  {
    id: 15, slug: 'chapter-proof',
    title: 'THE PROOF.',
    subtitle: 'CHAPTER 04 · EVIDENCE',
    axis: 'z', direction: 1,
    cameraPosition: [0, 0, 5], cameraTarget: [0, 0, 0],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: [],
    tags: ['chapter'],
  },

  {
    id: 16, slug: 'hosts',
    title: '14 Confirmed Hosts',
    axis: 'z', direction: 1,
    cameraPosition: [0, 0, -7], cameraTarget: [0, 0, -12],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: ['slides/slide-13/bradford-bulls.png', 'slides/slide-13/ship-inn.png', 'slides/shared/letiverse-logo.jpeg'],
    tags: ['hosts', 'partnerships', 'traction', 'social-proof'],
  },
  {
    id: 17, slug: 'emv',
    title: 'Earned Media Value',
    subtitle: '£1,262,141 Total Portfolio EMV',
    axis: 'z', direction: 1,
    cameraPosition: [0, 0, -9], cameraTarget: [0, 0, -14],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: ['slides/shared/letiverse-logo.jpeg'],
    tags: ['data', 'emv', 'financials', 'bradford-bulls'],
  },
  {
    id: 18, slug: 'projections',
    title: '3-Year Revenue Projections',
    axis: 'z', direction: 1,
    cameraPosition: [0, 2, -9], cameraTarget: [0, 0, -14],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: ['slides/slide-15/projections-chart.png', 'slides/shared/letiverse-logo.jpeg'],
    tags: ['data', 'projections', 'revenue', 'financials'],
  },
  {
    id: 19, slug: 'financials',
    title: 'Financial Overview',
    axis: 'zy', direction: 1,
    cameraPosition: [0, 4, -8], cameraTarget: [0, 2, -12],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: ['slides/slide-16/financials.png', 'slides/shared/letiverse-logo.jpeg'],
    tags: ['data', 'financials', 'chart'],
  },
  {
    id: 20, slug: 'calculator',
    title: 'Investment Calculator',
    subtitle: 'Illustrative Return Scenarios',
    axis: 'zy', direction: 1,
    cameraPosition: [0, 4, -7], cameraTarget: [0, 2, -11],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: ['slides/shared/letiverse-logo.jpeg'],
    tags: ['financials', 'calculator', 'returns', 'investor'],
  },
  {
    id: 21, slug: 'risk-moats',
    title: 'Risk Mitigation & Defensive Moats',
    axis: 'zy', direction: 1,
    cameraPosition: [0, 5, -7], cameraTarget: [0, 3, -11],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: ['slides/slide-17/risk-moats.png', 'slides/shared/letiverse-logo.jpeg'],
    tags: ['risk', 'moats', 'strategy', 'defensibility'],
  },
  {
    id: 22, slug: 'cta',
    title: 'Join the Letiverse',
    subtitle: 'Invest Now',
    axis: 'zy', direction: 1,
    cameraPosition: [0, 6, -6], cameraTarget: [0, 3, -10],
    bgColor: '#050D1C', accentColor: '#34E9E2',
    assets: [],
    tags: ['cta', 'invest', 'close'],
  },
]

export const TOTAL_SLIDES = SLIDES.length

export function getSlide(id: number): SlideConfig | undefined {
  return SLIDES.find(s => s.id === id)
}

export function getSlideBySlug(slug: string): SlideConfig | undefined {
  return SLIDES.find(s => s.slug === slug)
}
