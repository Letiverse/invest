/**
 * Shared slide component registry for the investment deck.
 *
 * Maps deck positions 1–22 to lazily-loaded React components. Positions 6, 10,
 * and 15 render the SlideChapter interstitial; all others render content slides.
 *
 * Used by both SlideStage (desktop) and MobileSlidePageWrapper (mobile per-page).
 * Module-level constants ensure each `dynamic()` call is evaluated once, giving
 * Next.js a stable chunk boundary per slide.
 */
import type { ComponentType } from 'react'
import dynamic from 'next/dynamic'

export const slideComponents: Record<number, ComponentType> = {
  1:  dynamic(() => import('@/components/slides/Slide01_Hero').then(m => ({ default: m.Slide01_Hero }))),
  2:  dynamic(() => import('@/components/slides/Slide02_AIShift').then(m => ({ default: m.Slide02_AIShift }))),
  3:  dynamic(() => import('@/components/slides/Slide03_SpatialWeb').then(m => ({ default: m.Slide03_SpatialWeb }))),
  4:  dynamic(() => import('@/components/slides/Slide04_BestTwin').then(m => ({ default: m.Slide04_BestTwin }))),
  5:  dynamic(() => import('@/components/slides/Slide05_Charity').then(m => ({ default: m.Slide05_Charity }))),
  6:  dynamic(() => import('@/components/slides/SlideChapter').then(m => ({ default: m.SlideChapter }))),
  7:  dynamic(() => import('@/components/slides/Slide06_MarketSize').then(m => ({ default: m.Slide06_MarketSize }))),
  8:  dynamic(() => import('@/components/slides/Slide07_BackwardsModel').then(m => ({ default: m.Slide07_BackwardsModel }))),
  9:  dynamic(() => import('@/components/slides/Slide08_Benefits').then(m => ({ default: m.Slide08_Benefits }))),
  10: dynamic(() => import('@/components/slides/SlideChapter').then(m => ({ default: m.SlideChapter }))),
  11: dynamic(() => import('@/components/slides/Slide09_Revenue1').then(m => ({ default: m.Slide09_Revenue1 }))),
  12: dynamic(() => import('@/components/slides/Slide10_Holoconnects').then(m => ({ default: m.Slide10_Holoconnects }))),
  13: dynamic(() => import('@/components/slides/Slide11_Phases').then(m => ({ default: m.Slide11_Phases }))),
  14: dynamic(() => import('@/components/slides/Slide12_Ecommerce').then(m => ({ default: m.Slide12_Ecommerce }))),
  15: dynamic(() => import('@/components/slides/SlideChapter').then(m => ({ default: m.SlideChapter }))),
  16: dynamic(() => import('@/components/slides/Slide13_Hosts').then(m => ({ default: m.Slide13_Hosts }))),
  17: dynamic(() => import('@/components/slides/Slide14_EMV').then(m => ({ default: m.Slide14_EMV }))),
  18: dynamic(() => import('@/components/slides/Slide15_Projections').then(m => ({ default: m.Slide15_Projections }))),
  19: dynamic(() => import('@/components/slides/Slide16_Financials').then(m => ({ default: m.Slide16_Financials }))),
  20: dynamic(() => import('@/components/slides/Slide17_Calculator').then(m => ({ default: m.Slide17_Calculator }))),
  21: dynamic(() => import('@/components/slides/Slide17_Risk').then(m => ({ default: m.Slide17_Risk }))),
  22: dynamic(() => import('@/components/slides/Slide18_CTA').then(m => ({ default: m.Slide18_CTA }))),
}
