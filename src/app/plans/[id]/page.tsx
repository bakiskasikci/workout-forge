'use client';

import { useParams, useRouter } from 'next/navigation';
import { usePlans, useWorkoutHistory } from '@/hooks/useStorage';
import { exercises } from '@/data/exercises';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { ArrowLeft, Play, Edit, Trash2, Clock, Calendar } from 'lucide-react';

export default function PlanDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getPlan, deletePlan } = usePlans();
  const { getHistoryForPlan } = useWorkoutHistory();
  const { t } = useLanguage();

  const plan = getPlan(id as string);
  const history = getHistoryForPlan(id as string);

  if (!plan) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground mb-4">{t('workout.planNotFound')}</p>
        <Link href="/plans">
          <Button variant="outline">{t('workout.backToPlans')}</Button>
        </Link>
      </div>
    );
  }

  const getExerciseName = (exerciseId: string) => {
    const exercise = exercises.find(e => e.id === exerciseId);
    if (!exercise) return t('plan.unknownExercise');
    return t(`exercise.${exercise.id}`) !== `exercise.${exercise.id}` 
      ? t(`exercise.${exercise.id}`) 
      : exercise.name;
  };

  const handleDelete = () => {
    if (confirm(t('common.confirm') + '?')) {
      deletePlan(plan.id);
      router.push('/plans');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <Link href="/plans">
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{plan.name}</h1>
          <p className="text-muted-foreground mt-1">{plan.description}</p>
        </div>
        {!plan.isPreMade && (
          <div className="flex gap-2">
            <Link href={`/plans/${plan.id}/edit`}>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                {t('plan.edit')}
              </Button>
            </Link>
            <Button variant="danger" onClick={handleDelete}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      <Link href={`/workout/${plan.id}`}>
        <Button size="lg" className="w-full sm:w-auto">
          <Play className="w-5 h-5 mr-2" />
          {t('plan.startWorkout')}
        </Button>
      </Link>

      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-border/50 bg-secondary/30">
          <h2 className="font-semibold text-foreground">{t('plan.exercises')}</h2>
        </div>
        <div className="divide-y divide-border/50">
          {plan.exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className="flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary rounded-full text-sm font-semibold">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium text-foreground">{getExerciseName(exercise.exerciseId)}</p>
                  <p className="text-sm text-muted-foreground">
                    {exercise.sets} {t('plan.sets')} × {exercise.reps} {t('plan.reps')}
                    {exercise.weight > 0 && ` @ ${exercise.weight}${t('common.kg')}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {exercise.restSeconds}{t('common.seconds')} {t('plan.rest')}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {history.length > 0 && (
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-border/50 bg-secondary/30">
            <h2 className="font-semibold text-foreground">{t('plan.recentWorkouts')}</h2>
          </div>
          <div className="divide-y divide-border/50">
            {history.slice(0, 5).map(session => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">
                      {new Date(session.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {session.completedSets.filter(s => s.completed).length}/{session.totalSets} {t('plan.setsCompleted')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {Math.floor(session.duration / 60)}m {session.duration % 60}s
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
