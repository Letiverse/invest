export type NarrationVoiceId = 'lead' | 'human' | 'evidence'

export const NARRATION_VOICES: Record<NarrationVoiceId, {
  label: string
  direction: string
}> = {
  lead: {
    label: 'Lead narrator',
    direction: 'Warm, professional UK English. Confident and measured, with understated enthusiasm.',
  },
  human: {
    label: 'Human impact',
    direction: 'Warm UK English. Slightly softer and more personal, still polished and concise.',
  },
  evidence: {
    label: 'Evidence narrator',
    direction: 'Clear UK English. Calm, credible and grounded for proof, money and risk slides.',
  },
}

export const NARRATION_GENERATION = {
  provenance: 'GM',
  outputFormat: 'mp3',
  speed: 0.92,
  language: 'en',
  instructions:
    'Speak in UK English for a professional investor deck. Warm, credible and enthusiastic, but not salesy. Keep the delivery measured, clear and human.',
} as const

export const NARRATION_AUDIO_PROVENANCE = {
  provenance: 'GM',
  assetType: 'audio',
  pathPattern: '/audio/narration/slide-{NN}.mp3',
  source: 'Generated narration media from the checked-in narration scripts.',
} as const

export interface NarrationConfig {
  id: number
  hasBgVideo: boolean
  audioSrc?: string
  voice: NarrationVoiceId
  text: string
  /**
   * Stereo pan for spatial-audio narration. Range -1 (full left) to +1 (full right).
   * Calibrated per slide so the voice subtly leans toward the side of the frame
   * the visuals ask the eye to look at. ±0.15 max — investors should never feel
   * the audio has shifted; it should just feel "alive".
   */
  pan?: number
}

