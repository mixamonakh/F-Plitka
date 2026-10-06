import test from "node:test";
import assert from "node:assert/strict";
import { calculateTotal } from "../src/lib/calculator.js";
import { pages } from "../src/content/pages.js";

test("existing tile rates and the 7778 coupon remain unchanged", () => {
  assert.deepEqual(
    pages.styling.calculator.map((item) => item.price),
    [1400, 2000, 1200, 2200, 2000, 600, 3000],
  );
  assert.equal(calculateTotal(1400, 15, ""), 21000);
  assert.equal(calculateTotal(1400, 15, "7778"), 18900);
  assert.equal(calculateTotal(1400, 15, "7779"), 21000);
});

test("phototile rates and fractional area work", () => {
  assert.deepEqual(
    pages.phototile.calculator.map((item) => item.price),
    [8000, 15000],
  );
  assert.equal(calculateTotal(8000, "2.5", ""), 20000);
  assert.equal(calculateTotal(15000, "2,5", "7778"), 33750);
  assert.equal(calculateTotal(1400, "0.15", ""), 210);
});

test("empty, zero, negative and invalid inputs never bill for one square metre", () => {
  for (const area of ["", "0", "-5", "text", "Infinity"])
    assert.equal(calculateTotal(1400, area, ""), 0);
  assert.equal(calculateTotal("", 15, ""), 0);
  assert.equal(calculateTotal(Infinity, 15, ""), 0);
  assert.equal(calculateTotal(1400, "1e309", ""), 0);
});
