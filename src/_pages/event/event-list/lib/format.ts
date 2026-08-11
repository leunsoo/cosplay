export function formatEventPrice(price: number): string {
  return price === 0 ? '무료' : `${price.toLocaleString()}원`;
}

export function formatMemberCount(current: number, max: number): string {
  return `${current} / ${max} 명`;
}
