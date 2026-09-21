'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, User, Menu, X, Sparkles, Award, Shield, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { useCart } from '../lib/cartContext';
import { useAuth } from '../lib/authContext';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { totalItems, setIsCartOpen } = useCart();
  const { user, setIsAuthModalOpen, setAuthMode, setTargetRole, login } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const handleRoleToggle = async () => {
    if (user?.role === 'admin') {
      await login('alex.wright@magikdesign.com', 'password123', 'customer');
      router.push('/');
    } else {
      await login('admin@magikdesign.com', 'admin123', 'admin');
      router.push('/admin');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-md border-b border-cream-300 transition-all duration-200 shadow-2xs">
      {/* Top Banner with Authentic Contact & WhatsApp Link */}
      <div className="bg-forest-900 text-cream-100 text-xs py-2 px-4 flex items-center justify-between font-medium tracking-wide">
        <div className="hidden md:flex items-center gap-3 max-w-7xl mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-accent-gold animate-pulse" />
          <span>📍 Podikkalam Shopping Complex, Badiadka Road, Mulleria, Kasaragod</span>
          <span className="text-forest-600">|</span>
          <a href="https://wa.me/919074749147" target="_blank" rel="noreferrer" className="text-accent-gold hover:underline font-bold flex items-center gap-1">
            <MessageSquare className="w-3 h-3 text-accent-gold" /> WhatsApp: +91 90747 49147
          </a>
        </div>

        {/* 1-Click Quick Role Switcher Pill */}
        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-2">
          <span className="text-[11px] text-cream-300/80 hidden lg:inline">Mode:</span>
          <button
            onClick={handleRoleToggle}
            className="inline-flex items-center gap-1.5 bg-forest-800 hover:bg-forest-700 text-accent-gold border border-forest-600 px-3 py-1 rounded-full text-[11px] font-bold transition-all shadow-2xs group"
          >
            {user?.role === 'admin' ? (
              <>
                <Shield className="w-3.5 h-3.5 text-accent-gold" />
                <span>Admin Active ➔ Switch to Customer Shop</span>
              </>
            ) : (
              <>
                <Award className="w-3.5 h-3.5 text-accent-gold" />
                <span>Customer Active ➔ Switch to Admin Portal</span>
              </>
            )}
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-charcoal-900 hover:text-forest-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-forest-900 flex items-center justify-center text-accent-gold shadow-md group-hover:scale-105 transition-transform duration-200 border border-forest-700">
              <Award className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-charcoal-900 group-hover:text-forest-900 transition-colors">
                Magik<span className="text-forest-700">Dezign</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-forest-800/80 -mt-1">
                Mulleria Kasaragod
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            <Link
              href="/"
              className="text-sm font-semibold text-charcoal-900 hover:text-forest-900 transition-colors py-1"
            >
              Home
            </Link>
            <Link
              href="/catalog"
              className="text-sm font-semibold text-charcoal-900 hover:text-forest-900 transition-colors py-1"
            >
              All Services
            </Link>
            <Link
              href="/catalog?category=Custom+Sports+Jerseys"
              className="text-sm font-semibold text-charcoal-900 hover:text-forest-900 transition-colors py-1"
            >
              Sports Jerseys
            </Link>
            <Link
              href="/catalog?category=Flex+%26+Vinyl+Signage"
              className="text-sm font-semibold text-charcoal-900 hover:text-forest-900 transition-colors py-1"
            >
              Flex Banners
            </Link>
            <Link
              href="/catalog?category=Corporate+ID+Cards+%26+Printing"
              className="text-sm font-semibold text-charcoal-900 hover:text-forest-900 transition-colors py-1"
            >
              ID Cards
            </Link>

            {/* Admin Portal Link */}
            <Link
              href="/admin"
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                user?.role === 'admin'
                  ? 'bg-forest-900 text-accent-gold border-forest-700 shadow-sm'
                  : 'bg-cream-200 text-charcoal-900 border-cream-300 hover:bg-forest-900 hover:text-cream-100'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </nav>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-4">
            
            {/* Search Input Bar with Clear Button */}
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search jerseys, banners, ID cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 md:w-56 pl-9 pr-8 py-2 text-xs rounded-full bg-cream-200/80 border border-cream-300 text-charcoal-900 placeholder-charcoal-900/50 focus:outline-none focus:ring-2 focus:ring-forest-900 focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-charcoal-900/60 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-charcoal-800/50 hover:text-charcoal-900"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* User Account / Auth Trigger */}
            {user ? (
              <Link
                href={user.role === 'admin' ? '/admin' : '/account'}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-cream-200/70 transition-colors text-charcoal-900"
                title={user.role === 'admin' ? 'Admin Dashboard' : 'Account Dashboard'}
              >
                {user.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border border-forest-900/20 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-forest-900 text-cream-100 flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-bold max-w-[100px] truncate leading-tight">
                    {user.name}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-forest-800">
                    {user.role === 'admin' ? '⚙️ Store Admin' : 'Member'}
                  </span>
                </div>
              </Link>
            ) : (
              <button
                onClick={() => {
                  setTargetRole('customer');
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="p-2 text-charcoal-900 hover:text-forest-900 hover:bg-cream-200/70 rounded-full transition-colors flex items-center gap-1.5"
                aria-label="Sign in"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline text-xs font-semibold">Sign In</span>
              </button>
            )}

            {/* Cart Slide-Over Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-forest-900 text-cream-100 hover:bg-forest-800 rounded-full transition-all shadow-sm hover:shadow-md flex items-center justify-center"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-cream-100" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-gold text-forest-950 text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-cream-50 shadow-sm animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-cream-300 space-y-3 bg-cream-50 px-2 animate-fadeIn">
            <form onSubmit={handleSearchSubmit} className="relative mb-3">
              <input
                type="text"
                placeholder="Search jerseys, banners, ID cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-lg bg-cream-200 border border-cream-300 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900"
              />
              <Search className="w-4 h-4 text-charcoal-900/60 absolute left-3 top-3" />
            </form>

            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-semibold text-charcoal-900 hover:bg-cream-200"
            >
              Home
            </Link>
            <Link
              href="/catalog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-semibold text-charcoal-900 hover:bg-cream-200"
            >
              All Services
            </Link>
            <a
              href="https://wa.me/919074749147"
              target="_blank"
              rel="noreferrer"
              className="block px-3 py-2 rounded-md text-base font-bold text-emerald-800 bg-emerald-50"
            >
              💬 WhatsApp Us: +91 90747 49147
            </a>
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-bold text-accent-gold bg-forest-900"
            >
              ⚙️ Executive Admin Portal
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
