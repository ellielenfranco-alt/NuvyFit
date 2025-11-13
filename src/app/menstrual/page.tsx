'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Plus, TrendingUp, Heart, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';

export default function MenstrualPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock data
  const currentCycle = {
    day: 12,
    phase: 'Fase Folicular',
    nextPeriod: 16,
    cycleLength: 28,
    symptoms: ['Energia alta', 'Humor estável']
  };

  const phases = [
    {
      name: 'Menstruação',
      days: '1-5',
      color: 'bg-red-100 text-red-700',
      description: 'Período menstrual'
    },
    {
      name: 'Folicular',
      days: '6-13',
      color: 'bg-blue-100 text-blue-700',
      description: 'Energia crescente'
    },
    {
      name: 'Ovulação',
      days: '14-16',
      color: 'bg-green-100 text-green-700',
      description: 'Pico de fertilidade'
    },
    {
      name: 'Lútea',
      days: '17-28',
      color: 'bg-purple-100 text-purple-700',
      description: 'TPM possível'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Ciclo Menstrual 🌸
        </h1>
        <p className="text-gray-600">
          Acompanhe seu ciclo e entenda melhor seu corpo
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendário */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Calendário do Ciclo</CardTitle>
            <CardDescription>Visualize e registre seu ciclo menstrual</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Status Atual */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-600" />
                Status Atual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-600 mb-2">
                  Dia {currentCycle.day}
                </div>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                  {currentCycle.phase}
                </Badge>
              </div>
              
              <div className="pt-4 border-t border-pink-200">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Próxima menstruação</span>
                  <span className="font-semibold text-gray-900">
                    {currentCycle.nextPeriod} dias
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duração do ciclo</span>
                  <span className="font-semibold text-gray-900">
                    {currentCycle.cycleLength} dias
                  </span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                <Plus className="w-4 h-4 mr-2" />
                Registrar Período
              </Button>
            </CardContent>
          </Card>

          {/* Sintomas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Sintomas de Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {currentCycle.symptoms.map((symptom, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-gray-700">{symptom}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                Adicionar Sintoma
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fases do Ciclo */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Entenda as Fases do Seu Ciclo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {phases.map((phase, index) => (
              <div key={index} className="text-center p-4 rounded-lg border">
                <Badge className={`${phase.color} mb-3`}>
                  Dias {phase.days}
                </Badge>
                <h3 className="font-semibold text-gray-900 mb-2">{phase.name}</h3>
                <p className="text-sm text-gray-600">{phase.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dicas */}
      <Card className="mt-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <AlertCircle className="w-5 h-5" />
            Dica para Hoje
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Durante a fase folicular, seu corpo está com energia alta! É um ótimo momento para 
            treinos mais intensos e para iniciar novos projetos. Aproveite essa disposição natural.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
