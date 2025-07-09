import { supabase } from './supabase';

// Sign up with email + password
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { data, error };
};

// Sign in with email + password
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
};

// Resend verification email
export const resendVerificationEmail = async (email: string) => {
  const { data, error } = await supabase.auth.resend({
    type: 'signup',
    email,
  });
  return { data, error };
};

export const isProfileComplete = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('isProfileComplete')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error("Error checking profile completeness:", error);
    return false;
  }

  return data?.isProfileComplete ?? false;
}