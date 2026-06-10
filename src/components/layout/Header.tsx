/**
 * Универсальный компонент Header (Шапка сайта).
 * Использует Tailwind CSS для стилизации.
 */
export default function Header() {
  return (
    <header className="w-full bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Логотип */}
        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
          MySite<span className="text-gray-800 dark:text-white">.PRO</span>
        </div>
        
        {/* Навигация */}
        <nav>
          <ul className="flex space-x-6 text-sm font-medium">
            <li>
              <a href="/" className="hover:text-blue-500 transition-colors">Главная</a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-500 transition-colors">О нас</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
