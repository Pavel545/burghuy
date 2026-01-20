"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const YM_ID = Number(process.env.NEXT_PUBLIC_YM_ID || 0);

export function YandexMetrikaRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!YM_ID) return;

    const qs = searchParams?.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;

    // безопасно: ym может быть ещё не загружен
    window.ym?.(YM_ID, "hit", url);
  }, [pathname, searchParams]);

  return null;
}
