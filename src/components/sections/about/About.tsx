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
        <h2 className="h2">О заведении</h2>

        <div className="about_content">
          <div className="about_content_left flex ">
            <p className="h1">
              <span className="text-gold">БУРЖУЙ</span> <br /> ИСКУССТВО <br />{" "}
              СОБЫТИЙ
            </p>

            <div className="about_content_left_link flex">
              <button className="butT1">Забронировать зал</button>

              <a
                className="about_mapGo"
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
              >
                Посмотреть местоположение на карте
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
