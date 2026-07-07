import { EmptyState } from '../../components/EmptyState';
import { ProgressBar } from '../../components/ProgressBar';
import { SectionTitle } from '../../components/SectionTitle';
import { StatCard } from '../../components/StatCard';
import { daysBetween, formatDate, todayISO } from '../../lib/date';
import { isDue } from '../../lib/reviewEngine';
import type { AppData } from '../../types';

interface DashboardProps {
  data: AppData;
}

export function Dashboard({ data }: DashboardProps) {
  const today = todayISO();
  const totalMinutes = data.focusSessions.reduce((sum, session) => sum + session.minutes, 0);
  const completedGoals = data.goals.filter((goal) => goal.status === 'Completed').length;
  const dueReviews = data.notes.filter((note) => isDue(note.nextReview)).length + data.skills.filter((skill) => isDue(skill.nextReview)).length;
  const completedEvents = data.events.filter((event) => event.done).length;
  const consistency = data.events.length === 0 ? 0 : Math.round((completedEvents / data.events.length) * 100);
  const target = data.settings.dailyTargetMinutes || 60;
  const todayMinutes = data.focusSessions.filter((session) => session.date === today).reduce((sum, session) => sum + session.minutes, 0);
  const upcoming = data.events.filter((event) => !event.done && event.date >= today).sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)).slice(0, 5);
  const urgentGoals = data.goals
    .filter((goal) => goal.status !== 'Completed')
    .sort((a, b) => daysBetween(today, a.targetDate) - daysBetween(today, b.targetDate))
    .slice(0, 4);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Study time" value={`${totalMinutes}m`} detail={`${todayMinutes}m logged today`} />
        <StatCard label="Due reviews" value={dueReviews} detail="Notes and skills needing attention" />
        <StatCard label="Goals done" value={completedGoals} detail={`${data.goals.length} total goals`} />
        <StatCard label="Consistency" value={`${consistency}%`} detail="Based on planned items completed" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="panel">
          <SectionTitle title="Learning pace" description="A quick view of your current focus and upcoming work." />
          <div className="space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm font-bold text-slate-700 dark:text-slate-200">
                <span>Daily focus target</span>
                <span>{Math.min(100, Math.round((todayMinutes / target) * 100))}%</span>
              </div>
              <ProgressBar value={(todayMinutes / target) * 100} />
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {data.skills.slice(0, 3).map((skill) => (
                <div key={skill.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                  <p className="font-bold text-slate-900 dark:text-white">{skill.name}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{skill.level}</p>
                  <div className="mt-3"><ProgressBar value={skill.progress} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel">
          <SectionTitle title="Upcoming" description="Next planned learning items." />
          {upcoming.length === 0 ? (
            <EmptyState title="Nothing planned" description="Add calendar items to keep the week visible." />
          ) : (
            <div className="space-y-3">
              {upcoming.map((event) => (
                <div key={event.id} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="font-bold text-slate-900 dark:text-white">{event.title}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{formatDate(event.date)} at {event.time} · {event.type}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="panel">
        <SectionTitle title="Deadline radar" description="Goals that need attention soon." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {urgentGoals.map((goal) => {
            const daysLeft = daysBetween(today, goal.targetDate);
            return (
              <div key={goal.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                <p className="font-bold text-slate-900 dark:text-white">{goal.title}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{daysLeft < 0 ? `${Math.abs(daysLeft)} days late` : `${daysLeft} days left`}</p>
                <div className="mt-4"><ProgressBar value={goal.progress} /></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
