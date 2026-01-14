"use client";

import Image from "next/image";
import"./style.scss";

export default function Footer() {
    

    return (
        <footer className="footer">
            <div className="container ">
                    <a className="footer_logo" href="/">
                <Image src={'/img/logo.png'} alt="Логотип" width={200} height={100} />
                
                </a>

                <p className="footer_avtor">
                    ©2025 Буржуй. Все права защищены
                </p>
            </div>
        </footer>
    )
}