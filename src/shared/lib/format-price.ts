export function formatPrice(value: number): string {
  if (value === 0) return '';
  return value.toLocaleString('ko-KR');
}

export function parsePrice(input: string): number {
  const raw = input.replace(/,/g, '');
  if (raw === '') return 0;
  const parsed = Number(raw);
  return isNaN(parsed) ? 0 : parsed;
}
