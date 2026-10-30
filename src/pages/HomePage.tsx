import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'
import type { AppState } from '../types'

const PRIMARY = '#7C3AED'
const ACCENT = '#F97316'
const SECONDARY = '#EC4899'

const BANNERS = [
  {
    id: 1,
    bg: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 60%, #EC4899 100%)',
    tag: '🔥 Big Fashion Sale',
    title: 'Big Savings.\nEveryday Shopping.',
    subtitle: 'Up to 70% OFF on 2 Lakh+ styles',
    cta: 'Shop Fashion Now',
    image: 'https://images.unsplash.com/photo-1708534246051-7f47b279e94b?w=500&h=600&fit=crop&auto=format',
    category: 'Women Ethnic',
  },
  {
    id: 2,
    bg: 'linear-gradient(135deg, #EC4899 0%, #BE185D 60%, #7C3AED 100%)',
    tag: '✨ New Arrivals',
    title: 'Festival Collection\n2026 is Here!',
    subtitle: 'Sarees, Kurtis, Lehengas & More',
    cta: 'Explore Collection',
    image: 'https://images.unsplash.com/photo-1610189012906-4c0aa9b9781e?w=500&h=600&fit=crop&auto=format',
    category: 'Women Ethnic',
  },
  {
    id: 3,
    bg: 'linear-gradient(135deg, #F97316 0%, #EA580C 60%, #7C3AED 100%)',
    tag: '⚡ Flash Sale',
    title: 'Electronics Sale.\nUp to 68% OFF.',
    subtitle: 'Earbuds, Smartwatches, Accessories',
    cta: 'Shop Electronics',
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=600&fit=crop&auto=format',
    category: 'Electronics',
  },
]

function useCountdown(targetSeconds: number) {
  const [seconds, setSeconds] = useState(targetSeconds)
  useEffect(() => {
    const id = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : targetSeconds)), 1000)
    return () => clearInterval(id)
  }, [targetSeconds])
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return { h, m, s }
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white text-gray-900 font-black text-lg sm:text-2xl w-10 sm:w-14 h-10 sm:h-14 rounded-xl flex items-center justify-center shadow-sm">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-white/70 text-[10px] mt-1">{label}</div>
    </div>
  )
}

