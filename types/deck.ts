export type TransitionAxis = 'z' | 'x' | 'y' | 'zx' | 'zy'

export interface SlideConfig {
  id: number
  slug: string
  title: string
  subtitle?: string
  axis: TransitionAxis
  direction: 1 | -1
  cameraPosition: [number, number, number]
  cameraTarget: [number, number, number]
  bgColor: string
  accentColor: string
  assets: string[]
  tags: string[]
  media?: MediaConfig
}

export interface MediaConfig {
  type: 'video' | 'youtube'
  src: string
  thumbnail: string
  duration?: number
}

export interface AssetRecord {
  semanticName: string
  destinationPath: string
  slides: number[]
  tags: string[]
  description: string
}

export interface RegistryEntry {
  id: string
  category: 'slide' | 'three' | 'ui' | 'animation' | 'player' | 'nav'
  component: string
  tags: string[]
  slides?: number[]
  description: string
}

export interface DeckState {
  currentSlide: number
  totalSlides: number
  prevSlide: number
  direction: TransitionAxis
  isPlaying: boolean
  autoAdvance: boolean
  mapOpen: boolean
  goTo: (index: number) => void
  next: () => void
  prev: () => void
  toggleMap: () => void
  toggleAutoAdvance: () => void
  setPlaying: (v: boolean) => void
  deckReady: boolean
  setDeckReady: (v: boolean) => void
  narrationEnabled: boolean
  setNarrationEnabled: (v: boolean) => void
}
