import { useEffect, useMemo, useState } from 'react';
import { starterData } from '../data/starterData';
import { clearData, readData, writeData } from '../lib/db';
import { makeId } from '../lib/id';
import type { AppData, BackupLog, Toast } from '../types';

export function useWorkspace() {
  const [data, setData] = useState<AppData>(starterData);
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    let active = true;
    readData()
      .then((stored) => {
        if (active && stored) setData(stored);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeData(data).catch(() => undefined);
  }, [data, ready]);

  function toast(message: string, tone: Toast['tone'] = 'success') {
    const id = makeId('toast');
    setToasts((items) => [...items, { id, message, tone }]);
    window.setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 2800);
  }

  function updateData(updater: (current: AppData) => AppData, message?: string) {
    setData((current) => updater(current));
    if (message) toast(message);
  }

  function importData(nextData: AppData) {
    const log: BackupLog = { id: makeId('backup'), date: new Date().toISOString(), label: 'Imported backup' };
    setData({ ...nextData, backupLogs: [log, ...(nextData.backupLogs ?? [])].slice(0, 10) });
    toast('Backup imported successfully');
  }

  function resetData() {
    clearData().catch(() => undefined);
    setData(starterData);
    toast('Workspace reset', 'info');
  }

  const actions = useMemo(
    () => ({ updateData, toast, importData, resetData }),
    []
  );

  return { data, setData, ready, toasts, actions };
}
