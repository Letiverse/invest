import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Investor-only deck. Every slide is `noindex, nofollow` (set in each route's
 * generateMetadata). Listing those slides in the sitemap would contradict the
 * robots directive, so we expose only the canonical root entry. Search engines
 * follow the root redirect to /1 and respect the page-level robots tag.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
