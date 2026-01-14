"use client";

import Image from "next/image";

import "./style.scss";

export default function Events() {
  return (
    <section className="events sect">
      <div className="container">
        <h2 className="h2">Мероприятия</h2>

        <div className="events_content ">
          <div className="item">
            <div className="item_img">
                <Image
              src={"/img/svadb.jpg"}
              alt="Организация свадьб"
              width={500}
              height={200}
            />
            </div>

            <h3 className="title">Свадьбы</h3>

            <button className="butT1">
                Узнать подробнее
            </button>
          </div>
          <div className="item">
            <div className="item_img">
                <Image
              src={"/img/korp.jpg"}
              alt="Организация корпоративов"
              width={500}
              height={200}
            />
            </div>
            
            <h3 className="title">Корпоративы</h3>
            <button className="butT1">
                Узнать подробнее
            </button>
          </div>
          <div className="item">
            <div className="item_img">
                <Image
              src={"/img/dr.jpg"}
              alt="Организация Дней рождений"
              width={500}
              height={200}
            />
            </div>
            <h3 className="title">Дни рождения</h3>

            <button className="butT1">
                Узнать подробнее
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
