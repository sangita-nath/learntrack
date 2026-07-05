interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
      <p className="text-base font-bold text-slate-800 dark:text-slate-100">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}
