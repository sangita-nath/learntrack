import { Badge } from '../../components/Badge';
import { EmptyState } from '../../components/EmptyState';
import { SectionTitle } from '../../components/SectionTitle';
import { formatDate, todayISO } from '../../lib/date';
import { isDue, nextReviewDate } from '../../lib/reviewEngine';
import type { AppData } from '../../types';

interface ReviewsProps {
  data: AppData;
  updateData: (updater: (current: AppData) => AppData, message?: string) => void;
}

export function Reviews({ data, updateData }: ReviewsProps) {
  const dueNotes = data.notes.filter((note) => isDue(note.nextReview));
  const dueSkills = data.skills.filter((skill) => isDue(skill.nextReview));

  function reviewNote(id: string, quality: 'hard' | 'good') {
    updateData((current) => ({
      ...current,
      notes: current.notes.map((note) => {
        if (note.id !== id) return note;
        const next = nextReviewDate(note.reviewStage, quality);
        return { ...note, reviewStage: next.stage, nextReview: next.date, updatedAt: todayISO() };
      })
    }), quality === 'good' ? 'Review moved forward' : 'Review scheduled sooner');
  }

  function reviewSkill(id: string, quality: 'hard' | 'good') {
    updateData((current) => ({
      ...current,
      skills: current.skills.map((skill) => {
        if (skill.id !== id) return skill;
        const baseStage = Math.max(0, Math.round(skill.progress / 20));
        const next = nextReviewDate(baseStage, quality);
        return { ...skill, nextReview: next.date, lastPracticed: todayISO(), weak: quality === 'hard' ? true : skill.weak };
      })
    }), quality === 'good' ? 'Skill reviewed' : 'Skill marked for extra practice');
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="panel">
        <SectionTitle title="Notes due" description="Use spaced reviews to keep important ideas fresh." />
        {dueNotes.length === 0 ? (
          <EmptyState title="No notes due" description="Your review queue is clear for notes." />
        ) : (
          <div className="space-y-4">
            {dueNotes.map((note) => (
              <div key={note.id} className="rounded-3xl border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-lg font-black text-slate-950 dark:text-white">{note.title}</p>
                  <Badge>{note.topic}</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{note.content}</p>
                <p className="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">Due: {formatDate(note.nextReview)}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <button onClick={() => reviewNote(note.id, 'hard')} className="btn btn-soft">Review again soon</button>
                  <button onClick={() => reviewNote(note.id, 'good')} className="btn btn-primary">I remember this</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="panel">
        <SectionTitle title="Skills due" description="Review weak skills before they slow down projects." />
        {dueSkills.length === 0 ? (
          <EmptyState title="No skills due" description="You are up to date on skill reviews." />
        ) : (
          <div className="space-y-4">
            {dueSkills.map((skill) => (
              <div key={skill.id} className="rounded-3xl border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-lg font-black text-slate-950 dark:text-white">{skill.name}</p>
                  <Badge>{skill.level}</Badge>
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{skill.category} · {skill.progress}% progress</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <button onClick={() => reviewSkill(skill.id, 'hard')} className="btn btn-soft">Needs practice</button>
                  <button onClick={() => reviewSkill(skill.id, 'good')} className="btn btn-primary">Reviewed well</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
