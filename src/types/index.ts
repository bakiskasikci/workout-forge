export type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core';
export type Equipment = 'barbell' | 'dumbbell' | 'machine' | 'bodyweight' | 'cable' | 'other';

export interface Exercise {
  id: string;
  name: string;
  muscles: MuscleGroup[];
  equipment: Equipment;
  description: string;
  instructions: string[];
  tips?: string[];
}

export interface PlanExercise {
  id: string;
  exerciseId: string;
  sets: number;
  reps: number;
  weight: number;
  restSeconds: number;
  order: number;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  exercises: PlanExercise[];
  isPreMade: boolean;
  createdAt: string;
}

export interface CompletedSet {
  exerciseId: string;
  setIndex: number;
  completed: boolean;
}

export interface WorkoutSession {
  id: string;
  planId: string;
  planName: string;
  date: string;
  duration: number;
  completedSets: CompletedSet[];
  totalSets: number;
  completedAt: string;
}
