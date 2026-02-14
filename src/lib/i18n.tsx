/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Language = 'en' | 'tr';

interface Translations {
  [key: string]: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.library': 'Exercise Library',
    'nav.plans': 'My Plans',
    'nav.history': 'History',
    'nav.createPlan': 'Create Plan',
    
    // Home
    'home.title': 'Welcome to WorkoutForge',
    'home.subtitle': 'Create custom workout plans, browse our exercise library, and track your fitness journey.',
    'home.myPlans': 'My Plans',
    'home.myPlansDesc': 'View and manage your workout plans',
    'home.createPlan': 'Create Plan',
    'home.createPlanDesc': 'Build a new custom workout plan',
    'home.exerciseLibrary': 'Exercise Library',
    'home.exerciseLibraryDesc': 'Browse exercises by muscle group',
    'home.history': 'History',
    'home.historyDesc': 'View your completed workouts',
    'home.gettingStarted': 'Getting Started',
    'home.step1': 'Browse the Exercise Library to see available exercises',
    'home.step2': 'Create a new plan or use one of our Pre-made Plans',
    'home.step3': 'Start a workout and track your progress',
    'home.step4': 'View your history to see how far you\'ve come',
    
    // Library
    'library.title': 'Exercise Library',
    'library.subtitle': 'Browse exercises by muscle group',
    'library.noExercises': 'No exercises found for this filter.',
    
    // Plans
    'plans.title': 'My Plans',
    'plans.subtitle': 'Your workout plans and templates',
    'plans.yourPlans': 'Your Plans',
    'plans.premadePlans': 'Pre-made Plans',
    'plans.noPlans': 'No plans yet. Create your first workout plan!',
    'plans.exercises': 'exercises',
    'plans.clone': 'Clone plan',
    'plans.delete': 'Delete plan',
    
    // Plan Detail
    'plan.startWorkout': 'Start Workout',
    'plan.edit': 'Edit',
    'plan.delete': 'Delete',
    'plan.exercises': 'Exercises',
    'plan.sets': 'sets',
    'plan.reps': 'reps',
    'plan.rest': 'rest',
    'plan.recentWorkouts': 'Recent Workouts',
    'plan.setsCompleted': 'sets completed',
    
    // Create/Edit Plan
    'plan.create.title': 'Create Plan',
    'plan.edit.title': 'Edit Plan',
    'plan.name': 'Plan Name',
    'plan.namePlaceholder': 'e.g., My Upper Body Workout',
    'plan.description': 'Description',
    'plan.descriptionPlaceholder': 'Optional description',
    'plan.addExercise': 'Add Exercise',
    'plan.noExercisesAdded': 'No exercises added yet. Click "Add Exercise" to get started.',
    'plan.save': 'Save Plan',
    'plan.cancel': 'Cancel',
    'plan.enterName': 'Please enter a plan name',
    'plan.addExerciseFirst': 'Please add at least one exercise',
    
    // Exercise Picker
    'picker.title': 'Add Exercise',
    
    // Workout
    'workout.title': 'Workout in progress',
    'workout.exercise': 'Exercise',
    'workout.set': 'Set',
    'workout.of': 'of',
    'workout.completeSet': 'Complete Set',
    'workout.restTime': 'Rest Time',
    'workout.skipRest': 'Skip Rest',
    'workout.progress': 'Exercise Progress',
    'workout.endEarly': 'End Workout Early',
    'workout.planNotFound': 'Plan not found',
    'workout.backToPlans': 'Back to Plans',
    
    // History
    'history.title': 'Workout History',
    'history.subtitle': 'View your completed workouts',
    'history.noWorkouts': 'No workouts completed yet',
    'history.startFirst': 'Start your first workout',
    'history.duration': 'duration',
    'history.sets': 'sets',
    
