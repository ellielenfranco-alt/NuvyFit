import { createClient } from '@supabase/supabase-js'

export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Variáveis de ambiente do Supabase não configuradas')
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({
          data: null,
          error: {
            message: 'Supabase não configurado. Configure nas integrações do projeto.'
          }
        }),
        signUp: async () => ({
          data: null,
          error: {
            message: 'Supabase não configurado. Configure nas integrações do projeto.'
          }
        }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: () => ({
          data: { subscription: { unsubscribe: () => {} } }
        })
      }
    } as any
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}
