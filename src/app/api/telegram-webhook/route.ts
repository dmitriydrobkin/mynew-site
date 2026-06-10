import { NextRequest, NextResponse } from 'next/server';

// Устанавливаем Edge Runtime, так как мы деплоимся на Cloudflare Pages.
// Использование API Node.js (fs, path, crypto) в этом файле приведет к ошибке!
export const runtime = 'edge';

// Интерфейс для типизации входящего апдейта от Telegram
interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      username?: string;
    };
    chat: {
      id: number;
      type: string;
    };
    date: number;
    text?: string;
  };
}

/**
 * Edge-функция для приема вебхуков от Telegram-бота.
 * Используется для создания удаленной админки или интеграции оповещений.
 * 
 * @param request Входящий запрос (Web API Request)
 */
export async function POST(request: NextRequest) {
  try {
    // Получаем тело запроса
    const update: TelegramUpdate = await request.json();

    // Проверяем, есть ли текстовое сообщение
    if (update.message?.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      console.log(`Получено сообщение от ${chatId}: ${text}`);

      // Здесь должна быть логика обработки команд (например, /start, /admin и т.д.)
      // Обратите внимание, что для ответа нужно отправлять fetch-запрос к Telegram API:
      // fetch(`https://api.telegram.org/bot<ВАШ_ТОКЕН>/sendMessage`, { ... })
    }

    // Всегда возвращаем 200 OK, чтобы Telegram не переотправлял запрос
    return NextResponse.json({ ok: true }, { status: 200 });

  } catch (error) {
    console.error('Ошибка при обработке вебхука Telegram:', error);
    // Возвращаем 500 только в случае критических системных сбоев
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Запрещаем методы кроме POST для вебхуков
export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