    // Common
    'common.all': 'All',
    'common.chest': 'Chest',
    'common.back': 'Back',
    'common.legs': 'Legs',
    'common.shoulders': 'Shoulders',
    'common.arms': 'Arms',
    'common.core': 'Core',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.loading': 'Loading...',
  },
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.library': 'Egzersiz Kütüphanesi',
    'nav.plans': 'Planlarım',
    'nav.history': 'Geçmiş',
    'nav.createPlan': 'Plan Oluştur',
    
    // Home
    'home.title': 'WorkoutForge\'e Hoş Geldiniz',
    'home.subtitle': 'Özel antrenman planları oluşturun, egzersiz kütüphanemize göz atın ve fitness yolculuğunuzu takip edin.',
    'home.myPlans': 'Planlarım',
    'home.myPlansDesc': 'Antrenman planlarınızı görüntüleyin ve yönetin',
    'home.createPlan': 'Plan Oluştur',
    'home.createPlanDesc': 'Yeni özel bir antrenman planı oluşturun',
    'home.exerciseLibrary': 'Egzersiz Kütüphanesi',
    'home.exerciseLibraryDesc': 'Kas grubuna göre egzersizleri inceleyin',
    'home.history': 'Geçmiş',
    'home.historyDesc': 'Tamamlanan antrenmanlarınızı görüntüleyin',
    'home.gettingStarted': 'Başlarken',
    'home.step1': 'Mevcut egzersizleri görmek için Egzersiz Kütüphanesi\'ni ziyaret edin',
    'home.step2': 'Yeni bir plan oluşturun veya Hazır Planlarımızdan birini kullanın',
    'home.step3': 'Bir antrenmana başlayın ve ilerlemenizi takip edin',
    'home.step4': 'Ne kadar yol kat ettiğinizi görmek için geçmişinizi inceleyin',
    
    // Library
    'library.title': 'Egzersiz Kütüphanesi',
    'library.subtitle': 'Kas grubuna göre egzersizleri inceleyin',
    'library.noExercises': 'Bu filtre için egersiz bulunamadı.',
    
    // Plans
    'plans.title': 'Planlarım',
    'plans.subtitle': 'Antrenman planlarınız ve şablonlar',
    'plans.yourPlans': 'Planlarınız',
    'plans.premadePlans': 'Hazır Planlar',
    'plans.noPlans': 'Henüz plan yok. İlk antrenman planınızı oluşturun!',
    'plans.exercises': 'egzersiz',
    'plans.clone': 'Planı kopyala',
    'plans.delete': 'Planı sil',
    
    // Plan Detail
    'plan.startWorkout': 'Antrenmana Başla',
    'plan.edit': 'Düzenle',
    'plan.delete': 'Sil',
    'plan.exercises': 'Egzersizler',
    'plan.sets': 'set',
    'plan.reps': 'tekrar',
    'plan.rest': 'dinlenme',
    'plan.recentWorkouts': 'Son Antrenmanlar',
    'plan.setsCompleted': 'set tamamlandı',
    
    // Create/Edit Plan
    'plan.create.title': 'Plan Oluştur',
    'plan.edit.title': 'Planı Düzenle',
    'plan.name': 'Plan Adı',
    'plan.namePlaceholder': 'Örn: Üst Vücut Antrenmanı',
    'plan.description': 'Açıklama',
    'plan.descriptionPlaceholder': 'İsteğe bağlı açıklama',
    'plan.addExercise': 'Egzersiz Ekle',
    'plan.noExercisesAdded': 'Henüz egzersiz eklenmedi. Başlamak için "Egzersiz Ekle"ye tıklayın.',
    'plan.save': 'Planı Kaydet',
    'plan.cancel': 'İptal',
    'plan.enterName': 'Lütfen bir plan adı girin',
    'plan.addExerciseFirst': 'Lütfen en az bir egzersiz ekleyin',
    
    // Exercise Picker
    'picker.title': 'Egzersiz Ekle',
    
    // Workout
    'workout.title': 'Antrenman devam ediyor',
    'workout.exercise': 'Egzersiz',
    'workout.set': 'Set',
    'workout.of': '/',
    'workout.completeSet': 'Seti Tamamla',
    'workout.restTime': 'Dinlenme Süresi',
    'workout.skipRest': 'Dinlenmeyi Atla',
    'workout.progress': 'Egzersiz İlerlemesi',
    'workout.endEarly': 'Antrenmanı Erken Bitir',
    'workout.planNotFound': 'Plan bulunamadı',
    'workout.backToPlans': 'Planlara Dön',
    
    // History
    'history.title': 'Antrenman Geçmişi',
    'history.subtitle': 'Tamamlanan antrenmanlarınızı görüntüleyin',
    'history.noWorkouts': 'Henüz tamamlanan antrenman yok',
    'history.startFirst': 'İlk antrenmanınıza başlayın',
    'history.duration': 'süre',
    'history.sets': 'set',
    
    // Common
    'common.all': 'Tümü',
    'common.chest': 'Göğüs',
    'common.back': 'Sırt',
    'common.legs': 'Bacak',
    'common.shoulders': 'Omuz',
    'common.arms': 'Kol',
    'common.core': 'Core',
    'common.save': 'Kaydet',
    'common.cancel': 'İptal',
    'common.delete': 'Sil',
    'common.confirm': 'Onayla',
    'common.loading': 'Yükleniyor...',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const defaultContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => translations['en'][key] || key,
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('workoutforge-language') as Language | null;
    if (stored && (stored === 'en' || stored === 'tr')) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('workoutforge-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  const value = mounted ? { language, setLanguage, t } : defaultContext;

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
