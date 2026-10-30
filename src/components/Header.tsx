import { useState } from 'react'
import { products } from '../data/products'
import type { AppState } from '../types'

const PRIMARY = '#7C3AED'
const CATEGORIES = ['Women Ethnic', 'Women Western', 'Men', 'Kids', 'Home & Kitchen', 'Beauty', 'Electronics', 'Footwear', 'Jewellery', 'Bags']
const TRENDING = ['Women kurti', 'Silk saree', 'Wireless earbuds', 'Skincare serum', 'Cotton bedsheet']

export default function Header({ navigate, cart, wishlist, isLoggedIn }: AppState) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)

  const q = searchQuery.trim().toLowerCase()
  const suggestions = q.length > 1
    ? products
        .filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        )
        .slice(0, 6)
        .map(p => p.name)
    : []

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('plp', undefined, searchQuery)
    setShowSearch(false)
    setSearchQuery('')
  }

  return (
    <>
      {/* Top promo bar */}
      <div style={{ backgroundColor: PRIMARY }} className="text-white text-xs py-1.5 text-center font-medium hidden sm:block">
        🎉 Big Sale is LIVE! Up to 70% OFF on 1 Lakh+ styles + Extra ₹100 OFF with code&nbsp;
        <span className="font-bold underline cursor-pointer">WELCOME100</span>
      </div>

      {/* Main header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center gap-3 h-14 sm:h-16">

            {/* Logo */}
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-1 shrink-0"
              aria-label="BharatCart home"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-lg"
                style={{ backgroundColor: PRIMARY }}
              >
                B
              </div>
              <span className="hidden sm:block font-black text-xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <span style={{ color: PRIMARY }}>Bharat</span>
                <span className="text-gray-800">Cart</span>
              </span>
            </button>

            {/* Location (desktop) */}
            <button className="hidden lg:flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 shrink-0 border border-gray-200 rounded-lg px-2.5 py-1.5">
              <span className="text-base">📍</span>
              <div className="text-left">
                <div className="text-gray-400 text-[10px]">Deliver to</div>
                <div className="font-semibold text-gray-700 text-xs">Mumbai — 400001</div>
              </div>
            </button>

            {/* Search bar */}
            <div className="flex-1 relative">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSearch(true)}
                    onBlur={() => setTimeout(() => setShowSearch(false), 150)}
                    placeholder="Search for products, brands and more"
                    className="w-full h-10 pl-4 pr-12 rounded-xl border-2 text-sm outline-none transition-colors bg-gray-50"
                    style={{ borderColor: searchQuery ? PRIMARY : '#E5E7EB' }}
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 h-10 w-12 flex items-center justify-center rounded-r-xl text-white text-lg"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    🔍
                  </button>
                </div>
              </form>

              {/* Search suggestions dropdown */}
              {showSearch && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  {q.length < 2 ? (
                    <div className="p-3">
                      <div className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wide">Trending Searches</div>
                      {TRENDING.map(s => (
                        <button
                          key={s}
                          onMouseDown={() => { navigate('plp', undefined, s); setShowSearch(false) }}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-lg flex items-center gap-2"
                        >
                          <span className="text-gray-400">🔥</span> {s}
                        </button>
                      ))}
                    </div>
                  ) : suggestions.length > 0 ? (
                    <div className="p-2">
                      {suggestions.map(s => (
                        <button
                          key={s}
                          onMouseDown={() => { navigate('plp', undefined, s); setShowSearch(false) }}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-lg flex items-center gap-2"
                        >
                          <span className="text-gray-400">🔍</span> {s}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-sm text-gray-500 text-center">No products found for &quot;{searchQuery}&quot;</div>
                  )}
                </div>
              )}
            </div>

            {/* Desktop nav icons */}
            <div className="hidden md:flex items-center gap-1">
              <NavBtn
                icon="🏪"
                label="Sell"
                onClick={() => navigate('seller')}
                badge={null}
              />
              <NavBtn
                icon="🔔"
                label="Alerts"
                onClick={() => navigate('account')}
                badge={3}
              />
              <NavBtn
                icon="❤️"
                label="Wishlist"
                onClick={() => navigate('wishlist')}
                badge={wishlist.length || null}
              />
              <NavBtn
                icon="🛒"
                label="Cart"
                onClick={() => navigate('cart')}
                badge={cartCount || null}
                primary
              />
              <button
                onClick={() => isLoggedIn ? navigate('account') : navigate('auth')}
                className="flex items-center gap-1.5 pl-2 pr-3 py-1.5 rounded-xl text-sm font-semibold text-white ml-1"
                style={{ backgroundColor: PRIMARY }}
              >
                <span className="text-base">👤</span>
                <span>{isLoggedIn ? 'Account' : 'Login'}</span>
              </button>
            </div>

            {/* Mobile icons */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => navigate('cart')}
                className="relative p-2 text-gray-700"
              >
                <span className="text-xl">🛒</span>
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: PRIMARY }}>
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 text-gray-700 text-xl"
              >
                {showMobileMenu ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {/* Category nav (desktop) */}
          <div className="hidden md:flex items-center gap-1 pb-2 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => navigate('plp', undefined, cat)}
                className="whitespace-nowrap px-3 py-1 text-xs font-medium text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-full transition-colors shrink-0"
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => navigate('admin')}
              className="whitespace-nowrap px-3 py-1 text-xs font-medium text-gray-400 hover:text-gray-600 rounded-full ml-auto shrink-0"
            >
              Admin Panel
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1 fade-in">
            {[
              { label: 'Home', page: 'home' as const, icon: '🏠' },
              { label: 'My Orders', page: 'tracking' as const, icon: '📦' },
              { label: 'Wishlist', page: 'wishlist' as const, icon: '❤️' },
              { label: 'My Account', page: 'account' as const, icon: '👤' },
              { label: 'Sell on BharatCart', page: 'seller' as const, icon: '🏪' },
              { label: 'Admin Panel', page: 'admin' as const, icon: '⚙️' },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => { navigate(item.page); setShowMobileMenu(false) }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-purple-50 rounded-xl"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <button
                onClick={() => { navigate('auth'); setShowMobileMenu(false) }}
                className="w-full py-2.5 text-sm font-semibold text-white rounded-xl"
                style={{ backgroundColor: PRIMARY }}
              >
                {isLoggedIn ? 'My Profile' : 'Login / Sign Up'}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

function NavBtn({
  icon,
  label,
  onClick,
  badge,
  primary = false,
}: {
  icon: string
  label: string
  onClick: () => void
  badge: number | null
  primary?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-xl text-xs font-medium transition-colors ${
        primary ? 'text-purple-700 hover:bg-purple-50' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
      {badge !== null && badge > 0 && (
        <span
          className="absolute top-0.5 right-1 text-white text-[10px] min-w-[16px] h-4 rounded-full flex items-center justify-center font-bold px-0.5"
          style={{ backgroundColor: primary ? '#7C3AED' : '#EC4899' }}
        >
          {badge}
        </span>
      )}
    </button>
  )
}