// Audio files inherit GM provenance from NARRATION_AUDIO_PROVENANCE.
export const NARRATION: NarrationConfig[] = [
  {
    id: 1,
    hasBgVideo: true,
    audioSrc: '/audio/narration/slide-01.mp3',
    voice: 'lead',
    text: 'Welcome to Letiverse: immersive AI worlds where brands, venues and communities can meet, explore and grow together.',
    pan: 0,
  },
  {
    id: 2,
    hasBgVideo: true,
    audioSrc: '/audio/narration/slide-02.mp3',
    voice: 'lead',
    text: 'AI is already part of everyday life. The next opportunity is making it feel useful, human and accessible.',
    pan: -0.08,
  },
  {
    id: 3,
    hasBgVideo: true,
    audioSrc: '/audio/narration/slide-03.mp3',
    voice: 'lead',
    text: "The internet has lived on flat screens for decades. Letiverse turns that experience into places people can step into.",
    pan: -0.06,
  },
  {
    id: 4,
    hasBgVideo: true,
    audioSrc: '/audio/narration/slide-04.mp3',
    voice: 'evidence',
    text: 'The work is already being recognised because it makes complex technology feel simple, immediate and real.',
    pan: 0,
  },
  {
    id: 5,
    hasBgVideo: false,
    audioSrc: '/audio/narration/slide-05.mp3',
    voice: 'human',
    text: 'My Shining Star shows the heart of the platform: immersive AI used to connect people and support meaningful causes.',
    pan: -0.12,
  },
  {
    id: 6,
    hasBgVideo: false,
    audioSrc: '/audio/narration/slide-06.mp3',
    voice: 'lead',
    text: 'The opportunity is not just what AI can do, but where it can live, who it can serve, and how it can scale.',
  },
  {
    id: 7,
    hasBgVideo: true,
    audioSrc: '/audio/narration/slide-07.mp3',
    voice: 'lead',
    text: 'We are early in a major shift, and the companies that define the experience layer will shape what comes next.',
    pan: 0,
  },
  {
    id: 8,
    hasBgVideo: true,
    audioSrc: '/audio/narration/slide-08.mp3',
    voice: 'lead',
    text: 'Letiverse starts differently: create value first, build attention, then let commercial partners fund the experience.',
    pan: 0,
  },
  {
    id: 9,
    hasBgVideo: true,
    audioSrc: '/audio/narration/slide-09.mp3',
    voice: 'lead',
    text: 'Free access is the growth engine. The easier the world is to enter, the faster audience and commercial value can build.',
    pan: -0.14,
  },
  {
    id: 10,
    hasBgVideo: false,
    audioSrc: '/audio/narration/slide-10.mp3',
    voice: 'evidence',
    text: 'Now the story moves from vision to model: how immersive engagement becomes repeatable, scalable revenue.',
  },
  {
    id: 11,
    hasBgVideo: false,
    audioSrc: '/audio/narration/slide-11.mp3',
    voice: 'evidence',
    text: 'Sponsorship is the first engine. Brands do not sit around the experience; they become part of the world users explore.',
    pan: -0.10,
  },
  {
    id: 12,
    hasBgVideo: false,
    audioSrc: '/audio/narration/slide-12.mp3',
    voice: 'evidence',
    text: 'Holographic technology connects the digital world back to real venues, live activations and premium physical experiences.',
    pan: -0.10,
  },
  {
    id: 13,
    hasBgVideo: false,
    audioSrc: '/audio/narration/slide-13.mp3',
    voice: 'lead',
    text: 'Phase one proves the audience and format. Phase two expands the commercial surface into deeper transactions and partnerships.',
    pan: -0.10,
  },
  {
    id: 14,
    hasBgVideo: false,
    audioSrc: '/audio/narration/slide-14.mp3',
    voice: 'lead',
    text: 'Ecommerce becomes natural when it happens inside the experience: discovery, interaction and purchase in one journey.',
    pan: -0.10,
  },
  {
    id: 15,
    hasBgVideo: false,
    audioSrc: '/audio/narration/slide-15.mp3',
    voice: 'evidence',
    text: 'Proof matters. Letiverse is not just an idea; it is already attracting partners, assets and market validation.',
  },
  {
    id: 16,
    hasBgVideo: false,
    audioSrc: '/audio/narration/slide-16.mp3',
    voice: 'human',
    text: 'Confirmed hosts give Letiverse its launch network. Each partner becomes both a destination and a distribution channel.',
    pan: 0,
  },
  {
    id: 17,
    hasBgVideo: false,
    audioSrc: '/audio/narration/slide-17.mp3',
    voice: 'evidence',
    text: 'Earned media value shows the wider potential: partner stories that travel beyond the screen and into public attention.',
    pan: -0.08,
  },
  {
    id: 18,
    hasBgVideo: true,
    audioSrc: '/audio/narration/slide-18.mp3',
    voice: 'evidence',
    text: 'The projection is about compounding: audience, partners and experiences stacking into simple, repeatable revenue lines.',
    pan: -0.10,
  },
  {
    id: 19,
    hasBgVideo: false,
    audioSrc: '/audio/narration/slide-19.mp3',
    voice: 'evidence',
    text: 'The financial picture is built around controlled growth: stay lean, prove each stream, and scale where evidence is strongest.',
    pan: -0.10,
  },
  {
    id: 20,
    hasBgVideo: false,
    audioSrc: '/audio/narration/slide-20.mp3',
    voice: 'evidence',
    text: 'The calculator makes the opportunity tangible, showing how participation can translate into meaningful upside as the platform grows.',
    pan: 0,
  },
  {
    id: 21,
    hasBgVideo: false,
    audioSrc: '/audio/narration/slide-21.mp3',
    voice: 'evidence',
    text: 'Every ambitious company carries risk. Letiverse reduces it through partnerships, content, traction and a widening commercial model.',
    pan: 0,
  },
  {
    id: 22,
    hasBgVideo: false,
    audioSrc: '/audio/narration/slide-22.mp3',
    voice: 'human',
    text: 'Letiverse is building the experience layer for AI: immersive, commercial and human. This is the moment to join before it opens wider.',
    pan: 0,
  },
]
