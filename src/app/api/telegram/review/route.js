export async function POST(req) {
  try {
    const { name, text, phone } = await req.json();

    const cleanName = String(name || "").trim();
    const cleanText = String(text || "").trim();
    const cleanPhone = String(phone || "").trim();

    if (!cleanName || !cleanText) {
      return Response.json({ error: "name/text required" }, { status: 400 });
    }

    // ❗️Сюда ставим публичный URL nginx, чтобы работало из браузера/сервера
    const botUrl = process.env.REVIEWS_BOT_URL || "https://burzhui73.ru/review";
    const token = process.env.REVIEWS_API_TOKEN;

    const res = await fetch(botUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: Bearer ${token} } : {}),
      },
      body: JSON.stringify({
        name: cleanName,
        text: cleanText,
        phone: cleanPhone,
        page: req.headers.get("referer") || "", // или можно передать с клиента window.location.href
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return Response.json({ error: data?.error || "Bot endpoint error" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }
}