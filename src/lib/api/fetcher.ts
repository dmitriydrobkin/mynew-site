/**
 * Универсальная обертка над нативным `fetch` для работы с REST API.
 * Поддерживает автоматическую сериализацию/десериализацию JSON, обработку ошибок,
 * и может безопасно использоваться в Edge Runtime.
 */

// Типизация опций для fetch
interface FetcherOptions extends RequestInit {
  // Дополнительные кастомные опции можно добавить здесь
  params?: Record<string, string>;
}

/**
 * Главная функция для выполнения HTTP-запросов к сторонним API.
 * 
 * @param url Абсолютный или относительный URL
 * @param options Настройки fetch (headers, method, body, и т.д.)
 * @returns Промис с типизированным ответом
 */
export async function apiFetch<T>(url: string, options: FetcherOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;

  // Если переданы параметры запроса (query params), добавляем их к URL
  let finalUrl = url;
  if (params) {
    const searchParams = new URLSearchParams(params);
    const separator = finalUrl.includes('?') ? '&' : '?';
    finalUrl = `${finalUrl}${separator}${searchParams.toString()}`;
  }

  // Устанавливаем заголовки по умолчанию, если они не переданы
  const headers = new Headers(fetchOptions.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    const response = await fetch(finalUrl, {
      ...fetchOptions,
      headers,
    });

    // Если ответ не OK, выбрасываем ошибку с текстом статуса
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    // Пытаемся распарсить JSON. Если API возвращает пустой ответ, обрабатываем это.
    const text = await response.text();
    if (!text) {
      return {} as T;
    }

    return JSON.parse(text) as T;
  } catch (error) {
    console.error('Ошибка в apiFetch:', error);
    throw error;
  }
}
