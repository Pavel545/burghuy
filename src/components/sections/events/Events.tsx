"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "./style.scss";
import { title } from "process";
import { text } from "stream/consumers";

const events = [
  {
    title: "Свадьбы",
    img: "/img/events/svadb.jpg",
    alt: "Организация свадьб",
    href: "https://t.me/Burzyi_bot",
    area: "a",
  },
  {
    title: "Юбилеи",
    img: "/img/events/yub.jpg",
    alt: "Организация юбилеев",
    href: "https://t.me/Burzyi_bot",
    area: "b",
  },
  {
    title: "Корпоративы",
    img: "/img/events/korp.jpg",
    alt: "Организация корпоративов",
    href: "https://t.me/Burzyi_bot",
    area: "c",
  },
  {
    title: "Дни рождения",
    img: "/img/events/dr.jpg",
    alt: "Организация Дней рождений",
    href: "https://t.me/Burzyi_bot",
    area: "d",
  },
  {
    title: "Банкеты",
    img: "/img/events/banket.jpg",
    alt: "Организация банкетов",
    href: "https://t.me/Burzyi_bot",
    area: "e",
  },
];

const conditions = [
  {
    title: "Минимальная сумма заказа на одну персону — не менее 2 500 ₽",
    text:
      "На данную сумму Заказчик набирает блюда по предложенному меню (к примеру: салат, закуски, 2 горячих блюда). " +
      "Если будет нужна помощь в выборе меню либо дополнительные блюда, которые не представлены в меню — всё это обсуждается отдельно по вашему желанию с зав. производством.",
  },
  {
    title:
      "При заказе банкета менее 30 человек — депозит зала составляет 85 000 ₽",
  },
  {
    title: "Разрешено приносить",
    text:
      "Дополнительно разрешается приносить: вино-водочные изделия, соки, воды, так же по вашему желанию продукты для мясной, рыбной, овощной нарезки, фрукты, сладости для чайного стола. " +
      "Кол-во необходимых продуктов и напитков обсуждается так же с зав. производством. " +
      "За работу поварам, которые нарежут и украсят ваши блюда, необходима дополнительная оплата — 100 ₽ за одну тарелку одного вида нарезки.",
  },
  {
    title: "Принадлежности для сбора продуктов и напитков",
    text: "Не забывайте привозить принадлежности для сбора продуктов и напитков, которые останутся после торжества: контейнеры, боксы, пакеты.",
  },
  {
    title: "Дополнительные продукты",
    text: "Дополнительные продукты, привозимые Заказчиком, необходимо доставить в ресторан в предыдущий день до торжества до 15:00.",
  },
  {
    title: "Завозить продукты необходимо в разгрузочную зону ресторана",
    text: "В конце здания напротив магазина «Гулливер», предварительно позвонив по телефону 27-10-27, чтобы вас встречали.",
  },

  {
    title: "В подарок заведение для вас наряжает зал",
    text: "Белые чехлы на стулья с белыми бантами, белые скатерти до пола на столах, имеются большие вазы с букетами из белых веток, так же белыми ветками с хрусталем декорирован потолок",
  },
  {
    title: "Фотозона",
    text: "Оформление фотозоны, а так же зоны для жениха и невесты оплачивается отдельно, и всё согласовывается по вашему желанию с оформителем ресторана — Светланой: 8-906-391-17-96",
  },
  {
    title: "Дополнительная техника",
    text: "В зале имеется видеопроектор, который демонстрирует видео по всему залу, на всех экранах телевизоров, так же имеется профессиональный свет для дискотеки — все это заведение предоставляет вам бесплатно. По вашему желанию вы выбираете ведущих для своего торжества, они работают в нашем зале со своей звуковой аппаратурой",
  },
  {
    title: "Предоплата",
    text: "При заключении договора необходима предоплата в размере не менее 10 000 ₽ (при себе иметь паспорт)",
  },
  {
    title: "Расчет",
    text: "Окончательный расчет — за 10 дней до мероприятия",
  },
  {
    title: "Подтверждение гостей и рассадка",
    text: "За 3 дня до мероприятия — окончательное утверждение количества гостей, их рассадки за столами",
  },
  {
    title: "Время на мероприятие",
    text: "Отведено — 5 часов, устанавливается по желанию заказчика (например: с 17:00 до 22:00) + за пятым часом предоставляется время для сбора и отправки гостей по домам. Если заказчик желает продлить торжество, то следующий час за пятым часом оплачивается дополнительно — 5 000 ₽ за 1 час. Всё это решается с администрацией заведения на месте в конце торжества, и после этого так же время на сборы",
  },
  {
    title: "Бой посуды",
    text: "По окончанию банкета представитель администрации вместе со старшим официантом, при наличии боя посуды, предоставляет заказчику разбитую посуду, которую заказчик оплачивает согласно конфликт-меню, либо это оплачивает виновник боя посуды",
  },
];

export default function Events() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <section className="events sect">
      <div className="container">
        <div className="flex justify-between items-center mb-12">
          <h2 className="h2">Мероприятия</h2>

          <p
            className="events_conditions"
            role="button"
            tabIndex={0}
            onClick={() => setIsOpen(true)}
            onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
          >
            Условия проведения
          </p>
        </div>

        <div className="events_grid">
          {events.map((ev) => (
            <article key={ev.title} className={`events_card area-${ev.area}`}>
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
                <a className="events_btn butT1" target="_blank" href={ev.href}>
                  Узнать подробнее
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* POPUP УСЛОВИЙ */}
      {isOpen && (
        <div
          className="eventsPop"
          role="dialog"
          aria-modal="true"
          aria-label="Условия проведения торжества"
          onMouseDown={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <div className="eventsPop__panel">
            <div className="eventsPop__head flex justify-between items-center">
              <h3 className="eventsPop__title">
                УСЛОВИЯ ПРОВЕДЕНИЯ ТОРЖЕСТВА В РЕСТОРАНЕ «БУРЖУЙ»
              </h3>

              {/* Логотип — если есть файл, раскомментируй и укажи путь */}
              <div className="eventsPop__logo">
                <Image src="/img/logo.png" alt="Буржуй" fill />
              </div>

              <button
                type="button"
                className="eventsPop__close"
                aria-label="Закрыть"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="eventsPop__body">
              {conditions.map((item, idx) => (
                <div className="eventsPop__row" key={idx}>
                  <div className="eventsPop__num">{idx + 1}.</div>

                  <div className="eventsPop__content">
                    <div className="eventsPop__rowTitle">{item.title}</div>
                    {item.text && (
                      <div className="eventsPop__rowText">{item.text}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="eventsPop__foot">
              <div className="eventsPop__contact">
                <div className="eventsPop__contactName">
                  Софья Михайловна <span>(вопросы по меню)</span>
                </div>
                <a className="eventsPop__phone" href="tel:+79603784794">
                  8 (960) 378-47-94
                </a>
              </div>

              <div className="eventsPop__contact">
                <div className="eventsPop__contactName">
                  Татьяна Владимировна <span>(организационные вопросы)</span>
                </div>
                <div className="eventsPop__phones">
                  <a className="eventsPop__phone" href="tel:+79510990920">
                    8 (951) 099-09-20;
                  </a>

                  <a className="eventsPop__phone" href="tel:+7271027">
                    27-10-27
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
