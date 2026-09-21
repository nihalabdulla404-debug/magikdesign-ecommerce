'use client';

import React from 'react';
import { Search, Filter, RotateCcw, Star } from 'lucide-react';
import { CATEGORIES } from '../lib/mockData';

interface FilterSidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  maxPrice: number;
  onPriceChange: (price: number) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onReset: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  maxPrice,
  onPriceChange,
  minRating,
  onRatingChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-cream-300 shadow-luxury space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-cream-200">
        <div className="flex items-center gap-2 text-forest-900 font-bold text-sm">
          <Filter className="w-4 h-4" />
          <span>Filter Products</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-charcoal-800/60 hover:text-forest-900 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Input */}
      <div>
        <label className="block text-xs font-bold text-charcoal-900 mb-2">Search Keyword</label>
        <div className="relative">
          <Search className="w-4 h-4 text-charcoal-900/40 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900"
          />
        </div>
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-xs font-bold text-charcoal-900 mb-2">Categories</label>
        <div className="space-y-1">
          <button
            onClick={() => onSelectCategory('All')}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex justify-between items-center ${
              selectedCategory === 'All'
                ? 'bg-forest-900 text-cream-100'
                : 'text-charcoal-800 hover:bg-cream-100'
            }`}
          >
            <span>All Categories</span>
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex justify-between items-center ${
                selectedCategory === cat.name
                  ? 'bg-forest-900 text-cream-100'
                  : 'text-charcoal-800 hover:bg-cream-100'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold text-charcoal-900">Max Price</label>
          <span className="text-xs font-bold text-forest-900">${maxPrice}</span>
        </div>
        <input
          type="range"
          min="50"
          max="300"
          step="10"
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-forest-900 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-charcoal-800/50 mt-1 font-medium">
          <span>$50</span>
          <span>$175</span>
          <span>$300</span>
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div>
        <label className="block text-xs font-bold text-charcoal-900 mb-2">Minimum Rating</label>
        <div className="space-y-1">
          {[
            { label: 'All Ratings', value: 0 },
            { label: '4.8★ & Above', value: 4.8 },
            { label: '4.5★ & Above', value: 4.5 },
            { label: '4.0★ & Above', value: 4.0 },
          ].map((rat) => (
            <button
              key={rat.value}
              onClick={() => onRatingChange(rat.value)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center gap-2 ${
                minRating === rat.value
                  ? 'bg-cream-200 text-forest-900 font-bold border border-forest-900/20'
                  : 'text-charcoal-800 hover:bg-cream-100'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{rat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sort By Dropdown */}
      <div>
        <label className="block text-xs font-bold text-charcoal-900 mb-2">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900"
        >
          <option value="featured">Featured First</option>
          <option value="rating">Highest Rated</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

    </div>
  );
};
