import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { getPageKey } from "./lib/routes.js";
import { pages } from "./content/pages.js";
import "@fontsource/fira-sans/cyrillic-400.css";
import "@fontsource/fira-sans/latin-400.css";
import "@fontsource/fira-sans/cyrillic-500.css";
import "@fontsource/fira-sans/latin-500.css";
import "@fontsource/montserrat/cyrillic-400.css";
import "@fontsource/montserrat/latin-400.css";
import "@fontsource/montserrat/cyrillic-500.css";
import "@fontsource/montserrat/latin-500.css";
import "@fontsource/montserrat/cyrillic-600.css";
import "@fontsource/montserrat/latin-600.css";
import "./sass/style.scss";
import "./styles.css";
import "./sass/handoff.scss";

const pageKey = getPageKey(window.location.pathname);
const root = document.getElementById("root");
document.title = pages[pageKey]?.title ?? "Страница не найдена";
const app = (
  <StrictMode>
    <App pageKey={pageKey} />
  </StrictMode>
);
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
