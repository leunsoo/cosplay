export function normalizePhone(input: string) {
  return input.replace(/\D/g, '').slice(0, 11);
}

export function formatPhoneKorea(input: string) {
  const d = normalizePhone(input);

  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`; // 11자리
}
