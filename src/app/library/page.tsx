'use client';

import { useState, useMemo, useCallback } from 'react';
import { exercises, muscleGroups, equipmentTypes, difficultyLevels, sortOptions } from '@/data/exercises';
import { ExerciseCard, MuscleBadge } from '@/components/MuscleBadge';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useLanguage } from '@/lib/i18n';
import { MuscleGroup, Exercise } from '@/types';
import { Search, X, Info, Target, Lightbulb, ListOrdered, SlidersHorizontal } from 'lucide-react';

export default function LibraryPage() {
  const { t, language } = useLanguage();
  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name-asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const getMuscleLabel = (value: string): string => {
    return t(`muscle.${value}`);
  };

  const getEquipmentLabel = (value: string): string => {
    const labels: Record<string, Record<string, string>> = {
      en: {
        all: 'All Equipment', barbell: 'Barbell', dumbbell: 'Dumbbell', machine: 'Machine', cable: 'Cable', bodyweight: 'Bodyweight', other: 'Other'
      },
      tr: {
        all: 'Tüm Ekipman', barbell: 'Barbell', dumbbell: 'Dumbbell', machine: 'Makine', cable: 'Kablo', bodyweight: 'Vücut Ağırlığı', other: 'Diğer'
      }
    };
    return labels[language][value] || value;
  };

  const getDifficultyLabel = (value: string): string => {
    const labels: Record<string, Record<string, string>> = {
      en: {
        all: 'All Levels', beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced'
      },
      tr: {
        all: 'Tüm Seviyeler', beginner: 'Başlangıç', intermediate: 'Orta Seviye', advanced: 'İleri Seviye'
      }
    };
    return labels[language][value] || value;
  };

  const getSortLabel = (value: string): string => {
    const labels: Record<string, Record<string, string>> = {
      en: {
        'name-asc': 'Name (A-Z)', 'name-desc': 'Name (Z-A)', 'difficulty-asc': 'Difficulty (Easy to Hard)', 'difficulty-desc': 'Difficulty (Hard to Easy)'
      },
      tr: {
        'name-asc': 'İsim (A-Z)', 'name-desc': 'İsim (Z-A)', 'difficulty-asc': 'Zorluk (Kolaydan Zora)', 'difficulty-desc': 'Zorluk (Zordan Kolaya)'
      }
    };
    return labels[language][value] || value;
  };

  const getExerciseName = useCallback((exercise: Exercise): string => {
    const translated = t(`exercise.${exercise.id}`);
    return translated !== `exercise.${exercise.id}` ? translated : exercise.name;
  }, [t]);

  const getExerciseDescription = useCallback((exercise: Exercise): string => {
    const translated = t(`desc.${exercise.id}`);
    return translated !== `desc.${exercise.id}` ? translated : exercise.description;
  }, [t]);

  const getDifficulty = useCallback((muscles: MuscleGroup[]): { level: string; value: string; color: string } => {
    const count = muscles.length;
    if (count >= 3) return { level: t('common.advanced') || 'Advanced', value: 'advanced', color: 'text-red-600 dark:text-red-400' };
    if (count >= 2) return { level: t('common.intermediate') || 'Intermediate', value: 'intermediate', color: 'text-yellow-600 dark:text-yellow-400' };
    return { level: t('common.beginner') || 'Beginner', value: 'beginner', color: 'text-green-600 dark:text-green-400' };
  }, [t]);

  const filteredExercises = useMemo(() => {
    const result = exercises.filter(exercise => {
      const matchesMuscle = selectedMuscle === 'all' || exercise.muscles.includes(selectedMuscle as MuscleGroup);
      const matchesEquipment = selectedEquipment === 'all' || exercise.equipment === selectedEquipment;
      const matchesDifficulty = selectedDifficulty === 'all' || getDifficulty(exercise.muscles).value === selectedDifficulty;
      const matchesSearch = getExerciseName(exercise).toLowerCase().includes(searchQuery.toLowerCase()) ||
        getExerciseDescription(exercise).toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesMuscle && matchesEquipment && matchesDifficulty && matchesSearch;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return getExerciseName(a).localeCompare(getExerciseName(b));
        case 'name-desc':
          return getExerciseName(b).localeCompare(getExerciseName(a));
        case 'difficulty-asc':
          return getDifficulty(a.muscles).value.localeCompare(getDifficulty(b.muscles).value);
        case 'difficulty-desc':
          return getDifficulty(b.muscles).value.localeCompare(getDifficulty(a.muscles).value);
        default:
          return 0;
      }
    });

    return result;
  }, [selectedMuscle, selectedEquipment, selectedDifficulty, sortBy, searchQuery, getDifficulty, getExerciseName, getExerciseDescription]);

  const activeFiltersCount = [selectedMuscle !== 'all', selectedEquipment !== 'all', selectedDifficulty !== 'all'].filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('library.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('library.subtitle')}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('library.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
          />
        </div>
        <Button
          variant={showFilters ? 'primary' : 'outline'}
          onClick={() => setShowFilters(!showFilters)}
          className="relative"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          {t('library.filters')}
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      <Card className="p-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedMuscle('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedMuscle === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
            }`}
          >
            {t('common.all')}
          </button>
          {muscleGroups.map(muscle => (
            <button
              key={muscle.value}
              onClick={() => setSelectedMuscle(muscle.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedMuscle === muscle.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
              }`}
            >
              {getMuscleLabel(muscle.value)}
            </button>
          ))}
        </div>
      </Card>

      {showFilters && (
        <Card className="p-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              {t('library.equipment')}
            </label>
            <div className="flex flex-wrap gap-2">
              {equipmentTypes.map(eq => (
                <button
                  key={eq.value}
                  onClick={() => setSelectedEquipment(eq.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedEquipment === eq.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                  }`}
                >
                  {getEquipmentLabel(eq.value)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              {t('library.difficulty')}
            </label>
            <div className="flex flex-wrap gap-2">
              {difficultyLevels.map(level => (
                <button
                  key={level.value}
                  onClick={() => setSelectedDifficulty(level.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedDifficulty === level.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                  }`}
                >
                  {getDifficultyLabel(level.value)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              {t('library.sortBy')}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-secondary border-none rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary/20 outline-none"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {getSortLabel(option.value)}
                </option>
              ))}
            </select>
          </div>

          {(selectedEquipment !== 'all' || selectedDifficulty !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedEquipment('all');
                setSelectedDifficulty('all');
              }}
            >
              {t('library.clearFilters')}
            </Button>
          )}
        </Card>
      )}

      <div className="text-sm text-muted-foreground">
        {filteredExercises.length} {t('library.exercisesFound')}
        {selectedMuscle !== 'all' && ` (${getMuscleLabel(selectedMuscle)})`}
        {selectedEquipment !== 'all' && ` • ${getEquipmentLabel(selectedEquipment)}`}
        {selectedDifficulty !== 'all' && ` • ${getDifficultyLabel(selectedDifficulty)}`}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map((exercise, index) => (
          <div
            key={exercise.id}
            onClick={() => setSelectedExercise(exercise)}
            className="cursor-pointer animate-slide-up"
            style={{ animationDelay: `${Math.min(index * 0.02, 0.3)}s`, animationFillMode: 'both' }}
          >
            <ExerciseCard
              name={getExerciseName(exercise)}
              muscles={exercise.muscles}
              description={getExerciseDescription(exercise)}
              equipment={exercise.equipment}
              onClick={() => setSelectedExercise(exercise)}
            />
          </div>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('library.noExercises')}</p>
        </div>
      )}

      {selectedExercise && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-in my-8">
            <div className="px-6 py-4 border-b border-border/50 flex items-start justify-between shrink-0">
              <div>
                <h2 className="text-xl font-bold text-foreground">{getExerciseName(selectedExercise)}</h2>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedExercise.muscles.map(muscle => (
                    <MuscleBadge key={muscle} muscle={muscle} />
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSelectedExercise(null)}
                className="p-1.5 hover:bg-secondary rounded-lg transition-colors shrink-0 ml-2"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6 space-y-6 flex-1">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{getEquipmentLabel(selectedExercise.equipment)}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg">
                  <span className={`text-sm font-medium ${getDifficulty(selectedExercise.muscles).color}`}>
                    {getDifficulty(selectedExercise.muscles).level}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-muted-foreground" />
                  <h3 className="font-semibold text-foreground">
                    {t('library.overview')}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{getExerciseDescription(selectedExercise)}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ListOrdered className="w-4 h-4 text-muted-foreground" />
                  <h3 className="font-semibold text-foreground">
                    {t('library.howToPerform')}
                  </h3>
                </div>
                <ol className="space-y-2">
                  {selectedExercise.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-secondary rounded-full text-xs font-medium text-foreground">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground leading-relaxed">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {selectedExercise.tips && selectedExercise.tips.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground">
                      {t('library.tips')}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {selectedExercise.tips.map((tip, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <h3 className="font-semibold text-foreground">
                    {t('library.targetedMuscles')}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedExercise.muscles.map(muscle => (
                    <div key={muscle} className="px-3 py-1.5 bg-secondary rounded-lg">
                      <span className="text-sm font-medium text-foreground">{getMuscleLabel(muscle)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-border/50 shrink-0">
              <Button onClick={() => setSelectedExercise(null)} className="w-full">
                {t('library.close')}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
