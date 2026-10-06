import { useId, useState } from "react";
import { Dialog } from "./Dialog.jsx";
import { Tabs } from "./Tabs.jsx";

export function Portfolio({ page }) {
  const id = useId();
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(null);
  const images = page.galleries[active].images;
  const move = (direction) =>
    setZoom((index) => (index + direction + images.length) % images.length);
  return (
    <section className="portfolio" id="portfolio">
      <img
        src="/img/image-background/background_four.png"
        alt=""
        loading="lazy"
        className="image-background image-background_portfolio"
      />
      <div className="container">
        <h2
          className="title title_fz80 portfolio__title"
          data-motion="animate__backInLeft"
        >
          НАШИ РАБОТЫ
        </h2>
        <div
          className="title title_gradient title_fz30 title_fz30_unset portfolio__subtitle"
          data-motion="animate__backInRight"
        >
          Портфолио выполненных работ
        </div>
        <Tabs
          id={id}
          labels={page.galleries.map((item) => item.title)}
          active={active}
          onChange={setActive}
          className={page.portfolioTabsClass}
          buttonClassName="title title_fz21 title_fz21_tab portfolio__tab"
          activeClassName="portfolio__tab_active"
          label="Категории портфолио"
        />
        {page.galleries.map((gallery, group) => (
          <div
            key={gallery.title}
            id={`${id}-panel-${group}`}
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`${id}-tab-${group}`}
            hidden={active !== group}
          >
            <div className={gallery.className}>
              {gallery.images.map((image, index) => (
                <a
                  key={image.src}
                  href={image.src}
                  className={image.className}
                  data-motion="animate__zoomIn"
                  aria-label={`Увеличить: ${image.caption || gallery.title}, фото ${index + 1}`}
                  onClick={(event) => {
                    event.preventDefault();
                    setZoom(index);
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.caption || `${gallery.title}, фото ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      {zoom !== null && (
        <Dialog
          label="Просмотр фотографии"
          className="lightbox"
          onClose={() => setZoom(null)}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              move(-1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              move(1);
            }
          }}
        >
          <figure>
            <img
              src={images[zoom].src}
              alt={images[zoom].caption || page.galleries[active].title}
            />
            <figcaption aria-live="polite">
              {images[zoom].caption} · {zoom + 1} / {images.length}
            </figcaption>
          </figure>
          <div className="lightbox-controls">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Предыдущая фотография"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Следующая фотография"
            >
              →
            </button>
          </div>
        </Dialog>
      )}
    </section>
  );
}
