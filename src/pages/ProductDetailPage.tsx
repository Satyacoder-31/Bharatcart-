import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import type { AppState, Product } from '../types'

const PRIMARY = '#7C3AED'
const ACCENT = '#F97316'
const SUCCESS = '#10B981'

const MOCK_REVIEWS = [
  { id: 1, name: 'Priya Sharma', location: 'Mumbai, Maharashtra', rating: 5, date: '12 Jul 2026', verified: true, text: 'Absolutely love this product! The quality is amazing and it looks exactly like the photos. Delivery was super fast — received in just 2 days. Highly recommend!', helpful: 48 },
  { id: 2, name: 'Anita Patel', location: 'Ahmedabad, Gujarat', rating: 4, date: '28 Jun 2026', verified: true, text: 'Good quality fabric, stitching is neat. The color is slightly different from the photo but still looks great. Size fits perfectly. Would buy again.', helpful: 32 },
  { id: 3, name: 'Meera Nair', location: 'Bengaluru, Karnataka', rating: 4, date: '15 Jun 2026', verified: true, text: 'Nice product for the price. Packaging was good. Delivered on time. The material feels comfortable to wear all day.', helpful: 21 },
  { id: 4, name: 'Sneha Iyer', location: 'Chennai, Tamil Nadu', rating: 5, date: '2 Jun 2026', verified: true, text: 'Bought this as a gift and the recipient was thrilled. The finish and packaging are premium. Definitely worth the price.', helpful: 17 },
  { id: 5, name: 'Ritu Verma', location: 'Lucknow, Uttar Pradesh', rating: 3, date: '20 May 2026', verified: true, text: 'Decent product overall. Slightly smaller than expected so size up. Delivery took 4 days instead of 2 but everything else was fine.', helpful: 29 },
  { id: 6, name: 'Kavita Rao', location: 'Hyderabad, Telangana', rating: 5, date: '11 May 2026', verified: true, text: 'Third time ordering from this brand. Consistent quality, great value during the sale. Highly satisfied customer here!', helpful: 14 },
]

const SIZE_CHART = [
  { size: 'XS', bust: '32-33', waist: '26-27', hip: '34-35' },
  { size: 'S', bust: '34-35', waist: '28-29', hip: '36-37' },
  { size: 'M', bust: '36-37', waist: '30-31', hip: '38-39' },
  { size: 'L', bust: '38-39', waist: '32-33', hip: '40-41' },
  { size: 'XL', bust: '40-41', waist: '34-35', hip: '42-43' },
  { size: 'XXL', bust: '42-43', waist: '36-37', hip: '44-45' },
]

const UNAVAILABLE_PINS = ['123456', '444444', '555555', '999999', '200001', '700001']

const SIZE_ALPHABET = new Set(['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'])

const RATING_DISTRIBUTION = [
  { stars: 5, count: 58, pct: 58 },
  { stars: 4, count: 25, pct: 25 },
  { stars: 3, count: 10, pct: 10 },
  { stars: 2, count: 4, pct: 4 },
  { stars: 1, count: 3, pct: 3 },
]

interface PDPProps extends AppState {
  product: Product
}

