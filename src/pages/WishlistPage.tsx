import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import type { AppState } from '../types'

const PRIMARY = '#7C3AED'

export default function WishlistPage({ navigate, wishlist, toggleWishlist, addToCart }: AppState) {
  const wishlisted = products.filter(p => wishlist.includes(p.id))

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-black text-gray-900 mb-5" style={{ fontFamily: "'Outfit', sans-serif" }}>
        ❤️ My Wishlist ({wishlisted.length})
      </h1>

      {wishlisted.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-8xl mb-5">🤍</div>
          <h2 className="text-2xl font-black text-gray-800 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Save products you love by tapping the heart icon. They will appear here for easy access.
          </p>
          <button
            onClick={() => navigate('home')}
            className="text-white font-semibold px-8 py-3 rounded-xl"
            style={{ backgroundColor: PRIMARY }}
          >
            Discover Products
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              {wishlisted.length} item{wishlisted.length !== 1 ? 's' : ''} saved
            </div>
            <button
              onClick={() => { wishlisted.forEach(p => addToCart(p)); navigate('cart') }}
              className="text-xs font-bold px-4 py-2 rounded-xl text-white"
              style={{ backgroundColor: PRIMARY }}
            >
              Add All to Cart
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {wishlisted.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                navigate={navigate}
                onAddToCart={addToCart}
                isWishlisted={true}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
