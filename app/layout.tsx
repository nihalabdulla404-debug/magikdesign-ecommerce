import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '../lib/cartContext';
import { AuthProvider } from '../lib/authContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { AuthModal } from '../components/AuthModal';
import { ToastAlert } from '../components/ToastAlert';

export const metadata: Metadata = {
  title: 'MagikDesign | Premium Sports Mementos & Custom Awards',
  description: 'Luxury e-commerce store for custom championship ring vaults, sports mementos, artisan trophies, and architectural desktop monuments.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <CartDrawer />
            <AuthModal />
            <ToastAlert />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
