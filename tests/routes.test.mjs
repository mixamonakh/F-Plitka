import test from "node:test";
import assert from "node:assert/strict";
import { getPageKey } from "../src/lib/routes.js";

test("existing page URLs remain directly addressable", () => {
  assert.equal(getPageKey("/"), "index");
  for (const key of [
    "index",
    "bathroom",
    "phototile",
    "styling",
    "confidentiality",
  ])
    assert.equal(getPageKey(`/${key}.html`), key);
});

test("unknown paths and the removed PHP handler are not mapped to the homepage", () => {
  for (const url of ["/missing", "/mailer/smart.php", "/nested/bathroom.html"])
    assert.equal(getPageKey(url), null);
});
