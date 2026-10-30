import type { Product, Coupon } from '../types'

/* ─────────────────────────────────────────────────────────────
   Original catalog (from the Figma UI) — kept unchanged.
   ───────────────────────────────────────────────────────────── */
export const products: Product[] = [
  {
    id: 'p1',
    name: 'Women Floral Printed Cotton Kurti',
    brand: 'Jaipur Textile House',
    seller: 'Fashion Hub',
    category: 'Women Ethnic',
    price: 499,
    mrp: 1299,
    discount: 62,
    rating: 4.3,
    reviews: 2841,
    image: 'https://images.unsplash.com/photo-1708534246051-7f47b279e94b?w=400&h=500&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1708534246051-7f47b279e94b?w=600&h=750&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1708534419572-6e6614a53ca1?w=600&h=750&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1708534246055-d7b149acb731?w=600&h=750&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1597983073750-16f5ded1321f?w=600&h=750&fit=crop&auto=format',
    ],
    freeDelivery: true,
    cod: true,
    badge: 'bestseller',
    inStock: true,
    colors: ['Pink', 'Blue', 'Green', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Beautiful floral printed cotton kurti perfect for casual and festive occasions. Made from premium breathable cotton fabric. Features intricate floral print, round neck, and 3/4th sleeves.',
    sold: 12450,
  },
  {
    id: 'p2',
    name: 'Women Designer Anarkali Kurti Set',
    brand: 'Ritu Kumar',
    seller: 'Ethnic Wear Co.',
    category: 'Women Ethnic',
    price: 899,
    mrp: 2199,
    discount: 59,
    rating: 4.5,
    reviews: 1203,
    image: 'https://images.unsplash.com/photo-1708534246055-d7b149acb731?w=400&h=500&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1708534246055-d7b149acb731?w=600&h=750&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1708534246051-7f47b279e94b?w=600&h=750&fit=crop&auto=format',
    ],
    freeDelivery: true,
    cod: true,
    badge: 'new',
    inStock: true,
    colors: ['Maroon', 'Navy', 'Green'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Elegant Anarkali kurti set with dupatta. Crafted from premium georgette fabric with fine embroidery work. Ideal for festivals, weddings, and special occasions.',
    sold: 5120,
  },
  {
    id: 'p3',
    name: 'Pure Silk Kanjivaram Saree with Zari Border',
    brand: 'Sundari Silks',
    seller: 'Silk Palace',
    category: 'Women Ethnic',
    price: 1999,
    mrp: 4999,
    discount: 60,
    rating: 4.7,
    reviews: 891,
    image: 'https://images.unsplash.com/photo-1610189012906-4c0aa9b9781e?w=400&h=500&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1610189012906-4c0aa9b9781e?w=600&h=750&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1610189337543-1c5d8e64f574?w=600&h=750&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1610313416292-e350ece568f6?w=600&h=750&fit=crop&auto=format',
    ],
    freeDelivery: true,
    cod: false,
    badge: 'bestseller',
    inStock: true,
    colors: ['Blue-Gold', 'Red-Gold', 'Pink-Silver'],
    description: 'Authentic Kanjivaram silk saree with traditional zari border. Woven by master weavers in Tamil Nadu. Each piece is unique with rich silk texture and vibrant color.',
    sold: 3210,
  },
  {
    id: 'p4',
    name: 'Embroidered Georgette Saree with Blouse Piece',
    brand: 'Satya Paul',
    seller: 'Drape House',
    category: 'Women Ethnic',
    price: 1299,
    mrp: 2999,
    discount: 57,
    rating: 4.4,
    reviews: 562,
    image: 'https://images.unsplash.com/photo-1610313416292-e350ece568f6?w=400&h=500&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1610313416292-e350ece568f6?w=600&h=750&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1610189337543-1c5d8e64f574?w=600&h=750&fit=crop&auto=format',
    ],
    freeDelivery: true,
    cod: true,
    inStock: true,
    colors: ['Pink', 'Peach', 'Lavender'],
    description: 'Lightweight georgette saree with beautiful floral embroidery. Comes with matching blouse piece. Perfect for parties and semi-formal occasions.',
    sold: 2210,
  },
  {
    id: 'p5',
    name: 'Women Flared Maxi Dress — Cottagecore',
    brand: 'AND Fashion',
    seller: 'Western Wardrobe',
    category: 'Women Western',
    price: 699,
    mrp: 1799,
    discount: 61,
    rating: 4.2,
    reviews: 1456,
    image: 'https://images.unsplash.com/photo-1597983073750-16f5ded1321f?w=400&h=500&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1597983073750-16f5ded1321f?w=600&h=750&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1760287363878-1a09af715b80?w=600&h=750&fit=crop&auto=format',
    ],
    freeDelivery: true,
    cod: true,
    badge: 'trending',
    inStock: true,
    colors: ['Green', 'Yellow', 'Blue'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Breezy flared maxi dress in 100% cotton. Perfect for summer outings, brunches, and casual day wear. Features adjustable drawstring waist and relaxed silhouette.',
    sold: 6890,
  },
  {
    id: 'p6',
    name: 'Yellow Tiered Embroidered Summer Dress',
    brand: 'Global Desi',
    seller: 'Trendy Looks',
    category: 'Women Western',
    price: 799,
    mrp: 1999,
    discount: 60,
    rating: 4.1,
    reviews: 732,
    image: 'https://images.unsplash.com/photo-1760287363878-1a09af715b80?w=400&h=500&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1760287363878-1a09af715b80?w=600&h=750&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1760287364219-160c234ded00?w=600&h=750&fit=crop&auto=format',
    ],
    freeDelivery: true,
    cod: true,
    badge: 'new',
    inStock: true,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Yellow', 'White', 'Pink'],
    description: 'Vibrant tiered dress with beautiful embroidered neckline. Made in India by artisan weavers. Machine washable, comfortable for all-day wear.',
    sold: 3450,
  },
  {
    id: 'p7',
    name: 'ProSound True Wireless Earbuds with ANC',
    brand: 'SoundMax Pro',
    seller: 'TechZone India',
    category: 'Electronics',
    price: 1299,
    mrp: 3999,
    discount: 68,
    rating: 4.3,
    reviews: 4521,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=600&h=600&fit=crop&auto=format',
    ],
    freeDelivery: true,
    cod: true,
    badge: 'bestseller',
    inStock: true,
    colors: ['White', 'Black', 'Midnight Blue'],
    description: 'Next-gen true wireless earbuds with 40dB Active Noise Cancellation. 30hr total battery life, IPX5 water resistant. Dual microphone for clear calls. Works with all Bluetooth 5.3 devices.',
    sold: 21400,
  },
  {
    id: 'p8',
    name: 'Over-Ear Studio Headphones with Bass Boost',
    brand: 'AudioTech',
    seller: 'Gadget World',
    category: 'Electronics',
    price: 1999,
    mrp: 5999,
    discount: 67,
    rating: 4.5,
    reviews: 2103,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop&auto=format',
    ],
    freeDelivery: true,
    cod: true,
    inStock: true,
    colors: ['Black', 'White', 'Silver'],
    description: 'Professional over-ear headphones with 40mm drivers. Superior sound isolation, foldable design for travel. Includes airline adapter and carrying case.',
    sold: 9980,
  },
  {
    id: 'p9',
    name: 'Premium Stainless Steel Cookware Set (5 pcs)',
    brand: 'Prestige',
    seller: 'HomeWorld',
    category: 'Home & Kitchen',
    price: 1499,
    mrp: 3499,
    discount: 57,
    rating: 4.6,
    reviews: 3201,
    image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=400&h=400&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1556910585-09baa3a3998e?w=600&h=600&fit=crop&auto=format',
    ],
    freeDelivery: true,
    cod: true,
    badge: 'bestseller',
    inStock: true,
    description: 'Heavy-duty tri-ply stainless steel cookware set. Includes 2 kadais, 1 saucepan, 1 fry pan, and 1 pressure cooker. Induction compatible. Lifetime warranty by Prestige.',
    sold: 15400,
  },
  {
    id: 'p10',
    name: 'Ceramic Dinner Set 18 pcs — Blue Bloom',
    brand: 'Cello',
    seller: 'HomeWorld',
    category: 'Home & Kitchen',
    price: 999,
    mrp: 2499,
    discount: 60,
    rating: 4.3,
    reviews: 891,
    image: 'https://images.unsplash.com/photo-1556910585-09baa3a3998e?w=400&h=400&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1556910585-09baa3a3998e?w=600&h=600&fit=crop&auto=format',
    ],
    freeDelivery: true,
    cod: true,
    inStock: true,
    colors: ['Blue Bloom', 'White Floral', 'Forest Green'],
    description: 'Elegant 18-piece ceramic dinner set. Includes 6 dinner plates, 6 side plates, and 6 bowls. Microwave and dishwasher safe. Lead-free food-grade ceramic.',
    sold: 4320,
  },
  {
    id: 'p11',
    name: 'Vitamin C + Niacinamide Brightening Serum',
    brand: 'Minimalist',
    seller: 'Beauty Essentials',
    category: 'Beauty & Personal Care',
    price: 499,
    mrp: 899,
    discount: 44,
    rating: 4.4,
    reviews: 5621,
    image: 'https://images.unsplash.com/photo-1748543668676-ea8241cb3886?w=400&h=500&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1748543668676-ea8241cb3886?w=600&h=750&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1748543668646-e81cda0890f3?w=600&h=750&fit=crop&auto=format',
    ],
    freeDelivery: true,
    cod: true,
    badge: 'bestseller',
    inStock: true,
    description: 'Science-backed brightening serum with 10% Vitamin C and 5% Niacinamide. Reduces dark spots, evens skin tone, and boosts collagen. Dermatologically tested. Suitable for all skin types.',
    sold: 28400,
  },
  {
    id: 'p12',
    name: 'Advanced Anti-Aging Serum Combo (Set of 3)',
    brand: 'Dot & Key',
    seller: 'Glow Store',
    category: 'Beauty & Personal Care',
    price: 799,
    mrp: 1599,
    discount: 50,
    rating: 4.2,
    reviews: 2341,
    image: 'https://images.unsplash.com/photo-1748543668646-e81cda0890f3?w=400&h=500&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1748543668646-e81cda0890f3?w=600&h=750&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1748543668676-ea8241cb3886?w=600&h=750&fit=crop&auto=format',
    ],
    freeDelivery: true,
    cod: true,
    badge: 'new',
    inStock: true,
    description: 'Complete anti-aging routine in one set. Includes Retinol Night Serum, Hyaluronic Acid Day Serum, and Peptide Eye Serum. Clinically proven to reduce fine lines in 4 weeks.',
    sold: 9870,
  },
  {
    id: 'p13',
    name: 'Paisley Print Navy Blue Kurti — XL Collection',
    brand: 'Anouk',
    seller: 'Fashion Hub',
    category: 'Women Ethnic',
    price: 399,
    mrp: 999,
    discount: 60,
    rating: 4.0,
    reviews: 1893,
    image: 'https://images.unsplash.com/photo-1760287364219-160c234ded00?w=400&h=500&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1760287364219-160c234ded00?w=600&h=750&fit=crop&auto=format',
    ],
    freeDelivery: true,
    cod: true,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['Navy', 'Teal', 'Purple'],
    description: 'Classic paisley print kurti in breathable rayon fabric. Features straight cut with side slits for comfort. Machine washable. Available in extended plus sizes.',
    sold: 7650,
  },
  {
    id: 'p14',
    name: 'Banarasi Silk Saree with Gold Zari Work',
    brand: 'Nalli Silks',
    seller: 'Silk Palace',
    category: 'Women Ethnic',
    price: 1799,
    mrp: 4499,
    discount: 60,
    rating: 4.8,
    reviews: 412,
    image: 'https://images.unsplash.com/photo-1610189337543-1c5d8e64f574?w=400&h=500&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1610189337543-1c5d8e64f574?w=600&h=750&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1610313416292-e350ece568f6?w=600&h=750&fit=crop&auto=format',
    ],
    freeDelivery: true,
    cod: false,
    badge: 'trending',
    inStock: true,
    colors: ['Yellow-Red', 'Green-Gold', 'Pink-Silver'],
    description: 'Handwoven Banarasi silk saree with intricate gold zari work. Crafted by skilled weavers in Varanasi. Each piece takes 15-20 days to weave. Comes in signature gift packaging.',
    sold: 1890,
  },
  {
    id: 'p15',
    name: 'King Size Cotton Bedsheet Set — Floral (3 pcs)',
    brand: 'Bombay Dyeing',
    seller: 'HomeWorld',
    category: 'Home & Kitchen',
    price: 649,
    mrp: 1699,
    discount: 62,
    rating: 4.1,
    reviews: 7231,
    image: 'https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=400&h=400&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=600&h=600&fit=crop&auto=format',
    ],
    freeDelivery: true,
    cod: true,
    inStock: true,
    colors: ['White-Floral', 'Blue-Geometric', 'Green-Paisley', 'Pink-Floral'],
    description: 'Premium 100% cotton bedsheet set for king size bed. Includes 1 bedsheet (108x108 inches) and 2 pillow covers. 300 thread count for ultra-soft feel. Pre-washed to prevent shrinkage.',
    sold: 31200,
  },
]

