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
