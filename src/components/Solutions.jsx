import { useId, useState } from "react";
import { Tabs } from "./Tabs.jsx";
import { site } from "../content/site.js";

export function Solutions({ page }) {
  const id = useId();
  const [active, setActive] = useState(0);
  const [slide, setSlide] = useState(0);
  const count = page.solutions[active].slides.length;
  const move = (direction) =>
    setSlide((index) => (index + direction + count) % count);
  return (
    <section className="solutions" id="solutions">
      <div className="container">
        <h2
          className="title title_fz80 title_black solutions__title"
          data-motion="reveal"
        >
          Безграничные возможности
        </h2>
        <div
          className="title title_gradient title_fz30 title_fz30_unset solutions__subtitle"
          data-motion="reveal"
        >
          Для создания интерьера
        </div>
        <div className="solutions__grid">
          <div className="solutions__text">
            <p className="title title_fz15 title_fz15_black">
              {page.solutionText}
            </p>
          </div>
          <div className="solutions__block">
            <Tabs
              id={id}
              labels={page.solutions.map((item) => item.title)}
              active={active}
              onChange={(index) => {
                setActive(index);
                setSlide(0);
              }}
              className="solutions__tabs"
              buttonClassName="button button_tabs title title_fz19 solutions__tab"
              activeClassName="solutions__tab_active"
              label="Категории фотоплитки"
            />
          </div>
        </div>
        {page.solutions.map((group, groupIndex) => (
          <div
            key={group.title}
            id={`${id}-panel-${groupIndex}`}
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`${id}-tab-${groupIndex}`}
            hidden={active !== groupIndex}
          >
            <div className="slider">
              {group.slides.map((item, index) => (
                <div
                  key={item.src}
                  className="slider__wrapper"
                  hidden={slide !== index}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="slider__img"
                    loading="lazy"
                    decoding="async"
                  />
                  {[0, 1, 2].map((i) => (
                    <div key={`v${i}`} className="slider__divider-vertical" />
                  ))}
                  {[0, 1, 2].map((i) => (
                    <div
                      key={`h${i}`}
                      className="slider__divider-horizontally"
                    />
                  ))}
                  <div className="slider__block">
                    <div className="title title_fz15 title_fz15_font">
                      {item.title}
                    </div>
                    <div className="title title_fz15 title_fz15_font">
                      {item.price}
                    </div>
                    <a
                      className="button button_solutions title title_fz15 title_fz15_font"
                      href={site.phoneHref}
                    >
                      Заказать
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="solution-controls">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Предыдущее решение"
          >
            ←
          </button>
          <span aria-live="polite">
            {slide + 1} / {count}
          </span>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Следующее решение"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
