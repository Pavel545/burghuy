export async function POST(req) {
  try {
    const { name, text } = await req.json();

    const cleanName = String(name || "").trim();
    const cleanText = String(text || "").trim();

    if (!cleanName || !cleanText) {
      return Response.json({ error: "name/text required" }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return Response.json({ error: "Server is not configured" }, { status: 500 });
    }

    const message =
      `📝 Новый отзыв\n\n` +
      `👤 Имя: ${cleanName}\n\n` +
      `💬 Текст:\n${cleanText}`;

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const tgData = await tgRes.json().catch(() => ({}));

    if (!tgRes.ok || tgData?.ok === false) {
      return Response.json(
        { error: tgData?.description || "Telegram error" },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }
}
