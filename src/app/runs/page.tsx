'use client';

import { useState } from 'react';
import { MapPin, Play, Pause, TrendingUp, Clock, Route, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function RunsPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentRun, setCurrentRun] = useState({
    distance: 0,
    duration: 0,
    pace: 0,
    calories: 0
  });

  const weekStats = {
    totalDistance: 15.5,
    totalRuns: 3,
    avgPace: 6.2,
    totalCalories: 920
  };

  const runHistory = [
    {
      date: '15/01/2024',
      distance: 5.2,
      duration: 32,
      pace: 6.1,
      calories: 310,
      route: 'Parque da Cidade'
    },
    {
      date: '13/01/2024',
      distance: 6.0,
      duration: 38,
      pace: 6.3,
      calories: 360,
      route: 'Orla da Praia'
    },
    {
      date: '11/01/2024',
      distance: 4.3,
      duration: 26,
      pace: 6.0,
      calories: 250,
      route: 'Bairro'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Corridas 🏃‍♀️
        </h1>
        <p className="text-gray-600">
          Registre suas corridas e acompanhe seu progresso
        </p>
      </div>

      {/* Estatísticas da Semana */}
      <Card className="mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Estatísticas desta Semana
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{weekStats.totalDistance}km</div>
              <div className="text-sm text-gray-600">Distância Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{weekStats.totalRuns}</div>
              <div className="text-sm text-gray-600">Corridas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{weekStats.avgPace}</div>
              <div className="text-sm text-gray-600">Pace Médio (min/km)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{weekStats.totalCalories}</div>
              <div className="text-sm text-gray-600">Calorias</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rastreador de Corrida */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Rastreador de Corrida</CardTitle>
            <CardDescription>
              Inicie uma nova corrida e acompanhe em tempo real
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mapa Placeholder */}
            <div className="relative h-80 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Mapa da Corrida</p>
                <p className="text-sm text-gray-500 mt-2">
                  {isRunning ? 'Rastreando sua localização...' : 'Inicie a corrida para ver o mapa'}
                </p>
              </div>
            </div>

            {/* Estatísticas em Tempo Real */}
            {isRunning && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-blue-50 text-center">
                  <div className="text-2xl font-bold text-blue-600">{currentRun.distance.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">km</div>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 text-center">
                  <div className="text-2xl font-bold text-purple-600">{currentRun.duration}</div>
                  <div className="text-sm text-gray-600">min</div>
                </div>
                <div className="p-4 rounded-lg bg-green-50 text-center">
                  <div className="text-2xl font-bold text-green-600">{currentRun.pace.toFixed(1)}</div>
                  <div className="text-sm text-gray-600">min/km</div>
                </div>
                <div className="p-4 rounded-lg bg-orange-50 text-center">
                  <div className="text-2xl font-bold text-orange-600">{currentRun.calories}</div>
                  <div className="text-sm text-gray-600">kcal</div>
                </div>
              </div>
            )}

            {/* Controles */}
            <div className="flex gap-3">
              {!isRunning ? (
                <Button
                  onClick={() => setIsRunning(true)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-lg py-6"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Iniciar Corrida
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => setIsRunning(false)}
                    variant="outline"
                    className="flex-1 text-lg py-6"
                  >
                    <Pause className="w-5 h-5 mr-2" />
                    Pausar
                  </Button>
                  <Button
                    onClick={() => {
                      setIsRunning(false);
                      setCurrentRun({ distance: 0, duration: 0, pace: 0, calories: 0 });
                    }}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-lg py-6"
                  >
                    Finalizar
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Metas e Dicas */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Meta Semanal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {weekStats.totalDistance}/20km
                </div>
                <div className="text-sm text-gray-600">Distância</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all"
                  style={{ width: `${(weekStats.totalDistance / 20) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 text-center">
                Faltam {(20 - weekStats.totalDistance).toFixed(1)}km para sua meta
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-yellow-600" />
                Dica do Dia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">
                Mantenha um pace constante nos primeiros 5 minutos para aquecer adequadamente 
                e evitar lesões. Seu corpo agradece! 💪
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recordes Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Maior distância</span>
                <span className="font-semibold text-gray-900">8.5km</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Melhor pace</span>
                <span className="font-semibold text-gray-900">5.8 min/km</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Mais calorias</span>
                <span className="font-semibold text-gray-900">520 kcal</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Histórico de Corridas */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="w-5 h-5" />
            Histórico de Corridas
          </CardTitle>
          <CardDescription>Suas últimas corridas registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {runHistory.map((run, index) => (
              <div key={index} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{run.route}</h3>
                    <p className="text-sm text-gray-500">{run.date}</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                    {run.distance}km
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Duração
                    </div>
                    <div className="font-semibold text-gray-900">{run.duration} min</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Pace</div>
                    <div className="font-semibold text-gray-900">{run.pace} min/km</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Calorias</div>
                    <div className="font-semibold text-gray-900">{run.calories} kcal</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
