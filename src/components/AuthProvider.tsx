// src/components/AuthProvider.tsx
'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const supabase = createClient()

type AuthContextType = {
  user: any | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let mounted = true

    const init = async () => {
      const { data } = await supabase.auth.getUser()
      if (!mounted) return
      setUser(data.user ?? null)
      setLoading(false)
    }
    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!session?.user) {
        router.push('/login')
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [router])

  const signIn = async (email: string, password: string) => {
    const res = await supabase.auth.signInWithPassword({ email, password })
    return res
  }

  const signUp = async (email: string, password: string) => {
    const res = await supabase.auth.signUp({ email, password })
    return res
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
