/** @type {import('next').NextConfig} */
const nextConfig = {
  // Настройки, специфичные для деплоя на Cloudflare Pages с использованием Edge Runtime.
  // В Cloudflare Pages вся логика выполняется на Edge (v8 isolates), а не в Node.js.
  experimental: {
    // Включаем использование Edge runtime
  },
  // Отключаем оптимизацию изображений встроенным сервером Next.js, так как Cloudflare имеет свои решения
  images: {
    unoptimized: true,
  },
  // Строгий режим React
  reactStrictMode: true,
};

export default nextConfig;
