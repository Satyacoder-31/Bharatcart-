import type { Product, NavigateFn } from '../types'

const PRIMARY = '#7C3AED'
const SECONDARY = '#EC4899'
const ACCENT = '#F97316'

const BADGE_STYLES: Record<string, { bg: string; label: string }> = {
  bestseller: { bg: '#F59E0B', label: '🏆 Bestseller' },
  new: { bg: '#10B981', label: '✨ New' },
  trending: { bg: SECONDARY, label: '🔥 Trending' },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {'★★★★★'.split('').map((_, i) => (
        <span
          key={i}
          className="text-xs"
          style={{ color: i < Math.round(rating) ? '#F59E0B' : '#D1D5DB' }}
        >
          ★
        </span>
      ))}
    </span>
  )
}

interface ProductCardProps {
  product: Product
  navigate: NavigateFn
  onAddToCart: (product: Product) => void
  isWishlisted: boolean
  onToggleWishlist: (id: string) => void
  compact?: boolean
}

export default function ProductCard({
  product,
  navigate,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  compact = false,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group relative flex flex-col">
      {/* Badge */}
      {product.badge && (
        <div
          className="absolute top-2 left-2 z-10 text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: BADGE_STYLES[product.badge].bg }}
        >
          {BADGE_STYLES[product.badge].label}
        </div>
      )}

      {/* Wishlist button */}
      <button
        onClick={e => { e.stopPropagation(); onToggleWishlist(product.id) }}
        className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-transform hover:scale-110"
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <span className="text-base" style={{ color: isWishlisted ? SECONDARY : '#9CA3AF' }}>
          {isWishlisted ? '❤️' : '🤍'}
        </span>
      </button>

      {/* Product image */}
      <button
        className="block w-full overflow-hidden bg-gray-100"
        onClick={() => navigate('pdp', product.id)}
        aria-label={`View ${product.name}`}
      >
        <div className="relative" style={{ paddingBottom: compact ? '100%' : '125%' }}>
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="font-semibold text-gray-600 text-sm bg-white px-3 py-1 rounded-full shadow">
                Out of Stock
              </span>
            </div>
          )}
          {/* Quick add — appears on hover */}
          {product.inStock && (
            <button
              onClick={e => { e.stopPropagation(); onAddToCart(product) }}
              className="absolute bottom-0 left-0 right-0 py-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: PRIMARY }}
            >
              + Add to Cart
            </button>
          )}
        </div>
      </button>

      {/* Product info */}
      <div className="p-2.5 flex flex-col gap-1 flex-1">
        {/* Name */}
        <button
          onClick={() => navigate('pdp', product.id)}
          className="text-left"
        >
          <div className="text-xs text-gray-400 font-medium">{product.brand}</div>
          <div className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug mt-0.5">
            {product.name}
          </div>
        </button>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5 bg-green-50 rounded px-1.5 py-0.5">
            <span className="text-[11px] font-bold text-green-700">{product.rating}</span>
            <span className="text-yellow-400 text-[11px]">★</span>
          </div>
          <span className="text-[10px] text-gray-400">{product.reviews.toLocaleString('en-IN')}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="font-bold text-gray-900 text-sm">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-gray-400 line-through">
            ₹{product.mrp.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] font-bold" style={{ color: ACCENT }}>
            {product.discount}% OFF
          </span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-1.5 flex-wrap mt-auto pt-1">
          {product.freeDelivery && (
            <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">
              Free Delivery
            </span>
          )}
          {product.cod && (
            <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-full">
              COD
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
