'use client';

import { usePlans } from '@/hooks/useStorage';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { Plus, Dumbbell, Copy, Trash2, Sparkles } from 'lucide-react';

export default function PlansPage() {
  const { plans, deletePlan, savePlan } = usePlans();
  const { t } = useLanguage();

  const userPlans = plans.filter(p => !p.isPreMade);
  const preMade = plans.filter(p => p.isPreMade);

  const handleClone = (plan: typeof plans[0]) => {
    const cloned = {
      ...plan,
      id: `plan-${Date.now()}`,
      name: `${plan.name} (Copy)`,
      isPreMade: false,
      createdAt: new Date().toISOString(),
    };
    savePlan(cloned);
  };

  const PlanCard = ({ plan, showActions = true }: { plan: typeof plans[0]; showActions?: boolean }) => (
    <div className="h-full">
      <Link href={`/plans/${plan.id}`} className="block h-full">
        <Card className="p-4 card-hover h-full flex flex-col group">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors flex-1">
              {plan.name}
            </h3>
            {showActions && !plan.isPreMade && (
              <div className="flex gap-1 ml-2" onClick={(e) => e.preventDefault()}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClone(plan);
                  }}
                  className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                  title={t('plans.clone')}
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (confirm(t('common.confirm') + '?')) deletePlan(plan.id);
                  }}
                  className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  title={t('plans.delete')}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">{plan.description}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Dumbbell className="w-4 h-4" />
            {plan.exercises.length} {t('plans.exercises')}
          </div>
        </Card>
      </Link>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('plans.title')}</h1>
          <p className="text-muted-foreground mt-1">{t('plans.subtitle')}</p>
        </div>
        <Link href="/plans/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {t('nav.createPlan')}
          </Button>
        </Link>
      </div>

      {userPlans.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            {t('plans.yourPlans')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userPlans.map(plan => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-muted-foreground" />
          {t('plans.premadePlans')}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {preMade.map(plan => (
            <PlanCard key={plan.id} plan={plan} showActions={false} />
          ))}
        </div>
      </div>

      {plans.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Dumbbell className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">{t('plans.noPlans')}</p>
        </div>
      )}
    </div>
  );
}
