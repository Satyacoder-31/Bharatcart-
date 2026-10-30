import { useState } from 'react'
import type React from 'react'
import type { NavigateFn } from '../types'

const PRIMARY = '#7C3AED'
const SUCCESS = '#10B981'
const ACCENT = '#F97316'
const SECONDARY = '#EC4899'

const ADMIN_NAV = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'vendors', icon: '🏪', label: 'Vendors' },
  { id: 'customers', icon: '👥', label: 'Customers' },
  { id: 'products', icon: '📦', label: 'Products' },
  { id: 'categories', icon: '🗂', label: 'Categories' },
  { id: 'orders', icon: '🛍', label: 'Orders' },
  { id: 'payments', icon: '💳', label: 'Payments' },
  { id: 'returns', icon: '↩️', label: 'Returns & Refunds' },
  { id: 'delivery', icon: '🚚', label: 'Delivery' },
  { id: 'coupons', icon: '🎟', label: 'Coupons & Offers' },
  { id: 'banners', icon: '🖼', label: 'Banners' },
  { id: 'analytics', icon: '📈', label: 'Analytics' },
  { id: 'reports', icon: '📋', label: 'Reports' },
  { id: 'support', icon: '🆘', label: 'Support' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
]

interface Vendor {
  id: string
  name: string
  owner: string
  gstin: string
  city: string
  products: number
  orders: number
  revenue: number
  rating: number
  status: 'Active' | 'Pending' | 'Suspended'
}

const INITIAL_VENDORS: Vendor[] = [
  { id: 'V001', name: 'Fashion Hub', owner: 'Rajan Mehta', gstin: '24AABFT1234F1Z8', city: 'Surat', products: 142, orders: 1823, revenue: 8.4, rating: 4.6, status: 'Active' },
  { id: 'V002', name: 'TechZone India', owner: 'Amit Sharma', gstin: '27AABTS5678G1Z4', city: 'Mumbai', products: 89, orders: 2104, revenue: 28.1, rating: 4.5, status: 'Active' },
  { id: 'V003', name: 'Silk Palace', owner: 'Pradeep Kumar', gstin: '33AABSP9012H1Z2', city: 'Chennai', products: 67, orders: 891, revenue: 15.6, rating: 4.7, status: 'Active' },
  { id: 'V004', name: 'HomeWorld', owner: 'Suresh Patel', gstin: '24AABHW3456I1Z0', city: 'Ahmedabad', products: 234, orders: 3412, revenue: 32.8, rating: 4.4, status: 'Active' },
  { id: 'V005', name: 'Beauty Essentials', owner: 'Deepa Singh', gstin: '29AABBS7890J1Z6', city: 'Bengaluru', products: 58, orders: 1290, revenue: 6.2, rating: 4.3, status: 'Pending' },
  { id: 'V006', name: 'Gadget World', owner: 'Kiran Reddy', gstin: '36AABGW2345K1Z1', city: 'Hyderabad', products: 103, orders: 1654, revenue: 41.3, rating: 4.5, status: 'Suspended' },
  { id: 'V007', name: 'Jewel Craft', owner: 'Meena Iyer', gstin: '33AABJC6789L1Z7', city: 'Coimbatore', products: 76, orders: 654, revenue: 9.8, rating: 4.6, status: 'Pending' },
  { id: 'V008', name: 'StepRight Shoes', owner: 'Harpreet Gill', gstin: '03AABSR1234M1Z9', city: 'Amritsar', products: 118, orders: 1987, revenue: 22.4, rating: 4.2, status: 'Active' },
]

interface PlatformOrder {
  id: string
  customer: string
  vendor: string
  amount: number
  status: string
  date: string
  items: number
}

