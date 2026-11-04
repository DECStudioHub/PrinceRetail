import { LoyaltyTier } from '../types';

export const loyaltyTiers: LoyaltyTier[] = [
  {
    id: 'royalty',
    name: 'ROYALTY',
    tagline: 'Entry-Level Rewards Membership',
    badge: 'Foundation Tier',
    themeColor: '#B8D9C4',
    bgClass: 'bg-[#DCEEE2]',
    borderClass: 'border-[#B8D9C4]',
    textColor: 'text-[#252927]',
    description: 'Welcome to the Prince Retail family. Start earning points on all daily grocery and home purchases from your very first receipt.',
    multiplier: '1x Points (₱200 = 1 Point)',
    cardImage: '/assets/aistudio/Prince_Royalty_Gift_Card_fb2f5864.png',
    perks: [
      'Earn points on all groceries & essentials',
      'Free digital membership in Prince Mobile App',
      'Special birthday shopping discount voucher',
      'Access to exclusive Member-Only Piso Deals'
    ],
    cardGradient: 'from-[#DCEEE2] via-[#E8F5EC] to-[#B8D9C4]',
    cardTextColor: 'text-[#252927]'
  },
  {
    id: 'royalty-gold',
    name: 'ROYALTY GOLD',
    tagline: 'Enhanced Shopping Rewards',
    badge: 'Gold Tier',
    themeColor: '#F7DF8B',
    bgClass: 'bg-[#FFF0BF]',
    borderClass: 'border-[#F7DF8B]',
    textColor: 'text-[#252927]',
    description: 'Elevated rewards designed for regular family shoppers with bonus points and fast-track lane checkout privileges.',
    multiplier: '1.5x Points (₱200 = 1.5 Points)',
    cardImage: '/assets/aistudio/Prince_Royalty_Gold_Gift_Card_c4e61e30.png',
    perks: [
      '1.5x point earnings on all purchases',
      'Express Royalty Gold priority checkout lane',
      'Monthly Double Points shopping weekend',
      'Advance preview notifications for weekend warehouse sales',
      'Complimentary curbside pickup packing'
    ],
    cardGradient: 'from-[#FFF0BF] via-[#FDF5D2] to-[#F7DF8B]',
    cardTextColor: 'text-[#252927]'
  },
  {
    id: 'royalty-platinum',
    name: 'ROYALTY PLATINUM',
    tagline: 'Premium Loyalty Experience',
    badge: 'Platinum Tier',
    themeColor: '#EF777B',
    bgClass: 'bg-[#FBE3DF]',
    borderClass: 'border-[#EF777B]',
    textColor: 'text-[#252927]',
    description: 'Comprehensive VIP treatment with generous reward multipliers, free delivery perks, and curated seasonal family bundles.',
    multiplier: '2x Points (₱200 = 2 Points)',
    cardImage: '/assets/aistudio/Prince_Royalty_Platinum_Gift_Card_f4f98cf6.png',
    perks: [
      'Double points on every transaction',
      'Free doorstep home delivery on orders over ₱1,000',
      'Dedicated concierge and priority customer care hotline',
      'Quarterly exclusive Prince curated gift box',
      'VIP invitation to seasonal food tasting and private events'
    ],
    cardGradient: 'from-[#FBE3DF] via-[#FCECE8] to-[#EF777B]',
    cardTextColor: 'text-[#252927]'
  },
  {
    id: 'royalty-diamond',
    name: 'ROYALTY DIAMOND',
    tagline: 'Exclusive Premium Membership Experience',
    badge: 'Diamond Tier',
    themeColor: '#252927',
    bgClass: 'bg-[#252927]',
    borderClass: 'border-slate-800',
    textColor: 'text-white',
    description: 'The pinnacle of Prince Retail privilege. Crafted for community leaders, large households, and elite patrons who expect absolute distinction.',
    multiplier: '3x Points (₱200 = 3 Points)',
    cardImage: '/assets/aistudio/Prince_Royalty_Diamond_Card_8fc33fed.png',
    perks: [
      'Triple points with no maximum earning cap',
      'Private access to Prince Royalty VIP Lounge in flagship branches',
      'Assigned personal shopping concierge with WhatsApp order line',
      'Zero delivery fees on all online orders nationwide',
      'Exclusive annual Prince Retail Founder Gala invitation'
    ],
    cardGradient: 'from-[#1E2220] via-[#2A302D] to-[#161817]',
    cardTextColor: 'text-white'
  }
];
