import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateEstimate,
  defaultCalculation,
  normalizeCalculation,
} from "../src/lib/calculator.js";
import { rateById, services, pages } from "../src/content/pages.js";
import { validateContact } from "../server/contact.js";
import { contactText } from "../server/delivery.js";

const calculate = (state) =>
  calculateEstimate({ ...defaultCalculation, ...state });
test("approved example: floor 4.5 and walls 18 porcelain, one website discount", () => {
  const result = calculate({});
  assert.equal(result.subtotal, 67500);
  assert.equal(result.discount, 6750);
  assert.equal(result.total, 60750);
  assert.equal(calculate({ coupon: "7778" }).total, 60750);
  assert.equal(calculate({ coupon: "invalid" }).total, 60750);
});
test("only selected walls are billed; opening does not remove floor area", () => {
  const result = calculate({
    geometry: "dimensions",
    L: "3",
    W: "2",
    H: "2.5",
    walls: { a: true, b: false, c: true, d: false },
    doorW: "0.8",
    doorH: "2",
  });
  assert.equal(result.floor, 6);
  assert.equal(result.perimeter, 6);
  assert.equal(result.walls, 13.4);
  assert.equal(result.total, 52380);
  const noWalls = calculate({
    geometry: "dimensions",
    L: "3",
    W: "2",
    walls: { a: false, b: false, c: false, d: false },
  });
  assert.equal(noWalls.walls, 0);
  assert.equal(noWalls.openings, 0);
  assert.equal(noWalls.total, 16200);
  assert.equal(
    calculate({
      geometry: "dimensions",
      L: "1",
      W: "1",
      H: "1",
      doorW: "9",
      doorH: "9",
    }).total,
    null,
  );
});
test("zero, negatives, malformed values, decimal comma, and large dimensions", () => {
  assert.equal(calculate({ floorArea: "0", wallArea: "0" }).total, 0);
  assert.equal(calculate({ floorArea: "0", wallArea: "0" }).tiles, 0);
  assert.equal(
    calculate({ floorArea: "2,5", wallArea: "0", material: "ceramic" }).total,
    5625,
  );
  for (const value of ["-2", "NaN", "Infinity", "1e309", "2foo", "1000001"]) {
    const result = calculate({ floorArea: value });
    assert.ok(result.errors.length, value);
    assert.equal(result.total, null);
  }
  assert.ok(
    Number.isFinite(
      calculate({ geometry: "dimensions", L: "1000", W: "1000", H: "1000" })
        .total,
    ),
  );
  assert.equal(calculate({ holes: "1.5" }).total, null);
});
test("unpriced operations stay explicit and never add hidden coefficients", () => {
  const base = calculate({});
  const detailed = calculate({
    prep: "unknown",
    layout: "complex",
    cuts: "3",
    holes: "4",
    grout: "epoxy",
    waterproofing: true,
  });
  assert.equal(detailed.total, base.total);
  assert.deepEqual(
    detailed.unknowns.map((line) => line.id),
    ["preparation", "layout", "epoxy", "waterproofing", "cuts", "holes"],
  );
  assert.ok(detailed.unknowns.every((line) => line.price === null));
  const noRate = calculateEstimate(defaultCalculation, {
    ...rateById,
    porcelain: { ...rateById.porcelain, price: null },
  });
  assert.equal(noRate.lines.length, 0);
  assert.ok(noRate.unknowns.some((line) => line.id === "porcelain"));
});
test("reserve and format change tile count without raising labor area or cost", () => {
  const base = calculate({
    floorArea: "10",
    wallArea: "0",
    reserve: "10",
    format: "600x600",
  });
  assert.equal(base.tiles, 31);
  assert.equal(
    calculate({
      floorArea: "10",
      wallArea: "0",
      reserve: "0",
      format: "600x600",
    }).tiles,
    28,
  );
  assert.equal(
    calculate({
      floorArea: "10",
      wallArea: "0",
      reserve: "50",
      format: "300x600",
    }).total,
    base.total,
  );
  assert.equal(
    calculate({ floorArea: "0.36", wallArea: "0", reserve: "0" }).tiles,
    1,
  );
});
test("cart uses correct units and excludes geometry; duplicate and package charges fail", () => {
  const result = calculate({
    items: [
      { id: "steps", quantity: "2,5" },
      { id: "backsplash", quantity: "3" },
    ],
  });
  assert.equal(result.total, 31275);
  assert.equal(result.lines[0].unit, "пог. м");
  assert.equal(result.area, 3);
  assert.equal(
    calculate({
      items: [
        { id: "steps", quantity: "1" },
        { id: "steps", quantity: "1" },
      ],
    }).total,
    null,
  );
  assert.equal(
    calculate({
      items: [
        { id: "shower", quantity: "1" },
        { id: "waterproofing", quantity: "3" },
      ],
    }).total,
    null,
  );
  assert.equal(
    calculate({ items: [{ id: "shower", quantity: "1" }] }).unknowns[0].id,
    "shower",
  );
});
test("server derives the estimate from parameters, discarding client prices and totals", () => {
  const lead = validateContact({
    service: "Укладка плитки на пол",
    name: "Тест",
    phone: "+79990000000",
    check: true,
    calculation: {
      id: "test-calculation",
      createdAt: "2026-10-14T12:00:00.000Z",
      priceDate: "1900-01-01",
      total: 1,
      parameters: { ...defaultCalculation, price: 1, total: 1 },
    },
  });
  assert.equal(lead.calculation.result.total, 60750);
  assert.equal(lead.calculation.priceDate, "2026-10-14");
  assert.equal(lead.calculation.parameters.price, undefined);
  assert.match(contactText(lead), /test-calculation/);
  assert.match(contactText(lead), /по смете/);
  assert.throws(
    () =>
      validateContact({
        service: "Укладка плитки на пол",
        phone: "+79990000000",
        check: true,
        calculation: { parameters: { floorArea: "-1" } },
      }),
    /Введите|введите/,
  );
});
test("normalization does not retain arbitrary fields, new routes have exact metadata", () => {
  assert.equal(normalizeCalculation({ total: 1 }).total, undefined);
  assert.equal(services.length, 10);
  assert.ok(
    services.every(
      (page) =>
        page.path.startsWith("/uslugi/") &&
        page.h1 &&
        page.title &&
        page.rates.length,
    ),
  );
  assert.equal(
    Object.values(pages).filter(
      (page) => !page.redirect && !page.noindex && page.type !== "privacy",
    ).length,
    16,
  );
});
