# MagikDesign - Luxury E-Commerce Web Application

**MagikDesign** is a fully functional, responsive, high-performance e-commerce web application specializing in sports mementos, custom championship ring vaults, artisan trophies, and architectural desk monuments.

Built with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase Database Integration**, the application features an earthy luxury design palette (Forest Green, Warm Cream, Charcoal Black, Champagne Gold Accents) with clean modern typography.

---

## 🌟 Core Features Built

### 1. Homepage (`/`)
- **Hero Banner**: CTA buttons ("Explore Full Catalog", "View Sports Keepsakes"), flagship product showcase card, and key metrics (5,000+ Awards Crafted, 99.8% Collector Rating).
- **Curated Category Highlights**: Interactive grid displaying item counts for Sports Keepsakes, Artisan Awards, Desktop Monuments, and Custom Plaques.
- **Featured Keepsakes**: Handpicked product grid with rating badges and quick add-to-cart.
- **Custom Personalization Studio**: Engraving services showcase with sub-surface laser etching and brass ribbon plate options.
- **Collector Praise**: Verified buyer testimonials.

### 2. Product Catalog (`/catalog`)
- **Dynamic Reactive Filtering**:
  - Filter by Category (Sports Keepsakes, Artisan Awards, Desktop Monuments, Custom Plaques)
  - Interactive Price Range Slider ($50 – $300)
  - Minimum Star Rating filter (4.8★, 4.5★, 4.0★)
  - Real-time keyword search bar
  - Active filter pills with single-click removal & Reset button
- **Sorting Options**: Sort by Featured, Rating, Price Low-High, Price High-Low.

### 3. Product Detail Page (`/product/[id]`)
- **High-Res Gallery**: Main display with thumbnail selector.
- **Variant Selectors**: Size/Dimension selector and Color Finish swatches with hex previews.
- **Complimentary Laser Engraving Input**: Text field to enter recipient names, scores, or dates.
- **Stock Indicator**: Real-time stock status badge.
- **Reviews & Ratings Section**: Average rating distribution, verified buyer badges, and write-a-review form modal.

### 4. Slide-Over Shopping Cart Drawer
- **Quantity Controls**: `+` and `-` item controls and item removal.
- **Free Shipping Progress Bar**: Real-time progress tracker towards the $150 free express shipping threshold.
- **Promo Code System**: Accepts discount codes (e.g., `MAGIK10` for 10% off, `MAGIK20` for 20% off).
- **Subtotal & Estimated Tax**: Dynamic recalculation.

### 5. Checkout Flow (`/checkout`)
- **Step 1: Shipping Address**: Complete form validation.
- **Step 2: Delivery Speed**: Options for Standard Ground, Express White-Glove, and Overnight Priority.
- **Step 3: Mock Payment Gateway**: Credit Card preview with instant formatting, UPI/VPA payment option, and PayPal sandbox mock.
- **Step 4: Order Receipt**: Instant confirmation view with generated tracking reference number (e.g. `#MGD-98421`) and print option.

### 6. User Authentication & Dashboard (`/account`)
- **Auth Modal**: Sign In & Registration forms with instant validation + Quick Demo Member shortcut.
- **Account Dashboard**: Order tracking history with status badges, saved shipping address, and member privileges.

---

## 🎨 Color Palette & Styling

- **Forest Green**: `#1b382b` / `#325447` (Primary Luxury Tone)
- **Warm Cream**: `#fcfaf7` / `#f4efe6` (Background & Cards)
- **Charcoal Black**: `#18181b` / `#27272a` (Headers & Text)
- **Champagne Gold**: `#d4af37` / `#c87d53` (Badges & Highlights)
- **Typography**: Plus Jakarta Sans & Playfair Display

---

## 🚀 Getting Started (Local Development)

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Local Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🗄️ Database Setup (Supabase)

1. Create a free project at [Supabase.com](https://supabase.com).
2. Navigate to **SQL Editor** in your Supabase dashboard.
3. Copy the SQL script inside [`supabase/schema.sql`](file:///c:/Users/User/Documents/Programing/supabase/schema.sql) and run it to create `products`, `categories`, `orders`, and `reviews` tables.
4. Copy your Supabase URL and Anon Key into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
*(Note: If Supabase keys are omitted, the application uses its built-in fallback store so it remains 100% playable out of the box).*

---

## 📦 Deploying to GitHub & Vercel

### Step A: Push to GitHub
Run the following commands in your terminal:
```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/magikdesign-ecommerce.git
git branch -M main
git push -u origin main
```

### Step B: Host on Vercel
1. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
2. Select your GitHub repository (`magikdesign-ecommerce`).
3. Under Environment Variables, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**. Vercel will build and launch your application instantly!
