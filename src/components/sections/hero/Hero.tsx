"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
type Hall = {
  id: string;
  tabLabel: string;      // как в шапке
  titleTop: string;      // "Зал"
  title: string;         // "БУРЖУЙ"
  subtitle: string;      // строка мелким
  featuresTitle: string; // "Характеристика:"
  features: string[];
  fitsTitle: string;     // "Подходит для:"
  fits: string[];
  gallery: string[];
  bookHref: string;
};

const halls: Hall[] = [
  {
    id: "burzhuy",
    tabLabel: "ЗАЛ «БУРЖУЙ»",
    titleTop: "Зал",
    title: "БУРЖУЙ",
    subtitle: "вход со стороны УлГУ, с улицы 12 Сентября",
    featuresTitle: "Характеристика:",
    features: ["Вместительность — 40 человек", "Свой вход", "Свой туалет", "Свой гардероб"],
    fitsTitle: "Подходит для:",
    fits: ["Свадеб", "Юбилеев", "Корпоративов"],
    gallery: ["/img/halls/zal1/1.jpg", "/img/halls/zal1/2.jpg", "/img/halls/zal1/3.jpg", "/img/halls/zal1/4.jpg", "/img/halls/zal1/5.jpg", "/img/halls/zal1/6.jpg", "/img/halls/zal1/7.jpg"],
    bookHref: "https://t.me/Burzyi_bot",
  },
  {
    id: "dekanat",
    tabLabel: "ЗАЛ «КАФЕ ДЕКАНАТ»",
    titleTop: "Зал",
    title: "КАФЕ ДЕКАНАТ",
    subtitle: "вход со стороны УлГУ, с улицы 12 Сентября",
    featuresTitle: "Характеристика:",
    features: ["Вместительность — 40 человек", "Свой вход", "Свой туалет", "Свой гардероб"],
    fitsTitle: "Подходит для:",
    fits: ["Свадеб", "Юбилеев", "Корпоративов"],
    gallery: ["/img/halls/zal2/1.jpg", "/img/halls/zal2/2.jpg"],
    bookHref: "https://t.me/Burzyi_bot",
  },
];



function HallsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [activeId, setActiveId] = useState(halls[0]?.id ?? "");
  const activeHall = useMemo(
    () => halls.find((h) => h.id === activeId) ?? halls[0],
    [activeId]
  );

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    setTimeout(() => panelRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  // если модалка закрылась — можно сбрасывать на первый зал (по желанию)
  useEffect(() => {
    if (!open) return;
    if (!activeId) setActiveId(halls[0]?.id ?? "");
  }, [open, activeId]);

  if (!open || !activeHall) return null;

  return (
    <div
      className="hallsPop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="hallsPop__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
        tabIndex={-1}
      >
        {/* TOP BAR */}
        <div className="hallsPop__top">
          <div className="hallsPop__tabs" role="tablist" aria-label="Выбор зала">
            {halls.map((h) => {
              const checked = h.id === activeId;
              return (
                <button
                  key={h.id}
                  type="button"
                  className={`hallsPop__tab ${checked ? "is-active" : ""}`}
                  onClick={() => setActiveId(h.id)}
                  role="tab"
                  aria-selected={checked}
                >
                  <span className={`hallsPop__radio ${checked ? "is-on" : ""}`} />
                  <span className="hallsPop__tabText">{h.tabLabel}</span>
                </button>
              );
            })}
          </div>

          <div className="hallsPop__brand">
            <div className="hallsPop__logo">
              <Image src="/img/logo.png" alt="Буржуй" fill />
            </div>
          </div>

          <button
            className="hallsPop__close"
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="hallsPop__body">
          {/* LEFT */}
          <div className="hallsPop__left">
            <p className="hallsPop__eyebrow">{activeHall.titleTop}</p>
            <h3 className="hallsPop__title" id={titleId}>
              {activeHall.title}
            </h3>
            <p className="hallsPop__subtitle">{activeHall.subtitle}</p>

            <div className="hallsPop__block">
              <h4 className="hallsPop__h">{activeHall.featuresTitle}</h4>
              <ul className="hallsPop__list">
                {activeHall.features.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            <div className="hallsPop__block">
              <h4 className="hallsPop__h">{activeHall.fitsTitle}</h4>
              <ul className="hallsPop__list">
                {activeHall.fits.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            <a
              className="hallsPop__book"
              href={activeHall.bookHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Забронировать
            </a>
          </div>

          {/* RIGHT */}
          <div className="hallsPop__right">
            <Swiper
              modules={[Pagination, A11y]}
              pagination={{ clickable: true }}
              className="hallsPop__swiper"
            >
              {(activeHall.gallery || []).map((src, i) => (
                <SwiperSlide key={`${src}-${i}`}>
                  <div className="hallsPop__slide">
                    <Image src={src} alt={`${activeHall.title} фото ${i + 1}`} fill />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <section className="hero">
      <div className="container">
        <header className="hero_head">
          <a
            className="loka_box flex items-center gap-5"
            href="https://yandex.ru/maps/-/CLdTyWYe"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="lokaIcon"
              width="50"
              height="50"
              viewBox="0 0 50 50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="lokaGradient"
                  x1="16"
                  y1="25"
                  x2="34"
                  y2="25"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F7E579" />
                  <stop offset="1" stopColor="#DF9339" />
                </linearGradient>
              </defs>

              {/* фон-круг (прозрачный -> белый) */}
              <circle className="lokaBg" cx="25" cy="25" r="24.5" />

              {/* обводка всегда видна */}
              <circle className="lokaStroke" cx="25" cy="25" r="24.5" />

              {/* белая иконка (старт) */}
              <path
                className="lokaPath lokaWhite"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M33 22.5C33 26.6421 25.5 36 25.5 36C25.5 36 18 26.6421 18 22.5C18 18.3579 21.3579 15 25.5 15C29.6421 15 33 18.3579 33 22.5ZM25.5 26C27.433 26 29 24.433 29 22.5C29 20.567 27.433 19 25.5 19C23.567 19 22 20.567 22 22.5C22 24.433 23.567 26 25.5 26Z"
              />

              {/* градиентная иконка (hover) */}
              <path
                className="lokaPath lokaGrad"
                fill="url(#lokaGradient)"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M33 22.5C33 26.6421 25.5 36 25.5 36C25.5 36 18 26.6421 18 22.5C18 18.3579 21.3579 15 25.5 15C29.6421 15 33 18.3579 33 22.5ZM25.5 26C27.433 26 29 24.433 29 22.5C29 20.567 27.433 19 25.5 19C23.567 19 22 20.567 22 22.5C22 24.433 23.567 26 25.5 26Z"
              />
            </svg>

            <span>
              г. Ульяновск,
              <br /> Пушкинская 4а
            </span>
          </a>

          <a className="logo" href="">
            <Image
              src={"/img/logo.png"}
              alt="Логотип Буржуй"
              width={250}
              height={175}
              priority
            />
          </a>

          <a
            className="tel flex items-center justify-self-end"
            href="tel:+78422271027"
          >
            <Image
              src={"/icons/trub.svg"}
              alt="Телефон"
              width={60}
              height={60}
              priority
            />
            <span>+7 (8422) 27-10-27</span>
          </a>
        </header>
      </div>

      <div className="hero_content container flex">
        <div>
          <h1 className="h1">
            Мероприятия <br /> <span className="text-gold">в БУРЖУЙ</span>
          </h1>

          <p className="hero_content_ps">
            Полное закрытие заведения <br /> под любое мероприятие
          </p>

          <div className="hero_actions flex gap-14 mb-50 mt-27">
            <a
              href="https://t.me/Burzyi_bot"
              className="butT1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Забронировать под мероприятие
            </a>

            <button
              type="button"
              className="butT2"
              onClick={() => setOpen(true)}
            >
              Выбрать зал
            </button>
          </div>
        </div>

        <div className="hero_content_contact mb-20">
          <a
            className="hero_content_contact_link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://t.me/Burzyi_bot"
          >
            <svg
              className="tgIcon"
              width="100"
              height="100"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="tgGradient"
                  x1="33"
                  y1="50"
                  x2="67"
                  y2="50"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F7E579" />
                  <stop offset="1" stopColor="#DF9339" />
                </linearGradient>
              </defs>

              {/* фон круга (из прозрачного в белый) */}
              <rect
                className="tgBg"
                x="0.5"
                y="0.5"
                width="99"
                height="99"
                rx="49.5"
              />

              {/* обводка всегда видна */}
              <rect
                className="tgStroke"
                x="0.5"
                y="0.5"
                width="99"
                height="99"
                rx="49.5"
              />

              {/* белая стрелка (стартовое состояние) */}
              <path
                className="tgArrow tgArrowWhite"
                d="M66.9987 35.7995C67.0366 33.4067 66.2683 32.6692 64.7244 33.1297C64.4598 33.2092 64.1979 33.3163 63.9461 33.4418C54.5807 38.1099 45.2155 42.7777 35.854 47.4581C35.0401 47.865 34.1833 48.1909 33.4886 48.8855C32.7445 49.6305 32.8622 50.7169 33.7607 51.0979C35.668 51.9087 37.5789 52.7166 39.5369 53.3317C41.1935 53.8519 42.7134 53.6408 44.2068 52.3769C48.0529 49.1196 51.9812 46.0045 55.8805 42.8406C56.545 42.3019 57.2144 41.7649 57.9979 41.4972C58.2244 41.4192 58.4598 41.3488 58.6445 41.6028C58.828 41.8552 58.7444 42.1368 58.6483 42.3923C58.4927 42.81 58.3193 43.2277 58.0484 43.552C56.8981 44.9321 55.7489 46.3151 54.5781 47.6707C52.5242 50.0452 50.4436 52.3845 48.3971 54.7683C47.6935 55.5869 47.7302 56.6211 48.4173 57.4687C48.6375 57.7396 48.8805 57.9874 49.1299 58.2199C51.9383 60.8302 54.9515 63.0808 57.8876 65.4629C58.7838 66.1897 59.7583 66.7374 60.839 66.9562C61.7769 67.1459 62.4856 66.7175 62.9425 65.7108C63.2664 64.9978 63.3348 64.2083 63.4359 63.4342C64.375 56.3014 65.3077 49.167 66.233 42.0312C66.5228 39.7974 66.7835 37.5574 66.9987 35.7995Z"
              />

              {/* градиентная стрелка (ховер-состояние) */}
              <path
                className="tgArrow tgArrowGrad"
                fill="url(#tgGradient)"
                d="M66.9987 35.7995C67.0366 33.4067 66.2683 32.6692 64.7244 33.1297C64.4598 33.2092 64.1979 33.3163 63.9461 33.4418C54.5807 38.1099 45.2155 42.7777 35.854 47.4581C35.0401 47.865 34.1833 48.1909 33.4886 48.8855C32.7445 49.6305 32.8622 50.7169 33.7607 51.0979C35.668 51.9087 37.5789 52.7166 39.5369 53.3317C41.1935 53.8519 42.7134 53.6408 44.2068 52.3769C48.0529 49.1196 51.9812 46.0045 55.8805 42.8406C56.545 42.3019 57.2144 41.7649 57.9979 41.4972C58.2244 41.4192 58.4598 41.3488 58.6445 41.6028C58.828 41.8552 58.7444 42.1368 58.6483 42.3923C58.4927 42.81 58.3193 43.2277 58.0484 43.552C56.8981 44.9321 55.7489 46.3151 54.5781 47.6707C52.5242 50.0452 50.4436 52.3845 48.3971 54.7683C47.6935 55.5869 47.7302 56.6211 48.4173 57.4687C48.6375 57.7396 48.8805 57.9874 49.1299 58.2199C51.9383 60.8302 54.9515 63.0808 57.8876 65.4629C58.7838 66.1897 59.7583 66.7374 60.839 66.9562C61.7769 67.1459 62.4856 66.7175 62.9425 65.7108C63.2664 64.9978 63.3348 64.2083 63.4359 63.4342C64.375 56.3014 65.3077 49.167 66.233 42.0312C66.5228 39.7974 66.7835 37.5574 66.9987 35.7995Z"
              />
            </svg>
          </a>
          <a
            className="hero_content_contact_link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://vk.com/burzui_bot"
          >
            <svg
              className="waIcon"
              width="100"
              height="100"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="waGradient"
                  x1="28"
                  y1="50.5"
                  x2="72"
                  y2="50.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F7E579" />
                  <stop offset="1" stopColor="#DF9339" />
                </linearGradient>
              </defs>

              {/* фон круга (прозрачный -> белый) */}
              <rect
                className="waBg"
                x="0.5"
                y="0.5"
                width="99"
                height="99"
                rx="49.5"
              />

              {/* обводка всегда */}
              <rect
                className="waStroke"
                x="0.5"
                y="0.5"
                width="99"
                height="99"
                rx="49.5"
              />

              {/* белая иконка (старт) */}
              <path
                className="waPath waWhite"
                d="M53.6951 44.22H53.6854C53.6854 42.6423 53.6983 41.0656 53.6811 39.4879C53.6692 38.453 53.2068 38.0265 52.1177 38.0235C49.7652 38.0163 47.4125 38.0235 45.061 38.0193C44.4884 38.0182 43.9719 38.1419 43.6939 38.6651C43.4231 39.1739 43.6841 39.6105 44.0313 39.9751C45.1796 41.18 45.5246 42.63 45.5191 44.2026C45.5117 46.2251 45.5191 48.2488 45.5149 50.2714C45.5149 50.5279 45.5063 50.7863 45.4663 51.0396C45.2873 52.1828 44.6567 52.431 43.6517 51.7605C43.5342 51.6823 43.4308 51.5854 43.3229 51.4949C42.5207 50.8182 41.9127 49.9882 41.3109 49.1561C39.1632 46.183 37.7088 42.8854 36.4052 39.5188C35.9728 38.4035 35.4489 38.0296 34.1972 38.0256C32.6887 38.0204 31.1803 38.0286 29.672 38.0235C29.3053 38.0225 28.9559 38.0842 28.6261 38.2295C28.21 38.4128 27.9856 38.7372 28.0007 39.1677C28.0148 39.5589 28.0557 39.9575 28.1485 40.3386C28.6185 42.283 29.3657 44.1417 30.2542 45.9379C31.6126 48.6833 33.2343 51.29 35.0338 53.7975C37.5234 57.2672 40.5197 60.1784 44.6685 61.8181C47.1138 62.784 49.6379 63.2824 52.2914 62.784C53.3437 62.5863 53.6877 62.1846 53.6919 61.1547C53.6983 59.6975 53.6877 58.2403 53.6962 56.7832C53.7026 55.7893 54.1922 55.3835 55.2272 55.4896C55.5346 55.5205 55.8182 55.6235 56.0996 55.7409C56.864 56.0591 57.5314 56.5226 58.1632 57.0282C59.8848 58.4047 61.3819 59.9958 62.8781 61.5856L62.96 61.6728C63.7515 62.5142 64.6647 63.0435 65.9154 62.9972C67.2955 62.9456 68.6799 62.9839 70.0631 62.9868C70.3522 62.9868 70.6347 62.9653 70.9172 62.8982C71.757 62.6995 72.1549 62.0889 71.9446 61.2774C71.783 60.6542 71.4756 60.0807 71.1026 59.5626C69.84 57.8068 68.378 56.2074 66.8297 54.676C66.034 53.8882 65.1703 53.1653 64.4544 52.2981C63.9401 51.6751 63.925 51.1025 64.3789 50.4712C66.0448 48.1551 67.6934 45.8267 69.1748 43.3972C69.9337 42.1532 70.6875 40.9019 71.0358 39.4796C71.2308 38.6837 70.9074 38.2253 70.0546 38.1089C68.6432 37.9163 67.2221 38.0411 65.8064 38.0256C63.4635 37.9998 63.1369 38.247 62.2247 40.2923C61.1152 42.7772 59.6608 45.08 58.0285 47.2807C57.3718 48.1654 56.6116 48.9656 55.7341 49.6535C55.3038 49.9902 54.8089 50.3446 54.2192 50.0593C53.6726 49.7956 53.6994 49.2384 53.6962 48.7421C53.6898 47.2375 53.6951 45.7288 53.6951 44.22Z"
              />

              {/* градиентная иконка (hover) */}
              <path
                className="waPath waGrad"
                fill="url(#waGradient)"
                d="M53.6951 44.22H53.6854C53.6854 42.6423 53.6983 41.0656 53.6811 39.4879C53.6692 38.453 53.2068 38.0265 52.1177 38.0235C49.7652 38.0163 47.4125 38.0235 45.061 38.0193C44.4884 38.0182 43.9719 38.1419 43.6939 38.6651C43.4231 39.1739 43.6841 39.6105 44.0313 39.9751C45.1796 41.18 45.5246 42.63 45.5191 44.2026C45.5117 46.2251 45.5191 48.2488 45.5149 50.2714C45.5149 50.5279 45.5063 50.7863 45.4663 51.0396C45.2873 52.1828 44.6567 52.431 43.6517 51.7605C43.5342 51.6823 43.4308 51.5854 43.3229 51.4949C42.5207 50.8182 41.9127 49.9882 41.3109 49.1561C39.1632 46.183 37.7088 42.8854 36.4052 39.5188C35.9728 38.4035 35.4489 38.0296 34.1972 38.0256C32.6887 38.0204 31.1803 38.0286 29.672 38.0235C29.3053 38.0225 28.9559 38.0842 28.6261 38.2295C28.21 38.4128 27.9856 38.7372 28.0007 39.1677C28.0148 39.5589 28.0557 39.9575 28.1485 40.3386C28.6185 42.283 29.3657 44.1417 30.2542 45.9379C31.6126 48.6833 33.2343 51.29 35.0338 53.7975C37.5234 57.2672 40.5197 60.1784 44.6685 61.8181C47.1138 62.784 49.6379 63.2824 52.2914 62.784C53.3437 62.5863 53.6877 62.1846 53.6919 61.1547C53.6983 59.6975 53.6877 58.2403 53.6962 56.7832C53.7026 55.7893 54.1922 55.3835 55.2272 55.4896C55.5346 55.5205 55.8182 55.6235 56.0996 55.7409C56.864 56.0591 57.5314 56.5226 58.1632 57.0282C59.8848 58.4047 61.3819 59.9958 62.8781 61.5856L62.96 61.6728C63.7515 62.5142 64.6647 63.0435 65.9154 62.9972C67.2955 62.9456 68.6799 62.9839 70.0631 62.9868C70.3522 62.9868 70.6347 62.9653 70.9172 62.8982C71.757 62.6995 72.1549 62.0889 71.9446 61.2774C71.783 60.6542 71.4756 60.0807 71.1026 59.5626C69.84 57.8068 68.378 56.2074 66.8297 54.676C66.034 53.8882 65.1703 53.1653 64.4544 52.2981C63.9401 51.6751 63.925 51.1025 64.3789 50.4712C66.0448 48.1551 67.6934 45.8267 69.1748 43.3972C69.9337 42.1532 70.6875 40.9019 71.0358 39.4796C71.2308 38.6837 70.9074 38.2253 70.0546 38.1089C68.6432 37.9163 67.2221 38.0411 65.8064 38.0256C63.4635 37.9998 63.1369 38.247 62.2247 40.2923C61.1152 42.7772 59.6608 45.08 58.0285 47.2807C57.3718 48.1654 56.6116 48.9656 55.7341 49.6535C55.3038 49.9902 54.8089 50.3446 54.2192 50.0593C53.6726 49.7956 53.6994 49.2384 53.6962 48.7421C53.6898 47.2375 53.6951 45.7288 53.6951 44.22Z"
              />
            </svg>
          </a>
        </div>
      </div>

      <HallsModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
