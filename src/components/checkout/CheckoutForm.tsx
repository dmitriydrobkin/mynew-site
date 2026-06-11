"use client";

import { useCartStore } from "@/store/cart";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Basic validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setError("Пожалуйста, заполните все обязательные поля.");
      setIsSubmitting(false);
      return;
    }

    if (items.length === 0) {
      setError("Ваша корзина пуста.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_phone: formData.phone,
          delivery_address: formData.address,
          comment: formData.comment,
          items: items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            price: item.price
          })),
          total_price: getTotalPrice()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Произошла ошибка при оформлении заказа.");
      }

      clearCart();
      // In a real app, redirect to a success page.
      alert("Спасибо за заказ! Мы свяжемся с вами в ближайшее время.");
      router.push("/");

    } catch (err: any) {
      setError(err.message || "Не удалось отправить заказ. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-serif text-chocolate mb-6">Ваши данные</h2>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Имя и фамилия *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
          placeholder="Иван Иванов"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Телефон *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
          placeholder="+38 (000) 000-00-00"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Адрес доставки *
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
          placeholder="г. Киев, ул. Крещатик 1, кв 1"
        />
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Комментарий к заказу
        </label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all resize-none"
          placeholder="Особые пожелания..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || items.length === 0}
        className={`w-full py-4 rounded-lg uppercase tracking-widest text-sm font-medium transition-all duration-300 ${
          isSubmitting || items.length === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-chocolate text-gold hover:bg-black shadow-lg hover:shadow-xl"
        }`}
      >
        {isSubmitting ? "Оформление..." : "Подтвердить заказ"}
      </button>
    </form>
  );
}
