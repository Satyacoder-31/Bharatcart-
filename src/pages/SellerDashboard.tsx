import { useState } from 'react'
import { products as catalog } from '../data/products'
import type { NavigateFn, Product } from '../types'

const PRIMARY = '#7C3AED'
const SUCCESS = '#10B981'
const ACCENT = '#F97316'
const SECONDARY = '#EC4899'

const SIDEBAR = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'products', icon: '📦', label: 'Products' },
  { id: 'add', icon: '➕', label: 'Add Product' },
  { id: 'orders', icon: '🛍', label: 'Orders' },
  { id: 'inventory', icon: '📋', label: 'Inventory' },
  { id: 'returns', icon: '↩️', label: 'Returns' },
  { id: 'payments', icon: '💳', label: 'Payments' },
  { id: 'analytics', icon: '📈', label: 'Analytics' },
  { id: 'coupons', icon: '🎟', label: 'Coupons' },
  { id: 'reviews', icon: '⭐', label: 'Reviews' },
  { id: 'settings', icon: '⚙️', label: 'Store Settings' },
]

interface SellerOrder {
  id: string
  customer: string
  product: string
  city: string
  amount: number
  status: string
  date: string
}

const RECENT_ORDERS: SellerOrder[] = [
  { id: 'BC-847291', customer: 'Priya Sharma', product: 'Floral Kurti', city: 'Mumbai', amount: 499, status: 'Processing', date: '9 Aug' },
  { id: 'BC-847188', customer: 'Anita Patel', product: 'Anarkali Set', city: 'Surat', amount: 899, status: 'Shipped', date: '8 Aug' },
  { id: 'BC-846902', customer: 'Meera Nair', product: 'Floral Kurti', city: 'Bengaluru', amount: 499, status: 'Delivered', date: '6 Aug' },
  { id: 'BC-846543', customer: 'Kavya Reddy', product: 'Paisley Kurti', city: 'Hyderabad', amount: 399, status: 'Delivered', date: '4 Aug' },
  { id: 'BC-846100', customer: 'Smita Joshi', product: 'Anarkali Set', city: 'Pune', amount: 899, status: 'Returned', date: '2 Aug' },
  { id: 'BC-845877', customer: 'Neha Kapoor', product: 'Banarasi Saree', city: 'Delhi', amount: 1799, status: 'Shipped', date: '1 Aug' },
  { id: 'BC-845610', customer: 'Divya Menon', product: 'Floral Kurti', city: 'Kochi', amount: 499, status: 'Delivered', date: '31 Jul' },
  { id: 'BC-845392', customer: 'Rashmi Singh', product: 'Paisley Kurti', city: 'Lucknow', amount: 399, status: 'Processing', date: '30 Jul' },
]

const MONTHLY_SALES = [
  { month: 'Mar', value: 42 },
  { month: 'Apr', value: 58 },
  { month: 'May', value: 71 },
  { month: 'Jun', value: 65 },
  { month: 'Jul', value: 89 },
  { month: 'Aug', value: 54 },
]

const STATUS_COLORS: Record<string, string> = {
  Processing: '#F59E0B',
  Shipped: '#3B82F6',
  Delivered: SUCCESS,
  Returned: '#EF4444',
}

interface SellerDashboardProps {
  navigate: NavigateFn
  showToast: (msg: string) => void
}

