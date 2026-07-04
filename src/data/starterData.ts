import type { AppData, Template } from '../types';
import { addDays, todayISO } from '../lib/date';

const today = todayISO();

export const starterData: AppData = {
  goals: [
    {
      id: 'goal-react',
      title: 'Build a strong React foundation',
      area: 'Frontend',
      priority: 'High',
      status: 'In progress',
      progress: 58,
      startDate: addDays(today, -12),
      targetDate: addDays(today, 18),
      notes: 'Focus on components, hooks, state design, and clean UI patterns.'
    },
    {
      id: 'goal-projects',
      title: 'Ship two portfolio projects',
      area: 'Projects',
      priority: 'Medium',
      status: 'In progress',
      progress: 35,
      startDate: addDays(today, -5),
      targetDate: addDays(today, 35),
      notes: 'Each project should have a polished interface and useful features.'
    }
  ],
  skills: [
    {
      id: 'skill-js',
      name: 'JavaScript',
      category: 'Frontend',
      level: 'Comfortable',
      progress: 72,
      lastPracticed: addDays(today, -1),
      nextReview: today,
      weak: false
    },
    {
      id: 'skill-typescript',
      name: 'TypeScript',
      category: 'Frontend',
      level: 'Learning',
      progress: 46,
      lastPracticed: addDays(today, -3),
      nextReview: addDays(today, 2),
      weak: true
    },
    {
      id: 'skill-react',
      name: 'React Hooks',
      category: 'Frontend',
      level: 'Learning',
      progress: 54,
      lastPracticed: addDays(today, -2),
      nextReview: today,
      weak: true
    }
  ],
  projects: [
    {
      id: 'project-notes',
      title: 'Smart Notes Board',
      description: 'A notes app with tags, pinned notes, review dates, and simple search.',
      stack: 'React, TypeScript, Tailwind',
      difficulty: 'Medium',
      status: 'Building',
      link: '',
      notes: 'Add keyboard shortcuts and export support.'
    },
    {
      id: 'project-portfolio',
      title: 'Personal Portfolio Refresh',
      description: 'A clean portfolio with projects, skills, and a short introduction.',
      stack: 'React, CSS',
      difficulty: 'Easy',
      status: 'Planned',
      link: '',
      notes: 'Keep design simple and readable.'
    }
  ],
  resources: [
    {
      id: 'resource-react-docs',
      title: 'React Docs',
      type: 'Docs',
      topic: 'React',
      url: 'https://react.dev',
      status: 'Using',
      isFree: true
    },
    {
      id: 'resource-ts-handbook',
      title: 'TypeScript Handbook',
      type: 'Docs',
      topic: 'TypeScript',
      url: 'https://www.typescriptlang.org/docs/',
      status: 'Saved',
      isFree: true
    }
  ],
  notes: [
    {
      id: 'note-hooks',
      title: 'React hooks rule',
      content: 'Hooks should be called at the top level of a component or custom hook, not inside loops or conditions.',
      topic: 'React',
      pinned: true,
      createdAt: addDays(today, -4),
      updatedAt: addDays(today, -1),
      nextReview: today,
      reviewStage: 1
    },
    {
      id: 'note-state',
      title: 'State design reminder',
      content: 'Keep state close to where it is used. Lift state only when multiple components need to share it.',
      topic: 'Architecture',
      pinned: false,
      createdAt: addDays(today, -2),
      updatedAt: addDays(today, -2),
      nextReview: addDays(today, 3),
      reviewStage: 1
    }
  ],
  events: [
    {
      id: 'event-review',
      title: 'Review React hooks notes',
      date: today,
      time: '18:00',
      type: 'Review',
      target: 'React',
      done: false
    },
    {
      id: 'event-project',
      title: 'Work on Smart Notes Board',
      date: addDays(today, 1),
      time: '19:30',
      type: 'Project',
      target: 'Smart Notes Board',
      done: false
    }
  ],
  focusSessions: [
    {
      id: 'session-1',
      title: 'React components practice',
      target: 'React',
      minutes: 45,
      date: addDays(today, -1),
      notes: 'Practiced props, component composition, and small reusable cards.'
    }
  ],
  backupLogs: [],
  settings: {
    theme: 'system',
    compactMode: false,
    dailyTargetMinutes: 60,
    firstDayOfWeek: 'Sunday'
  }
};

export const templates: Template[] = [
  {
    id: 'template-frontend',
    name: 'Frontend starter path',
    description: 'A practical path for learning HTML, CSS, JavaScript, React, and small projects.',
    goals: [
      {
        title: 'Finish frontend basics',
        area: 'Frontend',
        priority: 'High',
        status: 'Not started',
        progress: 0,
        startDate: today,
        targetDate: addDays(today, 30),
        notes: 'Build a clean foundation before moving to advanced UI work.'
      }
    ],
    skills: [
      {
        name: 'HTML and CSS',
        category: 'Frontend',
        level: 'Learning',
        progress: 20,
        lastPracticed: today,
        nextReview: addDays(today, 1),
        weak: false
      },
      {
        name: 'React basics',
        category: 'Frontend',
        level: 'Beginner',
        progress: 10,
        lastPracticed: today,
        nextReview: addDays(today, 1),
        weak: true
      }
    ],
    resources: [
      {
        title: 'MDN Web Docs',
        type: 'Docs',
        topic: 'Frontend',
        url: 'https://developer.mozilla.org',
        status: 'Saved',
        isFree: true
      }
    ],
    projects: [
      {
        title: 'Responsive landing page',
        description: 'Build a clean landing page with responsive sections and reusable components.',
        stack: 'HTML, CSS, JavaScript',
        difficulty: 'Easy',
        status: 'Idea',
        link: '',
        notes: 'Focus on spacing, typography, and mobile layout.'
      }
    ]
  },
  {
    id: 'template-python',
    name: 'Python practice path',
    description: 'A simple path for learning Python syntax, problem solving, files, and small tools.',
    goals: [
      {
        title: 'Practice Python every week',
        area: 'Python',
        priority: 'Medium',
        status: 'Not started',
        progress: 0,
        startDate: today,
        targetDate: addDays(today, 45),
        notes: 'Keep notes for every concept and build small scripts.'
      }
    ],
    skills: [
      {
        name: 'Python basics',
        category: 'Programming',
        level: 'Beginner',
        progress: 10,
        lastPracticed: today,
        nextReview: addDays(today, 1),
        weak: false
      }
    ],
    resources: [
      {
        title: 'Python official tutorial',
        type: 'Docs',
        topic: 'Python',
        url: 'https://docs.python.org/3/tutorial/',
        status: 'Saved',
        isFree: true
      }
    ],
    projects: [
      {
        title: 'CLI habit tracker',
        description: 'Create a small command-line tool to track daily habits and export reports.',
        stack: 'Python',
        difficulty: 'Medium',
        status: 'Idea',
        link: '',
        notes: 'Use files or JSON for storage.'
      }
    ]
  }
];
