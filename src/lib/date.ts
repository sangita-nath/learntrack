export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function addDays(dateISO: string, days: number): string {
  const date = new Date(`${dateISO}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export function daysBetween(fromISO: string, toISO: string): number {
  const oneDay = 24 * 60 * 60 * 1000;
  const from = new Date(`${fromISO}T00:00:00`).getTime();
  const to = new Date(`${toISO}T00:00:00`).getTime();
  return Math.ceil((to - from) / oneDay);
}

export function formatDate(dateISO: string): string {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${dateISO}T00:00:00`));
}

export function monthMatrix(dateISO: string): Date[] {
  const anchor = new Date(`${dateISO}T00:00:00`);
  const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

export function toISO(date: Date): string {
  return date.toISOString().slice(0, 10);
}
