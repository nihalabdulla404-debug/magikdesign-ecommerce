'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, User, Menu, X, Sparkles, Award, Shield } from 'lucide-react';
import { useCart } from '../lib/cartContext';
import { useAuth } from '../lib/authContext';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { totalItems, setIsCartOpen } = useCart();
  const { user, setIsAuthModalOpen, setAuthMode, setTargetRole } = useAuth();
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

  return (
    <header className="sticky top-0 z-40 bg-cream-50/90 backdrop-blur-md border-b border-cream-300 transition-all duration-200">
      {/* Top Banner */}
      <div className="bg-forest-900 text-cream-100 text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-accent-gold animate-pulse" />
        <span>Complimentary Laser Engraving & Free Express Shipping on Orders Over $150</span>
        <Sparkles className="w-3.5 h-3.5 text-accent-gold animate-pulse" />
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
            <div className="w-10 h-10 rounded-lg bg-forest-900 flex items-center justify-center text-accent-gold shadow-md group-hover:scale-105 transition-transform duration-200">
              <Award className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-charcoal-900 group-hover:text-forest-900 transition-colors">
                Magik<span className="text-forest-700">Design</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-forest-800/80 -mt-1">
                Artisan Keepsakes
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-charcoal-900 hover:text-forest-900 transition-colors py-1"
            >
              Home
            </Link>
            <Link
              href="/catalog"
              className="text-sm font-medium text-charcoal-900 hover:text-forest-900 transition-colors py-1"
            >
              All Catalog
            </Link>
            <Link
              href="/catalog?category=Sports+Keepsakes"
              className="text-sm font-medium text-charcoal-900 hover:text-forest-900 transition-colors py-1"
            >
              Sports Mementos
            </Link>
            <Link
              href="/catalog?category=Artisan+Awards"
              className="text-sm font-medium text-charcoal-900 hover:text-forest-900 transition-colors py-1"
            >
              Artisan Awards
            </Link>

            {/* Admin Portal Nav Item for Admins */}
            {user?.role === 'admin' && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1 text-xs font-bold bg-forest-900 text-accent-gold px-3 py-1.5 rounded-full border border-forest-700 shadow-2xs hover:bg-forest-950 transition-all"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </Link>
            )}
          </nav>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-4">
            
            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search mementos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 md:w-56 pl-9 pr-4 py-2 text-xs rounded-full bg-cream-200/80 border border-cream-300 text-charcoal-900 placeholder-charcoal-900/50 focus:outline-none focus:ring-2 focus:ring-forest-900 focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-charcoal-900/60 absolute left-3 top-2.5" />
            </form>

            {/* User Account / Auth Trigger */}
            {user ? (
              <div className="flex items-center gap-2">
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
                    <span className="text-xs font-semibold max-w-[100px] truncate leading-tight">
                      {user.name}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-forest-800">
                      {user.role === 'admin' ? '⚙️ Admin' : 'Customer'}
                    </span>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setTargetRole('customer');
                    setAuthMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="p-2 text-charcoal-900 hover:text-forest-900 hover:bg-cream-200/70 rounded-full transition-colors flex items-center gap-1"
                  aria-label="Sign in"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline text-xs font-semibold">Sign In</span>
                </button>

                <button
                  onClick={() => {
                    setTargetRole('admin');
                    setAuthMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold bg-forest-900 text-accent-gold px-3 py-1.5 rounded-full hover:bg-forest-950 transition-colors shadow-2xs"
                >
                  <Shield className="w-3 h-3" />
                  <span>Admin</span>
                </button>
              </div>
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
                placeholder="Search mementos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-lg bg-cream-200 border border-cream-300 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900"
              />
              <Search className="w-4 h-4 text-charcoal-900/60 absolute left-3 top-3" />
            </form>
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-charcoal-900 hover:bg-cream-200"
            >
              Home
            </Link>
            <Link
              href="/catalog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-charcoal-900 hover:bg-cream-200"
            >
              All Product Catalog
            </Link>

            {user?.role === 'admin' && (
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-bold text-accent-gold bg-forest-900"
              >
                ⚙️ Admin Management Portal
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
