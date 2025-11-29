'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const configured = isSupabaseConfigured();

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }

    // Verificar se já está autenticado
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/dashboard');
      } else {
        setLoading(false);
      }
    }).catch(() => {
      setLoading(false);
    });

    // Listener para mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [router, configured]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ELA+</h1>
          <p className="text-gray-600">Seu app de saúde e bem-estar completo</p>
        </div>

        {/* Alerta se Supabase não estiver configurado */}
        {!configured && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertTitle className="text-orange-900">Configuração Necessária</AlertTitle>
            <AlertDescription className="text-orange-800">
              Para usar a autenticação, configure suas credenciais do Supabase em{' '}
              <strong>Configurações do Projeto → Integrações → Supabase</strong>.
            </AlertDescription>
          </Alert>
        )}

        {/* Auth Card */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Bem-vinda!</CardTitle>
            <CardDescription className="text-center">
              {configured ? 'Entre com sua conta para continuar' : 'Configure o Supabase para continuar'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {configured ? (
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#a855f7',
                        brandAccent: '#9333ea',
                      },
                    },
                  },
                }}
                localization={{
                  variables: {
                    sign_in: {
                      email_label: 'Email',
                      password_label: 'Senha',
                      email_input_placeholder: 'seu@email.com',
                      password_input_placeholder: 'Sua senha',
                      button_label: 'Entrar',
                      loading_button_label: 'Entrando...',
                      social_provider_text: 'Entrar com {{provider}}',
                      link_text: 'Já tem uma conta? Entre',
                    },
                    sign_up: {
                      email_label: 'Email',
                      password_label: 'Senha',
                      email_input_placeholder: 'seu@email.com',
                      password_input_placeholder: 'Crie uma senha',
                      button_label: 'Criar conta',
                      loading_button_label: 'Criando conta...',
                      social_provider_text: 'Criar conta com {{provider}}',
                      link_text: 'Não tem uma conta? Cadastre-se',
                    },
                    forgotten_password: {
                      email_label: 'Email',
                      password_label: 'Senha',
                      email_input_placeholder: 'seu@email.com',
                      button_label: 'Enviar instruções',
                      loading_button_label: 'Enviando...',
                      link_text: 'Esqueceu sua senha?',
                    },
                  },
                }}
                providers={[]}
              />
            ) : (
              <div className="text-center py-8 text-gray-600">
                <p className="mb-4">Aguardando configuração do Supabase...</p>
                <p className="text-sm">Após configurar, recarregue a página.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-8">
          Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
        </p>
      </div>
    </div>
  );
}
