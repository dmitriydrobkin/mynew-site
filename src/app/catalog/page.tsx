export const runtime = 'edge';

import { getCategories, getProducts } from "@/lib/db";
import Link from "next/link";
import { ProductCard } from "@/components/catalog/ProductCard";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const currentCategorySlug = searchParams.category;

  // Ожидаем РЕАЛЬНЫЕ данные из базы Cloudflare D1
  const categories = await getCategories();
  const products = await getProducts(currentCategorySlug);

  return (
    <div className="flex flex-col min-h-screen bg-milk">
      <div className="max-w-7xl mx-auto w-full px-4 py-12 md:py-20 flex-grow flex flex-col md:flex-row gap-12">
        {/* Панель фильтров */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h2 className="text-xl font-serif text-chocolate mb-6 border-b border-gray-200 pb-4">Категории</h2>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/catalog"
                  className={`block text-sm uppercase tracking-widest transition-colors ${
                    !currentCategorySlug ? "text-gold font-bold" : "text-gray-500 hover:text-chocolate"
                  }`}
                >
                  Все коллекции
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/catalog?category=${category.slug}`}
                    className={`block text-sm uppercase tracking-widest transition-colors ${
                      currentCategorySlug === category.slug ? "text-gold font-bold" : "text-gray-500 hover:text-chocolate"
                    }`}
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Сетка товаров */}
        <div className="flex-grow">
           <h1 className="text-4xl font-serif text-chocolate mb-8">
             {currentCategorySlug
                ? categories.find(c => c.slug === currentCategorySlug)?.title
                : "Вся коллекция"
             }
           </h1>
           <div className="w-16 h-px bg-gold mb-12"></div>

           {products.length === 0 ? (
             <div className="text-center py-20 text-gray-500">
               <p className="text-xl font-serif mb-4">К сожалению, в этой категории пока нет товаров.</p>
               <Link href="/catalog" className="text-chocolate hover:text-gold border-b border-chocolate hover:border-gold transition-colors pb-1">
                 Вернуться ко всем товарам
               </Link>
             </div>
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
               {products.map((product) => (
                 <ProductCard key={product.id} product={product} />
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
