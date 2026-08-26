'use client'
import { useCurrentSlide } from '@/hooks/useDeck'
import { slideComponents } from '@/lib/slideComponents'
import { SlideTransition } from './SlideTransition'

export function SlideStage() {
  const current = useCurrentSlide()
  const SlideComponent = slideComponents[current]

  return (
    <div className="relative w-full h-full overflow-hidden">
      <SlideTransition slideId={current}>
        {SlideComponent ? <SlideComponent /> : null}
      </SlideTransition>
    </div>
  )
}
