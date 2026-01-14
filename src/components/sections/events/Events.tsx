"use client";

import Image from "next/image";
import "./style.scss";

const events = [
  {
    title: "Свадьбы",
    img: "/img/events/svadb.jpg",
    alt: "Организация свадьб",
    href: "#",
    area: "a",
  },
  {
    title: "Юбилеи",
    img: "/img/events/yub.jpg",
    alt: "Организация юбилеев",
    href: "#",
    area: "b",
  },
  {
    title: "Корпоративы",
    img: "/img/events/korp.jpg",
    alt: "Организация корпоративов",
    href: "#",
    area: "c",
  },
  {
    
    title: "Дни рождения",
    img: "/img/events/dr.jpg",
    alt: "Организация Дней рождений",
    href: "#",
    area: "d",
  },
  {
    title: "Банкеты",
    img: "/img/events/banket.jpg",
    alt: "Организация банкетов",
    href: "#",
    area: "e",
  },
];

export default function Events() {
  return (
    <section className="events sect">
      <div className="container">
        <h2 className="h2">Мероприятия</h2>

        <div className="events_grid">
          {events.map((ev) => (
            <article
              key={ev.title}
              className={`events_card area-${ev.area}`}
            >
              <div className="events_media">
                <Image
                  src={ev.img}
                  alt={ev.alt}
                  fill
                  sizes="(max-width: 420px) 92vw, (max-width: 1024px) 94vw, 1200px"
                  priority={ev.area === "a"}
                />
              </div>

              <div className="events_overlay" />

              <div className="events_info">
                <h3 className="events_title">{ev.title}</h3>

                <a className="events_btn butT1" href={ev.href}>
                  Узнать подробнее
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
