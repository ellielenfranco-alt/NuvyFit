'use client'
import React, { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({ 
        email, 
        password 
      })

      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Conta criada com sucesso! Verifique seu e-mail para confirmar.')
        setTimeout(() => router.push('/login'), 2000)
      }
    } catch (err) {
      setMessage('Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Criar Conta — ELA+
        </h1>

        {message && (
          <div className={`mb-4 p-3 rounded-lg ${message.includes('sucesso') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
            {message}
          </div>
        )}

        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Email</span>
          <input 
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            required
            disabled={loading}
          />
        </label>

        <label className="block mb-6">
          <span className="text-sm font-medium text-gray-700">Senha</span>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            required
            disabled={loading}
            minLength={6}
          />
        </label>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Criando conta...' : 'Criar conta'}
        </button>

        <p className="mt-6 text-sm text-center text-gray-600">
          Já tem conta? <a href="/login" className="text-pink-600 font-semibold hover:text-pink-700">Entrar</a>
        </p>
      </form>
    </div>
  )
}
