'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../lib/authContext';
import {
  INITIAL_PRODUCTS,
  INITIAL_PURCHASE_ORDERS,
  INITIAL_SALES_METRICS,
  Product,
  PurchaseOrder,
} from '../../lib/mockData';
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Package,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Truck,
  AlertTriangle,
  X,
  Search,
  Sparkles,
} from 'lucide-react';

export default function AdminPage() {
  const { user, setIsAuthModalOpen, setAuthMode, setTargetRole } = useAuth();

  // Tab Selection: 'analytics' | 'products' | 'inventory' | 'purchase-orders'
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'inventory' | 'purchase-orders'>('analytics');

  // Reactive Stores
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(INITIAL_PURCHASE_ORDERS);
  const [salesMetrics, setSalesMetrics] = useState(INITIAL_SALES_METRICS);

  // Search & Filter State inside Admin
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isPoModalOpen, setIsPoModalOpen] = useState(false);

  // Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Custom Sports Jerseys' as Product['category'],
    price: 499.0,
    originalPrice: 650.0,
    stockQuantity: 50,
    sku: 'MD-SJ-010',
    supplier: 'Magik Design Mulleria Studio',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80',
    description: 'Custom full-sublimation athletic jerseys for football and cricket clubs in Kasaragod.',
    features: ['Dry-Fit Polyester Mesh', 'Full Color Sublimation', 'Custom Player Name & Number'],
    sizes: ['Small (S)', 'Medium (M)', 'Large (L)', 'XL'],
    colors: [{ name: 'Emerald Forest & Gold', hex: '#1b382b' }],
  });

  // Purchase Order Form State
  const [poForm, setPoForm] = useState({
    supplierName: 'Kasaragod Textile Mills',
    itemName: 'Dry-Fit Polyester Jersey Fabric Rolls',
    quantity: 100,
    unitCost: 180.0,
  });

  // Orders Table State
  const [recentOrders, setRecentOrders] = useState([
    {
      id: 'MGD-984210',
      customer: 'Faisal Mulleria',
      email: 'faisal.mulleria@gmail.com',
      items: 'Custom Team Sports Jerseys (x18)',
      total: 8982.0,
      status: 'Processing',
      date: '2026-09-21',
    },
    {
      id: 'MGD-984209',
      customer: 'Suresh Kumar Badiadka',
      email: 'suresh.badiadka@gmail.com',
      items: 'HD Weatherproof Flex Banner (10x4 ft)',
      total: 720.0,
      status: 'In Laser Studio',
      date: '2026-09-20',
    },
    {
      id: 'MGD-984208',
      customer: 'Kasargod Corporate School',
      email: 'info@kasaragodschool.edu',
      items: 'PVC School ID Card Pack (x50)',
      total: 1995.0,
      status: 'Delivered',
      date: '2026-09-18',
    },
  ]);

  // Protected Gate Check
  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-forest-900 text-accent-gold mx-auto flex items-center justify-center shadow-lg border border-forest-700">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-charcoal-900">
          Admin Gatekeeper Protected Area
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-800/70 max-w-md mx-auto">
          You must be logged in with an <span className="font-bold text-forest-900">Administrator Role</span> to access product CRUD controls, inventory levels, sales metrics, and purchase orders.
        </p>
        <button
          onClick={() => {
            setTargetRole('admin');
            setAuthMode('login');
            setIsAuthModalOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-forest-900 text-accent-gold text-xs font-bold px-8 py-3.5 rounded-xl hover:bg-forest-950 transition-all shadow-md"
        >
          <Shield className="w-4 h-4" />
          <span>Sign In as Store Administrator</span>
        </button>
      </div>
    );
  }

  // Handle Product Save (Add or Edit)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      // Edit existing
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: productForm.name,
                category: productForm.category,
                price: Number(productForm.price),
                originalPrice: Number(productForm.originalPrice),
                stockQuantity: Number(productForm.stockQuantity),
                inStock: Number(productForm.stockQuantity) > 0,
                sku: productForm.sku,
                supplier: productForm.supplier,
                imageUrl: productForm.imageUrl,
                description: productForm.description,
              }
            : p
        )
      );
    } else {
      // Add new product
      const newProd: Product = {
        id: 'p_' + Date.now(),
        name: productForm.name,
        slug: productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: productForm.category,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice),
        rating: 5.0,
        reviewCount: 1,
        inStock: Number(productForm.stockQuantity) > 0,
        stockQuantity: Number(productForm.stockQuantity),
        sku: productForm.sku || 'MD-SK-' + Math.floor(100 + Math.random() * 900),
        supplier: productForm.supplier || 'Magik Design Mulleria Studio',
        isFeatured: true,
        imageUrl: productForm.imageUrl,
        gallery: [productForm.imageUrl],
        description: productForm.description,
        features: productForm.features,
        sizes: productForm.sizes,
        colors: productForm.colors,
      };
      setProducts([newProd, ...products]);
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  // Delete Product
  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the store?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      stockQuantity: product.stockQuantity,
      sku: product.sku,
      supplier: product.supplier,
      imageUrl: product.imageUrl,
      description: product.description,
      features: product.features,
      sizes: product.sizes,
      colors: product.colors,
    });
    setIsProductModalOpen(true);
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Custom Sports Jerseys',
      price: 499.0,
      originalPrice: 650.0,
      stockQuantity: 30,
      sku: 'MD-SJ-' + Math.floor(100 + Math.random() * 900),
      supplier: 'Magik Design Mulleria Studio',
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80',
      description: 'Custom sublimated sports jerseys for team tournaments.',
      features: ['100% Dry-Fit Fabric', 'Custom Name & Number'],
      sizes: ['Medium (M)', 'Large (L)'],
      colors: [{ name: 'Emerald Forest', hex: '#1b382b' }],
    });
    setIsProductModalOpen(true);
  };

  // Adjust Inventory Count (+/-)
  const handleAdjustStock = (id: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newQty = Math.max(0, p.stockQuantity + delta);
          return {
            ...p,
            stockQuantity: newQty,
            inStock: newQty > 0,
          };
        }
        return p;
      })
    );
  };

  // Create Purchase Order
  const handleCreatePo = (e: React.FormEvent) => {
    e.preventDefault();
    const newPo: PurchaseOrder = {
      id: 'po_' + Date.now(),
      poNumber: 'PO-MGD-' + Math.floor(885 + Math.random() * 100),
      supplierName: poForm.supplierName,
      itemName: poForm.itemName,
      quantity: Number(poForm.quantity),
      unitCost: Number(poForm.unitCost),
      totalCost: Number(poForm.quantity) * Number(poForm.unitCost),
      orderDate: new Date().toISOString().split('T')[0],
      expectedDelivery: 'In 7 Days',
      status: 'Pending',
    };
    setPurchaseOrders([newPo, ...purchaseOrders]);
    setIsPoModalOpen(false);
  };

  // Update Customer Order Status
  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setRecentOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Filtered products list inside Admin
  const filteredAdminProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner & Header */}
      <div className="bg-forest-900 rounded-3xl p-8 sm:p-10 text-cream-100 border border-forest-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800 text-accent-gold text-[10px] font-bold uppercase tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5" />
            Executive Administration Gate
          </div>
          <h1 className="font-serif text-3xl font-bold text-cream-50">
            MagikDesign Control Center
          </h1>
          <p className="text-xs text-cream-200/80 mt-1">
            Manage products (CRUD), live inventory, sales revenue analytics, and supplier purchase orders.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-accent-gold hover:bg-yellow-500 text-forest-950 font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* ADMIN SUB-TAB NAVIGATION */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-white rounded-2xl border border-cream-300 shadow-2xs">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'analytics'
              ? 'bg-forest-900 text-accent-gold shadow-sm'
              : 'text-charcoal-800/70 hover:bg-cream-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Sales & Orders</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'products'
              ? 'bg-forest-900 text-accent-gold shadow-sm'
              : 'text-charcoal-800/70 hover:bg-cream-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Product CRUD ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'inventory'
              ? 'bg-forest-900 text-accent-gold shadow-sm'
              : 'text-charcoal-800/70 hover:bg-cream-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Inventory Control</span>
        </button>

        <button
          onClick={() => setActiveTab('purchase-orders')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'purchase-orders'
              ? 'bg-forest-900 text-accent-gold shadow-sm'
              : 'text-charcoal-800/70 hover:bg-cream-100'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Purchase Orders ({purchaseOrders.length})</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: SALES ANALYTICS & CUSTOMER ORDERS */}
      {/* ========================================================= */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-luxury space-y-2">
              <div className="flex items-center justify-between text-charcoal-800/60">
                <span className="text-xs font-bold uppercase tracking-wider">Total Sales Revenue</span>
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="font-serif text-3xl font-bold text-forest-900">
                ₹{salesMetrics.totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +18.4% vs last month
              </span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-luxury space-y-2">
              <div className="flex items-center justify-between text-charcoal-800/60">
                <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
                <div className="w-8 h-8 rounded-full bg-forest-100 text-forest-900 flex items-center justify-center font-bold">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>
              <div className="font-serif text-3xl font-bold text-charcoal-900">
                {salesMetrics.totalOrdersCount}
              </div>
              <span className="text-[10px] text-charcoal-800/60">Completed & Processing</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-luxury space-y-2">
              <div className="flex items-center justify-between text-charcoal-800/60">
                <span className="text-xs font-bold uppercase tracking-wider">Avg Order Value</span>
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
              <div className="font-serif text-3xl font-bold text-charcoal-900">
                ₹{salesMetrics.averageOrderValue.toFixed(2)}
              </div>
              <span className="text-[10px] text-charcoal-800/60">Team jersey & flex banner order size</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-luxury space-y-2">
              <div className="flex items-center justify-between text-charcoal-800/60">
                <span className="text-xs font-bold uppercase tracking-wider">Total Items Sold</span>
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-900 flex items-center justify-center font-bold">
                  <Package className="w-4 h-4" />
                </div>
              </div>
              <div className="font-serif text-3xl font-bold text-charcoal-900">
                {salesMetrics.itemsSold} units
              </div>
              <span className="text-[10px] text-charcoal-800/60">Printed & Delivered</span>
            </div>
          </div>

          {/* Customer Orders Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-luxury space-y-4">
            <h3 className="font-serif text-xl font-bold text-charcoal-900">Recent Customer Sales Orders</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-cream-200 text-xs font-bold text-charcoal-800 uppercase tracking-wider">
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-200 text-xs">
                  {recentOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-cream-50/50">
                      <td className="py-3.5 px-4 font-bold text-forest-900">{ord.id}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold block text-charcoal-900">{ord.customer}</span>
                        <span className="text-[10px] text-charcoal-800/60">{ord.email}</span>
                      </td>
                      <td className="py-3.5 px-4 font-medium">{ord.items}</td>
                      <td className="py-3.5 px-4 font-bold text-forest-900">₹{ord.total.toFixed(2)}</td>
                      <td className="py-3.5 px-4">
                        <select
                          value={ord.status}
                          onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                          className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-cream-100 border border-cream-300 text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-forest-900"
                        >
                          <option value="Processing">Processing</option>
                          <option value="In Laser Studio">In Laser Studio</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => alert(`Viewing full order proof details for ${ord.id}`)}
                          className="text-xs font-bold text-forest-900 hover:underline"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: PRODUCT MANAGEMENT (CRUD) */}
      {/* ========================================================= */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-cream-300 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-charcoal-900/40 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by name or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-900"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl text-charcoal-900 font-medium"
              >
                <option value="All">All Categories</option>
                <option value="Custom Sports Jerseys">Custom Sports Jerseys</option>
                <option value="Flex & Vinyl Signage">Flex & Vinyl Signage</option>
                <option value="Corporate ID Cards & Printing">Corporate ID Cards & Printing</option>
                <option value="Branding & Logo Design">Branding & Logo Design</option>
              </select>
            </div>

            <button
              onClick={handleOpenAdd}
              className="bg-forest-900 hover:bg-forest-800 text-cream-100 text-xs font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md shrink-0"
            >
              <Plus className="w-4 h-4 text-accent-gold" />
              <span>Add New Item</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-luxury">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-cream-200 text-xs font-bold text-charcoal-800 uppercase tracking-wider">
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">SKU</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-200 text-xs">
                  {filteredAdminProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-cream-50/50">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-cream-100 overflow-hidden border border-cream-300 shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="font-bold text-charcoal-900 block">{prod.name}</span>
                          <span className="text-[10px] text-charcoal-800/50">{prod.supplier}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-charcoal-800">{prod.sku}</td>
                      <td className="py-3.5 px-4 font-medium text-forest-900">{prod.category}</td>
                      <td className="py-3.5 px-4 font-bold text-charcoal-900">₹{prod.price.toFixed(2)}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 font-bold px-2.5 py-0.5 rounded-full text-[10px] ${
                          prod.stockQuantity <= 5
                            ? 'bg-red-100 text-red-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {prod.stockQuantity <= 5 && <AlertTriangle className="w-3 h-3" />}
                          {prod.stockQuantity} units
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(prod)}
                            className="p-1.5 text-forest-900 hover:bg-cream-200 rounded-lg transition-colors"
                            title="Edit product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id, prod.name)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: INVENTORY & STOCK MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'inventory' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-luxury space-y-4">
            <h3 className="font-serif text-xl font-bold text-charcoal-900">Inventory Level Controls</h3>
            <p className="text-xs text-charcoal-800/70">
              Adjust available inventory units, toggle stock status, and monitor low-stock warnings.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {products.map((prod) => (
                <div key={prod.id} className="p-5 bg-cream-50 rounded-2xl border border-cream-200 space-y-4 flex flex-col justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-xl bg-white overflow-hidden border border-cream-300 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-charcoal-900 line-clamp-1">{prod.name}</h4>
                      <span className="text-[10px] text-charcoal-800/60 font-mono block">{prod.sku}</span>
                      <span className="text-[10px] font-semibold text-forest-800">{prod.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-cream-200">
                    <div>
                      <span className="text-[10px] font-semibold uppercase block text-charcoal-800/60">Stock Level</span>
                      <span className={`text-sm font-bold ${prod.stockQuantity <= 5 ? 'text-red-600' : 'text-forest-900'}`}>
                        {prod.stockQuantity} Units
                      </span>
                    </div>

                    {/* Stock Control Buttons */}
                    <div className="flex items-center gap-1 border border-cream-300 rounded-xl bg-white p-1">
                      <button
                        onClick={() => handleAdjustStock(prod.id, -1)}
                        className="px-2 py-1 text-xs font-bold text-charcoal-900 hover:bg-cream-200 rounded"
                        title="Remove stock"
                      >
                        -1
                      </button>
                      <button
                        onClick={() => handleAdjustStock(prod.id, 5)}
                        className="px-2 py-1 text-xs font-bold text-forest-900 hover:bg-cream-200 rounded"
                        title="Add 5 stock units"
                      >
                        +5
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: PURCHASE ORDERS & RESTOCKING */}
      {/* ========================================================= */}
      {activeTab === 'purchase-orders' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-cream-300 shadow-2xs">
            <div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900">Vendor Purchase Orders</h3>
              <p className="text-xs text-charcoal-800/70">Orders placed with textile suppliers, ink distributors, and card press suppliers.</p>
            </div>

            <button
              onClick={() => setIsPoModalOpen(true)}
              className="bg-forest-900 hover:bg-forest-800 text-cream-100 text-xs font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4 text-accent-gold" />
              <span>New Purchase Order</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-luxury">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-cream-200 text-xs font-bold text-charcoal-800 uppercase tracking-wider">
                    <th className="py-3 px-4">PO Number</th>
                    <th className="py-3 px-4">Supplier</th>
                    <th className="py-3 px-4">Item Name</th>
                    <th className="py-3 px-4">Qty</th>
                    <th className="py-3 px-4">Total Cost</th>
                    <th className="py-3 px-4">Order Date</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-200 text-xs">
                  {purchaseOrders.map((po) => (
                    <tr key={po.id} className="hover:bg-cream-50/50">
                      <td className="py-3.5 px-4 font-mono font-bold text-forest-900">{po.poNumber}</td>
                      <td className="py-3.5 px-4 font-semibold text-charcoal-900">{po.supplierName}</td>
                      <td className="py-3.5 px-4 font-medium">{po.itemName}</td>
                      <td className="py-3.5 px-4 font-bold">{po.quantity} pcs</td>
                      <td className="py-3.5 px-4 font-bold text-forest-900">₹{po.totalCost.toFixed(2)}</td>
                      <td className="py-3.5 px-4 text-charcoal-800/70">{po.orderDate}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          po.status === 'Received'
                            ? 'bg-emerald-100 text-emerald-800'
                            : po.status === 'In Transit'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}>
                          {po.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT CRUD MODAL (ADD / EDIT) */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-xs" onClick={() => setIsProductModalOpen(false)} />
          
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-cream-300 z-10 animate-scaleUp max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-charcoal-900/60 hover:text-charcoal-900 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-charcoal-900 mb-4">
              {editingProduct ? 'Edit Product Details' : 'Add New Service / Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as Product['category'] })}
                    className="w-full px-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl"
                  >
                    <option value="Custom Sports Jerseys">Custom Sports Jerseys</option>
                    <option value="Flex & Vinyl Signage">Flex & Vinyl Signage</option>
                    <option value="Corporate ID Cards & Printing">Corporate ID Cards & Printing</option>
                    <option value="Branding & Logo Design">Branding & Logo Design</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 mb-1">Stock Units</label>
                  <input
                    type="number"
                    required
                    value={productForm.stockQuantity}
                    onChange={(e) => setProductForm({ ...productForm, stockQuantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 mb-1">SKU Number</label>
                  <input
                    type="text"
                    required
                    value={productForm.sku}
                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 mb-1">Supplier / Studio</label>
                  <input
                    type="text"
                    required
                    value={productForm.supplier}
                    onChange={(e) => setProductForm({ ...productForm, supplier: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-900 mb-1">Product Image URL</label>
                <input
                  type="text"
                  required
                  value={productForm.imageUrl}
                  onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-900 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-forest-900 hover:bg-forest-800 text-cream-100 font-bold py-3 rounded-xl text-xs transition-all shadow-md"
              >
                {editingProduct ? 'Save Changes' : 'Create Product Entry'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PURCHASE ORDER MODAL */}
      {isPoModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-xs" onClick={() => setIsPoModalOpen(false)} />
          
          <div className="relative bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-cream-300 z-10 animate-scaleUp">
            <button
              onClick={() => setIsPoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-charcoal-900/60 hover:text-charcoal-900 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-4">
              Create Supplier Purchase Order
            </h3>

            <form onSubmit={handleCreatePo} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal-900 mb-1">Supplier Name</label>
                <input
                  type="text"
                  required
                  value={poForm.supplierName}
                  onChange={(e) => setPoForm({ ...poForm, supplierName: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-900 mb-1">Item to Restock</label>
                <input
                  type="text"
                  required
                  value={poForm.itemName}
                  onChange={(e) => setPoForm({ ...poForm, itemName: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 mb-1">Quantity (Units)</label>
                  <input
                    type="number"
                    required
                    value={poForm.quantity}
                    onChange={(e) => setPoForm({ ...poForm, quantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 mb-1">Unit Cost (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={poForm.unitCost}
                    onChange={(e) => setPoForm({ ...poForm, unitCost: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="p-3 bg-cream-100 rounded-xl text-xs flex justify-between font-bold text-charcoal-900">
                <span>Calculated Order Total:</span>
                <span className="text-forest-900">₹{(poForm.quantity * poForm.unitCost).toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-forest-900 hover:bg-forest-800 text-cream-100 font-bold py-3 rounded-xl text-xs transition-all shadow-md"
              >
                Submit Purchase Order
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
