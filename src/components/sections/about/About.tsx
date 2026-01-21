"use client";

import Image from "next/image";
import "./style.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  { src: "/img/svadb.jpg", alt: "Фото зала" },
  { src: "/img/slide1.jpg", alt: "Фото зала" },
  { src: "/img/kitchen.jpg", alt: "Фото зала" },
];

export default function About() {
  return (
    <section className="about sect">
      <div className="container">
        <div className="about_content">
          <div className="about_content_left flex ">
            <h2 className="h1">
              БУРЖУЙ ИСКУССТВО <br /> СОБЫТИЙ
            </h2>
            <p className="about_content_left_ps">
              Мы подходим к организации каждого события с особым вниманием к&nbsp;дизайну, атмосфере и оригинальности, сочетая классические традиции
              с современными трендами. Наши профессионалы воплощают любые идеи,
              превращая их в настоящие произведения искусства, чтобы ваш
              праздник был не только красивым, но и наполненным смыслом,
              комфортом и неповторимой атмосферой. <br /> <br />
              Будь то элегантная свадьба, деловое мероприятие или роскошный
              вечер
            </p>
            <div className="about_content_left_link flex">
              <a
                href="https://t.me/Burzyi_bot"
                target="_blank"
                className="butT1"
              >
                Забронировать зал
              </a>

              <a
                className="link"
                href="https://yandex.ru/maps/-/CLdTyWYe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Найти нас на карте
              </a>
            </div>
          </div>

          <div className="about_content_slider">
            <Swiper
              className="aboutSwiper"
              modules={[Pagination]}
              loop
              centeredSlides
              slidesPerView="auto"
              spaceBetween={18}
              speed={650}
              grabCursor
              pagination={{
                clickable: true,
              }}
            >
              {slides.map((s, i) => (
                <SwiperSlide key={i} className="aboutSlide">
                  <div className="aboutSlideInner">
                    <Image src={s.src} alt={s.alt} width={400} height={600} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
