'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Importa o client corretamente
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();

import { 
  Calendar, 
  Scissors, 
  Dumbbell, 
  MapPin, 
  UtensilsCrossed,
  TrendingUp,
  Flame,
  Pill,
  ArrowRight,
  Sparkles,
  LogOut
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (!session) {
        router.push('/login');
        return;
      }

      setUserEmail(session.user.email ?? '');
      setLoading(false);
    }

    loadSession();

    // Listener de mudanças de login/logout
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login');
      }
    });

    return () => authListener?.subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Mock data
  const stats = {
    todayCalories: 1450,
    calorieGoal: 2000,
    todayWorkouts: 1,
    weeklyWorkouts: 4,
    cycleDay: 12,
    nextTreatment: 'Hidratação',
    waterIntake: 6,
    waterGoal: 8,
    supplementsTaken: 3,
    supplementsTotal: 5,
  };

  const quickActions = [
    {
      title: 'Registrar Refeição',
      description: 'Análise com IA',
      icon: UtensilsCrossed,
      href: '/meals',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Iniciar Treino',
      description: 'Plano personalizado',
      icon: Dumbbell,
      href: '/workouts',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Registrar Corrida',
      description: 'Com mapa de rota',
      icon: MapPin,
      href: '/runs',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Ciclo Menstrual',
      description: 'Acompanhe seu ciclo',
      icon: Calendar,
      href: '/menstrual',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Cronograma Capilar',
      description: 'Tratamentos IA',
      icon: Scissors,
      href: '/hair',
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Suplementos',
      description: 'Controle diário',
      icon: Pill,
      href: '/supplements',
      gradient: 'from-green-500 to-emerald-500',
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Olá, {userEmail.split('@')[0]}! 👋
            </h1>
            <p className="te
