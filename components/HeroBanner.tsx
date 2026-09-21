'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <div className="relative bg-forest-900 text-cream-100 overflow-hidden">
      {/* Background Ambient Glows & Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-forest-700/40 via-forest-900 to-forest-950 opacity-90" />
      
      {/* Subtle Pattern Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-800/80 border border-forest-700 text-accent-gold text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MagikDesign Collection 2026 Release</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-cream-50">
              Artisan Sports Mementos & <span className="text-accent-gold italic">Sculptural Keepsakes</span>
            </h1>

            <p className="text-base sm:text-lg text-cream-200/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Engineered for champions, corporate leaders, and discerning sports collectors. Custom championship ring vaults, laser-etched hardwood plaques, and museum-grade acrylic monuments.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/catalog"
                className="w-full sm:w-auto bg-accent-gold hover:bg-yellow-500 text-forest-950 font-bold px-8 py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm"
              >
                <span>Explore Full Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/catalog?category=Sports+Keepsakes"
                className="w-full sm:w-auto bg-forest-800/90 hover:bg-forest-700 text-cream-100 font-semibold px-6 py-4 rounded-xl border border-forest-600 transition-all text-sm text-center"
              >
                View Sports Keepsakes
              </Link>
            </div>

            {/* Micro Trust Proofs */}
            <div className="pt-8 border-t border-forest-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="font-serif text-2xl font-bold text-cream-50">5,000+</div>
                <div className="text-[11px] text-cream-300/70">Custom Awards Crafted</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-accent-gold">99.8%</div>
                <div className="text-[11px] text-cream-300/70">Collector Satisfaction</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-cream-50">24 Hours</div>
                <div className="text-[11px] text-cream-300/70">Laser Etching Turnaround</div>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card Stack */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-forest-700/60 bg-forest-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80"
                alt="Championship Ring Vault"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-forest-900/95 backdrop-blur-md border border-forest-700 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent-gold">Flagship Artifact</span>
                    <h4 className="font-serif text-sm font-bold text-cream-50">Championship Ring Vault</h4>
                  </div>
                  <span className="font-bold text-sm text-accent-gold">$189.00</span>
                </div>
                <div className="mt-2 text-[11px] text-cream-300/80 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-gold" />
                  <span>Museum-Grade UV Acrylic + LED Spotlight Included</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
