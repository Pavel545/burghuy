"use client";

import Image from "next/image";
import "./style.scss";

export default function Menu() {
  return (
    <section className="menu sect">
      <div className="container">
        <h2 className="h2">Меню</h2>

        <div className="menu_content">
          <div className="item ">
            <div className="item_gallary i-1">
              <div>
                <Image
                  src={"/img/bar.jpg"}
                  alt="бар"
                  width={100}
                  height={200}
                />
              </div>
              <div>
                <Image
                  src={"/img/bar.jpg"}
                  alt="бар"
                  width={100}
                  height={200}
                />
              </div>
              <div>
                <Image
                  src={"/img/bar.jpg"}
                  alt="бар"
                  width={100}
                  height={200}
                />
              </div>
              <div>
                <Image
                  src={"/img/bar.jpg"}
                  alt="бар"
                  width={100}
                  height={200}
                />
              </div>
            </div>
            <h3 className="h3">Бар</h3>
          </div>

          <div className="item ">
            <div className="item_gallary i-2">
              <div>
                <Image
                  src={"/img/bar.jpg"}
                  alt="бар"
                  width={100}
                  height={200}
                />
              </div>
              <div>
                <Image
                  src={"/img/bar.jpg"}
                  alt="бар"
                  width={100}
                  height={200}
                />
              </div>
              <div>
                <Image
                  src={"/img/bar.jpg"}
                  alt="бар"
                  width={100}
                  height={200}
                />
              </div>
            </div>
            <h3 className="h3">Кухня</h3>
          </div>

          <div className="item ">
            <div className="item_gallary i-3">
              {" "}
              <div>
                <Image
                  src={"/img/bar.jpg"}
                  alt="бар"
                  width={100}
                  height={200}
                />
              </div>
            </div>
            <h3 className="h3">Бар</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
