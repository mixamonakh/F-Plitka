import test from "node:test";
import assert from "node:assert/strict";
import { getPageKey } from "../src/lib/routes.js";

test("legacy URLs resolve to their new destinations", () => {
  assert.equal(getPageKey("/"), "index");
  for (const key of ["index", "bathroom", "styling", "confidentiality"])
    assert.equal(getPageKey(`/${key}.html`), key);
  assert.equal(getPageKey("/phototile.html"), "styling");
  assert.equal(getPageKey("/ceny/"), "styling");
  assert.equal(getPageKey("/kalkulyator/"), "calculator");
  assert.equal(getPageKey("/uslugi/ukladka-plitki-v-vannoy/"), "bathroom");
  assert.equal(getPageKey("/raboty/"), "portfolio");
  assert.equal(getPageKey("/o-nas/"), "about");
  assert.equal(getPageKey("/kontakty/"), "contacts");
});

test("unknown paths and the removed PHP handler are not mapped to the homepage", () => {
  for (const url of ["/missing", "/mailer/smart.php", "/nested/bathroom.html"])
    assert.equal(getPageKey(url), null);
});
