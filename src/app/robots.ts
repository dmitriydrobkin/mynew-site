import { MetadataRoute } from 'next';

// Конфигурация robots.txt для управления поведением поисковых роботов (краулеров).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/admin/', // Запрещаем индексацию админской части API
    },
    sitemap: 'https://mysite.com/sitemap.xml',
  };
}
