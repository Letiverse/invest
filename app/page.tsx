import type { Metadata } from 'next'
import { InvestmentBenchmark } from '@/components/invest/InvestmentBenchmark'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Letiverse — The Digital Network for Real-World Venues',
  description: 'Explore the Letiverse investment story: an award-winning digital venue network built on long-term Host relationships, audience engagement and multiple commercial routes.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Letiverse',
    title: 'Letiverse — The Digital Network for Real-World Venues',
    description: '18 Hosts. 36,423 Tour views in 2026. Winner of Best Digital Twin 2026. See how the Letiverse network works.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Letiverse — The Digital Network for Real-World Venues',
    description: '18 Hosts. 36,423 Tour views in 2026. Winner of Best Digital Twin 2026.',
  },
}

export default function Home() {
  return <InvestmentBenchmark />
}
