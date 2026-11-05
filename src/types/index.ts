export type Product = {
  id: string;
  name: string;
  category: 'Daily Essentials' | 'Pantry Favorites' | 'Home & Living' | 'Fresh & Chilled' | 'Personal Care' | 'Kasosyo Bulk';
  price: number;
  originalPrice?: number;
  unit: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  badge?: string;
  description: string;
  specs: { [key: string]: string };
  image: string;
  accentColor?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type StoreLocation = {
  id: string;
  name: string;
  region: 'Luzon' | 'Visayas' | 'Mindanao';
  city: string;
  province: string;
  address: string;
  hours: string;
  phone: string;
  amenities: string[];
  coordinates?: { lat: number; lng: number };
  featured?: boolean;
};

export type LoyaltyTier = {
  id: 'royalty' | 'royalty-gold' | 'royalty-platinum' | 'royalty-diamond';
  name: string;
  tagline: string;
  badge: string;
  themeColor: string;
  bgClass: string;
  borderClass: string;
  textColor: string;
  description: string;
  multiplier: string;
  perks: string[];
  cardImage: string;
  cardGradient?: string;
  cardTextColor?: string;
};

export type JobOpening = {
  id: string;
  title: string;
  department: 'Store Operations' | 'Merchandising' | 'Supply Chain' | 'Digital & Tech' | 'Human Resources';
  location: string;
  type: 'Full-time' | 'Shift' | 'Contract';
  description: string;
};

export type PromoItem = {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  code?: string;
  validUntil: string;
  bgPastel: string;
  accentTag: string;
  description: string;
};
