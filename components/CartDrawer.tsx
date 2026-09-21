'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, Tag, Check, Sparkles } from 'lucide-react';
import { useCart } from '../lib/cartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountMessage, setDiscountMessage] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const applyCode = (code: string) => {
    setPromoCode(code);
    if (code.toUpperCase() === 'MAGIK10') {
      setAppliedDiscount(0.10);
      setDiscountMessage('10% VIP Discount Applied!');
    } else if (code.toUpperCase() === 'MAGIK20') {
      setAppliedDiscount(0.20);
      setDiscountMessage('20% Grand Collector Discount Applied!');
    } else {
      setDiscountMessage('Invalid code. Try "MAGIK10" for 10% off.');
      setAppliedDiscount(0);
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    applyCode(promoCode.trim());
  };

  const discountAmount = subtotal * appliedDiscount;
  const finalSubtotal = Math.max(0, subtotal - discountAmount);
  const freeShippingLeft = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-50 shadow-2xl flex flex-col border-l border-cream-300">
          
          {/* Header */}
          <div className="p-6 bg-cream-100 border-b border-cream-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-forest-900" />
              <h3 className="font-serif text-lg font-bold text-charcoal-900">Your Shopping Cart</h3>
              <span className="text-xs bg-forest-900 text-cream-100 font-semibold px-2 py-0.5 rounded-full">
                {cart.reduce((sum, i) => sum + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-charcoal-900 hover:bg-cream-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-forest-900 text-cream-100 text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-accent-gold" />
                {freeShippingLeft > 0
                  ? `Add $${freeShippingLeft.toFixed(2)} more for FREE Express Shipping`
                  : 'You have unlocked FREE Express Shipping!'}
              </span>
              <span className="font-bold text-accent-gold">{Math.round(shippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-forest-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-gold transition-all duration-300 rounded-full"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-cream-200 mx-auto flex items-center justify-center text-charcoal-900/40">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg font-bold text-charcoal-900">Your Cart is Empty</h4>
                <p className="text-xs text-charcoal-800/70 max-w-xs mx-auto">
                  Explore our collection of championship ring vaults, sports mementos, and artisan awards.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block mt-2 bg-forest-900 text-cream-100 text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-forest-800 transition-all shadow-md"
                >
                  Explore Product Catalog
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}-${idx}`}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-cream-200 shadow-xs hover:border-cream-300 transition-all"
                >
                  {/* Item Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-cream-100 shrink-0 border border-cream-200 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Specs */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-charcoal-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedSize, item.selectedColor.name)
                          }
                          className="text-charcoal-800/40 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-charcoal-800/70">
                        <span className="bg-cream-200 px-1.5 py-0.5 rounded text-[10px]">
                          {item.selectedSize}
                        </span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-black/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-cream-100">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-cream-300 rounded-md bg-cream-50">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedSize, item.selectedColor.name, -1)
                          }
                          className="p-1 hover:bg-cream-200 transition-colors text-charcoal-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-charcoal-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedSize, item.selectedColor.name, 1)
                          }
                          className="p-1 hover:bg-cream-200 transition-colors text-charcoal-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total Price for item */}
                      <span className="text-xs font-bold text-forest-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-cream-100 border-t border-cream-300 space-y-4">
              
              {/* Promo Code Form & 1-Click Promo Chips */}
              <div className="space-y-2">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-charcoal-900/40 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. MAGIK10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-cream-300 rounded-lg text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-forest-900 uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-charcoal-900 text-cream-100 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-forest-900 transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {/* 1-Click Promo Chips */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-charcoal-800/60 font-semibold">1-Click Promos:</span>
                  <button
                    type="button"
                    onClick={() => applyCode('MAGIK10')}
                    className="text-[10px] font-bold text-forest-900 bg-emerald-100 hover:bg-emerald-200 px-2 py-0.5 rounded-md transition-colors flex items-center gap-0.5"
                  >
                    <Sparkles className="w-2.5 h-2.5" /> MAGIK10 (10% OFF)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyCode('MAGIK20')}
                    className="text-[10px] font-bold text-forest-900 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded-md transition-colors flex items-center gap-0.5"
                  >
                    <Sparkles className="w-2.5 h-2.5" /> MAGIK20 (20% OFF)
                  </button>
                </div>
              </div>

              {discountMessage && (
                <p
                  className={`text-[11px] font-medium flex items-center gap-1 ${
                    appliedDiscount > 0 ? 'text-forest-800 font-bold' : 'text-amber-700'
                  }`}
                >
                  {appliedDiscount > 0 && <Check className="w-3 h-3 text-forest-900" />} {discountMessage}
                </p>
              )}

              {/* Subtotals */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-charcoal-800/70">
                  <span>Cart Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-forest-800 font-bold">
                    <span>VIP Discount ({(appliedDiscount * 100).toFixed(0)}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-charcoal-800/70">
                  <span>Estimated Shipping</span>
                  <span>{freeShippingLeft === 0 ? 'FREE' : '$15.00'}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-charcoal-900 pt-2 border-t border-cream-300">
                  <span>Estimated Total</span>
                  <span className="text-forest-900">${(finalSubtotal + (freeShippingLeft === 0 ? 0 : 15)).toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-forest-900 hover:bg-forest-800 text-cream-100 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg text-sm"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
