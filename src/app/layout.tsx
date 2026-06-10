import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Глобальная генерация метаданных для всего приложения.
// Позволяет улучшить SEO и красиво отображать ссылки в мессенджерах.
export const metadata: Metadata = {
  title: {
    template: "%s | My Site",
    default: "My Site - Универсальный шаблон", // Используется, если title не задан на странице
  },
  description: "Лучший стартовый шаблон для Next.js на Cloudflare Pages с поддержкой Edge Runtime",
  openGraph: {
    title: "My Site - Универсальный шаблон",
    description: "Лучший стартовый шаблон для Next.js на Cloudflare Pages с поддержкой Edge Runtime",
    url: "https://mysite.com",
    siteName: "My Site",
    images: [
      {
        url: "https://mysite.com/og-image.jpg", // Заглушка, замените на реальный URL
        width: 1200,
        height: 630,
        alt: "Превью сайта My Site",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "My Site - Универсальный шаблон",
    description: "Лучший стартовый шаблон для Next.js на Cloudflare Pages",
    images: ["https://mysite.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Заглушка для структурированных данных Schema.org (JSON-LD)
  // Это помогает Google лучше понимать контент вашего сайта
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "My Site",
    url: "https://mysite.com",
    description: "Универсальный шаблон Next.js для Cloudflare Pages",
  };

  return (
    <html lang="ru">
      <body className="flex flex-col min-h-screen">
        {/* Интеграция JSON-LD в секцию head или body */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
