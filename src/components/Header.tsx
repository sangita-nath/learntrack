import type { Screen } from '../types';

interface HeaderProps {
  active: Screen;
  query: string;
  onQueryChange: (value: string) => void;
  onOpenCommand: () => void;
}

const titles: Record<Screen, string> = {
  dashboard: 'Dashboard',
  goals: 'Learning goals',
  skills: 'Skill tracker',
  projects: 'Project board',
  calendar: 'Calendar planner',
  reviews: 'Review queue',
  focus: 'Focus mode',
  resources: 'Resource library',
  notes: 'Notes',
  templates: 'Learning templates',
  settings: 'Settings'
};

export function Header({ active, query, onQueryChange, onOpenCommand }: HeaderProps) {
  return (
    <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Workspace</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 dark:text-white">{titles[active]}</h1>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search goals, notes, projects..."
          className="input sm:w-80"
        />
        <button onClick={onOpenCommand} className="btn btn-soft whitespace-nowrap">
          Command menu
        </button>
      </div>
    </header>
  );
}
