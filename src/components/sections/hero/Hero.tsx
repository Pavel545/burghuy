"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import "./style.scss";

type Hall = {
  id: string;
  title: string;
  capacity: string;
  desc: string;
  bg: string; // путь к картинке
  bookHref: string; // куда бронировать
};

const halls: Hall[] = [
  {
    id: "hall-1",
    title: "Зал «Большой»",
    capacity: "до 80 гостей",
    desc: "Идеален для свадеб, корпоративов и больших банкетов.",
    bg: "/img/slide1.jpg",
    bookHref: "https://t.me/test5252525252Bot",
  },
  {
    id: "hall-2",
    title: "Зал «Камерный»",
    capacity: "до 35 гостей",
    desc: "Уютный формат для дней рождений и семейных событий.",
    bg: "/img/svadb.jpg",
    bookHref: "https://t.me/test5252525252Bot",
  },
];

function HallsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Esc + блокировка скролла + фокус
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    // фокус на панель
    setTimeout(() => panelRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modalOverlay"
      role="presentation"
      onMouseDown={(e) => {
        // закрываем только если клик по оверлею, а не по модалке
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modalPanel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="modalTop">
          <div className="modalTitleWrap">
            <p className="modalEyebrow">Выбор зала</p>
            <h3 className="modalTitle" id={titleId}>
              Какой зал вам подходит?
            </h3>
          </div>

          <button
            className="modalClose"
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <div className="modalGrid">
          {halls.map((h) => (
            <div
              key={h.id}
              className="hallCard"
              style={{ backgroundImage: `url(${h.bg})` }}
            >
              <div className="hallCardOverlay" />
              <div className="hallCardContent">
                <h4 className="hallTitle">{h.title}</h4>
                <p className="hallMeta">{h.capacity}</p>
                <p className="hallDesc">{h.desc}</p>

                <div className="hallActions">
                  <a
                    className="butT1 hallBookBtn"
                    href={h.bookHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Забронировать
                  </a>

                 
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="modalHint">
          Можно закрыть окно по <b>Esc</b> или кликом по фону.
        </p>
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
            <Image
              src={"/icons/loka.svg"}
              alt="Геолокация"
              width={54}
              height={54}
              priority
              className="loka"
            />
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
              href="https://t.me/test5252525252Bot"
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
            href="https://t.me/test5252525252Bot"
          >
            <Image src={"/icons/tg.svg"} alt="Telegramm" width={80} height={80} />
          </a>
          <a className="hero_content_contact_link" target="_blank" href="">
            <Image
              src={"/icons/watsapp.svg"}
              alt="Whatsapp"
              width={80}
              height={80}
            />
          </a>
          <a
            className="hero_content_contact_link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://vk.com/club235327813"
          >
            <Image src={"/icons/vk.svg"} alt="VK" width={80} height={80} />
          </a>
        </div>
      </div>

      <HallsModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
