import { rateById } from "../content/pages.js";
import { site } from "../content/site.js";

export function calculateTotal(price, area, coupon) {
  const rate = Number(price);
  const square = Number(String(area).replace(",", "."));
  if (
    !Number.isFinite(rate) ||
    !Number.isFinite(square) ||
    rate <= 0 ||
    square <= 0
  )
    return 0;
  const total = rate * square * (coupon.trim() === "7778" ? 0.9 : 1);
  return Number.isFinite(total) ? Math.round(total * 100) / 100 : 0;
}

export const defaultCalculation = {
  mode: "quick",
  geometry: "areas",
  floorArea: "4.5",
  wallArea: "18",
  L: "2.5",
  W: "1.8",
  H: "2.7",
  floorEnabled: true,
  walls: { a: true, b: true, c: true, d: true },
  doorW: "0.8",
  doorH: "2",
  material: "porcelain",
  prep: "ready",
  layout: "straight",
  cuts: "0",
  holes: "0",
  grout: "cement",
  waterproofing: false,
  coupon: "",
  format: "600x600",
  reserve: "10",
  address: "",
  floorNumber: "",
  lift: "freight",
  items: [],
};
export const formatNumber = (n) =>
  Number(n).toLocaleString("ru-RU", { maximumFractionDigits: 2 });
export const formatMoney = (n) => `${formatNumber(n)} ₽`;
const round = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const supportedFormats = ["200x200", "300x600", "600x600", "600x1200"];

// Принимаем только параметры. Ни ставка, ни итог из браузера не используются.
export function normalizeCalculation(value = {}) {
  const source =
    value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const next = {
    ...defaultCalculation,
    walls: { ...defaultCalculation.walls },
    items: [],
  };
  for (const key of Object.keys(defaultCalculation)) {
    if (key === "walls" || key === "items") continue;
    if (typeof source[key] === "string" || typeof source[key] === "number")
      next[key] = String(source[key]).slice(0, key === "address" ? 500 : 64);
  }
  next.floorEnabled = source.floorEnabled !== false;
  next.waterproofing = source.waterproofing === true;
  if (source.walls && typeof source.walls === "object") {
    for (const key of ["a", "b", "c", "d"])
      next.walls[key] = source.walls[key] === true;
  }
  if (Array.isArray(source.items))
    next.items = source.items
      .slice(0, 30)
      .map((item) => ({
        id: String(item?.id ?? "").slice(0, 40),
        quantity: String(item?.quantity ?? "").slice(0, 32),
      }));
  for (const [key, values] of Object.entries({
    mode: ["quick", "detail", "tiles"],
    geometry: ["areas", "dimensions"],
    prep: ["ready", "demolish", "prepare", "unknown"],
    layout: ["straight", "offset", "diagonal", "complex"],
    grout: ["none", "cement", "epoxy"],
    lift: ["freight", "passenger", "none"],
    format: supportedFormats,
  })) {
    if (!values.includes(next[key])) next[key] = defaultCalculation[key];
  }
  return next;
}

