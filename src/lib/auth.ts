'use client';

import { createClient } from '@/lib/supabase/client';

export interface SignUpData {
  email: string;
  password: string;
  fullName?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Cadastro de novo usuário
export async function signUp({ email, password, fullName }: SignUpData) {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw error;
  return data;
}

// Login
export async function signIn({ email, password }: SignInData) {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// Logout
export async function signOut() {
  const supabase = createClient();
  
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Recuperar senha
export async function resetPassword(email: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  if (error) throw error;
  return data;
}

// Atualizar senha
export async function updatePassword(newPassword: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
  return data;
}

// Obter sessão atual
export async function getSession() {
  const supabase = createClient();
  
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}

// Obter usuário atual
export async function getUser() {
  const supabase = createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}
