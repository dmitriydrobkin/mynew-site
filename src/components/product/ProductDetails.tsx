"use client";

import { Product } from "@/lib/db";
import { useCartStore } from "@/store/cart";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProductDetails({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity,
      image_url: product.image_url,
    });
    openCart();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
      {/* Left Column: Image */}
      <div className="relative aspect-square md:aspect-[4/5] bg-gray-50 rounded-xl overflow-hidden shadow-sm">
        <Image
          src={product.image_url || "https://placehold.co/800x1000/1c1917/d4af37?text=Товар"}
          alt={product.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Column: Details */}
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl md:text-5xl font-serif text-chocolate mb-4">{product.title}</h1>
        <div className="w-16 h-px bg-gold mb-8"></div>

        <p className="text-2xl font-serif font-bold text-chocolate mb-8">
          {product.price.toLocaleString("ru-RU")} ₴
        </p>

        <div className="mb-10 text-gray-600 font-light leading-relaxed">
          {product.description || "Описания пока нет, но это точно очень вкусно."}
        </div>

        <div className="mb-8">
          <span className="block text-sm uppercase tracking-widest text-gray-500 mb-4">Количество</span>
          <div className="flex items-center gap-6">
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-max">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-gray-500 hover:text-chocolate p-1"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium text-chocolate">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-gray-500 hover:text-chocolate p-1"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm font-medium text-gray-500">
              {product.in_stock ? (
                <span className="text-green-600">В наличии</span>
              ) : (
                <span className="text-red-500">Нет в наличии</span>
              )}
            </p>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.in_stock}
          className={`flex items-center justify-center gap-3 w-full py-4 rounded-lg uppercase tracking-widest text-sm font-medium transition-all duration-300 ${
            product.in_stock
              ? "bg-chocolate text-gold hover:bg-black"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          Добавить в корзину
        </button>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <ul className="space-y-4 text-sm font-light text-gray-500">
            <li className="flex gap-2">
              <span className="text-chocolate font-medium">Состав:</span>
              Натуральный шоколад, любовь, секретный ингредиент.
            </li>
            <li className="flex gap-2">
              <span className="text-chocolate font-medium">Срок годности:</span>
              6 месяцев с даты изготовления.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
