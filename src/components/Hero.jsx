import { useEffect, useRef, useState } from "react";
import { site } from "../content/site.js";
import { RequestButton } from "./RequestButton.jsx";
import { Navigation } from "./Navigation.jsx";
import { useReducedMotion } from "../lib/useReducedMotion.js";
import "./Hero.css";

const slides = [
  {
    image: "/img/header/background__header-two.jpg",
    title: "Укладка",
    detail: "плитки",
    label: "Укладка плитки",
    href: "/styling.html",
    description:
      "Укладка плитки на стену и на пол. Ремонт ванных комнат под ключ.",
    alt: "Интерьер ванной с отделкой из плитки под мрамор",
  },
  {
    image: "/img/portfolio/main/bathroom/bathroom_one.jpg",
    title: "Ремонт ванных",
    detail: "под ключ",
    label: "Ремонт ванных",
    href: "/bathroom.html",
    description:
      "Отделка стен и пола плиткой. Монтаж ванны, раковины и смесителей.",
    alt: "Ремонт ванной комнаты",
  },
  {
    image: "/img/header/background__header-three.jpg",
    title: "Фотоплитка",
    detail: "",
    label: "Фотоплитка",
    href: "/phototile.html",
    description: "Изготовление и укладка фотоплитки для вашего интерьера.",
    alt: "Фотоплитка в интерьере",
  },
];

export function Hero({ page }) {
  const initial =
    page.key === "bathroom" ? 1 : page.key === "phototile" ? 2 : 0;
  const [active, setActive] = useState(initial);
  const [animateSlide, setAnimateSlide] = useState(false);
  const [playing, setPlaying] = useState(true);
  const reducedMotion = useReducedMotion();
  const isPlaying = playing && !reducedMotion;
  const playbackBeforePointer = useRef(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    if (!isPlaying || hovered) return;
    const timer = setInterval(() => {
      if (!document.hidden) {
        setAnimateSlide(true);
        setActive((index) => (index + 1) % slides.length);
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, hovered]);
  const move = (direction) => {
    setPlaying(false);
    setAnimateSlide(true);
    setActive((index) => (index + direction + slides.length) % slides.length);
  };
  return (
    <header
      className="promo site-hero"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setPlaying(false)}
    >
      <div className="site-hero__header site-hero__container">
        <a
          className="site-hero__brand"
          href="/"
          aria-label={`${site.name} — главная`}
        >
          <img src={site.logo} alt={site.name} width="968" height="658" />
        </a>
        <nav className="site-hero__nav" aria-label="Услуги">
          {slides.map((slide) => (
            <a
              key={slide.href}
              href={slide.href}
              aria-current={page.path === slide.href ? "page" : undefined}
            >
              {slide.label}
            </a>
          ))}
        </nav>
        <div className="site-hero__contact">
          <a className="site-hero__phone" href={site.phoneHref}>
            <span>Позвоните нам</span>
            {site.phoneLabel}
          </a>
          <Navigation page={page} />
        </div>
      </div>
      <div
        className="site-hero__slides"
        role="region"
        aria-label="Наши услуги"
        aria-roledescription="карусель"
        aria-live={isPlaying ? "off" : "polite"}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`hero-slide${animateSlide ? " hero-slide_enter" : ""}`}
            hidden={index !== active}
            aria-label={`${index + 1} из ${slides.length}`}
            role="group"
            aria-roledescription="слайд"
          >
            <img
              className="site-hero__image"
              src={slide.image}
              alt={slide.alt}
              fetchPriority={index === initial ? "high" : undefined}
              loading={index === initial ? "eager" : "lazy"}
            />
            <div className="site-hero__body site-hero__container">
              <div className="site-hero__copy">
                <p className="site-hero__eyebrow">
                  {site.name} · Лучшие в своём деле
                </p>
                <h2 className="site-hero__title">
                  {slide.title}
                  {slide.detail && (
                    <>
                      {" "}
                      <span>{slide.detail}</span>
                    </>
                  )}
                </h2>
                <p className="site-hero__description">{slide.description}</p>
                <div className="site-hero__actions">
                  <RequestButton className="site-hero__request promo__button">
                    Оставить заявку
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 12h15m-6-6 6 6-6 6" />
                    </svg>
                  </RequestButton>
                  <a
                    className="site-hero__portfolio"
                    href={
                      page.key === "confidentiality"
                        ? "/#portfolio"
                        : "#portfolio"
                    }
                  >
                    Наши работы <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="site-hero__footer site-hero__container">
        <div className="site-hero__services" aria-label="Выбрать слайд">
          {slides.map((slide, index) => (
            <button
              key={slide.label}
              type="button"
              aria-pressed={active === index}
              onClick={() => {
                setPlaying(false);
                setAnimateSlide(true);
                setActive(index);
              }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {slide.label}
            </button>
          ))}
        </div>
        <div className="site-hero__controls">
          <span className="site-hero__count" aria-hidden="true">
            <strong>{String(active + 1).padStart(2, "0")}</strong> / 03
          </span>
          <button
            type="button"
            className="site-hero__arrow"
            onClick={() => move(-1)}
            aria-label="Предыдущий слайд"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m14 6-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            className="site-hero__arrow hero-play"
            aria-label={
              isPlaying ? "Остановить слайд-шоу" : "Запустить слайд-шоу"
            }
            aria-pressed={isPlaying}
            onPointerDown={() => {
              // Focus pauses rotation before the click reaches this button.
              playbackBeforePointer.current = isPlaying;
            }}
            onClick={(event) =>
              setPlaying(
                !(event.detail > 0 ? playbackBeforePointer.current : isPlaying),
              )
            }
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {isPlaying ? (
                <path d="M9 6v12M15 6v12" />
              ) : (
                <path d="m9 6 9 6-9 6Z" />
              )}
            </svg>
          </button>
          <button
            type="button"
            className="site-hero__arrow"
            onClick={() => move(1)}
            aria-label="Следующий слайд"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m10 6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
