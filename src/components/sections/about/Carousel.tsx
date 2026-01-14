"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Slide = { src: string; alt: string };

export default function Carousel({
  slides,
  width = 1200,
  height = 700,
}: {
  slides: Slide[];
  width?: number;
  height?: number;
}) {
  const extended = useMemo(() => {
    if (slides.length === 0) return [];
    const first = slides[0];
    const last = slides[slides.length - 1];
    return [last, ...slides, first];
  }, [slides]);

  const [index, setIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);

  const trackRef = useRef<HTMLDivElement | null>(null);

  // drag/swipe refs
  const isDown = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const dx = useRef(0);
  const dy = useRef(0);
  const isHorizontal = useRef<boolean | null>(null);

  const realCount = slides.length;
  const realIndex = ((index - 1 + realCount) % realCount);

  const applyTransform = (i: number, px = 0) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translateX(calc(${-i * 100}% + ${px}px))`;
  };

  const goTo = (nextIndex: number) => {
    setIsAnimating(true);
    setIndex(nextIndex);
  };
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // бесшовный цикл на transition end
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onTransitionEnd = () => {
      if (index === 0) {
        setIsAnimating(false);
        setIndex(realCount);
      }
      if (index === realCount + 1) {
        setIsAnimating(false);
        setIndex(1);
      }
    };

    track.addEventListener("transitionend", onTransitionEnd);
    return () => track.removeEventListener("transitionend", onTransitionEnd);
  }, [index, realCount]);

  useEffect(() => {
    // когда прыгаем без анимации — сразу применим transform
    if (!isAnimating) applyTransform(index, 0);
    if (!isAnimating) {
      const t = requestAnimationFrame(() => setIsAnimating(true));
      return () => cancelAnimationFrame(t);
    }
  }, [isAnimating, index]);

  const onPointerDown = (e: React.PointerEvent) => {
    isDown.current = true;
    isHorizontal.current = null;

    startX.current = e.clientX;
    startY.current = e.clientY;
    dx.current = 0;
    dy.current = 0;

    setIsAnimating(false);
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDown.current) return;

    dx.current = e.clientX - startX.current;
    dy.current = e.clientY - startY.current;

    // определяем направление жеста один раз
    if (isHorizontal.current === null) {
      if (Math.abs(dx.current) < 6 && Math.abs(dy.current) < 6) return;
      isHorizontal.current = Math.abs(dx.current) > Math.abs(dy.current);
    }

    // если жест вертикальный — отдаём странице скролл
    if (!isHorizontal.current) {
      setIsAnimating(true);
      applyTransform(index, 0);
      return;
    }

    // горизонтальный — тянем трек
    // чуть “резины” для приятности
    const rubber = dx.current * 0.95;
    applyTransform(index, rubber);
  };

  const onPointerUp = () => {
    if (!isDown.current) return;
    isDown.current = false;

    // если это был вертикальный жест — ничего не делаем
    if (isHorizontal.current === false) return;

    const threshold = 70; // px
    const moved = dx.current;

    dx.current = 0;
    dy.current = 0;

    setIsAnimating(true);

    if (Math.abs(moved) > threshold) {
      if (moved < 0) next();
      else prev();
    } else {
      // snap back
      applyTransform(index, 0);
      setIndex((v) => v);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  return (
    <div className="cwrap" tabIndex={0} onKeyDown={onKeyDown} aria-label="carousel">
      <button className="cnav cnav--left" type="button" onClick={prev} aria-label="Previous slide">
        ‹
      </button>

      <div
        className="cviewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          ref={trackRef}
          className={`ctrack ${isAnimating ? "is-animating" : ""}`}
          style={{ transform: `translateX(${-index * 100}%)` }}
        >
          {extended.map((s, i) => (
            <div className={`cslide ${i === index ? "is-active" : ""}`} key={`${s.src}-${i}`}>
              <div className="cslide__inner">
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={width}
                  height={height}
                  className="cimg"
                  priority={i === index}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="cnav cnav--right" type="button" onClick={next} aria-label="Next slide">
        ›
      </button>

      <div className="cdots" aria-label="Pagination">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`cdot ${i === realIndex ? "is-active" : ""}`}
            onClick={() => goTo(i + 1)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
