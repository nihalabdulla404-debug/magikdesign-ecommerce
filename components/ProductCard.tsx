'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { Product } from '../lib/mockData';
import { useCart } from '../lib/cartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group bg-white rounded-2xl border border-cream-300 overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-cream-100">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.isFeatured && (
            <span className="bg-forest-900/90 backdrop-blur-xs text-cream-100 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-forest-700">
              Featured
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-accent-gold text-forest-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              Save ${(product.originalPrice - product.price).toFixed(0)}
            </span>
          )}
        </div>

        {/* Quick View Hover Icon Button */}
        <Link
          href={`/product/${product.id}`}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-charcoal-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-forest-900 hover:text-cream-100"
          title="View Details"
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-charcoal-800/70 mb-1.5">
            <span className="font-semibold text-forest-800 uppercase tracking-wider text-[10px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-charcoal-800/40 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/product/${product.id}`}>
            <h3 className="font-serif text-base font-bold text-charcoal-900 group-hover:text-forest-900 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Color Swatch Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-3">
              {product.colors.map((col, idx) => (
                <span
                  key={idx}
                  className="w-3 h-3 rounded-full border border-black/20"
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
              <span className="text-[10px] text-charcoal-800/50 ml-1">
                {product.colors.length} finish options
              </span>
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-cream-200">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg text-forest-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-charcoal-800/40 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="bg-cream-200 hover:bg-forest-900 text-charcoal-900 hover:text-cream-100 text-xs font-semibold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs group/btn"
          >
            <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
