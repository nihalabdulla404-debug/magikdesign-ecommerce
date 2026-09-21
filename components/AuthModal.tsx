'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Lock, Mail, User as UserIcon, Shield, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { useAuth } from '../lib/authContext';

export const AuthModal: React.FC = () => {
  const router = useRouter();
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    targetRole,
    setTargetRole,
    login,
    register,
    isLoading
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (authMode === 'login') {
      const success = await login(email, password, targetRole);
      if (!success) {
        setErrorMsg('Failed to sign in. Please verify your credentials.');
      } else if (targetRole === 'admin') {
        router.push('/admin');
      }
    } else {
      const success = await register(name, email, password, targetRole);
      if (!success) {
        setErrorMsg('Failed to create account. Try another email address.');
      } else if (targetRole === 'admin') {
        router.push('/admin');
      }
    }
  };

  const handleAdminQuickAccess = async () => {
    await login('admin@magikdesign.com', 'admin123', 'admin');
    router.push('/admin');
  };

  const handleCustomerQuickAccess = async () => {
    await login('alex.wright@magikdesign.com', 'password123', 'customer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={() => setIsAuthModalOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative bg-cream-50 rounded-3xl max-w-md w-full p-8 shadow-2xl border border-cream-300 z-10 animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-charcoal-900/60 hover:text-charcoal-900 hover:bg-cream-200 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-forest-900 text-accent-gold mx-auto flex items-center justify-center mb-3 shadow-md border border-forest-700">
            {targetRole === 'admin' ? <Shield className="w-6 h-6" /> : <Award className="w-6 h-6" />}
          </div>
          <h3 className="font-serif text-2xl font-bold text-charcoal-900">
            {targetRole === 'admin' ? 'MagikDesign Admin Gate' : 'MagikDesign Client Access'}
          </h3>
          <p className="text-xs text-charcoal-800/70 mt-1">
            {targetRole === 'admin'
              ? 'Access product management, inventory controls, sales & purchase orders.'
              : 'Sign in to track orders, save engravings, and manage your cart.'}
          </p>
        </div>

        {/* ROLE SELECTOR TABS */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-cream-200 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => {
              setTargetRole('customer');
              setEmail('');
              setErrorMsg(null);
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              targetRole === 'customer'
                ? 'bg-white text-forest-900 shadow-sm'
                : 'text-charcoal-800/60 hover:text-charcoal-900'
            }`}
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>Customer Portal</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTargetRole('admin');
              setEmail('admin@magikdesign.com');
              setErrorMsg(null);
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              targetRole === 'admin'
                ? 'bg-forest-900 text-accent-gold shadow-sm'
                : 'text-charcoal-800/60 hover:text-charcoal-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Management</span>
          </button>
        </div>

        {/* Sign In vs Register Switch */}
        <div className="flex bg-cream-100 p-1 rounded-xl mb-5 border border-cream-200">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setErrorMsg(null);
            }}
            className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
              authMode === 'login'
                ? 'bg-white text-charcoal-900 shadow-2xs font-bold'
                : 'text-charcoal-800/60 hover:text-charcoal-900'
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
            className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
              authMode === 'register'
                ? 'bg-white text-charcoal-900 shadow-2xs font-bold'
                : 'text-charcoal-800/60 hover:text-charcoal-900'
            }`}
          >
            Create New Account
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium text-center">
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
                  placeholder={targetRole === 'admin' ? 'Store Manager' : 'Alexander Wright'}
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
                placeholder={targetRole === 'admin' ? 'admin@magikdesign.com' : 'alex.wright@magikdesign.com'}
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
            className={`w-full font-bold py-3 rounded-xl transition-all shadow-md text-xs mt-2 disabled:opacity-50 ${
              targetRole === 'admin'
                ? 'bg-forest-900 hover:bg-forest-800 text-accent-gold'
                : 'bg-forest-900 hover:bg-forest-800 text-cream-100'
            }`}
          >
            {isLoading
              ? 'Authenticating...'
              : authMode === 'login'
              ? `Sign In as ${targetRole === 'admin' ? 'Store Administrator' : 'Customer'}`
              : `Register as ${targetRole === 'admin' ? 'Admin' : 'Customer'}`}
          </button>
        </form>

        {/* Demo Fast Logins */}
        <div className="mt-6 pt-5 border-t border-cream-200 text-center space-y-2">
          <p className="text-[11px] text-charcoal-800/70 font-semibold">Testing Shortcuts:</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={handleAdminQuickAccess}
              className="flex-1 inline-flex items-center justify-center gap-1 text-[11px] font-bold text-accent-gold bg-forest-900 hover:bg-forest-950 px-3 py-2 rounded-xl transition-colors shadow-2xs"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Demo Admin Access</span>
            </button>
            <button
              type="button"
              onClick={handleCustomerQuickAccess}
              className="flex-1 inline-flex items-center justify-center gap-1 text-[11px] font-bold text-forest-900 bg-cream-200 hover:bg-cream-300 px-3 py-2 rounded-xl transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-forest-900" />
              <span>Demo Customer Access</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