const INITIAL_ORDERS: PlatformOrder[] = [
  { id: 'BC-847291', customer: 'Priya Sharma', vendor: 'Fashion Hub', amount: 499, status: 'Shipped', date: '9 Aug', items: 1 },
  { id: 'BC-847290', customer: 'Arjun Malhotra', vendor: 'TechZone India', amount: 1299, status: 'Processing', date: '9 Aug', items: 1 },
  { id: 'BC-847289', customer: 'Sneha Iyer', vendor: 'Silk Palace', amount: 3598, status: 'Shipped', date: '9 Aug', items: 2 },
  { id: 'BC-847188', customer: 'Anita Patel', vendor: 'Fashion Hub', amount: 899, status: 'Delivered', date: '8 Aug', items: 1 },
  { id: 'BC-847120', customer: 'Ravi Kumar', vendor: 'HomeWorld', amount: 1499, status: 'Delivered', date: '8 Aug', items: 1 },
  { id: 'BC-846902', customer: 'Meera Nair', vendor: 'Fashion Hub', amount: 499, status: 'Delivered', date: '6 Aug', items: 1 },
  { id: 'BC-846711', customer: 'Karan Johar', vendor: 'Jewel Craft', amount: 1798, status: 'Processing', date: '5 Aug', items: 2 },
  { id: 'BC-846543', customer: 'Kavya Reddy', vendor: 'Fashion Hub', amount: 399, status: 'Delivered', date: '4 Aug', items: 1 },
]

interface ReturnRequest {
  id: string
  orderId: string
  customer: string
  reason: string
  amount: number
  status: 'Pending' | 'Approved' | 'Rejected'
  date: string
}

const INITIAL_RETURNS: ReturnRequest[] = [
  { id: 'R-101', orderId: 'BC-846100', customer: 'Smita Joshi', reason: 'Size issue', amount: 899, status: 'Pending', date: '9 Aug' },
  { id: 'R-102', orderId: 'BC-845500', customer: 'Rohit Sharma', reason: 'Damaged product', amount: 1299, status: 'Pending', date: '8 Aug' },
  { id: 'R-103', orderId: 'BC-844982', customer: 'Ananya Gupta', reason: 'Wrong product received', amount: 499, status: 'Pending', date: '8 Aug' },
  { id: 'R-104', orderId: 'BC-844310', customer: 'Vikram Singh', reason: 'Quality issue', amount: 799, status: 'Approved', date: '6 Aug' },
  { id: 'R-105', orderId: 'BC-843908', customer: 'Pooja Jain', reason: 'Not as described', amount: 1999, status: 'Approved', date: '5 Aug' },
]

interface Customer {
  id: string
  name: string
  email: string
  orders: number
  spent: number
  status: 'Active' | 'Blocked'
  joined: string
}

const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'C-1001', name: 'Priya Sharma', email: 'priya.s@gmail.com', orders: 12, spent: 18450, status: 'Active', joined: 'Mar 2025' },
  { id: 'C-1002', name: 'Rohit Mehta', email: 'rohit.mehta@gmail.com', orders: 8, spent: 12490, status: 'Active', joined: 'Jan 2025' },
  { id: 'C-1003', name: 'Anita Patel', email: 'anita.p@yahoo.com', orders: 15, spent: 22100, status: 'Active', joined: 'Nov 2024' },
  { id: 'C-1004', name: 'Arjun Malhotra', email: 'arjun.m@gmail.com', orders: 3, spent: 4590, status: 'Blocked', joined: 'Jun 2026' },
  { id: 'C-1005', name: 'Meera Nair', email: 'meera.nair@gmail.com', orders: 21, spent: 31250, status: 'Active', joined: 'Feb 2024' },
  { id: 'C-1006', name: 'Karan Johar', email: 'karan.j@outlook.com', orders: 6, spent: 8900, status: 'Active', joined: 'Aug 2025' },
]

