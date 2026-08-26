import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SLIDES, TOTAL_SLIDES } from '@/lib/slides'
import { SITE_URL } from '@/lib/site'
import { MobileSlidePageWrapper } from '@/components/deck/MobileSlidePageWrapper'

const OG_IMAGE = 'https://tjtvxp4xul5oynxz.public.blob.vercel-storage.com/gemini-2.5-flash-image_Add_Text_in_Letiverse_Style_and_theme_Across_Middle_Of_Frame_Saying_Letiverse-1.jpg'

export function generateStaticParams() {
  return Array.from({ length: TOTAL_SLIDES }, (_, i) => ({ slide: String(i + 1) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slide: string }>
}): Promise<Metadata> {
  const { slide } = await params
  const slideNum = parseInt(slide, 10)
  // Strict: reject '1foo', floats, etc. — only clean integer strings are valid.
  if (isNaN(slideNum) || String(slideNum) !== slide || slideNum < 1 || slideNum > TOTAL_SLIDES) {
    return { title: 'Not Found | Letiverse AI Investment' }
  }
  const slideConfig = SLIDES.find(s => s.id === slideNum)

  const slideTitle = slideConfig?.title ?? 'Letiverse AI'
  const slideSubtitle = slideConfig?.subtitle ?? ''
  const titleParts = [slideTitle, slideSubtitle].filter(Boolean)
  const fullTitle = `${titleParts.join(' — ')} | Letiverse AI Investment`
  const description = `Letiverse AI investor deck — slide ${slideNum} of ${TOTAL_SLIDES}. ${slideTitle}${slideSubtitle ? ': ' + slideSubtitle : ''}. Raising £995k to build the spatial web.`
  const canonical = `${SITE_URL}/mobile/${slideNum}`

  return {
    title: fullTitle,
    description,
    robots: {
      // Investor deck is publicly accessible but shouldn't rank as individual pages.
      index: false,
      follow: false,
    },
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: 'Letiverse AI',
      title: fullTitle,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Letiverse AI — Investment Deck' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
  }
}

export default async function MobileSlidePage({
  params,
}: {
  params: Promise<{ slide: string }>
}) {
  const { slide } = await params
  const slideNum = parseInt(slide, 10)

  // Strict: reject '1foo', floats, etc. — String(n) !== segment means a non-integer prefix was accepted.
  if (isNaN(slideNum) || String(slideNum) !== slide || slideNum < 1 || slideNum > TOTAL_SLIDES) {
    notFound()
  }

  return <MobileSlidePageWrapper slideNum={slideNum} />
}
