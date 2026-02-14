'use client';

import { useState } from 'react';
import { exercises, muscleGroups } from '@/data/exercises';
import { ExerciseCard, MuscleBadge } from '@/components/MuscleBadge';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useLanguage } from '@/lib/i18n';
import { MuscleGroup, Exercise } from '@/types';
import { Search, X, Info, Target, Lightbulb, ListOrdered } from 'lucide-react';

export default function LibraryPage() {
  const { t, language } = useLanguage();
  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

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

  const getTranslatedTips = (tips?: string[]): string[] => {
    if (!tips) return [];
    if (language === 'tr') {
      const translatedTips: Record<string, string[]> = {
        'Keep your shoulder blades retracted and squeezed together': ['Omuz bıçaklarını geri çekilmiş ve sıkı tutun'],
        'Drive through your legs for stability': ['Denge için bacaklarınızdan itiş yapın'],
        'Don\'t bounce the bar off your chest': ['Barı göğsünüzden zıplatmayın'],
        'Don\'t angle the bench too steep': ['Benchi çok dik açıya getirmeyin'],
        'Control the descent': ['İnişi kontrol edin'],
        'Focus on feeling the upper chest work': ['Üst göğsün çalıştığını hissetmeye odaklanın'],
        'Use a spotter for safety': ['Güvenlik için bir spot kullanın'],
        'Don\'t use too much weight': ['Çok ağırlık kullanmayın'],
        'Focus on the lower chest squeeze': ['Alt göğüs sıkışmasına odaklanın'],
        'Allow dumbbells to touch at the top for full contraction': ['Tam kasılma için üstte dumbbelllerin birbirine değmesine izin verin'],
        'Don\'t let them drift too far out': ['Çok fazla dışarı kaymasına izin vermeyin'],
        'Use a neutral grip': ['Nötr tutuş kullanın'],
        'Vary the angle to target different parts of chest': ['Göğsün farklı bölgelerini hedeflemek için açıyı değiştirin'],
        'Lean forward for more chest involvement': ['Daha fazla göğüs kası için öne eğilin'],
        'Control the negative': ['Negatifi kontrol edin'],
        'Keep your feet flat on the floor and maintain a slight arch in your lower back': ['Ayaklarınızı yerde düz tutun ve alt sırtta hafif bir kavis koruyun'],
      };
      return tips.map(tip => translatedTips[tip]?.[0] || tip);
    }
    return tips;
  };

  const filteredExercises = exercises.filter(exercise => {
    const matchesMuscle = selectedMuscle === 'all' || exercise.muscles.includes(selectedMuscle as MuscleGroup);
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMuscle && matchesSearch;
  });

  const getDifficulty = (muscles: MuscleGroup[]): { level: string; color: string } => {
    const count = muscles.length;
    if (count >= 3) return { level: language === 'tr' ? 'İleri Seviye' : 'Advanced', color: 'text-red-600 dark:text-red-400' };
    if (count >= 2) return { level: language === 'tr' ? 'Orta Seviye' : 'Intermediate', color: 'text-yellow-600 dark:text-yellow-400' };
    return { level: language === 'tr' ? 'Başlangıç Seviyesi' : 'Beginner', color: 'text-green-600 dark:text-green-400' };
  };

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
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
          />
        </div>
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

      <div className="text-sm text-muted-foreground">
        {filteredExercises.length} {language === 'tr' ? 'egzersiz bulundu' : 'exercises found'}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map(exercise => (
          <div 
            key={exercise.id} 
            onClick={() => setSelectedExercise(exercise)}
            className="cursor-pointer"
          >
            <ExerciseCard
              name={exercise.name}
              muscles={exercise.muscles}
              description={exercise.description}
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

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-in my-8">
            <div className="px-6 py-4 border-b border-border/50 flex items-start justify-between shrink-0">
              <div>
                <h2 className="text-xl font-bold text-foreground">{selectedExercise.name}</h2>
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
              {/* Description */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-muted-foreground" />
                  <h3 className="font-semibold text-foreground">
                    {language === 'tr' ? 'Genel Bakış' : 'Overview'}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{selectedExercise.description}</p>
              </div>

              {/* Difficulty */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <h3 className="font-semibold text-foreground">
                    {language === 'tr' ? 'Zorluk Seviyesi' : 'Difficulty Level'}
                  </h3>
                </div>
                <p className={`font-medium ${getDifficulty(selectedExercise.muscles).color}`}>
                  {getDifficulty(selectedExercise.muscles).level}
                </p>
              </div>

              {/* Instructions */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ListOrdered className="w-4 h-4 text-muted-foreground" />
                  <h3 className="font-semibold text-foreground">
                    {language === 'tr' ? 'Nasıl Yapılır (Adım Adım)' : 'How to Perform (Step by Step)'}
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

              {/* Tips */}
              {selectedExercise.tips && selectedExercise.tips.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground">
                      {language === 'tr' ? 'İpuçları ve Püf Noktaları' : 'Tips & Tricks'}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {getTranslatedTips(selectedExercise.tips).map((tip, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Targeted Muscles */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <h3 className="font-semibold text-foreground">
                    {language === 'tr' ? 'Hedef Kaslar' : 'Targeted Muscles'}
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
                {language === 'tr' ? 'Kapat' : 'Close'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
