export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Custom Sports Jerseys' | 'Flex & Vinyl Signage' | 'Corporate ID Cards & Printing' | 'Branding & Logo Design';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  supplier: string;
  isFeatured?: boolean;
  imageUrl: string;
  gallery: string[];
  description: string;
  features: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  verifiedBuyer: boolean;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierName: string;
  itemName: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  orderDate: string;
  expectedDelivery: string;
  status: 'Pending' | 'In Transit' | 'Received';
}

export interface SalesMetrics {
  totalRevenue: number;
  totalOrdersCount: number;
  averageOrderValue: number;
  itemsSold: number;
}

export const CATEGORIES = [
  {
    id: '1',
    name: 'Custom Sports Jerseys',
    slug: 'sports-jerseys',
    description: 'Custom team athletic jerseys, sports day posters, and customized athletic tournament gear.',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    itemCount: 14
  },
  {
    id: '2',
    name: 'Flex & Vinyl Signage',
    slug: 'flex-vinyl-signage',
    description: 'Weather-resistant flex banners, vinyl posters, shop outdoor boards, and cloth banners.',
    imageUrl: 'https://images.unsplash.com/photo-1542744094-3a3121699495?auto=format&fit=crop&w=800&q=80',
    itemCount: 18
  },
  {
    id: '3',
    name: 'Corporate ID Cards & Printing',
    slug: 'corporate-id-printing',
    description: 'Custom employee & school ID cards, business cards, stickers, labels & legal certificates.',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    itemCount: 22
  },
  {
    id: '4',
    name: 'Branding & Logo Design',
    slug: 'branding-logo-design',
    description: 'Creative brand identity creation, custom business logo design from scratch & vector files.',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    itemCount: 10
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Sublimated Team Sports Jersey Set',
    slug: 'sublimated-team-sports-jersey',
    category: 'Custom Sports Jerseys',
    price: 499.00,
    originalPrice: 650.00,
    rating: 4.9,
    reviewCount: 56,
    inStock: true,
    stockQuantity: 45,
    sku: 'MD-SJ-001',
    supplier: 'Magik Design Mulleria Studio',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Custom full-sublimation athletic jerseys for football, cricket, and sports clubs in Kasaragod. Features moisture-wicking dry-fit fabric, custom player names, and team sponsor logos.',
    features: [
      '100% Breathable Dry-Fit Polyester Mesh',
      'Full Color High-Definition Sublimation Print',
      'Custom Player Name & Numbering Included',
      'Fade-Proof & Washable Premium Ink'
    ],
    sizes: ['Small (S)', 'Medium (M)', 'Large (L)', 'XL', 'XXL'],
    colors: [
      { name: 'Emerald Forest & Gold', hex: '#1b382b' },
      { name: 'Royal Blue & White', hex: '#1e40af' },
      { name: 'Crimson Red & Black', hex: '#991b1b' }
    ]
  },
  {
    id: 'p2',
    name: 'High-Definition Weatherproof Flex Banner (Per Sq. Ft)',
    slug: 'hd-weatherproof-flex-banner',
    category: 'Flex & Vinyl Signage',
    price: 18.00,
    originalPrice: 22.00,
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    stockQuantity: 500,
    sku: 'MD-FX-002',
    supplier: 'Magik Large Format Printing',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1542744094-3a3121699495?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542744094-3a3121699495?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Heavy-duty star flex & vinyl banners for shop boards, election campaigns, local festivals, and sports events. Printed with UV-resistant Japanese solvent inks.',
    features: [
      'Heavy-Duty 340 GSM Star Flex Material',
      'Sunlight & Rain Resistant Solvent Printing',
      'Reinforced Metal Eyelets Every 2 Feet',
      'Same-Day Production Turnaround in Mulleria'
    ],
    sizes: ['Custom Dimensions (Per Sq. Ft)', 'Standard 6x3 Feet', 'Banner 10x4 Feet', 'Shop Board 12x5 Feet'],
    colors: [
      { name: 'Vibrant Full Color CMYK', hex: '#d4af37' }
    ]
  },
  {
    id: 'p3',
    name: 'Custom Corporate & School PVC ID Card Pack (10 Cards)',
    slug: 'pvc-id-card-pack',
    category: 'Corporate ID Cards & Printing',
    price: 399.00,
    originalPrice: 499.00,
    rating: 5.0,
    reviewCount: 38,
    inStock: true,
    stockQuantity: 120,
    sku: 'MD-ID-003',
    supplier: 'Magik Plastic Card Press',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Professional grade PVC plastic ID cards for schools, corporate firms, event staff, and security teams. Waterproof, scratch-resistant gloss laminate finish.',
    features: [
      'Standard Credit-Card Thickness PVC Plastic',
      'Dual-Sided High Definition Color Printing',
      'Includes Custom Lanyard Strap & Holder Clip',
      'QR Code / Barcode / Staff ID Integration'
    ],
    sizes: ['Standard CR80 ID Size (85.6 x 54 mm)'],
    colors: [
      { name: 'Gloss Finish Laminate', hex: '#1b382b' },
      { name: 'Matte Executive Finish', hex: '#18181b' }
    ]
  },
  {
    id: 'p4',
    name: 'Custom Brand Logo & Identity Package',
    slug: 'custom-brand-logo-package',
    category: 'Branding & Logo Design',
    price: 1499.00,
    originalPrice: 1999.00,
    rating: 5.0,
    reviewCount: 29,
    inStock: true,
    stockQuantity: 99,
    sku: 'MD-LD-004',
    supplier: 'Magik Creative Design Studio',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Complete business branding from scratch for shops, startups, and institutions in Kerala. Includes 3 unique logo concepts, vector master files, business card layout, and social media kit.',
    features: [
      '3 Custom Initial Logo Design Concepts',
      'Vector AI, EPS, PDF, PNG High-Res Master Files',
      'Complimentary Business Card Design File',
      'Unlimited Minor Revisions Until Approval'
    ],
    sizes: ['Standard Logo Package', 'Complete Corporate Identity Suite'],
    colors: [
      { name: 'Full Vector Palette', hex: '#d4af37' }
    ]
  },
  {
    id: 'p5',
    name: 'Premium Velvet Business Cards (Box of 100)',
    slug: 'premium-velvet-business-cards',
    category: 'Corporate ID Cards & Printing',
    price: 299.00,
    rating: 4.7,
    reviewCount: 22,
    inStock: true,
    stockQuantity: 80,
    sku: 'MD-BC-005',
    supplier: 'Magik Fine Paper Press',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: '350 GSM heavy cardstock business cards with soft-touch velvet lamination and optional spot UV or gold foil logo accents.',
    features: [
      '350 GSM Premium Cardstock Body',
      'Soft Touch Velvet Lamination Coating',
      'Precision Die-Cut Rounded Corners',
      'Vibrant HD Color Accuracy'
    ],
    sizes: ['3.5" x 2" Standard', 'Square 2.5" x 2.5" Modern'],
    colors: [
      { name: 'Deep Forest Velvet', hex: '#1b382b' },
      { name: 'Matte Charcoal Black', hex: '#18181b' }
    ]
  },
  {
    id: 'p6',
    name: 'Outdoor Shop Banner & Metal Standee Signboard',
    slug: 'outdoor-shop-banner-standee',
    category: 'Flex & Vinyl Signage',
    price: 1250.00,
    originalPrice: 1499.00,
    rating: 4.8,
    reviewCount: 19,
    inStock: true,
    stockQuantity: 15,
    sku: 'MD-SB-006',
    supplier: 'Magik Signage Works',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1542744094-3a3121699495?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542744094-3a3121699495?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Portable aluminum roll-up standee banner with high-resolution vinyl graphic print. Ideal for store entrances, trade shows, and festival announcements.',
    features: [
      'Anodized Aluminum Roll-Up Standee Base',
      'Non-Curl Matte Vinyl Print Graphic',
      'Includes Padded Carrying Travel Bag',
      'Quick 1-Minute Assembly'
    ],
    sizes: ['2.5 x 6 Feet Standee', '3 x 6 Feet Executive Standee'],
    colors: [
      { name: 'Silver Aluminum Base', hex: '#e8dfd1' }
    ]
  }
];

