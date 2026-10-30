import { useState } from 'react'
import { demoOrders, indianStates } from '../data/products'
import type { AppState, Address } from '../types'

const PRIMARY = '#7C3AED'

const STATUS_COLORS: Record<string, string> = {
  Placed: '#F59E0B',
  Processing: '#F59E0B',
  Shipped: '#3B82F6',
  'Out for Delivery': '#8B5CF6',
  Delivered: '#10B981',
  Returned: '#EF4444',
}

const MENU = [
  { id: 'orders', icon: '📦', label: 'My Orders' },
  { id: 'profile', icon: '👤', label: 'My Profile' },
  { id: 'wishlist', icon: '❤️', label: 'Wishlist' },
  { id: 'addresses', icon: '📍', label: 'Saved Addresses' },
  { id: 'payments', icon: '💳', label: 'Payment Methods' },
  { id: 'coupons', icon: '🎟', label: 'My Coupons' },
  { id: 'notifications', icon: '🔔', label: 'Notifications' },
  { id: 'returns', icon: '↩️', label: 'Returns & Refunds' },
  { id: 'help', icon: '🆘', label: 'Help Center' },
  { id: 'settings', icon: '⚙️', label: 'Account Settings' },
]

const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'sa1', type: 'Home', name: 'Rohit Mehta', phone: '+91 98765 43210',
    line1: 'B-204, Sunrise Apartments', line2: 'Near S.G. Highway, Bodakdev',
    city: 'Ahmedabad', state: 'Gujarat', pin: '380054',
  },
  {
    id: 'sa2', type: 'Work', name: 'Rohit Mehta', phone: '+91 98765 43210',
    line1: 'Office No. 512, Trade Centre', line2: 'Nariman Point',
    city: 'Mumbai', state: 'Maharashtra', pin: '400021',
  },
]

const NOTIFICATIONS = [
  { id: 1, icon: '📦', title: 'Order shipped!', text: 'Your order BC-2026-847291 has been shipped.', time: '2 hours ago', unread: true },
  { id: 2, icon: '🎟', title: 'New coupon for you', text: 'Use SAVE20 for 20% OFF up to ₹200 on your next order.', time: 'Yesterday', unread: true },
  { id: 3, icon: '📉', title: 'Price drop alert', text: 'ProSound Earbuds are now ₹200 cheaper than your wishlist price.', time: '2 days ago', unread: true },
  { id: 4, icon: '⭐', title: 'Rate your purchase', text: 'How was your ProSound True Wireless Earbuds? Share a review.', time: '3 days ago', unread: false },
  { id: 5, icon: '💳', title: 'Payment successful', text: 'Your order BC-2026-821033 was paid via Google Pay.', time: '6 days ago', unread: false },
]

const PAYMENTS = [
  { id: 'p1', type: 'UPI', detail: 'rohit.mehta@okaxis', icon: '🟢', default: true },
  { id: 'p2', type: 'Card', detail: 'HDFC Credit Card •••• 4821', icon: '💳', default: false },
  { id: 'p3', type: 'Card', detail: 'SBI Debit Card •••• 9034', icon: '💳', default: false },
]

const FAQS = [
  { q: 'How do I track my order?', a: 'Go to My Orders and tap "Track" on any order. You will see a live timeline with delivery updates, or open the tracking page from the order confirmation email.' },
  { q: 'What is the return policy?', a: 'You can raise a return within 7 days of delivery for most products. Go to Returns & Refunds, select the order and reason, and we will arrange a pickup within 48 hours.' },
  { q: 'When will I get my refund?', a: 'Refunds are processed within 3-5 business days after the returned product passes quality check. The amount goes back to your original payment method.' },
  { q: 'How do I cancel an order?', a: 'Orders can be cancelled from My Orders before they are shipped. Once shipped, you can refuse delivery or raise a return after it is delivered.' },
  { q: 'Is Cash on Delivery available?', a: 'Yes, COD is available on most products for a small fee of ₹25. You can select it at checkout.' },
]

interface OrderRow {
  id: string
  date: string
  product: string
  image: string
  price: number
  status: string
  seller: string
  quantity: number
}

