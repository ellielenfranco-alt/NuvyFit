'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
  LogOut,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { createBrowserClient } from '@/lib/supabase/client';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createBrowserClient();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/login');
        } else {
          setUser(user);
        }
      } catch (error) {
        console.error('Erro ao verificar usuário:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return null;
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
        {/* Header com Logout */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Olá, {user.email?.split('@')[0]}! 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Aqui está seu resumo de hoje
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Calorias */}
          <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                Calorias Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {stats.todayCalories} / {stats.calorieGoal}
              </div>
              <Progress value={(stats.todayCalories / stats.calorieGoal) * 100} className="h-2 mb-2" />
              <p className="text-xs text-gray-500">
                {stats.calorieGoal - stats.todayCalories} kcal restantes
              </p>
            </CardContent>
          </Card>

          {/* Treinos */}
          <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-purple-500" />
                Treinos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {stats.weeklyWorkouts} / 5
              </div>
              <Progress value={(stats.weeklyWorkouts / 5) * 100} className="h-2 mb-2" />
              <p className="text-xs text-gray-500">
                Esta semana
              </p>
            </CardContent>
          </Card>

          {/* Ciclo Menstrual */}
          <Card className="border-l-4 border-l-pink-500 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-pink-500" />
                Ciclo Menstrual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                Dia {stats.cycleDay}
              </div>
              <p className="text-sm text-gray-600 mb-1">
                Fase folicular
              </p>
              <p className="text-xs text-gray-500">
                Próxima menstruação em ~16 dias
              </p>
            </CardContent>
          </Card>

          {/* Suplementos */}
          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Pill className="w-4 h-4 text-green-500" />
                Suplementos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {stats.supplementsTaken} / {stats.supplementsTotal}
              </div>
              <Progress value={(stats.supplementsTaken / stats.supplementsTotal) * 100} className="h-2 mb-2" />
              <p className="text-xs text-gray-500">
                Tomados hoje
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.href} href={action.href}>
                  <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-gray-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${action.gradient} group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-700">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Destaque - Próximo Tratamento Capilar */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 border-purple-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scissors className="w-5 h-5 text-purple-600" />
              Próximo Tratamento Capilar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900 mb-1">{stats.nextTreatment}</p>
                <p className="text-sm text-gray-600">Agendado para amanhã</p>
              </div>
              <Link href="/hair">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Ver Cronograma
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Progresso Semanal */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Progresso Semanal
            </CardTitle>
            <CardDescription>Seu desempenho nos últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-orange-600 mb-2">21</div>
                <p className="text-sm text-gray-600 font-medium">Refeições registradas</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-purple-600 mb-2">4</div>
                <p className="text-sm text-gray-600 font-medium">Treinos completos</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-blue-600 mb-2">15km</div>
                <p className="text-sm text-gray-600 font-medium">Distância percorrida</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-green-600 mb-2">92%</div>
                <p className="text-sm text-gray-600 font-medium">Adesão suplementos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dica do Dia com IA */}
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Sparkles className="w-5 h-5" />
              Dica Personalizada da IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              Você está na fase folicular do seu ciclo! É o momento perfeito para treinos mais intensos 
              e para iniciar novos desafios. Seu corpo está com energia alta e recuperação rápida. 
              Aproveite para aumentar a intensidade dos treinos de força. 💪✨
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
