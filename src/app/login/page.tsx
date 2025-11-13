'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, Mail, Lock } from 'lucide-react';
import { signIn } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn({
        email: formData.email,
        password: formData.password,
      });

      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError('Email ou senha incorretos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4">
      <div className="max-w-md w-full">
        {/* Logo e Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
            FemHealth
          </h1>
          <p className="text-gray-600">
            Sua saúde feminina em um só lugar
          </p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 h-12 border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Senha
                </Label>
                <Link
                  href="/auth/reset-password"
                  className="text-sm text-pink-600 hover:text-pink-700"
                >
                  Esqueceu?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 h-12 border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                  placeholder="Sua senha"
                />
              </div>
            </div>

            {/* Mensagem de Erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Botão de Login */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          {/* Divisor */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">ou</span>
            </div>
          </div>

          {/* Link para Cadastro */}
          <div className="text-center">
            <p className="text-gray-600">
              Não tem uma conta?{' '}
              <Link
                href="/cadastro"
                className="text-pink-600 hover:text-pink-700 font-medium"
              >
                Cadastre-se grátis
              </Link>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
            <div className="text-2xl mb-1">📅</div>
            <p className="text-sm font-medium text-gray-700">Ciclo Menstrual</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
            <div className="text-2xl mb-1">💪</div>
            <p className="text-sm font-medium text-gray-700">Treinos com IA</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
            <div className="text-2xl mb-1">🍽️</div>
            <p className="text-sm font-medium text-gray-700">Análise de Refeições</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
            <div className="text-2xl mb-1">💇‍♀️</div>
            <p className="text-sm font-medium text-gray-700">Cronograma Capilar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
