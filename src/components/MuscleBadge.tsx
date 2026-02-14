import { MuscleGroup } from '@/types';

interface MuscleBadgeProps {
  muscle: MuscleGroup;
}

export function MuscleBadge({ muscle }: MuscleBadgeProps) {
  const colors: Record<MuscleGroup, string> = {
    chest: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    back: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    legs: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    shoulders: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    arms: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    core: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  };

  const labels: Record<MuscleGroup, string> = {
    chest: 'Chest',
    back: 'Back',
    legs: 'Legs',
    shoulders: 'Shoulders',
    arms: 'Arms',
    core: 'Core',
  };

  return (
    <span className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full ${colors[muscle]}`}>
      {labels[muscle]}
    </span>
  );
}

interface ExerciseCardProps {
  name: string;
  muscles: MuscleGroup[];
  description: string;
  onClick?: () => void;
}

export function ExerciseCard({ name, muscles, description, onClick }: ExerciseCardProps) {
  return (
    <div 
      className="bg-card rounded-xl border border-border/50 p-5 card-hover cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex flex-wrap gap-1.5 mb-3">
        {muscles.map(muscle => (
          <MuscleBadge key={muscle} muscle={muscle} />
        ))}
      </div>
      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
        {name}
      </h3>
      <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">
        {description}
      </p>
    </div>
  );
}
