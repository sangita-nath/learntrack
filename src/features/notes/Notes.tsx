import { useState } from 'react';
import { Badge } from '../../components/Badge';
import { EmptyState } from '../../components/EmptyState';
import { SectionTitle } from '../../components/SectionTitle';
import { addDays, todayISO } from '../../lib/date';
import { makeId } from '../../lib/id';
import type { AppData, Note } from '../../types';

interface NotesProps {
  data: AppData;
  query: string;
  updateData: (updater: (current: AppData) => AppData, message?: string) => void;
}

export function Notes({ data, query, updateData }: NotesProps) {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('General');
  const [content, setContent] = useState('');

  const notes = data.notes
    .filter((note) => `${note.title} ${note.topic} ${note.content}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt.localeCompare(a.updatedAt));

  function addNote() {
    if (!title.trim() || !content.trim()) return;
    const note: Note = {
      id: makeId('note'),
      title: title.trim(),
      topic,
      content: content.trim(),
      pinned: false,
      createdAt: todayISO(),
      updatedAt: todayISO(),
      nextReview: addDays(todayISO(), 1),
      reviewStage: 0
    };
    updateData((current) => ({ ...current, notes: [note, ...current.notes] }), 'Note added');
    setTitle('');
    setContent('');
  }

  function updateNote(id: string, patch: Partial<Note>) {
    updateData((current) => ({ ...current, notes: current.notes.map((note) => (note.id === id ? { ...note, ...patch, updatedAt: todayISO() } : note)) }));
  }

  function deleteNote(id: string) {
    updateData((current) => ({ ...current, notes: current.notes.filter((note) => note.id !== id) }), 'Note removed');
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <div className="panel h-fit">
        <SectionTitle title="Add note" description="Notes automatically enter the review system." />
        <div className="space-y-3">
          <input className="input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Note title" />
          <input className="input" value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="Topic" />
          <textarea className="input min-h-40" value={content} onChange={(event) => setContent(event.target.value)} placeholder="Write the note..." />
          <button onClick={addNote} className="btn btn-primary w-full">Save note</button>
        </div>
      </div>

      <div className="panel">
        <SectionTitle title="Notebook" description="Pinned notes stay on top and all notes can be reviewed later." />
        {notes.length === 0 ? <EmptyState title="No notes found" description="Create a note or change your search." /> : (
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="rounded-3xl border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-black text-slate-950 dark:text-white">{note.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{note.topic} · next review {note.nextReview}</p>
                  </div>
                  {note.pinned && <Badge>Pinned</Badge>}
                </div>
                <textarea className="input mt-4 min-h-28" value={note.content} onChange={(event) => updateNote(note.id, { content: event.target.value })} />
                <div className="mt-3 flex gap-2">
                  <button onClick={() => updateNote(note.id, { pinned: !note.pinned })} className="btn btn-soft flex-1">{note.pinned ? 'Unpin' : 'Pin'}</button>
                  <button onClick={() => deleteNote(note.id)} className="btn btn-soft">Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