export default function ProductDetailPage({ product, navigate, addToCart, wishlist, toggleWishlist }: PDPProps) {
  const [selectedImg, setSelectedImg] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] ?? '')
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[1] ?? '')
  const [qty, setQty] = useState(1)
  const [pincode, setPincode] = useState('')
  const [pincodeResult, setPincodeResult] = useState<null | 'available' | 'unavailable' | 'invalid'>(null)
  const [addedToCart, setAddedToCart] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, number>>({})

  const isWishlisted = wishlist.includes(product.id)
  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, qty, selectedColor || undefined, selectedSize || undefined)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const checkPincode = () => {
    if (pincode.length !== 6) {
      setPincodeResult('invalid')
      return
    }
    if (UNAVAILABLE_PINS.includes(pincode)) {
      setPincodeResult('unavailable')
      return
    }
    setPincodeResult('available')
  }

  const displaySizes = product.sizes ?? []
  const displaySizeChart = SIZE_ALPHABET.has(displaySizes[0] ?? '')
    ? SIZE_CHART
    : undefined

  const savings = product.mrp - product.price

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 flex-wrap">
        <button onClick={() => navigate('home')} className="hover:text-purple-700">Home</button>
        <span>/</span>
        <button onClick={() => navigate('plp', undefined, product.category)} className="hover:text-purple-700">{product.category}</button>
        <span>/</span>
        <span className="text-gray-700 truncate max-w-48">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ── Left: Image Gallery ── */}
        <div className="flex gap-3">
          {/* Thumbnails */}
          <div className="hidden sm:flex flex-col gap-2 w-16">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(i)}
                className="w-16 h-20 rounded-xl overflow-hidden border-2 transition-all"
                style={{ borderColor: i === selectedImg ? PRIMARY : 'transparent' }}
              >
                <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1 relative">
            <div className="w-full rounded-2xl overflow-hidden bg-gray-100" style={{ paddingBottom: '125%', position: 'relative' }}>
              <img
                src={product.images[selectedImg]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.badge && (
                  <span className="bg-yellow-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {product.badge === 'bestseller' ? '🏆 Bestseller' : product.badge === 'new' ? '✨ New' : '🔥 Trending'}
                  </span>
                )}
                <span className="text-white text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: ACCENT }}>
                  {product.discount}% OFF
                </span>
              </div>
              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-xl"
              >
                {isWishlisted ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Mobile thumbnails */}
            <div className="sm:hidden flex gap-2 mt-2 overflow-x-auto scrollbar-hide">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className="w-14 h-16 rounded-lg overflow-hidden border-2 shrink-0"
                  style={{ borderColor: i === selectedImg ? PRIMARY : '#E5E7EB' }}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Product Info ── */}
        <div className="space-y-4">
          {/* Brand + Name */}
          <div>
            <div className="text-sm font-semibold" style={{ color: PRIMARY }}>{product.brand}</div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 leading-snug">
              {product.name}
            </h1>
          </div>

          {/* Seller */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Sold by</span>
            <span className="font-semibold text-gray-700">{product.seller}</span>
            <span className="text-green-600 font-medium">⭐ 4.6 Seller Rating</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-green-600 text-white px-2.5 py-1 rounded-lg text-sm font-bold">
              {product.rating} ★
            </div>
            <div className="text-sm text-gray-500">
              {product.reviews.toLocaleString('en-IN')} ratings | {Math.floor(product.reviews * 0.18).toLocaleString('en-IN')} reviews
            </div>
          </div>

          {/* Price */}
          <div className="bg-orange-50 rounded-xl p-4">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-black text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="text-lg text-gray-400 line-through font-medium">₹{product.mrp.toLocaleString('en-IN')}</span>
              <span className="text-lg font-bold" style={{ color: ACCENT }}>{product.discount}% OFF</span>
            </div>
            <div className="text-sm text-green-700 font-semibold mt-1">
              You save ₹{savings.toLocaleString('en-IN')} on this purchase
            </div>
          </div>

          {/* Offers */}
          <div className="space-y-2">
            <div className="font-semibold text-gray-800 text-sm">Available Offers</div>
            {[
              { icon: '🏦', text: 'Bank offer: 10% OFF on SBI Credit Cards, up to ₹500' },
              { icon: '📱', text: 'UPI offer: Extra ₹50 OFF — Use code UPIBONUS' },
              { icon: '🎁', text: 'First order: ₹100 OFF — Use code WELCOME100' },
            ].map((offer, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-gray-700 bg-green-50 rounded-lg px-3 py-2">
                <span className="shrink-0 text-base">{offer.icon}</span>
                <span>{offer.text}</span>
              </div>
            ))}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <div className="font-semibold text-gray-800 text-sm mb-2">
                Color: <span className="font-normal text-gray-600">{selectedColor}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className="px-3 py-1.5 rounded-lg border-2 text-xs font-medium transition-all"
                    style={{
                      borderColor: selectedColor === c ? PRIMARY : '#E5E7EB',
                      color: selectedColor === c ? PRIMARY : '#6B7280',
                      backgroundColor: selectedColor === c ? '#EDE9FE' : 'white',
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-gray-800 text-sm">
                  Size: <span className="font-normal text-gray-600">{selectedSize}</span>
                </div>
                <button onClick={() => setShowSizeGuide(true)} className="text-xs font-semibold underline" style={{ color: PRIMARY }}>Size Guide</button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className="w-12 h-10 rounded-lg border-2 text-xs font-semibold transition-all"
                    style={{
                      borderColor: selectedSize === sz ? PRIMARY : '#E5E7EB',
                      color: selectedSize === sz ? PRIMARY : '#6B7280',
                      backgroundColor: selectedSize === sz ? '#EDE9FE' : 'white',
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <div className="font-semibold text-gray-800 text-sm">Qty:</div>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 font-bold text-lg"
              >
                −
              </button>
              <span className="w-10 text-center font-semibold text-gray-800">{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 font-bold text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 h-12 rounded-xl font-semibold text-sm transition-all border-2 flex items-center justify-center gap-2"
              style={{
                borderColor: PRIMARY,
                color: addedToCart ? 'white' : PRIMARY,
                backgroundColor: addedToCart ? PRIMARY : 'transparent',
              }}
            >
              {addedToCart ? '✓ Added to Cart!' : '🛒 Add to Cart'}
            </button>
            <button
              onClick={() => { addToCart(product, qty, selectedColor || undefined, selectedSize || undefined); navigate('checkout') }}
              className="flex-1 h-12 rounded-xl font-semibold text-sm text-white transition-all"
              style={{ backgroundColor: ACCENT }}
            >
              ⚡ Buy Now
            </button>
          </div>

          {/* Delivery checker */}
          <div className="border border-gray-100 rounded-xl p-4">
            <div className="font-semibold text-gray-800 text-sm mb-2">📍 Check Delivery</div>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={e => { setPincode(e.target.value.replace(/\D/g, '')); setPincodeResult(null) }}
                placeholder="Enter 6-digit PIN code"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
              />
              <button
                onClick={checkPincode}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: PRIMARY }}
              >
                Check
              </button>
            </div>
            {pincodeResult === 'invalid' && (
              <div className="mt-3 text-xs text-red-500 flex items-center gap-2 fade-in">
                <span>⚠️</span> Please enter a valid 6-digit PIN code
              </div>
            )}
            {pincodeResult === 'unavailable' && (
              <div className="mt-3 text-xs text-red-500 flex items-center gap-2 fade-in">
                <span>⚠️</span> Delivery is not available to {pincode}. Try a nearby PIN code.
              </div>
            )}
            {pincodeResult === 'available' && (
              <div className="mt-3 space-y-1 text-xs fade-in">
                <div className="flex items-center gap-2 text-green-700 font-medium">
                  <span className="text-green-500">✓</span> Delivery available to {pincode}
                </div>
                <div className="flex items-center gap-2 text-green-700 font-medium">
                  <span className="text-green-500">✓</span> Cash on Delivery available
                </div>
                <div className="flex items-center gap-2 text-green-700 font-medium">
                  <span className="text-green-500">✓</span> Estimated delivery: 3–5 business days
                </div>
              </div>
            )}
          </div>

          {/* Delivery tags */}
          <div className="flex gap-2 flex-wrap">
            {product.freeDelivery && (
              <span className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                🚚 Free Delivery
              </span>
            )}
            {product.cod && (
              <span className="flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full">
                💵 Cash on Delivery
              </span>
            )}
            <span className="flex items-center gap-1 text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full">
              ↩️ 7-day Returns
            </span>
          </div>
        </div>
      </div>

      {/* ── Product Details ── */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Details table */}
        <div className="bg-white rounded-2xl p-5">
          <h2 className="font-black text-gray-900 text-lg mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Product Details</h2>
          <div className="divide-y divide-gray-50">
            {[
              ['Material', 'Premium Cotton / Georgette'],
              ['Pattern', 'Printed / Floral'],
              ['Fit Type', 'Regular Fit'],
              ['Occasion', 'Casual, Festive, Party'],
              ['Country of Origin', 'India'],
              ['Manufacturer', product.brand + ', Jaipur 302001, Rajasthan'],
              ['Package Contents', '1 Kurti / 1 Saree (as described)'],
            ].map(([key, val]) => (
              <div key={key} className="py-2.5 flex gap-4">
                <span className="text-xs text-gray-500 font-medium w-36 shrink-0">{key}</span>
                <span className="text-xs text-gray-800">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-5">
          <h2 className="font-black text-gray-900 text-lg mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Description</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">{product.description}</p>
          <ul className="space-y-1.5">
            {[
              'Handcrafted by skilled Indian artisans',
              'Machine washable at 30°C',
              'Fade-resistant fabric technology',
              'Ships in eco-friendly packaging',
              'Includes care label and size chart',
            ].map(b => (
              <li key={b} className="text-xs text-gray-600 flex items-start gap-2">
                <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Frequently Bought Together ── */}
      <div className="mt-8 bg-white rounded-2xl p-5">
        <h2 className="font-black text-gray-900 text-lg mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Frequently Bought Together</h2>
        <div className="flex items-center gap-3 flex-wrap">
          {products.slice(0, 3).map((p, i) => (
            <div key={p.id} className="flex items-center gap-3">
              <button onClick={() => navigate('pdp', p.id)} className="flex items-center gap-2">
                <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <div className="text-xs font-semibold text-gray-800 max-w-28 line-clamp-2">{p.name}</div>
                  <div className="text-sm font-bold text-gray-900 mt-0.5">₹{p.price.toLocaleString('en-IN')}</div>
                </div>
              </button>
              {i < 2 && <span className="text-gray-400 font-bold text-xl">+</span>}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div className="text-sm">
            Bundle total: <span className="line-through text-gray-400">₹{(products.slice(0, 3).reduce((s, p) => s + p.mrp, 0)).toLocaleString('en-IN')}</span>
            <span className="font-black text-gray-900 ml-2 text-lg">₹{(products.slice(0, 3).reduce((s, p) => s + p.price, 0) * 0.92).toFixed(0)}</span>
            <span className="ml-2 text-xs text-green-600 font-semibold">Save 8% more</span>
          </div>
          <button
            className="text-white font-semibold text-sm px-5 py-2.5 rounded-xl"
            style={{ backgroundColor: PRIMARY }}
            onClick={() => { products.slice(0, 3).forEach(p => addToCart(p)); navigate('cart') }}
          >
            Add Bundle to Cart
          </button>
        </div>
      </div>

      {/* ── Reviews ── */}
      <div className="mt-8 bg-white rounded-2xl p-5">
        <h2 className="font-black text-gray-900 text-lg mb-5" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Ratings &amp; Reviews
        </h2>
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Rating summary */}
          <div className="shrink-0">
            <div className="text-6xl font-black text-gray-900 leading-none">{product.rating}</div>
            <div className="flex gap-0.5 mt-1 mb-1">
              {'★★★★★'.split('').map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg" style={{ opacity: i < Math.round(product.rating) ? 1 : 0.3 }}>★</span>
              ))}
            </div>
            <div className="text-xs text-gray-500">{product.reviews.toLocaleString('en-IN')} ratings</div>
          </div>

          {/* Distribution bars */}
          <div className="flex-1 space-y-2">
            {RATING_DISTRIBUTION.map(({ stars, count, pct }) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-xs text-gray-600 w-5 text-right">{stars}</span>
                <span className="text-yellow-400 text-xs">★</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, backgroundColor: pct > 40 ? SUCCESS : pct > 20 ? '#F59E0B' : '#EF4444' }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-6">{count}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review list */}
        <div className="mt-6 space-y-5 border-t border-gray-100 pt-5">
          {(showAllReviews ? MOCK_REVIEWS : MOCK_REVIEWS.slice(0, 3)).map(review => (
            <div key={review.id} className="pb-5 border-b border-gray-100 last:border-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center font-bold text-sm" style={{ color: PRIMARY }}>
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{review.name}</div>
                    <div className="text-[10px] text-gray-500">{review.location}</div>
                  </div>
                </div>
                <div className="text-[10px] text-gray-400 shrink-0">{review.date}</div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-0.5 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded font-bold">
                  {review.rating} ★
                </div>
                {review.verified && (
                  <span className="text-[10px] text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded-full">✓ Verified Purchase</span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{review.text}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs text-gray-500">Was this helpful?</span>
                <button
                  onClick={() => setHelpfulVotes(v => ({ ...v, [review.id]: (v[review.id] ?? 0) + 1 }))}
                  className="text-xs text-gray-500 hover:text-gray-700 border border-gray-200 px-2 py-0.5 rounded hover:bg-green-50 transition-colors"
                >
                  👍 {review.helpful + (helpfulVotes[review.id] ?? 0)}
                </button>
                <button className="text-xs text-gray-500 hover:text-gray-700 border border-gray-200 px-2 py-0.5 rounded">
                  👎
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowAllReviews(s => !s)}
          className="mt-4 w-full py-2.5 border-2 rounded-xl text-sm font-semibold transition-colors hover:bg-purple-50"
          style={{ borderColor: PRIMARY, color: PRIMARY }}
        >
          {showAllReviews ? 'Show Less Reviews' : `View All ${product.reviews.toLocaleString('en-IN')} Reviews`}
        </button>
      </div>

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <div className="mt-10">
          <h2 className="font-black text-gray-900 text-lg mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {relatedProducts.map(p => (
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
        </div>
      )}

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md fade-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-black text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>Size Guide</h3>
              <button onClick={() => setShowSizeGuide(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              {displaySizeChart ? (
                <>
                  <div className="text-xs text-gray-500 mb-3">Body measurements in inches. Choose the size closest to your measurements for a regular fit.</div>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-purple-50 text-left">
                        <th className="px-3 py-2 font-bold text-purple-700">Size</th>
                        <th className="px-3 py-2 font-bold text-purple-700">Bust</th>
                        <th className="px-3 py-2 font-bold text-purple-700">Waist</th>
                        <th className="px-3 py-2 font-bold text-purple-700">Hip</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {displaySizeChart.map(row => (
                        <tr key={row.size}>
                          <td className="px-3 py-2 font-semibold text-gray-800">{row.size}</td>
                          <td className="px-3 py-2 text-gray-600">{row.bust}</td>
                          <td className="px-3 py-2 text-gray-600">{row.waist}</td>
                          <td className="px-3 py-2 text-gray-600">{row.hip}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-[11px] text-gray-400 mt-3">
                    Tip: If you are between two sizes, choose the larger size for a relaxed fit.
                  </div>
                </>
              ) : (
                <>
                  <div className="text-xs text-gray-500 mb-3">This product is available in the following sizes:</div>
                  <div className="flex gap-2 flex-wrap">
                    {displaySizes.map(sz => (
                      <span key={sz} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700">
                        {sz}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
