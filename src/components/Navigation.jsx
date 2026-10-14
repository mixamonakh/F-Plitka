import { useState } from "react";
import { Dialog } from "./Dialog.jsx";
import { site } from "../content/site.js";
import { navigation, services } from "../content/pages.js";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <button
        type="button"
        className="ep-menu-button"
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
        onClose={close}
      >
        <a href="/" className="ep-menu-logo">
          <img src={site.logo} width="96" height="65" alt="Элит-Плит" />
        </a>
        <nav aria-label="Мобильная навигация">
          <a href="/" onClick={close}>
            Главная
          </a>
          <details>
            <summary>Услуги</summary>
            <div>
              {services.map((service) => (
                <a key={service.key} href={service.path} onClick={close}>
                  {service.label}
                </a>
              ))}
            </div>
          </details>
          {navigation.slice(1).map((item) => (
            <a key={item.href} href={item.href} onClick={close}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ep-menu-contacts">
          <a href={site.phoneHref}>{site.phoneLabel}</a>
          <a href={site.telegramHref}>Telegram</a>
        </div>
      </Dialog>
    </>
  );
}
