import { useState } from "react";
import { Dialog } from "./Dialog.jsx";
import { site } from "../content/site.js";

export function Navigation({ page }) {
  const [open, setOpen] = useState(false);
  const stylingLinks = page.nav.slice(3, 12);
  const mainLinks = [...page.nav.slice(0, 3), ...page.nav.slice(12)];
  return (
    <>
      <button
        type="button"
        className="hamburger"
        aria-label="Открыть меню"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>
      <Dialog
        open={open}
        label="Навигация"
        className="navigation-dialog"
        onClose={() => setOpen(false)}
      >
        <div className="menu-block">
          <a href={site.phoneHref}>Телефон</a>
          <a href={site.telegramHref}>Telegram</a>
        </div>
        <nav aria-label="Основная навигация">
          <ul className="menu__list">
            {mainLinks.slice(0, 3).map((item) => (
              <li key={item.href}>
                <a
                  className="menu__link"
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <details>
                <summary className="menu__link">Укладка плитки</summary>
                <ul className="menu__list">
                  {stylingLinks.map((item) => (
                    <li key={item.href}>
                      <a
                        className="menu__link menu__link_accordion"
                        href={item.href}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            {mainLinks.slice(3).map((item) => (
              <li key={item.href}>
                <a
                  className="menu__link"
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Dialog>
    </>
  );
}
