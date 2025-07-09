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
    .from('users')
    .select('is_profile_complete')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error("Error checking profile completeness:", error);
    return false;
  }

  return data?.is_profile_complete ?? false;
}

// Create a user profile in the database
export const createUserProfile = async (userId: string, userData: any) => {
  const { data, error } = await supabase
    .from('users')
    .insert([{
      id: userId,
      ...userData,
      is_profile_complete: true,
      created_at: new Date().toISOString()
    }])
    .select();
  
  return { data, error };
};

// Check if user exists in the database
export const checkUserExists = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('id', userId)
    .maybeSingle();
  
  if (error) {
    console.error("Error checking if user exists:", error);
    return false;
  }
  
  return data !== null;
};