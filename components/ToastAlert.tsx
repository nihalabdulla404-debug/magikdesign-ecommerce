'use client';

import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useCart } from '../lib/cartContext';

export const ToastAlert: React.FC = () => {
  const { toastMessage, setToastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-scaleUp">
      <div className="bg-forest-900 text-cream-100 px-5 py-3.5 rounded-2xl shadow-2xl border border-forest-700 flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-accent-gold text-forest-950 flex items-center justify-center shrink-0 font-bold">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <p className="text-xs font-semibold">{toastMessage}</p>
        <button
          onClick={() => setToastMessage(null)}
          className="text-cream-300 hover:text-cream-100 p-1 ml-2"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
