'use client'

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Verificar se as variáveis estão configuradas
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Se não estiver configurado, retornar um cliente mock seguro
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
    console.warn('⚠️ Variáveis do Supabase não configuradas.')
    
    // Cliente mock que não quebra a aplicação
    const mockClient = {
      auth: {
        signUp: async () => ({ 
          data: { user: null, session: null }, 
          error: { message: 'Configure as variáveis do Supabase primeiro. Clique no banner laranja acima para configurar.' } 
        }),
        signInWithPassword: async () => ({ 
          data: { user: null, session: null }, 
          error: { message: 'Configure as variáveis do Supabase primeiro. Clique no banner laranja acima para configurar.' } 
        }),
        signOut: async () => ({ error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: (callback: any) => {
          // Chama o callback imediatamente com estado vazio
          if (callback) {
            setTimeout(() => callback('SIGNED_OUT', null), 0)
          }
          return { 
            data: { 
              subscription: { 
                unsubscribe: () => {} 
              } 
            } 
          }
        },
      },
      from: (table: string) => ({
        select: async () => ({ data: [], error: null }),
        insert: async () => ({ data: null, error: { message: 'Configure o Supabase primeiro' } }),
        update: async () => ({ data: null, error: { message: 'Configure o Supabase primeiro' } }),
        delete: async () => ({ data: null, error: { message: 'Configure o Supabase primeiro' } }),
      }),
    }
    
    return mockClient as any
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
