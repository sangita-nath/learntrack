# LearnTrack

LearnTrack is a personal learning workspace for planning goals, tracking skills, organizing projects, saving resources, writing notes, and staying consistent with study sessions.

It is built for learners who want more than a basic task list. The app brings planning, focus, review, and progress tracking into one clean dashboard, so users can manage their learning journey without depending on multiple tools.

## Overview

LearnTrack helps users answer simple but important questions:

- What am I learning right now?
- Which skills need more practice?
- What projects am I building?
- What should I review today?
- How consistent have I been this week?
- Where are my useful notes and resources?

The project is designed as a browser-based productivity app with local data storage, offline support, and a responsive interface.

## Features

### Dashboard

The dashboard gives a quick view of the current learning progress, including active goals, skills, projects, review items, study sessions, and overall consistency.

### Learning Goals

Users can create and manage goals with progress, priority, status, and target dates. This makes it easier to break a larger learning plan into smaller trackable parts.

### Skill Tracker

Skills can be tracked by level and progress. It helps users understand which areas are improving and which ones still need regular practice.

### Project Board

LearnTrack includes a project board for managing learning-based projects. Projects can be organized by status, difficulty, technology, and progress.

### Calendar Planner

The planner helps users schedule study sessions, revision days, project work, and deadlines. It gives structure to weekly and monthly learning.

### Review System

The review section helps users revisit notes, weak topics, and important concepts. It is useful for building long-term understanding instead of only tracking short-term tasks.

### Focus Timer

A built-in focus timer helps users complete study sessions with better concentration. Completed sessions are saved so users can track their learning activity.

### Notes

Users can save notes, pin important ones, and connect them with review dates. This keeps learning material organized and easy to revisit.

### Resource Library

The resource library can store useful learning material such as documentation, videos, articles, courses, books, and GitHub repositories.

### Learning Templates

Templates help users start faster with ready-made learning plans. They can be used for common paths like frontend development, Python practice, project building, or exam preparation.

### Command Menu

The command menu makes navigation faster. Users can quickly search and open important sections from one place.

### Backup and Import

LearnTrack supports JSON export and import, so users can back up their learning data or move it to another browser.

### Theme Support

The app supports light, dark, and system-based theme preferences.

### Offline Support

LearnTrack includes progressive web app support, allowing the app to continue working even when the internet connection is unavailable.

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | React |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Storage | IndexedDB and browser storage |
| App Support | PWA, Service Worker |
| Deployment | GitHub Pages |

## Project Structure

```txt
learntrack/
├── public/
│   ├── manifest.webmanifest
│   └── service-worker.js
├── src/
│   ├── components/
│   ├── features/
│   │   ├── analytics/
│   │   ├── calendar/
│   │   ├── focus/
│   │   ├── goals/
│   │   ├── notes/
│   │   ├── projects/
│   │   ├── resources/
│   │   ├── reviews/
│   │   ├── settings/
│   │   ├── skills/
│   │   └── templates/
│   ├── lib/
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── LICENSE
```

## Getting Started

### Requirements

Make sure Node.js and npm are installed on your system.

Recommended:

```bash
node -v
npm -v
```

## Installation

Clone the repository:

```bash
git clone https://github.com/sangita-nath/learntrack.git
```

Move into the project folder:

```bash
cd learntrack
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app will run locally through the Vite development server.

## Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

This project is ready for GitHub Pages.

The Vite base path is configured for the repository name:

```ts
base: '/learntrack/'
```

After building the project, the generated production files can be deployed from the build output.

A common GitHub Pages flow is:

1. Build the project with `npm run build`
2. Deploy the generated output to GitHub Pages
3. Set GitHub Pages to serve the deployed branch or folder
4. Open the published site from the repository Pages URL

## Data Storage

LearnTrack stores user data in the browser.

The app uses browser-based storage so learning data can stay available between sessions without requiring a backend server. This keeps the project lightweight, fast, and easy to run locally.

Stored data can include:

- Goals
- Skills
- Projects
- Notes
- Resources
- Calendar items
- Focus sessions
- Review items
- Theme preferences
- Backup data

Users can also export their data as JSON and import it again when needed.

## Why LearnTrack

Many learning plans fail because progress is scattered across notes, task apps, bookmarks, and memory. LearnTrack keeps the most important parts of the learning process in one place.

It is useful for:

- Students managing study plans
- Beginners learning programming
- Developers tracking project-based learning
- Anyone building a consistent learning habit
- Users who prefer a local-first productivity tool

## Main Sections

| Section | Purpose |
| --- | --- |
| Dashboard | View learning progress and activity |
| Goals | Manage learning goals and deadlines |
| Skills | Track skill levels and improvement |
| Projects | Organize project ideas and build status |
| Planner | Schedule study and revision work |
| Reviews | Revisit notes and weak topics |
| Focus | Run focused study sessions |
| Notes | Save and organize learning notes |
| Resources | Store useful learning links |
| Templates | Start with ready-made learning plans |
| Settings | Manage theme, backup, import, and reset options |

## Development Notes

The project is intentionally frontend-focused. It does not require a database server, login system, or backend API to work.

This makes it easier to:

- Run locally
- Deploy on GitHub Pages
- Test in the browser
- Keep user data private to the device
- Use the project as a strong frontend portfolio piece

## Future Improvements

Some useful improvements that can be added later:

- Drag-and-drop project board
- More detailed calendar views
- Markdown support for notes
- Better analytics charts
- Custom learning templates
- Reminder notifications
- Search improvements
- Data sync option
- Accessibility refinements
- More keyboard shortcuts

## Author

Built by **Sangita Nath**.

## License

This project is licensed under the MIT License.
