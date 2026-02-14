# WorkoutForge

A modern fitness tracking web application built with Next.js, React, and Tailwind CSS. Create custom workout plans, browse an exercise library, and track your fitness journey.

## Features

- **Exercise Library**: Browse 70+ exercises organized by muscle groups (Chest, Back, Legs, Shoulders, Arms, Core)
- **Advanced Filtering**: Filter exercises by muscle group, equipment type (Barbell, Dumbbell, Machine, Cable, Bodyweight), and difficulty level (Beginner, Intermediate, Advanced)
- **Sorting**: Sort exercises by name (A-Z, Z-A) or difficulty level
- **Search**: Search exercises by name or description
- **Custom Workout Plans**: Create and manage personalized workout plans with specific exercises, sets, reps, and rest times
- **Pre-made Plans**: Ready-to-use workout plans for quick start
- **Workout Tracking**: Track your progress in real-time during workouts with set completion and rest timers
- **Workout History**: View your completed workouts with duration and progress statistics
- **Multi-language Support**: Available in English and Turkish
- **Dark/Light Mode**: Automatic system theme detection with manual toggle option

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Language**: TypeScript
- **State Management**: React Hooks + LocalStorage

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd workout-forge

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── library/           # Exercise library page
│   ├── plans/             # Workout plans (list, create, edit, detail)
│   ├── workout/[id]/     # Active workout tracking
│   ├── history/           # Workout history
│   ├── page.tsx          # Home page
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
├── data/                 # Static data (exercises, pre-made plans)
├── hooks/                # Custom React hooks
├── lib/                  # Utilities (i18n)
└── types/                # TypeScript type definitions
```

## Usage

1. **Browse Exercises**: Go to Exercise Library to explore available exercises
2. **Filter & Search**: Use filters to narrow down exercises by muscle group, equipment type, or difficulty level
3. **Create a Plan**: Click "Create Plan" to build a custom workout with your chosen exercises
4. **Start Workout**: Select a plan and click "Start Workout" to begin tracking
5. **Complete Sets**: Mark each set as complete with built-in rest timers
6. **View History**: Check your progress in the History section

## Language Support

Toggle between English and Turkish using the language selector in the navigation. All UI elements, exercise names, and filter labels are translated.

## License

MIT
