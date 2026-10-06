import { useId } from "react";
import { site } from "../content/site.js";

export function LeadForm({ services }) {
  const id = useId();
  const inputClass = "title title_fz15 title_fz15_black";
  const labelClass = "title title_fz14 title_fz14_montserrat";
  return (
    <form
      className="form__wrapper"
      aria-describedby={`${id}-notice`}
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="form__select">
        <label htmlFor={`${id}-service`} className={labelClass}>
          Услуга
        </label>
        <select name="service" id={`${id}-service`} className={inputClass}>
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
            autoComplete="street-address"
            className={inputClass}
            placeholder="г. Москва, ул. Перовская, д.1, к.2"
          />
        </div>
        <div className="form__block form__block_width">
          <label htmlFor={`${id}-square`} className={labelClass}>
            Площадь
          </label>
          <input
            id={`${id}-square`}
            name="square"
            type="number"
            min="0.01"
            step="0.01"
            inputMode="decimal"
            className={inputClass}
            placeholder="15 м²"
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
          disabled
          className="button button_form title title_fz15 title_fz15_font"
        >
          Отправить
        </button>
      </div>
      <div className="form__input form-consent">
        <input id={`${id}-check`} name="check" type="checkbox" required />
        <label
          htmlFor={`${id}-check`}
          className="title title_fz15 title_fz15_font title_fz15_unset form__check"
        >
          Согласие на обработку{" "}
          <a href="/confidentiality.html">персональных данных</a>
        </label>
      </div>
      <p id={`${id}-notice`} className="form-notice">
        Онлайн-отправка временно недоступна. Свяжитесь с нами:{" "}
        <a href={site.phoneHref}>{site.phoneLabel}</a> или{" "}
        <a href={site.whatsappHref}>WhatsApp</a>.
      </p>
    </form>
  );
}
