'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../lib/authContext';
import { User, Package, MapPin, LogOut, ArrowRight, ShieldCheck, Sparkles, Award } from 'lucide-react';

export default function AccountPage() {
  const { user, logout, setIsAuthModalOpen, setAuthMode } = useAuth();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-cream-200 mx-auto flex items-center justify-center text-forest-900">
          <User className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-charcoal-900">
          Sign In to Access Your Account
        </h2>
        <p className="text-xs text-charcoal-800/70 max-w-sm mx-auto">
          Track your custom memento orders, view laser etching proofs, and manage your saved shipping addresses.
        </p>
        <button
          onClick={() => {
            setAuthMode('login');
            setIsAuthModalOpen(true);
          }}
          className="inline-block bg-forest-900 text-cream-100 text-xs font-bold px-8 py-3 rounded-full hover:bg-forest-800 transition-all shadow-md"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const sampleOrders = [
    {
      id: 'MGD-884920',
      date: 'September 18, 2026',
      total: '$189.00',
      status: 'Processing in Laser Studio',
      items: ['Championship Ring Vault & Acrylic Case (Forest Obsidian)'],
    },
    {
      id: 'MGD-710294',
      date: 'August 12, 2026',
      total: '$145.00',
      status: 'Delivered',
      items: ['AeroLine Minimalist Runner Trophy (Standard 8.5")'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Account Profile Header */}
      <div className="bg-forest-900 rounded-3xl p-8 sm:p-10 text-cream-100 border border-forest-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          {user.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-16 h-16 rounded-full border-2 border-accent-gold object-cover shadow-md"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-forest-800 text-accent-gold border-2 border-accent-gold font-serif text-2xl font-bold flex items-center justify-center">
              {user.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="inline-flex items-center gap-1 bg-forest-800 text-accent-gold text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
              <Sparkles className="w-3 h-3" /> VIP Collector Circle Member
            </div>
            <h1 className="font-serif text-2xl font-bold text-cream-50">{user.name}</h1>
            <p className="text-xs text-cream-300/80">{user.email} • Member since {user.joinedDate || '2026'}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="bg-forest-800 hover:bg-red-900/80 text-cream-200 hover:text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-forest-700 transition-colors flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Order History */}
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-cream-300 shadow-luxury space-y-6">
          <div className="flex items-center justify-between border-b border-cream-200 pb-4">
            <h2 className="font-serif text-xl font-bold text-charcoal-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-forest-900" />
              <span>Bespoke Order History</span>
            </h2>
            <span className="text-xs text-charcoal-800/70 font-semibold">{sampleOrders.length} Orders</span>
          </div>

          <div className="space-y-4">
            {sampleOrders.map((ord) => (
              <div key={ord.id} className="p-5 bg-cream-50 rounded-2xl border border-cream-200 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-cream-200 pb-3">
                  <div>
                    <span className="font-bold text-xs text-charcoal-900">Order #{ord.id}</span>
                    <span className="text-[11px] text-charcoal-800/60 block">{ord.date}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                    ord.status.includes('Delivered')
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {ord.status}
                  </span>
                </div>

                <div className="text-xs text-charcoal-800 space-y-1">
                  {ord.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2 font-medium">
                      <Award className="w-4 h-4 text-forest-900 shrink-0" />
                      <span>{it}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <span className="font-bold text-forest-900">Total: {ord.total}</span>
                  <Link
                    href="/catalog"
                    className="text-forest-900 font-bold hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>View Laser Proof</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Account Quick Settings */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Saved Address Card */}
          <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-luxury space-y-3">
            <h3 className="font-serif text-base font-bold text-charcoal-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-forest-900" />
              <span>Primary Shipping Address</span>
            </h3>
            <div className="text-xs text-charcoal-800 leading-relaxed bg-cream-50 p-4 rounded-xl border border-cream-200">
              <span className="font-bold text-charcoal-900 block">{user.name}</span>
              740 Grand Central Parkway, Suite 12B<br />
              New York, NY 10012<br />
              United States
            </div>
          </div>

          {/* Member Benefits */}
          <div className="bg-cream-100 p-6 rounded-3xl border border-cream-300 space-y-3">
            <h3 className="font-serif text-base font-bold text-charcoal-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-forest-900" />
              <span>Collector Privileges</span>
            </h3>
            <ul className="text-xs text-charcoal-800 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-forest-900" />
                <span>Complimentary laser etching preview rendering</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-forest-900" />
                <span>Priority queue for custom championship ring vaults</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-forest-900" />
                <span>Free express white-glove shipping on all orders over $150</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
