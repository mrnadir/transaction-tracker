import { addDays, startOfDay } from '@/utils/format';

export type Provider = 'bkash' | 'nagad';

export type Transaction = {
  id: string;
  provider: Provider;
  sender: string;
  txnId: string;
  amount: number;
  receivedAt: Date;
};

export const PROVIDER_LABELS: Record<Provider, string> = {
  bkash: 'bKash',
  nagad: 'Nagad',
};

export const PROVIDERS: Provider[] = ['bkash', 'nagad'];

export function isProvider(value: unknown): value is Provider {
  return value === 'bkash' || value === 'nagad';
}

/** Label and ID length as they appear in each provider's payment SMS. */
export const TXN_ID_FORMAT: Record<Provider, { label: string; length: number }> = {
  bkash: { label: 'TrxID', length: 10 },
  nagad: { label: 'TxnID', length: 8 },
};

const TXN_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
const PHONE_PREFIXES = ['013', '014', '015', '016', '017', '018', '019'];

function createRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateMockTransactions(now: Date, days: number): Transaction[] {
  const random = createRandom(20261001);
  const pick = <T>(items: readonly T[]) => items[Math.floor(random() * items.length)];
  const today = startOfDay(now);
  const transactions: Transaction[] = [];

  for (let offset = 0; offset < days; offset++) {
    const day = addDays(today, -offset);
    const count = 3 + Math.floor(random() * 6);

    for (let index = 0; index < count; index++) {
      const receivedAt = new Date(day);
      receivedAt.setMinutes(8 * 60 + Math.floor(random() * 14 * 60));
      const provider: Provider = random() < 0.6 ? 'bkash' : 'nagad';
      const amount = (10 + Math.floor(random() * 60)) * 50;
      const sender = pick(PHONE_PREFIXES) + String(Math.floor(random() * 1e8)).padStart(8, '0');
      const txnId = Array.from({ length: TXN_ID_FORMAT[provider].length }, () =>
        pick(TXN_CHARS)
      ).join('');

      if (receivedAt > now) continue;
      transactions.push({ id: `${offset}-${index}`, provider, sender, txnId, amount, receivedAt });
    }
  }

  return transactions.sort((a, b) => b.receivedAt.getTime() - a.receivedAt.getTime());
}

const MOCK_TRANSACTIONS = generateMockTransactions(new Date(), 21);

export function useTransactions() {
  return MOCK_TRANSACTIONS;
}

export type DateRange = { start: Date; end: Date };

export function filterByRange(transactions: Transaction[], { start, end }: DateRange) {
  return transactions.filter((t) => t.receivedAt >= start && t.receivedAt < end);
}

export function summarize(transactions: Transaction[]) {
  const byProvider: Record<Provider, { total: number; count: number }> = {
    bkash: { total: 0, count: 0 },
    nagad: { total: 0, count: 0 },
  };
  for (const t of transactions) {
    byProvider[t.provider].total += t.amount;
    byProvider[t.provider].count += 1;
  }
  return {
    total: byProvider.bkash.total + byProvider.nagad.total,
    count: transactions.length,
    byProvider,
  };
}

export function todayRange(now = new Date()): DateRange {
  const start = startOfDay(now);
  return { start, end: addDays(start, 1) };
}

export type WeekOption = 'this' | 'last';

export const WEEK_LABELS: Record<WeekOption, string> = {
  this: 'This Week',
  last: 'Last Week',
};

export const WEEKDAY_LABELS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

/** Weeks start on Saturday, as is common in Bangladesh. */
export function weekRange(option: WeekOption, now = new Date()): DateRange {
  const today = startOfDay(now);
  const daysSinceSaturday = (today.getDay() + 1) % 7;
  const start = addDays(today, -daysSinceSaturday - (option === 'last' ? 7 : 0));
  return { start, end: addDays(start, 7) };
}

export function dailyTotals(transactions: Transaction[], weekStart: Date) {
  return WEEKDAY_LABELS.map((label, index) => {
    const start = addDays(weekStart, index);
    const total = filterByRange(transactions, { start, end: addDays(start, 1) }).reduce(
      (sum, t) => sum + t.amount,
      0
    );
    return { label, total };
  });
}
