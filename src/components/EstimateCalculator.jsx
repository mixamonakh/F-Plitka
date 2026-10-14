import { useContext, useEffect, useId, useRef, useState } from "react";
import { materials } from "../content/catalog.js";
import { rateById } from "../content/pages.js";
import { site } from "../content/site.js";
import {
  calculateEstimate,
  calculationHref,
  defaultCalculation,
  estimateText,
  formatMoney,
  formatNumber,
  normalizeCalculation,
} from "../lib/calculator.js";
import { RequestContext } from "../lib/request-context.js";
import { trackCalculation } from "../lib/analytics.js";
import { Button, PriceBadge } from "./SiteLayout.jsx";

export function Field({
  label,
  value,
  onChange,
  children,
  type = "text",
  ...props
}) {
  const id = useId();
  return (
    <div className="ep-field">
      <label htmlFor={id}>{label}</label>
      {children ? (
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          {...props}
        >
          {children}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          {...props}
        />
      )}
    </div>
  );
}
export function Segments({ label, value, options, onChange }) {
  const id = useId();
  return (
    <fieldset className="ep-segments">
      <legend className="sr-only">{label}</legend>
      <div>
        {options.map(([key, name]) => (
          <label
            key={key}
            className={key === value ? "ep-segments__selected" : ""}
          >
            <input
              type="radio"
              name={id}
              value={key}
              checked={value === key}
              onChange={() => onChange(key)}
            />
            <span>{name}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
function Step({ number, title, note, children }) {
  return (
    <section className="ep-calc__step">
      <p className="ep-kicker">Шаг {number}</p>
      <h3>{title}</h3>
      {note && <p className="ep-note">{note}</p>}
      {children}
    </section>
  );
}
export function EstimateCalculator({ compact = false }) {
  const [state, setState] = useState(() =>
    compact
      ? defaultCalculation
      : { ...defaultCalculation, mode: "detail", geometry: "dimensions" },
  );
  const [saved, setSaved] = useState(null);
  const [notice, setNotice] = useState("");
  const started = useRef(false);
  const resultSeen = useRef(false);
  const resultRef = useRef(null);
  const openRequest = useContext(RequestContext);
  const result = calculateEstimate(state);
  const mode = state.mode;
  useEffect(() => {
    if (compact) return;
    const restore = () => {
      const params = new URLSearchParams(window.location.search);
      try {
        const raw = params.get("calc");
        const snapshot = params.get("saved")
          ? JSON.parse(
              localStorage.getItem(
                `elit-plit:calculation:${params.get("saved")}`,
              ) || "null",
            )
          : null;
        if (snapshot) {
          setState(normalizeCalculation(snapshot.parameters));
          if (snapshot.priceDate === site.priceDate) setSaved(snapshot);
          else {
            setSaved(null);
            setNotice(
              `Параметры восстановлены. Сумма пересчитана по прайсу от ${site.priceDateLabel}; сохраните новую версию.`,
            );
          }
        } else if (raw && raw.length <= 7000)
          setState(normalizeCalculation(JSON.parse(raw)));
      } catch {
        setNotice(
          "Не удалось открыть сохранённый расчёт. Введите параметры заново.",
        );
      }
    };
    queueMicrotask(restore);
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, [compact]);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !resultSeen.current) {
          trackCalculation("calculation_result", mode);
          resultSeen.current = true;
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    if (resultRef.current) observer.observe(resultRef.current);
    return () => observer.disconnect();
  }, [mode]);
  const change = (key, value) => {
    if (!started.current) {
      trackCalculation("calculation_start", mode);
      started.current = true;
    }
    setState((current) => ({ ...current, [key]: value }));
    setSaved(null);
  };
  const numeric = (key, label) => (
    <Field
      label={label}
      value={state[key]}
      onChange={(value) => change(key, value)}
      inputMode="decimal"
      maxLength={16}
    />
  );
  const geometry = (
    <>
      {!compact && (
        <Segments
          label="Способ задания площади"
          value={state.geometry}
          options={[
            ["areas", "Готовые площади"],
            ["dimensions", "Размеры комнаты"],
          ]}
          onChange={(value) => change("geometry", value)}
        />
      )}
      {state.geometry === "areas" ? (
        <div className="ep-fields ep-fields_two">
          {numeric("floorArea", "Площадь пола, м²")}
          {numeric("wallArea", "Площадь стен, м²")}
        </div>
      ) : (
        <>
          <div className="ep-fields ep-fields_three">
            {numeric("L", "Длина, м")}
            {numeric("W", "Ширина, м")}
            {numeric("H", "Высота, м")}
          </div>
          <p className="ep-note">
            Площади пересчитаны по размерам комнаты. Быстрые значения сохранены
            в режиме «Готовые площади».
          </p>
        </>
      )}
    </>
  );
  function snapshot() {
    return {
      id: saved?.id || crypto.randomUUID(),
      createdAt: saved?.createdAt || new Date().toISOString(),
      priceDate: site.priceDate,
      parameters: normalizeCalculation(state),
    };
  }
  function save() {
    if (result.errors.length) return;
    const value = snapshot();
    try {
      localStorage.setItem(
        `elit-plit:calculation:${value.id}`,
        JSON.stringify(value),
      );
      setNotice(
        "Расчёт сохранён в этом браузере. Скачайте файл, чтобы сохранить копию.",
      );
    } catch {
      setNotice("Хранилище браузера недоступно. Скачайте файл расчёта.");
    }
    setSaved(value);
    trackCalculation("calculation_save", mode);
  }
  function download() {
    const value = saved || snapshot();
    const url = URL.createObjectURL(
      new Blob(
        [
          JSON.stringify(
            { ...value, result, text: estimateText(result) },
            null,
            2,
          ),
        ],
        { type: "application/json" },
      ),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `elit-plit-${value.id}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function request() {
    trackCalculation("estimate_request", mode);
    openRequest({ calculation: snapshot() });
  }
  return (
    <div
      className={`ep-calc${compact ? " ep-calc_compact" : ""}${mode === "detail" ? " ep-calc_detail" : ""}`}
    >
      <div className="ep-calc__inputs">
        <Segments
          label="Режим калькулятора"
          value={mode}
          options={
            compact
              ? [
                  ["quick", "Стоимость работ"],
                  ["tiles", "Количество плитки"],
                ]
              : [
                  ["quick", "Быстрый"],
                  ["detail", "Подробный"],
                  ["tiles", "Количество плитки"],
                ]
          }
          onChange={(value) => change("mode", value)}
        />
        {state.items.length > 0 ? (
          <section className="ep-calc__step">
            <h3>Работы из прайса</h3>
            <p className="ep-note">
              Каждая позиция считается один раз. Площади комнаты к этому списку
              не добавляются.
            </p>
            {state.items.map((item, index) => (
              <div className="ep-calc__cart-row" key={item.id}>
                <Field
                  label={`${rateById[item.id]?.label || "Операция без ставки"}, ${rateById[item.id]?.unit || "количество"}`}
                  inputMode="decimal"
                  value={item.quantity}
                  onChange={(quantity) =>
                    change(
                      "items",
                      state.items.map((entry, i) =>
                        i === index ? { ...entry, quantity } : entry,
                      ),
                    )
                  }
                />
                <button
                  type="button"
                  className="ep-text-button"
                  aria-label={`Удалить ${rateById[item.id]?.label || "операцию"}`}
                  onClick={() =>
                    change(
                      "items",
                      state.items.filter((_, i) => i !== index),
                    )
                  }
                >
                  ×
                </button>
              </div>
            ))}
            <a href="/ceny/">Добавить работы из прайса</a>
            <button
              type="button"
              className="ep-text-button"
              onClick={() => change("items", [])}
            >
              Перейти к расчёту по площади
            </button>
          </section>
        ) : (
          <>
            {mode === "detail" ? (
              <>
                <Step
                  number="1"
                  title="Помещение"
                  note="Введите размеры комнаты либо готовые площади."
                >
                  {geometry}
                </Step>
                <Step
                  number="2"
                  title="Поверхности"
                  note="A и C — по длине, B и D — по ширине. Выберите только облицовываемые стены."
                >
                  {state.geometry === "dimensions" ? (
                    <>
                      <label className="ep-check">
                        <input
                          type="checkbox"
                          checked={state.floorEnabled}
                          onChange={(event) =>
                            change("floorEnabled", event.target.checked)
                          }
                        />
                        Пол
                      </label>
                      <div className="ep-wall-options">
                        {Object.keys(state.walls).map((key) => (
                          <label className="ep-check" key={key}>
                            <input
                              type="checkbox"
                              checked={state.walls[key]}
                              onChange={(event) =>
                                change("walls", {
                                  ...state.walls,
                                  [key]: event.target.checked,
                                })
                              }
                            />
                            Стена {key.toUpperCase()}
                          </label>
                        ))}
                      </div>
                      <div className="ep-calc__metrics">
                        <span>
                          Пол <b>{formatNumber(result.floor)} м²</b>
                        </span>
                        <span>
                          Периметр стен{" "}
                          <b>{formatNumber(result.perimeter)} м</b>
                        </span>
                        <span>
                          Стены за вычетом проёмов{" "}
                          <b>{formatNumber(result.walls)} м²</b>
                        </span>
                      </div>
                    </>
                  ) : (
                    <p>
                      Пол: {formatNumber(result.floor)} м² · стены:{" "}
                      {formatNumber(result.walls)} м². Укажите площадь стен уже
                      за вычетом проёмов.
                    </p>
                  )}
                </Step>
                <Step
                  number="3"
                  title="Проёмы"
                  note="Проём вычитается только из выбранных стен; откосы — отдельно."
                >
                  {state.geometry === "dimensions" ? (
                    <>
                      <div className="ep-fields ep-fields_two">
                        {numeric("doorW", "Ширина двери, м")}
                        {numeric("doorH", "Высота двери, м")}
                      </div>
                      <p className="ep-note">
                        Вычтено: {formatNumber(result.openings)} м²
                      </p>
                    </>
                  ) : (
                    <p className="ep-note">
                      Для расчёта проёмов переключитесь на размеры комнаты.
                    </p>
                  )}
                </Step>
              </>
            ) : (
              <div className="ep-calc__quick-fields">{geometry}</div>
            )}
            <Step
              number="4"
              title="Материал"
              note="Ставка за работу. Плитка, клей и смесь для затирки — отдельно."
            >
              <Segments
                label="Материал"
                value={state.material}
                options={["ceramic", "porcelain", "large", "mosaic"].map(
                  (key) => [
                    key,
                    <>
                      {materials[key]}
                      {!compact && (
                        <small>{formatMoney(rateById[key].price)}/м²</small>
                      )}
                    </>,
                  ],
                )}
                onChange={(value) => change("material", value)}
              />
            </Step>
            <Step number="5" title="Подготовка и раскладка">
              <div className="ep-fields ep-fields_two">
                <Field
                  label="Основание"
                  value={state.prep}
                  onChange={(value) => change("prep", value)}
                >
                  <option value="ready">Готово под плитку</option>
                  <option value="demolish">Нужен демонтаж старой плитки</option>
                  <option value="prepare">Требуется подготовка</option>
                  <option value="unknown">Не знаю</option>
                </Field>
                {mode === "detail" ? (
                  <Field
                    label="Раскладка"
                    value={state.layout}
                    onChange={(value) => change("layout", value)}
                  >
                    <option value="straight">Прямая</option>
                    <option value="offset">Со смещением</option>
                    <option value="diagonal">Диагональная</option>
                    <option value="complex">Сложная</option>
                  </Field>
                ) : (
                  <Field
                    label="Купон"
                    value={state.coupon}
                    onChange={(value) => change("coupon", value)}
                    placeholder="7778"
                    maxLength={20}
                  />
                )}
              </div>
            </Step>
            {mode === "detail" && (
              <>
                <Step number="6" title="Запилы, отверстия и затирка">
                  <div className="ep-fields ep-fields_two">
                    {numeric("cuts", "Запил под 45°, пог. м")}
                    {numeric("holes", "Отверстия, шт")}
                  </div>
                  <Field
                    label="Затирка"
                    value={state.grout}
                    onChange={(value) => change("grout", value)}
                  >
                    <option value="cement">Цементная</option>
                    <option value="epoxy">Эпоксидная</option>
                    <option value="none">Не требуется</option>
                  </Field>
                  <label className="ep-check">
                    <input
                      type="checkbox"
                      checked={state.waterproofing}
                      onChange={(event) =>
                        change("waterproofing", event.target.checked)
                      }
                    />
                    Гидроизоляция мокрых зон
                  </label>
                  <p className="ep-note">
                    Ставки не опубликованы — требуется оценка по смете.
                  </p>
                </Step>
                <Step
                  number="7"
                  title="Доставка и подъём"
                  note="Информационные поля. В предварительную сумму не входят."
                >
                  <Field
                    label="Адрес объекта"
                    value={state.address}
                    onChange={(value) => change("address", value)}
                    maxLength={500}
                    autoComplete="street-address"
                  />
                  <div className="ep-fields ep-fields_two">
                    {numeric("floorNumber", "Этаж")}
                    <Field
                      label="Лифт"
                      value={state.lift}
                      onChange={(value) => change("lift", value)}
                    >
                      <option value="freight">Есть грузовой</option>
                      <option value="passenger">Только пассажирский</option>
                      <option value="none">Нет</option>
                    </Field>
                  </div>
                </Step>
              </>
            )}
          </>
        )}
        {(!compact || mode === "tiles") && (
          <section
            className="ep-calc__materials"
            id={compact ? undefined : "materialy"}
          >
            <h3>Количество плитки</h3>
            <p className="ep-note">
              Запас материала не увеличивает оплачиваемую площадь укладки.
            </p>
            <div className="ep-fields ep-fields_two">
              <Field
                label="Формат плитки, мм"
                value={state.format}
                onChange={(value) => change("format", value)}
              >
                {["200x200", "300x600", "600x600", "600x1200"].map((format) => (
                  <option value={format} key={format}>
                    {format.replace("x", "×")}
                  </option>
                ))}
              </Field>
              {numeric("reserve", "Запас, %")}
            </div>
            {mode !== "tiles" && (
              <p>
                {result.tiles === null
                  ? "Проверьте параметры"
                  : `${formatNumber(result.tiles)} шт · ${formatNumber(result.materialArea)} м² с запасом`}
              </p>
            )}
          </section>
        )}
      </div>
      <aside
        className="ep-calc__result"
        ref={resultRef}
        aria-label="Предварительная смета"
      >
        <PriceBadge />
        <p className="ep-kicker">
          {mode === "tiles"
            ? `Плитки, с запасом ${result.reserve}%`
            : "Работа, предварительно"}
        </p>
        <output
          className="ep-calc__total"
          aria-live="polite"
          aria-atomic="true"
        >
          {result.total === null
            ? "—"
            : mode === "tiles"
              ? `${formatNumber(result.tiles)} шт`
              : !result.lines.length && result.unknowns.length
                ? "по смете"
                : `≈ ${formatMoney(result.total)}`}
        </output>
        {result.errors.length > 0 && (
          <div className="ep-error" role="alert">
            {result.errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        {mode === "tiles" ? (
          <>
            <div className="ep-estimate-line">
              <span>Площадь облицовки</span>
              <strong>{formatNumber(result.area)} м²</strong>
            </div>
            <div className="ep-estimate-line">
              <span>Площадь с запасом</span>
              <strong>{formatNumber(result.materialArea)} м²</strong>
            </div>
            <div className="ep-estimate-line">
              <span>Формат {state.format.replace("x", "×")}</span>
              <strong>{formatNumber(result.tileArea)} м²/шт</strong>
            </div>
            <p className="ep-note">
              Грубая оценка без раскладки. Запас и возможность использовать
              обрезки зависят от проекта. Стоимость материалов не определена и в
              работу не включена.
            </p>
          </>
        ) : (
          <>
            <p className="ep-note">
              По известным строкам. Плитка, клей и затирочная смесь — отдельно.
            </p>
            {result.lines.length === 0 && result.unknowns.length === 0 && (
              <p className="ep-note">
                Укажите площадь или добавьте работы из прайса.
              </p>
            )}
            {result.lines.map((line) => (
              <div
                className="ep-estimate-line"
                key={`${line.id}-${line.label}`}
              >
                <span>
                  {line.label}
                  <small>
                    {formatNumber(line.quantity)} {line.unit} ×{" "}
                    {formatMoney(line.price)}
                  </small>
                </span>
                <strong>{formatMoney(line.sum)}</strong>
              </div>
            ))}
            {result.discount > 0 && (
              <div className="ep-estimate-line ep-estimate-line_discount">
                <span>Скидка 10% при заказе с сайта</span>
                <strong>− {formatMoney(result.discount)}</strong>
              </div>
            )}
            {result.unknowns.length > 0 && (
              <div className="ep-calc__unknown">
                <h3>Требует оценки · {result.unknowns.length}</h3>
                {result.unknowns.map((line) => (
                  <div
                    className="ep-estimate-line"
                    key={`${line.id}-${line.label}`}
                  >
                    <span>
                      {line.label}
                      {line.quantity > 0 && (
                        <small>
                          {formatNumber(line.quantity)} {line.unit}
                        </small>
                      )}
                    </span>
                    <strong>по смете</strong>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {!compact && (
          <Field
            label="Купон"
            value={state.coupon}
            onChange={(value) => change("coupon", value)}
            placeholder="7778"
            maxLength={20}
          />
        )}
        {state.coupon && (
          <p className="ep-note">
            {result.couponApplied
              ? "Купон 7778 применён. Скидка 10% учтена один раз."
              : "Купон не найден. Скидка 10% при заказе с сайта сохранена."}
          </p>
        )}
        <div className="ep-calc__actions">
          {compact ? (
            <Button href={calculationHref({ ...state, mode: "detail" })}>
              Подробный расчёт и смета
            </Button>
          ) : (
            <Button
              disabled={
                result.total === null ||
                (!result.lines.length && !result.unknowns.length)
              }
              onClick={request}
            >
              Получить предварительный расчёт
            </Button>
          )}
          <div className="ep-actions">
            <button
              className="ep-text-button"
              type="button"
              disabled={result.total === null}
              onClick={save}
            >
              Сохранить расчёт <span aria-hidden="true">→</span>
            </button>
            {!compact && (
              <button
                className="ep-text-button"
                type="button"
                disabled={result.total === null}
                onClick={() => window.print()}
              >
                Скачать PDF <span aria-hidden="true">↓</span>
              </button>
            )}
          </div>
        </div>
        {notice && (
          <p className="ep-note" role="status">
            {notice}
          </p>
        )}
        {saved && (
          <div className="ep-calc__saved">
            <p>
              ID: {saved.id}
              <br />
              {new Date(saved.createdAt).toLocaleDateString("ru-RU")} · прайс{" "}
              {site.priceDateLabel}
            </p>
            <a href={`/kalkulyator/?saved=${encodeURIComponent(saved.id)}`}>
              Открыть сохранённую версию
            </a>
            <button type="button" className="ep-text-button" onClick={download}>
              Скачать файл расчёта
            </button>
            <a href={calculationHref(saved.parameters)}>Ссылка с параметрами</a>
          </div>
        )}
        <p className="ep-note">
          Предварительная сумма. Окончательное предложение — после проверки
          объёмов и условий на замере. Контакт для просмотра не нужен.
        </p>
        {!compact && (
          <p className="ep-note">
            2D/3D-визуализация — после запуска. Расчёт работает без неё.
          </p>
        )}
      </aside>
    </div>
  );
}
