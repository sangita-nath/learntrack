import { useState } from 'react';
import { Badge } from '../../components/Badge';
import { EmptyState } from '../../components/EmptyState';
import { SectionTitle } from '../../components/SectionTitle';
import { makeId } from '../../lib/id';
import type { AppData, Project, ProjectStatus } from '../../types';

interface ProjectsProps {
  data: AppData;
  query: string;
  updateData: (updater: (current: AppData) => AppData, message?: string) => void;
}

const columns: ProjectStatus[] = ['Idea', 'Planned', 'Building', 'Completed'];

export function Projects({ data, query, updateData }: ProjectsProps) {
  const [title, setTitle] = useState('');
  const [stack, setStack] = useState('React, TypeScript');

  const projects = data.projects.filter((project) => `${project.title} ${project.description} ${project.stack}`.toLowerCase().includes(query.toLowerCase()));

  function addProject() {
    if (!title.trim()) return;
    const project: Project = {
      id: makeId('project'),
      title: title.trim(),
      description: 'Describe what this project should solve and what makes it useful.',
      stack,
      difficulty: 'Medium',
      status: 'Idea',
      link: '',
      notes: ''
    };
    updateData((current) => ({ ...current, projects: [project, ...current.projects] }), 'Project added');
    setTitle('');
  }

  function updateProject(id: string, patch: Partial<Project>) {
    updateData((current) => ({ ...current, projects: current.projects.map((project) => (project.id === id ? { ...project, ...patch } : project)) }));
  }

  function deleteProject(id: string) {
    updateData((current) => ({ ...current, projects: current.projects.filter((project) => project.id !== id) }), 'Project removed');
  }

  return (
    <div className="space-y-6">
      <div className="panel">
        <SectionTitle title="Add project" description="Keep project ideas moving from idea to finished work." />
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <input className="input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Project title" />
          <input className="input" value={stack} onChange={(event) => setStack(event.target.value)} placeholder="Tech stack" />
          <button onClick={addProject} className="btn btn-primary">Add project</button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {columns.map((column) => {
          const items = projects.filter((project) => project.status === column);
          return (
            <div key={column} className="panel min-h-96">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-black text-slate-950 dark:text-white">{column}</p>
                <Badge>{items.length}</Badge>
              </div>
              <div className="space-y-3">
                {items.map((project) => (
                  <div key={project.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70">
                    <p className="font-black text-slate-950 dark:text-white">{project.title}</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{project.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2"><Badge>{project.difficulty}</Badge><Badge>{project.stack}</Badge></div>
                    <select className="input mt-4" value={project.status} onChange={(event) => updateProject(project.id, { status: event.target.value as ProjectStatus })}>
                      {columns.map((status) => <option key={status}>{status}</option>)}
                    </select>
                    <textarea className="input mt-3 min-h-20" value={project.notes} onChange={(event) => updateProject(project.id, { notes: event.target.value })} placeholder="Project notes" />
                    <button onClick={() => deleteProject(project.id)} className="btn btn-soft mt-3 w-full">Remove</button>
                  </div>
                ))}
                {items.length === 0 && <EmptyState title="Empty" description="Move or add a project here." />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
