'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  joinedDate?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check local storage session
    try {
      const savedUser = localStorage.getItem('magik_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Default guest user for quick demonstration experience
        setUser({
          id: 'usr_guest123',
          name: 'Alexander Wright',
          email: 'alex.wright@magikdesign.com',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          joinedDate: 'September 2026'
        });
      }
    } catch (e) {
      console.error('Auth restore error', e);
    }

    // Supabase auth listener if configured
    if (isSupabaseConfigured() && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Member',
            email: session.user.email || '',
            avatarUrl: session.user.user_metadata?.avatar_url,
          });
        }
      });
    }
  }, []);

  const login = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: 'password123' });
        if (error) throw error;
        if (data.user) {
          const profile = {
            id: data.user.id,
            name: data.user.user_metadata?.full_name || email.split('@')[0],
            email: data.user.email || email,
          };
          setUser(profile);
          localStorage.setItem('magik_user', JSON.stringify(profile));
        }
      } else {
        // Fallback local login simulation
        const profile: UserProfile = {
          id: 'usr_' + Date.now(),
          name: email.split('@')[0].replace('.', ' ').toUpperCase(),
          email: email,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          joinedDate: 'September 2026'
        };
        setUser(profile);
        localStorage.setItem('magik_user', JSON.stringify(profile));
      }
      setIsAuthModalOpen(false);
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (name: string, email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: 'password123',
          options: { data: { full_name: name } }
        });
        if (error) throw error;
        if (data.user) {
          const profile = { id: data.user.id, name, email };
          setUser(profile);
          localStorage.setItem('magik_user', JSON.stringify(profile));
        }
      } else {
        const profile: UserProfile = {
          id: 'usr_' + Date.now(),
          name,
          email,
          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
          joinedDate: 'September 2026'
        };
        setUser(profile);
        localStorage.setItem('magik_user', JSON.stringify(profile));
      }
      setIsAuthModalOpen(false);
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    if (isSupabaseConfigured() && supabase) {
      supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('magik_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        login,
        register,
        logout,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
