"use client";

import "./style.scss";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const advantages = [
  {
    title: "СОВРЕМЕННЫЙ ЗАЛ",
    text: "Стильное пространство с торжественной атмосферой, идеально подходящее для любого мероприятия",
    icon: "/icons/adv-1.png", 
  },
  {
    title: "ИЗЫСКАННАЯ КУХНЯ",
    text: "Наше меню с авторскими и классическими блюдами, которые восхитят даже самых притязательных гостей",
    icon: "/icons/adv-2.png",
  },
  {
    title: "ДЕМОКРАТИЧНЫЕ ЦЕНЫ",
    text: "Мы предлагаем высокое качество еды и сервиса, сохраняя при этом приемлемый и прозрачный уровень цен",
    icon: "/icons/adv-3.png",
  },
  {
    title: "МОЖНО СВОЙ АЛКОГОЛЬ",
    text: "Мы с пониманием относимся к вашим пожеланиям и разрешаем принести свой алкоголь и напитки, что позволяет значительно сэкономить",
    icon: "/icons/adv-4.png",
  },
  {
    title: "БОГАТЫЕ НАРЕЗКИ",
    text: "Разрешаем приносить продукты для нарезок, а наши профессиональные повара превратят их в композиции, которые украсят ваш стол",
    icon: "/icons/adv-5.png",
  },
  {
    title: "ОБУЧЕНЫЙ ПЕРСОНАЛ",
    text: "Внимательные и вежливые официанты и компетентный управляющий, которые обеспечат безупречное проведение вашего праздника",
    icon: "/icons/adv-6.png",
  },
];

const slides = [
  { src: "/img/adv/1.jpg", alt: "Интерьер 1" },
  { src: "/img/adv/2.jpg", alt: "Интерьер 2" },
  { src: "/img/adv/3.jpg", alt: "Интерьер 3" },
  { src: "/img/adv/4.jpg", alt: "Интерьер 4" },
  { src: "/img/adv/5.jpg", alt: "Интерьер 5" },
  { src: "/img/adv/6.jpg", alt: "Интерьер 6" },
  { src: "/img/adv/7.jpg", alt: "Интерьер 7" },
];

export default function Advantages() {
  return (
    <section className="advantages">
      <div className="container">
        {/* В макете это выглядит как “пилюля” */}
        <div className="advantages__head">
          <h2 className="advantages__badge">Преимущества</h2>
        </div>

        <div className="advantages__grid">
          {advantages.map((item) => (
            <div className="advantages__card" key={item.title}>
              <div className="advantages__icon">
                <Image
                  src={item.icon}
                  alt=""
                  width={72}
                  height={72}
                  priority={false}
                />
              </div>

              <h3 className="advantages__title">{item.title}</h3>
              <p className="advantages__text">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="advantages__slider">
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            loop
            speed={600}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
          >
            {slides.map((s) => (
              <SwiperSlide key={s.src}>
                <div className="advantages__slide">
                  {/* Если не хочешь next/image — можно заменить на обычный <img /> */}
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="advantages__slideImg"
                    priority={false}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
