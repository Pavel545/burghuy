"use client";

import Image from "next/image";
import "./style.scss";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <header className="hero_head">
          <a
            className="loka_box flex items-center gap-5"
            href="http://"
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
              className=""
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
              className=""
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
            <button className="butT1">Забронировать под мероприятие</button>

            <button className="butT2">Выбрать зал</button>
          </div>
        </div>
        <div className="hero_content_contact mb-20">
          <a className="hero_content_contact_link" href="">
            <Image
              src={"/icons/tg.svg"}
              alt="Telegramm"
              width={80}
              height={80}
            />
          </a>
          <a className="hero_content_contact_link" href="">
            <Image
              src={"/icons/watsapp.svg"}
              alt="Telegramm"
              width={80}
              height={80}
            />
          </a>
          <a className="hero_content_contact_link" href="">
            <Image
              src={"/icons/vk.svg"}
              alt="Telegramm"
              width={80}
              height={80}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
