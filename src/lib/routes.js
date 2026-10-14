import { pages, redirects } from "../content/pages.js";
const paths = new Map(
  Object.values(pages)
    .filter((page) => !page.redirect)
    .map((page) => [page.path, page.key]),
);
export function getPageKey(pathname) {
  return paths.get(redirects[pathname] || pathname) ?? null;
}
