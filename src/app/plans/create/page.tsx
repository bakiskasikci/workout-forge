/* eslint-disable react-hooks/purity */
'use client';

import { useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { usePlans } from '@/hooks/useStorage';
import { exercises, muscleGroups } from '@/data/exercises';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { MuscleBadge } from '@/components/MuscleBadge';
import { useLanguage } from '@/lib/i18n';
import { PlanExercise, MuscleGroup as MuscleGroupType } from '@/types';
import { ArrowLeft, Plus, X, Save, Trash2, GripVertical, Search } from 'lucide-react';
import Link from 'next/link';

interface SelectedExercise {
  id: string;
  exerciseId: string;
  sets: number;
  reps: number;
  weight: number;
  restSeconds: number;
}

interface PlanData {
  name: string;
  description: string;
  exercises: SelectedExercise[];
}

function getInitialPlanData(planId: string | string[] | undefined, getPlan: (id: string) => { name: string; description: string; exercises: SelectedExercise[] } | undefined): PlanData {
  if (!planId) return { name: '', description: '', exercises: [] };
  const plan = getPlan(planId as string);
  if (!plan) return { name: '', description: '', exercises: [] };
  return {
    name: plan.name,
    description: plan.description,
    exercises: plan.exercises.map(e => ({
      id: e.id,
      exerciseId: e.exerciseId,
      sets: e.sets,
      reps: e.reps,
      weight: e.weight,
      restSeconds: e.restSeconds,
    })),
  };
}

export default function CreatePlanPage() {
  const router = useRouter();
  const params = useParams();
  const { getPlan, savePlan } = usePlans();
  const { t, language } = useLanguage();
  const isEditing = Boolean(params.id);

  const initialData = useMemo(() => 
    getInitialPlanData(params.id, getPlan), 
    [params.id, getPlan]
  );

  const [name, setName] = useState(initialData.name);
  const [description, setDescription] = useState(initialData.description);
  const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>(initialData.exercises);
  const [showExercisePicker, setShowExercisePicker] = useState(false);
  const [muscleFilter, setMuscleFilter] = useState<string>('all');
  const [exerciseSearch, setExerciseSearch] = useState('');

  const getMuscleLabel = (value: string): string => {
    const labels: Record<string, Record<string, string>> = {
      en: {
        chest: 'Chest', back: 'Back', legs: 'Legs', shoulders: 'Shoulders', arms: 'Arms', core: 'Core'
      },
      tr: {
        chest: 'Göğüs', back: 'Sırt', legs: 'Bacak', shoulders: 'Omuz', arms: 'Kol', core: 'Core'
      }
    };
    return labels[language][value] || value;
  };

  const filteredExercises = useMemo(() => {
    let result = muscleFilter === 'all'
      ? exercises
      : exercises.filter(e => e.muscles.includes(muscleFilter as MuscleGroupType));
    
    if (exerciseSearch.trim()) {
      const search = exerciseSearch.toLowerCase();
      result = result.filter(e => 
        e.name.toLowerCase().includes(search) ||
        e.description.toLowerCase().includes(search)
      );
    }
    
    return result;
  }, [muscleFilter, exerciseSearch]);

  const addExercise = (exerciseId: string) => {
    const newExercise: SelectedExercise = {
      id: `ex-${Date.now()}`,
      exerciseId,
      sets: 3,
      reps: 10,
      weight: 0,
      restSeconds: 60,
    };
    setSelectedExercises([...selectedExercises, newExercise]);
    setShowExercisePicker(false);
  };

  const updateExercise = (id: string, field: keyof SelectedExercise, value: number) => {
    setSelectedExercises(prev =>
      prev.map(e => e.id === id ? { ...e, [field]: value } : e)
    );
  };

  const removeExercise = (id: string) => {
    setSelectedExercises(prev => prev.filter(e => e.id !== id));
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert(t('plan.enterName'));
      return;
    }
    if (selectedExercises.length === 0) {
      alert(t('plan.addExerciseFirst'));
      return;
    }

    const planExercises: PlanExercise[] = selectedExercises.map((e, index) => ({
      id: e.id,
      exerciseId: e.exerciseId,
      sets: e.sets,
      reps: e.reps,
      weight: e.weight,
      restSeconds: e.restSeconds,
      order: index,
    }));

    const plan = {
      id: isEditing ? params.id as string : `plan-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      exercises: planExercises,
      isPreMade: false,
      createdAt: isEditing ? getPlan(params.id as string)?.createdAt || new Date().toISOString() : new Date().toISOString(),
    };

    savePlan(plan);
    router.push('/plans');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/plans">
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">
          {isEditing ? t('plan.edit.title') : t('plan.create.title')}
        </h1>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              {t('plan.name')}
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={t('plan.namePlaceholder')}
              className="w-full px-4 py-2.5 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              {t('plan.description')}
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={t('plan.descriptionPlaceholder')}
              rows={3}
              className="w-full px-4 py-2.5 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors resize-none"
            />
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
          <h2 className="font-semibold text-foreground">{t('plan.exercises')}</h2>
          <Button onClick={() => setShowExercisePicker(true)} size="sm">
            <Plus className="w-4 h-4 mr-1.5" />
            {t('plan.addExercise')}
          </Button>
        </div>

        {selectedExercises.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">{t('plan.noExercisesAdded')}</p>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {selectedExercises.map((exercise, index) => {
              const exerciseData = exercises.find(e => e.id === exercise.exerciseId);
              return (
                <div key={exercise.id} className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-secondary rounded-lg cursor-grab">
                        <GripVertical className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="w-7 h-7 flex items-center justify-center bg-primary/10 text-primary rounded-full text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span className="font-medium text-foreground">
                        {exerciseData?.name}
                      </span>
                    </div>
                    <button
                      onClick={() => removeExercise(exercise.id)}
                      className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 ml-14">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">{t('plan.sets')}</label>
                      <input
                        type="number"
                        min={1}
                        value={exercise.sets}
                        onChange={e => updateExercise(exercise.id, 'sets', parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 bg-secondary border-0 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">{t('plan.reps')}</label>
                      <input
                        type="number"
                        min={1}
                        value={exercise.reps}
                        onChange={e => updateExercise(exercise.id, 'reps', parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 bg-secondary border-0 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">{t('plan.weight')}</label>
                      <input
                        type="number"
                        min={0}
                        value={exercise.weight}
                        onChange={e => updateExercise(exercise.id, 'weight', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-secondary border-0 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">{t('plan.rest')}</label>
                      <input
                        type="number"
                        min={0}
                        value={exercise.restSeconds}
                        onChange={e => updateExercise(exercise.id, 'restSeconds', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-secondary border-0 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-center"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <div className="flex justify-end gap-3">
        <Link href="/plans">
          <Button variant="outline">{t('plan.cancel')}</Button>
        </Link>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          {t('plan.save')}
        </Button>
      </div>

      {showExercisePicker && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col animate-scale-in">
            <div className="px-6 py-4 border-b border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-foreground">{t('picker.title')}</h2>
                <button
                  onClick={() => {
                    setShowExercisePicker(false);
                    setExerciseSearch('');
                    setMuscleFilter('all');
                  }}
                  className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t('library.search')}
                  value={exerciseSearch}
                  onChange={(e) => setExerciseSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-secondary border-0 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                  autoFocus
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setMuscleFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    muscleFilter === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                  }`}
                >
                  {t('common.all')}
                </button>
                {muscleGroups.map(muscle => (
                  <button
                    key={muscle.value}
                    onClick={() => setMuscleFilter(muscle.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      muscleFilter === muscle.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {getMuscleLabel(muscle.value)}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-y-auto p-4 flex-1">
              <div className="grid gap-2">
                {filteredExercises.map(exercise => (
                  <button
                    key={exercise.id}
                    onClick={() => addExercise(exercise.id)}
                    className="flex items-center justify-between p-3 bg-secondary/30 hover:bg-secondary rounded-lg transition-colors text-left"
                  >
                    <div>
                      <p className="font-medium text-foreground">{exercise.name}</p>
                      <div className="flex gap-1 mt-1.5">
                        {exercise.muscles.map(muscle => (
                          <MuscleBadge key={muscle} muscle={muscle} />
                        ))}
                      </div>
                    </div>
                    <Plus className="w-5 h-5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
