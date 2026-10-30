import { useState } from 'react'
import { coupons, products } from '../data/products'
import type { AppState } from '../types'

const PRIMARY = '#7C3AED'
const ACCENT = '#F97316'

export default function CartPage({
  cart,
  removeFromCart,
  addToCart,
  navigate,
  coupon,
  applyCoupon,
  removeCoupon,
  savedForLater,
  toggleSaveForLater,
  showToast,
}: AppState) {
  const [couponCode, setCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')
  const [showCouponModal, setShowCouponModal] = useState(false)

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const mrpTotal = cart.reduce((s, i) => s + i.product.mrp * i.quantity, 0)
  const deliveryFee = subtotal > 499 ? 0 : 49
  const couponDiscount = coupon
    ? coupon.type === 'flat'
      ? coupon.discount
      : Math.min(coupon.maxDiscount ?? 9999, Math.floor((subtotal * coupon.discount) / 100))
    : 0
  const total = subtotal + deliveryFee - couponDiscount

  const tryApply = (c: (typeof coupons)[0]) => {
    if (subtotal < c.minOrder) {
      setCouponError(`This coupon needs a minimum order of ₹${c.minOrder.toLocaleString('en-IN')}`)
      return false
    }
    applyCoupon(c)
    setCouponError('')
    setCouponCode('')
    showToast(`${c.code} applied! You save ₹${
      (c.type === 'flat' ? c.discount : Math.min(c.maxDiscount ?? 9999, Math.floor((subtotal * c.discount) / 100))).toLocaleString('en-IN')
    }`)
    return true
  }

  const applyCouponFromInput = () => {
    const found = coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase())
    if (!found) { setCouponError('Invalid coupon code'); return }
    tryApply(found)
  }

  // Group by seller
  const sellerGroups = cart.reduce<Record<string, typeof cart>>((acc, item) => {
    const seller = item.product.seller
    if (!acc[seller]) acc[seller] = []
    acc[seller].push(item)
    return acc
  }, {})

  const savedProducts = products.filter(p => savedForLater.includes(p.id))

  if (cart.length === 0 && savedProducts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-8xl mb-5">🛒</div>
        <h2 className="text-2xl font-black text-gray-800 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you have not added anything to your cart yet. Explore thousands of products.</p>
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
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-black text-gray-900 mb-5" style={{ fontFamily: "'Outfit', sans-serif" }}>
        🛒 Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items)
      </h1>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* ── Cart Items ── */}
        <div className="flex-1 space-y-4">
          {Object.entries(sellerGroups).map(([seller, items]) => (
            <div key={seller} className="bg-white rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <span className="text-base">🏪</span>
                <span className="font-semibold text-gray-800 text-sm">Seller: {seller}</span>
                <span className="ml-auto text-xs text-green-600 font-medium">
                  {items.every(i => i.product.freeDelivery) ? '🚚 Free Delivery' : ''}
                </span>
              </div>
              <div className="divide-y divide-gray-50">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.color}-${item.size}`} className="p-4 flex gap-4">
                    <button onClick={() => navigate('pdp', item.product.id)}>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl object-cover bg-gray-100 shrink-0"
                      />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-400 font-medium">{item.product.brand}</div>
                      <button
                        onClick={() => navigate('pdp', item.product.id)}
                        className="text-sm font-semibold text-gray-800 text-left line-clamp-2 hover:text-purple-700 mt-0.5"
                      >
                        {item.product.name}
                      </button>

                      {/* Variant info */}
                      {(item.color || item.size) && (
                        <div className="flex gap-2 mt-1">
                          {item.color && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{item.color}</span>}
                          {item.size && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Size: {item.size}</span>}
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="font-bold text-gray-900">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                        <span className="text-xs text-gray-400 line-through">₹{(item.product.mrp * item.quantity).toLocaleString('en-IN')}</span>
                        <span className="text-xs font-semibold" style={{ color: ACCENT }}>{item.product.discount}% OFF</span>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-3 mt-3 flex-wrap">
                        {/* Quantity */}
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => {
                              if (item.quantity === 1) removeFromCart(item.product.id)
                              else addToCart(item.product, -1, item.color, item.size)
                            }}
                            className="w-8 h-8 flex items-center justify-center font-bold text-gray-500 hover:bg-gray-50"
                          >
                            {item.quantity === 1 ? '🗑' : '−'}
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => addToCart(item.product, 1, item.color, item.size)}
                            className="w-8 h-8 flex items-center justify-center font-bold text-gray-500 hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-xs text-red-500 hover:text-red-700 font-medium"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => {
                            toggleSaveForLater(item.product.id)
                            removeFromCart(item.product.id)
                            showToast('Saved for later')
                          }}
                          className="text-xs font-medium hover:underline"
                          style={{ color: PRIMARY }}
                        >
                          Save for Later
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Coupon section */}
          <div className="bg-white rounded-2xl p-4">
            <div className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
              <span>🎟</span> Apply Coupon
            </div>
            {coupon ? (
              <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                <div>
                  <div className="font-bold text-green-700 text-sm">{coupon.code} applied!</div>
                  <div className="text-xs text-green-600">You save ₹{couponDiscount.toLocaleString('en-IN')}</div>
                </div>
                <button
                  onClick={() => { removeCoupon(); showToast('Coupon removed') }}
                  className="text-xs text-red-500 font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={e => { setCouponCode(e.target.value.toUpperCase()); setCouponError('') }}
                  placeholder="Enter coupon code"
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500 font-mono"
                />
                <button
                  onClick={applyCouponFromInput}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ backgroundColor: PRIMARY }}
                >
                  Apply
                </button>
              </div>
            )}
            {couponError && <div className="text-xs text-red-500 mt-1.5">{couponError}</div>}
            <button
              onClick={() => setShowCouponModal(true)}
              className="text-xs font-semibold mt-2 hover:underline"
              style={{ color: PRIMARY }}
            >
              View all available coupons →
            </button>
          </div>

          {/* Saved for later */}
          {savedProducts.length > 0 && (
            <div className="bg-white rounded-2xl overflow-hidden fade-in">
              <div className="px-4 py-3 border-b border-gray-100">
                <span className="font-semibold text-gray-800 text-sm">⏰ Saved for Later ({savedProducts.length})</span>
              </div>
              <div className="divide-y divide-gray-50">
                {savedProducts.map(p => (
                  <div key={p.id} className="p-4 flex gap-4">
                    <button onClick={() => navigate('pdp', p.id)}>
                      <img src={p.image} alt={p.name} className="w-20 h-24 rounded-xl object-cover bg-gray-100 shrink-0" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-400 font-medium">{p.brand}</div>
                      <button
                        onClick={() => navigate('pdp', p.id)}
                        className="text-sm font-semibold text-gray-800 text-left line-clamp-2 hover:text-purple-700 mt-0.5"
                      >
                        {p.name}
                      </button>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="font-bold text-gray-900">₹{p.price.toLocaleString('en-IN')}</span>
                        <span className="text-xs text-gray-400 line-through">₹{p.mrp.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => {
                            addToCart(p)
                            toggleSaveForLater(p.id)
                            showToast('Moved to cart')
                          }}
                          className="text-xs font-bold px-3 py-1.5 rounded-lg text-white"
                          style={{ backgroundColor: PRIMARY }}
                        >
                          Move to Cart
                        </button>
                        <button
                          onClick={() => toggleSaveForLater(p.id)}
                          className="text-xs text-red-500 hover:text-red-700 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Order Summary ── */}
        {cart.length > 0 && (
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl p-4 sticky top-24">
              <h2 className="font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <SummaryRow label={`Price (${cart.reduce((s, i) => s + i.quantity, 0)} items)`} value={`₹${mrpTotal.toLocaleString('en-IN')}`} />
                <SummaryRow label="Product Discount" value={`−₹${(mrpTotal - subtotal).toLocaleString('en-IN')}`} green />
                <SummaryRow label="Delivery Fee" value={deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`} green={deliveryFee === 0} />
                {coupon && (
                  <SummaryRow label={`Coupon (${coupon.code})`} value={`−₹${couponDiscount.toLocaleString('en-IN')}`} green />
                )}
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between font-black text-gray-900 text-base">
                    <span>Total Amount</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="text-xs text-green-600 font-semibold mt-1">
                    You save ₹{(mrpTotal - total).toLocaleString('en-IN')} on this order 🎉
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('checkout')}
                className="w-full h-12 mt-5 rounded-xl text-white font-bold text-sm hover:shadow-lg transition-all"
                style={{ backgroundColor: PRIMARY }}
              >
                Proceed to Checkout →
              </button>

              {/* Trust row */}
              <div className="flex items-center justify-center gap-4 mt-4 text-[10px] text-gray-400">
                <span>🔒 Secure</span>
                <span>💳 All payments</span>
                <span>↩️ Easy returns</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Coupon Modal */}
      {showCouponModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4"
          onClick={() => setShowCouponModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto fade-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-black text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>Available Coupons</h3>
              <button onClick={() => setShowCouponModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="p-4 space-y-3">
              {coupons.map(c => (
                <div key={c.code} className="border border-dashed border-purple-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-sm font-mono tracking-wider" style={{ color: PRIMARY }}>{c.code}</span>
                    <button
                      onClick={() => {
                        if (tryApply(c)) setShowCouponModal(false)
                      }}
                      className="text-xs font-bold px-3 py-1 rounded-lg text-white"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      Apply
                    </button>
                  </div>
                  <div className="text-sm text-gray-700 font-medium">{c.description}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Min order ₹{c.minOrder.toLocaleString('en-IN')} · Expires {c.expiry}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SummaryRow({ label, value, green = false }: { label: string; value: string; green?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className={`font-semibold ${green ? 'text-green-600' : 'text-gray-900'}`}>{value}</span>
    </div>
  )
}
