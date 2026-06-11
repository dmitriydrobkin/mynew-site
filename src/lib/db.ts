import { getRequestContext } from "@cloudflare/next-on-pages";

// ==========================================
// 1. СТРОГИЕ ТИПЫ ДЛЯ БАЗЫ ДАННЫХ CLOUDFLARE D1
// ==========================================
export interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  meta: any;
}

export interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  all<T = unknown>(): Promise<D1Result<T>>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

export interface CloudflareEnv {
  DB: D1Database;
}

// ==========================================
// 2. ТИПЫ ДАННЫХ НАШЕГО МАГАЗИНА
// ==========================================
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

// ==========================================
// 3. ЗАГЛУШКИ (Mock data)
// ==========================================
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

// ==========================================
// 4. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ==========================================
function getDb() {
  const context = getRequestContext();
  return (context.env as unknown as CloudflareEnv).DB;
}

function getMockProducts(categorySlug?: string) {
  if (categorySlug) {
    const category = mockCategories.find((c) => c.slug === categorySlug);
    return category ? mockProducts.filter((p) => p.category_id === category.id) : [];
  }
  return mockProducts;
}

// ==========================================
// 5. ЭКСПОРТИРУЕМЫЕ ФУНКЦИИ БАЗЫ D1
// ==========================================
export async function getCategories(): Promise<Category[]> {
  try {
    const db = getDb();
    const response = await db.prepare('SELECT * FROM categories').all<Category>();
    return response.results.length > 0 ? response.results : mockCategories;
  } catch (error) {
    console.error('Ошибка D1 (categories):', error);
    return mockCategories;
  }
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  try {
    const db = getDb();
    if (categorySlug) {
      const response = await db.prepare(`
        SELECT p.* FROM products p
        JOIN categories c ON p.category_id = c.id
        WHERE c.slug = ?
      `).bind(categorySlug).all<Product>();
      
      return response.results.length > 0 ? response.results : getMockProducts(categorySlug);
    }
    const response = await db.prepare('SELECT * FROM products').all<Product>();
    return response.results.length > 0 ? response.results : getMockProducts();
  } catch (error) {
    console.error('Ошибка D1 (products):', error);
    return getMockProducts(categorySlug);
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const db = getDb();
    const response = await db.prepare('SELECT * FROM products WHERE id = ?').bind(id).all<Product>();
    return response.results.length > 0 ? response.results[0] : (mockProducts.find(p => p.id === id) || null);
  } catch (error) {
    console.error('Ошибка D1 (product by id):', error);
    return mockProducts.find(p => p.id === id) || null;
  }
}
