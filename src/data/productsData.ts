import { Product } from '../types';
import { getAssetUrl } from '../utils/assets';

const freshPantryImg = getAssetUrl('assets/images/prince_fresh_pantry_1793803411885.jpg');
const heroPhoneImg = getAssetUrl('assets/images/hero_phone_retail_screen_1793803409322.jpg');
const storeCommunityImg = getAssetUrl('assets/images/prince_store_community_1793803410656.jpg');

export const productsData: Product[] = [
  {
    id: 'prod-1',
    name: 'Dinorado Super Special Fragrant Rice',
    category: 'Daily Essentials',
    price: 295,
    originalPrice: 330,
    unit: '5kg pack',
    rating: 4.9,
    reviewsCount: 342,
    inStock: true,
    badge: 'Best Seller',
    description: 'Freshly milled, fragrant aromatic Dinorado whole-grain rice. Soft, fluffy, and naturally scented when cooked—the staple favorite of Filipino dining tables.',
    specs: {
      'Net Weight': '5 Kilograms',
      'Grain Type': '100% Whole Dinorado White Rice',
      'Milling Grade': 'Premium Well-Milled',
      'Origin': 'Mindoro, Philippines'
    },
    image: freshPantryImg,
    accentColor: '#EF777B'
  },
  {
    id: 'prod-2',
    name: 'Pure White Refined Cane Sugar',
    category: 'Daily Essentials',
    price: 78,
    originalPrice: 85,
    unit: '1kg pack',
    rating: 4.8,
    reviewsCount: 198,
    inStock: true,
    badge: 'Everyday Low Price',
    description: 'High-grade 100% pure Philippine cane sugar. Sparkling fine crystals ideal for everyday morning coffee, cooking sauces, and home baking.',
    specs: {
      'Net Weight': '1 Kilogram',
      'Source': 'Negros Occidental Cane Sugar',
      'Purity': '99.8% Refined Sucrose'
    },
    image: freshPantryImg,
    accentColor: '#F7DF8B'
  },
  {
    id: 'prod-3',
    name: 'Golden Fiesta Pure Palm Cooking Oil',
    category: 'Daily Essentials',
    price: 94,
    originalPrice: 108,
    unit: '1 Liter Stand-Up Pouch',
    rating: 4.9,
    reviewsCount: 412,
    inStock: true,
    badge: 'Kitchen Staple',
    description: 'Triple-refined, cholesterol-free cooking oil fortified with Vitamin A. High smoke point delivers crispy golden fried chicken, lumpia, and fish without greasiness.',
    specs: {
      'Volume': '1,000 mL (1 Liter)',
      'Fortification': 'Vitamin A Fortified (Sangkap Pinoy)',
      'Shelf Life': '18 Months'
    },
    image: freshPantryImg,
    accentColor: '#B8D9C4'
  },
  {
    id: 'prod-4',
    name: 'Fresh Farm Native Brown Eggs',
    category: 'Fresh & Chilled',
    price: 235,
    originalPrice: 260,
    unit: 'Tray of 30 Eggs',
    rating: 4.9,
    reviewsCount: 520,
    inStock: true,
    badge: 'Farm Fresh Daily',
    description: 'Grade A fresh large farm eggs sourced directly from partner local poultry co-ops in Batangas and Cebu. Golden rich yolks packed with natural protein.',
    specs: {
      'Quantity': '30 Pieces (1 Tray)',
      'Size': 'Large (60g - 65g)',
      'Inspection': 'Bureau of Animal Industry Inspected'
    },
    image: freshPantryImg,
    accentColor: '#EF777B'
  },
  {
    id: 'prod-5',
    name: 'Alaska Fortified Evaporated Milk',
    category: 'Pantry Favorites',
    price: 46,
    originalPrice: 52,
    unit: '370ml can',
    rating: 4.9,
    reviewsCount: 280,
    inStock: true,
    description: 'Creamy, rich evap milk enriched with 10 essential vitamins and minerals. Perfect for sopas, champorado, coffee, and traditional Filipino fruit salads.',
    specs: {
      'Volume': '370 mL',
      'Nutrients': 'Calcium, Vitamin A, B-Complex, D',
      'Format': 'Easy-Open Can'
    },
    image: heroPhoneImg,
    accentColor: '#F7DF8B'
  },
  {
    id: 'prod-6',
    name: 'San Miguel Purefoods Corned Beef',
    category: 'Pantry Favorites',
    price: 89,
    originalPrice: 99,
    unit: '260g easy-open can',
    rating: 4.8,
    reviewsCount: 310,
    inStock: true,
    badge: 'Popular',
    description: 'Classic Filipino breakfast staple made with savory shredded beef and authentic spices. Saute with garlic, onions, and crispy potatoes for a hearty family meal.',
    specs: {
      'Net Weight': '260 Grams',
      'Meat Quality': '100% Pure Beef Strands',
      'Preservatives': 'No Artificial Fillers'
    },
    image: freshPantryImg,
    accentColor: '#EF777B'
  },
  {
    id: 'prod-7',
    name: 'Datu Puti Soy Sauce & Spiced Vinegar Combo',
    category: 'Pantry Favorites',
    price: 68,
    originalPrice: 78,
    unit: 'Twin 1L Bottles',
    rating: 5.0,
    reviewsCount: 640,
    inStock: true,
    badge: 'Paboritong Tambalan',
    description: 'The quintessential "Mukhasim" pairing of Datu Puti Premium Soy Sauce and Pinoy Spiced Vinegar (Sukang Sinamak) for mouthwatering adobo and sawsawan.',
    specs: {
      'Content': '1L Soy Sauce + 1L Cane Vinegar',
      'Origin': 'Naturally Fermented Cane Vinegar & Soy'
    },
    image: freshPantryImg,
    accentColor: '#B8D9C4'
  },
  {
    id: 'prod-8',
    name: 'Lucky Me! Instant Pancit Canton Kalamansi',
    category: 'Pantry Favorites',
    price: 92,
    originalPrice: 105,
    unit: 'Pack of 6 (80g each)',
    rating: 4.9,
    reviewsCount: 890,
    inStock: true,
    badge: 'Snack Favorite',
    description: 'Filipinos favorite merienda noodle with the zesty, tangy kick of authentic calamansi flavor and savory seasoning sauce.',
    specs: {
      'Pack Size': '6 Pouches x 80g',
      'Cooking Time': '3 Minutes'
    },
    image: heroPhoneImg,
    accentColor: '#F7DF8B'
  },
  {
    id: 'prod-9',
    name: 'Bear Brand Fortified Powdered Milk Drink',
    category: 'Daily Essentials',
    price: 315,
    originalPrice: 345,
    unit: '900g foil pouch',
    rating: 4.9,
    reviewsCount: 420,
    inStock: true,
    badge: 'Tibay Linis',
    description: 'Specially formulated with Zinc, Vitamin C, and Iron to give children and hardworking parents the endurance and daily immunity needed for everyday life.',
    specs: {
      'Net Weight': '900 Grams',
      'Yield': 'Approx. 28 glasses',
      'Certifications': 'Halal Certified, Sangkap Pinoy'
    },
    image: freshPantryImg,
    accentColor: '#EF777B'
  },
  {
    id: 'prod-10',
    name: 'Champion Liquid Laundry Detergent Citrus Fresh',
    category: 'Home & Living',
    price: 189,
    originalPrice: 215,
    unit: '1.5 Liter Bottle',
    rating: 4.8,
    reviewsCount: 230,
    inStock: true,
    description: 'Deep-penetrating fabric clean formula with natural calamansi citrus enzymes. Tough on stubborn dirt and collar grime, gentle on sensitive hands.',
    specs: {
      'Volume': '1,500 mL',
      'Application': 'Machine Wash & Hand Wash Compatible',
      'Fragrance': 'Zesty Citrus Blossom'
    },
    image: freshPantryImg,
    accentColor: '#B8D9C4'
  },
  {
    id: 'prod-11',
    name: 'Downy Concentrate Fabric Conditioner Sunrise Fresh',
    category: 'Home & Living',
    price: 175,
    originalPrice: 195,
    unit: '690ml Refill Pouch',
    rating: 4.9,
    reviewsCount: 380,
    inStock: true,
    description: 'Long-lasting morning fresh scent that combats unpleasant sweat odors and indoor drying kulob smell for up to 3 weeks of crisp softness.',
    specs: {
      'Volume': '690 mL',
      'Feature': 'Anti-Kulob Formula',
      'Yield': 'Up to 35 wash loads'
    },
    image: heroPhoneImg,
    accentColor: '#EF777B'
  },
  {
    id: 'prod-12',
    name: 'Safeguard Pure White Antibacterial Bar Soap',
    category: 'Personal Care',
    price: 145,
    originalPrice: 165,
    unit: '3 + 1 Value Saver Pack',
    rating: 4.9,
    reviewsCount: 670,
    inStock: true,
    badge: 'Family Protection',
    description: 'Dermatologically tested antibacterial shield removes up to 99.9% of disease-causing germs while keeping family skin moisturized.',
    specs: {
      'Pack Contents': '4 Bars x 130g',
      'Scent': 'Signature Pure White Clean'
    },
    image: freshPantryImg,
    accentColor: '#B8D9C4'
  },
  {
    id: 'prod-13',
    name: 'Prince Retail Heavy-Duty Spin Mop & Bucket',
    category: 'Home & Living',
    price: 549,
    originalPrice: 699,
    unit: 'Set with 2 Microfiber Heads',
    rating: 4.8,
    reviewsCount: 154,
    inStock: true,
    badge: 'Home Favorite',
    description: '360-degree rotating stainless steel wringer bucket with durable extendable handle. Makes floor cleaning effortless across tile, wood, and concrete.',
    specs: {
      'Material': 'Reinforced PP Resin + Stainless Wringer',
      'Includes': '1 Bucket + 1 Mop Rod + 2 Microfiber Refills'
    },
    image: heroPhoneImg,
    accentColor: '#F7DF8B'
  },
  {
    id: 'prod-14',
    name: 'Kasosyo Wholesale Rice Sack Sinandomeng',
    category: 'Kasosyo Bulk',
    price: 1280,
    originalPrice: 1390,
    unit: '25kg Commercial Sack',
    rating: 5.0,
    reviewsCount: 412,
    inStock: true,
    badge: 'Sari-Sari Best Seller',
    description: 'Wholesale commercial 25kg sack tailored for micro-entrepreneurs and sari-sari store owners. Uniform grain quality with high cooking yield and maximum profit margin.',
    specs: {
      'Net Weight': '25 Kilograms',
      'Target Resale Margin': '18% - 25% for Sari-Sari Retail',
      'Milling': 'Commercial Grade Well Milled'
    },
    image: freshPantryImg,
    accentColor: '#EF777B'
  },
  {
    id: 'prod-15',
    name: 'Kasosyo Wholesale Canned Sardines Box',
    category: 'Kasosyo Bulk',
    price: 890,
    originalPrice: 980,
    unit: 'Case of 48 Cans (155g each)',
    rating: 4.9,
    reviewsCount: 325,
    inStock: true,
    badge: 'Wholesale Deal',
    description: 'Bulk carton of 48 cans of premium sardines in rich tomato sauce with chili. Specially discounted volume pricing for community convenience stores.',
    specs: {
      'Contents': '48 Cans x 155g',
      'Flavor': 'Spicy Tomato Sauce',
      'Shelf Life': '3 Years'
    },
    image: storeCommunityImg,
    accentColor: '#F7DF8B'
  },
  {
    id: 'prod-16',
    name: 'Magnolia Fresh Chicken Whole Fryer',
    category: 'Fresh & Chilled',
    price: 198,
    originalPrice: 220,
    unit: 'Per Whole Bird (~1.2kg)',
    rating: 4.9,
    reviewsCount: 295,
    inStock: true,
    badge: 'Chilled Daily',
    description: 'Guaranteed freshly chilled, dressed whole chicken. Hormone-free and antibiotic-tested; tender and juicy for Sunday tinola or crispy fried chicken.',
    specs: {
      'Approx Weight': '1.1kg - 1.3kg',
      'Handling': 'Cold Chain Maintained 0°C - 4°C',
      'Inspection': 'NMIS Certified Fresh'
    },
    image: freshPantryImg,
    accentColor: '#B8D9C4'
  }
];
