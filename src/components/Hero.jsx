import { useEffect, useState } from "react";
import { site } from "../content/site.js";
import { RequestButton } from "./RequestButton.jsx";
import { useReducedMotion } from "../lib/useReducedMotion.js";

const slides = [
  {
    image: "/img/header/background__header-one.jpg",
    title: "Укладка плитки",
    detail: site.name,
    alt: "Укладка плитки в интерьере",
  },
  {
    image: "/img/header/background__header-two.jpg",
    title: "Ремонт ванных",
    detail: "под ключ",
    alt: "Ремонт ванной комнаты",
  },
  {
    image: "/img/header/background__header-three.jpg",
    title: "изготовление и укладка",
    detail: "фотоплитки",
    alt: "Фотоплитка в интерьере",
  },
];

export function Hero({ page }) {
  const initial =
    page.key === "bathroom" ? 1 : page.key === "phototile" ? 2 : 0;
  const [active, setActive] = useState(initial);
  const [playing, setPlaying] = useState(true);
  const reducedMotion = useReducedMotion();
  const isPlaying = playing && !reducedMotion;
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    if (!isPlaying || hovered) return;
    const timer = setInterval(() => {
      if (!document.hidden) setActive((index) => (index + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, hovered]);
  const move = (direction) => {
    setPlaying(false);
    setActive((index) => (index + direction + slides.length) % slides.length);
  };
  return (
    <header
      className="promo"
      aria-label="Наши услуги"
      aria-roledescription="карусель"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setPlaying(false)}
    >
      <div className="promo__slider" aria-live={isPlaying ? "off" : "polite"}>
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className="hero-slide animate__animated animate__fadeIn"
            hidden={index !== active}
            aria-label={`${index + 1} из ${slides.length}`}
            role="group"
            aria-roledescription="слайд"
          >
            <img
              className="promo__img"
              src={slide.image}
              alt={slide.alt}
              fetchPriority={index === initial ? "high" : undefined}
              loading={index === initial ? "eager" : "lazy"}
            />
            <div className="container">
              <div className="promo__wrapper">
                <h2 className="promo__title">
                  <span className="title title_fz46">{slide.title}</span>
                  <span className="title title_fz99">{slide.detail}</span>
                </h2>
                <div className="title title_fz30 promo__subtitle">
                  Лучшие в своём деле
                </div>
                <RequestButton className="button button_header promo__button">
                  <img src="/icons/email.png" alt="" className="promo__icon" />
                  <span className="promo__text">
                    <span className="title title_fz24">оставить</span>
                    <span className="title title_fz25">заявку</span>
                  </span>
                </RequestButton>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="promo-arrows" data-motion="animate__fadeInRight">
        <a href="/" aria-label={`${site.name} — главная`}>
          <img src={site.logo} alt={site.name} className="promo-arrows__logo" />
        </a>
        <div className="promo-arrows__wrapper">
          <button
            type="button"
            className="promo-arrows__prev"
            onClick={() => move(-1)}
            aria-label="Предыдущий слайд"
          >
            <img src="/icons/left.svg" alt="" />
            <span className="title title_fz15 promo-arrows__left">Назад</span>
          </button>
          <button
            type="button"
            className="promo-arrows__next"
            onClick={() => move(1)}
            aria-label="Следующий слайд"
          >
            <img src="/icons/right.svg" alt="" />
            <span className="title title_fz15 promo-arrows__right">Вперёд</span>
          </button>
          <button
            type="button"
            className="hero-play"
            aria-label={
              isPlaying ? "Остановить слайд-шоу" : "Запустить слайд-шоу"
            }
            aria-pressed={isPlaying}
            onClick={() => setPlaying((value) => !value)}
          >
            {isPlaying ? "Ⅱ" : "▶"}
          </button>
        </div>
      </div>
      <div className="promo-phone" data-motion="animate__fadeInDown">
        <div className="promo-phone__wrapper">
          <div className="promo-phone__block">
            <p className="title title_fz16 promo-phone__title">
              Звоните прямо сейчас:
            </p>
            <a
              href={site.phoneHref}
              className="title title_fz20 promo-phone__number"
            >
              {site.phoneLabel}
            </a>
          </div>
          <div className="promo-phone__divider" />
          <a
            href={site.phoneHref}
            className="button button_phone button_borderNone button-call__button promo-phone__button"
            aria-label="Позвонить"
          >
            <span className="button-call__img">
              <img
                src="/icons/promo-phone.svg"
                alt=""
                className="button-call__svg"
              />
            </span>
            <span className="button-call__text promo-phone__text">
              <span className="title title_fz16">заказать</span>
              <span className="title title_fz16 title_fz16_weight">звонок</span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
