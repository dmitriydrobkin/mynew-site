/**
 * Универсальный компонент Footer (Подвал сайта).
 * Отображается в самом низу страницы.
 */
export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-6 mt-auto">
      <div className="max-w-7xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} My Site. Все права защищены.</p>
        <p className="mt-2">Создано для Cloudflare Pages (Edge Runtime).</p>
      </div>
    </footer>
  );
}
