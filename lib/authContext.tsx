'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  avatarUrl?: string;
  joinedDate?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  targetRole: 'customer' | 'admin';
  setTargetRole: (role: 'customer' | 'admin') => void;
  login: (email: string, pass: string, role?: 'customer' | 'admin') => Promise<boolean>;
  register: (name: string, email: string, pass: string, role?: 'customer' | 'admin') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [targetRole, setTargetRole] = useState<'customer' | 'admin'>('customer');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check local storage session
    try {
      const savedUser = localStorage.getItem('magik_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Default customer user for immediate preview
        setUser({
          id: 'usr_guest123',
          name: 'Alexander Wright',
          email: 'alex.wright@magikdesign.com',
          role: 'customer',
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
          const userRole = session.user.email?.includes('admin') ? 'admin' : 'customer';
          setUser({
            id: session.user.id,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Member',
            email: session.user.email || '',
            role: userRole,
            avatarUrl: session.user.user_metadata?.avatar_url,
          });
        }
      });
    }
  }, []);

  const login = async (
    email: string,
    pass: string,
    roleOverride?: 'customer' | 'admin'
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const roleToSet = roleOverride || targetRole || (email.toLowerCase().includes('admin') ? 'admin' : 'customer');

      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass || 'password123' });
        if (error) throw error;
        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            name: data.user.user_metadata?.full_name || email.split('@')[0],
            email: data.user.email || email,
            role: roleToSet,
          };
          setUser(profile);
          localStorage.setItem('magik_user', JSON.stringify(profile));
        }
      } else {
        // Fallback local login simulation
        const isDemoAdmin = email.toLowerCase().includes('admin') || roleToSet === 'admin';
        const profile: UserProfile = {
          id: isDemoAdmin ? 'admin_001' : 'usr_' + Date.now(),
          name: isDemoAdmin ? 'Chief Executive Admin' : email.split('@')[0].replace('.', ' ').toUpperCase(),
          email: email,
          role: isDemoAdmin ? 'admin' : 'customer',
          avatarUrl: isDemoAdmin
            ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
            : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
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

  const register = async (
    name: string,
    email: string,
    pass: string,
    roleOverride?: 'customer' | 'admin'
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const roleToSet = roleOverride || targetRole;
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: pass || 'password123',
          options: { data: { full_name: name, role: roleToSet } }
        });
        if (error) throw error;
        if (data.user) {
          const profile: UserProfile = { id: data.user.id, name, email, role: roleToSet };
          setUser(profile);
          localStorage.setItem('magik_user', JSON.stringify(profile));
        }
      } else {
        const profile: UserProfile = {
          id: 'usr_' + Date.now(),
          name,
          email,
          role: roleToSet,
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
        targetRole,
        setTargetRole,
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
