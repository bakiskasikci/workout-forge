import { useState, useCallback } from 'react';
import { WorkoutPlan, WorkoutSession } from '@/types';
import { preMadePlans } from '@/data/preMadePlans';

const PLANS_KEY = 'workoutforge_plans';
const HISTORY_KEY = 'workoutforge_history';

function getInitialPlans(): WorkoutPlan[] {
  if (typeof window === 'undefined') return preMadePlans;
  const stored = localStorage.getItem(PLANS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(PLANS_KEY, JSON.stringify(preMadePlans));
  return preMadePlans;
}

function getInitialHistory(): WorkoutSession[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(HISTORY_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
}

export function usePlans() {
  const [plans, setPlans] = useState<WorkoutPlan[]>(getInitialPlans);
  const [loading] = useState(false);

  const savePlan = useCallback((plan: WorkoutPlan) => {
    setPlans(prev => {
      const existing = prev.find(p => p.id === plan.id);
      let updated: WorkoutPlan[];
      if (existing) {
        updated = prev.map(p => p.id === plan.id ? plan : p);
      } else {
        updated = [...prev, plan];
      }
      localStorage.setItem(PLANS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deletePlan = useCallback((planId: string) => {
    setPlans(prev => {
      const updated = prev.filter(p => p.id !== planId);
      localStorage.setItem(PLANS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getPlan = useCallback((planId: string) => {
    return plans.find(p => p.id === planId);
  }, [plans]);

  return { plans, loading, savePlan, deletePlan, getPlan };
}

export function useWorkoutHistory() {
  const [history, setHistory] = useState<WorkoutSession[]>(getInitialHistory);
  const [loading] = useState(false);

  const addWorkout = useCallback((session: WorkoutSession) => {
    setHistory(prev => {
      const updated = [session, ...prev];
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getHistoryForPlan = useCallback((planId: string) => {
    return history.filter(h => h.planId === planId);
  }, [history]);

  return { history, loading, addWorkout, getHistoryForPlan };
}
