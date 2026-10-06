export function getPageKey(pathname) {
  if (pathname === "/" || pathname === "/index.html") return "index";
  const match = /^\/(bathroom|phototile|styling|confidentiality)\.html$/.exec(
    pathname,
  );
  return match?.[1] ?? null;
}
