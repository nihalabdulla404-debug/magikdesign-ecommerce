export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Sports Keepsakes' | 'Artisan Awards' | 'Desktop Monuments' | 'Custom Plaques';
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
    name: 'Sports Keepsakes',
    slug: 'sports-keepsakes',
    description: 'Engineered mementos celebrating legendary athletic achievements & game memories.',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
    itemCount: 12
  },
  {
    id: '2',
    name: 'Artisan Awards',
    slug: 'artisan-awards',
    description: 'Sculptural bronze, gold leaf, and crystal trophies for corporate and sport victories.',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    itemCount: 16
  },
  {
    id: '3',
    name: 'Desktop Monuments',
    slug: 'desktop-monuments',
    description: 'Architectural desk sculptures, resin memorabilia, and precision brass blocks.',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    itemCount: 9
  },
  {
    id: '4',
    name: 'Custom Plaques',
    slug: 'custom-plaques',
    description: 'Hand-carved hardwood, frosted glass, and laser-engraved steel wall plaques.',
    imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80',
    itemCount: 8
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'm1',
    name: 'Championship Ring Vault & Acrylic Case',
    slug: 'championship-ring-vault',
    category: 'Sports Keepsakes',
    price: 189.00,
    originalPrice: 220.00,
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    stockQuantity: 18,
    sku: 'MGD-SK-001',
    supplier: 'Apex Acrylic & Optics Foundry',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611591475168-7c87c067759b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The premier display vault designed specifically for championship rings and sports memorabilia. Engineered with museum-grade UV protection acrylic, weighted anodized aluminum base, and custom LED spotlight illumination.',
    features: [
      'Museum-Grade 99.7% UV Blocking Acrylic Box',
      'Precision Anodized Aircraft Aluminum Base',
      'Rechargeable Micro-LED Illumination Base',
      'Includes Engraved Brass Personalization Plate'
    ],
    sizes: ['Single Ring (Compact)', 'Triple Ring Edition', 'Grand Franchise 6-Ring Case'],
    colors: [
      { name: 'Forest Obsidian', hex: '#1b382b' },
      { name: 'Brushed Charcoal', hex: '#27272a' },
      { name: 'Champagne Gold', hex: '#d4af37' }
    ]
  },
  {
    id: 'm2',
    name: 'AeroLine Minimalist Runner Trophy',
    slug: 'aeroline-runner-trophy',
    category: 'Artisan Awards',
    price: 145.00,
    originalPrice: 165.00,
    rating: 4.8,
    reviewCount: 28,
    inStock: true,
    stockQuantity: 4, // Low stock item
    sku: 'MGD-AA-002',
    supplier: 'Veritas Bronze Sculptures',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A fluid, aerodynamic bronze sculpture capturing the grace and motion of athletic velocity. Cast using lost-wax precision method and hand-finished with a dark forest patina.',
    features: [
      'Solid Cast Bronze Silhouette',
      'Solid Black Walnut Wood Base',
      'Hand-Buffed Natural Oil Polish',
      'Laser-Etched Custom Name & Event Date'
    ],
    sizes: ['Standard (8.5")', 'Executive (12")', 'Monumental (16")'],
    colors: [
      { name: 'Forest Bronze Patina', hex: '#325447' },
      { name: 'Classic Antique Gold', hex: '#c87d53' },
      { name: 'Matte Onyx', hex: '#18181b' }
    ]
  },
  {
    id: 'm3',
    name: 'Precision Game-Ball Display Pedestal',
    slug: 'game-ball-display-pedestal',
    category: 'Sports Keepsakes',
    price: 129.00,
    rating: 4.7,
    reviewCount: 35,
    inStock: true,
    stockQuantity: 12,
    sku: 'MGD-SK-003',
    supplier: 'Carrara Stone & Leather Crafts',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Showcase your winning basketball, football, or soccer ball in mid-air elegance. Designed with magnetic levitation resonance stability and Italian leather padded ring.',
    features: [
      'Italian Grain Leather Resting Ring',
      'Weighted Italian Marble Block Base',
      'Anti-Slip Silicone Footpads',
      'Custom Stainless Steel Inscription Ribbon'
    ],
    sizes: ['Basketball / Soccer', 'Football / Rugby', 'Baseball / Tennis'],
    colors: [
      { name: 'Carrara White & Gold', hex: '#e8dfd1' },
      { name: 'Forest Green Marble', hex: '#1b382b' },
      { name: 'Midnight Charcoal', hex: '#18181b' }
    ]
  },
  {
    id: 'm4',
    name: 'The Pinnacle Geometric Achievement Prism',
    slug: 'pinnacle-achievement-prism',
    category: 'Artisan Awards',
    price: 210.00,
    originalPrice: 240.00,
    rating: 5.0,
    reviewCount: 19,
    inStock: true,
    stockQuantity: 8,
    sku: 'MGD-AA-004',
    supplier: 'K9 Crystal Optics Ltd.',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An architectural crystal masterpiece. Cut with diamond edge precision to refract light into brilliant spectral hues, mounted on a solid smoked oak base.',
    features: [
      'Optic K9 Crystal Block',
      'Diamond-Facet Angle Cuts',
      'Sub-surface 3D Laser Engraving Available',
      'Luxury Velvet Collector Presentation Box'
    ],
    sizes: ['Medium Prism (7")', 'Large Prism (10")', 'Grand Prism (14")'],
    colors: [
      { name: 'Crystal Emerald Tint', hex: '#508571' },
      { name: 'Pure Diamond Clear', hex: '#fdfbf7' },
      { name: 'Smoked Amber Crystal', hex: '#c87d53' }
    ]
  },
  {
    id: 'm5',
    name: 'Monolith Architectural Desk Sculpture',
    slug: 'monolith-architectural-desk-sculpture',
    category: 'Desktop Monuments',
    price: 98.00,
    rating: 4.6,
    reviewCount: 14,
    inStock: true,
    stockQuantity: 25,
    sku: 'MGD-DM-005',
    supplier: 'Magik Resin & Concrete Lab',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A heavy, tactile desk monument combining concrete, brushed brass, and deep forest green resin. Inspires focus, stability, and enduring craftsmanship on any modern desk.',
    features: [
      'Hand-Cast Polymer Concrete & Resin',
      'Brushed Solid Brass Divider Strip',
      'Non-Scratch Felt Bottom Cushion',
      'Subtle Embossed MagikDesign Emblem'
    ],
    sizes: ['Desk Pillar (6")', 'Tower Edition (9")'],
    colors: [
      { name: 'Forest Concrete', hex: '#2b443b' },
      { name: 'Sandstone Cream', hex: '#f2ece0' },
      { name: 'Volcanic Basalt', hex: '#27272a' }
    ]
  },
  {
    id: 'm6',
    name: 'Legacy Hardwood & Glass Commemorative Plaque',
    slug: 'legacy-hardwood-glass-plaque',
    category: 'Custom Plaques',
    price: 160.00,
    originalPrice: 185.00,
    rating: 4.9,
    reviewCount: 31,
    inStock: true,
    stockQuantity: 10,
    sku: 'MGD-CP-006',
    supplier: 'Heritage Timber Mills',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Wall-mounted honor plaque crafted from sustainable FSC-certified American Walnut wood, suspended under float glass with golden brass standoff pins.',
    features: [
      'FSC-Certified Solid Walnut Slab',
      'Tempered Float Glass Shield',
      'Brass Metallic Standoff Hardware',
      'UV Direct Print + Laser Engraving'
    ],
    sizes: ['8" x 10" Standard', '11" x 14" Executive', '16" x 20" Gallery Wall'],
    colors: [
      { name: 'Dark Walnut & Gold', hex: '#18181b' },
      { name: 'Earthy Green Accents', hex: '#1b382b' }
    ]
  }
];

