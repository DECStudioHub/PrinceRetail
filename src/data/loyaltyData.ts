import { LoyaltyTier } from '../types';
import { getAssetUrl } from '../utils/assets';

export const loyaltyTiers: LoyaltyTier[] = [
  {
    id: 'royalty',
    name: 'ROYALTY',
    tagline: 'Entry-Level Rewards Membership',
    badge: 'Foundation Tier',
    themeColor: '#036936',
    bgClass: 'bg-[#E8F5EC]',
    borderClass: 'border-[#036936]',
    textColor: 'text-[#1B221E]',
    description: 'Welcome to the Prince Retail family. Start earning points on all daily grocery and home purchases from your very first receipt.',
    multiplier: '1x Points (₱200 = 1 Point)',
    cardImage: getAssetUrl('assets/aistudio/Prince_Royalty_Gift_Card_fb2f5864.jpg'),
    perks: [
      'Earn points on all groceries & essentials',
      'Free digital membership in Prince Mobile App',
      'Special birthday shopping discount voucher',
      'Access to exclusive Member-Only Piso Deals'
    ],
    cardGradient: 'from-[#E8F5EC] via-[#E8F5EC] to-[#036936]',
    cardTextColor: 'text-[#1B221E]'
  },
  {
    id: 'royalty-gold',
    name: 'ROYALTY GOLD',
    tagline: 'Enhanced Shopping Rewards',
    badge: 'Gold Tier',
    themeColor: '#F0E901',
    bgClass: 'bg-[#FEF9C3]',
    borderClass: 'border-[#F0E901]',
    textColor: 'text-[#1B221E]',
    description: 'Elevated rewards designed for regular family shoppers with bonus points and fast-track lane checkout privileges.',
    multiplier: '1.5x Points (₱200 = 1.5 Points)',
    cardImage: getAssetUrl('assets/aistudio/Prince_Royalty_Gold_Gift_Card_c4e61e30.jpg'),
    perks: [
      '1.5x point earnings on all purchases',
      'Express Royalty Gold priority checkout lane',
      'Monthly Double Points shopping weekend',
      'Advance preview notifications for weekend warehouse sales',
      'Complimentary curbside pickup packing'
    ],
    cardGradient: 'from-[#FEF9C3] via-[#FEFCE8] to-[#F0E901]',
    cardTextColor: 'text-[#1B221E]'
  },
  {
    id: 'royalty-platinum',
    name: 'ROYALTY PLATINUM',
    tagline: 'Premium Loyalty Experience',
    badge: 'Platinum Tier',
    themeColor: '#E22C28',
    bgClass: 'bg-[#FEE2E2]',
    borderClass: 'border-[#E22C28]',
    textColor: 'text-[#1B221E]',
    description: 'Comprehensive VIP treatment with generous reward multipliers, free delivery perks, and curated seasonal family bundles.',
    multiplier: '2x Points (₱200 = 2 Points)',
    cardImage: getAssetUrl('assets/aistudio/Prince_Royalty_Platinum_Gift_Card_f4f98cf6.jpg'),
    perks: [
      'Double points on every transaction',
      'Free doorstep home delivery on orders over ₱1,000',
      'Dedicated concierge and priority customer care hotline',
      'Quarterly exclusive Prince curated gift box',
      'VIP invitation to seasonal food tasting and private events'
    ],
    cardGradient: 'from-[#FEE2E2] via-[#FEF2F2] to-[#E22C28]',
    cardTextColor: 'text-[#1B221E]'
  },
  {
    id: 'royalty-diamond',
    name: 'ROYALTY DIAMOND',
    tagline: 'Exclusive Premium Membership Experience',
    badge: 'Diamond Tier',
    themeColor: '#1B221E',
    bgClass: 'bg-[#1B221E]',
    borderClass: 'border-slate-800',
    textColor: 'text-white',
    description: 'The pinnacle of Prince Retail privilege. Crafted for community leaders, large households, and elite patrons who expect absolute distinction.',
    multiplier: '3x Points (₱200 = 3 Points)',
    cardImage: getAssetUrl('assets/aistudio/Prince_Royalty_Diamond_Card_8fc33fed.jpg'),
    perks: [
      'Triple points with no maximum earning cap',
      'Private access to Prince Royalty VIP Lounge in flagship branches',
      'Assigned personal shopping concierge with WhatsApp order line',
      'Zero delivery fees on all online orders nationwide',
      'Exclusive annual Prince Retail Founder Gala invitation'
    ],
    cardGradient: 'from-[#171D1A] via-[#212925] to-[#111613]',
    cardTextColor: 'text-white'
  }
];
