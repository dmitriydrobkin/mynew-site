// Главная страница сайта.
export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Добро пожаловать в My Site!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Это шаблон Next.js 14+ на Cloudflare Pages (Edge Runtime).
        </p>
      </div>
    </div>
  );
}
