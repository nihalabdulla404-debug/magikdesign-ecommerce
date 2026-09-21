'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../lib/authContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, login, register, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (authMode === 'login') {
      const success = await login(email, password);
      if (!success) setErrorMsg('Failed to sign in. Please verify your credentials.');
    } else {
      const success = await register(name, email, password);
      if (!success) setErrorMsg('Failed to create account. Try another email address.');
    }
  };

  const handleGuestQuickAccess = async () => {
    await login('collector.guest@magikdesign.com', 'password123');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={() => setIsAuthModalOpen(false)}
      />

      {/* Modal Box */}
      <div className="relative bg-cream-50 rounded-2xl max-w-md w-full p-8 shadow-2xl border border-cream-300 z-10 animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-charcoal-900/60 hover:text-charcoal-900 hover:bg-cream-200 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-forest-900 text-accent-gold mx-auto flex items-center justify-center mb-3 shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-charcoal-900">
            {authMode === 'login' ? 'Welcome Back to MagikDesign' : 'Join the Collector Circle'}
          </h3>
          <p className="text-xs text-charcoal-800/70 mt-1">
            {authMode === 'login'
              ? 'Access your bespoke order history and saved custom engravings.'
              : 'Unlock exclusive member pricing and custom award preview tools.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-cream-200 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              authMode === 'login'
                ? 'bg-white text-forest-900 shadow-sm'
                : 'text-charcoal-800/70 hover:text-charcoal-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('register');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              authMode === 'register'
                ? 'bg-white text-forest-900 shadow-sm'
                : 'text-charcoal-800/70 hover:text-charcoal-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium text-center">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-charcoal-900 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-charcoal-900/40 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Alexander Wright"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-charcoal-900 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-charcoal-900/40 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="alex.wright@magikdesign.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-900 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-charcoal-900/40 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-forest-900 hover:bg-forest-800 text-cream-100 font-semibold py-3 rounded-xl transition-all shadow-md text-xs mt-2 disabled:opacity-50"
          >
            {isLoading
              ? 'Processing...'
              : authMode === 'login'
              ? 'Sign In to Account'
              : 'Create My Account'}
          </button>
        </form>

        {/* Quick Demo Access Shortcut */}
        <div className="mt-6 pt-6 border-t border-cream-200 text-center">
          <p className="text-[11px] text-charcoal-800/70 mb-2">Testing the platform?</p>
          <button
            type="button"
            onClick={handleGuestQuickAccess}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-900 hover:text-forest-700 bg-cream-200/80 px-4 py-2 rounded-lg transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-forest-900" />
            Quick Access as Demo Member
          </button>
        </div>
      </div>
    </div>
  );
};
