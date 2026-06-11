"use client";

import { useCartStore } from "@/store/cart";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartSlideOver() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice } = useCartStore();

  // Prevent hydration errors with persist middleware
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Slide-over panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-milk shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="font-serif text-2xl text-chocolate flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" /> Корзина
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-chocolate" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg">Ваша корзина пуста</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={item.image_url || "https://placehold.co/600x600/1c1917/d4af37?text=Товар"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-chocolate">{item.title}</h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex justify-between items-end">
                      <div className="flex items-center gap-3 border border-gray-200 rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-chocolate"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-chocolate"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-serif font-medium text-chocolate">
                        {(item.price * item.quantity).toLocaleString("ru-RU")} ₴
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-milk">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600">Итого</span>
              <span className="font-serif text-2xl text-chocolate font-bold">
                {getTotalPrice().toLocaleString("ru-RU")} ₴
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-chocolate text-gold text-center py-4 rounded-lg font-medium hover:bg-black transition-colors"
            >
              Оформить заказ
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
