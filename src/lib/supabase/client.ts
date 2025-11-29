// src/lib/supabase/client.ts
'use client'

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Variáveis do Supabase não configuradas.')
    // retorno mock para evitar crashes em dev
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({ data: null, error: { message: 'Supabase não configurado' } }),
        signUp: async () => ({ data: null, error: { message: 'Supabase não configurado' } }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      }
    } as any
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

export { createClient as createBrowserClient }
