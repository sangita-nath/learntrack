import { useEffect, useMemo, useState } from 'react';
import { EmptyState } from '../../components/EmptyState';
import { SectionTitle } from '../../components/SectionTitle';
import { todayISO } from '../../lib/date';
import { makeId } from '../../lib/id';
import type { AppData, FocusSession } from '../../types';

interface FocusProps {
  data: AppData;
  updateData: (updater: (current: AppData) => AppData, message?: string) => void;
}

export function Focus({ data, updateData }: FocusProps) {
  const [minutes, setMinutes] = useState(25);
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [title, setTitle] = useState('Focused learning session');
  const [target, setTarget] = useState('General');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (remaining === 0) setRunning(false);
  }, [remaining]);

  const timeLabel = useMemo(() => {
    const mins = Math.floor(remaining / 60).toString().padStart(2, '0');
    const secs = (remaining % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }, [remaining]);

  function resetTimer(nextMinutes = minutes) {
    setMinutes(nextMinutes);
    setRemaining(nextMinutes * 60);
    setRunning(false);
  }

  function saveSession() {
    const session: FocusSession = { id: makeId('session'), title, target, minutes, date: todayISO(), notes };
    updateData((current) => ({ ...current, focusSessions: [session, ...current.focusSessions] }), 'Focus session saved');
    setNotes('');
    resetTimer(minutes);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="panel text-center">
        <SectionTitle title="Focus timer" description="Start a clean session and save it to your study history." />
        <div className="mx-auto flex h-64 w-64 items-center justify-center rounded-full border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
          <span className="text-6xl font-black tracking-tight text-slate-950 dark:text-white">{timeLabel}</span>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {[25, 45, 60].map((item) => <button key={item} onClick={() => resetTimer(item)} className="btn btn-soft">{item}m</button>)}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button onClick={() => setRunning(true)} className="btn btn-primary">Start</button>
          <button onClick={() => setRunning(false)} className="btn btn-soft">Pause</button>
          <button onClick={() => resetTimer(minutes)} className="btn btn-soft">Reset</button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="panel">
          <SectionTitle title="Session details" description="Connect the session to a goal, skill, or project." />
          <div className="space-y-3">
            <input className="input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Session title" />
            <input className="input" value={target} onChange={(event) => setTarget(event.target.value)} placeholder="Target skill or goal" />
            <textarea className="input min-h-28" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="What did you study?" />
            <button onClick={saveSession} className="btn btn-primary w-full">Save session</button>
          </div>
        </div>
        <div className="panel">
          <SectionTitle title="Recent sessions" description="Your saved focus history." />
          {data.focusSessions.length === 0 ? <EmptyState title="No sessions yet" description="Complete and save a focus session." /> : (
            <div className="space-y-3">
              {data.focusSessions.slice(0, 6).map((session) => (
                <div key={session.id} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="font-black text-slate-950 dark:text-white">{session.title}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{session.date} · {session.minutes}m · {session.target}</p>
                  {session.notes && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{session.notes}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
