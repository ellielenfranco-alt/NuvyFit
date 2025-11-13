'use client';

import { useState } from 'react';
import { Scissors, Droplets, Sparkles, Plus, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function HairPage() {
  const [hairProfile] = useState({
    type: '3B - Cachos definidos',
    porosity: 'Média',
    condition: 'Saudável com ressecamento leve'
  });

  const schedule = [
    {
      day: 'Segunda',
      treatment: 'Hidratação',
      icon: Droplets,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      products: ['Máscara hidratante', 'Leave-in']
    },
    {
      day: 'Quarta',
      treatment: 'Nutrição',
      icon: Sparkles,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      products: ['Óleo de coco', 'Manteiga de karité']
    },
    {
      day: 'Sexta',
      treatment: 'Reconstrução',
      icon: Scissors,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      products: ['Queratina líquida', 'Ampola de reconstrução']
    }
  ];

  const history = [
    {
      date: '15/01/2024',
      treatment: 'Hidratação Profunda',
      products: ['Máscara de abacate', 'Óleo de argan'],
      result: 'Excelente - Cabelo macio e brilhoso'
    },
    {
      date: '12/01/2024',
      treatment: 'Nutrição',
      products: ['Óleo de coco', 'Manteiga de karité'],
      result: 'Bom - Reduziu o frizz'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Cronograma Capilar 💇‍♀️
        </h1>
        <p className="text-gray-600">
          Cuide do seu cabelo com tratamentos personalizados
        </p>
      </div>

      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="schedule">Cronograma</TabsTrigger>
          <TabsTrigger value="profile">Meu Cabelo</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        {/* Aba Cronograma */}
        <TabsContent value="schedule" className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Seu Cronograma Semanal
              </CardTitle>
              <CardDescription>
                Tratamentos personalizados baseados no seu tipo de cabelo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {schedule.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card key={index} className={`${item.bgColor} border-none`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{item.day}</Badge>
                          <Icon className={`w-6 h-6 ${item.color}`} />
                        </div>
                        <CardTitle className="text-lg">{item.treatment}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">Produtos:</p>
                          {item.products.map((product, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                              {product}
                            </div>
                          ))}
                        </div>
                        <Button size="sm" className="w-full mt-4" variant="outline">
                          Marcar como Feito
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Próximo Tratamento */}
          <Card>
            <CardHeader>
              <CardTitle>Próximo Tratamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-lg bg-blue-50">
                  <Droplets className="w-8 h-8 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Hidratação Profunda</h3>
                  <p className="text-sm text-gray-600">Amanhã, Segunda-feira</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Perfil do Cabelo */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Perfil do Seu Cabelo</CardTitle>
              <CardDescription>
                Informações sobre seu tipo e condição capilar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border bg-gradient-to-br from-purple-50 to-pink-50">
                  <p className="text-sm text-gray-600 mb-1">Tipo de Cabelo</p>
                  <p className="text-lg font-semibold text-gray-900">{hairProfile.type}</p>
                </div>
                <div className="p-4 rounded-lg border bg-gradient-to-br from-blue-50 to-cyan-50">
                  <p className="text-sm text-gray-600 mb-1">Porosidade</p>
                  <p className="text-lg font-semibold text-gray-900">{hairProfile.porosity}</p>
                </div>
                <div className="p-4 rounded-lg border bg-gradient-to-br from-green-50 to-emerald-50">
                  <p className="text-sm text-gray-600 mb-1">Condição Atual</p>
                  <p className="text-lg font-semibold text-gray-900">{hairProfile.condition}</p>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-600" />
                  Recomendação da IA
                </h3>
                <p className="text-gray-700 mb-4">
                  Baseado no seu tipo de cabelo 3B com porosidade média, recomendamos:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Hidratação 2x por semana para manter a umidade</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Nutrição 1x por semana com óleos vegetais</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Reconstrução quinzenal para fortalecer os fios</span>
                  </li>
                </ul>
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Plus className="w-4 h-4 mr-2" />
                Atualizar Perfil
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Histórico */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Tratamentos</CardTitle>
              <CardDescription>
                Acompanhe os resultados dos seus tratamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {history.map((item, index) => (
                  <div key={index} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.treatment}</h3>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                        Concluído
                      </Badge>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Produtos usados:</p>
                      <div className="flex flex-wrap gap-2">
                        {item.products.map((product, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Resultado:</span> {item.result}
                      </p>
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
