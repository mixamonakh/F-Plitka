import { rateById, services } from "../content/pages.js";
import { formatMoney } from "../lib/calculator.js";
import { Arrow, SectionHeading, TextLink } from "./SiteLayout.jsx";
import "./HomeServices.scss";

const images = {
  bathroom: ["plitka-v-vannoy", 1122, 1402],
  floor: ["ukladka-plitki-na-pol", 1672, 941],
  walls: ["ukladka-plitki-na-steny", 1122, 1402],
  backsplash: ["kuhonnyy-fartuk", 1448, 1086],
  porcelain: ["ukladka-keramogranita", 1448, 1086],
  large: ["krupnoformatnyy-keramogranit", 1448, 1086],
  mosaic: ["ukladka-mozaiki", 1254, 1254],
  cuts: ["zapil-plitki-pod-45", 1254, 1254],
  epoxy: ["epoksidnaya-zatirka", 1448, 1086],
  shower: ["dushevaya-iz-plitki", 1122, 1402],
};

function ServiceCard({ service, index }) {
  const [image, width, height] = images[service.key];
  const dark = ["floor", "walls", "epoxy"].includes(service.key);

  return (
    <a
      className={`ep-service-card ep-service-card_${service.key}${dark ? " ep-service-card_dark" : ""}`}
      href={service.path}
      aria-labelledby={`home-service-${service.key}`}
    >
      <img
        className="ep-service-card__image"
        src={`/img/services/home/${image}.webp`}
        alt=""
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
      <div className="ep-service-card__content">
        <span className="ep-service-card__number" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 id={`home-service-${service.key}`}>{service.label}</h3>
        <p>{service.summary}</p>
        <div className="ep-service-card__bottom">
          <span>
            {service.price
              ? `от ${formatMoney(rateById[service.price].price)}/${rateById[service.price].unit}`
              : "по смете"}
          </span>
          <span className="ep-service-card__arrow" aria-hidden="true">
            <Arrow />
          </span>
        </div>
      </div>
    </a>
  );
}

export function HomeServices() {
  return (
    <section className="ep-section ep-home-services" id="uslugi">
      <div className="ep-container">
        <SectionHeading
          kicker="Услуги"
          title="Широкий спектр оказываемых услуг"
          mobileTitle="Что делаем"
        >
          <p>
            Десять направлений. У каждого — своя страница с составом работ,
            ставками и примерами. Цена ниже — за работу, материалы отдельно.
          </p>
        </SectionHeading>
      </div>
      <div className="ep-home-services__grid">
        <div className="ep-home-services__top">
          {services.slice(0, 5).map((service, index) => (
            <ServiceCard key={service.key} service={service} index={index} />
          ))}
        </div>
        <div className="ep-home-services__bottom">
          {services.slice(5).map((service, index) => (
            <ServiceCard
              key={service.key}
              service={service}
              index={index + 5}
            />
          ))}
        </div>
        <div className="ep-only-mobile ep-mobile-price-link">
          <TextLink href="/ceny/">Все цены и состав ставок</TextLink>
        </div>
      </div>
    </section>
  );
}
