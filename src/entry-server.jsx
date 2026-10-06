import { renderToString } from "react-dom/server";
import { App } from "./App.jsx";
export { pages } from "./content/pages.js";

export function render(pageKey) {
  return renderToString(<App pageKey={pageKey} />);
}
