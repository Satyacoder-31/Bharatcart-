import type { NavigateFn } from '../types'

const PRIMARY = '#7C3AED'

export default function Footer({ navigate }: { navigate: NavigateFn }) {
  return (
    <footer className="bg-white border-t border-gray-100 mt-10">
      {/* Trust badges */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { icon: '🔒', label: 'Secure Payments' },
              { icon: '📦', label: 'Easy Returns' },
              { icon: '✅', label: 'Verified Sellers' },
              { icon: '🛡️', label: 'Buyer Protection' },
              { icon: '🚚', label: 'Fast Delivery' },
              { icon: '💎', label: 'Genuine Products' },
              { icon: '💳', label: 'COD Available' },
            ].map(badge => (
              <div key={badge.label} className="flex items-center gap-2">
                <span className="text-xl shrink-0">{badge.icon}</span>
                <span className="text-xs font-medium text-gray-600">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-lg"
                style={{ backgroundColor: PRIMARY }}
              >
                B
              </div>
              <span className="font-black text-xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <span style={{ color: PRIMARY }}>Bharat</span>
                <span className="text-gray-800">Cart</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              India&apos;s fastest growing multi-vendor marketplace. Shop from 2 lakh+ sellers across 500+ cities.
            </p>
            <div className="flex gap-2">
              {['📷', '👍', '▶️', '𝕏'].map((icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-purple-100 flex items-center justify-center text-sm transition-colors"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-3">Customer Service</h4>
            <ul className="space-y-2">
              {['Help Center', 'Returns & Refunds', 'Shipping Info', 'Cancellation Policy', 'Contact Us', 'Track Order'].map(l => (
                <li key={l}>
                  <button
                    onClick={() => navigate('account')}
                    className="text-xs text-gray-500 hover:text-purple-700 transition-colors"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-3">Company</h4>
            <ul className="space-y-2">
              {['About BharatCart', 'Careers', 'Press', 'Investor Relations', 'Sustainability', 'Blog'].map(l => (
                <li key={l}>
                  <button className="text-xs text-gray-500 hover:text-purple-700 transition-colors">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sell */}
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-3">Sell on BharatCart</h4>
            <ul className="space-y-2">
              {['Become a Seller', 'Seller Registration', 'Seller Policies', 'Seller Login', 'Advertising', 'Seller Support'].map(l => (
                <li key={l}>
                  <button
                    onClick={() => navigate('seller')}
                    className="text-xs text-gray-500 hover:text-purple-700 transition-colors"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* App download */}
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-3">Download App</h4>
            <div className="space-y-2 mb-4">
              <button className="w-full flex items-center gap-2 bg-gray-900 text-white rounded-lg px-3 py-2 hover:bg-gray-800 transition-colors">
                <span className="text-lg">🍎</span>
                <div className="text-left">
                  <div className="text-[10px] text-gray-400">Download on the</div>
                  <div className="text-xs font-semibold">App Store</div>
                </div>
              </button>
              <button className="w-full flex items-center gap-2 bg-gray-900 text-white rounded-lg px-3 py-2 hover:bg-gray-800 transition-colors">
                <span className="text-lg">▶</span>
                <div className="text-left">
                  <div className="text-[10px] text-gray-400">Get it on</div>
                  <div className="text-xs font-semibold">Google Play</div>
                </div>
              </button>
            </div>
            <div className="text-xs text-gray-500 font-medium mb-1.5">Legal</div>
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(l => (
              <div key={l}>
                <button className="text-xs text-gray-500 hover:text-purple-700 transition-colors block mb-1.5">
                  {l}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <div>© 2026 BharatCart Technologies Pvt. Ltd. All rights reserved. CIN: U74999MH2026PTC123456</div>
          <div className="flex items-center gap-3">
            <span>GST: 27AABCT1234F1Z5</span>
            <span className="flex items-center gap-1">
              Made with ❤️ in India 🇮🇳
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
