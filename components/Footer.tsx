'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, Truck, RotateCcw, Send, CheckCircle2, MapPin, Phone, Mail, Instagram, Clock, MessageSquare } from 'lucide-react';

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
              <h4 className="text-base font-semibold text-cream-50">Local Precision Printing</h4>
              <p className="text-xs text-cream-300/80 mt-1">High-definition Japanese solvent flex printing and sublimated sports jerseys crafted locally in Mulleria.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-forest-900 text-accent-gold flex items-center justify-center shrink-0 border border-forest-700">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-cream-50">Instant WhatsApp Quote & Design</h4>
              <p className="text-xs text-cream-300/80 mt-1">Direct design proofing & instant order updates via WhatsApp (+91 90747 49147).</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-forest-900 text-accent-gold flex items-center justify-center shrink-0 border border-forest-700">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-cream-50">Fast Kasaragod Delivery</h4>
              <p className="text-xs text-cream-300/80 mt-1">Express local delivery across Mulleria, Badiadka, Kasaragod town, and surrounding districts.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Contact Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Info & Newsletter */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-forest-900 text-accent-gold flex items-center justify-center border border-forest-700">
              <Award className="w-5 h-5" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-cream-50">
              Magik<span className="text-accent-gold">Dezign</span>
            </span>
          </div>
          <p className="text-xs text-cream-300/80 leading-relaxed max-w-sm">
            Multi-service creative and commercial printing studio in Mulleria, Kasaragod. Specializing in custom sports team jerseys, flex & vinyl banners, corporate ID cards, and brand logo design.
          </p>
          
          {/* Newsletter Box */}
          <div className="pt-2">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-accent-gold mb-2">Join Magik Design Circle</h5>
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
          <h5 className="text-xs font-semibold uppercase tracking-wider text-accent-gold mb-4">Our Services</h5>
          <ul className="space-y-2.5 text-xs text-cream-300">
            <li><Link href="/catalog?category=Custom+Sports+Jerseys" className="hover:text-cream-50 transition-colors">Custom Sports Jerseys</Link></li>
            <li><Link href="/catalog?category=Flex+%26+Vinyl+Signage" className="hover:text-cream-50 transition-colors">Flex & Vinyl Signage</Link></li>
            <li><Link href="/catalog?category=Corporate+ID+Cards+%26+Printing" className="hover:text-cream-50 transition-colors">Corporate ID Cards</Link></li>
            <li><Link href="/catalog?category=Branding+%26+Logo+Design" className="hover:text-cream-50 transition-colors">Branding & Logo Design</Link></li>
            <li><Link href="/catalog" className="hover:text-cream-50 transition-colors">Full Services Catalog</Link></li>
          </ul>
        </div>

        {/* Operating Hours */}
        <div>
          <h5 className="text-xs font-semibold uppercase tracking-wider text-accent-gold mb-4">Operating Hours</h5>
          <div className="space-y-3 text-xs text-cream-300">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-cream-50">Monday – Saturday</span>
                <span className="text-[11px] text-cream-400">9:00 AM – 8:00 PM</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-cream-50">Sunday Special Hours</span>
                <span className="text-[11px] text-cream-400">10:00 AM – 12:00 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Authentic Local Address & Contact */}
        <div>
          <h5 className="text-xs font-semibold uppercase tracking-wider text-accent-gold mb-4">Mulleria Studio Contact</h5>
          <ul className="space-y-3 text-xs text-cream-300">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
              <span>
                Podikkalam Shopping Complex, Badiadka Road, Mulleria (P.O.), Kasaragod, Kerala — 671543
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent-gold shrink-0" />
              <a href="https://wa.me/919074749147" target="_blank" rel="noreferrer" className="hover:text-cream-50 transition-colors font-semibold">
                +91 90747 49147 (WhatsApp)
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent-gold shrink-0" />
              <a href="mailto:magikdezignmulleria@gmail.com" className="hover:text-cream-50 transition-colors">
                magikdezignmulleria@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2 pt-1">
              <Instagram className="w-4 h-4 text-accent-gold shrink-0" />
              <a href="https://www.instagram.com/magik_dezign/" target="_blank" rel="noreferrer" className="text-accent-gold hover:underline font-semibold">
                @magik_dezign (Instagram)
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 mt-12 border-t border-forest-900 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-400/60 gap-4">
        <p>© 2026 Magik Dezign Mulleria, Kasaragod. All rights reserved. Creative & Commercial Hub.</p>
        <div className="flex gap-6">
          <a href="https://wa.me/919074749147" target="_blank" rel="noreferrer" className="text-accent-gold hover:underline">WhatsApp Quick Quote</a>
          <a href="https://www.instagram.com/magik_dezign/" target="_blank" rel="noreferrer" className="hover:text-cream-200">Instagram Portfolio</a>
        </div>
      </div>
    </footer>
  );
};