export default function SellerDashboard({ navigate, showToast }: SellerDashboardProps) {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sellerProducts, setSellerProducts] = useState<Product[]>(() =>
    catalog.filter(p => p.seller === 'Fashion Hub' || p.seller === 'Kurti Bazaar')
  )
  const [orders, setOrders] = useState<SellerOrder[]>(RECENT_ORDERS)
  const [inventory, setInventory] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {}
    catalog.filter(p => p.seller === 'Fashion Hub' || p.seller === 'Kurti Bazaar').forEach(p => { map[p.id] = 100 + (p.reviews % 400) })
    return map
  })

  const maxSale = Math.max(...MONTHLY_SALES.map(s => s.value))

  const addProduct = (p: Product) => {
    setSellerProducts(prev => [p, ...prev])
    setInventory(prev => ({ ...prev, [p.id]: 50 }))
    setActiveSection('products')
    showToast('Product published successfully!')
  }

  const toggleProductActive = (id: string) => {
    setSellerProducts(prev => prev.map(p => (p.id === id ? { ...p, inStock: !p.inStock } : p)))
  }

  const updateOrderStatus = (id: string, status: string) => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, status } : o)))
    showToast(`Order ${id} marked as ${status}`)
  }

  const updateStock = (id: string, delta: number) => {
    setInventory(prev => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) }))
  }

  const productRows = sellerProducts.map(p => ({
    id: p.id,
    image: p.image,
    name: p.name,
    price: p.price,
    stock: inventory[p.id] ?? 50,
    active: p.inStock,
  }))

  return (
    <div className="flex h-screen bg-brand-bg overflow-hidden font-sans">
      {/* ── Sidebar ── */}
      <aside
        className="bg-white border-r border-gray-100 flex flex-col transition-all shrink-0"
        style={{ width: sidebarOpen ? 220 : 56 }}
      >
        {/* Brand */}
        <div className="flex items-center gap-2 px-3 py-4 border-b border-gray-100">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-lg shrink-0"
            style={{ backgroundColor: PRIMARY }}
          >
            B
          </div>
          {sidebarOpen && (
            <div>
              <div className="font-black text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: PRIMARY }}>
                BharatCart
              </div>
              <div className="text-[10px] text-gray-500">Seller Panel</div>
            </div>
          )}
          <button
            className="ml-auto text-gray-400 hover:text-gray-600 shrink-0"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Seller info */}
        {sidebarOpen && (
          <div className="px-3 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-sm font-bold" style={{ color: PRIMARY }}>F</div>
              <div>
                <div className="text-xs font-bold text-gray-800">Fashion Hub</div>
                <div className="text-[10px] text-green-600 font-medium">● Verified Seller</div>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 py-2 overflow-y-auto">
          {SIDEBAR.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors"
              style={{
                backgroundColor: activeSection === item.id ? '#EDE9FE' : 'transparent',
                color: activeSection === item.id ? PRIMARY : '#6B7280',
                fontWeight: activeSection === item.id ? 600 : 400,
                borderRight: activeSection === item.id ? `3px solid ${PRIMARY}` : '3px solid transparent',
              }}
              title={!sidebarOpen ? item.label : undefined}
            >
              <span className="text-base shrink-0">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Back to store */}
        <div className="border-t border-gray-100 p-3">
          <button
            onClick={() => navigate('home')}
            className="w-full flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 py-1.5"
          >
            <span>🏠</span>
            {sidebarOpen && <span>Back to Store</span>}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="font-black text-gray-900 text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {SIDEBAR.find(s => s.id === activeSection)?.label || 'Dashboard'}
            </h1>
            <div className="text-xs text-gray-500">Fashion Hub · GSTIN: 24AABFT1234F1Z8</div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 bg-yellow-50 border border-yellow-200 text-yellow-700 font-semibold px-3 py-1 rounded-full">
              ⚠️ 3 Pending Actions
            </span>
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-sm font-bold" style={{ color: PRIMARY }}>F</div>
          </div>
        </div>

        <div className="p-6">
          {activeSection === 'dashboard' && (
            <div className="space-y-6 fade-in">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon="🛍" label="Today's Orders" value="24" delta="+12%" color={PRIMARY} />
                <StatCard icon="💰" label="Today's Revenue" value="₹18,491" delta="+8.4%" color={SUCCESS} />
                <StatCard icon="📦" label="Total Products" value={String(sellerProducts.length)} delta={`+${sellerProducts.length - 3}`} color={ACCENT} />
                <StatCard icon="↩️" label="Pending Returns" value="3" delta="-1" color={SECONDARY} negative />
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Bar chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-gray-800" style={{ fontFamily: "'Outfit', sans-serif" }}>Monthly Revenue (₹ Lakhs)</h3>
                    <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white outline-none">
                      <option>2026</option>
                    </select>
                  </div>
                  <div className="flex items-end gap-3 h-40">
                    {MONTHLY_SALES.map(s => (
                      <div key={s.month} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[10px] font-semibold text-gray-600">₹{s.value}L</span>
                        <div
                          className="w-full rounded-t-lg transition-all hover:opacity-80"
                          style={{
                            height: `${(s.value / maxSale) * 120}px`,
                            backgroundColor: s.month === 'Aug' ? PRIMARY : '#EDE9FE',
                          }}
                        />
                        <span className="text-[10px] text-gray-400">{s.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Donut-style metrics */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <h3 className="font-black text-gray-800 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Order Status</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Delivered', count: 186, pct: 74, color: SUCCESS },
                      { label: 'Shipped', count: 38, pct: 15, color: '#3B82F6' },
                      { label: 'Processing', count: 24, pct: 9, color: ACCENT },
                      { label: 'Returned', count: 5, pct: 2, color: '#EF4444' },
                    ].map(item => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-600 font-medium">{item.label}</span>
                          <span className="font-bold text-gray-800">{item.count}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <div className="text-2xl font-black text-gray-900">253</div>
                    <div className="text-xs text-gray-500">Total Orders This Month</div>
                  </div>
                </div>
              </div>

              {/* Recent orders table */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-black text-gray-800" style={{ fontFamily: "'Outfit', sans-serif" }}>Recent Orders</h3>
                  <button onClick={() => setActiveSection('orders')} className="text-xs font-semibold hover:underline" style={{ color: PRIMARY }}>View All →</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-xs text-gray-500 font-semibold">
                        <th className="px-5 py-3 text-left">Order ID</th>
                        <th className="px-5 py-3 text-left">Customer</th>
                        <th className="px-5 py-3 text-left">Product</th>
                        <th className="px-5 py-3 text-left">City</th>
                        <th className="px-5 py-3 text-right">Amount</th>
                        <th className="px-5 py-3 text-left">Status</th>
                        <th className="px-5 py-3 text-left">Date</th>
                        <th className="px-5 py-3 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {orders.slice(0, 5).map(order => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3 font-mono text-xs font-semibold text-gray-700">{order.id}</td>
                          <td className="px-5 py-3 text-gray-800 font-medium">{order.customer}</td>
                          <td className="px-5 py-3 text-gray-600 max-w-32 truncate">{order.product}</td>
                          <td className="px-5 py-3 text-gray-500 text-xs">{order.city}</td>
                          <td className="px-5 py-3 text-right font-semibold text-gray-900">₹{order.amount}</td>
                          <td className="px-5 py-3">
                            <span
                              className="text-xs font-bold px-2 py-1 rounded-full"
                              style={{ backgroundColor: STATUS_COLORS[order.status] + '20', color: STATUS_COLORS[order.status] }}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-xs text-gray-500">{order.date}</td>
                          <td className="px-5 py-3">
                            <button onClick={() => setActiveSection('orders')} className="text-xs font-semibold hover:underline" style={{ color: PRIMARY }}>View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'add' && <AddProductForm onPublish={addProduct} showToast={showToast} />}

          {activeSection === 'products' && (
            <div className="space-y-4 fade-in">
              <div className="flex items-center justify-between">
                <h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  My Products ({productRows.length})
                </h2>
                <button
                  onClick={() => setActiveSection('add')}
                  className="text-white text-sm font-bold px-4 py-2 rounded-xl"
                  style={{ backgroundColor: PRIMARY }}
                >
                  + Add Product
                </button>
              </div>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-xs text-gray-500 font-semibold">
                        <th className="px-5 py-3 text-left">Product</th>
                        <th className="px-5 py-3 text-left">Category</th>
                        <th className="px-5 py-3 text-right">Price</th>
                        <th className="px-5 py-3 text-right">Stock</th>
                        <th className="px-5 py-3 text-center">Status</th>
                        <th className="px-5 py-3 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {productRows.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <img src={p.image} alt={p.name} className="w-10 h-12 rounded-lg object-cover bg-gray-100 shrink-0" />
                              <span className="text-gray-800 font-medium max-w-56 truncate">{p.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-xs text-gray-500">{catalog.find(c => c.id === p.id)?.category ?? 'Women Ethnic'}</td>
                          <td className="px-5 py-3 text-right font-semibold text-gray-900">₹{p.price.toLocaleString('en-IN')}</td>
                          <td className="px-5 py-3 text-right text-gray-600">{p.stock}</td>
                          <td className="px-5 py-3 text-center">
                            <span
                              className="text-[10px] font-bold px-2 py-1 rounded-full"
                              style={p.active
                                ? { backgroundColor: '#D1FAE5', color: '#059669' }
                                : { backgroundColor: '#FEE2E2', color: '#DC2626' }}
                            >
                              {p.active ? 'Live' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <button
                              onClick={() => toggleProductActive(p.id)}
                              className="text-xs font-semibold hover:underline"
                              style={{ color: PRIMARY }}
                            >
                              {p.active ? 'Pause' : 'Activate'}
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

          {activeSection === 'orders' && (
            <div className="space-y-4 fade-in">
              <h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Orders ({orders.length})
              </h2>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-xs text-gray-500 font-semibold">
                        <th className="px-5 py-3 text-left">Order ID</th>
                        <th className="px-5 py-3 text-left">Customer</th>
                        <th className="px-5 py-3 text-left">Product</th>
                        <th className="px-5 py-3 text-left">City</th>
                        <th className="px-5 py-3 text-right">Amount</th>
                        <th className="px-5 py-3 text-left">Date</th>
                        <th className="px-5 py-3 text-left">Update Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3 font-mono text-xs font-semibold text-gray-700">{order.id}</td>
                          <td className="px-5 py-3 text-gray-800 font-medium">{order.customer}</td>
                          <td className="px-5 py-3 text-gray-600">{order.product}</td>
                          <td className="px-5 py-3 text-gray-500 text-xs">{order.city}</td>
                          <td className="px-5 py-3 text-right font-semibold text-gray-900">₹{order.amount}</td>
                          <td className="px-5 py-3 text-xs text-gray-500">{order.date}</td>
                          <td className="px-5 py-3">
                            <select
                              value={order.status}
                              onChange={e => updateOrderStatus(order.id, e.target.value)}
                              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white outline-none cursor-pointer"
                              style={{ color: STATUS_COLORS[order.status], fontWeight: 600 }}
                            >
                              {['Processing', 'Shipped', 'Delivered', 'Returned'].map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'inventory' && (
            <div className="space-y-4 fade-in">
              <h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Inventory Management
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard icon="📦" label="In Stock" value={String(productRows.reduce((s, p) => s + p.stock, 0))} delta="OK" color={SUCCESS} />
                <StatCard icon="⚠️" label="Low Stock (<20)" value={String(productRows.filter(p => p.stock < 20).length)} delta="Alert" color={ACCENT} negative />
                <StatCard icon="📉" label="Out of Stock" value="0" delta="Good" color={SUCCESS} />
                <StatCard icon="💰" label="Inventory Value" value={`₹${(productRows.reduce((s, p) => s + p.stock * p.price, 0) / 1000).toFixed(1)}K`} delta="+5%" color={PRIMARY} />
              </div>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-xs text-gray-500 font-semibold">
                        <th className="px-5 py-3 text-left">Product</th>
                        <th className="px-5 py-3 text-right">Price</th>
                        <th className="px-5 py-3 text-center">Stock</th>
                        <th className="px-5 py-3 text-right">Adjust</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {productRows.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3 flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-10 h-12 rounded-lg object-cover bg-gray-100 shrink-0" />
                            <span className="text-gray-800 font-medium max-w-56 truncate">{p.name}</span>
                          </td>
                          <td className="px-5 py-3 text-right font-semibold text-gray-900">₹{p.price.toLocaleString('en-IN')}</td>
                          <td className="px-5 py-3 text-center">
                            <span
                              className="text-xs font-bold px-2 py-1 rounded-full"
                              style={p.stock < 20
                                ? { backgroundColor: '#FEF3C7', color: '#D97706' }
                                : { backgroundColor: '#D1FAE5', color: '#059669' }}
                            >
                              {p.stock} units
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => updateStock(p.id, -10)} className="w-7 h-7 rounded-lg border border-gray-200 font-bold text-gray-500 hover:bg-gray-50">−</button>
                              <button onClick={() => updateStock(p.id, 10)} className="w-7 h-7 rounded-lg border border-gray-200 font-bold text-gray-500 hover:bg-gray-50">+</button>
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

          {activeSection === 'payments' && (
            <div className="space-y-4 fade-in">
              <h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: "'Outfit', sans-serif" }}>Payments & Settlements</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="text-xs text-gray-500 font-medium mb-1">Available Balance</div>
                  <div className="text-3xl font-black text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>₹1,84,290</div>
                  <div className="text-xs text-green-600 font-semibold mt-1">+₹12,480 this week</div>
                  <button
                    onClick={() => showToast('Withdrawal request initiated — amount will be credited in 24-48 hrs')}
                    className="mt-4 w-full py-2.5 rounded-xl text-white text-sm font-bold"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    Withdraw Funds
                  </button>
                </div>
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100 font-black text-gray-800" style={{ fontFamily: "'Outfit', sans-serif" }}>Recent Settlements</div>
                  <div className="divide-y divide-gray-50">
                    {[
                      { date: '8 Aug 2026', ref: 'SET-88231', amount: 18491, status: 'Credited' },
                      { date: '1 Aug 2026', ref: 'SET-87450', amount: 22130, status: 'Credited' },
                      { date: '25 Jul 2026', ref: 'SET-86110', amount: 14580, status: 'Credited' },
                      { date: '18 Jul 2026', ref: 'SET-85293', amount: 19870, status: 'Processing' },
                    ].map(s => (
                      <div key={s.ref} className="px-5 py-3 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-gray-800">{s.date}</div>
                          <div className="text-xs text-gray-400 font-mono">{s.ref}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-gray-900">₹{s.amount.toLocaleString('en-IN')}</div>
                          <div className="text-[10px] font-bold" style={{ color: s.status === 'Credited' ? SUCCESS : '#F59E0B' }}>{s.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {['returns', 'analytics', 'coupons', 'reviews', 'settings'].includes(activeSection) && (
            <div className="bg-white rounded-2xl p-10 text-center fade-in shadow-sm">
              <div className="text-6xl mb-4">
                {SIDEBAR.find(s => s.id === activeSection)?.icon}
              </div>
              <div className="font-black text-gray-800 text-xl mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {SIDEBAR.find(s => s.id === activeSection)?.label}
              </div>
              <div className="text-gray-500 text-sm">
                {activeSection === 'returns' ? 'No pending return requests right now. New requests will appear here.' :
                 activeSection === 'analytics' ? 'Deep-dive reports for traffic, conversions and sales are generated daily at 6 AM.' :
                 activeSection === 'reviews' ? 'All customer reviews for your products will be listed here with reply options.' :
                 'Manage your store profile, GST details and payout information here.'}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function StatCard({ icon, label, value, delta, color, negative = false }: {
  icon: string; label: string; value: string; delta: string; color: string; negative?: boolean
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: color + '20' }}>
          {icon}
        </div>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: negative ? '#FEF2F2' : '#D1FAE5',
            color: negative ? '#EF4444' : '#10B981',
          }}
        >
          {delta}
        </span>
      </div>
      <div className="text-2xl font-black text-gray-900 mb-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>{value}</div>
      <div className="text-xs text-gray-500 font-medium">{label}</div>
    </div>
  )
}

function AddProductForm({ onPublish, showToast }: { onPublish: (p: Product) => void; showToast: (m: string) => void }) {
  const [form, setForm] = useState({
    name: '',
    category: 'Women Ethnic',
    brand: '',
    mrp: '',
    price: '',
    stock: '100',
    sku: '',
  })
  const [error, setError] = useState('')

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }))

  const publish = () => {
    if (!form.name.trim() || !form.price || !form.mrp) {
      setError('Product name, MRP and selling price are required')
      return
    }
    const price = Number(form.price)
    const mrp = Number(form.mrp)
    if (mrp <= 0 || price <= 0 || price >= mrp) {
      setError('Selling price must be less than MRP')
      return
    }
    const id = `s${Date.now()}`
    onPublish({
      id,
      name: form.name.trim(),
      brand: form.brand.trim() || 'Fashion Hub',
      seller: 'Fashion Hub',
      category: form.category,
      price,
      mrp,
      discount: Math.round((1 - price / mrp) * 100),
      rating: 4.0,
      reviews: 0,
      image: 'https://images.unsplash.com/photo-1583407487930-1f0f3a2a19ee?w=400&h=500&fit=crop&auto=format',
      images: ['https://images.unsplash.com/photo-1583407487930-1f0f3a2a19ee?w=600&h=750&fit=crop&auto=format'],
      freeDelivery: true,
      cod: true,
      badge: 'new',
      inStock: true,
      colors: ['Red', 'Blue', 'Black'],
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Newly listed product by Fashion Hub. Quality checked and ready to ship across India.',
      sold: 0,
    })
    showToast('Product draft saved and published')
  }

  return (
    <div className="max-w-3xl space-y-5 fade-in">
      <h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: "'Outfit', sans-serif" }}>Add New Product</h2>

      <FormCard title="Basic Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            placeholder="Product Name *"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            className="col-span-2 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500"
          />
          <select
            value={form.category}
            onChange={e => set('category', e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none bg-white text-gray-600"
          >
            <option>Women Ethnic</option>
            <option>Women Western</option>
            <option>Men</option>
            <option>Kids</option>
            <option>Electronics</option>
            <option>Home & Kitchen</option>
            <option>Beauty & Personal Care</option>
            <option>Footwear</option>
            <option>Bags</option>
          </select>
          <input placeholder="Brand Name" value={form.brand} onChange={e => set('brand', e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500" />
          <input placeholder="SKU Code" value={form.sku} onChange={e => set('sku', e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500" />
          <input placeholder="HSN Code" className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500" />
          <select className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none bg-white text-gray-600">
            <option>GST Rate</option>
            <option>0%</option>
            <option>5%</option>
            <option>12%</option>
            <option>18%</option>
            <option>28%</option>
          </select>
        </div>
      </FormCard>

      <FormCard title="Product Images">
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-5 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-purple-300 cursor-pointer transition-colors">
            <div className="text-4xl mb-2">📸</div>
            <div className="text-sm font-semibold text-gray-600">Drag &amp; drop photos here</div>
            <div className="text-xs text-gray-400 mt-1">or click to browse · PNG, JPG up to 5MB · Max 10 images</div>
          </div>
        </div>
      </FormCard>

      <FormCard title="Pricing">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">MRP (₹) *</label>
            <input type="number" placeholder="1299" value={form.mrp} onChange={e => set('mrp', e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Selling Price (₹) *</label>
            <input type="number" placeholder="499" value={form.price} onChange={e => set('price', e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Cost Price (₹)</label>
            <input type="number" placeholder="250" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Stock Qty *</label>
            <input type="number" placeholder="100" value={form.stock} onChange={e => set('stock', e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500" />
          </div>
        </div>
      </FormCard>

      <FormCard title="Shipping">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['Weight (kg)', 'Length (cm)', 'Width (cm)', 'Height (cm)'].map(f => (
            <div key={f}>
              <label className="text-xs text-gray-500 mb-1 block">{f}</label>
              <input type="number" placeholder="0.5" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500" />
            </div>
          ))}
        </div>
      </FormCard>

      {error && <div className="text-xs text-red-500 bg-red-50 rounded-xl px-4 py-2">⚠️ {error}</div>}

      <div className="flex gap-3">
        <button
          onClick={() => showToast('Draft saved — you can continue later')}
          className="flex-1 py-3 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50"
        >
          Save Draft
        </button>
        <button
          onClick={publish}
          className="flex-1 py-3 text-sm font-bold text-white rounded-xl"
          style={{ backgroundColor: PRIMARY }}
        >
          📤 Publish Product
        </button>
      </div>
    </div>
  )
}

function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h3 className="font-bold text-gray-800 text-sm mb-4">{title}</h3>
      {children}
    </div>
  )
}