const PLATFORM_STATS = [
  { label: 'Total GMV', value: '₹482 Cr', delta: '+23%', icon: '💹', color: PRIMARY },
  { label: 'Total Orders', value: '18.4 L', delta: '+31%', icon: '📦', color: SUCCESS },
  { label: 'Active Sellers', value: '2,841', delta: '+142', icon: '🏪', color: ACCENT },
  { label: 'Total Customers', value: '54.2 L', delta: '+18%', icon: '👥', color: SECONDARY },
  { label: 'Platform Revenue', value: '₹24.1 Cr', delta: '+28%', icon: '💰', color: '#8B5CF6' },
  { label: 'Returns Today', value: '234', delta: '-12%', icon: '↩️', color: '#EF4444' },
  { label: 'Pending Orders', value: '1,823', delta: '', icon: '⏳', color: '#F59E0B' },
  { label: 'New Users Today', value: '4,821', delta: '+6%', icon: '🌟', color: '#06B6D4' },
]

const WEEKLY_DATA = [
  { day: 'Mon', orders: 2100, revenue: 9.4 },
  { day: 'Tue', orders: 2450, revenue: 11.2 },
  { day: 'Wed', orders: 2890, revenue: 13.1 },
  { day: 'Thu', orders: 2670, revenue: 12.0 },
  { day: 'Fri', orders: 3420, revenue: 15.6 },
  { day: 'Sat', orders: 4100, revenue: 18.9 },
  { day: 'Sun', orders: 3850, revenue: 17.2 },
]

const STATUS_COLORS: Record<string, React.CSSProperties> = {
  Active: { backgroundColor: '#D1FAE5', color: '#059669' },
  Pending: { backgroundColor: '#FEF3C7', color: '#D97706' },
  Suspended: { backgroundColor: '#FEE2E2', color: '#DC2626' },
  Blocked: { backgroundColor: '#FEE2E2', color: '#DC2626' },
  Processing: { backgroundColor: '#FEF3C7', color: '#D97706' },
  Shipped: { backgroundColor: '#DBEAFE', color: '#2563EB' },
  Delivered: { backgroundColor: '#D1FAE5', color: '#059669' },
  Approved: { backgroundColor: '#D1FAE5', color: '#059669' },
  Rejected: { backgroundColor: '#FEE2E2', color: '#DC2626' },
}

interface AdminPanelProps {
  navigate: NavigateFn
  showToast: (msg: string) => void
  logout: () => void
}