export default function AccountPage({ navigate, isLoggedIn, logout, orders, wishlist, coupon, showToast }: AppState) {
  const [activeTab, setActiveTab] = useState('orders')
  const [statusFilter, setStatusFilter] = useState('All')

  const historyRows: OrderRow[] = orders.map(o => ({
    id: o.id,
    date: o.date,
    product: o.items[0]?.product.name ?? 'Order',
    image: o.items[0]?.product.image ?? '',
    price: o.total,
    status: o.status,
    seller: o.items[0]?.product.seller ?? '',
    quantity: o.items.reduce((s, i) => s + i.quantity, 0),
  }))

  const demoRows: OrderRow[] = demoOrders.map(d => ({ ...d, quantity: d.quantity }))
  const allOrders = [...historyRows, ...demoRows]
  const filteredOrders = statusFilter === 'All' ? allOrders : allOrders.filter(o => o.status === statusFilter)

  const orderCount = allOrders.length
  const orderStatuses = ['All', 'Placed', 'Shipped', 'Delivered', 'Returned', 'Processing', 'Out for Delivery']

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-xl font-black text-gray-900 mb-5" style={{ fontFamily: "'Outfit', sans-serif" }}>
        My Account
      </h1>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* ── Sidebar ── */}
        <div className="lg:w-64 shrink-0">
          {/* Profile card */}
          <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-black"
                style={{ background: `linear-gradient(135deg, ${PRIMARY}, #EC4899)` }}
              >
                R
              </div>
              <div>
                <div className="font-black text-gray-900">Rohit Mehta</div>
                <div className="text-xs text-gray-500">rohit.mehta@gmail.com</div>
                <div className="text-xs text-gray-500">+91 98765 43210</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
              <div className="text-center">
                <div className="font-black text-gray-900 text-lg">{orderCount}</div>
                <div className="text-[10px] text-gray-500">Orders</div>
              </div>
              <div className="text-center border-x border-gray-100">
                <div className="font-black text-gray-900 text-lg">{wishlist.length}</div>
                <div className="text-[10px] text-gray-500">Wishlist</div>
              </div>
              <div className="text-center">
                <div className="font-black text-gray-900 text-lg">2</div>
                <div className="text-[10px] text-gray-500">Reviews</div>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {MENU.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'wishlist') navigate('wishlist')
                  else setActiveTab(item.id)
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b border-gray-50 last:border-0"
                style={{
                  backgroundColor: activeTab === item.id ? '#EDE9FE' : 'transparent',
                  color: activeTab === item.id ? PRIMARY : '#4B5563',
                  fontWeight: activeTab === item.id ? 600 : 400,
                }}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
                {item.id === 'notifications' && (
                  <span className="ml-auto text-[10px] font-bold bg-pink-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
                    {NOTIFICATIONS.filter(n => n.unread).length}
                  </span>
                )}
                <span className="ml-auto text-gray-300 text-xs">›</span>
              </button>
            ))}
            <button
              onClick={() => { logout(); showToast('Logged out, see you soon! 👋') }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex-1 min-w-0">
          {activeTab === 'orders' && (
            <div className="space-y-4 fade-in">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h2 className="font-bold text-gray-800">My Orders ({filteredOrders.length})</h2>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="text-xs text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg bg-white outline-none cursor-pointer"
                >
                  {orderStatuses.map(s => <option key={s} value={s}>{s === 'All' ? 'Filter by Status: All' : s}</option>)}
                </select>
              </div>
              {filteredOrders.length === 0 && (
                <div className="bg-white rounded-2xl p-10 text-center text-gray-500 text-sm shadow-sm">
                  No {statusFilter !== 'All' ? statusFilter.toLowerCase() : ''} orders found
                </div>
              )}
              {filteredOrders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                    <span className="font-mono font-bold text-gray-700">{order.id}</span>
                    <span>{order.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src={order.image} alt={order.product} className="w-16 h-16 rounded-xl object-cover bg-gray-100 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-800 line-clamp-2">{order.product}</div>
                      <div className="text-xs text-gray-500 mt-0.5">Seller: {order.seller}</div>
                      <div className="text-sm font-bold text-gray-900 mt-1">
                        ₹{order.price.toLocaleString('en-IN')}
                        {order.quantity > 1 && <span className="text-xs text-gray-400 font-medium"> ×{order.quantity}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_COLORS[order.status] ?? '#6B7280' }} />
                      <span className="text-xs font-semibold" style={{ color: STATUS_COLORS[order.status] ?? '#6B7280' }}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate('tracking')}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg border-2 transition-colors hover:bg-purple-50"
                        style={{ borderColor: PRIMARY, color: PRIMARY }}
                      >
                        Track
                      </button>
                      {order.status === 'Delivered' && (
                        <button
                          onClick={() => setActiveTab('returns')}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                          Return
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'profile' && <ProfileTab showToast={showToast} />}
          {activeTab === 'addresses' && <AddressesTab showToast={showToast} />}
          {activeTab === 'payments' && <PaymentsTab showToast={showToast} />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'help' && <HelpTab />}
          {activeTab === 'settings' && <SettingsTab showToast={showToast} />}

          {activeTab === 'returns' && (
            <div className="bg-white rounded-2xl p-5 shadow-sm fade-in">
              <h2 className="font-bold text-gray-800 mb-4">Return Request</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Select Order</label>
                  <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none bg-white">
                    {demoOrders.filter(o => o.status === 'Delivered').map(o => (
                      <option key={o.id} value={o.id}>{o.id} — {o.product.slice(0, 40)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Reason for Return</label>
                  {['Wrong product received', 'Damaged product', 'Size issue', 'Quality issue', 'Product not as described', 'Other'].map(reason => (
                    <label key={reason} className="flex items-center gap-2 py-1.5 cursor-pointer">
                      <input type="radio" name="return-reason" className="accent-purple-600" />
                      <span className="text-sm text-gray-700">{reason}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Description (optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us more about the issue..."
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500 resize-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Upload Photos (optional)</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-purple-300 cursor-pointer">
                    <div className="text-3xl mb-2">📷</div>
                    <div className="text-sm text-gray-500">Click to upload photos</div>
                    <div className="text-xs text-gray-400 mt-1">Max 5 photos, 5MB each</div>
                  </div>
                </div>
                <button
                  onClick={() => showToast('Return request submitted! We will pick up the item within 48 hrs')}
                  className="w-full py-3 text-white font-bold rounded-xl text-sm"
                  style={{ backgroundColor: PRIMARY }}
                >
                  Submit Return Request
                </button>
              </div>
            </div>
          )}

          {activeTab === 'coupons' && (
            <div className="fade-in">
              <h2 className="font-bold text-gray-800 mb-4">My Coupons</h2>
              <div className="space-y-3">
                {[
                  { code: 'WELCOME100', label: '₹100 OFF', valid: true, expiry: '31 Aug 2026' },
                  { code: 'SAVE20', label: '20% OFF up to ₹200', valid: true, expiry: '31 Dec 2026' },
                  { code: 'UPIBONUS', label: '₹50 OFF on UPI', valid: true, expiry: '30 Sep 2026' },
                  { code: 'FASHION30', label: '30% OFF on Fashion', valid: false, expiry: 'Expired' },
                ].map(c => (
                  <div
                    key={c.code}
                    className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4"
                    style={{ opacity: c.valid ? 1 : 0.5 }}
                  >
                    <div className="text-3xl">🎟</div>
                    <div className="flex-1">
                      <div className="font-black text-sm font-mono tracking-wider" style={{ color: PRIMARY }}>{c.code}</div>
                      <div className="text-sm text-gray-700 mt-0.5">{c.label}</div>
                      <div className="text-xs text-gray-400 mt-0.5">Valid till: {c.expiry}</div>
                    </div>
                    {c.valid && (
                      <button
                        onClick={() => { navigate('cart'); showToast(`${c.code} is ready to apply in your cart`) }}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg text-white"
                        style={{ backgroundColor: PRIMARY }}
                      >
                        Use Now
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Tab components ── */

function ProfileTab({ showToast }: { showToast: (m: string) => void }) {
  const [saved, setSaved] = useState(false)
  const fields = [
    { label: 'Full Name', value: 'Rohit Mehta' },
    { label: 'Email Address', value: 'rohit.mehta@gmail.com' },
    { label: 'Mobile Number', value: '+91 98765 43210' },
    { label: 'Date of Birth', value: '15 March 1992' },
    { label: 'Gender', value: 'Male' },
  ]
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm fade-in">
      <h2 className="font-bold text-gray-800 mb-5">Personal Information</h2>
      <div className="space-y-4">
        {fields.map(field => (
          <div key={field.label} className="flex items-center gap-4">
            <label className="text-sm text-gray-500 w-36 shrink-0">{field.label}</label>
            <input
              defaultValue={field.value}
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500"
            />
          </div>
        ))}
        {saved && (
          <div className="text-sm text-green-600 font-semibold flex items-center gap-1.5 fade-in">
            <span>✓</span> Profile updated successfully
          </div>
        )}
        <button
          onClick={() => { setSaved(true); showToast('Profile saved') }}
          className="mt-4 text-white font-semibold px-8 py-2.5 rounded-xl text-sm"
          style={{ backgroundColor: PRIMARY }}
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

function AddressesTab({ showToast }: { showToast: (m: string) => void }) {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', line1: '', line2: '', pin: '', city: '', state: '' })

  const addAddress = () => {
    if (!form.name || !form.line1 || form.pin.length !== 6 || !form.city || !form.state) {
      showToast('Please fill in all required fields')
      return
    }
    setAddresses(prev => [...prev, { id: `sa${Date.now()}`, type: 'Home', name: form.name, phone: form.phone, line1: form.line1, line2: form.line2, pin: form.pin, city: form.city, state: form.state }])
    setForm({ name: '', phone: '', line1: '', line2: '', pin: '', city: '', state: '' })
    setShowForm(false)
    showToast('Address added')
  }

  return (
    <div className="space-y-4 fade-in">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-800">Saved Addresses ({addresses.length})</h2>
        <button
          onClick={() => setShowForm(s => !s)}
          className="text-xs font-bold px-3 py-1.5 rounded-lg text-white"
          style={{ backgroundColor: PRIMARY }}
        >
          + Add Address
        </button>
      </div>
      {addresses.map(a => (
        <div key={a.id} className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{a.type}</span>
            <span className="font-semibold text-gray-800 text-sm">{a.name}</span>
            <span className="text-xs text-gray-500">{a.phone}</span>
            <span className="ml-auto text-[10px] text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">✓ Default</span>
          </div>
          <div className="text-sm text-gray-600">{a.line1}, {a.line2}, {a.city}, {a.state} — {a.pin}</div>
          <div className="mt-3 flex gap-2">
            <button className="text-xs font-semibold underline" style={{ color: PRIMARY }}>Edit</button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => { setAddresses(prev => prev.filter(x => x.id !== a.id)); showToast('Address deleted') }}
              className="text-xs text-red-500 font-semibold hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {showForm && (
        <div className="bg-white rounded-2xl p-4 shadow-sm grid grid-cols-2 gap-3">
          <input placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500 col-span-2" />
          <input placeholder="Mobile Number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500" />
          <input placeholder="PIN Code" maxLength={6} value={form.pin} onChange={e => setForm(f => ({ ...f, pin: e.target.value.replace(/\D/g, '') }))} className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500" />
          <input placeholder="House / Flat / Floor" value={form.line1} onChange={e => setForm(f => ({ ...f, line1: e.target.value }))} className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500 col-span-2" />
          <input placeholder="Street / Area" value={form.line2} onChange={e => setForm(f => ({ ...f, line2: e.target.value }))} className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500 col-span-2" />
          <input placeholder="City" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500" />
          <select value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none bg-white text-gray-700">
            <option value="">Select State</option>
            {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="col-span-2 flex gap-2">
            <button onClick={() => setShowForm(false)} className="flex-1 py-2 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50">Cancel</button>
            <button onClick={addAddress} className="flex-1 py-2 text-sm font-semibold text-white rounded-xl" style={{ backgroundColor: PRIMARY }}>Save Address</button>
          </div>
        </div>
      )}
    </div>
  )
}

function PaymentsTab({ showToast }: { showToast: (m: string) => void }) {
  const [payments, setPayments] = useState(PAYMENTS)
  const [showAdd, setShowAdd] = useState(false)
  const [newUpi, setNewUpi] = useState('')

  const addUpi = () => {
    if (!newUpi.includes('@')) { showToast('Enter a valid UPI ID'); return }
    setPayments(prev => [...prev, { id: `p${Date.now()}`, type: 'UPI', detail: newUpi, icon: '🟢', default: false }])
    setNewUpi('')
    setShowAdd(false)
    showToast('UPI ID added')
  }

  return (
    <div className="space-y-4 fade-in">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-800">Payment Methods</h2>
        <button
          onClick={() => setShowAdd(s => !s)}
          className="text-xs font-bold px-3 py-1.5 rounded-lg text-white"
          style={{ backgroundColor: PRIMARY }}
        >
          + Add Method
        </button>
      </div>
      {payments.map(p => (
        <div key={p.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <span className="text-2xl">{p.icon}</span>
          <div className="flex-1">
            <div className="font-semibold text-gray-800 text-sm">{p.type} {p.default && <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full ml-1">DEFAULT</span>}</div>
            <div className="text-xs text-gray-500">{p.detail}</div>
          </div>
          <button
            onClick={() => { setPayments(prev => prev.filter(x => x.id !== p.id)); showToast('Payment method removed') }}
            className="text-xs text-red-500 font-semibold hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
      {showAdd && (
        <div className="bg-white rounded-2xl p-4 shadow-sm flex gap-2">
          <input
            placeholder="Enter UPI ID (name@bank)"
            value={newUpi}
            onChange={e => setNewUpi(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500"
          />
          <button onClick={addUpi} className="px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: PRIMARY }}>Add</button>
        </div>
      )}
      <div className="bg-white rounded-2xl p-4 shadow-sm text-xs text-gray-500">
        🔒 Your payment details are stored securely with 256-bit encryption. We never share your card or UPI details.
      </div>
    </div>
  )
}

function NotificationsTab() {
  const [items, setItems] = useState(NOTIFICATIONS)
  const unread = items.filter(n => n.unread).length
  return (
    <div className="space-y-4 fade-in">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-800">Notifications {unread > 0 && <span className="text-xs text-pink-600 font-bold ml-1">({unread} new)</span>}</h2>
        {unread > 0 && (
          <button
            onClick={() => setItems(prev => prev.map(n => ({ ...n, unread: false })))}
            className="text-xs font-semibold hover:underline"
            style={{ color: PRIMARY }}
          >
            Mark all as read
          </button>
        )}
      </div>
      {items.map(n => (
        <div
          key={n.id}
          className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-3"
          style={{ borderLeft: n.unread ? '3px solid #EC4899' : '3px solid transparent' }}
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-lg shrink-0">{n.icon}</div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-800">{n.title}</div>
            <div className="text-xs text-gray-500 mt-0.5">{n.text}</div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="text-[10px] text-gray-400">{n.time}</span>
            {n.unread && <span className="w-2 h-2 rounded-full bg-pink-500" />}
          </div>
        </div>
      ))}
    </div>
  )
}

function HelpTab() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="space-y-4 fade-in">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-gray-800 mb-3">How can we help?</h2>
        <div className="flex gap-3 flex-wrap">
          {[
            { icon: '📦', label: 'Track Order', action: 'tracking' },
            { icon: '↩️', label: 'Returns', action: 'returns' },
            { icon: '💬', label: 'Chat with us', action: 'chat' },
            { icon: '📞', label: 'Call 1800-123-4567', action: 'call' },
          ].map((c, i) => (
            <button key={c.label} className="flex-1 min-w-32 bg-purple-50 rounded-xl p-3 text-center hover:bg-purple-100 transition-colors">
              <div className="text-2xl mb-1">{c.icon}</div>
              <div className="text-xs font-semibold text-gray-700">{c.label}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-gray-800 mb-3">Frequently Asked Questions</h2>
        <div className="divide-y divide-gray-50">
          {FAQS.map((f, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-3 text-sm font-semibold text-gray-800 text-left"
              >
                {f.q}
                <span className="text-gray-400 text-xs">{open === i ? '▲' : '▼'}</span>
              </button>
              {open === i && <div className="pb-3 text-xs text-gray-500 leading-relaxed">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SettingsTab({ showToast }: { showToast: (m: string) => void }) {
  const [emailNotif, setEmailNotif] = useState(true)
  const [smsNotif, setSmsNotif] = useState(true)
  const [whatsapp, setWhatsapp] = useState(false)

  return (
    <div className="space-y-4 fade-in">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-gray-800 mb-4">Notifications</h2>
        {[
          { label: 'Email notifications', desc: 'Order updates, offers & newsletters', value: emailNotif, set: setEmailNotif },
          { label: 'SMS notifications', desc: 'Delivery alerts & OTPs', value: smsNotif, set: setSmsNotif },
          { label: 'WhatsApp updates', desc: 'Order & offer updates on WhatsApp', value: whatsapp, set: setWhatsapp },
        ].map(t => (
          <div key={t.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div>
              <div className="text-sm font-semibold text-gray-800">{t.label}</div>
              <div className="text-xs text-gray-500">{t.desc}</div>
            </div>
            <button
              onClick={() => t.set(!t.value)}
              className="w-11 h-6 rounded-full transition-colors relative"
              style={{ backgroundColor: t.value ? PRIMARY : '#D1D5DB' }}
            >
              <span
                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                style={{ left: t.value ? 22 : 2 }}
              />
            </button>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-gray-800 mb-4">Change Password</h2>
        {['Current Password', 'New Password', 'Confirm New Password'].map(f => (
          <input key={f} type="password" placeholder={f} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500 mb-3" />
        ))}
        <button
          onClick={() => showToast('Password changed successfully')}
          className="text-white font-semibold px-8 py-2.5 rounded-xl text-sm"
          style={{ backgroundColor: PRIMARY }}
        >
          Update Password
        </button>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-gray-800 mb-2">Account Actions</h2>
        <button onClick={() => showToast('This feature is available on the BharatCart app')} className="text-xs font-semibold text-red-500 hover:underline">
          Deactivate Account
        </button>
      </div>
    </div>
  )
}
