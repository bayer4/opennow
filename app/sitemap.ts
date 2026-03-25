import type { MetadataRoute } from 'next';
import { getPublicCitySitemapEntries } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publicCities = await getPublicCitySitemapEntries().catch(() => []);

  return [
    {
      url: 'https://getopennow.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...publicCities.map((city) => ({
      url: `https://getopennow.com/list/${city.shareSlug}`,
      lastModified: new Date(city.createdAt),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    })),
  ];
}
