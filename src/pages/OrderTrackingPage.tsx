import type { AppState } from '../types'

const PRIMARY = '#7C3AED'
const SUCCESS = '#10B981'

const TRACKING_STEPS = [
  { label: 'Order Placed', desc: 'Your order has been placed successfully.' },
  { label: 'Payment Confirmed', desc: 'Payment received via your chosen method.' },
  { label: 'Packed', desc: 'The seller has packed your order.' },
  { label: 'Shipped', desc: 'Your order is on its way.' },
  { label: 'Out for Delivery', desc: 'Our delivery partner will deliver your order today.' },
  { label: 'Delivered', desc: '' },
]

const STATUS_STEP: Record<string, number> = {
  Placed: 2,
  Processing: 2,
  Shipped: 4,
  'Out for Delivery': 5,
  Delivered: 6,
  Returned: 2,
}

const addDays = (n: number) => {
  const d = new Date(Date.now() + n * 24 * 60 * 60 * 1000)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function OrderTrackingPage({ navigate, orders, lastOrderId }: AppState) {
  const order = orders.find(o => o.id === lastOrderId) ?? orders[0]

  const item = order?.items[0]
  const product = item?.product
  const orderId = order?.id ?? 'BC-2026-847291'
  const trackingNo = order?.id.replace('BC-', '') + 'IND'
  const deliveryBy = order?.deliveryDate ?? addDays(5)
  const currentStep = order ? STATUS_STEP[order.status] ?? 2 : 4
  const returned = order?.status === 'Returned'
  const timeFor = (i: number) => {
    const d = new Date()
    d.setDate(d.getDate() + (i - 1))
    const label = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    if (!order) return i === 3 ? '10 Aug 2026, 6:45 PM' : i < 3 ? '9 Aug 2026, 11:3' + i + ' AM' : 'Expected: ' + deliveryBy
    return i >= 4 ? 'Expected: ' + label : label
  }

  const doneFor = (i: number) => (returned ? i < 2 : i < currentStep)
  const inProgressFor = (i: number) => !returned && i === currentStep && order?.status !== 'Delivered'

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-black text-gray-900 mb-5" style={{ fontFamily: "'Outfit', sans-serif" }}>
        Track Your Order
      </h1>

      {returned && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-5 flex items-center gap-3">
          <span className="text-2xl">↩️</span>
          <div className="text-xs text-red-700">
            <div className="font-bold">This order has been returned</div>
            <div>Refund of ₹{order.total.toLocaleString('en-IN')} has been initiated to your payment method.</div>
          </div>
        </div>
      )}

      {/* Order summary card */}
      <div className="bg-white rounded-2xl p-4 mb-5 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={product?.image ?? 'https://images.unsplash.com/photo-1708534246051-7f47b279e94b?w=80&h=80&fit=crop&auto=format'}
            alt={product?.name ?? 'Product'}
            className="w-16 h-16 rounded-xl object-cover bg-gray-100 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-800 line-clamp-2">{product?.name ?? 'Women Floral Printed Cotton Kurti'}</div>
            <div className="text-xs text-gray-500 mt-0.5">
              Seller: {product?.seller ?? 'Fashion Hub'}
              {item?.size && <> · Size: {item.size}</>}
              {item?.color && <> · Color: {item.color}</>}
              {item && item.quantity > 1 && <> · Qty: {item.quantity}</>}
            </div>
            <div className="text-sm font-bold text-gray-900 mt-1">
              ₹{(order ? order.total : 499).toLocaleString('en-IN')}
              {order && order.items.length > 1 && <span className="text-xs text-gray-400 font-medium"> ({order.items.reduce((s, i) => s + i.quantity, 0)} items)</span>}
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <InfoBox label="Order ID" value={orderId} />
          <InfoBox label="Tracking No." value={trackingNo} />
          <InfoBox label="Delivery By" value={deliveryBy} highlight />
        </div>
      </div>

      {/* Delivery address */}
      <div className="bg-white rounded-2xl p-4 mb-5 shadow-sm">
        <div className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <span>📍</span> Delivering to
        </div>
        <div className="text-sm text-gray-600">
          {order?.address
            ? `${order.address.name} · ${order.address.line1}, ${order.address.line2}, ${order.address.city}, ${order.address.state} — ${order.address.pin}`
            : 'Rohit Mehta · B-204, Sunrise Apartments, Near S.G. Highway, Bodakdev, Ahmedabad, Gujarat — 380054'}
        </div>
      </div>

      {/* Tracking timeline */}
      <div className="bg-white rounded-2xl p-4 mb-5 shadow-sm">
        <div className="text-sm font-semibold text-gray-800 mb-4">Order Timeline</div>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3.5 top-4 bottom-0 w-0.5 bg-gray-100" />
          <div
            className="absolute left-3.5 top-4 w-0.5 transition-all"
            style={{
              backgroundColor: SUCCESS,
              height: `${(Math.min(currentStep, TRACKING_STEPS.length - 1) / (TRACKING_STEPS.length - 1)) * 100}%`,
            }}
          />

          <div className="space-y-6">
            {TRACKING_STEPS.map((step, i) => {
              const done = doneFor(i)
              const active = inProgressFor(i)
              return (
                <div key={i} className="flex items-start gap-4 relative">
                  {/* Dot */}
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-all"
                    style={{
                      backgroundColor: done ? SUCCESS : active ? '#FEF3C7' : '#F3F4F6',
                      border: `2px solid ${done ? SUCCESS : active ? '#F59E0B' : '#E5E7EB'}`,
                    }}
                  >
                    {done ? (
                      <span className="text-white text-xs font-bold">✓</span>
                    ) : active ? (
                      <span className="text-yellow-600 text-xs font-bold">●</span>
                    ) : (
                      <span className="text-gray-300 text-xs">○</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: done ? '#111827' : active ? '#F59E0B' : '#9CA3AF' }}
                      >
                        {step.label}
                      </span>
                      {active && (
                        <span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">In Progress</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{timeFor(i)}</div>
                    {step.desc && done && (
                      <div className="text-xs text-gray-500 mt-1">{step.desc}</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Delivery partner */}
      <div className="bg-white rounded-2xl p-4 mb-5 shadow-sm">
        <div className="text-sm font-semibold text-gray-800 mb-3">Delivery Partner</div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">👤</div>
          <div>
            <div className="font-semibold text-gray-800 text-sm">Suresh Kumar</div>
            <div className="text-xs text-gray-500">BharatCart Express · ID: DL-58291</div>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-lg">📞</button>
            <button className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-lg">💬</button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate('account')}
          className="flex-1 py-3 text-sm font-semibold border-2 rounded-xl transition-colors hover:bg-purple-50"
          style={{ borderColor: PRIMARY, color: PRIMARY }}
        >
          My Orders
        </button>
        <button
          onClick={() => navigate('home')}
          className="flex-1 py-3 text-sm font-semibold text-white rounded-xl"
          style={{ backgroundColor: PRIMARY }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

function InfoBox({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  const PRIMARY = '#7C3AED'
  return (
    <div className="bg-gray-50 rounded-xl p-2.5">
      <div className="text-[10px] text-gray-500 font-medium">{label}</div>
      <div className="text-sm font-bold mt-0.5" style={{ color: highlight ? PRIMARY : '#111827' }}>{value}</div>
    </div>
  )
}
