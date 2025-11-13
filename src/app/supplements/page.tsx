'use client';

import { useState } from 'react';
import { Pill, Plus, Check, Clock, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

export default function SupplementsPage() {
  const [supplements] = useState([
    {
      id: 1,
      name: 'Vitamina D3',
      dosage: '2000 UI',
      frequency: 'Diário',
      time: 'Manhã',
      taken: false,
      color: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 2,
      name: 'Ômega 3',
      dosage: '1000mg',
      frequency: 'Diário',
      time: 'Almoço',
      taken: true,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 3,
      name: 'Magnésio',
      dosage: '400mg',
      frequency: 'Diário',
      time: 'Noite',
      taken: false,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      id: 4,
      name: 'Ferro',
      dosage: '14mg',
      frequency: '3x por semana',
      time: 'Manhã',
      taken: false,
      color: 'bg-red-100 text-red-700'
    },
    {
      id: 5,
      name: 'Colágeno',
      dosage: '10g',
      frequency: 'Diário',
      time: 'Manhã',
      taken: true,
      color: 'bg-pink-100 text-pink-700'
    }
  ]);

  const todayProgress = {
    taken: supplements.filter(s => s.taken).length,
    total: supplements.length
  };

  const weeklyStats = {
    adherence: 85,
    missedDoses: 3,
    perfectDays: 4
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Suplementação 💊
        </h1>
        <p className="text-gray-600">
          Gerencie seus suplementos e mantenha a consistência
        </p>
      </div>

      {/* Progresso de Hoje */}
      <Card className="mb-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            Progresso de Hoje
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold text-green-600">
                {todayProgress.taken}/{todayProgress.total}
              </div>
              <div className="text-sm text-gray-600">Suplementos tomados</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                {Math.round((todayProgress.taken / todayProgress.total) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Completo</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all"
              style={{ width: `${(todayProgress.taken / todayProgress.total) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Suplementos */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Seus Suplementos</CardTitle>
                <CardDescription>Marque conforme você toma durante o dia</CardDescription>
              </div>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {supplements.map((supplement) => (
                <div 
                  key={supplement.id} 
                  className={`p-4 rounded-lg border transition-all ${
                    supplement.taken ? 'bg-green-50 border-green-200' : 'hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <Checkbox 
                      checked={supplement.taken}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className={`font-semibold ${supplement.taken ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {supplement.name}
                          </h3>
                          <p className="text-sm text-gray-600">{supplement.dosage}</p>
                        </div>
                        <Badge className={supplement.color}>
                          {supplement.frequency}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {supplement.time}
                        </span>
                        {supplement.taken && (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                            ✓ Tomado
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas e Lembretes */}
        <div className="space-y-6">
          {/* Estatísticas Semanais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Estatísticas Semanais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {weeklyStats.adherence}%
                </div>
                <div className="text-sm text-gray-600">Taxa de Adesão</div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 rounded-lg border">
                  <div className="text-2xl font-bold text-green-600">{weeklyStats.perfectDays}</div>
                  <div className="text-xs text-gray-600">Dias Perfeitos</div>
                </div>
                <div className="text-center p-3 rounded-lg border">
                  <div className="text-2xl font-bold text-orange-600">{weeklyStats.missedDoses}</div>
                  <div className="text-xs text-gray-600">Doses Perdidas</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Próximos Lembretes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Próximos Lembretes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">Vitamina D3</span>
                  <Badge variant="secondary" className="text-xs">Manhã</Badge>
                </div>
                <p className="text-xs text-gray-600">Lembrete em 2 horas</p>
              </div>
              
              <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">Magnésio</span>
                  <Badge variant="secondary" className="text-xs">Noite</Badge>
                </div>
                <p className="text-xs text-gray-600">Lembrete às 21:00</p>
              </div>
            </CardContent>
          </Card>

          {/* Dica */}
          <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Pill className="w-4 h-4 text-pink-600" />
                Dica Importante
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">
                Tome o ferro com vitamina C (suco de laranja) para melhor absorção. 
                Evite café ou chá próximo ao horário.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Calendário de Adesão */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Calendário de Adesão
          </CardTitle>
          <CardDescription>
            Visualize sua consistência ao longo do mês
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }).map((_, index) => {
              const isToday = index === 15;
              const isPerfect = Math.random() > 0.3;
              const isMissed = !isPerfect && Math.random() > 0.5;
              
              return (
                <div
                  key={index}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium ${
                    isToday
                      ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                      : isPerfect
                      ? 'bg-green-100 text-green-700'
                      : isMissed
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100" />
              <span className="text-gray-600">Completo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-100" />
              <span className="text-gray-600">Incompleto</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500" />
              <span className="text-gray-600">Hoje</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
