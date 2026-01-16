"use client";

import React, { useMemo, useState, useEffect } from "react";
import "./style.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

type Slide = {
  name: string;
  date: string;
  text: string;
};

type ApiErr = { error: string };
const isApiErr = (v: unknown): v is ApiErr =>
  typeof v === "object" &&
  v !== null &&
  "error" in v &&
  typeof (v as any).error === "string";

export const Reviews: React.FC = () => {
  const slides = useMemo<Slide[]>(
    () => [
      {
        name: "RUSLAN P",
        date: "2 августа 2025",
        text: "Уютная обстановка, наличие стоянки для автомобилей, вход со двора большой плюс, так как можно постоять поговорить с компанией без лишнего шума проезжающих автомобилей. Вкусная кухня, отличный персонала. Чистота, порядок, наличие климат системы. ",
      },
      {
        name: "TanyaBryzz Ga",
        date: "25 декабря 2022",
        text: "Отмечали новогодний корпоратив. Очень приятная атмосфера. Развлечения на ура. Никакой пошлости. А самое главное очень вкусные и свежие блюда. Также для гостей приготовлены замечательные фотозоны.",
      },
      {
        name: "Екатерина Данилина",
        date: "28 декабря 2018",
        text: "31.08.18 праздновали свадьбу в этом заведении.Очень понравилось и нам самим и нашим гостям👍Спасибо персоналу ресторана, все было замечательно👌🏻",
      },
      {
        name: "Евгения Пичушкина",
        date: "24 июля 2025",
        text: 'От всей души хотим поблагодарить вас за прекрасную организацию нашего свадебного торжества! Всё было на высшем уровне: изысканная кухня, безупречное обслуживание, уютная атмосфера и внимание к деталям сделали этот день по-настоящему незабываемым. Отдельное спасибо за профессионализм, гибкость и тёплое отношение к нам и нашим гостям. Вы помогли воплотить наши мечты в жизнь, и мы с радостью будем рекомендовать "Буржуй" друзьям и знакомым.',
      },
      {
        name: "Наталья А",
        date: "8 сентября 2025",
        text: "Проводили 5.09.25г. корпоратив по поводу профессионального праздника. Хочу выразить огромную благодарность всему коллективу данного заведения начиная от официантов до управляющей . Весь персонал очень вежливый , внимательный . Кухня шикарная ! Очень вкусно ! Подача красивая ! Отдельный респект Софье Михайловне !!! Спасибо за наш праздник ! Вы большие молодцы!",
      },
      {
        name: "Катерина Умкина",
        date: "24 августа 2024",
        text: 'Праздновали в ресторане "Буржуй" свадьбу. Понравилось абсолютно всё: еда, персонал, помещение, атмосфера, цены. Заведение к тому же со своим декоратором и светомузыкой, что несомненно плюс! Безумно вкусно было.. Настолько, что пишу этот отзыв и от воспоминаний слюньки! Директор этого заведения и его официанты – очень доброжелательные люди. Работа декоратора – волшебная, выполнила все пожелания. Залы красивые, выглядят дорого. Я даже не знаю, что ещё сказать.. 10/10, надеюсь вернуться и отпраздновать что-либо, безграничное спасибо 😄♥️',
      },
    ],
    [],
  );

  // modal state
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const [status, setStatus] = useState<{
    type: "" | "success" | "error";
    msg: string;
  }>({
    type: "",
    msg: "",
  });

  const closeModal = () => {
    setOpen(false);
    setStatus({ type: "", msg: "" });
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("no-scroll");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("no-scroll");
    };
  }, [open]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    const cleanName = name.trim();
    const cleanText = text.trim();

    if (!cleanName || !cleanText) {
      setStatus({ type: "error", msg: "Заполните имя и текст отзыва." });
      return;
    }

    try {
      setSending(true);

      const res = await fetch("/api/telegram/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: cleanName, text: cleanText }),
      });

      const data: unknown = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = isApiErr(data) ? data.error : "Не удалось отправить отзыв";
        throw new Error(msg);
      }

      setStatus({ type: "success", msg: "Отзыв отправлен! Спасибо 🙌" });
      setName("");
      setText("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Ошибка отправки";
      setStatus({ type: "error", msg });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="reviews sect">
      <div className="container">
        <div className="reviews_head">
          <h2 className="h2">Отзывы о нас</h2>

          <button type="button" className="butT1" onClick={() => setOpen(true)}>
            Оставить отзыв
          </button>
        </div>

        <div className="reviews_slider">
          <Swiper
            modules={[Pagination, A11y, Mousewheel]}
            slidesPerView={3}
            spaceBetween={24}
            // drag мышью + touch
            simulateTouch
            grabCursor
            // чтобы на десктопе можно было "тянуть" без проблем
            resistanceRatio={0.6}
            // если хочешь листать колесом по горизонтали
            mousewheel={{ forceToAxis: true }}
            // точки
            pagination={{ clickable: true, el: ".reviews_pagination" }}
            // адаптив
            breakpoints={{
              0: { slidesPerView: 1.1, spaceBetween: 14 },
              560: { slidesPerView: 2, spaceBetween: 18 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
          >
            {slides.map((s, idx) => (
              <SwiperSlide key={idx}>
                <article className="reviews_card">
                  <div className="reviews_card_top">
                    <div>
                      <div className="reviews_name">{s.name}</div>
                      <div className="reviews_date">{s.date}</div>
                    </div>
                    <div className="reviews_quotes">“”</div>
                  </div>

                  <p className="reviews_text">{s.text}</p>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ВАЖНО: отдельный контейнер под пагинацию, чтобы стилизовать как нужно */}
          <div className="reviews_pagination" />

          <a
            className="events_conditions"
            href="https://yandex.ru/maps/org/klub_burzhuy/64697575235/reviews/?ll=48.376973%2C54.299299&z=16"
            target="_blank"
            rel="noopener noreferrer"
          >
            Больше о нас{" "}
          </a>
        </div>
      </div>

      {open && (
        <div className="reviews_modal" role="dialog" aria-modal="true">
          <button
            className="reviews_modal_backdrop"
            onClick={closeModal}
            aria-label="Закрыть"
          />

          <div className="reviews_modal_card">
            <div className="reviews_modal_head">
              <div className="reviews_modal_title">ОСТАВИТЬ ОТЗЫВ</div>
              <button
                className="reviews_modal_close"
                onClick={closeModal}
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>

            <form className="reviews_modal_body" onSubmit={submit}>
              <input
                className="reviews_input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                maxLength={60}
              />

              <textarea
                className="reviews_textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Напишите что вам понравилось..."
                maxLength={1200}
              />

              {status.msg && (
                <div
                  className={`reviews_status ${status.type === "success" ? "ok" : "err"}`}
                >
                  {status.msg}
                </div>
              )}

              <button className="butT1" type="submit" disabled={sending}>
                {sending ? "ОТПРАВКА..." : "РАЗМЕСТИТЬ"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
