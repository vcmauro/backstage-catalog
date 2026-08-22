import { supabase } from '../../../core/network/supabaseClient';
 
export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    // TEMPORAL: mostramos el mensaje real de Supabase para diagnosticar.
    // Cuando confirmemos que el login funciona, lo volvemos a un mensaje genérico.
    console.error('Supabase auth error:', error);
    throw new Error(error.message);
  }
  return data;
}
 
export async function logout() {
  await supabase.auth.signOut();
}
 
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}