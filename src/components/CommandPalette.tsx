import { useEffect, useMemo, useState } from 'react';
import { navigationItems } from './Sidebar';
import type { AppData, Screen } from '../types';

interface CommandPaletteProps {
  open: boolean;
  data: AppData;
  onClose: () => void;
  onNavigate: (screen: Screen) => void;
}

export function CommandPalette({ open, data, onClose, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  const commands = useMemo(() => {
    const navigation = navigationItems.map((item) => ({ label: `Open ${item.label}`, target: item.id }));
    const goals = data.goals.map((goal) => ({ label: `Goal: ${goal.title}`, target: 'goals' as Screen }));
    const notes = data.notes.map((note) => ({ label: `Note: ${note.title}`, target: 'notes' as Screen }));
    const projects = data.projects.map((project) => ({ label: `Project: ${project.title}`, target: 'projects' as Screen }));
    const resources = data.resources.map((resource) => ({ label: `Resource: ${resource.title}`, target: 'resources' as Screen }));
    return [...navigation, ...goals, ...notes, ...projects, ...resources];
  }, [data]);

  const filtered = commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase())).slice(0, 12);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <div className="mx-auto mt-16 max-w-2xl rounded-3xl border border-slate-200 bg-white p-3 shadow-soft dark:border-slate-800 dark:bg-slate-950" onMouseDown={(event) => event.stopPropagation()}>
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type to jump anywhere..."
          className="w-full rounded-2xl border-0 bg-slate-100 px-4 py-4 text-base font-semibold text-slate-950 outline-none dark:bg-slate-900 dark:text-white"
        />
        <div className="mt-3 max-h-96 overflow-y-auto">
          {filtered.map((command) => (
            <button
              key={`${command.target}-${command.label}`}
              onClick={() => {
                onNavigate(command.target);
                onClose();
              }}
              className="w-full rounded-2xl px-4 py-3 text-left text-sm font-bold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              {command.label}
            </button>
          ))}
          {filtered.length === 0 && <p className="px-4 py-6 text-center text-sm text-slate-500">No matches found.</p>}
        </div>
      </div>
    </div>
  );
}
