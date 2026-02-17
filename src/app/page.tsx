'use client';

import Link from 'next/link';
import { Dumbbell, Library, ListTodo, History, Target, TrendingUp } from 'lucide-react';
import { Card } from '@/components/Card';
import { useLanguage } from '@/lib/i18n';

export default function Home() {
  const { t } = useLanguage();

  const features = [
    { 
      href: '/plans', 
      icon: ListTodo, 
      title: t('home.myPlans'), 
      desc: t('home.myPlansDesc'),
      iconBg: 'bg-red-100 dark:bg-red-900/30',
      iconColor: 'text-red-600 dark:text-red-400'
    },
    { 
      href: '/plans/create', 
      icon: Dumbbell, 
      title: t('home.createPlan'), 
      desc: t('home.createPlanDesc'),
      iconBg: 'bg-red-100 dark:bg-red-900/30',
      iconColor: 'text-red-600 dark:text-red-400'
    },
    { 
      href: '/library', 
      icon: Library, 
      title: t('home.exerciseLibrary'), 
      desc: t('home.exerciseLibraryDesc'),
      iconBg: 'bg-red-100 dark:bg-red-900/30',
      iconColor: 'text-red-600 dark:text-red-400'
    },
    { 
      href: '/history', 
      icon: History, 
      title: t('home.history'), 
      desc: t('home.historyDesc'),
      iconBg: 'bg-red-100 dark:bg-red-900/30',
      iconColor: 'text-red-600 dark:text-red-400'
    },
  ];

  const steps = [
    { icon: Library, text: t('home.step1'), color: 'gray' },
    { icon: Dumbbell, text: t('home.step2'), color: 'gray' },
    { icon: TrendingUp, text: t('home.step3'), color: 'gray' },
    { icon: History, text: t('home.step4'), color: 'gray' },
  ];

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="text-center py-8 sm:py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 animate-fade-in">
          {t('home.title')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in stagger-1">
          {t('home.subtitle')}
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <Link key={index} href={feature.href} className="block h-full">
            <Card hover className="p-5 h-full flex flex-col animate-slide-up" style={{ animationDelay: `${index * 0.05 + 0.1}s`, animationFillMode: 'both' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2.5 rounded-xl ${feature.iconBg}`}>
                  <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
                </div>
              </div>
              <h2 className="font-semibold text-foreground mb-1">{feature.title}</h2>
              <p className="text-sm text-muted-foreground mt-auto">{feature.desc}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Getting Started */}
      <Card className="p-6 sm:p-8 animate-slide-up stagger-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary rounded-lg">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">{t('home.gettingStarted')}</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          {steps.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
              <div className={`p-1.5 rounded-md bg-muted`}>
                <item.icon className={`w-4 h-4 text-muted-foreground`} />
              </div>
              <span className="text-sm text-muted-foreground leading-relaxed">{item.text}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