/* ─────────────────────────────────────────────────────────────
   Extended catalog — generated from compact specs so the
   marketplace feels real across every category in the header.
   Every image URL below has been verified to load.
   ───────────────────────────────────────────────────────────── */

const img = (id: string, w = 400, h = 500) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`

interface CategoryMeta {
  sellers: string[]
  imgs: string[]
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  'Women Ethnic': {
    sellers: ['Kurti Bazaar', 'Ethnic Wear Co.', 'Drape House', 'Fashion Hub'],
    imgs: [
      '1594633312681-425c7b97ccd1',
      '1585487000160-6ebcfceb0d03',
      '1529139574466-a303027c1d8b',
      '1496747611176-843222e1e57c',
      '1509631179647-0177331693ae',
      '1515372039744-b8f02a3ae446',
      '1543807535-eceef0bc6599',
      '1601924994987-69e26d50dc26',
      '1610030469983-98e550d6193c',
      '1583391733956-3750e0ff4e8b',
      '1566174053879-31528523f8ae',
      '1583407487930-1f0f3a2a19ee',
      '1620706857370-e1b9770e8bb1',
    ],
  },
  'Women Western': {
    sellers: ['Western Wardrobe', 'Trendy Looks', 'Style Street'],
    imgs: [
      '1594633312681-425c7b97ccd1',
      '1529139574466-a303027c1d8b',
      '1496747611176-843222e1e57c',
      '1543807535-eceef0bc6599',
      '1509631179647-0177331693ae',
      '1515372039744-b8f02a3ae446',
    ],
  },
  Men: {
    sellers: ["Men's Mart", 'Urban Threads', 'Classic Wear'],
    imgs: [
      '1596755094514-f87e34085b2c',
      '1598033129183-c4f50c736f10',
      '1602810318383-e386cc2a3ccf',
      '1617137968427-85924c800a22',
      '1584370848010-d7fe6bc767ec',
      '1552374196-c4e7ffc6e126',
      '1520975954732-35dd22299614',
      '1516257984-b1b4d707412e',
      '1562157873-818bc0726f68',
      '1603252109303-2751441dd157',
    ],
  },
  Kids: {
    sellers: ['Little Wonders', 'Tiny Tots Store'],
    imgs: [
      '1596462502278-27bfdc403348',
      '1595246140625-573b715d11dc',
      '1602143407151-7111542de6e8',
      '1571945153237-4929e783af4a',
      '1515488042361-ee00e0ddd4e4',
    ],
  },
  'Home & Kitchen': {
    sellers: ['HomeWorld', 'Decor & More', 'KitchenKart'],
    imgs: [
      '1584622650111-993a426fbf0a',
      '1585032226651-759b368d7246',
      '1556911220-bff31c812dba',
      '1493809842364-78817add7ffb',
      '1519710164239-da123dc03ef4',
      '1604014237800-1c9102c219da',
      '1567016432779-094069958ea5',
      '1505693416388-ac5ce068fe85',
      '1584622781564-1d987f7333c1',
      '1586023492125-27b2c045efd7',
      '1560343090-f0409e92791a',
      '1540575467063-178a50c2df87',
    ],
  },
  'Beauty & Personal Care': {
    sellers: ['Beauty Essentials', 'Glow Store', 'SkinScience'],
    imgs: [
      '1556228720-195a672e8a03',
      '1556228578-8c89e6adf883',
      '1571781926291-c477ebfd024b',
      '1598440947619-2c35fc9aa908',
      '1541643600914-78b084683601',
      '1522337660859-02fbefca4702',
      '1560750588-73207b1ef5b8',
    ],
  },
  Jewellery: {
    sellers: ['Jewel Craft', 'Ornate Jewels', 'Goldify'],
    imgs: [
      '1515562141207-7a88fb7ce338',
      '1605100804763-247f67b3557e',
      '1599643478518-a784e5dc4c8f',
      '1573408301185-9146fe634ad0',
      '1535632066927-ab7c9ab60908',
    ],
  },
  Footwear: {
    sellers: ['StepRight', 'Sole Store', 'FootFashion'],
    imgs: [
      '1542291026-7eec264c27ff',
      '1595950653106-6c9ebd614d3a',
      '1549298916-b41d501d3772',
      '1600185365483-26d7a4cc7519',
      '1543163521-1bf539c55dd2',
      '1560769629-975ec94e6a86',
      '1596703263926-eb0762ee17e4',
    ],
  },
  Electronics: {
    sellers: ['TechZone India', 'Gadget World', 'ElectroMart'],
    imgs: [
      '1505740420928-5e560c06d30e',
      '1592899677977-9c10ca588bbd',
      '1606220945770-b5b6c2c55bf1',
      '1589003077984-894e133dabab',
      '1526170375885-4d8ecf77b99f',
      '1516035069371-29a1b244cc32',
      '1585790050230-5dd28404ccb9',
      '1496181133206-80ce9b88a853',
      '1580910051074-3eb694886505',
      '1511707171634-5f897ff02aa9',
      '1523275335684-37898b6baf30',
      '1547996160-81dfa63595aa',
      '1524592094714-0f0654e20314',
      '1508057198894-247b23fe5ade',
      '1546868871-7041f2a55e12',
      '1524805444758-089113d48a6d',
    ],
  },
  'Mobile Accessories': {
    sellers: ['Mobile Mart', 'Gadget World'],
    imgs: [
      '1618410320928-25228d811631',
      '1606811841689-23dfddce3e95',
      '1523275335684-37898b6baf30',
      '1547996160-81dfa63595aa',
      '1524592094714-0f0654e20314',
      '1508057198894-247b23fe5ade',
    ],
  },
  Bags: {
    sellers: ['Bag Boutique', 'CarryOn'],
    imgs: [
      '1548036328-c9fa89d128fa',
      '1553062407-98eeb64c6a62',
      '1584917865442-de89df76afd3',
      '1590874103328-eac38a683ce7',
      '1591561954557-26941169b49e',
    ],
  },
  Sports: {
    sellers: ['SportZone', 'FitNation'],
    imgs: [
      '1517649763962-0c623066013b',
      '1571019613454-1cb2f99b2d8b',
      '1517836357463-d25dfeac3438',
      '1544367567-0f2fcb009e0b',
    ],
  },
  Toys: {
    sellers: ['ToyTown', 'PlayLand'],
    imgs: [
      '1515488042361-ee00e0ddd4e4',
      '1596462502278-27bfdc403348',
      '1548199973-03cce0bbc87b',
      '1590496793929-36417d3117de',
      '1591047139829-d91aecb6caea',
    ],
  },
}

interface Spec {
  name: string
  brand: string
  category: string
  price: number
  mrp: number
  rating: number
  reviews: number
  colors?: string[]
  sizes?: string[]
  badge?: 'bestseller' | 'new' | 'trending'
  cod?: boolean
}

const SPECS: Spec[] = [
  /* Women Ethnic */
  { name: 'Banarasi Silk Saree with Meenakari Border', brand: 'Nalli Silks', category: 'Women Ethnic', price: 1699, mrp: 4299, rating: 4.7, reviews: 520, colors: ['Red-Gold', 'Green-Gold', 'Blue-Silver'], badge: 'trending' },
  { name: 'Cotton Handloom Saree — Traditional Weave', brand: 'FabIndia', category: 'Women Ethnic', price: 899, mrp: 2199, rating: 4.2, reviews: 1102, colors: ['Mustard', 'Rust', 'Teal'] },
  { name: 'Georgette Printed Kurti with Palazzos', brand: 'Aurelia', category: 'Women Ethnic', price: 649, mrp: 1599, rating: 4.3, reviews: 1876, colors: ['Black', 'Navy', 'Wine'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { name: 'Rayon Straight Kurti with Keyhole Neck', brand: 'W for Woman', category: 'Women Ethnic', price: 549, mrp: 1299, rating: 4.1, reviews: 2945, colors: ['Peach', 'Mint', 'Grey'], sizes: ['XS', 'S', 'M', 'L', 'XL'], badge: 'bestseller' },
  { name: 'Cotton A-Line Kurti with Thread Work', brand: 'Biba', category: 'Women Ethnic', price: 699, mrp: 1799, rating: 4.4, reviews: 2231, colors: ['White', 'Pink', 'Lavender'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: 'new' },
  { name: 'Embroidered Lehenga Choli for Festivals', brand: 'Global Desi', category: 'Women Ethnic', price: 2499, mrp: 5999, rating: 4.6, reviews: 342, colors: ['Maroon', 'Teal', 'Purple'], sizes: ['S', 'M', 'L', 'XL'], badge: 'trending' },
  { name: 'Silk Blend Salwar Suit with Dupatta', brand: 'Anouk', category: 'Women Ethnic', price: 999, mrp: 2499, rating: 4.3, reviews: 998, colors: ['Emerald', 'Royal Blue', 'Burgundy'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: 'bestseller' },
  { name: 'Chikankari Cotton Kurti — Lucknowi Craft', brand: 'Chumbak', category: 'Women Ethnic', price: 799, mrp: 1999, rating: 4.5, reviews: 1432, colors: ['White', 'Sky Blue', 'Beige'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: 'new' },

  /* Women Western */
  { name: 'Ruffled Sleeve Top with Tie-Up Front', brand: 'Forever 21', category: 'Women Western', price: 599, mrp: 1499, rating: 4.2, reviews: 1734, colors: ['White', 'Black', 'Coral'], sizes: ['XS', 'S', 'M', 'L'] },
  { name: 'High-Rise Skinny Jeans — Stretchable', brand: "Levi's", category: 'Women Western', price: 1199, mrp: 2999, rating: 4.4, reviews: 3621, colors: ['Blue', 'Black', 'Grey'], sizes: ['26', '28', '30', '32', '34'], badge: 'bestseller' },
  { name: 'Floral Wrap Midi Dress', brand: 'H&M', category: 'Women Western', price: 999, mrp: 2299, rating: 4.3, reviews: 874, colors: ['Floral Multi', 'Blue', 'Red'], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { name: 'Classic White Shirt — Relaxed Fit', brand: 'Mango', category: 'Women Western', price: 799, mrp: 1899, rating: 4.1, reviews: 2085, colors: ['White', 'Ivory', 'Striped Blue'], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { name: 'Pleated Midi Skirt with Elastic Waist', brand: 'Zara', category: 'Women Western', price: 1099, mrp: 2699, rating: 4.0, reviews: 643, colors: ['Black', 'Beige', 'Olive'], sizes: ['XS', 'S', 'M', 'L'] },
  { name: 'Denim Jacket — Oversized Fit', brand: 'Lee', category: 'Women Western', price: 1499, mrp: 3499, rating: 4.5, reviews: 1520, colors: ['Blue', 'Black', 'Washed'], sizes: ['S', 'M', 'L', 'XL'], badge: 'trending' },

  /* Men */
  { name: 'Men Slim Fit Casual Shirt', brand: 'Raymond', category: 'Men', price: 699, mrp: 1799, rating: 4.3, reviews: 4187, colors: ['White', 'Blue', 'Black', 'Maroon'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: 'bestseller' },
  { name: 'Cotton Polo T-Shirt', brand: 'U.S. Polo Assn.', category: 'Men', price: 499, mrp: 1299, rating: 4.2, reviews: 5620, colors: ['Navy', 'Red', 'Green', 'Black'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { name: 'Men Regular Fit Jeans', brand: "Levi's", category: 'Men', price: 999, mrp: 2499, rating: 4.4, reviews: 6310, colors: ['Blue', 'Black', 'Grey'], sizes: ['28', '30', '32', '34', '36', '38'], badge: 'bestseller' },
  { name: 'Men Kurta with Churidar Set', brand: 'Manyavar', category: 'Men', price: 1299, mrp: 2999, rating: 4.5, reviews: 1287, colors: ['Ivory', 'Maroon', 'Navy'], sizes: ['M', 'L', 'XL', 'XXL'], badge: 'trending' },
  { name: 'Men Formal Shirt — Slim Fit', brand: 'Arrow', category: 'Men', price: 899, mrp: 2199, rating: 4.3, reviews: 3091, colors: ['White', 'Sky Blue', 'Pink'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { name: 'Men Sports T-Shirt — Dry Fit', brand: 'Nike', category: 'Men', price: 599, mrp: 1499, rating: 4.6, reviews: 8421, colors: ['Black', 'Red', 'Blue'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: 'bestseller' },
  { name: 'Men Blazer — Slim Fit', brand: 'Peter England', category: 'Men', price: 1999, mrp: 4999, rating: 4.4, reviews: 486, colors: ['Black', 'Navy', 'Charcoal'], sizes: ['S', 'M', 'L', 'XL'] },
  { name: 'Men Chino Pants', brand: 'Allen Solly', category: 'Men', price: 899, mrp: 2299, rating: 4.2, reviews: 1730, colors: ['Khaki', 'Beige', 'Navy'], sizes: ['28', '30', '32', '34', '36'] },
  { name: 'Cotton V-Neck T-Shirt (Pack of 3)', brand: 'Jockey', category: 'Men', price: 699, mrp: 1599, rating: 4.1, reviews: 9874, colors: ['Multi', 'White', 'Black'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: 'new' },
  { name: 'Men Ethnic Jacket — Nehru Style', brand: 'FabIndia', category: 'Men', price: 1199, mrp: 2999, rating: 4.3, reviews: 512, colors: ['Maroon', 'Green', 'Blue'], sizes: ['M', 'L', 'XL', 'XXL'] },

  /* Kids */
  { name: 'Kids Cotton Printed T-Shirt', brand: 'Hopscotch', category: 'Kids', price: 299, mrp: 799, rating: 4.2, reviews: 2210, colors: ['Red', 'Blue', 'Yellow', 'Green'], sizes: ['2-3Y', '3-4Y', '5-6Y', '7-8Y', '9-10Y'] },
  { name: 'Kids Ethnic Wear — Kurta Pajama Set', brand: 'FirstCry', category: 'Kids', price: 599, mrp: 1499, rating: 4.4, reviews: 932, colors: ['Maroon', 'Gold', 'Blue'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'] },
  { name: 'Baby Girls Frock with Matching Hairband', brand: 'Catmoss', category: 'Kids', price: 449, mrp: 1099, rating: 4.3, reviews: 1504, colors: ['Pink', 'Peach', 'Lavender'], sizes: ['0-6M', '6-12M', '1-2Y'], badge: 'new' },
  { name: 'Kids Denim Jeans — Adjustable Waist', brand: 'Lilliput', category: 'Kids', price: 549, mrp: 1299, rating: 4.1, reviews: 1108, colors: ['Blue', 'Black'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'] },
  { name: 'School Uniform Set — Shirt & Pants', brand: 'Bata', category: 'Kids', price: 699, mrp: 1599, rating: 4.2, reviews: 3410, colors: ['White-Blue', 'White-Grey'], sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'] },
  { name: 'Kids Winter Jacket — Fleece Lined', brand: 'Mochi', category: 'Kids', price: 899, mrp: 2199, rating: 4.5, reviews: 780, colors: ['Navy', 'Maroon', 'Green'], sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'], badge: 'trending' },

  /* Home & Kitchen */
  { name: 'Non-Stick Kadhai with Glass Lid', brand: 'Prestige', category: 'Home & Kitchen', price: 749, mrp: 1899, rating: 4.3, reviews: 5421, colors: ['Black'] },
  { name: 'Cotton Double Bedsheet Set — 4 pcs', brand: 'Bombay Dyeing', category: 'Home & Kitchen', price: 799, mrp: 1999, rating: 4.2, reviews: 7812, colors: ['Blue', 'Pink', 'Green', 'Yellow'] },
  { name: 'Ceramic Coffee Mug Set (6 pcs)', brand: 'Cello', category: 'Home & Kitchen', price: 399, mrp: 999, rating: 4.1, reviews: 4532, colors: ['Assorted', 'Blue', 'Black'] },
  { name: 'LED Table Lamp with USB Port', brand: 'Philips', category: 'Home & Kitchen', price: 649, mrp: 1499, rating: 4.4, reviews: 2310, colors: ['White', 'Black', 'Grey'], badge: 'new' },
  { name: 'Storage Organizer Set — 6 pcs', brand: 'AmazonBasics', category: 'Home & Kitchen', price: 549, mrp: 1299, rating: 4.0, reviews: 3129, colors: ['Multi', 'White', 'Brown'] },
  { name: 'Steel Tiffin Box — 3 Tier', brand: 'Milton', category: 'Home & Kitchen', price: 449, mrp: 1099, rating: 4.3, reviews: 6890, colors: ['Stainless', 'Blue', 'Green'], badge: 'bestseller' },
  { name: 'Memory Foam Pillow with Cover', brand: 'Sleepyhead', category: 'Home & Kitchen', price: 899, mrp: 2299, rating: 4.5, reviews: 4120, colors: ['White', 'Grey'], badge: 'trending' },
  { name: 'Frying Pan — Induction Compatible', brand: 'Hawkins', category: 'Home & Kitchen', price: 599, mrp: 1499, rating: 4.2, reviews: 3214, colors: ['Black'] },
  { name: 'Wall Clock — Minimalist Design', brand: 'Ajanta', category: 'Home & Kitchen', price: 349, mrp: 899, rating: 4.0, reviews: 1876, colors: ['Black', 'White', 'Wood'] },
  { name: 'Water Bottle 1L — Insulated', brand: 'Borosil', category: 'Home & Kitchen', price: 399, mrp: 999, rating: 4.3, reviews: 9210, colors: ['Blue', 'Black', 'Silver'], badge: 'bestseller' },

  /* Beauty */
  { name: 'Vitamin C Face Wash with Turmeric', brand: 'Minimalist', category: 'Beauty & Personal Care', price: 249, mrp: 499, rating: 4.3, reviews: 8210, badge: 'bestseller' },
  { name: 'Hyaluronic Acid Hydrating Serum', brand: 'The Derma Co.', category: 'Beauty & Personal Care', price: 399, mrp: 899, rating: 4.4, reviews: 5630, badge: 'new' },
  { name: 'Kajal & Eyeliner Combo', brand: 'Lakme', category: 'Beauty & Personal Care', price: 299, mrp: 599, rating: 4.2, reviews: 11230, badge: 'bestseller' },
  { name: 'Anti-Dandruff Shampoo 340ml', brand: 'Head & Shoulders', category: 'Beauty & Personal Care', price: 279, mrp: 549, rating: 4.1, reviews: 15200 },
  { name: 'SPF 50 Sunscreen Gel', brand: 'Dot & Key', category: 'Beauty & Personal Care', price: 449, mrp: 999, rating: 4.5, reviews: 7230, badge: 'trending' },
  { name: 'Herbal Face Pack with Multani Mitti', brand: 'Himalaya', category: 'Beauty & Personal Care', price: 199, mrp: 399, rating: 4.0, reviews: 9830 },
  { name: 'Matte Lipstick — Long Stay', brand: 'Maybelline', category: 'Beauty & Personal Care', price: 349, mrp: 749, rating: 4.3, reviews: 6450, badge: 'new' },
  { name: 'Niacinamide Body Lotion 400ml', brand: 'CeraVe', category: 'Beauty & Personal Care', price: 699, mrp: 1499, rating: 4.6, reviews: 3310 },

  /* Jewellery */
  { name: 'Kundan Bridal Necklace Set', brand: 'Kalyan Jewellers', category: 'Jewellery', price: 899, mrp: 2299, rating: 4.4, reviews: 512, colors: ['Gold', 'Pink', 'Green'] },
  { name: 'Oxidized Silver Jhumka Earrings', brand: 'Tribe Amrapali', category: 'Jewellery', price: 299, mrp: 799, rating: 4.2, reviews: 3210, colors: ['Silver', 'Gold'] },
  { name: 'Antique Brass Bangles Set (6 pcs)', brand: 'Pipa Bella', category: 'Jewellery', price: 399, mrp: 999, rating: 4.1, reviews: 1876, colors: ['Gold', 'Copper'] },
  { name: 'Pearl Stud Earrings — 14k Gold Plated', brand: 'Tanishq', category: 'Jewellery', price: 599, mrp: 1499, rating: 4.5, reviews: 987, colors: ['White', 'Pink', 'Black'], badge: 'new' },
  { name: 'Temple Jewellery Pendant Chain', brand: 'CaratLane', category: 'Jewellery', price: 799, mrp: 1999, rating: 4.3, reviews: 654, colors: ['Gold', 'Silver'] },
  { name: 'Chandbali Earrings with Stone Work', brand: 'Amrapali', category: 'Jewellery', price: 499, mrp: 1299, rating: 4.4, reviews: 1432, colors: ['Green', 'Red', 'Blue'], badge: 'trending' },

  /* Footwear */
  { name: 'Men Running Shoes — Lightweight', brand: 'Puma', category: 'Footwear', price: 1499, mrp: 3999, rating: 4.4, reviews: 8210, colors: ['Black', 'Blue', 'Red'], sizes: ['6', '7', '8', '9', '10', '11'], badge: 'bestseller' },
  { name: 'Women Wedge Heels', brand: 'Bata', category: 'Footwear', price: 999, mrp: 2499, rating: 4.2, reviews: 3120, colors: ['Black', 'Tan', 'Nude'], sizes: ['5', '6', '7', '8'] },
  { name: 'Men Formal Leather Shoes', brand: 'Hush Puppies', category: 'Footwear', price: 1799, mrp: 4499, rating: 4.5, reviews: 2104, colors: ['Black', 'Brown'], sizes: ['7', '8', '9', '10', '11'], badge: 'trending' },
  { name: 'Women Casual Sneakers', brand: 'Skechers', category: 'Footwear', price: 1299, mrp: 3299, rating: 4.3, reviews: 4560, colors: ['White', 'Pink', 'Grey'], sizes: ['5', '6', '7', '8', '9'], badge: 'bestseller' },
  { name: 'Kids Sports Shoes', brand: 'Campus', category: 'Footwear', price: 699, mrp: 1699, rating: 4.1, reviews: 6320, colors: ['Blue', 'Red', 'Black'], sizes: ['1', '2', '3', '4', '5'] },
  { name: 'Men Sandals — Sports Style', brand: 'Sparx', category: 'Footwear', price: 549, mrp: 1299, rating: 4.0, reviews: 2456, colors: ['Black', 'Brown'], sizes: ['7', '8', '9', '10'] },
  { name: 'Women Ballerinas — Comfort Fit', brand: 'Metro', category: 'Footwear', price: 649, mrp: 1599, rating: 4.2, reviews: 1874, colors: ['Black', 'Nude', 'Red'], sizes: ['5', '6', '7', '8'], badge: 'new' },

  /* Electronics */
  { name: 'Smart Watch with AMOLED Display', brand: 'Noise', category: 'Electronics', price: 1999, mrp: 4999, rating: 4.3, reviews: 12840, colors: ['Black', 'Silver', 'Pink'], badge: 'bestseller' },
  { name: 'Bluetooth Speaker 20W', brand: 'JBL', category: 'Electronics', price: 1599, mrp: 3999, rating: 4.4, reviews: 9320, colors: ['Black', 'Blue', 'Red'], badge: 'trending' },
  { name: '50W Fast Charger Adapter', brand: 'Samsung', category: 'Electronics', price: 499, mrp: 999, rating: 4.2, reviews: 18450, colors: ['Black', 'White'] },
  { name: 'Wireless Mouse — Silent Click', brand: 'Logitech', category: 'Electronics', price: 449, mrp: 899, rating: 4.3, reviews: 11230, colors: ['Black', 'White', 'Grey'] },
  { name: '4K Action Camera with Accessories', brand: 'GoPro', category: 'Electronics', price: 14999, mrp: 29999, rating: 4.5, reviews: 2104, colors: ['Black'] },
  { name: 'Smartphone Gimbal Stabilizer', brand: 'DJI', category: 'Electronics', price: 4999, mrp: 9999, rating: 4.6, reviews: 892, colors: ['Black', 'Grey'] },

  /* Mobile Accessories */
  { name: 'Tempered Glass Screen Guard (Pack of 2)', brand: 'mCover', category: 'Mobile Accessories', price: 149, mrp: 399, rating: 4.1, reviews: 25430, colors: ['Clear'] },
  { name: 'USB-C Fast Charging Cable 1m', brand: 'boAt', category: 'Mobile Accessories', price: 199, mrp: 499, rating: 4.2, reviews: 31210, colors: ['Black', 'Red', 'Blue'] },
  { name: 'Mobile Holder — Flexible Gooseneck', brand: 'Portronics', category: 'Mobile Accessories', price: 249, mrp: 599, rating: 4.0, reviews: 12450, colors: ['Black', 'White'] },
  { name: 'Power Bank 20000mAh', brand: 'Anker', category: 'Mobile Accessories', price: 1499, mrp: 3499, rating: 4.5, reviews: 8910, colors: ['Black', 'White', 'Blue'], badge: 'bestseller' },
  { name: 'Phone Ring Light for Selfies', brand: 'Digitek', category: 'Mobile Accessories', price: 299, mrp: 699, rating: 4.1, reviews: 6750, colors: ['Black'] },

  /* Bags */
  { name: 'Women Handbag — Tote with Zips', brand: 'Lavie', category: 'Bags', price: 799, mrp: 1999, rating: 4.3, reviews: 4210, colors: ['Black', 'Brown', 'Tan'], badge: 'bestseller' },
  { name: 'Backpack 25L with Laptop Compartment', brand: 'Wildcraft', category: 'Bags', price: 1099, mrp: 2799, rating: 4.4, reviews: 5340, colors: ['Navy', 'Black', 'Grey'], badge: 'trending' },
  { name: 'Women Sling Bag — Crossbody', brand: 'Caprese', category: 'Bags', price: 699, mrp: 1799, rating: 4.2, reviews: 2876, colors: ['Black', 'Red', 'Beige'] },
  { name: 'Travel Duffel Bag 40L', brand: 'Skybags', category: 'Bags', price: 1299, mrp: 2999, rating: 4.3, reviews: 1920, colors: ['Black', 'Blue', 'Green'] },
  { name: 'Men Wallet — RFID Blocking', brand: 'Hidesign', category: 'Bags', price: 599, mrp: 1499, rating: 4.1, reviews: 7650, colors: ['Brown', 'Black'] },

  /* Sports */
  { name: 'Yoga Mat 6mm — Non Slip', brand: 'Boldfit', category: 'Sports', price: 399, mrp: 999, rating: 4.3, reviews: 8210, colors: ['Purple', 'Blue', 'Black'], badge: 'bestseller' },
  { name: 'Dumbbell Set 5kg (Pair)', brand: 'Kobo', category: 'Sports', price: 899, mrp: 1999, rating: 4.2, reviews: 3420, colors: ['Black', 'Grey'] },
  { name: 'Cricket Bat — Kashmir Willow', brand: 'MRF', category: 'Sports', price: 1299, mrp: 2999, rating: 4.4, reviews: 1560, colors: ['Natural', 'Red'] },
  { name: 'Resistance Bands Set (5 pcs)', brand: 'Lifelong', category: 'Sports', price: 349, mrp: 899, rating: 4.1, reviews: 4120, colors: ['Multi'], badge: 'new' },
  { name: 'Football — Size 5', brand: 'Nivia', category: 'Sports', price: 449, mrp: 1099, rating: 4.3, reviews: 5230, colors: ['White-Black', 'Blue', 'Orange'] },

  /* Toys */
  { name: 'Educational Building Blocks (100 pcs)', brand: 'Funskool', category: 'Toys', price: 599, mrp: 1499, rating: 4.4, reviews: 3210, colors: ['Multi'], badge: 'bestseller' },
  { name: 'Remote Control Car — Off-Road', brand: 'Hot Wheels', category: 'Toys', price: 999, mrp: 2499, rating: 4.2, reviews: 1890, colors: ['Red', 'Blue', 'Green'] },
  { name: 'Soft Plush Teddy Bear 18 inch', brand: 'Mattel', category: 'Toys', price: 499, mrp: 1299, rating: 4.5, reviews: 5640, colors: ['Brown', 'White', 'Pink'], badge: 'trending' },
  { name: 'Board Game — Ludo & Snakes Ladder', brand: 'Hasbro', category: 'Toys', price: 349, mrp: 899, rating: 4.1, reviews: 8760, colors: ['Multi'] },
]

const DESCRIPTIONS: Record<string, string[]> = {
  'Women Ethnic': [
    'Premium handcrafted ethnic wear made from breathable fabrics with elegant embroidery and traditional motifs. Perfect for festivals, weddings, and everyday grace.',
    'Made in India by skilled artisans using age-old weaving techniques. Rich colors, comfortable fit, and detailing that elevates any occasion.',
    'Lightweight, skin-friendly fabric with premium stitching. Machine washable and designed to keep you comfortable through long festive days.',
  ],
  'Women Western': [
    'Trendy western wear crafted from soft, breathable fabrics. Regular fit with clean tailoring that flatters every body type.',
    'Versatile wardrobe staple — easy to dress up or down. High-quality stitching with fade-resistant color that lasts wash after wash.',
    'Comfort-first design with a fashion-forward silhouette. Ideal for work, brunch, or weekend outings.',
  ],
  Men: [
    'Sharp, comfortable menswear in premium fabrics with a tailored fit. Built for everyday wear and easy care.',
    'Classic styles with modern detailing. Breathable fabric keeps you fresh all day, whether at work or at play.',
    'Quality stitching and wrinkle-resistant fabric make this a dependable everyday essential.',
  ],
  Kids: [
    'Soft, skin-friendly fabric that is gentle on little ones. Bright colors and playful prints kids will love.',
    'Comfortable fits with easy-care fabric. Designed for active play and endless adventures.',
    'Premium quality kids wear that is durable, machine washable, and safe for sensitive skin.',
  ],
  'Home & Kitchen': [
    'Durable, food-safe materials built for daily use. Easy to clean and built to last for years.',
    'Premium quality designed for Indian kitchens and homes. Value-for-money essentials with a trusted brand warranty.',
    'Thoughtfully designed with functionality in mind — looks great and works even better.',
  ],
  'Beauty & Personal Care': [
    'Dermatologically tested formula suitable for all skin types. Free from parabens and harsh chemicals.',
    'Clinically proven results with consistent use. Cruelty-free and made with safe, science-backed ingredients.',
    'Premium skincare that delivers visible results. pH balanced and suitable for sensitive skin.',
  ],
  Jewellery: [
    'Intricately crafted jewellery with fine detailing. Hypoallergenic and tarnish-resistant for lasting shine.',
    'Traditional designs reimagined with modern finish. Lightweight and comfortable for all-day wear.',
    'Premium finish with a rich look. Each piece is quality checked before shipping.',
  ],
  Footwear: [
    'Comfort-cushioned footwear with non-slip, durable soles. Built for all-day comfort.',
    'Premium materials with superior grip and breathability. Available in a range of sizes for the perfect fit.',
    'Style meets comfort — lightweight, flexible, and made to last through daily wear.',
  ],
  Electronics: [
    'Latest technology with premium build quality. 1-year manufacturer warranty included.',
    'High-performance device with long battery life and smart features. Backed by trusted brand support.',
    'Plug-and-play simplicity with advanced features. Compact, durable, and great value for money.',
  ],
  'Mobile Accessories': [
    'Universal compatibility with all major smartphone brands. Durable build for long-lasting use.',
    'Tested for safety and performance. Compact design that is easy to carry anywhere.',
    'Premium quality accessory that protects and enhances your device experience.',
  ],
  Bags: [
    'Premium material with reinforced stitching and quality zippers. Spacious compartments for organized storage.',
    'Comfortable straps and lightweight design. Built to handle daily commutes and travel.',
    'Stylish and functional — durable construction with a premium finish.',
  ],
  Sports: [
    'Gym-grade quality with durable, sweat-proof construction. Designed for serious workouts.',
    'Lightweight and portable — perfect for home, gym, or outdoor training.',
    'Premium sports equipment trusted by athletes. Built to withstand intense use.',
  ],
  Toys: [
    'Made from non-toxic, child-safe materials. Meets international safety standards.',
    'Encourages creativity and learning through play. Durable construction for years of fun.',
    'Bright, engaging design that kids love. Safe for all ages with smooth edges.',
  ],
}

function buildGenerated(): Product[] {
  return SPECS.map((s, i) => {
    const meta = CATEGORY_META[s.category]
    const pool = meta.imgs
    const primary = pool[i % pool.length]
    const secondary = pool[(i + 3) % pool.length]
    const sellers = meta.sellers
    const descriptions = DESCRIPTIONS[s.category] ?? DESCRIPTIONS['Home & Kitchen']
    const colors = s.colors ?? []
    return {
      id: `p${16 + i}`,
      name: s.name,
      brand: s.brand,
      seller: sellers[i % sellers.length],
      category: s.category,
      price: s.price,
      mrp: s.mrp,
      discount: Math.round((1 - s.price / s.mrp) * 100),
      rating: s.rating,
      reviews: s.reviews,
      image: img(primary),
      images: [img(primary, 600, 750), img(secondary, 600, 750)],
      freeDelivery: true,
      cod: s.cod !== false,
      badge: s.badge,
      inStock: i % 11 !== 8,
      colors: colors.length > 0 ? colors : undefined,
      sizes: s.sizes,
      description: descriptions[i % descriptions.length],
      sold: Math.round(s.reviews * (4 + (i % 6))),
    }
  })
}

products.push(...buildGenerated())

/* ─────────────────────────────────────────────────────────────
   Categories strip + coupons
   ───────────────────────────────────────────────────────────── */
export const categories = [
  { name: 'Women Ethnic', icon: '👗', count: 45230 },
  { name: 'Women Western', icon: '👚', count: 23410 },
  { name: 'Men', icon: '👔', count: 31290 },
  { name: 'Kids', icon: '🧒', count: 18450 },
  { name: 'Home & Kitchen', icon: '🏠', count: 29810 },
  { name: 'Beauty', icon: '💄', count: 15230 },
  { name: 'Jewellery', icon: '💍', count: 12890 },
  { name: 'Footwear', icon: '👟', count: 19230 },
  { name: 'Electronics', icon: '📱', count: 8901 },
  { name: 'Mobile Accessories', icon: '🔌', count: 11230 },
  { name: 'Bags', icon: '👜', count: 9230 },
  { name: 'Grocery', icon: '🛒', count: 5670 },
  { name: 'Sports', icon: '⚽', count: 7890 },
  { name: 'Health', icon: '💊', count: 6450 },
  { name: 'Toys', icon: '🧸', count: 8901 },
]

export const coupons: Coupon[] = [
  { code: 'WELCOME100', discount: 100, type: 'flat', minOrder: 499, expiry: '31 Aug 2026', description: 'Get ₹100 OFF on your first order' },
  { code: 'SAVE20', discount: 20, type: 'percent', minOrder: 999, maxDiscount: 200, expiry: '31 Dec 2026', description: '20% OFF up to ₹200 on all orders' },
  { code: 'UPIBONUS', discount: 50, type: 'flat', minOrder: 299, expiry: '30 Sep 2026', description: 'Extra ₹50 OFF on UPI payments' },
  { code: 'FASHION30', discount: 30, type: 'percent', minOrder: 799, maxDiscount: 300, expiry: '15 Sep 2026', description: '30% OFF on Women Ethnic category' },
]

export const indianStates = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa',
  'Gujarat', 'Haryana', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
]

/* Demo orders used by account / tracking / admin screens */
export interface DemoOrder {
  id: string
  date: string
  product: string
  image: string
  price: number
  status: string
  statusColor: string
  seller: string
  quantity: number
  city: string
}

export const demoOrders: DemoOrder[] = [
  { id: 'BC-2026-847291', date: '9 Aug 2026', product: 'Women Floral Printed Cotton Kurti', image: img('1708534246051-7f47b279e94b', 80, 80), price: 499, status: 'Shipped', statusColor: '#3B82F6', seller: 'Fashion Hub', quantity: 1, city: 'Mumbai' },
  { id: 'BC-2026-821033', date: '2 Aug 2026', product: 'ProSound True Wireless Earbuds with ANC', image: img('1572569511254-d8f925fe2cbb', 80, 80), price: 1299, status: 'Delivered', statusColor: '#10B981', seller: 'TechZone India', quantity: 1, city: 'Mumbai' },
  { id: 'BC-2026-799104', date: '25 Jul 2026', product: 'Vitamin C + Niacinamide Brightening Serum', image: img('1748543668676-ea8241cb3886', 80, 80), price: 499, status: 'Delivered', statusColor: '#10B981', seller: 'Beauty Essentials', quantity: 2, city: 'Mumbai' },
  { id: 'BC-2026-773820', date: '15 Jul 2026', product: 'Premium Stainless Steel Cookware Set (5 pcs)', image: img('1556909212-d5b604d0c90d', 80, 80), price: 1499, status: 'Delivered', statusColor: '#10B981', seller: 'HomeWorld', quantity: 1, city: 'Pune' },
  { id: 'BC-2026-752910', date: '8 Jul 2026', product: 'Pure Silk Kanjivaram Saree with Zari Border', image: img('1610189012906-4c0aa9b9781e', 80, 80), price: 1999, status: 'Returned', statusColor: '#EF4444', seller: 'Silk Palace', quantity: 1, city: 'Mumbai' },
  { id: 'BC-2026-734510', date: '28 Jun 2026', product: 'Men Slim Fit Casual Shirt', image: img('1596755094514-f87e34085b2c', 80, 80), price: 699, status: 'Delivered', statusColor: '#10B981', seller: "Men's Mart", quantity: 1, city: 'Delhi' },
  { id: 'BC-2026-718293', date: '18 Jun 2026', product: 'Yoga Mat 6mm — Non Slip', image: img('1544367567-0f2fcb009e0b', 80, 80), price: 399, status: 'Delivered', statusColor: '#10B981', seller: 'SportZone', quantity: 1, city: 'Mumbai' },
  { id: 'BC-2026-701134', date: '5 Jun 2026', product: 'Kundan Bridal Necklace Set', image: img('1515562141207-7a88fb7ce338', 80, 80), price: 899, status: 'Delivered', statusColor: '#10B981', seller: 'Jewel Craft', quantity: 1, city: 'Jaipur' },
]
