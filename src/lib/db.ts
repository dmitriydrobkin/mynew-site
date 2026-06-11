export interface Category {
  id: number;
  slug: string;
  title: string;
  description: string | null;
}

export interface Product {
  id: number;
  category_id: number;
  slug: string;
  title: string;
  price: number;
  description: string | null;
  image_url: string | null;
  is_bestseller: boolean;
  in_stock: boolean;
}

export interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  total_price: number;
  status: string;
  created_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

// Заглушки (Mock data) для разработки и тестирования, когда БД пуста
export const mockCategories: Category[] = [
  { id: 1, slug: 'signature-chocolates', title: 'Авторские конфеты', description: 'Уникальные конфеты ручной работы' },
  { id: 2, slug: 'premium-chocolate', title: 'Премиальный шоколад', description: 'Отборный шоколад высшего качества' },
  { id: 3, slug: 'gift-sets', title: 'Подарочные наборы', description: 'Идеальные подарки для близких' },
];

export const mockProducts: Product[] = [
  { id: 1, category_id: 1, slug: 'truffle-classic', title: 'Классический трюфель', price: 150, description: 'Классический шоколадный трюфель из темного шоколада 70% какао. Ручная работа.', image_url: 'https://placehold.co/600x600/1c1917/d4af37?text=Трюфель', is_bestseller: true, in_stock: true },
  { id: 2, category_id: 1, slug: 'caramel-heart', title: 'Сердце с карамелью', price: 180, description: 'Конфета в форме сердца с жидкой соленой карамелью внутри.', image_url: 'https://placehold.co/600x600/1c1917/d4af37?text=Карамель', is_bestseller: true, in_stock: true },
  { id: 3, category_id: 2, slug: 'dark-chocolate-bar', title: 'Плитка горького шоколада', price: 450, description: 'Плитка горького шоколада 85% какао с морской солью.', image_url: 'https://placehold.co/600x600/1c1917/d4af37?text=Шоколад', is_bestseller: false, in_stock: true },
  { id: 4, category_id: 3, slug: 'royal-box', title: 'Королевский набор', price: 2500, description: 'Большой набор премиальных шоколадных конфет в золотой упаковке.', image_url: 'https://placehold.co/600x600/1c1917/d4af37?text=Набор', is_bestseller: true, in_stock: true },
  { id: 5, category_id: 2, slug: 'milk-chocolate-nuts', title: 'Молочный шоколад с орехами', price: 400, description: 'Нежный молочный шоколад с цельным фундуком.', image_url: 'https://placehold.co/600x600/1c1917/d4af37?text=Орехи', is_bestseller: false, in_stock: true },
  { id: 6, category_id: 1, slug: 'raspberry-kiss', title: 'Малиновый поцелуй', price: 160, description: 'Конфета из белого шоколада с малиновым ганашем.', image_url: 'https://placehold.co/600x600/1c1917/d4af37?text=Малина', is_bestseller: false, in_stock: true },
];
