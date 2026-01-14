"use client";

import Image from "next/image";
import "./style.scss";

export default function Contact() {
  return (
    <section className="contact sect">
      <div className="container grid grid-cols-2">
        <div className="contact_info">
            <h2 className="h2">
                Контакты
            </h2>
            <a className="text-gold" href="tel:+78422271027">
               +7 (8422) 27-10-27
            </a>
            <a className="text-gold" href="mailto:burzhuy73@mail.ru">burzhuy73@mail.ru</a>

            <div className="">
                <p>
                    АДРЕС
                </p>
                <a href="">
                    г. Ульяновск, Пушкинская 4а
                </a>
            </div>
              <div className="">
                <p>
                    ВРЕМЯ РАБОТЫ
                </p>
                <p >
                    Вс-Чт: 12:00 - 03:00 <br />
                    Пт-Сб: 12:00 - 06:00
                </p>
            </div>
        </div>
        <div className="contact_loc"></div>
      </div>
      <div className="container flex justify-end">
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
    </section>
  );
}
