import type { AssetRecord } from '@/types/deck'

export const assetMap: Record<string, AssetRecord> = {
  'image3.jpeg': {
    semanticName: 'letiverse-logo',
    destinationPath: 'slides/shared/letiverse-logo.jpeg',
    slides: [1,2,3,4,5,6,7,9,10,11,12,13,15],
    tags: ['logo', 'brand', 'shared'],
    description: 'Letiverse logo — top-right on nearly every slide',
  },
  'image1.jpeg': {
    semanticName: 'hero-bg',
    destinationPath: 'slides/slide-01/hero-bg.jpeg',
    slides: [1],
    tags: ['background', 'photography', 'hero'],
    description: 'Professionals collaborating at a table (hero bg)',
  },
  'image2.png': {
    semanticName: 'hero-overlay',
    destinationPath: 'slides/slide-01/hero-overlay.png',
    slides: [1],
    tags: ['overlay', 'hero'],
    description: 'Dark overlay for hero slide',
  },
  'image4.png': {
    semanticName: 'ai-cloud',
    destinationPath: 'slides/slide-02/ai-cloud.png',
    slides: [2],
    tags: ['background', 'ai'],
    description: 'AI network cloud visualization',
  },
  'image5.png': {
    semanticName: 'web-vs-spatial',
    destinationPath: 'slides/slide-03/web-vs-spatial.png',
    slides: [3],
    tags: ['comparison', 'spatial', 'illustration'],
    description: 'Flat web vs spatial web comparison graphic',
  },
  'image6.jpg': {
    semanticName: 'best-twin',
    destinationPath: 'slides/slide-04/best-twin.jpg',
    slides: [4],
    tags: ['product', 'screenshot', 'ship-inn'],
    description: 'Ship Inn Letiverse Tour screenshot',
  },
  'image7.png': {
    semanticName: 'video-thumb',
    destinationPath: 'slides/slide-04/video-thumb.png',
    slides: [4],
    tags: ['video', 'thumbnail'],
    description: 'Video player thumbnail for slide 04',
  },
  'image8.png': {
    semanticName: 'charity-tour',
    destinationPath: 'slides/slide-05/charity-tour.png',
    slides: [5],
    tags: ['product', 'charity', 'my-shining-star'],
    description: 'My Shining Star charity tour screenshot',
  },
  'image9.png': {
    semanticName: 'market-size',
    destinationPath: 'slides/slide-06/market-size.png',
    slides: [6],
    tags: ['data', 'chart', 'market'],
    description: '3D web experience market size chart',
  },
  'image10.png': {
    semanticName: 'backwards-model',
    destinationPath: 'slides/slide-07/backwards-model.png',
    slides: [7],
    tags: ['business-model', 'illustration'],
    description: 'Backwards business model illustration',
  },
  'image11.jpg': {
    semanticName: 'benefits',
    destinationPath: 'slides/slide-08/benefits.jpg',
    slides: [8],
    tags: ['benefits', 'illustration'],
    description: 'Why not charge — benefits illustration',
  },
  ...Object.fromEntries(
    Array.from({ length: 6 }, (_, i) => [`image${12 + i}.png`, {
      semanticName: `revenue-0${i + 1}`,
      destinationPath: `slides/slide-09/revenue-0${i + 1}.png`,
      slides: [9],
      tags: ['revenue', 'sponsorship', 'data'],
      description: `Sponsorship revenue panel ${i + 1}`,
    }])
  ),
  'image18.jpg': { semanticName: 'holoconnects-01', destinationPath: 'slides/slide-10/holoconnects-01.jpg', slides: [10], tags: ['product', 'holographic', 'holoconnects'], description: 'Holoconnects holographic display 1' },
  'image19.png': { semanticName: 'holoconnects-02', destinationPath: 'slides/slide-10/holoconnects-02.png', slides: [10], tags: ['product', 'holographic', 'holoconnects'], description: 'Holoconnects holographic display 2' },
  'image20.jpg': { semanticName: 'holoconnects-03', destinationPath: 'slides/slide-10/holoconnects-03.jpg', slides: [10], tags: ['product', 'holographic', 'holoconnects'], description: 'Holoconnects holographic display 3' },
  'image21.jpg': { semanticName: 'phase1', destinationPath: 'slides/slide-11/phase1.jpg', slides: [11], tags: ['phases', 'sponsorship'], description: 'Phase 1: Sponsorship + Hardware' },
  'image22.jpg': { semanticName: 'phase2', destinationPath: 'slides/slide-11/phase2.jpg', slides: [11], tags: ['phases', 'ecommerce'], description: 'Phase 2: Transactions + Ecommerce' },
  ...Object.fromEntries(
    Array.from({ length: 6 }, (_, i) => [`image${23 + i}.png`, {
      semanticName: `ecomm-0${i + 1}`,
      destinationPath: `slides/slide-12/ecomm-0${i + 1}.png`,
      slides: [12],
      tags: ['ecommerce', 'transactions', 'illustration'],
      description: `Ecommerce phase visual ${i + 1}`,
    }])
  ),
  'image43.png': { semanticName: 'projections-chart', destinationPath: 'slides/slide-15/projections-chart.png', slides: [15], tags: ['data', 'chart', 'revenue', 'projections'], description: '3-year revenue projections chart' },
  'image44.png': { semanticName: 'financials', destinationPath: 'slides/slide-16/financials.png', slides: [16], tags: ['data', 'financials', 'chart'], description: 'Financial detail chart' },
  'image45.png': { semanticName: 'risk-moats', destinationPath: 'slides/slide-17/risk-moats.png', slides: [17], tags: ['risk', 'moats', 'strategy'], description: 'Risk mitigation and defensive moats' },
  'image46.png': { semanticName: 'cta-bg', destinationPath: 'slides/slide-18/cta-bg.png', slides: [19], tags: ['cta', 'background'], description: 'CTA / close background' },
}

export function getAssetsForSlide(slideNum: number): AssetRecord[] {
  return Object.values(assetMap).filter(a => a.slides.includes(slideNum))
}

export function getAssetsByTag(tag: string): AssetRecord[] {
  return Object.values(assetMap).filter(a => a.tags.includes(tag))
}
