'use client';

import { useWorkoutHistory } from '@/hooks/useStorage';
import { Card } from '@/components/Card';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { History, Clock, Dumbbell, TrendingUp } from 'lucide-react';

export default function HistoryPage() {
  const { history } = useWorkoutHistory();
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('history.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('history.subtitle')}</p>
      </div>

      {history.length === 0 ? (
        <Card className="p-8 sm:p-12 text-center">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <History className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">{t('history.noWorkouts')}</p>
          <Link href="/plans" className="text-primary hover:underline font-medium">
            {t('history.startFirst')}
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-lg">
                  <Dumbbell className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{history.length}</p>
                  <p className="text-sm text-muted-foreground">{t('history.title')}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-lg">
                  <TrendingUp className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {history.reduce((sum, h) => sum + h.completedSets.filter(s => s.completed).length, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">{t('history.sets')}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-lg">
                  <Clock className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.floor(history.reduce((sum, h) => sum + h.duration, 0) / 60)}m
                  </p>
                  <p className="text-sm text-muted-foreground">{t('history.duration')}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* History List */}
          <div className="space-y-3">
            {history.map((session, index) => {
              const completedCount = session.completedSets.filter(s => s.completed).length;
              const progress = Math.round((completedCount / session.totalSets) * 100);

              return (
                <Card key={session.id} className="p-4 animate-slide-up" style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{session.planName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(session.date).toLocaleDateString(undefined, {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {Math.floor(session.duration / 60)}m {session.duration % 60}s
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground w-12 text-right">
                        {progress}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Dumbbell className="w-4 h-4" />
                      {completedCount}/{session.totalSets} {t('history.sets')}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
