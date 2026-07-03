export type Screen =
  | 'dashboard'
  | 'goals'
  | 'skills'
  | 'projects'
  | 'calendar'
  | 'reviews'
  | 'focus'
  | 'resources'
  | 'notes'
  | 'templates'
  | 'settings';

export type Priority = 'Low' | 'Medium' | 'High';
export type GoalStatus = 'Not started' | 'In progress' | 'Paused' | 'Completed';
export type SkillLevel = 'Beginner' | 'Learning' | 'Comfortable' | 'Confident';
export type ProjectStatus = 'Idea' | 'Planned' | 'Building' | 'Completed';
export type ResourceType = 'Video' | 'Article' | 'Docs' | 'Course' | 'Book' | 'Repo';
export type EventType = 'Study' | 'Project' | 'Review' | 'Deadline';
export type Theme = 'light' | 'dark' | 'system';

export interface Goal {
  id: string;
  title: string;
  area: string;
  priority: Priority;
  status: GoalStatus;
  progress: number;
  startDate: string;
  targetDate: string;
  notes: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: SkillLevel;
  progress: number;
  lastPracticed: string;
  nextReview: string;
  weak: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: ProjectStatus;
  link: string;
  notes: string;
}

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  topic: string;
  url: string;
  status: 'Saved' | 'Using' | 'Done';
  isFree: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  topic: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  nextReview: string;
  reviewStage: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: EventType;
  target: string;
  done: boolean;
}

export interface FocusSession {
  id: string;
  title: string;
  target: string;
  minutes: number;
  date: string;
  notes: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  goals: Omit<Goal, 'id'>[];
  skills: Omit<Skill, 'id'>[];
  resources: Omit<Resource, 'id'>[];
  projects: Omit<Project, 'id'>[];
}

export interface BackupLog {
  id: string;
  date: string;
  label: string;
}

export interface Settings {
  theme: Theme;
  compactMode: boolean;
  dailyTargetMinutes: number;
  firstDayOfWeek: 'Sunday' | 'Monday';
}

export interface AppData {
  goals: Goal[];
  skills: Skill[];
  projects: Project[];
  resources: Resource[];
  notes: Note[];
  events: CalendarEvent[];
  focusSessions: FocusSession[];
  backupLogs: BackupLog[];
  settings: Settings;
}

export interface Toast {
  id: string;
  message: string;
  tone: 'success' | 'info' | 'danger';
}
