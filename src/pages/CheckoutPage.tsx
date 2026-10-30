import { useState } from 'react'
import { indianStates } from '../data/products'
import type { AppState, Address } from '../types'

const PRIMARY = '#7C3AED'
const COD_FEE = 25

const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'a1',
    type: 'Home',
    name: 'Rohit Mehta',
    phone: '+91 98765 43210',
    line1: 'B-204, Sunrise Apartments',
    line2: 'Near S.G. Highway, Bodakdev',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pin: '380054',
  },
  {
    id: 'a2',
    type: 'Work',
    name: 'Rohit Mehta',
    phone: '+91 98765 43210',
    line1: 'Office No. 512, Trade Centre',
    line2: 'Nariman Point',
    city: 'Mumbai',
    state: 'Maharashtra',
    pin: '400021',
  },
]

const UPI_OPTIONS = [
  { id: 'gpay', name: 'Google Pay', icon: '🟢' },
  { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
  { id: 'paytm', name: 'Paytm', icon: '🔵' },
  { id: 'other', name: 'Other UPI ID', icon: '📱' },
]

const PAYMENT_METHODS = [
  { id: 'upi', icon: '📱', label: 'UPI' },
  { id: 'card', icon: '💳', label: 'Credit / Debit Card' },
  { id: 'netbanking', icon: '🏦', label: 'Net Banking' },
  { id: 'wallet', icon: '👛', label: 'Wallets' },
  { id: 'cod', icon: '💵', label: 'Cash on Delivery' },
]

const addDays = (n: number) => {
  const d = new Date(Date.now() + n * 24 * 60 * 60 * 1000)
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

export default function CheckoutPage({ cart, navigate, coupon, placeOrder, showToast }: AppState) {
  const [step, setStep] = useState(1)
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES)
  const [selectedAddress, setSelectedAddress] = useState('a1')
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [selectedUPI, setSelectedUPI] = useState('gpay')
  const [upiId, setUpiId] = useState('')
  const [processing, setProcessing] = useState(false)

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const delivery = subtotal > 499 ? 0 : 49
  const couponDiscount = coupon
    ? coupon.type === 'flat'
      ? coupon.discount
      : Math.min(coupon.maxDiscount ?? 9999, Math.floor((subtotal * coupon.discount) / 100))
    : 0
  const codFee = paymentMethod === 'cod' ? COD_FEE : 0
  const total = subtotal + delivery - couponDiscount + codFee

  const currentAddress = addresses.find(a => a.id === selectedAddress)

  const handlePay = () => {
    if (!currentAddress) return
    setProcessing(true)
    setTimeout(() => {
      placeOrder(currentAddress, paymentMethod)
      setProcessing(false)
      navigate('success')
    }, 1800)
  }

  const saveAddress = (addr: Address) => {
    setAddresses(prev => {
      const exists = prev.find(a => a.id === addr.id)
      if (exists) return prev.map(a => (a.id === addr.id ? addr : a))
      return [...prev, addr]
    })
    setSelectedAddress(addr.id)
    setShowAddressForm(false)
    setEditingAddress(null)
    showToast('Address saved')
  }

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id))
    if (selectedAddress === id) {
      const remaining = addresses.filter(a => a.id !== id)
      if (remaining.length > 0) setSelectedAddress(remaining[0].id)
    }
    showToast('Address deleted')
  }

  const steps = [
    { n: 1, label: 'Address' },
    { n: 2, label: 'Delivery' },
    { n: 3, label: 'Payment' },
  ]

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-8xl mb-5">🛒</div>
        <h2 className="text-2xl font-black text-gray-800 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Add some products to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigate('home')}
          className="text-white font-semibold px-8 py-3 rounded-xl"
          style={{ backgroundColor: PRIMARY }}
        >
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-0 mb-8">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center">
            <button
              onClick={() => s.n < step && setStep(s.n)}
              className="flex items-center gap-2"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                style={{
                  backgroundColor: step >= s.n ? PRIMARY : '#E5E7EB',
                  color: step >= s.n ? 'white' : '#9CA3AF',
                }}
              >
                {step > s.n ? '✓' : s.n}
              </div>
              <span
                className="text-sm font-semibold hidden sm:block"
                style={{ color: step >= s.n ? PRIMARY : '#9CA3AF' }}
              >
                {s.label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <div
                className="h-0.5 w-12 sm:w-20 mx-2 transition-colors"
                style={{ backgroundColor: step > s.n ? PRIMARY : '#E5E7EB' }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* ── Main content ── */}
        <div className="flex-1">
          {/* Step 1: Address */}
          {step === 1 && (
            <div className="space-y-4 fade-in">
              <h2 className="font-black text-gray-900 text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Select Delivery Address
              </h2>
              {addresses.map(addr => (
                <label
                  key={addr.id}
                  className="flex items-start gap-3 bg-white rounded-2xl p-4 cursor-pointer border-2 transition-all"
                  style={{ borderColor: selectedAddress === addr.id ? PRIMARY : 'transparent' }}
                >
                  <input
                    type="radio"
                    name="address"
                    value={addr.id}
                    checked={selectedAddress === addr.id}
                    onChange={() => setSelectedAddress(addr.id)}
                    className="mt-1 accent-purple-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{addr.type}</span>
                      <span className="font-semibold text-gray-800 text-sm">{addr.name}</span>
                      <span className="text-xs text-gray-500">{addr.phone}</span>
                    </div>
                    <div className="text-sm text-gray-600 leading-relaxed">
                      {addr.line1}, {addr.line2}, {addr.city}, {addr.state} — {addr.pin}
                    </div>
                    {selectedAddress === addr.id && (
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={e => { e.preventDefault(); setEditingAddress(addr); setShowAddressForm(true) }}
                          className="text-xs font-semibold underline"
                          style={{ color: PRIMARY }}
                        >
                          Edit
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={e => { e.preventDefault(); deleteAddress(addr.id) }}
                          className="text-xs text-red-500 font-semibold hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </label>
              ))}

              {showAddressForm ? (
                <AddressForm
                  initial={editingAddress}
                  onCancel={() => { setShowAddressForm(false); setEditingAddress(null) }}
                  onSave={saveAddress}
                />
              ) : (
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-sm font-semibold hover:border-purple-300 hover:bg-purple-50 transition-all"
                  style={{ color: PRIMARY }}
                >
                  + Add New Address
                </button>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={!currentAddress}
                className="w-full h-12 rounded-xl text-white font-bold text-sm disabled:opacity-50"
                style={{ backgroundColor: PRIMARY }}
              >
                Deliver Here →
              </button>
            </div>
          )}

          {/* Step 2: Delivery */}
          {step === 2 && (
            <div className="space-y-4 fade-in">
              <h2 className="font-black text-gray-900 text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Delivery Options
              </h2>

              {Object.entries(
                cart.reduce<Record<string, typeof cart>>((acc, i) => {
                  if (!acc[i.product.seller]) acc[i.product.seller] = []
                  acc[i.product.seller].push(i)
                  return acc
                }, {})
              ).map(([seller, items]) => (
                <div key={seller} className="bg-white rounded-2xl p-4">
                  <div className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span>🏪</span> Shipment from <span style={{ color: PRIMARY }}>{seller}</span>
                  </div>
                  {items.map(item => (
                    <div key={`${item.product.id}-${item.color}-${item.size}`} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-gray-700 line-clamp-1">{item.product.name}</div>
                        <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-sm font-bold text-gray-900">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</div>
                    </div>
                  ))}
                  <div className="mt-3 bg-green-50 rounded-xl p-3 flex items-center gap-3">
                    <span className="text-green-600 text-lg">📅</span>
                    <div>
                      <div className="text-xs font-bold text-green-700">Estimated Delivery: {addDays(5)}</div>
                      <div className="text-xs text-green-600">{items.every(i => i.product.freeDelivery) ? 'Free Delivery' : 'Delivery fee applies'}</div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setStep(3)}
                className="w-full h-12 rounded-xl text-white font-bold text-sm"
                style={{ backgroundColor: PRIMARY }}
              >
                Confirm Delivery →
              </button>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-4 fade-in">
              <h2 className="font-black text-gray-900 text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Payment Method
              </h2>

              <div className="bg-white rounded-2xl overflow-hidden">
                {PAYMENT_METHODS.map(pm => (
                  <div key={pm.id}>
                    <label
                      className="flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-gray-50 border-b border-gray-50 last:border-0"
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={pm.id}
                        checked={paymentMethod === pm.id}
                        onChange={() => setPaymentMethod(pm.id)}
                        className="accent-purple-600"
                      />
                      <span className="text-lg">{pm.icon}</span>
                      <span className="font-medium text-gray-800 text-sm">{pm.label}</span>
                      {pm.id === 'cod' && (
                        <span className="ml-auto text-xs bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-full">+ ₹25 fee</span>
                      )}
                    </label>

                    {/* UPI sub-options */}
                    {paymentMethod === 'upi' && pm.id === 'upi' && (
                      <div className="bg-purple-50 px-4 py-3 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          {UPI_OPTIONS.map(u => (
                            <label
                              key={u.id}
                              className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 cursor-pointer border-2 transition-all"
                              style={{ borderColor: selectedUPI === u.id ? PRIMARY : '#E5E7EB' }}
                            >
                              <input
                                type="radio"
                                name="upi"
                                value={u.id}
                                checked={selectedUPI === u.id}
                                onChange={() => setSelectedUPI(u.id)}
                                className="accent-purple-600"
                              />
                              <span>{u.icon}</span>
                              <span className="text-xs font-medium text-gray-700">{u.name}</span>
                            </label>
                          ))}
                        </div>
                        {selectedUPI === 'other' && (
                          <input
                            type="text"
                            value={upiId}
                            onChange={e => setUpiId(e.target.value)}
                            placeholder="Enter UPI ID (e.g. name@okaxis)"
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500"
                          />
                        )}
                      </div>
                    )}

                    {/* Card details */}
                    {paymentMethod === 'card' && pm.id === 'card' && (
                      <div className="bg-purple-50 px-4 py-3 space-y-2">
                        <input placeholder="Card Number" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500" />
                        <div className="grid grid-cols-2 gap-2">
                          <input placeholder="MM/YY" className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500" />
                          <input placeholder="CVV" type="password" className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500" />
                        </div>
                        <input placeholder="Cardholder Name" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500" />
                      </div>
                    )}

                    {/* Net banking */}
                    {paymentMethod === 'netbanking' && pm.id === 'netbanking' && (
                      <div className="bg-purple-50 px-4 py-3">
                        <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none bg-white text-gray-700">
                          <option>Select your bank</option>
                          <option>State Bank of India</option>
                          <option>HDFC Bank</option>
                          <option>ICICI Bank</option>
                          <option>Axis Bank</option>
                          <option>Punjab National Bank</option>
                          <option>Bank of Baroda</option>
                        </select>
                      </div>
                    )}

                    {/* Wallet */}
                    {paymentMethod === 'wallet' && pm.id === 'wallet' && (
                      <div className="bg-purple-50 px-4 py-3 grid grid-cols-2 gap-2">
                        {['Paytm Wallet', 'Amazon Pay', 'Mobikwik', 'Freecharge'].map(w => (
                          <label key={w} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 cursor-pointer">
                            <input type="radio" name="wallet" className="accent-purple-600" />
                            <span className="text-xs font-medium text-gray-700">{w}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {/* COD confirmation */}
                    {paymentMethod === 'cod' && pm.id === 'cod' && (
                      <div className="bg-amber-50 px-4 py-3">
                        <div className="text-xs text-amber-700 flex items-start gap-2">
                          <span>⚠️</span>
                          <span>A non-refundable COD fee of ₹25 will be charged. Please keep exact change ready for the delivery partner.</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handlePay}
                disabled={processing}
                className="w-full h-12 rounded-xl text-white font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                style={{ backgroundColor: PRIMARY }}
              >
                {processing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  `Pay ₹${total.toLocaleString('en-IN')} →`
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <span>🔒</span>
                <span>256-bit SSL encrypted · Powered by RazorPay</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Order Summary sidebar ── */}
        <div className="lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl p-4 sticky top-24">
            <h3 className="font-bold text-gray-800 mb-3 text-sm">Order Summary</h3>

            {/* Delivery address */}
            {currentAddress && (
              <div className="bg-purple-50 rounded-xl p-3 mb-4">
                <div className="text-xs font-bold text-gray-700 mb-1">📍 Delivering to {currentAddress.type}</div>
                <div className="text-xs text-gray-600">
                  {currentAddress.name} · {currentAddress.city}, {currentAddress.state} {currentAddress.pin}
                </div>
              </div>
            )}

            {/* Items */}
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {cart.map(item => (
                <div key={`${item.product.id}-${item.color}-${item.size}`} className="flex items-center gap-2">
                  <img src={item.product.image} alt={item.product.name} className="w-9 h-9 rounded-lg object-cover bg-gray-100 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-gray-700 truncate">{item.product.name}</div>
                    <div className="text-[11px] text-gray-500">×{item.quantity}</div>
                  </div>
                  <div className="text-xs font-semibold text-gray-900 shrink-0">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-green-600 font-medium">
                <span>Delivery</span><span>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
              </div>
              {coupon && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Coupon ({coupon.code})</span><span>−₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              {codFee > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>COD Fee</span><span>₹{codFee}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-gray-900 text-sm border-t border-gray-100 pt-2 mt-1">
                <span>Total</span><span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AddressForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: Address | null
  onCancel: () => void
  onSave: (a: Address) => void
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    phone: initial?.phone ?? '',
    line1: initial?.line1 ?? '',
    line2: initial?.line2 ?? '',
    pin: initial?.pin ?? '',
    city: initial?.city ?? '',
    state: initial?.state ?? '',
    type: initial?.type ?? 'Home',
  })
  const [error, setError] = useState('')

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }))

  const submit = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.line1.trim() || !form.line2.trim() || !form.pin.trim() || !form.city.trim() || !form.state) {
      setError('Please fill in all the fields')
      return
    }
    if (form.pin.length !== 6 || !/^\d{6}$/.test(form.pin)) {
      setError('PIN code must be 6 digits')
      return
    }
    onSave({
      id: initial?.id ?? `a${Date.now()}`,
      type: form.type as Address['type'],
      name: form.name.trim(),
      phone: form.phone.trim(),
      line1: form.line1.trim(),
      line2: form.line2.trim(),
      city: form.city.trim(),
      state: form.state,
      pin: form.pin.trim(),
    })
  }

  return (
    <div className="bg-white rounded-2xl p-4 space-y-3">
      <h3 className="font-semibold text-gray-800 text-sm">{initial ? 'Edit Address' : 'Add New Address'}</h3>
      <div className="grid grid-cols-2 gap-3">
        <input
          placeholder="Full Name"
          value={form.name}
          onChange={e => set('name', e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500 col-span-2"
        />
        <input
          placeholder="Mobile Number (+91)"
          value={form.phone}
          onChange={e => set('phone', e.target.value.replace(/[^\d+\s]/g, ''))}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500"
        />
        <input
          placeholder="Alternate Number"
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500"
        />
        <input
          placeholder="House / Flat / Floor"
          value={form.line1}
          onChange={e => set('line1', e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500 col-span-2"
        />
        <input
          placeholder="Street / Area / Colony"
          value={form.line2}
          onChange={e => set('line2', e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500 col-span-2"
        />
        <input
          placeholder="PIN Code"
          maxLength={6}
          value={form.pin}
          onChange={e => set('pin', e.target.value.replace(/\D/g, ''))}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500"
        />
        <input
          placeholder="City"
          value={form.city}
          onChange={e => set('city', e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500"
        />
        <select
          value={form.state}
          onChange={e => set('state', e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500 col-span-2 bg-white text-gray-700"
        >
          <option value="">Select State</option>
          {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="flex gap-3">
        {(['Home', 'Work', 'Other'] as const).map(t => (
          <label key={t} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="addrtype"
              checked={form.type === t}
              onChange={() => set('type', t)}
              className="accent-purple-600"
            />
            <span className="text-xs font-medium">{t}</span>
          </label>
        ))}
      </div>
      {error && <div className="text-xs text-red-500">{error}</div>}
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={submit}
          className="flex-1 py-2 text-sm font-semibold text-white rounded-xl"
          style={{ backgroundColor: '#7C3AED' }}
        >
          {initial ? 'Update Address' : 'Save Address'}
        </button>
      </div>
    </div>
  )
}
