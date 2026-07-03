import { useEffect, useMemo, useState } from 'react';
import { CommandPalette } from './components/CommandPalette';
import { Header } from './components/Header';
import { MobileNav, Sidebar } from './components/Sidebar';
import { ToastHost } from './components/ToastHost';
import { Dashboard } from './features/analytics/Dashboard';
import { Calendar } from './features/calendar/Calendar';
import { Focus } from './features/focus/Focus';
import { Goals } from './features/goals/Goals';
import { Notes } from './features/notes/Notes';
import { Projects } from './features/projects/Projects';
import { Resources } from './features/resources/Resources';
import { Reviews } from './features/reviews/Reviews';
import { Settings } from './features/settings/Settings';
import { Skills } from './features/skills/Skills';
import { Templates } from './features/templates/Templates';
import { useWorkspace } from './hooks/useWorkspace';
import type { Screen } from './types';

export default function App() {
  const { data, ready, toasts, actions } = useWorkspace();
  const [active, setActive] = useState<Screen>('dashboard');
  const [query, setQuery] = useState('');
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen(true);
      }
      if (event.key === 'Escape') setCommandOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = data.settings.theme === 'dark' || (data.settings.theme === 'system' && systemDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, [data.settings.theme]);

  const page = useMemo(() => {
    const shared = { data, query, updateData: actions.updateData };
    switch (active) {
      case 'dashboard':
        return <Dashboard data={data} />;
      case 'goals':
        return <Goals {...shared} />;
      case 'skills':
        return <Skills {...shared} />;
      case 'projects':
        return <Projects {...shared} />;
      case 'calendar':
        return <Calendar data={data} updateData={actions.updateData} />;
      case 'reviews':
        return <Reviews data={data} updateData={actions.updateData} />;
      case 'focus':
        return <Focus data={data} updateData={actions.updateData} />;
      case 'resources':
        return <Resources {...shared} />;
      case 'notes':
        return <Notes {...shared} />;
      case 'templates':
        return <Templates updateData={actions.updateData} />;
      case 'settings':
        return <Settings data={data} importData={actions.importData} resetData={actions.resetData} updateData={actions.updateData} toast={actions.toast} />;
      default:
        return <Dashboard data={data} />;
    }
  }, [active, actions, data, query]);

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
        <div className="text-center">
          <p className="text-3xl font-black">LearnTrack</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Loading workspace...</p>
        </div>
      </main>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white ${data.settings.compactMode ? 'text-[14px]' : ''}`}>
      <MobileNav active={active} onChange={setActive} />
      <div className="flex min-h-screen">
        <Sidebar active={active} onChange={setActive} />
        <main className="min-w-0 flex-1 p-4 md:p-8">
          <Header active={active} query={query} onQueryChange={setQuery} onOpenCommand={() => setCommandOpen(true)} />
          {page}
        </main>
      </div>
      <CommandPalette open={commandOpen} data={data} onClose={() => setCommandOpen(false)} onNavigate={setActive} />
      <ToastHost toasts={toasts} />
    </div>
  );
}
