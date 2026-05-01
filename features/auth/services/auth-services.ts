import { supabaseClient } from '@/core/config/supabase';
import type { UserAuthCredentials } from '../types';

export async function signUpService(userData: UserAuthCredentials) {
  const { data, error } = await supabaseClient.auth.signUp({
    email: userData.email,
    password: userData.password!,
    options: {
      data: {
        display_name: userData.displayName,
      }
    }
  });

  if (error) {
    console.error('Error registering user:', error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function logInService(userData: UserAuthCredentials) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: userData.email,
    password: userData.password!,
  });

  if (error) {
    console.error('Error logging in:', error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function oAuthGitHubService() {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: window.location.origin + '/auth/callback'
    }
  });

  if (error) {
    console.error('Error in oauth with github:', error.message);
    throw new Error(error.message);
  }
}

export async function forgetPasswordService(userData: UserAuthCredentials) {
  const { error } = await supabaseClient.auth.resetPasswordForEmail(userData.email, {
    redirectTo: window.location.origin + '/auth/reset-password',
  });

  if (error) {
    console.error('Error resetting password:', error.message);
    throw new Error(error.message);
  }
}

export async function updatePasswordService(newPassword: string) {
  const { error } = await supabaseClient.auth.updateUser({ password: newPassword });

  if (error) {
    console.error('Error updating password:', error.message);
    throw new Error(error.message);
  }
}
