import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { AuthError } from '@supabase/supabase-js';

interface SignUpCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const { setUser, setLoading, clearAuth, isAuthenticated, user, userId, email } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Check active session on mount
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error('Session initialization error:', error);
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);
        setUser(session?.user || null);

        if (event === 'SIGNED_OUT') {
          clearAuth();
          navigate('/signin');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setLoading, clearAuth, navigate]);

  const signUp = async ({ email, password, confirmPassword }: SignUpCredentials) => {
    if (password !== confirmPassword) {
      return { error: new Error('Passwords do not match') as AuthError };
    }

    if (password.length < 6) {
      return { error: new Error('Password must be at least 6 characters') as AuthError };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { error: new Error('Invalid email format') as AuthError };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) return { error };

      return { data, error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error };

      return { data, error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      clearAuth();
      navigate('/signin');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return {
    user,
    userId,
    email,
    isAuthenticated,
    signUp,
    signIn,
    signOut,
  };
};
