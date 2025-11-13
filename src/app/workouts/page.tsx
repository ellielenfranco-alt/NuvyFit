'use client';

import { useState } from 'react';
import { Dumbbell, Home, Building2, Plus, TrendingUp, Clock, Flame } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function WorkoutsPage() {
  const [location, setLocation] = useState<'home' | 'gym'>('home');

  const weekProgress = {
    completed: 3,
    goal: 5,
    totalMinutes: 180,
    caloriesBurned: 850
  };

  const todayWorkout = {
    type: 'Treino de Pernas',
    location: 'Casa',
    duration: 45,
    exercises: [
      { name: 'Agachamento', sets: 4, reps: 15, rest: 60 },
      { name: 'Afundo', sets: 3, reps: 12, rest: 45 },
      { name: 'Elevação pélvica', sets: 4, reps: 20, rest: 45 },
      { name: 'Panturrilha', sets: 3, reps: 20, rest: 30 }
    ]
  };

  const workoutHistory = [
    {
      date: '15/01/2024',
      type: 'Treino Superior',
      duration: 50,
      calories: 320,
      completed: true
    },
    {
      date: '13/01/2024',
      type: 'Treino Inferior',
      duration: 45,
      calories: 280,
      completed: true
    },
    {
      date: '11/01/2024',
      type: 'Treino Full Body',
      duration: 60,
      calories: 380,
      completed: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Treinos 💪
        </h1>
        <p className="text-gray-600">
          Planos personalizados pela IA para casa ou academia
        </p>
      </div>

      {/* Progresso Semanal */}
      <Card className="mb-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Progresso desta Semana
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {weekProgress.completed}/{weekProgress.goal}
              </div>
              <div className="text-sm text-gray-600">Treinos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{weekProgress.totalMinutes}</div>
              <div className="text-sm text-gray-600">Minutos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{weekProgress.caloriesBurned}</div>
              <div className="text-sm text-gray-600">Calorias</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {Math.round((weekProgress.completed / weekProgress.goal) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Meta</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="today">Hoje</TabsTrigger>
          <TabsTrigger value="plan">Plano IA</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        {/* Aba Treino de Hoje */}
        <TabsContent value="today" className="space-y-6">
          {/* Seletor de Local */}
          <Card>
            <CardHeader>
              <CardTitle>Onde você vai treinar?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={location === 'home' ? 'default' : 'outline'}
                  className={location === 'home' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''}
                  onClick={() => setLocation('home')}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Em Casa
                </Button>
                <Button
                  variant={location === 'gym' ? 'default' : 'outline'}
                  className={location === 'gym' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''}
                  onClick={() => setLocation('gym')}
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Academia
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Treino do Dia */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{todayWorkout.type}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {todayWorkout.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      ~300 kcal
                    </span>
                  </CardDescription>
                </div>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                  {todayWorkout.location}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayWorkout.exercises.map((exercise, index) => (
                <div key={index} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {exercise.sets} séries × {exercise.reps} repetições
                      </p>
                    </div>
                    <Badge variant="secondary">{exercise.rest}s descanso</Badge>
                  </div>
                </div>
              ))}

              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg py-6">
                <Dumbbell className="w-5 h-5 mr-2" />
                Iniciar Treino
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Plano IA */}
        <TabsContent value="plan" className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-blue-600" />
                Plano Personalizado pela IA
              </CardTitle>
              <CardDescription>
                Baseado no seu perfil e objetivos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-white">
                <h3 className="font-semibold text-gray-900 mb-2">Seu Objetivo</h3>
                <p className="text-gray-700">Tonificação e ganho de massa muscular</p>
              </div>

              <div className="p-4 rounded-lg bg-white">
                <h3 className="font-semibold text-gray-900 mb-3">Plano Semanal</h3>
                <div className="space-y-2">
                  {['Segunda', 'Quarta', 'Sexta'].map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium text-gray-900">{day}</p>
                        <p className="text-sm text-gray-600">
                          {index === 0 ? 'Treino Superior' : index === 1 ? 'Treino Inferior' : 'Full Body'}
                        </p>
                      </div>
                      <Badge variant="secondary">45-60 min</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">💡 Dicas da IA</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Mantenha 48h de descanso entre treinos do mesmo grupo muscular</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Aumente a carga progressivamente a cada 2 semanas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Combine com alimentação rica em proteínas</span>
                  </li>
                </ul>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                <Plus className="w-4 h-4 mr-2" />
                Gerar Novo Plano
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Histórico */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Treinos</CardTitle>
              <CardDescription>Seus treinos completados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {workoutHistory.map((workout, index) => (
                  <div key={index} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{workout.type}</h3>
                        <p className="text-sm text-gray-500">{workout.date}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                        Completo
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4" />
                        {workout.calories} kcal
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
