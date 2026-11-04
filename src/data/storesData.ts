import { StoreLocation } from '../types';

export const storesData: StoreLocation[] = [
  // LUZON
  {
    id: 'store-lz-1',
    name: 'Prince Retail Center — Batangas City',
    region: 'Luzon',
    city: 'Batangas City',
    province: 'Batangas',
    address: 'P. Burgos St. cor. Evangelista, Poblacion, Batangas City',
    hours: '7:00 AM – 8:30 PM (Mon - Sun)',
    phone: '(043) 723-8819',
    amenities: ['Supermarket', 'Fresh Market', 'Wholesale Cash & Carry', 'Pharmacy', 'Royalty Rewards Lane', 'Parking'],
    coordinates: { lat: 13.7565, lng: 121.0583 },
    featured: true
  },
  {
    id: 'store-lz-2',
    name: 'Prince Hypermart — San Fernando',
    region: 'Luzon',
    city: 'San Fernando',
    province: 'Pampanga',
    address: 'MacArthur Highway, Dolores, City of San Fernando, Pampanga',
    hours: '7:30 AM – 9:00 PM (Mon - Sun)',
    phone: '(045) 961-4420',
    amenities: ['Supermarket', 'Bakery', 'Kasosyo Partner Counter', 'Curbside Pickup', 'Parking'],
    coordinates: { lat: 15.0307, lng: 120.6899 }
  },
  {
    id: 'store-lz-3',
    name: 'Prince Retail — Lucena Hub',
    region: 'Luzon',
    city: 'Lucena City',
    province: 'Quezon',
    address: 'Quezon Avenue cor. Gomez Street, Lucena City',
    hours: '7:00 AM – 8:00 PM (Mon - Sun)',
    phone: '(042) 710-2391',
    amenities: ['Supermarket', 'Fresh Wet & Dry', 'Wholesale Packs', 'Royalty Member Lounge'],
    coordinates: { lat: 13.9314, lng: 121.6172 }
  },
  {
    id: 'store-lz-4',
    name: 'Prince Town Center — Dagupan',
    region: 'Luzon',
    city: 'Dagupan City',
    province: 'Pangasinan',
    address: 'Arellano Street, Downtown, Dagupan City, Pangasinan',
    hours: '7:30 AM – 8:30 PM (Mon - Sun)',
    phone: '(075) 522-3011',
    amenities: ['Supermarket', 'Pharmacy', 'Fresh Seafood', 'Free Parking', 'Kasosyo Sari-Sari Desk'],
    coordinates: { lat: 16.0433, lng: 120.3333 }
  },

  // VISAYAS (Heartland of Prince Retail)
  {
    id: 'store-vs-1',
    name: 'Prince Retail Flagship — Colon, Cebu',
    region: 'Visayas',
    city: 'Cebu City',
    province: 'Cebu',
    address: 'Colon Street cor. Leon Kilat, Downtown Cebu City',
    hours: '6:30 AM – 9:30 PM (Mon - Sun)',
    phone: '(032) 255-7000',
    amenities: ['Full Department Store', 'Supermarket', 'Kasosyo Wholesale Hub', 'Royalty VIP Lounge', 'Pharmacy', 'Bakery'],
    coordinates: { lat: 10.2974, lng: 123.8997 },
    featured: true
  },
  {
    id: 'store-vs-2',
    name: 'Prince Hypermart — Mandaue Tipolo',
    region: 'Visayas',
    city: 'Mandaue City',
    province: 'Cebu',
    address: 'M.C. Briones Highway, Tipolo, Mandaue City',
    hours: '7:00 AM – 9:00 PM (Mon - Sun)',
    phone: '(032) 345-8120',
    amenities: ['Supermarket', 'Drive-Thru Pickup', 'Ample Parking', 'Fresh Produce', 'Wholesale Sacks'],
    coordinates: { lat: 10.3236, lng: 123.9327 }
  },
  {
    id: 'store-vs-3',
    name: 'Prince Retail — Tagbilaran Bohol',
    region: 'Visayas',
    city: 'Tagbilaran City',
    province: 'Bohol',
    address: 'CPG Avenue cor. Gallares St., Tagbilaran City, Bohol',
    hours: '7:00 AM – 8:30 PM (Mon - Sun)',
    phone: '(038) 411-2099',
    amenities: ['Supermarket', 'Bakery', 'Wholesale Hub', 'Royalty Rewards Priority Lane'],
    coordinates: { lat: 9.6444, lng: 123.8544 }
  },
  {
    id: 'store-vs-4',
    name: 'Prince Hypermart — Tacloban Downtown',
    region: 'Visayas',
    city: 'Tacloban City',
    province: 'Leyte',
    address: 'Justice Romualdez Street, Tacloban City, Leyte',
    hours: '7:00 AM – 8:30 PM (Mon - Sun)',
    phone: '(053) 321-4902',
    amenities: ['Supermarket', 'Fresh Chilled & Frozen', 'Kasosyo Livelihood Partner Desk', 'Pharmacy'],
    coordinates: { lat: 11.2444, lng: 125.0039 }
  },
  {
    id: 'store-vs-5',
    name: 'Prince Retail — Ormoc Center',
    region: 'Visayas',
    city: 'Ormoc City',
    province: 'Leyte',
    address: 'Real Street, Poblacion, Ormoc City, Leyte',
    hours: '7:00 AM – 8:00 PM (Mon - Sun)',
    phone: '(053) 561-1240',
    amenities: ['Supermarket', 'Wholesale Bulk Rice & Goods', 'Parking', 'Royalty Lane'],
    coordinates: { lat: 11.0050, lng: 124.6075 }
  },
  {
    id: 'store-vs-6',
    name: 'Prince Hypermart — Bacolod Singcang',
    region: 'Visayas',
    city: 'Bacolod City',
    province: 'Negros Occidental',
    address: 'Araneta Street, Singcang-Airport, Bacolod City',
    hours: '7:30 AM – 9:00 PM (Mon - Sun)',
    phone: '(034) 433-8890',
    amenities: ['Supermarket', 'Fresh Meats & Poultry', 'Bakery', 'Dedicated Wholesale Parking'],
    coordinates: { lat: 10.6407, lng: 122.9431 }
  },

  // MINDANAO
  {
    id: 'store-mn-1',
    name: 'Prince Retail Center — Davao Bajada',
    region: 'Mindanao',
    city: 'Davao City',
    province: 'Davao del Sur',
    address: 'J.P. Laurel Avenue, Bajada, Davao City',
    hours: '7:00 AM – 9:00 PM (Mon - Sun)',
    phone: '(082) 224-5511',
    amenities: ['Supermarket', 'Fresh Local Fruits & Meats', 'Wholesale Bulk Zone', 'Royalty Diamond Counter', 'Parking'],
    coordinates: { lat: 7.0863, lng: 125.6139 },
    featured: true
  },
  {
    id: 'store-mn-2',
    name: 'Prince Hypermart — CDO Lapasan',
    region: 'Mindanao',
    city: 'Cagayan de Oro',
    province: 'Misamis Oriental',
    address: 'Claro M. Recto Avenue, Lapasan, Cagayan de Oro City',
    hours: '7:00 AM – 9:00 PM (Mon - Sun)',
    phone: '(088) 856-7123',
    amenities: ['Supermarket', 'Curbside Pickup', 'Fresh Market', 'Pharmacy', 'Kasosyo Partner Hub'],
    coordinates: { lat: 8.4878, lng: 124.6596 }
  },
  {
    id: 'store-mn-3',
    name: 'Prince Retail — General Santos City',
    region: 'Mindanao',
    city: 'General Santos City',
    province: 'South Cotabato',
    address: 'Pioneer Avenue, Dadiangas South, General Santos City',
    hours: '7:00 AM – 8:30 PM (Mon - Sun)',
    phone: '(083) 552-4410',
    amenities: ['Supermarket', 'Fresh Tuna & Chilled Market', 'Wholesale Sacks', 'Royalty Priority Lane'],
    coordinates: { lat: 6.1164, lng: 125.1716 }
  },
  {
    id: 'store-mn-4',
    name: 'Prince Hypermart — Butuan Montilla',
    region: 'Mindanao',
    city: 'Butuan City',
    province: 'Agusan del Norte',
    address: 'Montilla Boulevard, Butuan City',
    hours: '7:00 AM – 8:00 PM (Mon - Sun)',
    phone: '(085) 342-9901',
    amenities: ['Supermarket', 'Kasosyo Micro-Credit Desk', 'Bakery', 'Parking'],
    coordinates: { lat: 8.9475, lng: 125.5406 }
  }
];