export default function AdminPanel({ navigate, showToast, logout }: AdminPanelProps) {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [vendors, setVendors] = useState<Vendor[]>(INITIAL_VENDORS)
  const [vendorFilter, setVendorFilter] = useState('All')
  const [showInvite, setShowInvite] = useState(false)
  const [inviteForm, setInviteForm] = useState({ name: '', owner: '', city: '', email: '' })
  const [orders, setOrders] = useState<PlatformOrder[]>(INITIAL_ORDERS)
  const [orderFilter, setOrderFilter] = useState('All')
  const [returns, setReturns] = useState<ReturnRequest[]>(INITIAL_RETURNS)
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS)

  const maxOrders = Math.max(...WEEKLY_DATA.map(d => d.orders))

  const changeVendorStatus = (id: string, status: Vendor['status'], toastMsg: string) => {
    setVendors(prev => prev.map(v => (v.id === id ? { ...v, status } : v)))
    showToast(toastMsg)
  }

  const inviteVendor = () => {
    if (!inviteForm.name.trim() || !inviteForm.owner.trim()) {
      showToast('Store name and owner are required')
      return
    }
    const id = `V${String(100 + vendors.length).padStart(3, '0')}`
    setVendors(prev => [...prev, {
      id,
      name: inviteForm.name.trim(),
      owner: inviteForm.owner.trim(),
      gstin: 'PENDING-GSTIN',
      city: inviteForm.city.trim() || 'New Delhi',
      products: 0,
      orders: 0,
      revenue: 0,
      rating: 0,
      status: 'Pending',
    }])
    setShowInvite(false)
    setInviteForm({ name: '', owner: '', city: '', email: '' })
    showToast(`Invitation sent — ${inviteForm.name.trim()} is now pending approval`)
  }

  const updateOrderStatus = (id: string, status: string) => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, status } : o)))
    showToast(`Order ${id} → ${status}`)
  }

  const decideReturn = (id: string, status: 'Approved' | 'Rejected') => {
    setReturns(prev => prev.map(r => (r.id === id ? { ...r, status } : r)))
    showToast(`Return ${id} ${status.toLowerCase()}`)
  }

  const toggleCustomer = (id: string) => {
    setCustomers(prev => prev.map(c =>
      c.id === id ? { ...c, status: c.status === 'Active' ? 'Blocked' : 'Active' } : c
    ))
  }

  const filteredVendors = vendorFilter === 'All' ? vendors : vendors.filter(v => v.status === vendorFilter)
  const filteredOrders = orderFilter === 'All' ? orders : orders.filter(o => o.status === orderFilter)

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* ── Sidebar ── */}
      <aside
        className="bg-gray-900 flex flex-col transition-all shrink-0"
        style={{ width: sidebarOpen ? 220 : 56 }}
      >
        {/* Brand */}
        <div className="flex items-center gap-2 px-3 py-4 border-b border-gray-800">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-lg shrink-0"
            style={{ backgroundColor: PRIMARY }}
          >
            B
          </div>
          {sidebarOpen && (
            <div>
              <div className="font-black text-sm text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                BharatCart
              </div>
              <div className="text-[10px] text-gray-500">Admin Panel</div>
            </div>
          )}
          <button
            className="ml-auto text-gray-500 hover:text-gray-300 shrink-0 text-xs"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2 overflow-y-auto">
          {ADMIN_NAV.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors"
              style={{
                backgroundColor: activeSection === item.id ? PRIMARY + '30' : 'transparent',
                color: activeSection === item.id ? '#C4B5FD' : '#9CA3AF',
                fontWeight: activeSection === item.id ? 600 : 400,
                borderRight: activeSection === item.id ? `3px solid ${PRIMARY}` : '3px solid transparent',
              }}
            >
              <span className="text-base shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="text-xs">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="border-t border-gray-800 p-3 space-y-1">
          <button
            onClick={() => navigate('home')}
            className="w-full flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 py-1.5"
          >
            <span>🏠</span>
            {sidebarOpen && <span>Back to Marketplace</span>}
          </button>
          <button
            onClick={() => { logout(); showToast('Logged out of admin panel') }}
            className="w-full flex items-center gap-2 text-xs text-red-400 hover:text-red-300 py-1.5"
          >
            <span>🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="font-black text-gray-900 text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {ADMIN_NAV.find(n => n.id === activeSection)?.label || 'Dashboard'}
            </h1>
            <div className="text-xs text-gray-500">BharatCart Technologies · Admin Console</div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-red-50 text-red-600 font-semibold px-3 py-1 rounded-full border border-red-200">
              🔴 {vendors.filter(v => v.status === 'Pending').length + returns.filter(r => r.status === 'Pending').length} Urgent Actions
            </span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-black"
              style={{ background: `linear-gradient(135deg, ${PRIMARY}, #EC4899)` }}
            >
              A
            </div>
          </div>
        </div>

        <div className="p-6">
          {activeSection === 'dashboard' && (
            <div className="space-y-6 fade-in">
              {/* Platform stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PLATFORM_STATS.map(stat => (
                  <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{stat.icon}</span>
                      {stat.delta && (
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                          style={
                            stat.delta.startsWith('-')
                              ? { backgroundColor: '#FEE2E2', color: '#DC2626' }
                              : { backgroundColor: '#D1FAE5', color: '#059669' }
                          }
                        >
                          {stat.delta}
                        </span>
                      )}
                    </div>
                    <div className="text-xl font-black text-gray-900 mb-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Orders chart */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-gray-800" style={{ fontFamily: "'Outfit', sans-serif" }}>Daily Orders — This Week</h3>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {WEEKLY_DATA.map(d => (
                      <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[10px] text-gray-500 font-medium">{d.orders.toLocaleString()}</span>
                        <div
                          className="w-full rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
                          style={{
                            height: `${(d.orders / maxOrders) * 96}px`,
                            background: `linear-gradient(to top, ${PRIMARY}, #EC4899)`,
                          }}
                        />
                        <span className="text-[10px] text-gray-400">{d.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category performance */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <h3 className="font-black text-gray-800 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Category Performance</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Women Ethnic', share: 38, revenue: '₹182 Cr', color: SECONDARY },
                      { name: 'Electronics', share: 22, revenue: '₹106 Cr', color: PRIMARY },
                      { name: 'Home & Kitchen', share: 15, revenue: '₹72 Cr', color: ACCENT },
                      { name: 'Beauty', share: 12, revenue: '₹58 Cr', color: SUCCESS },
                      { name: 'Men Fashion', share: 13, revenue: '₹63 Cr', color: '#8B5CF6' },
                    ].map(cat => (
                      <div key={cat.name} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                        <div className="text-xs text-gray-700 font-medium w-28">{cat.name}</div>
                        <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${cat.share}%`, backgroundColor: cat.color }} />
                        </div>
                        <div className="text-xs text-gray-500 w-16 text-right font-semibold">{cat.revenue}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Vendor summary */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-black text-gray-800" style={{ fontFamily: "'Outfit', sans-serif" }}>Top Vendors</h3>
                  <button
                    onClick={() => setActiveSection('vendors')}
                    className="text-xs font-semibold hover:underline"
                    style={{ color: PRIMARY }}
                  >
                    Manage All →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-xs text-gray-500 font-semibold">
                        <th className="px-5 py-3 text-left">Vendor</th>
                        <th className="px-5 py-3 text-left">City</th>
                        <th className="px-5 py-3 text-right">Products</th>
                        <th className="px-5 py-3 text-right">Orders</th>
                        <th className="px-5 py-3 text-right">Revenue (₹L)</th>
                        <th className="px-5 py-3 text-center">Rating</th>
                        <th className="px-5 py-3 text-center">Status</th>
                        <th className="px-5 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {vendors.slice(0, 5).map(v => (
                        <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3">
                            <div className="font-semibold text-gray-800">{v.name}</div>
                            <div className="text-xs text-gray-400">{v.owner} · {v.gstin}</div>
                          </td>
                          <td className="px-5 py-3 text-xs text-gray-500">{v.city}</td>
                          <td className="px-5 py-3 text-right font-medium text-gray-700">{v.products}</td>
                          <td className="px-5 py-3 text-right font-medium text-gray-700">{v.orders.toLocaleString('en-IN')}</td>
                          <td className="px-5 py-3 text-right font-semibold text-gray-900">{v.revenue}</td>
                          <td className="px-5 py-3 text-center">
                            <span className="text-xs font-bold text-yellow-700">⭐ {v.rating}</span>
                          </td>
                          <td className="px-5 py-3 text-center">
                            <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={STATUS_COLORS[v.status]}>
                              {v.status}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex gap-2">
                              <button onClick={() => setActiveSection('vendors')} className="text-[10px] font-semibold text-blue-600 hover:underline">View</button>
                              {v.status === 'Pending' && (
                                <button onClick={() => changeVendorStatus(v.id, 'Active', `${v.name} approved 🎉`)} className="text-[10px] font-semibold text-green-600 hover:underline">Approve</button>
                              )}
                              {v.status === 'Active' && (
                                <button onClick={() => changeVendorStatus(v.id, 'Suspended', `${v.name} suspended`)} className="text-[10px] font-semibold text-red-500 hover:underline">Suspend</button>
                              )}
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

          {activeSection === 'vendors' && (
            <div className="fade-in">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: "'Outfit', sans-serif" }}>Vendor Management</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Manage all marketplace vendors and their permissions</p>
                </div>
                <button onClick={() => setShowInvite(s => !s)} className="text-white text-sm font-bold px-4 py-2 rounded-xl" style={{ backgroundColor: PRIMARY }}>
                  + Invite Vendor
                </button>
              </div>

              {showInvite && (
                <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 grid grid-cols-2 sm:grid-cols-4 gap-3 fade-in">
                  <input placeholder="Store Name *" value={inviteForm.name} onChange={e => setInviteForm(f => ({ ...f, name: e.target.value }))} className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500" />
                  <input placeholder="Owner Name *" value={inviteForm.owner} onChange={e => setInviteForm(f => ({ ...f, owner: e.target.value }))} className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500" />
                  <input placeholder="City" value={inviteForm.city} onChange={e => setInviteForm(f => ({ ...f, city: e.target.value }))} className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500" />
                  <div className="flex gap-2">
                    <input placeholder="Email" value={inviteForm.email} onChange={e => setInviteForm(f => ({ ...f, email: e.target.value }))} className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500" />
                    <button onClick={inviteVendor} className="px-3 py-2 rounded-xl text-white text-xs font-bold shrink-0" style={{ backgroundColor: PRIMARY }}>Send</button>
                  </div>
                </div>
              )}

              {/* Filter bar */}
              <div className="flex gap-3 mb-4 flex-wrap">
                {['All', 'Active', 'Pending', 'Suspended'].map(s => (
                  <button
                    key={s}
                    onClick={() => setVendorFilter(s)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all"
                    style={vendorFilter === s
                      ? { backgroundColor: PRIMARY, color: 'white', borderColor: PRIMARY }
                      : { backgroundColor: 'white', color: '#6B7280', borderColor: '#E5E7EB' }}
                  >
                    {s} ({s === 'All' ? vendors.length : vendors.filter(v => v.status === s).length})
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-xs text-gray-500 font-semibold">
                        <th className="px-5 py-3 text-left">Vendor ID</th>
                        <th className="px-5 py-3 text-left">Store Name</th>
                        <th className="px-5 py-3 text-left">GSTIN</th>
                        <th className="px-5 py-3 text-left">City</th>
                        <th className="px-5 py-3 text-right">Products</th>
                        <th className="px-5 py-3 text-right">Revenue (₹L)</th>
                        <th className="px-5 py-3 text-center">Rating</th>
                        <th className="px-5 py-3 text-center">Status</th>
                        <th className="px-5 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredVendors.map(v => (
                        <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3 font-mono text-xs text-gray-500">{v.id}</td>
                          <td className="px-5 py-3">
                            <div className="font-semibold text-gray-800">{v.name}</div>
                            <div className="text-xs text-gray-400">{v.owner}</div>
                          </td>
                          <td className="px-5 py-3 font-mono text-xs text-gray-600">{v.gstin}</td>
                          <td className="px-5 py-3 text-xs text-gray-600">{v.city}</td>
                          <td className="px-5 py-3 text-right text-gray-700">{v.products}</td>
                          <td className="px-5 py-3 text-right font-bold text-gray-900">{v.revenue}</td>
                          <td className="px-5 py-3 text-center text-xs font-bold text-yellow-700">⭐ {v.rating}</td>
                          <td className="px-5 py-3 text-center">
                            <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={STATUS_COLORS[v.status]}>
                              {v.status}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex gap-2">
                              <button className="text-[10px] font-semibold text-blue-600 hover:underline">View</button>
                              <button onClick={() => showToast(`${v.name} details opened`)} className="text-[10px] font-semibold text-gray-500 hover:underline">Edit</button>
                              {v.status === 'Pending' && (
                                <>
                                  <button onClick={() => changeVendorStatus(v.id, 'Active', `${v.name} approved 🎉`)} className="text-[10px] font-semibold text-green-600 hover:underline">Approve</button>
                                  <button onClick={() => changeVendorStatus(v.id, 'Suspended', `${v.name} rejected`)} className="text-[10px] font-semibold text-red-500 hover:underline">Reject</button>
                                </>
                              )}
                              {v.status === 'Active' && (
                                <button onClick={() => changeVendorStatus(v.id, 'Suspended', `${v.name} suspended`)} className="text-[10px] font-semibold text-red-500 hover:underline">Suspend</button>
                              )}
                              {v.status === 'Suspended' && (
                                <button onClick={() => changeVendorStatus(v.id, 'Active', `${v.name} reinstated`)} className="text-[10px] font-semibold text-green-600 hover:underline">Reinstate</button>
                              )}
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

          {activeSection === 'orders' && (
            <div className="fade-in">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <div>
                  <h2 className="font-black text-gray-900 text-xl" style={{ fontFamily: "'Outfit', sans-serif" }}>Platform Orders ({filteredOrders.length})</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Track and manage all marketplace orders</p>
                </div>
                <select
                  value={orderFilter}
                  onChange={e => setOrderFilter(e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 bg-white outline-none cursor-pointer"
                >
                  {['All', 'Processing', 'Shipped', 'Delivered'].map(s => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
                </select>
              </div>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-xs text-gray-500 font-semibold">
                        <th className="px-5 py-3 text-left">Order ID</th>
                        <th className="px-5 py-3 text-left">Customer</th>
                        <th className="px-5 py-3 text-left">Vendor</th>
                        <th className="px-5 py-3 text-center">Items</th>
                        <th className="px-5 py-3 text-right">Amount</th>
                        <th className="px-5 py-3 text-left">Date</th>
                        <th className="px-5 py-3 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredOrders.map(o => (
                        <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3 font-mono text-xs font-semibold text-gray-700">{o.id}</td>
                          <td className="px-5 py-3 text-gray-800 font-medium">{o.customer}</td>
                          <td className="px-5 py-3 text-gray-600 text-xs">{o.vendor}</td>
                          <td className="px-5 py-3 text-center text-gray-600">{o.items}</td>
                          <td className="px-5 py-3 text-right font-bold text-gray-900">₹{o.amount.toLocaleString('en-IN')}</td>
                          <td className="px-5 py-3 text-xs text-gray-500">{o.date}</td>
                          <td className="px-5 py-3">
                            <select
                              value={o.status}
                              onChange={e => updateOrderStatus(o.id, e.target.value)}
                              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white outline-none cursor-pointer font-semibold"
                              style={{ color: STATUS_COLORS[o.status]?.color }}
                            >
                              {['Processing', 'Shipped', 'Delivered'].map(s => <option key={s} value={s}>{s}</option>)}
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

          {activeSection === 'returns' && (
            <div className="fade-in">
              <h2 className="font-black text-gray-900 text-xl mb-5" style={{ fontFamily: "'Outfit', sans-serif" }}>Returns & Refunds ({returns.length})</h2>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-xs text-gray-500 font-semibold">
                        <th className="px-5 py-3 text-left">Request</th>
                        <th className="px-5 py-3 text-left">Order</th>
                        <th className="px-5 py-3 text-left">Customer</th>
                        <th className="px-5 py-3 text-left">Reason</th>
                        <th className="px-5 py-3 text-right">Amount</th>
                        <th className="px-5 py-3 text-center">Status</th>
                        <th className="px-5 py-3 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {returns.map(r => (
                        <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3 font-mono text-xs font-semibold text-gray-700">{r.id}</td>
                          <td className="px-5 py-3 font-mono text-xs text-gray-500">{r.orderId}</td>
                          <td className="px-5 py-3 text-gray-800 font-medium">{r.customer}</td>
                          <td className="px-5 py-3 text-xs text-gray-600">{r.reason}</td>
                          <td className="px-5 py-3 text-right font-bold text-gray-900">₹{r.amount.toLocaleString('en-IN')}</td>
                          <td className="px-5 py-3 text-center">
                            <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={STATUS_COLORS[r.status]}>
                              {r.status}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            {r.status === 'Pending' ? (
                              <div className="flex gap-2">
                                <button onClick={() => decideReturn(r.id, 'Approved')} className="text-[10px] font-semibold text-green-600 hover:underline">Approve</button>
                                <button onClick={() => decideReturn(r.id, 'Rejected')} className="text-[10px] font-semibold text-red-500 hover:underline">Reject</button>
                              </div>
                            ) : (
                              <span className="text-[10px] text-gray-400">Processed</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'customers' && (
            <div className="fade-in">
              <h2 className="font-black text-gray-900 text-xl mb-5" style={{ fontFamily: "'Outfit', sans-serif" }}>Customer Management ({customers.length})</h2>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-xs text-gray-500 font-semibold">
                        <th className="px-5 py-3 text-left">Customer</th>
                        <th className="px-5 py-3 text-left">Email</th>
                        <th className="px-5 py-3 text-center">Orders</th>
                        <th className="px-5 py-3 text-right">Spent</th>
                        <th className="px-5 py-3 text-left">Joined</th>
                        <th className="px-5 py-3 text-center">Status</th>
                        <th className="px-5 py-3 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {customers.map(c => (
                        <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold" style={{ color: PRIMARY }}>{c.name[0]}</div>
                              <span className="font-semibold text-gray-800">{c.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-xs text-gray-600">{c.email}</td>
                          <td className="px-5 py-3 text-center text-gray-700">{c.orders}</td>
                          <td className="px-5 py-3 text-right font-bold text-gray-900">₹{c.spent.toLocaleString('en-IN')}</td>
                          <td className="px-5 py-3 text-xs text-gray-500">{c.joined}</td>
                          <td className="px-5 py-3 text-center">
                            <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={STATUS_COLORS[c.status]}>
                              {c.status}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <button
                              onClick={() => toggleCustomer(c.id)}
                              className="text-[10px] font-semibold hover:underline"
                              style={{ color: c.status === 'Active' ? '#DC2626' : '#059669' }}
                            >
                              {c.status === 'Active' ? 'Block' : 'Unblock'}
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

          {!['dashboard', 'vendors', 'customers', 'orders', 'returns'].includes(activeSection) && (
            <div className="bg-white rounded-2xl p-10 text-center fade-in shadow-sm">
              <div className="text-6xl mb-4">
                {ADMIN_NAV.find(n => n.id === activeSection)?.icon}
              </div>
              <div className="font-black text-gray-800 text-xl mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {ADMIN_NAV.find(n => n.id === activeSection)?.label}
              </div>
              <div className="text-gray-500 text-sm max-w-sm mx-auto">
                {activeSection === 'products' ? 'Catalog moderation, pricing audits and listing quality reports live here.' :
                 activeSection === 'categories' ? 'Manage category trees, attributes and commission slabs per category.' :
                 activeSection === 'payments' ? 'Settlement runs, payment failures and payout reconciliation dashboards.' :
                 activeSection === 'delivery' ? 'Courier partners, zone-wise SLA and shipment monitoring.' :
                 activeSection === 'coupons' ? 'Create and schedule platform-wide coupon campaigns.' :
                 activeSection === 'banners' ? 'Upload and A/B test home page banners and creatives.' :
                 activeSection === 'analytics' ? 'Funnel, cohort and retention analytics with export.' :
                 activeSection === 'reports' ? 'Downloadable MIS reports — daily, weekly and monthly.' :
                 activeSection === 'support' ? 'Ticket queue, SLA tracking and customer chat transcripts.' :
                 'Platform configuration, roles and permissions.'}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
