"use client";

import { useCartStore } from "@/store/cart";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderSummary() {
  const { items, getTotalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="animate-pulse bg-gray-100 h-96 rounded-xl"></div>;

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100">
        <p className="text-gray-500 mb-4">Ваша корзина пуста</p>
        <Link href="/catalog" className="text-chocolate hover:text-gold transition-colors underline underline-offset-4">
          Вернуться к покупкам
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-100 sticky top-24">
      <h2 className="text-2xl font-serif text-chocolate mb-6 border-b border-gray-200 pb-4">Ваш заказ</h2>

      <ul className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4">
            <div className="relative w-16 h-16 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={item.image_url || "https://placehold.co/600x600/1c1917/d4af37?text=Товар"}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="font-medium text-chocolate text-sm leading-snug mb-1">{item.title}</h3>
              <p className="text-gray-500 text-xs">
                {item.quantity} шт. × {item.price.toLocaleString("ru-RU")} ₴
              </p>
            </div>
            <div className="flex items-center">
              <span className="font-serif font-medium text-chocolate">
                {(item.price * item.quantity).toLocaleString("ru-RU")} ₴
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t border-gray-200 pt-6 space-y-4">
        <div className="flex justify-between text-gray-600">
          <span>Сумма по товарам</span>
          <span>{getTotalPrice().toLocaleString("ru-RU")} ₴</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Доставка</span>
          <span>По тарифам перевозчика</span>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <span className="text-lg text-chocolate font-medium">Итого к оплате</span>
          <span className="text-2xl font-serif font-bold text-chocolate">
            {getTotalPrice().toLocaleString("ru-RU")} ₴
          </span>
        </div>
      </div>
    </div>
  );
}
