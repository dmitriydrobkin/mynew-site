import { MetadataRoute } from 'next';

// Генерация sitemap.xml для улучшения индексации в Google и других поисковиках.
// Для динамических страниц данные можно подтягивать из API.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mysite.com';

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    // Добавьте сюда другие статические или динамические маршруты
  ];
}
