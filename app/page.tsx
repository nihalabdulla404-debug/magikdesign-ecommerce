'use client';

import React from 'react';
import Link from 'next/link';
import { HeroBanner } from '../components/HeroBanner';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, INITIAL_PRODUCTS } from '../lib/mockData';
import { ArrowRight, Star, Award, Shield, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = INITIAL_PRODUCTS.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Hero Section */}
      <HeroBanner />

      {/* 2. Category Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-forest-800">
              Curated Collections
            </span>
            <h2 className="font-serif text-3xl font-bold text-charcoal-900 mt-1">
              Explore by Category
            </h2>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-900 hover:text-forest-700 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/catalog?category=${encodeURIComponent(category.name)}`}
              className="group relative rounded-2xl overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-300 h-80 flex flex-col justify-end p-6 border border-cream-300"
            >
              {/* Image Background */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={category.imageUrl}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />

              {/* Overlay Content */}
              <div className="relative z-10 space-y-1 text-cream-50">
                <span className="text-[10px] uppercase font-bold text-accent-gold tracking-wider">
                  {category.itemCount} Signature Designs
                </span>
                <h3 className="font-serif text-xl font-bold text-cream-50 group-hover:text-accent-gold transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-cream-200/80 line-clamp-2 font-normal">
                  {category.description}
                </p>
                <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-accent-gold group-hover:translate-x-1 transition-transform">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream-100 rounded-3xl p-8 sm:p-12 border border-cream-300 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900 text-cream-100 text-[10px] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-accent-gold" />
                Handpicked Favorites
              </div>
              <h2 className="font-serif text-3xl font-bold text-charcoal-900">
                Featured Designer Keepsakes
              </h2>
            </div>

            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-white text-forest-900 border border-cream-300 text-xs font-bold px-5 py-2.5 rounded-full hover:bg-forest-900 hover:text-cream-100 transition-all shadow-2xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Browse Catalog & Filters</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Craftsmanship & Custom Engraving Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-900 rounded-3xl p-8 sm:p-14 text-cream-100 relative overflow-hidden shadow-2xl border border-forest-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-gold">
                Custom Personalization Studio
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-50 leading-tight">
                Engrave Names, Scores, Dates & Team Crests on Any Memento
              </h2>
              <p className="text-sm text-cream-200/90 leading-relaxed">
                Whether celebrating a championship victory, a hole-in-one golf milestone, or a retiring coach, our master laser engravers personalize your award with sub-millimeter precision.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 bg-forest-800/60 p-3.5 rounded-xl border border-forest-700">
                  <Award className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-cream-50">Custom Brass Inscription Plates</h4>
                    <p className="text-[11px] text-cream-300/80">Deep-etched black velvet metallic brass ribbon plates.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-forest-800/60 p-3.5 rounded-xl border border-forest-700">
                  <Shield className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-cream-50">3D Sub-Surface Laser Etching</h4>
                    <p className="text-[11px] text-cream-300/80">Floating 3D logos inside crystal optical prisms.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/catalog"
                  className="inline-flex items-center gap-2 bg-accent-gold hover:bg-yellow-500 text-forest-950 font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md"
                >
                  <span>Select an Item for Custom Engraving</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden border border-forest-700 shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
                  alt="Laser Engraving Craftsmanship"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Customer Reviews / Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-forest-800">
            Collector Praise
          </span>
          <h2 className="font-serif text-3xl font-bold text-charcoal-900 mt-1">
            Trusted by Athletic Directors & Championship Teams
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-cream-300 shadow-luxury space-y-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-charcoal-800 leading-relaxed italic">
              &quot;The Ring Vault we ordered for our state championship team exceeded all expectations. The built-in LED spotlight makes the championship ring look like it belongs in the Hall of Fame!&quot;
            </p>
            <div className="pt-2 border-t border-cream-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-forest-900 text-cream-100 font-bold flex items-center justify-center text-xs">
                MV
              </div>
              <div>
                <h4 className="text-xs font-bold text-charcoal-900">Marcus Vance</h4>
                <p className="text-[10px] text-charcoal-800/60">Athletic Director, Metro High</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-cream-300 shadow-luxury space-y-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-charcoal-800 leading-relaxed italic">
              &quot;MagikDesign crafted 24 custom bronze trophies for our annual charity marathon. The weight, finish, and engraving were immaculate. Fast 3-day turnaround!&quot;
            </p>
            <div className="pt-2 border-t border-cream-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-forest-900 text-cream-100 font-bold flex items-center justify-center text-xs">
                DS
              </div>
              <div>
                <h4 className="text-xs font-bold text-charcoal-900">David Sterling</h4>
                <p className="text-[10px] text-charcoal-800/60">Event Director, Sterling Sports</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-cream-300 shadow-luxury space-y-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-charcoal-800 leading-relaxed italic">
              &quot;Sublime architectural desk monument. The forest green resin and brass contrast perfectly on my oak desk. Will definitely purchase again for executive gifts.&quot;
            </p>
            <div className="pt-2 border-t border-cream-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-forest-900 text-cream-100 font-bold flex items-center justify-center text-xs">
                ER
              </div>
              <div>
                <h4 className="text-xs font-bold text-charcoal-900">Elena Rostova</h4>
                <p className="text-[10px] text-charcoal-800/60">Managing Partner, Rostova Art</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
