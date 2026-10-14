import { useId, useRef, useState } from "react";
import { site } from "../content/site.js";
import { trackCalculation } from "../lib/analytics.js";
import { calculateEstimate, formatMoney } from "../lib/calculator.js";
import { rateById } from "../content/pages.js";

export function LeadForm({ services, calculation }) {
  const estimate = calculation
    ? calculateEstimate(calculation.parameters)
    : null;
  const selectedRate =
    calculation &&
    rateById[
      calculation.parameters.items?.[0]?.id || calculation.parameters.material
    ];
  const initialService =
    selectedRate && services.includes(selectedRate.label)
      ? selectedRate.label
      : services[0];
  const id = useId();
  const inFlight = useRef(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  const [service, setService] = useState(initialService);
  const isLinear = service === "Укладка ступени";
  const inputClass = "title title_fz15 title_fz15_black";
  const labelClass = "title title_fz14 title_fz14_montserrat";

  async function submit(event) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const body = Object.fromEntries(data);
    body.check = data.get("check") === "on";
    if (calculation) body.calculation = calculation;
    inFlight.current = true;
    setSending(true);
    setResult(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(45_000),
      });
      const answer = await response.json();
      if (!response.ok || answer.ok !== true) {
        setResult({
          ok: false,
          message:
            answer.message || "Не удалось отправить заявку. Попробуйте позже.",
        });
        return;
      }
      form.reset();
      // Предзаполненные данные расчёта тоже очищаются после успешной заявки.
      form.elements.namedItem("address").value = "";
      form.elements.namedItem("square").value = "";
      trackCalculation("contact_confirmed", calculation?.parameters.mode);
      setService(initialService);
      setResult({
        ok: true,
        message: "Заявка отправлена. Мы свяжемся с вами.",
      });
    } catch {
      setResult({
        ok: false,
        message:
          "Не удалось подтвердить отправку. Свяжитесь с нами по телефону или в Telegram.",
      });
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }

  return (
    <form
      className="form__wrapper"
      action="/api/contact"
      method="post"
      aria-describedby={`${id}-notice`}
      aria-busy={sending}
      onSubmit={submit}
    >
      {calculation && (
        <p className="ep-request__estimate">
          Предварительная сумма:{" "}
          {estimate.lines.length ? formatMoney(estimate.total) : "по смете"}.
          Параметры расчёта будут приложены к заявке.
        </p>
      )}
      <div className="form__select">
        <label htmlFor={`${id}-service`} className={labelClass}>
          Услуга
        </label>
        <select
          name="service"
          id={`${id}-service`}
          className={inputClass}
          disabled={sending}
          defaultValue={initialService}
          onChange={(event) => {
            if (isLinear !== (event.target.value === "Укладка ступени"))
              event.target.form.elements.namedItem("square").value = "";
            setService(event.target.value);
          }}
        >
          {services.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
      </div>
      <div className="form__input">
        <div className="form__block">
          <label htmlFor={`${id}-address`} className={labelClass}>
            Адрес
          </label>
          <input
            id={`${id}-address`}
            name="address"
            maxLength={500}
            disabled={sending}
            autoComplete="street-address"
            defaultValue={calculation?.parameters.address || ""}
            className={inputClass}
            placeholder="г. Москва, ул. Перовская, д.1, к.2"
          />
        </div>
        <div className="form__block form__block_width">
          <label htmlFor={`${id}-square`} className={labelClass}>
            {isLinear ? "Длина" : "Площадь"}
          </label>
          <input
            id={`${id}-square`}
            name="square"
            disabled={sending}
            type="number"
            min="0.01"
            step="0.01"
            inputMode="decimal"
            defaultValue={
              estimate
                ? calculation.parameters.items?.length === 1
                  ? estimate.lines[0]?.quantity ||
                    estimate.unknowns[0]?.quantity ||
                    ""
                  : estimate.area || ""
                : ""
            }
            className={inputClass}
            placeholder={isLinear ? "15 пог. м" : "15 м²"}
          />
        </div>
      </div>
      <div className="form__input">
        <div className="form__block">
          <label htmlFor={`${id}-email`} className={labelClass}>
            Ваша почта
          </label>
          <input
            id={`${id}-email`}
            name="email"
            maxLength={254}
            disabled={sending}
            type="email"
            autoComplete="email"
            className={inputClass}
            placeholder="example@inbox.ru"
          />
        </div>
        <div className="form__block form__block_width">
          <label htmlFor={`${id}-name`} className={labelClass}>
            Ваше имя
          </label>
          <input
            id={`${id}-name`}
            name="name"
            maxLength={100}
            disabled={sending}
            autoComplete="given-name"
            className={inputClass}
            placeholder="Иван"
          />
        </div>
      </div>
      <div className="form__input">
        <div className="form__block">
          <label htmlFor={`${id}-phone`} className={labelClass}>
            Телефон
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            maxLength={32}
            disabled={sending}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            className={inputClass}
            placeholder="+7 999 999-99-99"
          />
        </div>
        <button
          type="submit"
          disabled={sending}
          className="button button_form title title_fz15 title_fz15_font"
        >
          {sending ? "Отправляем…" : "Отправить"}
        </button>
      </div>
      <div className="form__input form-consent">
        <input
          id={`${id}-check`}
          name="check"
          type="checkbox"
          required
          disabled={sending}
        />
        <label
          htmlFor={`${id}-check`}
          className="title title_fz15 title_fz15_font title_fz15_unset form__check"
        >
          Согласие на обработку <a href="/privacy/">персональных данных</a>
        </label>
      </div>
      {result && (
        <p className="form-notice" role={result.ok ? "status" : "alert"}>
          {result.message}
        </p>
      )}
      <p id={`${id}-notice`} className="form-notice">
        Также можно связаться с нами:{" "}
        <a href={site.phoneHref}>{site.phoneLabel}</a> или{" "}
        <a href={site.telegramHref}>Telegram</a>.
      </p>
    </form>
  );
}
