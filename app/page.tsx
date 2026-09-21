'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeroBanner } from '../components/HeroBanner';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, INITIAL_PRODUCTS } from '../lib/mockData';
import { ArrowRight, Star, Award, Shield, Sparkles, SlidersHorizontal, Package, CheckCircle2, Truck } from 'lucide-react';

export default function HomePage() {
  const [selectedTab, setSelectedTab] = useState('All');

  const filteredFeatured = INITIAL_PRODUCTS.filter(p => {
    if (selectedTab === 'All') return p.isFeatured;
    return p.category === selectedTab;
  }).slice(0, 4);

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

      {/* 3. Featured Products Grid with Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream-100 rounded-3xl p-8 sm:p-12 border border-cream-300 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900 text-cream-100 text-[10px] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-accent-gold" />
                Handpicked Favorites
              </div>
              <h2 className="font-serif text-3xl font-bold text-charcoal-900">
                Featured Designer Keepsakes
              </h2>
            </div>

            {/* Category Pill Tabs */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Sports Keepsakes', 'Artisan Awards', 'Desktop Monuments'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    selectedTab === tab
                      ? 'bg-forest-900 text-accent-gold shadow-xs'
                      : 'bg-white text-charcoal-800/70 hover:bg-cream-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFeatured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. USER-FRIENDLY 3-STEP GUIDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-forest-800">
            Intuitive Ordering Process
          </span>
          <h2 className="font-serif text-3xl font-bold text-charcoal-900 mt-1">
            How MagikDesign Works in 3 Easy Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-cream-300 shadow-luxury space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-forest-900 text-accent-gold mx-auto flex items-center justify-center font-serif text-xl font-bold shadow-md">
              1
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal-900">Choose Your Memento</h3>
            <p className="text-xs text-charcoal-800/70 leading-relaxed">
              Select from championship ring vaults, cast bronze statues, desktop monoliths, or solid hardwood wall plaques.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-cream-300 shadow-luxury space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-forest-900 text-accent-gold mx-auto flex items-center justify-center font-serif text-xl font-bold shadow-md">
              2
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal-900">Personalize Laser Engraving</h3>
            <p className="text-xs text-charcoal-800/70 leading-relaxed">
              Type your custom recipient name, event date, or team crest and preview your metallic brass plaque in real time.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-cream-300 shadow-luxury space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-forest-900 text-accent-gold mx-auto flex items-center justify-center font-serif text-xl font-bold shadow-md">
              3
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal-900">Insured White-Glove Delivery</h3>
            <p className="text-xs text-charcoal-800/70 leading-relaxed">
              Your memento is packed in a protective velvet collector box and shipped with express tracking directly to your door.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Craftsmanship & Custom Engraving Showcase */}
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

    </div>
  );
}