export function calculateEstimate(value, matrix = rateById) {
  const state = normalizeCalculation(value);
  const errors = [];
  const number = (value, label, max = 1_000_000) => {
    const text = String(value ?? "")
      .trim()
      .replace(",", ".");
    if (!text) return 0;
    const n = Number(text);
    if (
      !/^\d*(\.\d*)?$/.test(text) ||
      !Number.isFinite(n) ||
      n < 0 ||
      n > max
    ) {
      errors.push(`${label}: введите число от 0 до ${formatNumber(max)}.`);
      return 0;
    }
    return n;
  };
  let floor = 0,
    walls = 0,
    perimeter = 0,
    openings = 0;
  if (state.geometry === "dimensions") {
    const L = number(state.L, "Длина", 1000),
      W = number(state.W, "Ширина", 1000),
      H = number(state.H, "Высота", 1000);
    floor = state.floorEnabled ? L * W : 0;
    perimeter =
      (state.walls.a ? L : 0) +
      (state.walls.c ? L : 0) +
      (state.walls.b ? W : 0) +
      (state.walls.d ? W : 0);
    openings =
      perimeter > 0
        ? number(state.doorW, "Ширина проёма", 1000) *
          number(state.doorH, "Высота проёма", 1000)
        : 0;
    if (openings > perimeter * H)
      errors.push("Площадь проёма больше площади выбранных стен.");
    walls = Math.max(0, perimeter * H - openings);
  } else {
    floor = number(state.floorArea, "Площадь пола");
    walls = number(state.wallArea, "Площадь стен");
  }
  const lines = [],
    unknowns = [];
  const addUnknown = (id, label, quantity, unit) => {
    if (!unknowns.some((line) => line.id === id && line.label === label))
      unknowns.push({ id, label, quantity, unit, price: null });
  };
  const add = (id, label, quantity, unit = "м²") => {
    if (!quantity) return;
    const rate = matrix[id]?.price;
    if (!(Number.isFinite(rate) && rate > 0))
      addUnknown(id, label, quantity, unit);
    else
      lines.push({
        id,
        label,
        quantity,
        unit,
        price: rate,
        sum: round(quantity * rate),
      });
  };
  let area = floor + walls;
  if (state.items.length) {
    const ids = new Set();
    area = 0;
    for (const item of state.items) {
      if (ids.has(item.id)) {
        errors.push("Одна операция не может начисляться дважды.");
        continue;
      }
      ids.add(item.id);
      const rate = matrix[item.id];
      const quantity = number(item.quantity, rate?.label || "Количество");
      if (!rate) {
        addUnknown(item.id, "Операция без утверждённой ставки", quantity, "");
        continue;
      }
      if (rate.unit === "шт" && !Number.isInteger(quantity))
        errors.push(`${rate.label}: укажите целое количество.`);
      add(item.id, rate.label, quantity, rate.unit);
      if (rate.category === "laying" && rate.unit === "м²") area += quantity;
    }
    if (
      ids.has("shower") &&
      [
        "ceramic",
        "porcelain",
        "large",
        "mosaic",
        "walls",
        "preparation",
        "waterproofing",
      ].some((id) => ids.has(id))
    )
      errors.push(
        "Выберите комплекс душевого поддона или его операции, чтобы не считать работу дважды.",
      );
  } else {
    add(state.material, "Укладка · пол", floor);
    add(state.material, "Укладка · стены", walls);
    if (area > 0) {
      if (state.prep === "demolish")
        addUnknown("demolition", "Демонтаж старой плитки", area, "м²");
      if (state.prep === "prepare")
        addUnknown("preparation", "Подготовка основания", area, "м²");
      if (state.prep === "unknown")
        addUnknown(
          "preparation",
          "Основание — оценим по фото или на замере",
          area,
          "м²",
        );
      if (state.layout !== "straight")
        addUnknown(
          "layout",
          `Раскладка: ${{ offset: "со смещением", diagonal: "диагональная", complex: "сложная" }[state.layout]}`,
          area,
          "м²",
        );
      if (state.grout !== "none")
        addUnknown(
          state.grout,
          state.grout === "epoxy"
            ? "Эпоксидная затирка, нанесение"
            : "Цементная затирка, нанесение",
          area,
          "м²",
        );
      if (state.waterproofing)
        addUnknown("waterproofing", "Гидроизоляция мокрых зон", null, "м²");
    }
    const cuts = number(state.cuts, "Запил под 45°"),
      holes = number(state.holes, "Отверстия");
    if (!Number.isInteger(holes))
      errors.push("Отверстия: укажите целое количество.");
    if (cuts) addUnknown("cuts", "Запил под 45°", cuts, "пог. м");
    if (holes) addUnknown("holes", "Отверстия", holes, "шт");
  }
  const subtotal = round(lines.reduce((total, line) => total + line.sum, 0));
  // Скидка сайта применяется один раз; купон 7778 подтверждает ту же скидку.
  const discount = round(subtotal * 0.1);
  const reserve = number(state.reserve, "Запас", 100);
  const [width, height] = state.format.split("x").map(Number);
  const tileArea = (width * height) / 1_000_000;
  const materialArea = area * (1 + reserve / 100);
  const tiles = Math.ceil(Math.max(0, materialArea / tileArea - 1e-9));
  return {
    floor: round(floor),
    walls: round(walls),
    perimeter: round(perimeter),
    openings: round(openings),
    area: round(area),
    lines,
    unknowns,
    subtotal,
    discount,
    total: errors.length ? null : round(subtotal - discount),
    reserve,
    tileArea,
    materialArea: round(materialArea),
    tiles: errors.length ? null : tiles,
    errors,
    priceDate: site.priceDate,
    couponApplied: state.coupon.trim() === "7778",
  };
}

export function calculationHref(value) {
  const state = normalizeCalculation(value);
  // Контактные данные и адрес не помещаются в URL.
  return `/kalkulyator/?calc=${encodeURIComponent(JSON.stringify({ ...state, address: "", floorNumber: "" }))}`;
}

export function estimateText(result) {
  return [
    `Предварительный расчёт. Прайс от ${site.priceDateLabel}`,
    ...result.lines.map(
      (line) =>
        `${line.label}: ${formatNumber(line.quantity)} ${line.unit} × ${formatMoney(line.price)} = ${formatMoney(line.sum)}`,
    ),
    `Скидка 10%: −${formatMoney(result.discount)}`,
    `Известные работы: ${result.total === null ? "проверьте параметры" : result.lines.length ? formatMoney(result.total) : "по смете"}`,
    ...result.unknowns.map((line) => `${line.label}: по смете`),
    "Плитка, клей и смесь для затирки — отдельно. Окончательная цена после проверки объёмов.",
  ].join("\n");
}
