import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SLIDES, TOTAL_SLIDES } from '@/lib/slides'
import { SITE_URL } from '@/lib/site'
import { DesktopSlidePageWrapper } from '@/components/deck/DesktopSlidePageWrapper'

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
  if (isNaN(slideNum) || String(slideNum) !== slide || slideNum < 1 || slideNum > TOTAL_SLIDES) {
    return { title: 'Not Found | Letiverse AI Investment' }
  }
  const slideConfig = SLIDES.find(s => s.id === slideNum)
  const slideTitle = slideConfig?.title ?? 'Letiverse AI'
  const slideSubtitle = slideConfig?.subtitle ?? ''
  const titleParts = [slideTitle, slideSubtitle].filter(Boolean)
  const fullTitle = `${titleParts.join(' — ')} | Letiverse AI Investment`
  const description = `Letiverse AI investor deck — slide ${slideNum} of ${TOTAL_SLIDES}. ${slideTitle}${slideSubtitle ? ': ' + slideSubtitle : ''}. Raising £995k to build the spatial web.`
  const canonical = `${SITE_URL}/${slideNum}`

  return {
    title: fullTitle,
    description,
    robots: { index: false, follow: false },
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

export default async function DesktopSlidePage({
  params,
}: {
  params: Promise<{ slide: string }>
}) {
  const { slide } = await params
  const slideNum = parseInt(slide, 10)

  if (isNaN(slideNum) || String(slideNum) !== slide || slideNum < 1 || slideNum > TOTAL_SLIDES) {
    notFound()
  }

  return <DesktopSlidePageWrapper slideNum={slideNum} />
}
