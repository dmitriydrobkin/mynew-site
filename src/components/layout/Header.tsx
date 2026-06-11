/**
 * Универсальный компонент Header (Шапка сайта).
 * Использует Tailwind CSS для стилизации.
 */
"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useEffect, useState } from "react";

export default function Header() {
  const { openCart, items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="w-full bg-milk border-b border-gray-200 p-4 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Логотип */}
        <Link href="/" className="text-2xl font-serif font-bold text-chocolate tracking-wider">
          WONKA<span className="text-gold">.</span>
        </Link>
        
        {/* Навигация */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8 text-sm font-medium uppercase tracking-widest text-chocolate">
            <li>
              <Link href="/" className="hover:text-gold transition-colors duration-300">Главная</Link>
            </li>
            <li>
              <Link href="/catalog" className="hover:text-gold transition-colors duration-300">Каталог</Link>
            </li>
          </ul>
        </nav>

        {/* Корзина */}
        <button
          onClick={openCart}
          className="relative p-2 text-chocolate hover:text-gold transition-colors duration-300"
          aria-label="Открыть корзину"
        >
          <ShoppingBag className="w-6 h-6" />
          {mounted && itemCount > 0 && (
            <span className="absolute top-0 right-0 bg-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
