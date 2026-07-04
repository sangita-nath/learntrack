import { addDays, todayISO } from './date';

const intervals = [1, 3, 7, 14, 30, 60];

export function nextReviewDate(stage: number, quality: 'hard' | 'good'): { stage: number; date: string } {
  const nextStage = quality === 'hard' ? Math.max(0, stage - 1) : Math.min(intervals.length - 1, stage + 1);
  return { stage: nextStage, date: addDays(todayISO(), intervals[nextStage]) };
}

export function isDue(dateISO: string): boolean {
  return dateISO <= todayISO();
}
