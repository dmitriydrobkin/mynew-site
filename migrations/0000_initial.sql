-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT,
  image_url TEXT,
  is_bestseller BOOLEAN DEFAULT 0,
  in_stock BOOLEAN DEFAULT 1,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  total_price REAL NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert initial mock data for fallback
INSERT INTO categories (id, slug, title, description) VALUES
(1, 'signature-chocolates', 'Авторские конфеты', 'Уникальные конфеты ручной работы'),
(2, 'premium-chocolate', 'Премиальный шоколад', 'Отборный шоколад высшего качества'),
(3, 'gift-sets', 'Подарочные наборы', 'Идеальные подарки для близких');

INSERT INTO products (id, category_id, slug, title, price, description, image_url, is_bestseller, in_stock) VALUES
(1, 1, 'truffle-classic', 'Классический трюфель', 1500, 'Классический шоколадный трюфель из темного шоколада 70% какао. Ручная работа.', 'https://placehold.co/600x600/1c1917/d4af37?text=Трюфель', 1, 1),
(2, 1, 'caramel-heart', 'Сердце с карамелью', 1200, 'Конфета в форме сердца с жидкой карамельной начинкой.', 'https://placehold.co/600x600/1c1917/d4af37?text=Сердце', 1, 1),
(3, 2, 'dark-chocolate-bar', 'Плитка темного шоколада', 800, 'Плитка горького шоколада 85% какао с морской солью.', 'https://placehold.co/600x600/1c1917/d4af37?text=Шоколад', 0, 1),
(4, 3, 'royal-box', 'Королевский набор', 5000, 'Большой набор премиальных шоколадных конфет в золотой упаковке.', 'https://placehold.co/600x600/1c1917/d4af37?text=Набор', 1, 1);