export const INITIAL_PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: 'po-1',
    poNumber: 'PO-MGD-101',
    supplierName: 'Kasaragod Textile Mills',
    itemName: 'Dry-Fit Polyester Jersey Fabric Rolls',
    quantity: 200,
    unitCost: 180.00,
    totalCost: 36000.00,
    orderDate: '2026-09-10',
    expectedDelivery: '2026-09-25',
    status: 'In Transit'
  },
  {
    id: 'po-2',
    poNumber: 'PO-MGD-102',
    supplierName: 'Japanese Ink Distributors',
    itemName: 'Outdoor Solvent Flex Ink Set (CMYK)',
    quantity: 12,
    unitCost: 2200.00,
    totalCost: 26400.00,
    orderDate: '2026-09-15',
    expectedDelivery: '2026-09-28',
    status: 'Pending'
  }
];

export const MOCK_REVIEWS: Record<string, Review[]> = {
  'p1': [
    {
      id: 'r1',
      productId: 'p1',
      userName: 'Faisal Mulleria',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      comment: 'We ordered 18 custom jerseys for our local football tournament in Mulleria. The sublimation print quality and dry-fit fabric comfort were outstanding! Fast delivery within 4 days.',
      date: '1 week ago',
      verifiedBuyer: true
    },
    {
      id: 'r2',
      productId: 'p2',
      userName: 'Suresh Kumar Badiadka',
      rating: 5,
      comment: 'Printed our shop banner flex at Magik Dezign. Sharp color output and heavy flex material. Best printing shop in Mulleria area!',
      date: '2 weeks ago',
      verifiedBuyer: true
    }
  ]
};

export const INITIAL_SALES_METRICS: SalesMetrics = {
  totalRevenue: 148500.00,
  totalOrdersCount: 164,
  averageOrderValue: 905.48,
  itemsSold: 320
};
