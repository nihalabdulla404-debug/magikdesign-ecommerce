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
  },
  {
    id: 'm7',
    name: 'Custom Jersey Frame Keepsake Display',
    slug: 'custom-jersey-frame-display',
    category: 'Sports Keepsakes',
    price: 240.00,
    rating: 4.9,
    reviewCount: 56,
    inStock: true,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Shadowbox wall frame designed specifically to preserve autographed sports jerseys. Acid-free matting, pinless jersey hanger, and brass inscription plaque included.',
    features: [
      'Pinless Hanger System (No Fabric Damage)',
      '99% UV Resistant Museum Glass',
      'Deep Shadowbox Profile (2.5")',
      'Dual Matboard with Custom Accent Trim'
    ],
    sizes: ['Youth Jersey (24x30")', 'Pro Adult Jersey (32x40")'],
    colors: [
      { name: 'Forest Matting / Black Frame', hex: '#1b382b' },
      { name: 'Cream Matting / Gold Frame', hex: '#fcfaf7' }
    ]
  },
  {
    id: 'm8',
    name: 'Vanguard Golf Hole-in-One Plaque',
    slug: 'vanguard-golf-hole-in-one-plaque',
    category: 'Custom Plaques',
    price: 115.00,
    rating: 4.8,
    reviewCount: 22,
    inStock: true,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Commemorate the ultimate golfing milestone. Features a recessed sphere mount for your actual golf ball alongside laser-etched scorecard and club specs.',
    features: [
      'Precision Recessed Ball Holder',
      'Laser Etched Course & Scorecard Data',
      'Solid Teak Wood Plaque Body',
      'Desktop Stand or Wall Hanger'
    ],
    sizes: ['Compact Desk (6x8")', 'Wall Gallery (9x12")'],
    colors: [
      { name: 'Natural Teak Wood', hex: '#c87d53' },
      { name: 'Dark Forest Finish', hex: '#1b382b' }
    ]
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
  ],
  'm2': [
    {
      id: 'r3',
      productId: 'm2',
      userName: 'David Sterling',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      comment: 'We awarded these at our national marathon gala. Everyone was stunned by how sleek and weight-balanced the bronze sculpture feels. 10/10 MagikDesign!',
      date: '3 weeks ago',
      verifiedBuyer: true
    }
  ]
};
