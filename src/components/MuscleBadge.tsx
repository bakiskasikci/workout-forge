import { MuscleGroup, Equipment } from '@/types';
import { useLanguage } from '@/lib/i18n';

interface MuscleBadgeProps {
  muscle: MuscleGroup;
}

export function MuscleBadge({ muscle }: MuscleBadgeProps) {
  const { t } = useLanguage();
  
  const colors: Record<MuscleGroup, string> = {
    chest: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    back: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    legs: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    shoulders: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    arms: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    core: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  };

  const labels: Record<MuscleGroup, string> = {
    chest: t('muscle.chest'),
    back: t('muscle.back'),
    legs: t('muscle.legs'),
    shoulders: t('muscle.shoulders'),
    arms: t('muscle.arms'),
    core: t('muscle.core'),
  };

  return (
    <span className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full ${colors[muscle]}`}>
      {labels[muscle]}
    </span>
  );
}

interface EquipmentBadgeProps {
  equipment: Equipment;
}

export function EquipmentBadge({ equipment }: EquipmentBadgeProps) {
  const colors: Record<Equipment, string> = {
    barbell: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
    dumbbell: 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300',
    machine: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    cable: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
    bodyweight: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    other: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  };

  const labels: Record<Equipment, string> = {
    barbell: 'Barbell',
    dumbbell: 'Dumbbell',
    machine: 'Machine',
    cable: 'Cable',
    bodyweight: 'Bodyweight',
    other: 'Other',
  };

  return (
    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${colors[equipment]}`}>
      {labels[equipment]}
    </span>
  );
}

interface ExerciseCardProps {
  name: string;
  muscles: MuscleGroup[];
  description: string;
  equipment?: Equipment;
  onClick?: () => void;
}

export function ExerciseCard({ name, muscles, description, equipment, onClick }: ExerciseCardProps) {
  return (
    <div 
      className="bg-card rounded-xl border border-border/50 p-5 card-hover cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex flex-wrap gap-1.5 mb-3">
        {muscles.map(muscle => (
          <MuscleBadge key={muscle} muscle={muscle} />
        ))}
        {equipment && <EquipmentBadge equipment={equipment} />}
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
