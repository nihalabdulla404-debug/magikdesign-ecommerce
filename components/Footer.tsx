'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, Truck, RotateCcw, Send, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-forest-950 text-cream-100 pt-16 pb-12 border-t border-forest-900">
      {/* Brand Value Props Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-forest-800/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-forest-900 text-accent-gold flex items-center justify-center shrink-0 border border-forest-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-cream-50">Lifetime Authenticity Guarantee</h4>
              <p className="text-xs text-cream-300/80 mt-1">Every sports memento and award includes a hand-signed certificate of craftsmanship.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-forest-900 text-accent-gold flex items-center justify-center shrink-0 border border-forest-700">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-cream-50">Insured White-Glove Shipping</h4>
              <p className="text-xs text-cream-300/80 mt-1">Protected in custom velvet collector boxes with tracked express delivery worldwide.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-forest-900 text-accent-gold flex items-center justify-center shrink-0 border border-forest-700">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-cream-50">30-Day Bespoke Guarantee</h4>
              <p className="text-xs text-cream-300/80 mt-1">Free laser etching preview mockups before production and 100% satisfaction commitment.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-forest-900 text-accent-gold flex items-center justify-center border border-forest-700">
              <Award className="w-5 h-5" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-cream-50">
              Magik<span className="text-accent-gold">Design</span>
            </span>
          </div>
          <p className="text-xs text-cream-300/80 leading-relaxed max-w-sm">
            Crafting enduring trophies, championship ring vaults, desktop monuments, and customized sports keepsakes for world-class athletes, leagues, and collectors.
          </p>
          
          {/* Newsletter Box */}
          <div className="pt-2">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-accent-gold mb-2">Join the Magik Collector Circle</h5>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-forest-900 border border-forest-700 text-xs rounded-lg px-3 py-2 text-cream-100 placeholder-cream-400/50 focus:outline-none focus:ring-1 focus:ring-accent-gold flex-1"
              />
              <button
                type="submit"
                className="bg-accent-gold text-forest-950 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-1 shrink-0"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Welcome! You have been subscribed.
              </p>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-xs font-semibold uppercase tracking-wider text-accent-gold mb-4">Collections</h5>
          <ul className="space-y-2.5 text-xs text-cream-300">
            <li><Link href="/catalog?category=Sports+Keepsakes" className="hover:text-cream-50 transition-colors">Sports Keepsakes</Link></li>
            <li><Link href="/catalog?category=Artisan+Awards" className="hover:text-cream-50 transition-colors">Artisan Bronze & Crystal</Link></li>
            <li><Link href="/catalog?category=Desktop+Monuments" className="hover:text-cream-50 transition-colors">Desktop Monuments</Link></li>
            <li><Link href="/catalog?category=Custom+Plaques" className="hover:text-cream-50 transition-colors">Hardwood & Glass Plaques</Link></li>
            <li><Link href="/catalog" className="hover:text-cream-50 transition-colors">Full E-Store Catalog</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h5 className="text-xs font-semibold uppercase tracking-wider text-accent-gold mb-4">Client Care</h5>
          <ul className="space-y-2.5 text-xs text-cream-300">
            <li><Link href="/account" className="hover:text-cream-50 transition-colors">Order Tracking</Link></li>
            <li><a href="#custom-engraving" className="hover:text-cream-50 transition-colors">Custom Engraving Guide</a></li>
            <li><a href="#corporate" className="hover:text-cream-50 transition-colors">Corporate & Team Orders</a></li>
            <li><a href="#shipping" className="hover:text-cream-50 transition-colors">Shipping & Returns</a></li>
            <li><a href="#faq" className="hover:text-cream-50 transition-colors">FAQ & Support</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h5 className="text-xs font-semibold uppercase tracking-wider text-accent-gold mb-4">Magik Design Studio</h5>
          <p className="text-xs text-cream-300/80 leading-relaxed mb-3">
            740 Artisan Way, Suite 400<br />
            New York, NY 10012<br />
            concierge@magikdesign.com
          </p>
          <p className="text-[11px] text-cream-400/60">
            Mon - Fri: 9am - 6pm EST
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 mt-12 border-t border-forest-900 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-400/60 gap-4">
        <p>© 2026 MagikDesign Studio Inc. All rights reserved. Precision Craftsmanship.</p>
        <div className="flex gap-6">
          <a href="#privacy" className="hover:text-cream-200">Privacy Policy</a>
          <a href="#terms" className="hover:text-cream-200">Terms of Service</a>
          <a href="#cookies" className="hover:text-cream-200">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
};
