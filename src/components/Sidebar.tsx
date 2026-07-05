import type { Screen } from '../types';

const items: { id: Screen; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'goals', label: 'Goals' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'reviews', label: 'Review' },
  { id: 'focus', label: 'Focus' },
  { id: 'resources', label: 'Resources' },
  { id: 'notes', label: 'Notes' },
  { id: 'templates', label: 'Templates' },
  { id: 'settings', label: 'Settings' }
];

interface SidebarProps {
  active: Screen;
  onChange: (screen: Screen) => void;
}

export function Sidebar({ active, onChange }: SidebarProps) {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white/80 p-5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70 lg:block">
      <div className="mb-8">
        <p className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">LearnTrack</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your learning workspace</p>
      </div>
      <nav className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
              active === item.id
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export function MobileNav({ active, onChange }: SidebarProps) {
  return (
    <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 p-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 lg:hidden">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xl font-black text-slate-950 dark:text-white">LearnTrack</p>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-900 dark:text-slate-300">Ctrl K</span>
      </div>
      <select value={active} onChange={(event) => onChange(event.target.value as Screen)} className="input">
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export { items as navigationItems };
