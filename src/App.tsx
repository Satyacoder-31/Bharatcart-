import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductListingPage from './pages/ProductListingPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import OrderTrackingPage from './pages/OrderTrackingPage'
import AccountPage from './pages/AccountPage'
import WishlistPage from './pages/WishlistPage'
import SellerDashboard from './pages/SellerDashboard'
import AdminPanel from './pages/AdminPanel'
import AuthPage from './pages/AuthPage'
import { products } from './data/products'
import type { Page, CartItem, Product, NavigateFn, Order, Coupon, Address } from './types'

const STORAGE_KEYS = {
  cart: 'bc_cart_v1',
  wishlist: 'bc_wishlist_v1',
  orders: 'bc_orders_v1',
  coupon: 'bc_coupon_v1',
  saved: 'bc_saved_v1',
  user: 'bc_user_v1',
  role: 'bc_role_v1',
} as const

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function usePersistentState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => load(key, fallback))
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* ignore quota / privacy-mode errors */
    }
  }, [key, value])
  return [value, setValue] as const
}

function generateOrderId(): string {
  const n = Math.floor(100000 + Math.random() * 900000)
  return `BC-${new Date().getFullYear()}-${n}`
}

export default function App() {
  const [page, setPage] = useState<Page>(() =>
    load<boolean>(STORAGE_KEYS.user, false)
      ? load<'admin' | 'user'>(STORAGE_KEYS.role, 'user') === 'admin'
        ? 'admin'
        : 'home'
      : 'auth'
  )
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [cart, setCart] = usePersistentState<CartItem[]>(STORAGE_KEYS.cart, [])
  const [wishlist, setWishlist] = usePersistentState<string[]>(STORAGE_KEYS.wishlist, [])
  const [orders, setOrders] = usePersistentState<Order[]>(STORAGE_KEYS.orders, [])
  const [coupon, setCoupon] = usePersistentState<Coupon | null>(STORAGE_KEYS.coupon, null)
  const [savedForLater, setSavedForLater] = usePersistentState<string[]>(STORAGE_KEYS.saved, [])
  const [isLoggedIn, setLoggedIn] = usePersistentState<boolean>(STORAGE_KEYS.user, false)
  const [role, setRole] = usePersistentState<'user' | 'admin'>(STORAGE_KEYS.role, 'user')
  const [lastOrderId, setLastOrderId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2400)
    return () => clearTimeout(t)
  }, [toast])

  const showToast = useCallback((msg: string) => setToast(msg), [])

  const navigate: NavigateFn = useCallback((p, productId, category) => {
    if (productId) setSelectedProductId(productId)
    if (category !== undefined) setSelectedCategory(category)
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const addToCart = useCallback((product: Product, qty = 1, color?: string, size?: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.color === color && i.size === size)
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.color === color && i.size === size
            ? { ...i, quantity: Math.max(0, i.quantity + qty) }
            : i
        )
      }
      return [...prev, { product, quantity: Math.max(1, qty), color, size }]
    })
  }, [setCart])

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(i => i.product.id !== productId))
  }, [setCart])

  const clearCart = useCallback(() => {
    setCart([])
    setCoupon(null)
  }, [setCart, setCoupon])

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    )
  }, [setWishlist])

  const toggleSaveForLater = useCallback((productId: string) => {
    setSavedForLater(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    )
  }, [setSavedForLater])

  const applyCoupon = useCallback((c: Coupon) => {
    setCoupon(c)
  }, [setCoupon])

  const removeCoupon = useCallback(() => setCoupon(null), [setCoupon])

  const logout = useCallback(() => {
    setLoggedIn(false)
    setRole('user')
    setPage('auth')
    window.scrollTo({ top: 0 })
  }, [setLoggedIn, setRole])

  const placeOrder = useCallback((address: Address, paymentMethod: string): string => {
    const id = generateOrderId()
    const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0)
    const delivery = subtotal > 499 ? 0 : 49
    const couponDiscount = coupon
      ? coupon.type === 'flat'
        ? coupon.discount
        : Math.min(coupon.maxDiscount ?? 9999, Math.floor((subtotal * coupon.discount) / 100))
      : 0
    const codFee = paymentMethod === 'cod' ? 25 : 0
    const total = subtotal + delivery - couponDiscount + codFee

    const deliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    const order: Order = {
      id,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: cart,
      subtotal,
      delivery,
      couponDiscount,
      total,
      address,
      paymentMethod,
      status: 'Placed',
      deliveryDate: deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }),
    }
    setOrders(prev => [order, ...prev])
    setLastOrderId(id)
    clearCart()
    return id
  }, [cart, coupon, setOrders, clearCart])

  const selectedProduct = products.find(p => p.id === selectedProductId) ?? products[0]
  const noShell = page === 'seller' || page === 'admin' || page === 'auth'

  const appState = {
    page,
    navigate,
    cart,
    addToCart,
    removeFromCart,
    wishlist,
    toggleWishlist,
    selectedProductId,
    isLoggedIn,
    setLoggedIn,
    role,
    setRole,
    logout,
    orders,
    lastOrderId,
    coupon,
    applyCoupon,
    removeCoupon,
    savedForLater,
    toggleSaveForLater,
    placeOrder,
    showToast,
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      {!noShell && <Header {...appState} />}

      <main>
        {page === 'home' && <HomePage {...appState} />}
        {page === 'plp' && (
          <ProductListingPage {...appState} selectedCategory={selectedCategory} />
        )}
        {page === 'pdp' && <ProductDetailPage {...appState} product={selectedProduct} />}
        {page === 'cart' && <CartPage {...appState} />}
        {page === 'checkout' && <CheckoutPage {...appState} />}
        {page === 'success' && <OrderSuccessPage {...appState} />}
        {page === 'tracking' && <OrderTrackingPage {...appState} />}
        {page === 'account' && <AccountPage {...appState} />}
        {page === 'wishlist' && <WishlistPage {...appState} />}
        {page === 'seller' && <SellerDashboard navigate={navigate} showToast={showToast} />}
        {page === 'admin' && <AdminPanel navigate={navigate} showToast={showToast} logout={logout} />}
        {page === 'auth' && <AuthPage {...appState} />}
      </main>

      {!noShell && <Footer navigate={navigate} />}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] fade-in">
          <div className="bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-2xl flex items-center gap-2">
            <span className="text-green-400">✓</span>
            {toast}
          </div>
        </div>
      )}
    </div>
  )
}
