import { templates } from '../../data/starterData';
import { SectionTitle } from '../../components/SectionTitle';
import { Badge } from '../../components/Badge';
import { makeId } from '../../lib/id';
import type { AppData, Template } from '../../types';

interface TemplatesProps {
  updateData: (updater: (current: AppData) => AppData, message?: string) => void;
}

export function Templates({ updateData }: TemplatesProps) {
  function applyTemplate(template: Template) {
    updateData((current) => ({
      ...current,
      goals: [...template.goals.map((goal) => ({ ...goal, id: makeId('goal') })), ...current.goals],
      skills: [...template.skills.map((skill) => ({ ...skill, id: makeId('skill') })), ...current.skills],
      resources: [...template.resources.map((resource) => ({ ...resource, id: makeId('resource') })), ...current.resources],
      projects: [...template.projects.map((project) => ({ ...project, id: makeId('project') })), ...current.projects]
    }), 'Template applied');
  }

  return (
    <div className="panel">
      <SectionTitle title="Learning templates" description="Start faster with ready-made paths for common learning goals." />
      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <div key={template.id} className="rounded-3xl border border-slate-200 p-5 dark:border-slate-800">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xl font-black text-slate-950 dark:text-white">{template.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{template.description}</p>
              </div>
              <Badge>{template.goals.length + template.skills.length + template.projects.length} items</Badge>
            </div>
            <div className="mt-5 grid grid-cols-4 gap-2 text-center">
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900"><p className="font-black text-slate-950 dark:text-white">{template.goals.length}</p><p className="text-xs text-slate-500">Goals</p></div>
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900"><p className="font-black text-slate-950 dark:text-white">{template.skills.length}</p><p className="text-xs text-slate-500">Skills</p></div>
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900"><p className="font-black text-slate-950 dark:text-white">{template.resources.length}</p><p className="text-xs text-slate-500">Links</p></div>
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900"><p className="font-black text-slate-950 dark:text-white">{template.projects.length}</p><p className="text-xs text-slate-500">Projects</p></div>
            </div>
            <button onClick={() => applyTemplate(template)} className="btn btn-primary mt-5 w-full">Apply template</button>
          </div>
        ))}
      </div>
    </div>
  );
}
