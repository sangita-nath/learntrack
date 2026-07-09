import { useState } from 'react';
import { Badge } from '../../components/Badge';
import { EmptyState } from '../../components/EmptyState';
import { SectionTitle } from '../../components/SectionTitle';
import { makeId } from '../../lib/id';
import type { AppData, Resource, ResourceType } from '../../types';

interface ResourcesProps {
  data: AppData;
  query: string;
  updateData: (updater: (current: AppData) => AppData, message?: string) => void;
}

export function Resources({ data, query, updateData }: ResourcesProps) {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('Frontend');
  const [url, setUrl] = useState('');
  const [type, setType] = useState<ResourceType>('Article');
  const [filter, setFilter] = useState<ResourceType | 'All'>('All');

  const resources = data.resources.filter((resource) => {
    const matchesQuery = `${resource.title} ${resource.topic} ${resource.url}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'All' || resource.type === filter;
    return matchesQuery && matchesFilter;
  });

  function addResource() {
    if (!title.trim()) return;
    const resource: Resource = { id: makeId('resource'), title: title.trim(), topic, url, type, status: 'Saved', isFree: true };
    updateData((current) => ({ ...current, resources: [resource, ...current.resources] }), 'Resource saved');
    setTitle('');
    setUrl('');
  }

  function deleteResource(id: string) {
    updateData((current) => ({ ...current, resources: current.resources.filter((resource) => resource.id !== id) }), 'Resource removed');
  }

  return (
    <div className="space-y-6">
      <div className="panel">
        <SectionTitle title="Save resource" description="Collect articles, docs, courses, videos, books, and repositories." />
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_160px_auto]">
          <input className="input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Resource title" />
          <input className="input" value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="Topic" />
          <input className="input" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="URL" />
          <select className="input" value={type} onChange={(event) => setType(event.target.value as ResourceType)}>
            <option>Video</option><option>Article</option><option>Docs</option><option>Course</option><option>Book</option><option>Repo</option>
          </select>
          <button onClick={addResource} className="btn btn-primary">Save</button>
        </div>
      </div>

      <div className="panel">
        <SectionTitle
          title="Library"
          description="Filter and open saved learning material."
          action={
            <select value={filter} onChange={(event) => setFilter(event.target.value as ResourceType | 'All')} className="input w-44">
              <option>All</option><option>Video</option><option>Article</option><option>Docs</option><option>Course</option><option>Book</option><option>Repo</option>
            </select>
          }
        />
        {resources.length === 0 ? <EmptyState title="No resources found" description="Save a resource or change your filter." /> : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {resources.map((resource) => (
              <div key={resource.id} className="rounded-3xl border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-slate-950 dark:text-white">{resource.title}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{resource.topic}</p>
                  </div>
                  <Badge>{resource.type}</Badge>
                </div>
                <div className="mt-4 flex gap-2">
                  {resource.url ? <a href={resource.url} target="_blank" rel="noreferrer" className="btn btn-primary flex-1">Open</a> : <span className="btn btn-soft flex-1">No link</span>}
                  <button onClick={() => deleteResource(resource.id)} className="btn btn-soft">Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
