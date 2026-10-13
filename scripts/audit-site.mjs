import { readdir, readFile, stat, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { parse } from "parse5";
import sharp from "sharp";

const root = path.resolve("dist");
const errors = [];
const refs = new Set();
const external = new Set();
const attr = (node, name) =>
  node.attrs?.find((item) => item.name === name)?.value;
const walk = (node) => [node, ...(node.childNodes ?? []).flatMap(walk)];
const files = async (dir) =>
  (
    await Promise.all(
      (await readdir(dir, { withFileTypes: true })).map((item) =>
        item.isDirectory()
          ? files(path.join(dir, item.name))
          : path.join(dir, item.name),
      ),
    )
  ).flat();
const builtFiles = await files(root);
const documents = new Map();
for (const file of builtFiles.filter((file) => file.endsWith(".html")))
  documents.set(file, walk(parse(await readFile(file, "utf8"))));
async function checkRef(ref, from) {
  if (/^https?:/.test(ref)) {
    external.add(ref);
    return;
  }
  if (/^(data:|mailto:)/.test(ref)) return;
  if (ref.startsWith("tel:")) {
    if (!/^tel:\+?\d{7,15}$/.test(ref))
      errors.push(`${from}: invalid telephone ${ref}`);
    return;
  }
  if (!ref || ref === "#") {
    errors.push(`${from}: empty reference`);
    return;
  }
  const parsed = new URL(
    ref,
    `https://audit.local/${path.relative(root, from)}`,
  );
  const target = path.join(
    root,
    decodeURIComponent(
      parsed.pathname === "/" ? "/index.html" : parsed.pathname,
    ),
  );
  refs.add(target);
  try {
    if (!(await stat(target)).isFile()) throw new Error();
  } catch {
    errors.push(`${path.relative(root, from)}: missing ${ref}`);
    return;
  }
  if (
    parsed.hash &&
    documents.has(target) &&
    !documents
      .get(target)
      .some(
        (node) => attr(node, "id") === decodeURIComponent(parsed.hash.slice(1)),
      )
  )
    errors.push(`${path.relative(root, from)}: missing anchor ${ref}`);
}
let images = 0;
for (const [file, nodes] of documents) {
  const ids = nodes.map((node) => attr(node, "id")).filter(Boolean);
  for (const id of new Set(ids))
    if (ids.filter((value) => value === id).length > 1)
      errors.push(`${file}: duplicate id ${id}`);
  if (
    attr(
      nodes.find((node) => node.tagName === "html"),
      "lang",
    ) !== "ru"
  )
    errors.push(`${file}: incorrect document language`);
  if (nodes.filter((node) => node.tagName === "h1").length !== 1)
    errors.push(`${file}: expected one h1`);
  if (
    !file.endsWith("/404.html") &&
    !nodes.some(
      (node) =>
        node.tagName === "meta" &&
        attr(node, "name") === "description" &&
        attr(node, "content"),
    )
  )
    errors.push(`${file}: missing description`);
  for (const node of nodes) {
    for (const key of ["href", "src", "action"]) {
      if (
        key === "action" &&
        node.tagName === "form" &&
        attr(node, key) === "/api/contact" &&
        attr(node, "method") === "post"
      )
        continue;
      if (attr(node, key) !== undefined) await checkRef(attr(node, key), file);
    }
    if (node.tagName === "img") {
      images++;
      if (attr(node, "alt") === undefined)
        errors.push(`${file}: missing img alt`);
      if (/^https?:/.test(attr(node, "src")))
        errors.push(`${file}: remote image dependency`);
    }
    if (node.tagName === "iframe" && !attr(node, "title"))
      errors.push(`${file}: iframe missing title`);
    if (node.tagName === "label" && !ids.includes(attr(node, "for")))
      errors.push(`${file}: label without matching field ${attr(node, "for")}`);
    if (
      ["a", "button"].includes(node.tagName) &&
      (node.childNodes ?? [])
        .flatMap(walk)
        .some((child) => ["a", "button"].includes(child.tagName))
    )
      errors.push(`${file}: nested interactive element`);
    if (node.tagName === "script" && /^https?:/.test(attr(node, "src")))
      errors.push(`${file}: CDN script dependency`);
  }
}
for (const file of builtFiles.filter((file) => file.endsWith(".css"))) {
  const css = await readFile(file, "utf8");
  for (const match of css.matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/g))
    await checkRef(match[1], file);
}
const rasterFiles = builtFiles.filter((file) =>
  /\.(png|jpe?g|webp|gif|svg)$/i.test(file),
);
for (const file of rasterFiles) {
  try {
    await sharp(file, { animated: true }).stats();
  } catch (error) {
    errors.push(
      `${path.relative(root, file)}: image cannot be decoded: ${error.message}`,
    );
  }
}
for (const file of builtFiles)
  if (/\.(php|exe|zip|crdownload)$/i.test(file))
    errors.push(`Unexpected deploy artifact: ${file}`);
const report = {
  pages: documents.size,
  imageElements: images,
  decodedImages: rasterFiles.length,
  checkedLocalTargets: refs.size,
  external: [...external].sort(),
  errors,
};
await mkdir("reports", { recursive: true });
await writeFile(
  "reports/site-audit.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
