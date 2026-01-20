import React, { useEffect, useMemo, useState } from "react";

export type CookieConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string | null; // ISO
};

export type CookieConsentProps = {
  siteName?: string;
  policyUrl?: string;
  storageKey?: string;
  /** вызывается после сохранения/загрузки consent */
  onChange?: (consent: CookieConsentState) => void;
};

/**
 * Дополнительно: можно открыть настройки из футера/страницы privacy:
 * window.dispatchEvent(new Event("open-cookie-settings"))
 */
const OPEN_EVENT = "open-cookie-settings";

export function CookieConsent({
  siteName = "burzhui73.ru",
  policyUrl = "/privacy",
  storageKey = "cookie_consent_v1",
  onChange,
}: CookieConsentProps) {
  const base = useMemo<CookieConsentState>(
    () => ({
      necessary: true,
      analytics: false,
      marketing: false,
      decidedAt: null,
    }),
    []
  );

  const [visible, setVisible] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [consent, setConsent] = useState<CookieConsentState>(base);
  const [draft, setDraft] = useState<CookieConsentState>(base);

  // load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) {
        setVisible(true);
        return;
      }
      const parsed = JSON.parse(raw) as Partial<CookieConsentState> | null;

      if (parsed && parsed.necessary === true) {
        const normalized: CookieConsentState = {
          ...base,
          analytics: Boolean(parsed.analytics),
          marketing: Boolean(parsed.marketing),
          decidedAt: typeof parsed.decidedAt === "string" ? parsed.decidedAt : null,
          necessary: true,
        };
        setConsent(normalized);
        setDraft(normalized);
        setVisible(false);
        onChange?.(normalized);
      } else {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, [base, onChange, storageKey]);

  // global opener for permanent access (footer/link)
  useEffect(() => {
    const handler = () => {
      setDraft(consent?.decidedAt ? consent : base);
      setDrawerOpen(true);
      setVisible(true); // если было скрыто — пусть управление откроется
    };
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, [base, consent]);

  const save = (next: Partial<CookieConsentState>) => {
    const payload: CookieConsentState = {
      ...base,
      ...consent,
      ...next,
      necessary: true,
      decidedAt: new Date().toISOString(),
    };
    setConsent(payload);
    setDraft(payload);
    localStorage.setItem(storageKey, JSON.stringify(payload));
    setVisible(false);
    setDrawerOpen(false);
    onChange?.(payload);
  };

  const acceptAll = () => save({ analytics: true, marketing: true });
  const acceptNecessary = () => save({ analytics: false, marketing: false });

  const openSettings = () => {
    setDraft(consent?.decidedAt ? consent : base);
    setDrawerOpen(true);
  };

  const toggle = (key: "analytics" | "marketing") => {
    setDraft((p) => ({ ...p, [key]: !p[key] }));
  };

  if (!visible) return null;

  return (
    <>
      {/* compact bar */}
      {!drawerOpen && (
        <div className="cookieMiniBar">
          <div className="cookieMiniInner uiPanel">
            <div className="cookieMiniRow">
              <div className="cookieMiniText">
                <span className="uiGoldText" style={{ fontWeight: 500 }}>
                  Cookies
                </span>{" "}
                — нужны для работы сайта и улучшений.{" "}
                <a className="cookieLink" href={policyUrl}>
                  Подробнее
                </a>
                .
              </div>

              <div className="cookieMiniActions">
                <button className="uiBtnGhost" onClick={openSettings}>
                  Настроить
                </button>
                <button className="butT2 uiBtnTiny" onClick={acceptNecessary}>
                  Только нужные
                </button>
                <button className="butT1 uiBtnTiny" onClick={acceptAll}>
                  Принять
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* drawer */}
      {drawerOpen && (
        <div
          className="uiOverlay"
          role="dialog"
          aria-modal="true"
          aria-label="Настройки cookies"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setDrawerOpen(false);
          }}
        >
          <div className="uiDrawer uiPanel">
            <div className="uiDrawerHead">
              <div style={{ display: "grid", gap: 6 }}>
                <div style={{ fontSize: 18, fontWeight: 500 }}>
                  <span className="uiGoldText">Настройки cookies</span>
                </div>
                <div className="cookieMiniText" style={{ maxWidth: 620 }}>
                  Обязательные cookies включены всегда. Остальные — по вашему выбору.
                </div>
              </div>
              <button className="uiClose" onClick={() => setDrawerOpen(false)} aria-label="Закрыть">
                ×
              </button>
            </div>

            <div className="cookieOpt">
              <div className="cookieOptTop">
                <div className="cookieOptName">Обязательные</div>
                <div className="sw2" data-on="true" aria-disabled="true">
                  <div className="sw2Dot" />
                </div>
              </div>
              <div className="cookieOptDesc">
                Нужны для корректной работы сайта (навигация, безопасность, формы).
              </div>
            </div>

            <div className="cookieOpt">
              <div className="cookieOptTop">
                <div className="cookieOptName">Аналитика</div>
                <div
                  className="sw2"
                  data-on={String(draft.analytics)}
                  role="switch"
                  aria-checked={draft.analytics}
                  tabIndex={0}
                  onClick={() => toggle("analytics")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggle("analytics");
                  }}
                >
                  <div className="sw2Dot" />
                </div>
              </div>
              <div className="cookieOptDesc">
                Помогает понимать, что улучшать на сайте (обезличенная статистика).
              </div>
            </div>

            <div className="cookieOpt">
              <div className="cookieOptTop">
                <div className="cookieOptName">Маркетинг</div>
                <div
                  className="sw2"
                  data-on={String(draft.marketing)}
                  role="switch"
                  aria-checked={draft.marketing}
                  tabIndex={0}
                  onClick={() => toggle("marketing")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggle("marketing");
                  }}
                >
                  <div className="sw2Dot" />
                </div>
              </div>
              <div className="cookieOptDesc">
                Используется для оценки эффективности рекламы и персонализации (если применяется).
              </div>
            </div>

            <div className="drawerActions">
              <button className="uiBtnGhost" onClick={acceptNecessary}>
                Отклонить необязательные
              </button>
              <button className="butT2 uiBtnTiny" onClick={() => save(draft)}>
                Сохранить
              </button>
              <button className="butT1 uiBtnTiny" onClick={acceptAll}>
                Принять все
              </button>
            </div>

            <div className="cookieMiniText" style={{ marginTop: 10 }}>
              {siteName}:{" "}
              <a className="cookieLink" href={policyUrl}>
                политика конфиденциальности
              </a>
            
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** helper: вызвать откуда угодно (футер/страница privacy) */
export function openCookieSettings(): void {
  window.dispatchEvent(new Event(OPEN_EVENT));
}
