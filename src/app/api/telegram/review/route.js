export async function POST(req) {
  try {
    const { name, text } = await req.json();

    const cleanName = String(name || "").trim();
    const cleanText = String(text || "").trim();

    if (!cleanName || !cleanText) {
      return Response.json({ error: "name/text required" }, { status: 400 });
    }

    const botUrl = process.env.REVIEWS_BOT_URL || "http://127.0.0.1:8081/review";
    const token = process.env.REVIEWS_API_TOKEN; // если добавишь защиту

    const res = await fetch(botUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ name: cleanName, text: cleanText }),
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