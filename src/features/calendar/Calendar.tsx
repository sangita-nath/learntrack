import { useState } from 'react';
import { Badge } from '../../components/Badge';
import { SectionTitle } from '../../components/SectionTitle';
import { monthMatrix, toISO, todayISO } from '../../lib/date';
import { makeId } from '../../lib/id';
import type { AppData, CalendarEvent, EventType } from '../../types';

interface CalendarProps {
  data: AppData;
  updateData: (updater: (current: AppData) => AppData, message?: string) => void;
}

export function Calendar({ data, updateData }: CalendarProps) {
  const [anchor, setAnchor] = useState(todayISO());
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState('18:00');
  const [type, setType] = useState<EventType>('Study');
  const days = monthMatrix(anchor);
  const currentMonth = new Date(`${anchor}T00:00:00`).getMonth();

  function addEvent() {
    if (!title.trim()) return;
    const event: CalendarEvent = { id: makeId('event'), title: title.trim(), date, time, type, target: title.trim(), done: false };
    updateData((current) => ({ ...current, events: [...current.events, event] }), 'Calendar item added');
    setTitle('');
  }

  function toggleEvent(id: string) {
    updateData((current) => ({ ...current, events: current.events.map((event) => (event.id === id ? { ...event, done: !event.done } : event)) }));
  }

  function removeEvent(id: string) {
    updateData((current) => ({ ...current, events: current.events.filter((event) => event.id !== id) }), 'Calendar item removed');
  }

  function moveMonth(amount: number) {
    const next = new Date(`${anchor}T00:00:00`);
    next.setMonth(next.getMonth() + amount);
    setAnchor(toISO(next));
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="panel">
        <SectionTitle
          title="Month plan"
          description="Schedule study sessions, project work, reviews, and deadlines."
          action={
            <div className="flex gap-2">
              <button onClick={() => moveMonth(-1)} className="btn btn-soft">Previous</button>
              <button onClick={() => setAnchor(todayISO())} className="btn btn-soft">Today</button>
              <button onClick={() => moveMonth(1)} className="btn btn-soft">Next</button>
            </div>
          }
        />
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <div key={day}>{day}</div>)}
        </div>
        <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-7">
          {days.map((day) => {
            const iso = toISO(day);
            const items = data.events.filter((event) => event.date === iso);
            return (
              <div key={iso} className={`min-h-36 rounded-2xl border p-3 ${day.getMonth() === currentMonth ? 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950' : 'border-slate-100 bg-slate-50 text-slate-400 dark:border-slate-900 dark:bg-slate-900/40'}`}>
                <div className="mb-2 flex items-center justify-between">
                  <span className={`text-sm font-black ${iso === todayISO() ? 'rounded-full bg-slate-900 px-2 py-1 text-white dark:bg-white dark:text-slate-950' : ''}`}>{day.getDate()}</span>
                  {items.length > 0 && <Badge>{items.length}</Badge>}
                </div>
                <div className="space-y-2">
                  {items.slice(0, 3).map((item) => (
                    <button key={item.id} onClick={() => toggleEvent(item.id)} className={`w-full rounded-xl px-2 py-2 text-left text-xs font-bold ${item.done ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200' : 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200'}`}>
                      {item.time} · {item.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <div className="panel">
          <SectionTitle title="Add schedule" description="Plan one focused item." />
          <div className="space-y-3">
            <input className="input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Study React hooks" />
            <div className="grid grid-cols-2 gap-3">
              <input className="input" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
              <input className="input" type="time" value={time} onChange={(event) => setTime(event.target.value)} />
            </div>
            <select className="input" value={type} onChange={(event) => setType(event.target.value as EventType)}>
              <option>Study</option><option>Project</option><option>Review</option><option>Deadline</option>
            </select>
            <button onClick={addEvent} className="btn btn-primary w-full">Add to calendar</button>
          </div>
        </div>
        <div className="panel">
          <SectionTitle title="All planned items" description="Click an item in the calendar to mark done." />
          <div className="space-y-3">
            {data.events.slice().sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)).slice(0, 8).map((event) => (
              <div key={event.id} className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
                <p className="font-bold text-slate-900 dark:text-white">{event.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{event.date} · {event.time} · {event.type}</p>
                <button onClick={() => removeEvent(event.id)} className="mt-2 text-xs font-bold text-slate-500 hover:text-red-500">Remove</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
