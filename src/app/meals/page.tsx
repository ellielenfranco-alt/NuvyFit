'use client';

import { useState, useRef } from 'react';
import { Camera, Upload, Loader2, Plus, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { analyzeMealAction } from './actions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Food {
  name: string;
  quantity: string;
  weight_grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

interface MealAnalysis {
  foods: Food[];
  total: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
  };
  meal_type: string;
  quality_score: number;
  analysis: string;
  suggestions: string[];
  warnings: string[];
}

export default function MealsPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<MealAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Converter para base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setSelectedImage(base64);
      
      // Analisar com IA OpenAI
      setAnalyzing(true);
      try {
        const result = await analyzeMealAction(base64);
        setAnalysis(result);
      } catch (error) {
        console.error('Erro ao analisar:', error);
        setError('Erro ao analisar a imagem. Verifique se a API da OpenAI está configurada corretamente.');
      } finally {
        setAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveMeal = async () => {
    if (!analysis) return;
    
    // TODO: Salvar no Supabase
    alert('Refeição salva com sucesso!');
    setSelectedImage(null);
    setAnalysis(null);
  };

  // Mock data para histórico
  const todayMeals = [
    {
      id: 1,
      type: 'Café da Manhã',
      time: '08:30',
      calories: 450,
      protein: 25,
      carbs: 55,
      fats: 12,
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      type: 'Almoço',
      time: '12:45',
      calories: 680,
      protein: 45,
      carbs: 75,
      fats: 22,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
    },
  ];

  const todayTotals = {
    calories: 1130,
    protein: 70,
    carbs: 130,
    fats: 34,
    goal: 2000
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Alimentação 🍽️
        </h1>
        <p className="text-gray-600">
          Registre suas refeições e acompanhe sua nutrição com análise IA
        </p>
      </div>

      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="today">Hoje</TabsTrigger>
          <TabsTrigger value="add">Adicionar</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        {/* Aba Hoje */}
        <TabsContent value="today" className="space-y-6">
          {/* Resumo do Dia */}
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                Resumo de Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{todayTotals.calories}</div>
                  <div className="text-sm text-gray-600">Calorias</div>
                  <div className="text-xs text-gray-500">Meta: {todayTotals.goal}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{todayTotals.protein}g</div>
                  <div className="text-sm text-gray-600">Proteína</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{todayTotals.carbs}g</div>
                  <div className="text-sm text-gray-600">Carboidratos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">{todayTotals.fats}g</div>
                  <div className="text-sm text-gray-600">Gorduras</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refeições de Hoje */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Refeições Registradas</h2>
            {todayMeals.map((meal) => (
              <Card key={meal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <img 
                    src={meal.image} 
                    alt={meal.type}
                    className="w-full md:w-48 h-48 object-cover"
                  />
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{meal.type}</h3>
                        <p className="text-sm text-gray-500">{meal.time}</p>
                      </div>
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                        {meal.calories} kcal
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Proteína</div>
                        <div className="text-lg font-semibold text-blue-600">{meal.protein}g</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Carboidratos</div>
                        <div className="text-lg font-semibold text-green-600">{meal.carbs}g</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Gorduras</div>
                        <div className="text-lg font-semibold text-yellow-600">{meal.fats}g</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Aba Adicionar */}
        <TabsContent value="add" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Registrar Nova Refeição</CardTitle>
              <CardDescription>
                Tire uma foto da sua refeição e nossa IA analisará automaticamente com GPT-4o
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Area */}
              {!selectedImage ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-orange-500 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Adicione uma foto da sua refeição
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Nossa IA identificará TODOS os alimentos e calculará calorias e macronutrientes
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Escolher Foto
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Preview da Imagem */}
                  <div className="relative rounded-lg overflow-hidden">
                    <img 
                      src={selectedImage} 
                      alt="Refeição"
                      className="w-full h-96 object-cover"
                    />
                    {analyzing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
                          <p className="text-lg font-semibold">Analisando sua refeição com GPT-4o...</p>
                          <p className="text-sm">Identificando alimentos, estimando peso e calculando nutrientes</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Erro */}
                  {error && (
                    <Card className="bg-red-50 border-red-200">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-red-900">Erro na Análise</p>
                            <p className="text-sm text-red-700">{error}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Resultado da Análise DETALHADA */}
                  {analysis && (
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-green-800">Análise Completa ✓</CardTitle>
                          <Badge className="bg-green-600 text-white">
                            Qualidade: {analysis.quality_score}/10
                          </Badge>
                        </div>
                        <CardDescription className="text-green-700">
                          {analysis.meal_type}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Alimentos Identificados DETALHADOS */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Alimentos Identificados:</h4>
                          <div className="space-y-3">
                            {analysis.foods.map((food, index) => (
                              <div key={index} className="bg-white rounded-lg p-4 border">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <p className="font-semibold text-gray-900">{food.name}</p>
                                    <p className="text-sm text-gray-600">{food.quantity} ({food.weight_grams}g)</p>
                                  </div>
                                  <Badge variant="secondary">{food.calories} kcal</Badge>
                                </div>
                                <div className="grid grid-cols-4 gap-2 text-xs">
                                  <div>
                                    <span className="text-gray-500">Proteína:</span>
                                    <span className="font-semibold text-blue-600 ml-1">{food.protein}g</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Carbs:</span>
                                    <span className="font-semibold text-green-600 ml-1">{food.carbs}g</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Gordura:</span>
                                    <span className="font-semibold text-yellow-600 ml-1">{food.fats}g</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Fibra:</span>
                                    <span className="font-semibold text-purple-600 ml-1">{food.fiber}g</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Totais Nutricionais */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Totais da Refeição:</h4>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            <div className="bg-white rounded-lg p-4 text-center">
                              <div className="text-2xl font-bold text-orange-600">{analysis.total.calories}</div>
                              <div className="text-xs text-gray-600">Calorias</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center">
                              <div className="text-2xl font-bold text-blue-600">{analysis.total.protein}g</div>
                              <div className="text-xs text-gray-600">Proteína</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center">
                              <div className="text-2xl font-bold text-green-600">{analysis.total.carbs}g</div>
                              <div className="text-xs text-gray-600">Carboidratos</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center">
                              <div className="text-2xl font-bold text-yellow-600">{analysis.total.fats}g</div>
                              <div className="text-xs text-gray-600">Gorduras</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center">
                              <div className="text-2xl font-bold text-purple-600">{analysis.total.fiber}g</div>
                              <div className="text-xs text-gray-600">Fibras</div>
                            </div>
                          </div>
                        </div>

                        {/* Análise Detalhada */}
                        <div className="bg-white rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Análise Nutricional:</h4>
                          <p className="text-sm text-gray-700">{analysis.analysis}</p>
                        </div>

                        {/* Avisos */}
                        {analysis.warnings.length > 0 && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              Avisos Importantes:
                            </h4>
                            <ul className="space-y-1">
                              {analysis.warnings.map((warning, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-yellow-800">
                                  <span className="mt-1">⚠️</span>
                                  <span>{warning}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Sugestões */}
                        {analysis.suggestions.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Sugestões para Melhorar:</h4>
                            <ul className="space-y-2">
                              {analysis.suggestions.map((suggestion, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                  <span className="text-green-600 mt-1">💡</span>
                                  <span>{suggestion}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Ações */}
                        <div className="flex gap-3">
                          <Button
                            onClick={handleSaveMeal}
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Salvar Refeição
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedImage(null);
                              setAnalysis(null);
                              setError(null);
                            }}
                          >
                            Nova Foto
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Histórico */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Histórico de Refeições
              </CardTitle>
              <CardDescription>
                Visualize suas refeições dos últimos dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Histórico em desenvolvimento</p>
                <p className="text-sm">Em breve você poderá ver todas as suas refeições</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
