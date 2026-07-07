import { useState } from 'react';
import { Badge } from '../../components/Badge';
import { EmptyState } from '../../components/EmptyState';
import { ProgressBar } from '../../components/ProgressBar';
import { SectionTitle } from '../../components/SectionTitle';
import { addDays, daysBetween, todayISO } from '../../lib/date';
import { makeId } from '../../lib/id';
import type { AppData, Goal, GoalStatus, Priority } from '../../types';

interface GoalsProps {
  data: AppData;
  query: string;
  updateData: (updater: (current: AppData) => AppData, message?: string) => void;
}

const initialGoal = (): Omit<Goal, 'id'> => ({
  title: '',
  area: 'General',
  priority: 'Medium',
  status: 'Not started',
  progress: 0,
  startDate: todayISO(),
  targetDate: addDays(todayISO(), 30),
  notes: ''
});

export function Goals({ data, query, updateData }: GoalsProps) {
  const [form, setForm] = useState(initialGoal());
  const [filter, setFilter] = useState<GoalStatus | 'All'>('All');
  const today = todayISO();
  const goals = data.goals.filter((goal) => {
    const matchesQuery = `${goal.title} ${goal.area} ${goal.notes}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'All' || goal.status === filter;
    return matchesQuery && matchesFilter;
  });

  function addGoal() {
    if (!form.title.trim()) return;
    updateData((current) => ({ ...current, goals: [{ ...form, id: makeId('goal'), title: form.title.trim() }, ...current.goals] }), 'Goal added');
    setForm(initialGoal());
  }

  function updateGoal(id: string, patch: Partial<Goal>) {
    updateData((current) => ({ ...current, goals: current.goals.map((goal) => (goal.id === id ? { ...goal, ...patch } : goal)) }));
  }

  function deleteGoal(id: string) {
    updateData((current) => ({ ...current, goals: current.goals.filter((goal) => goal.id !== id) }), 'Goal removed');
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <div className="panel h-fit">
        <SectionTitle title="Add goal" description="Create a clear learning target with a deadline." />
        <div className="space-y-4">
          <div>
            <label className="label">Title</label>
            <input className="input" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Learn TypeScript deeply" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Area</label>
              <input className="input" value={form.area} onChange={(event) => setForm({ ...form, area: event.target.value })} />
            </div>
            <div>
              <label className="label">Priority</label>
              <select className="input" value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value as Priority })}>
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Target date</label>
              <input className="input" type="date" value={form.targetDate} onChange={(event) => setForm({ ...form, targetDate: event.target.value })} />
            </div>
            <div>
              <label className="label">Progress</label>
              <input className="input" type="number" min="0" max="100" value={form.progress} onChange={(event) => setForm({ ...form, progress: Number(event.target.value) })} />
            </div>
          </div>
          <div>
            <label className="label">Notes</label>
            <textarea className="input min-h-24" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
          </div>
          <button onClick={addGoal} className="btn btn-primary w-full">Add goal</button>
        </div>
      </div>

      <div className="panel">
        <SectionTitle
          title="Goals"
          description="Track deadlines, priority, status, and progress."
          action={
            <select value={filter} onChange={(event) => setFilter(event.target.value as GoalStatus | 'All')} className="input w-48">
              <option>All</option><option>Not started</option><option>In progress</option><option>Paused</option><option>Completed</option>
            </select>
          }
        />
        {goals.length === 0 ? (
          <EmptyState title="No goals found" description="Add a goal or adjust the current search/filter." />
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => {
              const daysLeft = daysBetween(today, goal.targetDate);
              return (
                <div key={goal.id} className="rounded-3xl border border-slate-200 p-4 dark:border-slate-800">
                  <div className="flex flex-col justify-between gap-3 md:flex-row">
                    <div>
                      <p className="text-lg font-black text-slate-950 dark:text-white">{goal.title}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{goal.area} · {daysLeft < 0 ? `${Math.abs(daysLeft)} days late` : `${daysLeft} days left`}</p>
                    </div>
                    <div className="flex flex-wrap gap-2"><Badge>{goal.priority}</Badge><Badge>{goal.status}</Badge></div>
                  </div>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{goal.notes}</p>
                  <div className="mt-4"><ProgressBar value={goal.progress} /></div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <select className="input" value={goal.status} onChange={(event) => updateGoal(goal.id, { status: event.target.value as GoalStatus })}>
                      <option>Not started</option><option>In progress</option><option>Paused</option><option>Completed</option>
                    </select>
                    <input className="input" type="number" min="0" max="100" value={goal.progress} onChange={(event) => updateGoal(goal.id, { progress: Number(event.target.value) })} />
                    <button onClick={() => deleteGoal(goal.id)} className="btn btn-soft">Remove</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
