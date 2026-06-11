import Link from "next/link";
import { mockCategories, mockProducts } from "@/lib/db";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

export default function Home() {
  const bestsellers = mockProducts.filter(p => p.is_bestseller).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[80vh] flex items-center justify-center bg-chocolate text-milk overflow-hidden">
        {/* Placeholder image for hero background, replace with actual premium image later */}
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://placehold.co/1920x1080/1c1917/d4af37?text=Premium+Chocolate"
            alt="Премиальный шоколад"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-wide uppercase leading-tight">
            Искусство <br/><span className="text-gold italic">Шоколада</span>
          </h1>
          <p className="text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto tracking-wide opacity-90">
            Каждая конфета — это шедевр, созданный вручную из лучших какао-бобов мира, чтобы подарить вам незабываемые мгновения истинного наслаждения.
          </p>
          <Link
            href="/catalog"
            className="inline-block border border-gold text-gold hover:bg-gold hover:text-chocolate transition-all duration-500 px-10 py-4 uppercase tracking-widest text-sm font-medium"
          >
            Перейти в каталог
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 px-4 bg-milk">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-chocolate mb-4">Наши Коллекции</h2>
            <div className="w-24 h-px bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockCategories.map((category) => (
              <Link
                key={category.id}
                href={`/catalog?category=${category.slug}`}
                className="group relative block overflow-hidden aspect-[4/5] bg-gray-100"
              >
                <Image
                  src={`https://placehold.co/600x800/1c1917/d4af37?text=${encodeURIComponent(category.title)}`}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:bg-black/40"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <h3 className="text-2xl font-serif mb-2">{category.title}</h3>
                  <p className="font-light text-sm opacity-90 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-24 px-4 bg-milk border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-chocolate mb-4">Бестселлеры</h2>
              <div className="w-24 h-px bg-gold"></div>
            </div>
            <Link href="/catalog" className="hidden md:inline-block text-sm uppercase tracking-widest text-chocolate hover:text-gold transition-colors pb-1 border-b border-transparent hover:border-gold">
              Смотреть все
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellers.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <Link href={`/product/${product.id}`} className="relative block overflow-hidden aspect-square bg-gray-50 mb-6">
                  <Image
                    src={product.image_url || "https://placehold.co/600x600/1c1917/d4af37?text=Товар"}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <div className="flex flex-col flex-grow">
                  <Link href={`/product/${product.id}`} className="text-lg font-serif text-chocolate mb-2 hover:text-gold transition-colors">
                    {product.title}
                  </Link>
                  <p className="text-sm font-light text-gray-500 mb-4 line-clamp-2 flex-grow">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-serif font-bold text-lg text-chocolate">
                      {product.price.toLocaleString("ru-RU")} ₴
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/catalog" className="inline-block text-sm uppercase tracking-widest text-chocolate hover:text-gold transition-colors pb-1 border-b border-chocolate hover:border-gold">
              Смотреть все бестселлеры
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Block */}
      <section className="py-24 px-4 bg-chocolate text-milk text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif mb-8 uppercase tracking-wider">Философия Вкуса</h2>
          <div className="w-16 h-px bg-gold mx-auto mb-10"></div>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-90 mb-8">
            Мы верим, что настоящий шоколад — это не просто сладость. Это симфония вкуса, рожденная из гармонии лучших ингредиентов и страсти мастеров. Каждая конфета создается вручную, с любовью и вниманием к мельчайшим деталям, чтобы вы могли прикоснуться к истинному искусству шоколатье.
          </p>
          <p className="text-sm uppercase tracking-widest text-gold font-medium">Только натуральные ингредиенты • Ручная работа • Безупречное качество</p>
        </div>
      </section>
    </div>
  );
}
