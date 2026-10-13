import test from "node:test";
import assert from "node:assert/strict";
import { calculateTotal } from "../src/lib/calculator.js";
import { pages } from "../src/content/pages.js";

test("approved tile rates use the existing 7778 coupon", () => {
  assert.deepEqual(
    pages.styling.calculator.map((item) => item.price),
    [2500, 3000, 7000, 15000, 4500, 5500, 8000],
  );
  assert.equal(calculateTotal(2500, 15, ""), 37500);
  assert.equal(calculateTotal(2500, 15, "7778"), 33750);
  assert.equal(calculateTotal(2500, 15, "7779"), 37500);
});

test("phototile rates and fractional area work", () => {
  assert.deepEqual(
    pages.phototile.calculator.map((item) => item.price),
    [12000, 20000],
  );
  assert.equal(calculateTotal(12000, "2.5", ""), 30000);
  assert.equal(calculateTotal(20000, "2,5", "7778"), 45000);
  assert.equal(calculateTotal(2500, "0.15", ""), 375);
});

test("empty, zero, negative and invalid inputs never bill for one square metre", () => {
  for (const area of ["", "0", "-5", "text", "Infinity"])
    assert.equal(calculateTotal(1400, area, ""), 0);
  assert.equal(calculateTotal("", 15, ""), 0);
  assert.equal(calculateTotal(Infinity, 15, ""), 0);
  assert.equal(calculateTotal(1400, "1e309", ""), 0);
});
