const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_MS = 24 * 60 * 60 * 1000;

export const TAKA = '৳';

export function formatAmount(value: number) {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatTaka(value: number) {
  return `${TAKA} ${formatAmount(value)}`;
}

export function formatCompact(value: number) {
  if (value < 1000) return String(Math.round(value));
  const thousands = value / 1000;
  const text = thousands >= 100 ? String(Math.round(thousands)) : thousands.toFixed(1);
  return `${text.replace(/\.0$/, '')}k`;
}

const VISIBLE_DIGITS = 4;

export function maskPhone(phone: string) {
  const hidden = phone.length - VISIBLE_DIGITS * 2;
  if (hidden <= 0) return phone;
  return `${phone.slice(0, VISIBLE_DIGITS)}${'•'.repeat(hidden)}${phone.slice(-VISIBLE_DIGITS)}`;
}

export function startOfDay(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function addDays(date: Date, days: number) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function formatTime(date: Date) {
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours % 12 || 12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
}

export function formatReceivedAt(date: Date, now = new Date()) {
  const daysAgo = Math.round((startOfDay(now).getTime() - startOfDay(date).getTime()) / DAY_MS);
  if (daysAgo === 0) return formatTime(date);
  if (daysAgo === 1) return 'Gotokal';
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}
