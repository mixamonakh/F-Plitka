import { readFile, writeFile, rm, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { redirects } from "../src/content/pages.js";
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
  if (page.redirect) continue;
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
    ...(page.noindex ? ['<meta name="robots" content="noindex, follow">'] : []),
    ...(url
      ? [
          `<link rel="canonical" href="${url}">`,
          `<meta property="og:url" content="${url}">`,
        ]
      : []),
  ].join("\n    ");
  const output = `dist${page.path.endsWith("/") ? `${page.path}index.html` : page.path}`;
  await mkdir(dirname(output), { recursive: true });
  await writeFile(
    output,
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
      .filter((page) => !page.redirect && !page.noindex)
      .map((page) => `<url><loc>${siteUrl}${page.path}</loc></url>`)
      .join("")}</urlset>\n`,
  );
await writeFile(
  "dist/_redirects",
  Object.entries(redirects)
    .map(([from, to]) => `${from} ${to} 301`)
    .join("\n") + "\n",
);
await writeFile(
  "dist/.htaccess",
  `# Generated legacy redirects. index.html uses THE_REQUEST to avoid a directory-index loop.\nDirectoryIndex index.html\nErrorDocument 404 /404.html\nRewriteEngine On\nRewriteCond %{THE_REQUEST} \\s/+index\\.html[?\\s] [NC]\nRewriteRule ^index\\.html$ / [R=301,L]\n${Object.entries(
    redirects,
  )
    .filter(([from]) => from !== "/index.html")
    .map(
      ([from, to]) =>
        `RewriteRule ^${from.slice(1).replaceAll(".", "\\.")}$ ${to} [R=301,L]`,
    )
    .join("\n")}\n`,
);
await writeFile(
  "dist/legacy-redirects.nginx.conf",
  `# Include inside the site server block.\n${Object.entries(redirects)
    .filter(([from]) => from !== "/index.html")
    .map(
      ([from, to]) => `location = ${from} { return 301 ${to}$is_args$args; }`,
    )
    .join(
      "\n",
    )}\n# Only an external index.html request is redirected; internal directory indexes stay available.\nif ($request_uri ~ "^/index[.]html([?]|$)") { return 301 /$is_args$args; }\n# Serve nested index.html and return a real 404 for unknown routes.\nlocation / { try_files $uri $uri/ =404; }\nerror_page 404 /404.html;\n`,
);
await rm(".prerender", { recursive: true, force: true });
console.log(
  `Prerendered ${Object.values(pages).filter((page) => !page.redirect).length} pages and 404.html${siteUrl ? ` for ${siteUrl}` : "; SITE_URL is not set (canonical URLs and sitemap omitted)"}.`,
);
