import { useState } from "react";
import { rateById, rates } from "../content/pages.js";
import {
  calculateEstimate,
  calculationHref,
  defaultCalculation,
  formatMoney,
} from "../lib/calculator.js";
import { useUrlFilters } from "../lib/useUrlFilters.js";
import { Button, PageHeading, PriceBadge } from "./SiteLayout.jsx";
import { Field } from "./EstimateCalculator.jsx";

const order = [
  "ceramic",
  "porcelain",
  "large",
  "backsplash",
  "mosaic",
  "steps",
  "granite",
];
const shortRates = order.map((id) => rateById[id]);
export function PriceTable({ items = shortRates, onAdd, detailed = false }) {
  return (
    <div className="ep-price-table">
      <table>
        <thead>
          <tr>
            <th scope="col">{detailed ? "Операция" : "Работа"}</th>
            <th scope="col">Ед.</th>
            <th scope="col">Ставка</th>
            <th scope="col">Включено</th>
            {detailed && (
              <>
                <th scope="col">Отдельно</th>
                <th scope="col">
                  <span className="sr-only">Добавить в расчёт</span>
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((rate) => (
            <tr
              key={rate.id}
              id={
                rate.id === "cement"
                  ? "zatirka"
                  : rate.id === "granite"
                    ? "granite"
                    : rate.id === "steps"
                      ? "stage"
                      : undefined
              }
            >
              <th scope="row">{rate.label}</th>
              <td data-label="Ед.">{rate.unit}</td>
              <td data-label="Ставка" className="ep-price-table__rate">
                {rate.price === null ? (
                  <span className="ep-pill">по смете</span>
                ) : (
                  formatMoney(rate.price)
                )}
              </td>
              <td data-label="Включено">{rate.includes}</td>
              {detailed && (
                <>
                  <td data-label="Отдельно">{rate.excludes}</td>
                  <td>
                    <Button small outline onClick={() => onAdd(rate)}>
                      {rate.price === null ? "оценить" : "+ в расчёт"}
                    </Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function PricesPage({ page }) {
  const [filter, update] = useUrlFilters({ query: "", category: "" });
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const filtered = [
    ...shortRates,
    ...rates.filter((rate) => !order.includes(rate.id)),
  ].filter(
    (rate) =>
      (!filter.category || rate.category === filter.category) &&
      rate.label
        .toLocaleLowerCase("ru")
        .includes(filter.query.toLocaleLowerCase("ru")),
  );
  const estimate = calculateEstimate({ ...defaultCalculation, items });
  function add(rate) {
    setItems((current) => {
      if (current.some((item) => item.id === rate.id)) {
        setStatus(
          `${rate.label} уже в расчёте. Измените количество в панели справа.`,
        );
        return current;
      }
      const parts = [
        "ceramic",
        "porcelain",
        "large",
        "mosaic",
        "walls",
        "preparation",
        "waterproofing",
      ];
      const next = current.filter(
        (item) =>
          !(rate.id === "shower" && parts.includes(item.id)) &&
          !(parts.includes(rate.id) && item.id === "shower"),
      );
      setStatus(
        `${rate.label} добавлено в расчёт.${next.length < current.length ? " Комплекс и его операции заменены, чтобы не начислять работу дважды." : ""}`,
      );
      return [...next, { id: rate.id, quantity: "1" }];
    });
  }
  return (
    <div className="ep-container">
      <PageHeading page={page}>
        <p className="ep-lead">
          Ставки — за работу. Рядом с каждой написано, что входит и что
          считается отдельно. Материалы, клей и затирка — отдельными строками.
          Скидка 10% при заказе с сайта.
        </p>
        <div className="ep-actions">
          <PriceBadge />
          <span className="ep-note">7 ставок сайта · остальное по смете</span>
        </div>
      </PageHeading>
      <div className="ep-price-search">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 5 5" />
        </svg>
        <Field
          label="Поиск по операциям"
          value={filter.query}
          onChange={(value) => update("query", value)}
          type="search"
          placeholder="Найти работу: например, затирка"
        />
      </div>
      <div className="ep-chips" aria-label="Категории прайса">
        {[
          ["", "Все"],
          ["laying", "Укладка"],
          ["prep", "Подготовка"],
          ["grout", "Затирка"],
          ["cuts", "Запилы и отверстия"],
          ["extra", "Дополнительно"],
        ].map(([value, label]) => (
          <button
            type="button"
            key={value}
            aria-pressed={filter.category === value}
            onClick={() => update("category", value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="ep-price-layout">
        <div>
          {[
            ["Укладка", filtered.filter((rate) => rate.category === "laying")],
            [
              "Подготовка, затирка, запилы",
              filtered.filter((rate) => rate.category !== "laying"),
            ],
          ].map(
            ([title, group]) =>
              group.length > 0 && (
                <section className="ep-price-group" key={title}>
                  <h2>{title}</h2>
                  <PriceTable items={group} onAdd={add} detailed />
                </section>
              ),
          )}
          {filtered.length === 0 && (
            <div className="ep-empty" role="status">
              <h2>Ничего не найдено</h2>
              <p>Измените запрос или выберите другую категорию.</p>
            </div>
          )}
        </div>
        <aside className="ep-price-summary">
          <p className="ep-kicker">Ваш расчёт</p>
          {items.length ? (
            <>
              <h2>Выбранные работы</h2>
              {items.map((item, index) => (
                <div className="ep-price-summary__item" key={item.id}>
                  <Field
                    label={`${rateById[item.id].label}, ${rateById[item.id].unit}`}
                    inputMode="decimal"
                    value={item.quantity}
                    onChange={(quantity) =>
                      setItems((current) =>
                        current.map((entry, i) =>
                          i === index ? { ...entry, quantity } : entry,
                        ),
                      )
                    }
                  />
                  <button
                    type="button"
                    className="ep-text-button"
                    onClick={() =>
                      setItems((current) =>
                        current.filter((entry) => entry.id !== item.id),
                      )
                    }
                  >
                    Удалить
                  </button>
                </div>
              ))}
              <p className="ep-note">
                Скидка 10%: − {formatMoney(estimate.discount)}
              </p>
              {estimate.unknowns.map((line) => (
                <p className="ep-note" key={line.id}>
                  {line.label} — по смете
                </p>
              ))}
              {estimate.errors.map((error) => (
                <p role="alert" key={error}>
                  {error}
                </p>
              ))}
              <p>Работа, предварительно</p>
              <output aria-live="polite">
                {estimate.total === null
                  ? "—"
                  : !estimate.lines.length && estimate.unknowns.length
                    ? "по смете"
                    : `≈ ${formatMoney(estimate.total)}`}
              </output>
              <Button
                href={calculationHref({
                  ...defaultCalculation,
                  items,
                  mode: "detail",
                })}
              >
                Открыть в калькуляторе
              </Button>
            </>
          ) : (
            <>
              <h2>Пример: ванная 4,5 м²</h2>
              <p>
                Пол 4,5 м² и стены 18 м², керамогранит. Пример посчитан по
                ставкам сайта.
              </p>
              {estimate.lines.map((line) => (
                <div className="ep-estimate-line" key={line.label}>
                  <span>
                    {line.label} · {line.quantity} м²
                  </span>
                  <b>{formatMoney(line.sum)}</b>
                </div>
              ))}
              <div className="ep-estimate-line">
                <span>Скидка 10% при заказе с сайта</span>
                <b>− {formatMoney(estimate.discount)}</b>
              </div>
              <p className="ep-note">
                Затирка, нанесение — по смете
                <br />
                Гидроизоляция пола — по смете
              </p>
              <p>Работа, предварительно</p>
              <output>≈ {formatMoney(estimate.total)}</output>
              <Button
                href={calculationHref({
                  ...defaultCalculation,
                  waterproofing: true,
                })}
              >
                Открыть в калькуляторе
              </Button>
            </>
          )}
          <p className="ep-note">
            Предварительная сумма по известным строкам. Окончательное
            предложение — после проверки объёмов на замере. Контакт для
            просмотра не нужен.
          </p>
          <h3>Другие примеры</h3>
          <a
            className="ep-link"
            href={calculationHref({
              items: [{ id: "backsplash", quantity: "3" }],
            })}
          >
            Кухонный фартук 3 м² →
          </a>
          <a
            className="ep-link"
            href={calculationHref({
              floorArea: "8",
              wallArea: "0",
              material: "porcelain",
            })}
          >
            Пол в коридоре 8 м², керамогранит →
          </a>
        </aside>
      </div>
      <p className="ep-status" role="status">
        {status}
      </p>
    </div>
  );
}
