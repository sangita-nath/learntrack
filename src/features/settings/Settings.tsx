import { useRef } from 'react';
import { SectionTitle } from '../../components/SectionTitle';
import { downloadTextFile, exportWorkspace, getApproxSize, parseWorkspaceBackup } from '../../lib/storage';
import type { AppData, Theme } from '../../types';

interface SettingsProps {
  data: AppData;
  importData: (data: AppData) => void;
  resetData: () => void;
  updateData: (updater: (current: AppData) => AppData, message?: string) => void;
  toast: (message: string, tone?: 'success' | 'info' | 'danger') => void;
}

export function Settings({ data, importData, resetData, updateData, toast }: SettingsProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function exportData() {
    downloadTextFile('learntrack-backup.json', exportWorkspace(data));
    updateData((current) => ({
      ...current,
      backupLogs: [{ id: `backup-${Date.now()}`, date: new Date().toISOString(), label: 'Exported backup' }, ...current.backupLogs].slice(0, 10)
    }), 'Backup exported');
  }

  async function handleImport(file: File) {
    try {
      importData(parseWorkspaceBackup(await file.text()));
    } catch (error) {
      toast(error instanceof Error ? error.message : 'Unable to import backup', 'danger');
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="panel">
        <SectionTitle title="Preferences" description="Adjust the workspace for your study style." />
        <div className="space-y-4">
          <div>
            <label className="label">Theme</label>
            <select className="input" value={data.settings.theme} onChange={(event) => updateData((current) => ({ ...current, settings: { ...current.settings, theme: event.target.value as Theme } }), 'Theme updated')}>
              <option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option>
            </select>
          </div>
          <div>
            <label className="label">Daily focus target</label>
            <input className="input" type="number" min="15" step="15" value={data.settings.dailyTargetMinutes} onChange={(event) => updateData((current) => ({ ...current, settings: { ...current.settings, dailyTargetMinutes: Number(event.target.value) } }))} />
          </div>
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <input type="checkbox" checked={data.settings.compactMode} onChange={(event) => updateData((current) => ({ ...current, settings: { ...current.settings, compactMode: event.target.checked } }))} />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Use compact layout spacing</span>
          </label>
        </div>
      </div>

      <div className="panel">
        <SectionTitle title="Backup center" description="Export, import, or reset your local workspace data." />
        <div className="grid gap-3 sm:grid-cols-3">
          <button onClick={exportData} className="btn btn-primary">Export JSON</button>
          <button onClick={() => inputRef.current?.click()} className="btn btn-soft">Import JSON</button>
          <button onClick={resetData} className="btn btn-soft">Reset data</button>
        </div>
        <input ref={inputRef} type="file" accept="application/json" className="hidden" onChange={(event) => event.target.files?.[0] && handleImport(event.target.files[0])} />
        <div className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Storage used</p>
          <p className="mt-1 text-2xl font-black text-slate-950 dark:text-white">{getApproxSize(data)}</p>
        </div>
        <div className="mt-6 space-y-3">
          {data.backupLogs.map((log) => (
            <div key={log.id} className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
              <p className="font-bold text-slate-900 dark:text-white">{log.label}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{new Date(log.date).toLocaleString()}</p>
            </div>
          ))}
          {data.backupLogs.length === 0 && <p className="text-sm text-slate-500 dark:text-slate-400">No backup activity yet.</p>}
        </div>
      </div>
    </div>
  );
}
