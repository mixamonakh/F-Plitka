import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { getPageKey } from "../src/lib/routes.js";
import { redirects } from "../src/content/pages.js";

export function siteRoutesPlugin() {
  const install = (server, preview = false) => {
    server.middlewares.use(async (req, res, next) => {
      const url = new URL(req.url, "http://localhost");
      if (!["GET", "HEAD"].includes(req.method)) return next();
      const destination =
        redirects[url.pathname] ||
        (!url.pathname.endsWith("/") && getPageKey(`${url.pathname}/`)
          ? `${url.pathname}/`
          : null);
      if (destination) {
        res.writeHead(301, { Location: `${destination}${url.search}` });
        res.end();
        return;
      }
      if (
        getPageKey(url.pathname) ||
        url.pathname.startsWith("/api/") ||
        !req.headers.accept?.includes("text/html")
      )
        return next();
      try {
        const file = resolve(
          server.config.root,
          preview ? `${server.config.build.outDir}/404.html` : "index.html",
        );
        const source = await readFile(file, "utf8");
        const html = preview
          ? source
          : await server.transformIndexHtml(url.pathname, source);
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end(req.method === "HEAD" ? "" : html);
      } catch {
        next();
      }
    });
  };
  return {
    name: "site-routes",
    configureServer: (server) => install(server),
    configurePreviewServer: (server) => install(server, true),
  };
}
