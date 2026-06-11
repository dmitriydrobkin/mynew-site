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

      // Обработка внутреннего вызова из /api/orders (формат: INTERNAL_ORDER|id|name|phone|total|itemsCount)
      if (text.startsWith("INTERNAL_ORDER|")) {
        const parts = text.split("|");
        const orderId = parts[1];
        const customerName = parts[2];
        const customerPhone = parts[3];
        const totalAmount = parts[4];
        const itemsCount = parts[5];

        const messageTemplate = `New Order #${orderId}!\nClient: ${customerName}, Phone: ${customerPhone}.\nAmount: ${totalAmount} грн.\nOrder composition: ${itemsCount} items.`;

        // В следующем шаге мы добавим логику отправки этого шаблона через Telegram API
        console.log("Сформирован шаблон для Telegram:\n", messageTemplate);

        // Отправка запроса в Telegram Bot API
        // В Cloudflare Pages переменные окружения доступны через process.env (если настроены правильно)
        // или через context.env в зависимости от байндингов, но Next.js on Pages полифиллит process.env
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const targetChatId = process.env.TELEGRAM_CHAT_ID;

        if (botToken && targetChatId) {
          try {
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                chat_id: targetChatId,
                text: messageTemplate,
              }),
            });
            console.log("Уведомление успешно отправлено в Telegram");
          } catch (err) {
            console.error("Ошибка при отправке в Telegram API:", err);
          }
        } else {
          console.warn("TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не установлены. Уведомление не отправлено.");
        }
      }
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
