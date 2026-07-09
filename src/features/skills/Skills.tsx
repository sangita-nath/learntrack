import { useState } from 'react';
import { Badge } from '../../components/Badge';
import { EmptyState } from '../../components/EmptyState';
import { ProgressBar } from '../../components/ProgressBar';
import { SectionTitle } from '../../components/SectionTitle';
import { addDays, formatDate, todayISO } from '../../lib/date';
import { makeId } from '../../lib/id';
import type { AppData, Skill, SkillLevel } from '../../types';

interface SkillsProps {
  data: AppData;
  query: string;
  updateData: (updater: (current: AppData) => AppData, message?: string) => void;
}

export function Skills({ data, query, updateData }: SkillsProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Frontend');
  const skills = data.skills.filter((skill) => `${skill.name} ${skill.category}`.toLowerCase().includes(query.toLowerCase()));

  function addSkill() {
    if (!name.trim()) return;
    const skill: Skill = {
      id: makeId('skill'),
      name: name.trim(),
      category,
      level: 'Beginner',
      progress: 10,
      lastPracticed: todayISO(),
      nextReview: addDays(todayISO(), 1),
      weak: false
    };
    updateData((current) => ({ ...current, skills: [skill, ...current.skills] }), 'Skill added');
    setName('');
  }

  function updateSkill(id: string, patch: Partial<Skill>) {
    updateData((current) => ({ ...current, skills: current.skills.map((skill) => (skill.id === id ? { ...skill, ...patch } : skill)) }));
  }

  function deleteSkill(id: string) {
    updateData((current) => ({ ...current, skills: current.skills.filter((skill) => skill.id !== id) }), 'Skill removed');
  }

  return (
    <div className="space-y-6">
      <div className="panel">
        <SectionTitle title="Add skill" description="Track progress and review weak topics regularly." />
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <input className="input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Skill name" />
          <input className="input" value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
          <button onClick={addSkill} className="btn btn-primary">Add skill</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((skill) => (
          <div key={skill.id} className="panel">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-black text-slate-950 dark:text-white">{skill.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{skill.category}</p>
              </div>
              {skill.weak && <Badge>Weak topic</Badge>}
            </div>
            <div className="mt-4"><ProgressBar value={skill.progress} /></div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Next review: {formatDate(skill.nextReview)}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <select className="input" value={skill.level} onChange={(event) => updateSkill(skill.id, { level: event.target.value as SkillLevel })}>
                <option>Beginner</option><option>Learning</option><option>Comfortable</option><option>Confident</option>
              </select>
              <input className="input" type="number" min="0" max="100" value={skill.progress} onChange={(event) => updateSkill(skill.id, { progress: Number(event.target.value), lastPracticed: todayISO() })} />
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={() => updateSkill(skill.id, { weak: !skill.weak })} className="btn btn-soft flex-1">{skill.weak ? 'Mark stable' : 'Mark weak'}</button>
              <button onClick={() => deleteSkill(skill.id)} className="btn btn-soft">Remove</button>
            </div>
          </div>
        ))}
      </div>
      {skills.length === 0 && <EmptyState title="No skills found" description="Add a skill or change your search." />}
    </div>
  );
}
