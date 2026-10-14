import { useContext, useEffect, useRef } from "react";
import { site } from "../content/site.js";
import { navigation, services } from "../content/pages.js";
import { Navigation } from "./Navigation.jsx";
import { RequestContext } from "../lib/request-context.js";

export function Arrow({ external = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={external ? "M7 17 17 7M8 7h9v9" : "M4 12h15m-6-6 6 6-6 6"} />
    </svg>
  );
}
export function Button({
  href,
  children,
  outline = false,
  white = false,
  small = false,
  className = "",
  ...props
}) {
  const classes = `ep-button${outline ? " ep-button_outline" : ""}${white ? " ep-button_white" : ""}${small ? " ep-button_small" : ""} ${className}`;
  return href ? (
    <a className={classes} href={href} {...props}>
      {children}
      <Arrow />
    </a>
  ) : (
    <button type="button" className={classes} {...props}>
      {children}
      <Arrow />
    </button>
  );
}
export function RequestAction({
  children = "Оставить заявку",
  calculation,
  ...props
}) {
  const open = useContext(RequestContext);
  return (
    <Button {...props} onClick={() => open({ calculation })}>
      {children}
    </Button>
  );
}
export function TextLink({ href, children, external = false, ...props }) {
  return (
    <a href={href} className="ep-link" {...props}>
      {children}
      <Arrow external={external} />
    </a>
  );
}
function DesktopServices({ path }) {
  const ref = useRef(null);
  useEffect(() => {
    const closeOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target))
        ref.current.open = false;
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);
  return (
    <details
      ref={ref}
      className="ep-header__services"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          event.currentTarget.open = false;
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.currentTarget.open = false;
          event.currentTarget.querySelector("summary").focus();
        }
      }}
    >
      <summary data-active={path?.startsWith("/uslugi/")}>Услуги</summary>
      <div>
        {services.map((service) => (
          <a href={service.path} key={service.key}>
            {service.label}
          </a>
        ))}
      </div>
    </details>
  );
}
export function Header({ home = false, path }) {
  return (
    <header className={`ep-header${home ? " ep-header_home" : ""}`}>
      <div className="ep-container ep-header__inner">
        <a
          className="ep-header__logo"
          href="/"
          aria-label="Элит-Плит — главная"
        >
          <img src={site.logo} alt="Элит-Плит" width="968" height="658" />
        </a>
        <nav className="ep-header__nav" aria-label="Основная навигация">
          <DesktopServices path={path} />
          {navigation.slice(1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={path === link.href ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a className="ep-header__phone" href={site.phoneHref}>
          {home && <span>Позвоните нам</span>}
          {site.phoneLabel}
        </a>
        {!home && (
          <Button href="/kalkulyator/" small className="ep-header__calculate">
            Рассчитать
          </Button>
        )}
        <a
          className="ep-header__phone-icon"
          href={site.phoneHref}
          aria-label="Позвонить"
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M7 3H4a1 1 0 0 0-1 1c0 9 8 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a17 17 0 0 1-7-7l2-2-2-5Z" />
          </svg>
        </a>
        <Navigation />
      </div>
    </header>
  );
}
export function Breadcrumbs({ page, parent }) {
  return (
    <nav className="ep-breadcrumbs" aria-label="Хлебные крошки">
      <a href="/">Главная</a>
      <span aria-hidden="true">/</span>
      {parent && (
        <>
          <a href={parent.href}>{parent.label}</a>
          <span aria-hidden="true">/</span>
        </>
      )}
      <span aria-current="page">{page.label || page.h1}</span>
    </nav>
  );
}
export function PageHeading({ page, children }) {
  return (
    <div className="ep-page-heading">
      <Breadcrumbs page={page} />
      <h1>{page.h1}</h1>
      {children}
    </div>
  );
}
export function SectionHeading({ kicker, title, mobileTitle, children }) {
  return (
    <div className="ep-section-heading" data-motion="reveal">
      <div>
        {kicker && <p className="ep-kicker">{kicker}</p>}
        <h2>
          {mobileTitle ? (
            <>
              <span className="ep-only-desktop">{title}</span>
              <span className="ep-only-mobile">{mobileTitle}</span>
            </>
          ) : (
            title
          )}
        </h2>
      </div>
      {children && <div className="ep-section-heading__aside">{children}</div>}
    </div>
  );
}
export function PriceBadge() {
  return (
    <span className="ep-pill ep-pill_gold">
      Прайс действует с {site.priceDateLabel}
    </span>
  );
}
export function Placeholder({ children, className = "" }) {
  return <div className={`ep-placeholder ${className}`}>{children}</div>;
}
export function Map({ compact = false }) {
  return (
    <iframe
      className={`ep-map${compact ? " ep-map_compact" : ""}`}
      src={site.map}
      title="Расположение Элит-Плит на карте"
      width="640"
      height={compact ? "220" : "490"}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
export function CallToAction({ service = false }) {
  if (service)
    return (
      <section className="ep-service-cta">
        <div className="ep-container">
          <div>
            <p className="ep-kicker">Заявка</p>
            <h2>
              {service.key === "bathroom"
                ? "Пришлите план и фото ванной — посчитаем за день"
                : "Пришлите план и фото — посчитаем работу"}
            </h2>
            <p>
              Смета по строкам без обязательного звонка. Скидка 10% при заказе с
              сайта.
            </p>
          </div>
          <div className="ep-service-cta__actions">
            <Button href="/kalkulyator/">
              {service.key === "bathroom"
                ? "Рассчитать свою ванную"
                : "Рассчитать стоимость"}
            </Button>
            <Button href={site.telegramHref} outline white>
              Написать в Telegram
            </Button>
          </div>
        </div>
      </section>
    );
  return (
    <section className={`ep-cta${service ? " ep-cta_service" : ""}`}>
      <img
        src="/img/portfolio/tile/stoneware/stoneware_three.jpg"
        alt=""
        loading="lazy"
        width="800"
        height="600"
      />
      <div className="ep-container ep-cta__inner">
        <p className="ep-kicker">Заявка · Оставьте заявку прямо сейчас</p>
        <h2>
          Скидка <span>10%</span> при заказе с сайта
        </h2>
        <p>
          Пришлите фото и размеры — пришлём предварительную смету по строкам без
          обязательного звонка. Дальше — замер и точная цена.
        </p>
        <div className="ep-actions">
          <RequestAction />
          <Button href={site.telegramHref} outline white>
            Написать в Telegram
          </Button>
        </div>
        <small>
          {site.phoneLabel} · {site.hours}
        </small>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="ep-footer">
      <div className="ep-container ep-footer__grid">
        <div>
          <a href="/" aria-label="Элит-Плит — главная">
            <img src={site.logo} width="968" height="658" alt="Элит-Плит" />
          </a>
          <p>
            Укладка плитки под ключ.
            <br />
            Москва и Подмосковье до 50 км.
          </p>
        </div>
        <nav aria-label="Разделы сайта">
          {navigation.slice(0, 4).map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <nav aria-label="О компании и документы">
          {navigation.slice(4).map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
          <a href="/privacy/">Политика конфиденциальности</a>
          <a href="/consent/">Согласие на обработку данных</a>
        </nav>
        <div>
          <a className="ep-footer__phone" href={site.phoneHref}>
            {site.phoneLabel}
          </a>
          <p>{site.address}</p>
          <p>{site.hours}</p>
          <a href={site.telegramHref}>Telegram</a>
          <span> · MAX: {site.phoneLabel}</span>
        </div>
      </div>
    </footer>
  );
}
export function FAQ({
  items,
  intro = true,
  title = "Что спрашивают до замера",
}) {
  return (
    <section className="ep-section ep-split ep-faq">
      <div>
        <p className="ep-kicker">Вопросы</p>
        <h2>{title}</h2>
        {intro && (
          <p>
            Не нашли ответ — <a href={site.telegramHref}>напишите в Telegram</a>
            , ответит мастер, а не менеджер по скрипту.
          </p>
        )}
      </div>
      <div>
        {items.map(([question, answer], index) => (
          <details className="ep-faq__item" key={question} open>
            <summary>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{question}</h3>
              <span aria-hidden="true">−</span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
