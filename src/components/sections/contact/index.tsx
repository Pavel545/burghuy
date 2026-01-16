"use client";

import Image from "next/image";
import "./style.scss";

export default function Contact() {
  return (
    <section className="contact sect">
      <div className="container grid grid-cols-2">
        <div className="contact_info">
          <h2 className="h2">Контакты</h2>
          <a className="text-gold h1" href="tel:+78422271027">
            +7 (8422) 27-10-27
          </a>{" "}
          <br />
          <a className="text-gold mail" href="mailto:burzhuy73@mail.ru">
            burzhuy73@mail.ru
          </a>
          <div className="contact_lineInfo flex justify-between mb-6 mt-6">
            <p className="">АДРЕС</p>
            <a target="_blank" href="https://yandex.ru/maps/-/CLdTyWYe">г. Ульяновск, Пушкинская 4а</a>
          </div>
          <div className="contact_lineInfo flex justify-between">
            <p>ВРЕМЯ РАБОТЫ</p>
            <p>
              Вс-Чт: 12:00 - 03:00 <br />
              Пт-Сб: 12:00 - 06:00
            </p>
          </div>
        </div>
        <div className="contact_loc">
          <Image src={"/img/logo.png"} alt="Telegramm" width={200} height={100} />

          <a href="https://yandex.ru/maps/-/CLdTyWYe" className="butT1 mt-20">
            мы на карте 
          </a>
        </div>
      </div>
      <div className="container">
        <div className="contact_contact  flex justify-end gap-3 ">
          <a className="contact_contact_link" target="_blank" href="https://t.me/Burzyi_bot">
            <Image
              src={"/icons/tg.svg"}
              alt="Telegramm"
              width={80}
              height={80}
            />
          </a>
          {/* <a className="contact_contact_link" target="_blank" href="">
            <Image
              src={"/icons/watsapp.svg"}
              alt="Telegramm"
              width={80}
              height={80}
            />
          </a> */}
          <a className="contact_contact_link" target="_blank" href="https://vk.com/burzui_bot">
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
