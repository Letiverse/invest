import { blobUrl } from '@/lib/blob-urls'

export type HostStatus = 'Live' | 'Preview' | 'In network'

export interface BenchmarkHost {
  entity: string
  name: string
  category: string
  logo?: string
  status: HostStatus
}

export const benchmarkAssets = {
  letiverseLogo: blobUrl('/slides/shared/letiverse-logo.jpeg'),
  awardWinner: blobUrl('/slides/shared/digital-twin-winner-2026.webp'),
  shipInnTour: blobUrl('/slides/slide-04/video-thumb.png'),
  shipInnFeature: blobUrl('/slides/slide-04/video-thumb.png'),
  myShiningStarTour: blobUrl('/slides/slide-05/charity-tour.png'),
  tourPreviewUrl: 'https://player.mux.com/X45u02RbgqQ8DOcCtCVocVirNJZ1gS1ZBj3E9e7HR5SU',
} as const

export const benchmarkMetrics = [
  { value: '18', label: 'Hosts', detail: 'in the network' },
  { value: '109+', label: 'Contracted years', detail: 'lower bound; Club AUsome term pending' },
  { value: '36,423', label: 'Tour views', detail: 'January–August 2026' },
  { value: '2026', label: 'Best Digital Twin', detail: 'The Ship Inn' },
] as const

export const engagementMetrics = [
  { name: 'The Ship Inn', value: '5m 15s', note: 'average user time' },
  { name: 'My Shining Star', value: '5m 35s', note: 'average user time' },
  { name: 'Calypso Cricket', value: '5m 00s', note: 'average user time' },
] as const

export const benchmarkHosts: BenchmarkHost[] = [
  { entity: 'E001', name: 'Bradford Bulls Rugby', category: 'Sport', status: 'Preview', logo: blobUrl('/slides/media/image29.png') },
  { entity: 'E002', name: 'Calypso Cricket', category: 'Sport', status: 'Live', logo: blobUrl('/slides/media/image31.png') },
  { entity: 'E004', name: 'Funding Unlocked', category: 'Business', status: 'In network', logo: blobUrl('/slides/media/image30.png') },
  { entity: 'E005', name: 'Hawkinge Cricket Club', category: 'Sport', status: 'Preview', logo: blobUrl('/slides/media/image32.jpeg') },
  { entity: 'E006', name: 'Keenwood', category: 'Business', status: 'In network', logo: blobUrl('/slides/media/image33.png') },
  { entity: 'E007', name: 'My Shining Star', category: 'Charity', status: 'Live', logo: blobUrl('/slides/media/image38.png') },
  { entity: 'E008', name: 'Rochester City FC', category: 'Sport', status: 'In network', logo: blobUrl('/slides/media/image37.png') },
  { entity: 'E009', name: 'Sittingbourne FC', category: 'Sport', status: 'In network', logo: blobUrl('/slides/media/image34.png') },
  { entity: 'E010', name: 'The Ridge Golf Club', category: 'Sport', status: 'Preview', logo: blobUrl('/slides/media/image35.png') },
  { entity: 'E011', name: 'The Ship Inn', category: 'Hospitality', status: 'Live', logo: blobUrl('/slides/media/image36.jpeg') },
  { entity: 'E012', name: 'Tonbridge Golf Centre', category: 'Sport', status: 'Preview', logo: blobUrl('/slides/media/image42.png') },
  { entity: 'E029', name: 'West Kent Shooting School', category: 'Sport', status: 'In network', logo: blobUrl('/slides/media/image41.png') },
  { entity: 'E042', name: 'Safe Haven Animal Rescue', category: 'Charity', status: 'In network', logo: blobUrl('/slides/media/image39.png') },
  { entity: 'E045', name: 'Soar Trampoline Park', category: 'Entertainment', status: 'In network', logo: blobUrl('/slides/media/image40.png') },
  { entity: 'E057', name: 'Billericay Town FC', category: 'Sport', status: 'In network', logo: 'https://tjtvxp4xul5oynxz.public.blob.vercel-storage.com/E057-rm-ima-billericay-town-football-club-logo.webp' },
  { entity: 'E058', name: 'Forever Padel', category: 'Sport', status: 'In network', logo: 'https://tjtvxp4xul5oynxz.public.blob.vercel-storage.com/E058-rm-ima-forever-padel-logo.webp' },
  { entity: 'E059', name: 'Proper Football', category: 'Media', status: 'In network', logo: 'https://tjtvxp4xul5oynxz.public.blob.vercel-storage.com/E059-rm-ima-main-logo.png' },
  { entity: 'E060', name: 'Club AUsome', category: 'Autism charity', status: 'In network' },
]
