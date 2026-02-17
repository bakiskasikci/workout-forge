'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePlans, useWorkoutHistory } from '@/hooks/useStorage';
import { exercises } from '@/data/exercises';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { Check, X, Clock, Zap } from 'lucide-react';
import { WorkoutSession, CompletedSet } from '@/types';

export default function WorkoutPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getPlan } = usePlans();
  const { addWorkout } = useWorkoutHistory();
  const { t } = useLanguage();

  const plan = getPlan(id as string);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [completedSets, setCompletedSets] = useState<CompletedSet[]>([]);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const startTimeRef = useRef<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  // Track elapsed workout time
  useEffect(() => {
    if (!plan) return;
    
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedTime(elapsed);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [plan]);

  const formatElapsedTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getExerciseName = (exerciseId: string | undefined, fallbackName?: string): string => {
    if (!exerciseId) return fallbackName || '';
    const translated = t(`exercise.${exerciseId}`);
    return translated !== `exercise.${exerciseId}` ? translated : (fallbackName || exerciseId);
  };

  const currentExercise = plan?.exercises[currentExerciseIndex];
  const exerciseData = currentExercise ? exercises.find(e => e.id === currentExercise.exerciseId) : null;
  const totalSets = plan?.exercises.reduce((sum, e) => sum + e.sets, 0) || 0;

  const isSetCompleted = (exerciseId: string, setIdx: number) => {
    return completedSets.some(s => s.exerciseId === exerciseId && s.setIndex === setIdx && s.completed);
  };

  const finishWorkout = () => {
    if (!plan) return;
    const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
    
    // Filter out any duplicate completed sets when saving
    const uniqueCompletedSets = completedSets.filter((set, index, self) =>
      index === self.findIndex((s) => (
        s.exerciseId === set.exerciseId && s.setIndex === set.setIndex
      ))
    );
    
    const session: WorkoutSession = {
      id: `session-${Date.now()}`,
      planId: plan.id,
      planName: plan.name,
      date: new Date().toISOString(),
      duration,
      completedSets: uniqueCompletedSets,
      totalSets,
      completedAt: new Date().toISOString(),
    };
    addWorkout(session);
    router.push('/history');
  };

  const advanceToNextSet = () => {
    if (!plan) return;
    
    if (currentSetIndex < (currentExercise?.sets || 0) - 1) {
      setCurrentSetIndex(prev => prev + 1);
    } else if (currentExerciseIndex < plan.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentSetIndex(0);
    } else {
      finishWorkout();
    }
  };

  const handleCompleteSet = () => {
    if (!currentExercise || !plan) return;
    
    // Check if this set is already completed (prevent duplicates)
    const isAlreadyCompleted = completedSets.some(
      s => s.exerciseId === currentExercise.exerciseId && s.setIndex === currentSetIndex && s.completed
    );
    if (isAlreadyCompleted) return;
    
    const newCompletedSet: CompletedSet = {
      exerciseId: currentExercise.exerciseId,
      setIndex: currentSetIndex,
      completed: true,
    };
    setCompletedSets(prev => [...prev, newCompletedSet]);

    if (currentSetIndex < currentExercise.sets - 1) {
      setIsResting(true);
      setRestTime(currentExercise.restSeconds);
    } else if (currentExerciseIndex < plan.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentSetIndex(0);
      setIsResting(true);
      setRestTime(plan.exercises[currentExerciseIndex + 1].restSeconds || 60);
    } else {
      finishWorkout();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _skipRest = () => {
    setIsResting(false);
    advanceToNextSet();
  };

  // Handle rest timer - use a ref to track if we're transitioning
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    if (!isResting) {
      isTransitioningRef.current = false;
      return;
    }

    if (restTime > 0) {
      const timer = setTimeout(() => setRestTime(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }

    // Rest is complete, transition to next
    if (!isTransitioningRef.current) {
      isTransitioningRef.current = true;
      // Use timeout to defer the state update
      setTimeout(() => {
        setIsResting(false);
        advanceToNextSet();
      }, 0);
    }
  }, [isResting, restTime]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const progress = totalSets > 0 
    ? Math.min(((completedSets.length) / totalSets) * 100, 100)
    : 0;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href={`/plans/${plan.id}`}>
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{plan.name}</h1>
          <p className="text-muted-foreground">{t('workout.title')}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{Math.round(progress)}%</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground font-mono">{formatElapsedTime(elapsedTime)}</span>
        </div>
      </div>

      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {isResting ? (
        <Card className="p-8 text-center">
          <div className="mb-4">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto">
              <Clock className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">{t('workout.restTime')}</h2>
          <p className="text-5xl font-bold text-primary mb-6">{restTime}{t('common.seconds')}</p>
          <Button onClick={() => { setIsResting(false); advanceToNextSet(); }} size="lg">
            {t('workout.skipRest')}
          </Button>
        </Card>
      ) : (
        <Card className="p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-sm text-muted-foreground mb-2">
              {t('workout.exercise')} {currentExerciseIndex + 1} {t('workout.of')} {plan.exercises.length}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">{getExerciseName(exerciseData?.id, exerciseData?.name)}</h2>
            <div className="flex flex-wrap justify-center gap-1.5">
              {exerciseData?.muscles.map(muscle => (
                <span key={muscle} className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                  {t(`muscle.${muscle}`)}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center mb-6 sm:mb-8">
            <p className="text-6xl sm:text-7xl font-bold text-foreground mb-2">
              {t('workout.set')} {currentSetIndex + 1} {t('workout.of')} {currentExercise?.sets}
            </p>
            <p className="text-xl text-muted-foreground">
              {currentExercise?.reps} {t('plan.reps')}
              {currentExercise && currentExercise.weight > 0 && ` @ ${currentExercise.weight}${t('common.kg')}`}
            </p>
          </div>

          <Button onClick={handleCompleteSet} size="lg" className="w-full py-4 text-base">
            <Check className="w-5 h-5 mr-2" />
            {t('workout.completeSet')}
          </Button>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">{t('workout.progress')}</h3>
        <div className="space-y-2">
          {plan.exercises.map((exercise, exIdx) => {
            const exData = exercises.find(e => e.id === exercise.exerciseId);
            return (
              <div key={exercise.id} className="flex items-center gap-3">
                <span className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold ${
                  exIdx < currentExerciseIndex ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  exIdx === currentExerciseIndex ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'
                }`}>
                  {exIdx < currentExerciseIndex ? <Check className="w-4 h-4" /> : exIdx + 1}
                </span>
                <span className={`flex-1 text-sm ${exIdx === currentExerciseIndex ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {getExerciseName(exData?.id, exData?.name)}
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: exercise.sets }).map((_, setIdx) => (
                    <div
                      key={setIdx}
                      className={`w-2.5 h-2.5 rounded-full ${
                        isSetCompleted(exercise.exerciseId, setIdx)
                          ? 'bg-green-500'
                          : exIdx === currentExerciseIndex && setIdx === currentSetIndex
                          ? 'bg-primary'
                          : 'bg-secondary'
                      }`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Button variant="danger" onClick={finishWorkout} className="w-full">
        {t('workout.endEarly')}
      </Button>
    </div>
  );
}
