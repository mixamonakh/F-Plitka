import { rateById, services } from "../content/pages.js";
import { formatMoney } from "../lib/calculator.js";
import { Arrow } from "./SiteLayout.jsx";

export function ServiceGrid({ items = services, compact = false }) {
  return (
    <div
      className={`ep-service-grid${compact ? " ep-service-grid_compact" : ""}`}
    >
      {items.map((service, index) => (
        <a
          key={service.key}
          className="ep-service-grid__item"
          href={service.path}
        >
          <span className="ep-service-grid__number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3>{service.label}</h3>
          <p>{service.summary}</p>
          <div className="ep-service-grid__bottom">
            <span>
              {service.price
                ? `от ${formatMoney(rateById[service.price].price)}/${rateById[service.price].unit}`
                : "по смете"}
            </span>
            <Arrow />
          </div>
        </a>
      ))}
    </div>
  );
}
