// src/lib/supabase/server.ts
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function createServer() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.SUPABASE_URL!
  const supabaseAnonKey = process.process.env.SUPABASE_ANON_KEY!

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignorar no ambiente server actions
          }
        },
      },
    }
  )
}
