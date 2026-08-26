import type { RegistryEntry } from '@/types/deck'
import { SLIDES } from './slides'

/** All UI/3D/animation/nav components with searchable metadata */
const COMPONENT_REGISTRY: RegistryEntry[] = [
  // ── Slides ──────────────────────────────────────────────────────────────────
  ...SLIDES.map(s => ({
    id: `slide-${String(s.id).padStart(2, '0')}`,
    category: 'slide' as const,
    component: `Slide${String(s.id).padStart(2, '0')}_${s.slug.replace(/-./g, m => m[1].toUpperCase())}`,
    tags: s.tags,
    slides: [s.id],
    description: s.title + (s.subtitle ? ` — ${s.subtitle}` : ''),
  })),

  // ── 3D / R3F ─────────────────────────────────────────────────────────────
  {
    id: 'scene',
    category: 'three',
    component: 'Scene',
    tags: ['r3f', 'canvas', '3d', 'background', 'ambient'],
    description: 'R3F Canvas — fixed ambient background, z-index -10',
  },
  {
    id: 'particle-field',
    category: 'three',
    component: 'ParticleField',
    tags: ['particles', '3d', 'animation', 'ambient', 'cyan'],
    description: '1800 floating cyan/white particles',
  },
  {
    id: 'floating-orbs',
    category: 'three',
    component: 'FloatingOrbs',
    tags: ['orbs', '3d', 'ambient', 'glow'],
    description: '6 ambient glowing spheres with slow rotation',
  },
  {
    id: 'post-fx',
    category: 'three',
    component: 'PostFX',
    tags: ['bloom', 'vignette', 'chromatic-aberration', '3d', 'postprocessing'],
    description: 'Bloom + ChromaticAberration + Vignette post-processing',
  },

  // ── Deck Engine ─────────────────────────────────────────────────────────
  {
    id: 'deck-controller',
    category: 'slide',
    component: 'DeckController',
    tags: ['orchestrator', 'deck', 'keyboard', 'swipe', 'scroll'],
    description: 'Top-level deck orchestrator — mounts all sub-systems',
  },
  {
    id: 'slide-stage',
    category: 'slide',
    component: 'SlideStage',
    tags: ['perspective', 'css-3d', 'dynamic-import', 'code-split'],
    description: 'CSS perspective container with lazy-loaded slide components',
  },
  {
    id: 'slide-transition',
    category: 'animation',
    component: 'SlideTransition',
    tags: ['framer-motion', 'animate-presence', 'transition', 'x', 'y', 'z'],
    description: 'AnimatePresence mode="wait" — axis-aware Framer Motion transitions',
  },
  {
    id: 'slide-layout',
    category: 'slide',
    component: 'SlideLayout',
    tags: ['layout', 'bg-image', 'accent-bar', 'logo', 'shared'],
    description: 'Shared slide wrapper: bg image, left cyan accent bar, Letiverse logo',
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  {
    id: 'slide-nav',
    category: 'nav',
    component: 'SlideNav',
    tags: ['navigation', 'dots', 'arrows', 'progress', 'controls'],
    description: 'Progress bar + dot nav + arrow buttons + map toggle',
  },
  {
    id: 'slide-map',
    category: 'nav',
    component: 'SlideMap',
    tags: ['navigation', 'map', 'overlay', 'grid', 'keyboard-m'],
    description: 'M-key overlay — 6-column grid of all 19 slides',
  },

  // ── Player ────────────────────────────────────────────────────────────────
  {
    id: 'media-player',
    category: 'player',
    component: 'MediaPlayer',
    tags: ['video', 'player', 'controls', 'thumbnail'],
    slides: [4, 5],
    description: 'HTML5 video player with custom controls (slides 4 & 5)',
  },
  // ── Magic UI / shadcn UI ─────────────────────────────────────────────────
  {
    id: 'globe',
    category: 'ui',
    component: 'Globe',
    tags: ['magic-ui', 'cobe', '3d', 'globe', 'earth'],
    slides: [13],
    description: 'Spinning WebGL globe (cobe v2)',
  },
  {
    id: 'particles-ui',
    category: 'ui',
    component: 'Particles',
    tags: ['magic-ui', 'particles', 'canvas', 'interactive'],
    description: 'Interactive canvas particle field (Magic UI)',
  },
  {
    id: 'number-ticker',
    category: 'ui',
    component: 'NumberTicker',
    tags: ['magic-ui', 'animation', 'counter', 'number'],
    slides: [1, 2, 14],
    description: 'Animated number count-up (Magic UI)',
  },
  {
    id: 'border-beam',
    category: 'ui',
    component: 'BorderBeam',
    tags: ['magic-ui', 'animation', 'border', 'glow'],
    description: 'Animated glowing border beam (Magic UI)',
  },
  {
    id: 'blur-fade',
    category: 'animation',
    component: 'BlurFade',
    tags: ['magic-ui', 'animation', 'blur', 'fade', 'entrance'],
    description: 'Blur-fade entrance animation (Magic UI)',
  },
  {
    id: 'meteors',
    category: 'ui',
    component: 'Meteors',
    tags: ['magic-ui', 'animation', 'meteors', 'background'],
    description: 'Animated meteor shower effect (Magic UI)',
  },
  {
    id: 'orbiting-circles',
    category: 'ui',
    component: 'OrbitingCircles',
    tags: ['magic-ui', 'animation', 'orbit', 'icons'],
    description: 'Orbiting icon circles (Magic UI)',
  },
  {
    id: 'animated-beam',
    category: 'ui',
    component: 'AnimatedBeam',
    tags: ['magic-ui', 'animation', 'beam', 'connection', 'svg'],
    description: 'SVG animated connection beam (Magic UI)',
  },
  {
    id: 'flickering-grid',
    category: 'ui',
    component: 'FlickeringGrid',
    tags: ['magic-ui', 'animation', 'grid', 'background'],
    description: 'Flickering grid background (Magic UI)',
  },
  {
    id: 'animated-gradient-text',
    category: 'ui',
    component: 'AnimatedGradientText',
    tags: ['magic-ui', 'animation', 'gradient', 'text'],
    description: 'Animated gradient text (Magic UI)',
  },
  {
    id: 'shimmer-button',
    category: 'ui',
    component: 'ShimmerButton',
    tags: ['magic-ui', 'button', 'shimmer', 'cta'],
    slides: [19],
    description: 'Shimmering CTA button (Magic UI)',
  },
  {
    id: 'dot-pattern',
    category: 'ui',
    component: 'DotPattern',
    tags: ['magic-ui', 'pattern', 'background', 'dots'],
    description: 'SVG dot grid pattern background (Magic UI)',
  },
  {
    id: 'lens',
    category: 'ui',
    component: 'Lens',
    tags: ['magic-ui', 'lens', 'zoom', 'hover'],
    description: 'Hover zoom lens effect (Magic UI)',
  },
]

// ── Search & Filter ────────────────────────────────────────────────────────

/** Find registry entries by one or more tags */
export function findByTag(...tags: string[]): RegistryEntry[] {
  return COMPONENT_REGISTRY.filter(e =>
    tags.every(t => e.tags.includes(t)),
  )
}

/** Find registry entries used on a specific slide number */
export function findBySlide(slideId: number): RegistryEntry[] {
  return COMPONENT_REGISTRY.filter(
    e => !e.slides || e.slides.includes(slideId),
  )
}

/** Full-text search across id, component, description, and tags */
export function search(query: string): RegistryEntry[] {
  const q = query.toLowerCase()
  return COMPONENT_REGISTRY.filter(
    e =>
      e.id.includes(q) ||
      e.component.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.tags.some(t => t.includes(q)),
  )
}

/** All unique tags across the registry */
export function allTags(): string[] {
  return [...new Set(COMPONENT_REGISTRY.flatMap(e => e.tags))].sort()
}

export default COMPONENT_REGISTRY
