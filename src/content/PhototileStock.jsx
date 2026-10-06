import { LeadForm } from "../components/LeadForm.jsx";
import { Calculator } from "../components/Calculator.jsx";
export function PhototileStock({ page }) {
  return (
    <section className="stock" id="calc">
      {" "}
      <img
        src="/img/image-background/background_three.png"
        alt=""
        className="image-background image-background_stock"
        loading="lazy"
        decoding="async"
      />{" "}
      <div className="container">
        {" "}
        <div className="stock__grid">
          {" "}
          <div className="form form_stock" data-motion="animate__fadeInLeft">
            {" "}
            <h2 className="title title_fz45 title_fz45_white form__title">
              {" "}
              ЗАЯВКА{" "}
            </h2>{" "}
            <div className="title title_fz22 form__subtitle">
              {" "}
              Оставьте заявку прямо сейчас{" "}
            </div>{" "}
            <LeadForm services={page.services} />{" "}
          </div>{" "}
          <div className="stock__block">
            {" "}
            <div className="stock__wrapper">
              {" "}
              <h2 className="title title_black title_fz80 title_fz80_media stock__title">
                {" "}
                СКИДКА{" "}
              </h2>{" "}
              <div className="title title_gradient title_fz120 stock__procent">
                {" "}
                10%{" "}
              </div>{" "}
            </div>{" "}
            <div
              className="titile title_gradient title_fz30 title_fz30_media stock__subtitle"
              data-motion="animate__fadeInRight"
            >
              {" "}
              При заказе с сайта{" "}
            </div>{" "}
            <div className="form form_calc" data-motion="animate__fadeInRight">
              {" "}
              <h2 className="form_calc__title title title_black title_fz21">
                {" "}
                Рассчет стоимости{" "}
              </h2>{" "}
              <div className="form_calc__subtitle title title_fz15 title_fz15_font">
                {" "}
                В стоимость уже включены все сопутствующие работы.{" "}
              </div>{" "}
              <Calculator services={page.calculator} />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