export const INITIAL_PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: 'po-1',
    poNumber: 'PO-2026-881',
    supplierName: 'Apex Acrylic & Optics Foundry',
    itemName: 'Championship Ring Vault Enclosures',
    quantity: 50,
    unitCost: 85.00,
    totalCost: 4250.00,
    orderDate: '2026-09-10',
    expectedDelivery: '2026-09-28',
    status: 'In Transit'
  },
  {
    id: 'po-2',
    poNumber: 'PO-2026-882',
    supplierName: 'Veritas Bronze Sculptures',
    itemName: 'AeroLine Bronze Castings',
    quantity: 25,
    unitCost: 60.00,
    totalCost: 1500.00,
    orderDate: '2026-09-15',
    expectedDelivery: '2026-10-02',
    status: 'Pending'
  },
  {
    id: 'po-3',
    poNumber: 'PO-2026-879',
    supplierName: 'Heritage Timber Mills',
    itemName: 'Walnut Wood Plaque Slabs',
    quantity: 100,
    unitCost: 45.00,
    totalCost: 4500.00,
    orderDate: '2026-08-25',
    expectedDelivery: '2026-09-05',
    status: 'Received'
  }
];

export const MOCK_REVIEWS: Record<string, Review[]> = {
  'm1': [
    {
      id: 'r1',
      productId: 'm1',
      userName: 'Marcus Vance',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      comment: 'The quality of this ring vault is astonishing! The LED base casts a brilliant spotlight on our state championship ring. Packaging was ultra-secure and premium.',
      date: '2 weeks ago',
      verifiedBuyer: true
    },
    {
      id: 'r2',
      productId: 'm1',
      userName: 'Elena Rostova',
      rating: 5,
      comment: 'Unbelievable craftsmanship. The forest green aluminum trim matches our team colors perfectly. Will be ordering 5 more for our coaching staff.',
      date: '1 month ago',
      verifiedBuyer: true
    }
  ]
};

export const INITIAL_SALES_METRICS: SalesMetrics = {
  totalRevenue: 24850.00,
  totalOrdersCount: 84,
  averageOrderValue: 295.83,
  itemsSold: 112
};
