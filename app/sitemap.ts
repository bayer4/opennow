import type { MetadataRoute } from 'next';
import { getPublicCitySitemapEntries, getPublicCitySlugs } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publicCities = await getPublicCitySitemapEntries().catch(() => []);
  const openNowCities = await getPublicCitySlugs().catch(() => []);

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
    ...openNowCities.map((city) => ({
      url: `https://getopennow.com/open-now/${city.citySlug}`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.8,
    })),
  ];
}
