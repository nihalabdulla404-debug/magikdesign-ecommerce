'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '../../components/ProductCard';
import { FilterSidebar } from '../../components/FilterSidebar';
import { INITIAL_PRODUCTS, Product } from '../../lib/mockData';
import { SlidersHorizontal, Sparkles, X } from 'lucide-react';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(300);
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category') || 'All');
    }
    if (searchParams.get('search')) {
      setSearchQuery(searchParams.get('search') || '');
    }
  }, [searchParams]);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let result: Product[] = [...INITIAL_PRODUCTS];

    // 1. Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // 2. Price filter
    result = result.filter(p => p.price <= maxPrice);

    // 3. Rating filter
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    // 4. Keyword search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    // 5. Sorting logic
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'featured') {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, maxPrice, minRating, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setMaxPrice(300);
    setMinRating(0);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header Banner */}
      <div className="bg-forest-900 rounded-3xl p-8 sm:p-10 text-cream-100 mb-8 border border-forest-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800 text-accent-gold text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            Complete E-Store Catalog
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cream-50">
            Artisan Keepsakes & Custom Mementos
          </h1>
          <p className="text-xs sm:text-sm text-cream-200/80">
            Browse our complete collection of sports ring vaults, bronze statues, desk monuments, and wall plaques.
          </p>
        </div>
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-6 flex justify-between items-center bg-white p-4 rounded-xl border border-cream-300 shadow-2xs">
        <span className="text-xs font-bold text-charcoal-900">
          Showing {filteredProducts.length} items
        </span>
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="flex items-center gap-2 bg-forest-900 text-cream-100 text-xs font-semibold px-4 py-2 rounded-lg"
        >
          <SlidersHorizontal className="w-4 h-4 text-accent-gold" />
          <span>Filters & Sort</span>
        </button>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden p-4 bg-charcoal-950/70 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-xs h-full rounded-2xl p-4 overflow-y-auto relative animate-scaleUp">
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="absolute top-4 right-4 p-2 text-charcoal-900"
            >
              <X className="w-5 h-5" />
            </button>
            <FilterSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setIsMobileFilterOpen(false);
              }}
              maxPrice={maxPrice}
              onPriceChange={setMaxPrice}
              minRating={minRating}
              onRatingChange={setMinRating}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onReset={handleResetFilters}
            />
          </div>
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24">
          <FilterSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            maxPrice={maxPrice}
            onPriceChange={setMaxPrice}
            minRating={minRating}
            onRatingChange={setMinRating}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onReset={handleResetFilters}
          />
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Active Filter Pills Bar */}
          <div className="hidden sm:flex items-center justify-between bg-white p-4 rounded-2xl border border-cream-300 shadow-2xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-charcoal-900 mr-2">
                Active Filters ({filteredProducts.length} items):
              </span>
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-cream-200 text-forest-900 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                  Category: {selectedCategory}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-600"
                    onClick={() => setSelectedCategory('All')}
                  />
                </span>
              )}
              {maxPrice < 300 && (
                <span className="inline-flex items-center gap-1 bg-cream-200 text-forest-900 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                  Under ${maxPrice}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-600"
                    onClick={() => setMaxPrice(300)}
                  />
                </span>
              )}
              {minRating > 0 && (
                <span className="inline-flex items-center gap-1 bg-cream-200 text-forest-900 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                  {minRating}★ & Above
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-600"
                    onClick={() => setMinRating(0)}
                  />
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-cream-200 text-forest-900 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                  Query: &quot;{searchQuery}&quot;
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-600"
                    onClick={() => setSearchQuery('')}
                  />
                </span>
              )}
            </div>

            <span className="text-xs font-semibold text-charcoal-800/70 shrink-0">
              Showing {filteredProducts.length} of {INITIAL_PRODUCTS.length}
            </span>
          </div>

          {/* Grid View */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-cream-300 shadow-luxury space-y-4">
              <div className="w-16 h-16 rounded-full bg-cream-200 mx-auto flex items-center justify-center text-charcoal-800/40">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal-900">
                No Products Match Your Criteria
              </h3>
              <p className="text-xs text-charcoal-800/70 max-w-sm mx-auto">
                Try resetting your price slider or choosing a different category to view available mementos.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-block bg-forest-900 text-cream-100 text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-forest-800 transition-all shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-block w-8 h-8 border-4 border-forest-900 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-semibold text-charcoal-800 mt-2">Loading catalog...</p>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
