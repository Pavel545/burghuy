"use client";

import { use, useEffect } from "react";
import "./style.scss";

export default function Modal({ header, children, isActive, onClose }: { header?: React.ReactNode, children?: React.ReactNode, isActive?: boolean, onClose?: () => void }) {


    useEffect(() => {
        if (isActive) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isActive]);
  return (
    <div onClick={onClose} className={`modal ${isActive ? "modal_active" : ""}`}>
      <div className="modal_content" onClick={(e)=> e.stopPropagation()}>
        {header && <div className="modal_header">{header}<button
            className="modal__close"
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
          >
            ×
          </button></div>}
        <div className="modal_body">{children}</div>{" "}
        <div className="modal_footer">
          <div className="modal_footer__contact">
            <div className="modal_footer__contactName">
              Софья Михайловна <span>(вопросы по меню)</span>
            </div>
            <a className="modal_footer__phone" href="tel:+79603784794">
              8 (960) 378-47-94
            </a>
          </div>

          <div className="modal_footer__contact">
            <div className="modal_footer__contactName">
              Татьяна Владимировна <span>(организационные вопросы)</span>
            </div>
            <div className="modal_footer__phones">
              <a className="modal_footer__phone" href="tel:+79510990920">
                8 (951) 099-09-20;
              </a>

              <a className="modal_footer__phone" href="tel:+7271027">
                27-10-27
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
