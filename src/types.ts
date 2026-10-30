export type Page =
  | 'home'
  | 'plp'
  | 'pdp'
  | 'cart'
  | 'checkout'
  | 'success'
  | 'tracking'
  | 'account'
  | 'wishlist'
  | 'seller'
  | 'admin'
  | 'auth'
  | 'delivery'

export interface Product {
  id: string
  name: string
  brand: string
  seller: string
  category: string
  price: number
  mrp: number
  discount: number
  rating: number
  reviews: number
  image: string
  images: string[]
  freeDelivery: boolean
  cod: boolean
  badge?: 'bestseller' | 'new' | 'trending'
  inStock: boolean
  colors?: string[]
  sizes?: string[]
  description?: string
  sold?: number
}

export interface CartItem {
  product: Product
  quantity: number
  color?: string
  size?: string
}

export interface Coupon {
  code: string
  discount: number
  type: 'flat' | 'percent'
  minOrder: number
  maxDiscount?: number
  expiry: string
  description: string
}

export interface Address {
  id: string
  type: 'Home' | 'Work' | 'Other'
  name: string
  phone: string
  line1: string
  line2: string
  city: string
  state: string
  pin: string
}

export type OrderStatus =
  | 'Placed'
  | 'Processing'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Returned'

export interface Order {
  id: string
  date: string
  items: CartItem[]
  subtotal: number
  delivery: number
  couponDiscount: number
  total: number
  address: Address
  paymentMethod: string
  status: OrderStatus
  deliveryDate: string
}

export type NavigateFn = (page: Page, productId?: string, category?: string) => void

export interface AppState {
  page: Page
  navigate: NavigateFn
  cart: CartItem[]
  addToCart: (product: Product, qty?: number, color?: string, size?: string) => void
  removeFromCart: (productId: string) => void
  wishlist: string[]
  toggleWishlist: (productId: string) => void
  selectedProductId: string | null
  isLoggedIn: boolean
  setLoggedIn: (v: boolean) => void
  role: 'user' | 'admin'
  setRole: (r: 'user' | 'admin') => void
  logout: () => void
  orders: Order[]
  lastOrderId: string | null
  coupon: Coupon | null
  applyCoupon: (c: Coupon) => void
  removeCoupon: () => void
  savedForLater: string[]
  toggleSaveForLater: (productId: string) => void
  placeOrder: (address: Address, paymentMethod: string) => string
  showToast: (msg: string) => void
}
