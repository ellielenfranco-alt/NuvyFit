'use client'
import React from 'react'
import { useAuth } from './AuthProvider'

export default function LogoutButton() {
  const { signOut } = useAuth()
  
  return (
    <button 
      onClick={() => signOut()} 
      className="px-6 py-2 bg-white border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-md hover:shadow-lg"
    >
      Sair
    </button>
  )
}
