import type { Toast } from '../types';

interface ToastHostProps {
  toasts: Toast[];
}

export function ToastHost({ toasts }: ToastHostProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-soft dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
