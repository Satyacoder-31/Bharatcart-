import { useState, useMemo, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'
import type { AppState } from '../types'

const PRIMARY = '#7C3AED'
const PAGE_SIZE = 12

const SORT_OPTIONS = [
  'Popular',
  'New Arrivals',
  'Price — Low to High',
  'Price — High to Low',
  'Customer Rating',
  'Discount',
  'Best Selling',
]

const RATINGS = [4, 3, 2, 1]
const COLORS = ['Red', 'Blue', 'Green', 'Black', 'White', 'Pink', 'Yellow', 'Purple', 'Navy', 'Maroon']

interface PLPProps extends AppState {
  selectedCategory: string | null
}

export default function ProductListingPage({ navigate, addToCart, wishlist, toggleWishlist, selectedCategory }: PLPProps) {
  const [sort, setSort] = useState('Popular')
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(10000)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false)
  const [codOnly, setCodOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [cats, setCats] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [term, setTerm] = useState<string | null>(selectedCategory)

  // Sync category selection when arriving from header / home / search
  useEffect(() => {
    setTerm(selectedCategory)
    if (selectedCategory) {
      const exact = categories.find(c => c.name.toLowerCase() === selectedCategory.toLowerCase())
      setCats(exact ? [exact.name] : [])
    } else {
      setCats([])
    }
    setPage(1)
  }, [selectedCategory])

  const toggleColor = (c: string) =>
    setSelectedColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])

  const toggleCat = (c: string) => {
    const wasChecked = cats.includes(c)
    setCats(prev => wasChecked ? prev.filter(x => x !== c) : [...prev, c])
    // Unchecking the exact category we arrived on clears the search term
    // so the full catalog becomes visible again.
    if (wasChecked && term && term.toLowerCase() === c.toLowerCase()) {
      setTerm(null)
    }
    setPage(1)
  }

  const resetFilters = () => {
    setPriceMin(0)
    setPriceMax(10000)
    setSelectedRating(null)
    setSelectedColors([])
    setFreeDeliveryOnly(false)
    setCodOnly(false)
    setCats([])
    setTerm(null)
    setPage(1)
  }

  const filtered = useMemo(() => {
    let list = [...products]
    const t = term?.trim().toLowerCase()
    if (t) {
      list = list.filter(p =>
        p.category.toLowerCase().includes(t) ||
        p.name.toLowerCase().includes(t) ||
        p.brand.toLowerCase().includes(t)
      )
    }
    if (cats.length > 0) list = list.filter(p => cats.includes(p.category))
    list = list.filter(p => p.price >= priceMin && p.price <= priceMax)
    if (selectedRating) list = list.filter(p => p.rating >= selectedRating)
    if (selectedColors.length > 0) {
      list = list.filter(p =>
        p.colors?.some(c => selectedColors.some(sc => c.toLowerCase().includes(sc.toLowerCase())))
      )
    }
    if (freeDeliveryOnly) list = list.filter(p => p.freeDelivery)
    if (codOnly) list = list.filter(p => p.cod)

    switch (sort) {
      case 'Popular': list.sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0)); break
      case 'Price — Low to High': list.sort((a, b) => a.price - b.price); break
      case 'Price — High to Low': list.sort((a, b) => b.price - a.price); break
      case 'Customer Rating': list.sort((a, b) => b.rating - a.rating); break
      case 'Discount': list.sort((a, b) => b.discount - a.discount); break
      case 'Best Selling': list.sort((a, b) => (b.sold ?? b.reviews) - (a.sold ?? a.reviews)); break
      case 'New Arrivals':
        list.sort((a, b) => {
          const an = a.badge === 'new' ? 1 : 0
          const bn = b.badge === 'new' ? 1 : 0
          return bn - an || (b.sold ?? 0) - (a.sold ?? 0)
        })
        break
    }
    return list
  }, [term, cats, priceMin, priceMax, selectedRating, selectedColors, freeDeliveryOnly, codOnly, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const pageNumbers: (number | '...')[] = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i)
  } else {
    pageNumbers.push(1)
    if (safePage > 3) pageNumbers.push('...')
    for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++) pageNumbers.push(i)
    if (safePage < totalPages - 2) pageNumbers.push('...')
    pageNumbers.push(totalPages)
  }

  const FiltersPanel = () => (
    <div className="bg-white rounded-2xl p-4 space-y-5 text-sm">
      {/* Category */}
      <FilterSection title="Category">
        {['Women Ethnic', 'Women Western', 'Men', 'Kids', 'Home & Kitchen', 'Beauty', 'Electronics', 'Footwear', 'Jewellery', 'Bags', 'Mobile Accessories', 'Sports', 'Toys'].map(c => (
          <label key={c} className="flex items-center gap-2 cursor-pointer py-1">
            <input
              type="checkbox"
              className="rounded accent-purple-600"
              checked={cats.includes(c)}
              onChange={() => toggleCat(c)}
            />
            <span className="text-gray-700 text-xs">{c}</span>
            <span className="ml-auto text-[10px] text-gray-400">
              {products.filter(p => p.category === c).length}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price Range">
        <div className="flex gap-2 mt-2">
          <div className="flex-1">
            <label className="text-[10px] text-gray-500 font-medium">Min (₹)</label>
            <input
              type="number"
              value={priceMin}
              onChange={e => { setPriceMin(Number(e.target.value)); setPage(1) }}
              className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs mt-0.5 outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex-1">
            <label className="text-[10px] text-gray-500 font-medium">Max (₹)</label>
            <input
              type="number"
              value={priceMax}
              onChange={e => { setPriceMax(Number(e.target.value)); setPage(1) }}
              className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs mt-0.5 outline-none focus:border-purple-500"
            />
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={10000}
          step={100}
          value={priceMax}
          onChange={e => { setPriceMax(Number(e.target.value)); setPage(1) }}
          className="w-full mt-2 accent-purple-600"
        />
        <div className="flex justify-between text-[10px] text-gray-400">
          <span>₹0</span><span>₹10,000+</span>
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Customer Rating">
        {RATINGS.map(r => (
          <label key={r} className="flex items-center gap-2 cursor-pointer py-1">
            <input
              type="radio"
              name="rating"
              className="accent-purple-600"
              checked={selectedRating === r}
              onChange={() => { setSelectedRating(prev => prev === r ? null : r); setPage(1) }}
            />
            <span className="text-yellow-400">{'★'.repeat(r)}</span>
            <span className="text-gray-500 text-xs">{r}+ Stars</span>
          </label>
        ))}
      </FilterSection>

      {/* Colors */}
      <FilterSection title="Color">
        <div className="flex flex-wrap gap-2 mt-1">
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => toggleColor(c)}
              className="text-xs px-2 py-1 rounded-full border transition-all"
              style={{
                borderColor: selectedColors.includes(c) ? PRIMARY : '#E5E7EB',
                color: selectedColors.includes(c) ? PRIMARY : '#6B7280',
                backgroundColor: selectedColors.includes(c) ? '#EDE9FE' : 'white',
                fontWeight: selectedColors.includes(c) ? 600 : 400,
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability">
        <label className="flex items-center gap-2 cursor-pointer py-1">
          <input
            type="checkbox"
            className="accent-purple-600"
            checked={freeDeliveryOnly}
            onChange={e => { setFreeDeliveryOnly(e.target.checked); setPage(1) }}
          />
          <span className="text-gray-700 text-xs">Free Delivery</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer py-1">
          <input
            type="checkbox"
            className="accent-purple-600"
            checked={codOnly}
            onChange={e => { setCodOnly(e.target.checked); setPage(1) }}
          />
          <span className="text-gray-700 text-xs">Cash on Delivery</span>
        </label>
      </FilterSection>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="w-full py-2 text-xs font-semibold border rounded-xl hover:bg-gray-50 transition-colors"
        style={{ borderColor: PRIMARY, color: PRIMARY }}
      >
        Reset All Filters
      </button>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 flex-wrap">
        <button onClick={() => navigate('home')} className="hover:text-purple-700">Home</button>
        <span>/</span>
        {term ? (
          <>
            <button onClick={resetFilters} className="hover:text-purple-700">All Products</button>
            <span>/</span>
            <span className="text-gray-800 font-medium">{term}</span>
          </>
        ) : (
          <span className="text-gray-800 font-medium">All Products</span>
        )}
      </div>

      <div className="flex gap-5">
        {/* Sidebar — desktop */}
        <div className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24">
            <div className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>🎛</span> Filters
            </div>
            <FiltersPanel />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-3 mb-4 bg-white rounded-xl px-4 py-2.5 shadow-sm">
            <div className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">{filtered.length.toLocaleString('en-IN')}</span> products found
              {term && <span className="text-gray-400"> for &quot;{term}&quot;</span>}
            </div>
            <div className="flex items-center gap-2">
              {/* Mobile filter btn */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 border rounded-lg"
                style={{ borderColor: PRIMARY, color: PRIMARY }}
              >
                🎛 Filters
              </button>

              {/* Sort */}
              <select
                value={sort}
                onChange={e => { setSort(e.target.value); setPage(1) }}
                className="text-xs font-medium border border-gray-200 rounded-lg px-2 py-1.5 outline-none bg-white cursor-pointer"
                style={{ color: PRIMARY }}
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile filters panel */}
          {showFilters && (
            <div className="lg:hidden mb-4 fade-in">
              <FiltersPanel />
            </div>
          )}

          {/* Product grid */}
          {pageItems.length === 0 ? (
            <EmptyState onReset={resetFilters} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {pageItems.map(p => (
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
          )}

          {/* Pagination */}
          {filtered.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="w-9 h-9 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 transition-all disabled:opacity-40 hover:border-purple-300"
                aria-label="Previous page"
              >
                ‹
              </button>
              {pageNumbers.map((pg, i) =>
                pg === '...' ? (
                  <span key={`e${i}`} className="w-9 h-9 flex items-center justify-center text-sm text-gray-400">…</span>
                ) : (
                  <button
                    key={pg}
                    onClick={() => setPage(pg)}
                    className="w-9 h-9 rounded-lg text-sm font-medium transition-all"
                    style={
                      pg === safePage
                        ? { backgroundColor: PRIMARY, color: 'white' }
                        : { backgroundColor: 'white', color: '#6B7280', border: '1px solid #E5E7EB' }
                    }
                  >
                    {pg}
                  </button>
                )
              )}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="w-9 h-9 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 transition-all disabled:opacity-40 hover:border-purple-300"
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-gray-100 pb-4 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between font-semibold text-gray-800 text-sm mb-2"
      >
        {title}
        <span className="text-gray-400 text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div>{children}</div>}
    </div>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-20">
      <div className="text-7xl mb-4">🔍</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
      <p className="text-gray-500 text-sm mb-6">Try adjusting your filters or search for something else</p>
      <button
        onClick={onReset}
        className="text-white font-semibold px-6 py-2.5 rounded-xl text-sm"
        style={{ backgroundColor: PRIMARY }}
      >
        View All Products
      </button>
    </div>
  )
}
