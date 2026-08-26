/**
 * Central kill switches for next-level effects.
 * Flip any of these to false to disable the effect across the whole deck
 * without touching slide files.
 */
export const DECK_EFFECTS = {
  // Batch A — low-risk additive
  meteorsS2: true,
  borderBeamS1Award: true,
  slide15Callout: true,

  // Batch B — slide-specific
  cursorSpotlight: true,

  // Batch C — hero-tier shared canvases
  polyhedronCanvas: true,
  globeS14Inset: true,

  // Batch D — atmosphere
  spatialAudio: true,

  // CUT per rubber-duck audit:
  // - cameraDolly: fights existing SceneCamera, low pitch value
  // - particleHeadlineS1: would compete with TypewriterText already on slide 1
  // - globeS13: would regress the readable 14-card grid
  // - premiumLoader: WelcomeModal already has a polished startup readiness bar
  cameraDolly: false,
  particleHeadlineS1: false,
  globeS13: false,
  premiumLoader: false,

  // React-bits WebGL backgrounds (LaserFlow on Slide 11): disabled until the
  // upstream component is stabilised. The custom shader occasionally throws
  // `Cannot read properties of null` from three.js's getUniforms() on first
  // use, which surfaces in E2E as a pageerror failure (see #102 follow-up).
  // The slide reads correctly without the ambient flow effect.
  reactBitsBackgrounds: false,
} as const

export type DeckEffectFlag = keyof typeof DECK_EFFECTS
