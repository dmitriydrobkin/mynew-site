import { NextRequest, NextResponse } from 'next/server';

// Настройка для Edge Runtime Cloudflare Pages.
// Никакого использования Node.js встроенных модулей!
export const runtime = 'edge';

/**
 * Базовый защищенный эндпоинт для масштабируемой веб-админки.
 * Возвращает статистику или выполняет административные задачи.
 * В будущем сюда стоит добавить проверку JWT или сессий (Edge совместимых).
 */
export async function GET(request: NextRequest) {
  // Получаем заголовок Authorization из запроса
  const authHeader = request.headers.get('Authorization');

  // ПРОСТЕЙШАЯ защита для примера. В продакшене использовать нормальную аутентификацию!
  // Например, проверять Bearer token через Jose (Edge совместимая библиотека для JWT)
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized: Доступ запрещен.' }, { status: 401 });
  }

  // Здесь можно делать запросы к базе данных Cloudflare D1
  // const db = process.env.DB; // Binding из Cloudflare
  // const data = await db.prepare('SELECT * FROM users').all();

  // Возвращаем данные админки
  return NextResponse.json({
    status: 'success',
    message: 'Добро пожаловать в защищенную зону!',
    data: {
      activeUsers: 42,
      serverStatus: 'online (Edge)',
    }
  }, { status: 200 });
}
