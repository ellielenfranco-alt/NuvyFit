'use client';

import { Heart, Activity, Calendar, User } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ELA+
              </h1>
            </div>
            <Link 
              href="/login"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Entrar
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Seu app de saúde e bem-estar completo
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gerencie sua saúde de forma simples e eficiente. Acompanhe consultas, registros médicos e muito mais.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Registros de Saúde
            </h3>
            <p className="text-gray-600">
              Mantenha todos os seus registros médicos organizados e acessíveis em um só lugar.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Agendamento de Consultas
            </h3>
            <p className="text-gray-600">
              Agende e gerencie suas consultas médicas de forma prática e eficiente.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Perfil Personalizado
            </h3>
            <p className="text-gray-600">
              Crie seu perfil e tenha acesso a recursos personalizados para suas necessidades.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Pronto para começar?
          </h3>
          <p className="text-lg mb-8 opacity-90">
            Crie sua conta gratuitamente e comece a cuidar melhor da sua saúde hoje mesmo.
          </p>
          <Link 
            href="/login"
            className="inline-block px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Criar Conta Grátis
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; 2024 ELA+. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
