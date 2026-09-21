'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../lib/cartContext';
import { useAuth } from '../../lib/authContext';
import { Check, ShieldCheck, CreditCard, Truck, Lock, ArrowRight, ArrowLeft, Printer, CheckCircle2, Sparkles } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // Step 4 = Order Placed Receipt

  // Shipping Address Form State
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Alexander Wright',
    email: user?.email || 'alex.wright@magikdesign.com',
    phone: '+1 (555) 234-5678',
    address: '740 Grand Central Parkway, Suite 12B',
    city: 'New York',
    state: 'NY',
    zip: '10012',
    country: 'United States',
  });

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'overnight'>('express');

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'paypal'>('card');
  const [cardData, setCardData] = useState({
    cardNumber: '4532 •••• •••• 8892',
    cardName: user?.name || 'Alexander Wright',
    expiry: '09/28',
    cvv: '884',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{ orderId: string; date: string } | null>(null);

  const shippingCost = shippingMethod === 'standard' ? 0 : shippingMethod === 'express' ? 15.00 : 35.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleQuickAutoFill = () => {
    setFormData({
      fullName: 'Alexander Wright',
      email: 'alex.wright@magikdesign.com',
      phone: '+1 (555) 987-6543',
      address: '740 Grand Central Parkway, Suite 12B',
      city: 'New York',
      state: 'NY',
      zip: '10012',
      country: 'United States',
    });
    setCardData({
      cardNumber: '4532 8812 9940 8892',
      cardName: 'Alexander Wright',
      expiry: '12/28',
      cvv: '448',
    });
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = 'MGD-' + Math.floor(100000 + Math.random() * 900000);
      setCompletedOrder({
        orderId,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      });
      setIsProcessing(false);
      clearCart();
      setStep(4);
    }, 1800);
  };

  // Step 4: Order Receipt Confirmation View
  if (step === 4 && completedOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-cream-300 shadow-luxury text-center space-y-6">
          <div className="w-20 h-20 bg-forest-900 text-accent-gold rounded-full mx-auto flex items-center justify-center shadow-lg border border-forest-700">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-forest-800">
              Payment Confirmed & Verified
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-800/80 max-w-md mx-auto">
              Your order <span className="font-bold text-forest-900">#{completedOrder.orderId}</span> has been received and sent to our master laser engraving studio.
            </p>
          </div>

          {/* Receipt Card */}
          <div className="bg-cream-50 p-6 rounded-2xl border border-cream-200 text-left max-w-lg mx-auto space-y-4 text-xs">
            <div className="flex justify-between border-b border-cream-200 pb-3 font-bold text-charcoal-900">
              <span>Order Reference: #{completedOrder.orderId}</span>
              <span>{completedOrder.date}</span>
            </div>

            <div className="space-y-2 text-charcoal-800">
              <div className="flex justify-between">
                <span>Shipping Address:</span>
                <span className="font-semibold text-right">{formData.fullName}, {formData.city}, {formData.state}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Speed:</span>
                <span className="font-semibold text-right">
                  {shippingMethod === 'standard' ? 'Standard Ground' : shippingMethod === 'express' ? 'Express White-Glove' : 'Overnight Priority'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery:</span>
                <span className="font-semibold text-forest-900 text-right">Within 3-5 Business Days</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-charcoal-900 pt-2 border-t border-cream-200">
                <span>Total Paid:</span>
                <span className="text-forest-900">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto bg-cream-200 hover:bg-cream-300 text-charcoal-900 text-xs font-semibold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Order Receipt</span>
            </button>
            <Link
              href="/catalog"
              className="w-full sm:w-auto bg-forest-900 hover:bg-forest-800 text-cream-100 text-xs font-semibold px-8 py-3 rounded-xl transition-all shadow-md"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back Link & 1-Click Auto Fill Demo Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link href="/catalog" className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-800/70 hover:text-forest-900">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to E-Store Catalog</span>
        </Link>

        {/* 1-CLICK DEMO AUTO-FILL BUTTON */}
        <button
          onClick={handleQuickAutoFill}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3.5 py-1.5 rounded-full transition-all shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>⚡ 1-Click Auto-Fill Demo Shipping & Card</span>
        </button>
      </div>

      {/* Checkout Progress Steps */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-cream-300 shadow-2xs">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-forest-900 font-bold' : 'text-charcoal-800/40'}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-forest-900 text-cream-100' : 'bg-cream-200 text-charcoal-800'}`}>
              1
            </span>
            <span className="text-xs hidden sm:inline">Shipping Address</span>
          </div>

          <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-forest-900' : 'bg-cream-300'}`} />

          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-forest-900 font-bold' : 'text-charcoal-800/40'}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-forest-900 text-cream-100' : 'bg-cream-200 text-charcoal-800'}`}>
              2
            </span>
            <span className="text-xs hidden sm:inline">Shipping Speed</span>
          </div>

          <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-forest-900' : 'bg-cream-300'}`} />

          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-forest-900 font-bold' : 'text-charcoal-800/40'}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-forest-900 text-cream-100' : 'bg-cream-200 text-charcoal-800'}`}>
              3
            </span>
            <span className="text-xs hidden sm:inline">Mock Payment</span>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Area */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-cream-300 shadow-luxury space-y-6">
          
          {/* STEP 1: Address Form */}
          {step === 1 && (
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-charcoal-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-forest-900" />
                <span>Shipping Address</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-900 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 mb-1">State / Province</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 mb-1">ZIP / Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-forest-900 hover:bg-forest-800 text-cream-100 font-semibold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs mt-4"
              >
                <span>Continue to Shipping Method</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Shipping Method Selection */}
          {step === 2 && (
            <form onSubmit={handleShippingSubmit} className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-charcoal-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-forest-900" />
                <span>Select Shipping Delivery Speed</span>
              </h2>

              <div className="space-y-3">
                <label className={`block p-4 rounded-2xl border cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-forest-900 bg-cream-100 shadow-sm' : 'border-cream-300 bg-white'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="accent-forest-900"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-charcoal-900">Standard Ground Shipping</h4>
                        <p className="text-[11px] text-charcoal-800/70">5-7 Business Days Delivery</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-forest-900">$0.00 (Free)</span>
                  </div>
                </label>

                <label className={`block p-4 rounded-2xl border cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-forest-900 bg-cream-100 shadow-sm' : 'border-cream-300 bg-white'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="accent-forest-900"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-charcoal-900">Express Insured White-Glove (Recommended)</h4>
                        <p className="text-[11px] text-charcoal-800/70">2-3 Business Days Delivery with Velvet Box Cushioning</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-forest-900">$15.00</span>
                  </div>
                </label>

                <label className={`block p-4 rounded-2xl border cursor-pointer transition-all ${shippingMethod === 'overnight' ? 'border-forest-900 bg-cream-100 shadow-sm' : 'border-cream-300 bg-white'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'overnight'}
                        onChange={() => setShippingMethod('overnight')}
                        className="accent-forest-900"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-charcoal-900">Overnight Priority Courier</h4>
                        <p className="text-[11px] text-charcoal-800/70">Next Business Day Delivery guaranteed</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-forest-900">$35.00</span>
                  </div>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-cream-200 text-charcoal-900 text-xs font-semibold px-5 py-3 rounded-xl hover:bg-cream-300 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-forest-900 hover:bg-forest-800 text-cream-100 font-semibold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Mock Payment Gateway */}
          {step === 3 && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-charcoal-900 mb-2 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-forest-900" />
                <span>Mock Payment Gateway</span>
              </h2>
              <p className="text-xs text-charcoal-800/70 mb-4">
                Simulated 256-bit encrypted checkout. No real money will be charged.
              </p>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2.5 px-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-forest-900 bg-forest-900 text-cream-100 shadow-sm'
                      : 'border-cream-300 text-charcoal-800 bg-cream-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`py-2.5 px-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-forest-900 bg-forest-900 text-cream-100 shadow-sm'
                      : 'border-cream-300 text-charcoal-800 bg-cream-50'
                  }`}
                >
                  <span>UPI / NetBank</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`py-2.5 px-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-forest-900 bg-forest-900 text-cream-100 shadow-sm'
                      : 'border-cream-300 text-charcoal-800 bg-cream-50'
                  }`}
                >
                  <span>PayPal Express</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  {/* Visual Card Mock */}
                  <div className="bg-gradient-to-tr from-forest-900 via-forest-800 to-forest-950 text-cream-100 p-5 rounded-2xl border border-forest-700 shadow-lg space-y-4">
                    <div className="flex justify-between items-center text-xs font-semibold text-accent-gold">
                      <span>MagikDesign VIP Card</span>
                      <Lock className="w-4 h-4" />
                    </div>
                    <div className="font-mono text-lg tracking-widest text-cream-50">
                      {cardData.cardNumber}
                    </div>
                    <div className="flex justify-between text-xs text-cream-300/80">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider block">Cardholder</span>
                        <span className="font-semibold text-cream-100">{cardData.cardName}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider block">Expires</span>
                        <span className="font-semibold text-cream-100">{cardData.expiry}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-900 mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      value={cardData.cardNumber}
                      onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-900 mb-1">Expiration Date</label>
                      <input
                        type="text"
                        required
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-900 mb-1">Security Code (CVV)</label>
                      <input
                        type="text"
                        required
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="p-4 bg-cream-100 rounded-2xl border border-cream-300 text-center space-y-2">
                  <p className="text-xs font-bold text-charcoal-900">Scan or enter VPA ID to pay</p>
                  <input
                    type="text"
                    placeholder="magikdesign@upi"
                    className="w-full px-3 py-2 text-xs bg-white border border-cream-300 rounded-xl text-center font-mono"
                  />
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="p-4 bg-cream-100 rounded-2xl border border-cream-300 text-center text-xs font-semibold text-charcoal-900">
                  You will be redirected to PayPal sandbox to authorize payment.
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-cream-200 text-charcoal-900 text-xs font-semibold px-5 py-3 rounded-xl hover:bg-cream-300 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 bg-forest-900 hover:bg-forest-800 text-cream-100 font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-cream-100 border-t-transparent rounded-full animate-spin" />
                      <span>Encrypting & Processing...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-accent-gold" />
                      <span>Pay ${total.toFixed(2)} & Place Order</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Right Order Summary Column */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-cream-300 shadow-luxury space-y-6">
          <h3 className="font-serif text-lg font-bold text-charcoal-900 border-b border-cream-200 pb-3">
            Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
          </h3>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <p className="text-xs text-charcoal-800/60 italic">Your cart is empty.</p>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="flex gap-3 text-xs border-b border-cream-100 pb-3">
                  <div className="w-14 h-14 rounded-lg bg-cream-100 overflow-hidden shrink-0 border border-cream-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-charcoal-900 line-clamp-1">{item.product.name}</h4>
                    <p className="text-[10px] text-charcoal-800/70">
                      Qty: {item.quantity} | {item.selectedSize}
                    </p>
                    <span className="font-bold text-forest-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="space-y-2 text-xs border-t border-cream-200 pt-4">
            <div className="flex justify-between text-charcoal-800/70">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-charcoal-800/70">
              <span>Shipping Fee</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-charcoal-800/70">
              <span>Est. Sales Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-charcoal-900 pt-2 border-t border-cream-300">
              <span>Grand Total</span>
              <span className="text-forest-900">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3 bg-cream-100 rounded-xl text-[11px] text-charcoal-800/70 flex items-center gap-2">
            <Lock className="w-4 h-4 text-forest-900 shrink-0" />
            <span>Encrypted SSL 256-Bit Protection Guarantee</span>
          </div>
        </div>

      </div>
    </div>
  );
}
