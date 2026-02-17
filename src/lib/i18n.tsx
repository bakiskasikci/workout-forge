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
    'plan.weight': 'Weight (kg)',
    'plan.unknownExercise': 'Unknown Exercise',
    
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
    'common.advanced': 'Advanced',
    'common.intermediate': 'Intermediate',
    'common.beginner': 'Beginner',

    // Muscle groups
    'muscle.chest': 'Chest',
    'muscle.back': 'Back',
    'muscle.legs': 'Legs',
    'muscle.shoulders': 'Shoulders',
    'muscle.arms': 'Arms',
    'muscle.core': 'Core',

    // Library filters
    'library.filters': 'Filters',
    'library.clearFilters': 'Clear Filters',
    'library.equipment': 'Equipment',
    'library.sortBy': 'Sort By',
    'library.exercisesFound': 'exercises found',
    'library.search': 'Search exercises...',
    'library.difficulty': 'Difficulty Level',
    'library.overview': 'Overview',
    'library.howToPerform': 'How to Perform (Step by Step)',
    'library.tips': 'Tips & Tricks',
    'library.targetedMuscles': 'Targeted Muscles',
    'library.close': 'Close',

    // Weight units
    'common.kg': 'kg',
    'common.seconds': 's',
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
    'plan.weight': 'Ağırlık (kg)',
    'plan.unknownExercise': 'Bilinmeyen Egzersiz',
    
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

    // Exercise names in Turkish
    'exercise.bench-press': 'Bench Press',
    'exercise.incline-bench-press': 'Incline Bench Press',
    'exercise.decline-bench-press': 'Decline Bench Press',
    'exercise.dumbbell-bench-press': 'Dumbbell Bench Press',
    'exercise.dumbbell-fly': 'Dumbbell Fly',
    'exercise.cable-crossover': 'Cable Crossover',
    'exercise.pec-deck': 'Pec Deck',
    'exercise.push-up': 'Şınav',
    'exercise.chest-dip': 'Göğüs Dipi',
    'exercise.chest-press-machine': 'Göğüs Press Makinesi',
    'exercise.deadlift': 'Deadlift',
    'exercise.pull-up': 'Pull-Up',
    'exercise.chin-up': 'Chin-Up',
    'exercise.lat-pulldown': 'Lat Pulldown',
    'exercise.barbell-row': 'Barbell Row',
    'exercise.dumbbell-row': 'Dumbbell Row',
    'exercise.seated-cable-row': 'Oturarak Cable Row',
    'exercise.t-bar-row': 'T-Bar Row',
    'exercise.inverted-row': 'Inverted Row',
    'exercise.face-pull': 'Face Pull',
    'exercise.rack-pull': 'Rack Pull',
    'exercise.hyperextension': 'Hyperextension',
    'exercise.squat': 'Squat',
    'exercise.front-squat': 'Front Squat',
    'exercise.leg-press': 'Leg Press',
    'exercise.hack-squat': 'Hack Squat',
    'exercise.lunges': 'Lunge',
    'exercise.bulgarian-split-squat': 'Bulgarian Split Squat',
    'exercise.leg-extension': 'Leg Extension',
    'exercise.leg-curl': 'Leg Curl',
    'exercise.seated-leg-curl': 'Oturarak Leg Curl',
    'exercise.romanian-deadlift': 'Romanian Deadlift',
    'exercise.stiff-leg-deadlift': 'Stiff Leg Deadlift',
    'exercise.hip-thrust': 'Hip Thrust',
    'exercise.glute-bridge': 'Glute Bridge',
    'exercise.calf-raise-standing': 'Ayak Bileği Kaldırma (Ayakta)',
    'exercise.calf-raise-seated': 'Ayak Bileği Kaldırma (Oturarak)',
    'exercise.step-up': 'Step-Up',
    'exercise.good-morning': 'Good Morning',
    'exercise.overhead-press': 'Overhead Press',
    'exercise.dumbbell-shoulder-press': 'Dumbbell Shoulder Press',
    'exercise.arnold-press': 'Arnold Press',
    'exercise.lateral-raise': 'Lateral Raise',
    'exercise.front-raise': 'Front Raise',
    'exercise.reverse-fly': 'Reverse Fly',
    'exercise.upright-row': 'Upright Row',
    'exercise.machine-shoulder-press': 'Makine Shoulder Press',
    'exercise.cable-lateral-raise': 'Cable Lateral Raise',
    'exercise.shrug': 'Shrug',
    'exercise.bicep-curl': 'Bicep Curl',
    'exercise.dumbbell-curl': 'Dumbbell Curl',
    'exercise.hammer-curl': 'Hammer Curl',
    'exercise.preacher-curl': 'Preacher Curl',
    'exercise.incline-curl': 'Incline Curl',
    'exercise.concentration-curl': 'Concentration Curl',
    'exercise.cable-curl': 'Cable Curl',
    'exercise.tricep-pushdown': 'Tricep Pushdown',
    'exercise.tricep-dip': 'Tricep Dipi',
    'exercise.skull-crusher': 'Skull Crusher',
    'exercise.overhead-tricep-extension': 'Overhead Tricep Extension',
    'exercise.tricep-kickback': 'Tricep Kickback',
    'exercise.close-grip-bench': 'Close Grip Bench',
    'exercise.wrist-curl': 'Wrist Curl',
    'exercise.reverse-wrist-curl': 'Reverse Wrist Curl',
    'exercise.plank': 'Plank',
    'exercise.crunch': 'Crunch',
    'exercise.sit-up': 'Sit-Up',
    'exercise.bicycle-crunch': 'Bisiklet Crunch',
    'exercise.leg-raise': 'Leg Raise',
    'exercise.hanging-leg-raise': 'Asılı Leg Raise',
    'exercise.russian-twist': 'Russian Twist',
    'exercise.mountain-climber': 'Mountain Climber',
    'exercise.dead-bug': 'Dead Bug',
    'exercise.ab-wheel-rollout': 'Ab Wheel',
    'exercise.cable-woodchop': 'Cable Woodchop',
    'exercise.side-plank': 'Side Plank',
    'exercise.v-up': 'V-Up',
    'exercise.flutter-kick': 'Flutter Kick',
    'exercise.hollow-body': 'Hollow Body',
    'exercise.captain-chair-leg-raise': 'Captain Chair Leg Raise',
    'exercise.tuck-raise': 'Tuck Raise',

    // Exercise descriptions
    'desc.bench-press': 'Göğüs egzersizlerinin kralı. Genel göğüs kütlesi ve gücü oluşturan bileşik bir hareket.',
    'desc.incline-bench-press': 'Tam bir göğüs gelişi için üst göğüs kaslarını hedefler.',
    'desc.decline-bench-press': 'Alt göğüs kaslarını vurgularken omuz katılımını en aza indirir.',
    'desc.dumbbell-bench-press': 'Daha geniş hareket aralığı ve bağımsız kol hareketi sağlar.',
    'desc.dumbbell-fly': 'Göğüs kaslarını esneten ve sıkıştıran izolasyon egzersizi.',
    'desc.cable-crossover': 'Tüm hareket boyunca sabit gerilim sağlar.',
    'desc.pec-deck': 'Tutarlı göğüs izolasyonu sağlayan makine egzersizi.',
    'desc.push-up': 'Her yerde yapılabilen klasik vücut ağırlıklı göğüs egzersizi.',
    'desc.chest-dip': 'Alt göğüsü hedefleyen ileri düzey vücut ağırlıklı egzersiz.',
    'desc.chest-press-machine': 'Başlangıçlar için harika ve göğüs izole eden makine egzersizi.',
    'desc.deadlift': 'Genel güç için en iyi tam vücut bileşik egzersizi.',
    'desc.pull-up': 'Geniş, güçlü bir sırt oluşturmak için altın standart.',
    'desc.chin-up': 'Bisikleti vurgulayan avuç içi tutuşlu pull-up varyasyonu.',
    'desc.lat-pulldown': 'Pull-up hareketini taklit eden makine egzersizi.',
    'desc.barbell-row': 'Kalınlık oluşturmak için temel sırt egzersizi.',
    'desc.dumbbell-row': 'Tam hareket aralığına izin veren tek kol sırt egzersizi.',
    'desc.seated-cable-row': 'Orta sırtı kalınlık ve detay için hedefler.',
    'desc.t-bar-row': 'Kalın, geniş bir sırt oluşturmak için harika egzersiz.',
    'desc.inverted-row': 'Sırt kalınlığı için yatay çekme hareketi.',
    'desc.face-pull': 'Omuz sağlığı için arka deltoidleri ve üst sırtı hedefler.',
    'desc.rack-pull': 'Üst sırtı ve trapezi vurgulayan kısmi deadlift.',
    'desc.hyperextension': 'Alt sırtı ve gluteal kasları hedefler.',
    'desc.squat': 'Alt vücut gelişi için bacak egzersizlerinin kralı.',
    'desc.front-squat': 'Dörtlü kasları vurgulayan ve iyi mobilite gerektiren squat varyasyonu.',
    'desc.leg-press': 'Sırt desteğiyle bacak kütlesi oluşturmak için makine egzersizi.',
    'desc.hack-squat': 'Dörtlü kasları ve gluteal kasları hedefleyen makine squat varyasyonu.',
    'desc.lunges': 'Denge ve bacak gelişi için tek taraflı bacak egzersizi.',
    'desc.bulgarian-split-squat': 'Dörtlü ve gluteal gelişi için ileri düzey tek bacak egzersizi.',
    'desc.leg-extension': 'Quadriceps için izolasyon egzersizi.',
    'desc.leg-curl': 'Hamstringler için izolasyon egzersizi.',
    'desc.seated-leg-curl': 'Hamstringler için oturarak leg curl varyasyonu.',
    'desc.romanian-deadlift': 'Hamstringleri ve gluteal kasları hedefleyen kalça menteşe hareketi.',
    'desc.stiff-leg-deadlift': 'Hamstring vurgulu deadlift varyasyonu.',
    'desc.hip-thrust': 'Glute gücü ve boyutu oluşturmak için en iyi egzersiz.',
    'desc.glute-bridge': 'Gluteal kaslarını aktive etmek ve geliştirmek için vücut ağırlıklı egzersiz.',
    'desc.calf-raise-standing': 'Gastrocnemius\'u (büyük baldır kası) hedefler.',
    'desc.calf-raise-seated': 'Soleus\'u (alt baldır kası) hedefler.',
    'desc.step-up': 'Bacak gücü ve dengesi için fonksiyonel egzersiz.',
    'desc.good-morning': 'Posterior zincir gelişi için kalça menteşe egzersizi.',
    'desc.overhead-press': 'Omuz gelişi için temel baskı hareketi.',
    'desc.dumbbell-shoulder-press': 'Omuzlar için serbest ağırlık baskı egzersizi.',
    'desc.arnold-press': 'Arnold Schwarzenegger\'den sonra adlandırılan, tüm omuz başlarını hedefler.',
    'desc.lateral-raise': 'Yan deltoidler için izolasyon egzersizi.',
    'desc.front-raise': 'Ön deltoidler için izolasyon egzersizi.',
    'desc.reverse-fly': 'Arka deltoidleri ve üst sırtı hedefler.',
    'desc.upright-row': 'Çekme hareketiyle omuzları ve trapzları hedefler.',
    'desc.machine-shoulder-press': 'Stabilite ile omuz gelişi için makine egzersizi.',
    'desc.cable-lateral-raise': 'Yan deltoidlerde sabit gerilim sağlar.',
    'desc.shrug': 'Trapez kaslarını doğrudan hedefler.',
    'desc.bicep-curl': 'Kol kalınlığı için klasik bisiklet egzersizi.',
    'desc.dumbbell-curl': 'Tam hareket aralığı ve bağımsız kol çalışması sağlar.',
    'desc.hammer-curl': 'Nötr tutuşla bisiklet ve brakialis\'i hedefler.',
    'desc.preacher-curl': 'Bisiklet izolasyonu için katı form sağlar.',
    'desc.incline-curl': 'Daha fazla geliş için ağırlık altında bisikletleri esnetir.',
    'desc.concentration-curl': 'Maksimum bisiklet izolasyonu için.',
    'desc.cable-curl': 'Hareket boyunca sabit gerilim sağlar.',
    'desc.tricep-pushdown': 'Triceps için birincil kablo egzersizi.',
    'desc.tricep-dip': 'Triceps gelişi için vücut ağırlıklı egzersiz.',
    'desc.skull-crusher': 'Kitle oluşturma için yatarak triceps ekstansiyonu.',
    'desc.overhead-tricep-extension': 'Triceps\'in üç başını da esnetir ve çalıştırır.',
    'desc.tricep-kickback': 'Dumbbell ile triceps izolasyon egzersizi.',
    'desc.close-grip-bench': 'Barbell ile bileşik triceps egzersizi.',
    'desc.wrist-curl': 'Ön kolları ve bilek fleksörlerini güçlendirir.',
    'desc.reverse-wrist-curl': 'Dengeli ön kollar için bilek ekstansörlerini güçlendirir.',
    'desc.plank': 'Temel çekirdek stabilite egzersizi.',
    'desc.crunch': 'Rektus abdominis için temel karın egzersizi.',
    'desc.sit-up': 'Tam aralıklı karın egzersizi.',
    'desc.bicycle-crunch': 'Rotasyonla obliques ve rektus abdominis\'i hedefler.',
    'desc.leg-raise': 'Bacak hareketiyle alt karınları hedefler.',
    'desc.hanging-leg-raise': 'Zor karınlar için ileri düzey çekirdek egzersizi.',
    'desc.russian-twist': 'Rotasyonla obliques\'i hedefler.',
    'desc.mountain-climber': 'Kardiyovasküler faydaları olan dinamik çekirdek egzersizi.',
    'desc.dead-bug': 'Anti-ekstansiyonu eğiten güvenli çekirdek egzersizi.',
    'desc.ab-wheel-rollout': 'Derin karın katılımı için ileri düzey çekirdek egzersizi.',
    'desc.cable-woodchop': 'Kablo makinesi kullanarak rotasyonel çekirdek egzersizi.',
    'desc.side-plank': 'Obliques ve lateral çekirdeği hedefler.',
    'desc.v-up': 'Bacak ekstansiyonlu ileri düzey crunch.',
    'desc.flutter-kick': 'Alt karınlar için dinamik çekirdek egzersizi.',
    'desc.hollow-body': 'Toplam çekirdek katılımı için jimnastik çekirdek egzersizi.',
    'desc.captain-chair-leg-raise': 'Makine kullanarak asılı leg raise varyasyonu.',
    'desc.tuck-raise': 'Diz bükme ile asılı egzersiz.',

    // Muscle groups
    'muscle.chest': 'Göğüs',
    'muscle.back': 'Sırt',
    'muscle.legs': 'Bacak',
    'muscle.shoulders': 'Omuz',
    'muscle.arms': 'Kol',
    'muscle.core': 'Core',

    // Difficulty
    'common.advanced': 'İleri Seviye',
    'common.intermediate': 'Orta Seviye',
    'common.beginner': 'Başlangıç Seviyesi',

    // Library filters
    'library.filters': 'Filtreler',
    'library.clearFilters': 'Filtreleri Temizle',
    'library.equipment': 'Ekipman',
    'library.sortBy': 'Sırala',
    'library.exercisesFound': 'egzersiz bulundu',

    // Weight units
    'common.kg': 'kg',
    'common.seconds': 'sn',
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
