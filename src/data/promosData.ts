import { PromoItem } from '../types';

export const promosData: PromoItem[] = [
  {
    id: 'promo-1',
    title: 'Weekend Hakot Haul',
    subtitle: 'Save up to 35% on daily grocery staples, cooking oils, and rice bags',
    discount: 'Up to 35% OFF',
    code: 'SABAY2026',
    validUntil: 'Every Friday – Sunday',
    bgPastel: '#FEE2E2',
    accentTag: '#E22C28',
    description: 'Stock up your pantry for the week ahead. Exclusive markdowns on fresh poultry, canned staples, and laundry detergents across all branches and online store.'
  },
  {
    id: 'promo-2',
    title: 'Piso Deals Extravaganza',
    subtitle: 'Add selected household items for just ₱1 with minimum ₱1,200 spend',
    discount: '₱1 ADD-ON',
    code: 'PISODEAL',
    validUntil: 'Mid-Month & Payday Special',
    bgPastel: '#FEF9C3',
    accentTag: '#F0E901',
    description: 'Our signature customer-appreciation celebration! Grab 1kg sugar, bath soap bars, or kitchen towels for exactly ₱1 when you reach the checkout tier.'
  },
  {
    id: 'promo-3',
    title: 'Kasosyo Sari-Sari Volume Saver',
    subtitle: 'Wholesale carton tiered savings for neighborhood store entrepreneurs',
    discount: 'Extra 8% Rebate',
    code: 'KASOSYOVIP',
    validUntil: 'Continuous Program',
    bgPastel: '#E8F5EC',
    accentTag: '#036936',
    description: 'Empowering Filipino neighborhood sari-sari stores with direct-from-manufacturer volume pricing, consignment credit support, and free warehouse loading.'
  },
  {
    id: 'promo-4',
    title: 'Royalty First-Time Member Welcome',
    subtitle: 'Get ₱150 instant discount on your first online or store checkout',
    discount: '₱150 WELCOME',
    code: 'ROYALTYNEW',
    validUntil: 'Valid on New Registrations',
    bgPastel: '#FEE2E2',
    accentTag: '#E22C28',
    description: 'Sign up for the free Royalty Rewards card today and claim your instant introductory voucher code valid on groceries, clothing, and home essentials.'
  }
];
