import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
}

interface OrderRequest {
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  comment?: string;
  items: OrderItem[];
  total_price: number;
}

export async function POST(request: NextRequest) {
  try {
    const data: OrderRequest = await request.json();

    // Basic validation
    if (!data.customer_name || !data.customer_phone || !data.delivery_address || !data.items || data.items.length === 0) {
      return NextResponse.json({ error: "Не все обязательные поля заполнены." }, { status: 400 });
    }

    // In a real application with Cloudflare D1 binding, we would do:
    // const { env } = getRequestContext(); // or use process.env.DB if bound globally
    // const db = process.env.DB as D1Database;

    // const { results: orderResult } = await db.prepare(
    //   `INSERT INTO orders (customer_name, customer_phone, delivery_address, total_price, status)
    //    VALUES (?, ?, ?, ?, 'pending') RETURNING id`
    // ).bind(data.customer_name, data.customer_phone, data.delivery_address, data.total_price).all();
    // const orderId = orderResult[0].id;

    // For each item:
    // await db.prepare(`INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`).bind(orderId, item.product_id, item.quantity, item.price).run();

    // Mocking the DB insertion success and getting an ID
    const mockOrderId = Math.floor(Math.random() * 10000);

    // Call local telegram-webhook to send notification (Triggered internally)
    const baseUrl = request.nextUrl.origin;

    // We send a custom internal payload to our webhook endpoint so it can process it.
    // Since it's an internal call, we format it as a special message update that the webhook will recognize.
    try {
      const messageText = `INTERNAL_ORDER|${mockOrderId}|${data.customer_name}|${data.customer_phone}|${data.total_price}|${data.items.length}`;

      await fetch(`${baseUrl}/api/telegram-webhook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          update_id: Date.now(),
          message: {
            message_id: Date.now(),
            from: { id: 0, is_bot: false, first_name: "System" },
            chat: { id: 0, type: "private" },
            date: Math.floor(Date.now() / 1000),
            text: messageText,
          }
        }),
      });
    } catch (e) {
      console.error("Не удалось отправить уведомление в webhook:", e);
      // We don't fail the order if notification fails
    }

    // Return success to client. The client is responsible for calling clearCart() upon success.
    return NextResponse.json({ success: true, orderId: mockOrderId }, { status: 201 });

  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}
