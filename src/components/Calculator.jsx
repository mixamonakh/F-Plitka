import { useId, useState } from "react";
import { calculateTotal } from "../lib/calculator.js";

export function Calculator({ services }) {
  const id = useId();
  const [service, setService] = useState("");
  const [area, setArea] = useState("");
  const [coupon, setCoupon] = useState("");
  const isLinear = service === "Укладка ступени";
  const total = calculateTotal(
    services.find((item) => item.label === service)?.price,
    area,
    coupon,
  );
  return (
    <form className="form-calc" onSubmit={(event) => event.preventDefault()}>
      <div className="form-calc__select">
        <label
          htmlFor={`${id}-service`}
          className="title title_fz14 title_fz14_montserrat"
        >
          Выберите нужную вам услугу
        </label>
        <select
          id={`${id}-service`}
          className="form-calc__serv title title_fz15 title_fz15_black"
          value={service}
          onChange={(event) => {
            const nextService = event.target.value;
            if (isLinear !== (nextService === "Укладка ступени")) setArea("");
            setService(nextService);
          }}
        >
          <option value="" disabled>
            Выберите услугу
          </option>
          {services.map((item) => (
            <option key={item.label} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className="form-calc__wrapper">
        <div className="form-calc__block">
          <label
            htmlFor={`${id}-area`}
            className="title title_fz14 title_fz14_montserrat"
          >
            {isLinear ? "Введите длину" : "Введите площадь"}
          </label>
          <input
            id={`${id}-area`}
            type="number"
            min="0.01"
            step="0.01"
            inputMode="decimal"
            value={area}
            onChange={(event) => setArea(event.target.value)}
            className="square title title_fz15 title_fz15_black"
            placeholder={isLinear ? "пог. м" : "м²"}
          />
        </div>
        <output
          className="calculator-total title title_fz25 title_fz25_font"
          aria-live="polite"
        >
          {total.toLocaleString("ru-RU", { maximumFractionDigits: 2 })} руб.
        </output>
        <div className="form-calc__block">
          <label
            htmlFor={`${id}-coupon`}
            className="title title_fz14 title_fz14_montserrat"
          >
            Введите купон для скидки
          </label>
          <input
            id={`${id}-coupon`}
            value={coupon}
            onChange={(event) => setCoupon(event.target.value)}
            className="kypon title title_fz15 title_fz15_black"
            placeholder="Ваш купон: 7778"
          />
        </div>
      </div>
    </form>
  );
}
