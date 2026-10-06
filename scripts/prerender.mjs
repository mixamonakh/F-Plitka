import { readFile, writeFile, rm } from "node:fs/promises";
import { render, pages } from "../.prerender/entry-server.js";
import { loadEnv } from "vite";

const template = await readFile("dist/index.html", "utf8");
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const configuredUrl =
  process.env.SITE_URL ?? loadEnv("production", process.cwd(), "").SITE_URL;
const siteUrl = configuredUrl?.replace(/\/$/, "");
if (siteUrl) {
  const parsed = new URL(siteUrl);
  if (parsed.protocol !== "https:" || parsed.origin !== siteUrl)
    throw new Error(
      "SITE_URL must be an HTTPS origin, e.g. https://example.ru",
    );
}
for (const page of Object.values(pages)) {
  const url = siteUrl ? `${siteUrl}${page.path}` : null;
  const image = `${siteUrl ?? ""}/img/header/background__header-one.jpg`;
  const meta = [
    `<meta name="description" content="${escape(page.description)}">`,
    '<meta property="og:type" content="website">',
    '<meta property="og:locale" content="ru_RU">',
    `<meta property="og:title" content="${escape(page.title)}">`,
    `<meta property="og:description" content="${escape(page.description)}">`,
    `<meta property="og:image" content="${image}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    ...(url
      ? [
          `<link rel="canonical" href="${url}">`,
          `<meta property="og:url" content="${url}">`,
        ]
      : []),
  ].join("\n    ");
  await writeFile(
    `dist/${page.key}.html`,
    template
      .replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
      .replace("<!-- page-meta -->", meta)
      .replace("<!-- app-html -->", () => render(page.key)),
  );
}
await writeFile(
  "dist/404.html",
  template
    .replace(/<title>.*?<\/title>/, "<title>Страница не найдена</title>")
    .replace("<!-- page-meta -->", '<meta name="robots" content="noindex">')
    .replace("<!-- app-html -->", () => render(null)),
);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ""}`,
);
if (siteUrl)
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.values(
      pages,
    )
      .map((page) => `<url><loc>${siteUrl}${page.path}</loc></url>`)
      .join("")}</urlset>\n`,
  );
await rm(".prerender", { recursive: true, force: true });
console.log(
  `Prerendered ${Object.keys(pages).length} pages and 404.html${siteUrl ? ` for ${siteUrl}` : "; SITE_URL is not set (canonical URLs and sitemap omitted)"}.`,
);
