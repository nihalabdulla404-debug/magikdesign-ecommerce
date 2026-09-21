'use client';

import React, { useState, useMemo } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { INITIAL_PRODUCTS, MOCK_REVIEWS, Review } from '../../../lib/mockData';
import { useCart } from '../../../lib/cartContext';
import { Star, ShoppingBag, ShieldCheck, Truck, RotateCcw, Plus, Minus, Check, Sparkles, MessageSquare, Send, Award, FileText } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const product = useMemo(() => {
    return INITIAL_PRODUCTS.find(p => p.id === productId) || INITIAL_PRODUCTS[0];
  }, [productId]);

  if (!product) {
    notFound();
  }

  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(product.imageUrl);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Default', hex: '#1b382b' });
  const [quantity, setQuantity] = useState(1);
  const [customEngravingText, setCustomEngravingText] = useState('CHAMPIONSHIP MVP 2026 - MARCUS VANCE');

  // Active Information Tab: 'overview' | 'specs' | 'reviews'
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS[product.id] || []);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewAuthor.trim() && newReviewComment.trim()) {
      const createdReview: Review = {
        id: 'r_' + Date.now(),
        productId: product.id,
        userName: newReviewAuthor.trim(),
        rating: newReviewRating,
        comment: newReviewComment.trim(),
        date: 'Just now',
        verifiedBuyer: true,
      };
      setReviews([createdReview, ...reviews]);
      setNewReviewAuthor('');
      setNewReviewComment('');
      setReviewSubmitted(true);
      setTimeout(() => setReviewSubmitted(false), 4000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-charcoal-800/70 font-medium">
        <Link href="/" className="hover:text-forest-900">Home</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-forest-900">Catalog</Link>
        <span>/</span>
        <Link href={`/catalog?category=${encodeURIComponent(product.category)}`} className="hover:text-forest-900">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-charcoal-900 font-bold truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Display View */}
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-white border border-cream-300 shadow-luxury">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.isFeatured && (
              <span className="absolute top-4 left-4 bg-forest-900 text-cream-100 text-xs font-bold px-3 py-1 rounded-full border border-forest-700 shadow-md">
                ★ Signature Collector Item
              </span>
            )}
          </div>

          {/* Thumbnails Row */}
          {product.gallery && product.gallery.length > 0 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden bg-cream-100 shrink-0 border-2 transition-all ${
                    selectedImage === img
                      ? 'border-forest-900 ring-2 ring-forest-900/20 shadow-md'
                      : 'border-cream-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Specifications & Add to Cart Controls */}
        <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-cream-300 shadow-luxury space-y-6">
          
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-forest-800 uppercase tracking-widest">
                {product.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <Check className="w-3 h-3" /> In Stock & Ready to Engrave
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 leading-snug">
              {product.name}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mt-2 text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-cream-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-charcoal-900">{product.rating.toFixed(1)}</span>
              <span className="text-charcoal-800/50">({product.reviewCount} verified reviews)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pt-3 border-t border-cream-200">
            <span className="font-serif text-3xl font-bold text-forest-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-charcoal-800/40 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-xs text-forest-800 font-semibold bg-cream-200 px-2.5 py-0.5 rounded-full">
              Free Shipping Eligible
            </span>
          </div>

          {/* Stock Level Visual Meter */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-charcoal-800">
              <span>Stock Urgency Level:</span>
              <span className={product.stockQuantity <= 5 ? 'text-red-600' : 'text-emerald-700'}>
                {product.stockQuantity <= 5 ? `Only ${product.stockQuantity} Left in Stock!` : `${product.stockQuantity} Units Ready`}
              </span>
            </div>
            <div className="w-full h-1.5 bg-cream-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  product.stockQuantity <= 5 ? 'bg-red-500' : 'bg-forest-900'
                }`}
                style={{ width: `${Math.min(100, (product.stockQuantity / 25) * 100)}%` }}
              />
            </div>
          </div>

          {/* Size Selectors */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-charcoal-900 mb-2">
                Select Edition / Dimension:
              </label>
              <div className="grid grid-cols-1 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border text-left transition-all ${
                      selectedSize === sz
                        ? 'border-forest-900 bg-forest-900 text-cream-100 shadow-sm'
                        : 'border-cream-300 text-charcoal-800 hover:bg-cream-100'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Finish Selectors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-charcoal-900 mb-2">
                Select Finish: <span className="font-normal text-forest-800">{selectedColor.name}</span>
              </label>
              <div className="flex items-center gap-3">
                {product.colors.map((col, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedColor(col)}
                    className={`w-9 h-9 rounded-full border-2 p-0.5 transition-all ${
                      selectedColor.name === col.name
                        ? 'border-forest-900 scale-110 shadow-sm'
                        : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                    title={col.name}
                  >
                    <span
                      className="w-full h-full rounded-full block border border-black/20"
                      style={{ backgroundColor: col.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom Laser Engraving Input & LIVE METALLIC PREVIEW */}
          <div className="p-4 bg-cream-100 rounded-2xl border border-cream-300 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-forest-900">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
                <span>Complimentary Personalization Engraving</span>
              </span>
              <span className="text-[10px] bg-accent-gold text-forest-950 px-2 py-0.5 rounded font-bold">FREE</span>
            </div>

            <input
              type="text"
              placeholder="e.g., MVP 2026 - Marcus Vance #23"
              value={customEngravingText}
              onChange={(e) => setCustomEngravingText(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900 uppercase tracking-wide font-medium"
            />

            {/* LIVE REALISTIC METALLIC BRASS PLATE PREVIEW */}
            {customEngravingText.trim() && (
              <div className="mt-2 p-3 bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 rounded-xl border border-amber-400 shadow-sm text-center relative overflow-hidden">
                <div className="text-[9px] uppercase tracking-widest text-amber-900/60 font-bold mb-0.5">
                  ★ Live Laser Engraving Preview Plate ★
                </div>
                <div className="font-serif text-xs font-bold text-amber-950 tracking-wider uppercase border-b border-amber-400/60 pb-1">
                  {customEngravingText}
                </div>
                <div className="text-[8px] text-amber-900/70 tracking-widest uppercase mt-0.5">
                  MagikDesign Hand-Crafted Inscription
                </div>
              </div>
            )}
          </div>

          {/* Quantity & Add to Cart CTA */}
          <div className="flex items-center gap-4 pt-2">
            {/* Quantity Controls */}
            <div className="flex items-center border border-cream-300 rounded-xl bg-cream-50 p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-charcoal-900 hover:bg-cream-200 rounded-lg transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 text-xs font-bold text-charcoal-900 min-w-[24px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-charcoal-900 hover:bg-cream-200 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-forest-900 hover:bg-forest-800 text-cream-100 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg text-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart (${(product.price * quantity).toFixed(2)})</span>
            </button>
          </div>

          {/* Guarantees Bar */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-cream-200 text-center text-[10px] text-charcoal-800/70">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-forest-900" />
              <span>Lifetime Authenticity</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-forest-900" />
              <span>Insured Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-forest-900" />
              <span>30-Day Guarantee</span>
            </div>
          </div>

        </div>

      </div>

      {/* USER-FRIENDLY INFORMATION TABS SECTION */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-cream-300 shadow-luxury space-y-8">
        
        {/* Tab Controls */}
        <div className="flex border-b border-cream-200 gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-forest-900 text-forest-900'
                : 'border-transparent text-charcoal-800/60 hover:text-charcoal-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Product Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'specs'
                ? 'border-forest-900 text-forest-900'
                : 'border-transparent text-charcoal-800/60 hover:text-charcoal-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Craftsmanship Specs</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'border-forest-900 text-forest-900'
                : 'border-transparent text-charcoal-800/60 hover:text-charcoal-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Customer Reviews ({reviews.length})</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="font-serif text-xl font-bold text-charcoal-900">About {product.name}</h3>
            <p className="text-xs sm:text-sm text-charcoal-800 leading-relaxed max-w-3xl">
              {product.description}
            </p>
            <div className="p-4 bg-cream-100 rounded-2xl border border-cream-200 max-w-xl text-xs text-charcoal-800 space-y-1">
              <span className="font-bold text-forest-900 block">Collector Assurance:</span>
              <p>Includes hand-signed certificate of authenticity, custom protective velvet collector box, and pre-installed wall/desktop mounting hardware.</p>
            </div>
          </div>
        )}

        {/* Tab 2: Specs */}
        {activeTab === 'specs' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="font-serif text-xl font-bold text-charcoal-900">Material & Precision Engineering</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
              {product.features && product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 bg-cream-50 rounded-xl border border-cream-200 text-xs text-charcoal-800">
                  <Check className="w-4 h-4 text-forest-900 shrink-0 mt-0.5" />
                  <span className="font-semibold">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-cream-200">
              <div className="flex items-center gap-4 bg-cream-100 px-5 py-3 rounded-2xl border border-cream-300">
                <div className="text-center">
                  <div className="font-serif text-3xl font-bold text-forest-900">
                    {product.rating.toFixed(1)}
                  </div>
                  <div className="flex text-amber-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="text-xs text-charcoal-800/70 border-l border-cream-300 pl-4">
                  <span className="font-bold text-charcoal-900">{reviews.length}</span> Verified Reviews<br />
                  <span className="text-[10px] text-emerald-800 font-semibold">100% Recommended</span>
                </div>
              </div>
            </div>

            {/* Existing Reviews List */}
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-cream-50 rounded-2xl border border-cream-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-forest-900 text-cream-100 font-bold text-xs flex items-center justify-center">
                        {rev.userName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-charcoal-900">{rev.userName}</h4>
                        {rev.verifiedBuyer && (
                          <span className="text-[10px] text-emerald-700 font-medium">Verified Buyer</span>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-charcoal-800/50">{rev.date}</span>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-charcoal-800 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>

            {/* Write a review form */}
            <div className="pt-6 border-t border-cream-200">
              <h4 className="font-serif text-lg font-bold text-charcoal-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-forest-900" />
                <span>Write a Review</span>
              </h4>

              {reviewSubmitted && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 rounded-xl font-medium">
                  Thank you! Your review has been published.
                </div>
              )}

              <form onSubmit={handleAddReview} className="space-y-4 max-w-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-900 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Jonathan Reed"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-900 mb-1">Rating</label>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900"
                    >
                      <option value={5}>5 Stars - Outstanding</option>
                      <option value={4}>4 Stars - Very Good</option>
                      <option value={3}>3 Stars - Average</option>
                      <option value={2}>2 Stars - Poor</option>
                      <option value={1}>1 Star - Terrible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 mb-1">Review Comments</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Share details about the weight, finish quality, and packaging..."
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-forest-900 hover:bg-forest-800 text-cream-100 text-xs font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Review</span>
                </button>
              </form>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
