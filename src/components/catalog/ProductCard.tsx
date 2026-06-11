"use client";

import { useCartStore } from "@/store/cart";
import { Product } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image_url: product.image_url,
    });
    setTimeout(() => {
      setIsAdding(false);
      openCart();
    }, 300);
  };

  return (
    <div className="group flex flex-col h-full bg-white p-4 shadow-sm hover:shadow-xl transition-all duration-500 rounded-lg">
      <Link href={`/product/${product.id}`} className="relative block overflow-hidden aspect-square bg-gray-50 mb-6 rounded-md">
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
        <p className="text-sm font-light text-gray-500 mb-6 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="font-serif font-bold text-xl text-chocolate">
            {product.price.toLocaleString("ru-RU")} ₴
          </span>
          <button
            onClick={handleAddToCart}
            disabled={!product.in_stock || isAdding}
            className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 ${
              isAdding
                ? "bg-green-500 text-white scale-110"
                : !product.in_stock
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-chocolate text-gold hover:bg-black"
            }`}
            aria-label="В корзину"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white p-4 shadow-sm rounded-lg animate-pulse">
      <div className="w-full aspect-square bg-gray-200 mb-6 rounded-md"></div>
      <div className="h-6 bg-gray-200 w-3/4 mb-4 rounded"></div>
      <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
      <div className="h-4 bg-gray-200 w-5/6 mb-6 rounded"></div>
      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
        <div className="h-8 bg-gray-200 w-24 rounded"></div>
        <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}
