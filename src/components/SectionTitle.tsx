import type React from 'react';

interface SectionTitleProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function SectionTitle({ title, description, action }: SectionTitleProps) {
  return (
    <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">{title}</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      {action}
    </div>
  );
}
