import type { AppData } from '../types';

export function exportWorkspace(data: AppData): string {
  return JSON.stringify({ exportedAt: new Date().toISOString(), app: 'LearnTrack', data }, null, 2);
}

export function parseWorkspaceBackup(text: string): AppData {
  const parsed = JSON.parse(text) as { data?: AppData } | AppData;
  const data = 'data' in parsed && parsed.data ? parsed.data : parsed;
  if (!('goals' in data) || !('skills' in data) || !('projects' in data) || !('settings' in data)) {
    throw new Error('This file does not look like a LearnTrack backup.');
  }
  return data as AppData;
}

export function downloadTextFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function getApproxSize(data: unknown): string {
  const bytes = new Blob([JSON.stringify(data)]).size;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
