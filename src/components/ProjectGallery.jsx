import { useState } from "react";
import { projects, rooms, materials } from "../content/catalog.js";
import { useUrlFilters } from "../lib/useUrlFilters.js";
import { PageHeading, TextLink } from "./SiteLayout.jsx";

export function ProjectCards({ items = projects, home = false }) {
  return (
    <div className={`ep-project-grid${home ? " ep-project-grid_home" : ""}`}>
      {items.map((project) => (
        <a
          className="ep-project-card"
          href={`/raboty/${project.slug}/`}
          key={project.slug}
        >
          <img
            src={project.image}
            width="600"
            height="450"
            alt={project.title}
            loading="lazy"
            decoding="async"
          />
          <div className="ep-project-card__content">
            <div className="ep-project-card__tags">
              <span>{rooms[project.room]}</span>
              {project.material && <span>{materials[project.material]}</span>}
            </div>
            <h3>{project.title}</h3>
            <p>
              {project.area ? `${project.area} м² · ` : ""}Фотография из
              портфолио Элит-Плит
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
export function ProjectGallery({ home = false, page }) {
  const [filter, update] = useUrlFilters({
    room: "",
    material: "",
    areaRange: "",
  });
  const [shown, setShown] = useState(6);
  const [homeFilter, setHomeFilter] = useState("");
  const items = projects.filter((project) => {
    if (home)
      return (
        !homeFilter ||
        project.room === homeFilter ||
        project.material === homeFilter
      );
    if (filter.room && project.room !== filter.room) return false;
    if (filter.material && project.material !== filter.material) return false;
    if (!filter.areaRange) return true;
    if (project.area === null) return false;
    const [min, max] = {
      small: [0, 5],
      medium: [5, 15],
      large: [15, 40],
      xl: [40, Infinity],
    }[filter.areaRange] || [0, Infinity];
    return project.area >= min && project.area < max;
  });
  const chipRow = (key, label, options) => (
    <div className="ep-filter-row">
      <span>{label}</span>
      <div className="ep-chips">
        {[["", "Все"], ...options].map(([value, name]) => (
          <button
            type="button"
            key={value}
            aria-pressed={filter[key] === value}
            onClick={() => {
              update(key, value);
              setShown(6);
            }}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
  return (
    <>
      {page && (
        <PageHeading page={page}>
          <p className="ep-lead">
            Реальные фотографии наших работ. {projects.length} работ в
            портфолио.
          </p>
        </PageHeading>
      )}
      {home ? (
        <div className="ep-chips">
          {[
            ["", "Все"],
            ["vannaya", "Ванная"],
            ["porcelain", "Керамогранит"],
            ["kuhnya", "Фартук"],
            ["mosaic", "Мозаика"],
            ["lestnica", "Ступени"],
          ].map(([value, name]) => (
            <button
              type="button"
              key={value}
              aria-pressed={homeFilter === value}
              onClick={() => setHomeFilter(value)}
            >
              {name}
            </button>
          ))}
        </div>
      ) : (
        <div className="ep-portfolio-filters">
          {chipRow("room", "Помещение", Object.entries(rooms))}
          {chipRow("material", "Материал", Object.entries(materials))}
          {chipRow("areaRange", "Площадь", [
            ["small", "до 5 м²"],
            ["medium", "5–15 м²"],
            ["large", "15–40 м²"],
            ["xl", "от 40 м²"],
          ])}
        </div>
      )}
      <ProjectCards items={home ? items.slice(0, 6) : items} home={home} />
      {!home && (
        <style>{`.ep-project-grid:not(.ep-project-grid_home) .ep-project-card:nth-child(n+${shown + 1}) { --mobile-hidden: none; }`}</style>
      )}
      {items.length === 0 && (
        <div className="ep-empty" role="status">
          <h2>Нет работ с такими параметрами</h2>
          <p>
            {filter.areaRange
              ? "Площади проектов пока не заполнены. Выберите «Все» в фильтре площади."
              : "Попробуйте другой материал или помещение."}
          </p>
        </div>
      )}
      <div className="ep-portfolio-bottom">
        {home ? (
          <TextLink href="/raboty/">
            Все работы с фильтром по помещению и материалу
          </TextLink>
        ) : (
          <>
            <p role="status">
              <span className="ep-desktop-count">
                Показаны {items.length} из {projects.length}
              </span>
              <span className="ep-mobile-count">
                Показаны {Math.min(shown, items.length)} из {items.length}
              </span>
            </p>
            {shown < items.length && (
              <button
                className="ep-button ep-button_outline ep-load-more"
                type="button"
                onClick={() => setShown((value) => value + 6)}
              >
                Показать ещё
              </button>
            )}
            <TextLink href="/kalkulyator/">Рассчитать похожий проект</TextLink>
          </>
        )}
      </div>
    </>
  );
}
