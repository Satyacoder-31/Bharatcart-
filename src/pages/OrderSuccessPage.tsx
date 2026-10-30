import type { AppState } from '../types'

const PRIMARY = '#7C3AED'

export default function OrderSuccessPage({ navigate, orders, lastOrderId }: AppState) {
  const order = orders.find(o => o.id === lastOrderId) ?? orders[0]
  const orderId = order?.id ?? 'BC-2026-847291'
  const deliveryDate = order?.deliveryDate ?? 'Fri, 14 Aug 2026'
  const address = order?.address
  const itemsCount = order?.items.reduce((s, i) => s + i.quantity, 0) ?? 0

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Animated checkmark */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-lg"
          style={{ backgroundColor: '#D1FAE5' }}
        >
          ✅
        </div>

        <h1
          className="text-3xl font-black text-gray-900 mb-2"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Order Placed!
        </h1>
        <p className="text-gray-500 mb-6">
          Your order{itemsCount > 0 ? ` of ${itemsCount} item${itemsCount > 1 ? 's' : ''}` : ''} has been confirmed and will be delivered soon.
        </p>

        {/* Order details card */}
        <div className="bg-white rounded-2xl p-5 mb-6 text-left shadow-sm">
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Order ID</span>
              <span className="font-black text-gray-900 font-mono text-sm">{orderId}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Payment</span>
              <span className="font-semibold text-green-700 text-sm">✓ Confirmed</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Amount Paid</span>
              <span className="font-semibold text-gray-900 text-sm">₹{order?.total.toLocaleString('en-IN') ?? '—'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Estimated Delivery</span>
              <span className="font-semibold text-gray-900 text-sm">{deliveryDate}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">Delivering to</span>
              <span className="font-semibold text-gray-700 text-sm text-right">
                {address ? `${address.city}, ${address.state}` : 'Ahmedabad, Gujarat'}
              </span>
            </div>
          </div>
        </div>

        {/* What happens next */}
        <div className="bg-purple-50 rounded-2xl p-4 mb-6 text-left">
          <div className="text-xs font-bold text-purple-700 mb-2">What happens next?</div>
          {[
            { icon: '📦', text: 'Seller is preparing your order' },
            { icon: '🚚', text: 'Order will be shipped in 1-2 days' },
            { icon: '🔔', text: "You'll receive SMS & email updates" },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2 py-1">
              <span>{item.icon}</span>
              <span className="text-xs text-purple-700">{item.text}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('tracking')}
            className="w-full h-12 rounded-xl text-white font-bold"
            style={{ backgroundColor: PRIMARY }}
          >
            📦 Track Your Order
          </button>
          <button
            onClick={() => navigate('home')}
            className="w-full h-12 rounded-xl font-bold border-2 transition-colors hover:bg-purple-50"
            style={{ borderColor: PRIMARY, color: PRIMARY }}
          >
            Continue Shopping
          </button>
        </div>

        {/* Help */}
        <p className="text-xs text-gray-400 mt-6">
          Need help?{' '}
          <button className="underline" style={{ color: PRIMARY }}>Contact Support</button>
          {' '}· Order ID: {orderId}
        </p>
      </div>
    </div>
  )
}
