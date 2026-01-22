"use client";

import Events from "@/components/sections/events/Events";
import Menu from "@/components/sections/menu/Menu";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Telegram?: any;
  }
}

export default function TgPage() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    tg.ready();          // сообщаем Telegram что приложение готово
    tg.expand();         // раскрыть по высоте (по желанию)
    setUser(tg.initDataUnsafe?.user ?? null);
    setReady(true);

    // пример: кнопка снизу в Telegram
    tg.MainButton.setText("Готово");
    tg.MainButton.show();
    tg.MainButton.onClick(() => {
      tg.close();        // закрыть мини-апп
    });

    return () => {
      try {
        tg.MainButton.offClick(() => {});
      } catch {}
    };
  }, []);

  return (
    <main style={{ padding: 16 }}>
     <Events />
     <Menu />
    </main>
  );
}