export default function HomePage({
  navigate,
  cart,
  addToCart,
  wishlist,
  toggleWishlist,
}: AppState) {
  const [bannerIdx, setBannerIdx] = useState(0)
  const [flashProducts] = useState(products.slice(0, 4))
  const { h, m, s } = useCountdown(4 * 3600 + 23 * 60 + 45)

  useEffect(() => {
    const id = setInterval(() => setBannerIdx(i => (i + 1) % BANNERS.length), 4000)
    return () => clearInterval(id)
  }, [])

  const banner = BANNERS[bannerIdx]

  return (
    <div className="pb-10">
      {/* ── Hero Carousel ── */}
      <section className="relative overflow-hidden" style={{ minHeight: 340 }}>
        <div
          className="transition-all duration-700"
          style={{ background: banner.bg }}
        >
          <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
            <div className="flex items-center justify-between gap-6">
              {/* Text side */}
              <div className="flex-1 text-white max-w-lg">
                <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  {banner.tag}
                </span>
                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-3"
                  style={{ fontFamily: "'Outfit', sans-serif", whiteSpace: 'pre-line' }}
                >
                  {banner.title}
                </h1>
                <p className="text-white/80 text-sm sm:text-base mb-6">{banner.subtitle}</p>
                <button
                  onClick={() => navigate('plp', undefined, banner.category)}
                  className="bg-white font-bold px-6 py-3 rounded-xl text-sm sm:text-base hover:shadow-lg hover:scale-105 transition-all"
                  style={{ color: PRIMARY }}
                >
                  {banner.cta} →
                </button>
              </div>

              {/* Image side */}
              <div className="hidden sm:block w-48 lg:w-64 shrink-0">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full rounded-2xl object-cover shadow-2xl"
                  style={{ height: 260, objectPosition: 'top' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setBannerIdx(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === bannerIdx ? 24 : 8,
                backgroundColor: i === bannerIdx ? 'white' : 'rgba(255,255,255,0.5)',
              }}
              aria-label={`Banner ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── Category Strip ── */}
      <section className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => navigate('plp', undefined, cat.name)}
                className="flex flex-col items-center gap-1.5 shrink-0 group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl sm:text-3xl group-hover:bg-purple-100 transition-colors group-hover:scale-105 transform transition-transform">
                  {cat.icon}
                </div>
                <span className="text-[10px] sm:text-xs font-medium text-gray-600 group-hover:text-purple-700 whitespace-nowrap">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Flash Sale ── */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' }}>
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚡</span>
                <div>
                  <div className="text-white font-black text-xl sm:text-2xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Flash Sale
                  </div>
                  <div className="text-white/80 text-xs">Hurry! Deals end soon</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-white/80 text-xs font-medium">Ends in:</div>
                <div className="flex items-end gap-1.5">
                  <CountdownUnit value={h} label="HRS" />
                  <span className="text-white font-black text-xl mb-2">:</span>
                  <CountdownUnit value={m} label="MIN" />
                  <span className="text-white font-black text-xl mb-2">:</span>
                  <CountdownUnit value={s} label="SEC" />
                </div>
              </div>
              <button
                onClick={() => navigate('plp')}
                className="bg-white text-orange-600 font-bold text-sm px-4 py-2 rounded-xl hover:shadow-lg transition-all shrink-0"
              >
                See All →
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {flashProducts.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  navigate={navigate}
                  onAddToCart={addToCart}
                  isWishlisted={wishlist.includes(p.id)}
                  onToggleWishlist={toggleWishlist}
                  compact
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trending Categories ── */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <SectionHeader title="Trending Categories" subtitle="Most loved by shoppers today" />
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-3 mt-4">
          {[
            { name: 'Sarees', icon: '🥻', search: 'Saree', img: 'https://images.unsplash.com/photo-1610189337543-1c5d8e64f574?w=200&h=200&fit=crop&auto=format' },
            { name: 'Kurtis', icon: '👘', search: 'Kurti', img: 'https://images.unsplash.com/photo-1708534246051-7f47b279e94b?w=200&h=200&fit=crop&auto=format' },
            { name: "Men's Shirts", icon: '👔', search: 'Shirt', img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop&auto=format' },
            { name: 'Dresses', icon: '👗', search: 'Dress', img: 'https://images.unsplash.com/photo-1760287363878-1a09af715b80?w=200&h=200&fit=crop&auto=format' },
            { name: 'Footwear', icon: '👟', search: 'Footwear', img: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&h=200&fit=crop&auto=format' },
            { name: 'Home Decor', icon: '🏠', search: 'Home & Kitchen', img: 'https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=200&h=200&fit=crop&auto=format' },
            { name: 'Skincare', icon: '💆', search: 'Beauty & Personal Care', img: 'https://images.unsplash.com/photo-1748543668676-ea8241cb3886?w=200&h=200&fit=crop&auto=format' },
            { name: 'Electronics', icon: '📱', search: 'Electronics', img: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=200&h=200&fit=crop&auto=format' },
          ].map(cat => (
            <button
              key={cat.name}
              onClick={() => navigate('plp', undefined, cat.search)}
              className="group flex flex-col items-center"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-purple-50 mb-2 relative">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xs font-semibold text-gray-700 group-hover:text-purple-700 text-center leading-tight">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Top Deals ── */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <SectionHeader
          title="Top Deals For You"
          subtitle="Handpicked deals with massive savings"
          onViewAll={() => navigate('plp')}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-4">
          {products.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              navigate={navigate}
              onAddToCart={addToCart}
              isWishlisted={wishlist.includes(p.id)}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* ── Promotional Banners ── */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <PromoCard
            bg="linear-gradient(135deg, #7C3AED, #EC4899)"
            title="New User Offer"
            subtitle="₹100 OFF on first order"
            code="WELCOME100"
            onClick={() => navigate('auth')}
          />
          <PromoCard
            bg="linear-gradient(135deg, #10B981, #059669)"
            title="Free Delivery"
            subtitle="On all orders above ₹299"
            code="No code needed"
            onClick={() => navigate('plp')}
          />
          <PromoCard
            bg="linear-gradient(135deg, #F97316, #DC2626)"
            title="UPI Cashback"
            subtitle="Up to ₹50 OFF every time"
            code="UPIBONUS"
            onClick={() => navigate('plp')}
          />
        </div>
      </section>

      {/* ── Recently Viewed / Personalized ── */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <SectionHeader
          title="Because You Looked at Fashion"
          subtitle="Similar styles you might love"
          onViewAll={() => navigate('plp', undefined, 'Women Ethnic')}
        />
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 mt-4">
          {products.slice(0, 8).map(p => (
            <div key={p.id} className="shrink-0 w-40 sm:w-48">
              <ProductCard
                product={p}
                navigate={navigate}
                onAddToCart={addToCart}
                isWishlisted={wishlist.includes(p.id)}
                onToggleWishlist={toggleWishlist}
                compact
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Why BharatCart ── */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="bg-white rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-black text-gray-800 text-center mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Why 5 Crore+ Shoppers Trust BharatCart
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { icon: '🚚', title: 'Fast Delivery', desc: 'Delivered in 2-7 days across India' },
              { icon: '↩️', title: 'Easy Returns', desc: '7-day hassle-free return policy' },
              { icon: '🔒', title: 'Secure Payments', desc: 'UPI, Cards, COD — 100% safe' },
              { icon: '✅', title: '2 Lakh+ Sellers', desc: 'Verified quality-checked vendors' },
            ].map(item => (
              <div key={item.title} className="flex flex-col items-center text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="font-bold text-gray-800 text-sm mb-1">{item.title}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function SectionHeader({
  title,
  subtitle,
  onViewAll,
}: {
  title: string
  subtitle?: string
  onViewAll?: () => void
}) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="text-lg sm:text-xl font-black text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {title}
        </h2>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {onViewAll && (
        <button
          onClick={onViewAll}
          className="text-xs font-semibold hover:underline shrink-0"
          style={{ color: PRIMARY }}
        >
          View All →
        </button>
      )}
    </div>
  )
}

function PromoCard({
  bg,
  title,
  subtitle,
  code,
  onClick,
}: {
  bg: string
  title: string
  subtitle: string
  code: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl p-5 text-left hover:scale-[1.02] transition-transform"
      style={{ background: bg }}
    >
      <div className="text-white font-black text-lg mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
        {title}
      </div>
      <div className="text-white/80 text-sm mb-3">{subtitle}</div>
      <div className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full font-mono tracking-wider">
        {code}
      </div>
    </button>
  )
}
