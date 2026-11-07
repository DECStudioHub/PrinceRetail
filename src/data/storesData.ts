import { StoreLocation } from '../types';
import { getAssetUrl } from '../utils/assets';

const listedBranch = (
  id: string,
  name: string,
  region: StoreLocation['region'],
  city: string,
  province: string,
  details: Partial<Pick<StoreLocation, 'address' | 'hours' | 'phone' | 'image' | 'featured'>> = {}
): StoreLocation => ({
  id,
  name,
  region,
  city,
  province,
  address: details.address ?? `${city}, ${province}`,
  hours: details.hours,
  phone: details.phone,
  featured: details.featured,
  image: details.image,
  amenities: []
});

const allStores: StoreLocation[] = [
  // LUZON
  {
    id: 'store-lz-brookes-point',
    name: 'Prince Hypermart Brooke’s Point',
    region: 'Luzon',
    city: 'Brooke’s Point',
    province: 'Palawan',
    address: 'M. Rodriguez St., Poblacion District II, Brooke’s Point, Palawan',
    hours: '8:00 AM – 8:00 PM (Mon - Sun)',
    phone: '0925-588-6353',
    amenities: []
  },
  {
    id: 'store-lz-jaen',
    name: 'Prince Hypermart Jaen',
    region: 'Luzon',
    city: 'Jaen',
    province: 'Nueva Ecija',
    address: 'Dampulan, Jaen, Nueva Ecija',
    hours: '7:30 AM – 8:00 PM (Mon - Sun)',
    phone: '(044) 958-4961',
    amenities: []
  },
  {
    id: 'store-lz-narra',
    name: 'Prince Hypermart Narra',
    region: 'Luzon',
    city: 'Narra',
    province: 'Palawan',
    address: 'Sampaloc St., Brgy Poblacion, Narra, Palawan',
    hours: '8:00 AM – 8:00 PM (Mon - Sun)',
    phone: '0909-643-3100',
    amenities: []
  },
  {
    id: 'store-lz-angat',
    name: 'Prince Hypermart Angat',
    region: 'Luzon',
    city: 'Angat',
    province: 'Bulacan',
    address: 'Barangay San Roque, Angat, Bulacan',
    hours: '8:00 AM – 9:00 PM (Mon - Sat); 7:00 AM – 9:00 PM (Sun)',
    phone: '0997-877-1733',
    amenities: []
  },
  {
    id: 'store-lz-la-paz',
    name: 'Prince Hypermart La Paz',
    region: 'Luzon',
    city: 'La Paz',
    province: 'Tarlac',
    address: 'Calle Libertad, La Paz, Tarlac',
    hours: '7:30 AM – 8:30 PM (Mon - Sun)',
    phone: '0977-461-0988',
    amenities: []
  },
  {
    id: 'store-lz-san-francisco',
    name: 'Prince Hypermart San Francisco',
    region: 'Luzon',
    city: 'San Francisco',
    province: 'Quezon',
    address: 'Queblar St., Cayawan I, San Francisco, Quezon Province',
    hours: '7:00 AM – 7:00 PM (Mon - Sun)',
    amenities: []
  },
  {
    id: 'store-lz-san-miguel',
    name: 'Prince Hypermart San Miguel',
    region: 'Luzon',
    city: 'San Miguel',
    province: 'Bulacan',
    address: 'Noberto Consejo St., Brgy. San Jose, San Miguel, Bulacan',
    hours: '8:00 AM – 8:00 PM (Mon - Sun)',
    phone: '044 (762-1585)',
    amenities: []
  },

  // VISAYAS
  listedBranch('store-vs-abuyog', 'Prince Hypermart Abuyog', 'Visayas', 'Abuyog', 'Leyte', { address: 'Luyonsawang, Abuyog, Leyte', hours: '8:00 AM – 7:00 PM (Mon - Sun)', phone: '+639178601366 / +639255921368' }),
  listedBranch('store-vs-argao', 'Prince Hypermart Argao', 'Visayas', 'Argao', 'Cebu', { address: 'Dr. T.S. Kintanar St. cor. Lakandula St., Poblacion, Argao, Cebu', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '(032) 485 8040' }),
  listedBranch('store-vs-bago', 'Prince Hypermart Bago', 'Visayas', 'Bago City', 'Negros Occidental', { address: 'Cor. Hilario Yulo, Bonifacio St., Poblacion, Bago City, Negros Occidental', hours: '7:30 AM – 7:30 PM (Mon - Sun)', phone: '(034) 454-1058' }),
  listedBranch('store-vs-bayawan-town', 'Prince Town Bayawan', 'Visayas', 'Bayawan City', 'Negros Oriental', { address: 'Mabini St. Suba Bayawan City Negros Oriental', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '(035) 430-0242' }),
  listedBranch('store-vs-bayawan-home', 'Prince Home Center Bayawan', 'Visayas', 'Bayawan City', 'Negros Oriental', { address: 'Mabini St. Suba Bayawan City Negros Oriental', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '09753758410, 09257112607' }),
  listedBranch('store-vs-baybay', 'Prince Town Baybay', 'Visayas', 'Baybay', 'Leyte', { address: 'M.L Quezon cor. A. Bonifacio St., Zone 11, Baybay, Leyte', hours: '8:00 AM – 7:00 PM (Mon - Fri); 8:00 AM – 7:30 PM (Sat - Sun)', phone: '(053) 563 8239' }),
  listedBranch('store-vs-binalbagan', 'Prince Hypermart Binalbagan', 'Visayas', 'Binalbagan', 'Negros Occidental', { 
    address: 'Biscom Access Road, Poblacion, Binalbagan, Negros Occidental', 
    hours: '8:00 AM – 8:00 PM (Mon - Sun)', 
    phone: '(034) 388-8255',
    image: getAssetUrl('assets/images/stores/prince_binalbagan.jpg')
  }),
  listedBranch('store-vs-cabatuan', 'Prince Hypermart Cabatuan', 'Visayas', 'Cabatuan', 'Iloilo', { address: 'Poblacion Cabatuan, Ilo-Ilo', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '(033) 332 1079' }),
  listedBranch('store-vs-calinog', 'Prince Hypermart Calinog', 'Visayas', 'Calinog', 'Iloilo', { address: 'Brgy. Libot, Calinog, Iloilo', hours: '8:00 AM – 8:00 PM (Mon - Sun)' }),
  listedBranch('store-vs-catbalogan', 'Prince Hypermart Catbalogan', 'Visayas', 'Catbalogan City', 'Western Samar', { address: 'Mabini Ave., Brgy. 027, Canlapwas, Catbalogan City, Western Samar', hours: '8:00 AM – 7:00 PM (Mon - Fri); 8:00 AM – 7:30 PM (Sat - Sun)', phone: '0917-801-0056' }),
  listedBranch('store-vs-daanbantayan', 'Prince Hypermart Daanbantayan', 'Visayas', 'Daanbantayan', 'Cebu', { address: 'Poblacion, Daanbantayan, Cebu', hours: '7:30 AM – 7:30 PM (Mon - Sun)', phone: '(032) 261-2831' }),
  listedBranch('store-vs-dalaguete', 'Prince Hypermart Dalaguete', 'Visayas', 'Dalaguete', 'Cebu', { address: 'Poblacion, Dalaguete, Cebu', hours: '7:30 AM – 7:30 PM (Mon - Sun)', phone: '(032) 484 8144' }),
  listedBranch('store-vs-danao', 'Prince Town Danao', 'Visayas', 'Danao City', 'Cebu', { address: 'Juan Luna St., Danao City, Cebu', hours: '8:30 AM – 8:30 PM (Mon - Sun)', phone: '261-4725' }),
  listedBranch('store-vs-dulag', 'Prince Hypermart Dulag', 'Visayas', 'Dulag', 'Leyte', { address: 'Brgy. Highway, Dulag, Leyte', hours: '8:00 AM – 8:00 PM (Mon - Sun)' }),
  listedBranch('store-vs-guiuan', 'Prince Hypermart Guiuan', 'Visayas', 'Guiuan', 'Eastern Samar', { address: 'Ward 4A, Guiuan, Eastern Samar', hours: '8:00 AM – 7:00 PM (Mon - Sun)' }),
  listedBranch('store-vs-himamaylan', 'Prince Hypermart Himamaylan', 'Visayas', 'Himamaylan City', 'Negros Occidental', { address: 'Poblacion II District III, Himamaylan City, Negros Occidental', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '(034) 744 8026' }),
  listedBranch('store-vs-hinigaran', 'Prince Hypermart Hinigaran', 'Visayas', 'Hinigaran', 'Negros Occidental', { address: 'Burgos St. Brgy IV, Hinigaran, Negros Occidental', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '740-8075' }),
  listedBranch('store-vs-isabel', 'Prince Hypermart Isabel', 'Visayas', 'Isabel', 'Leyte', { address: 'Quezon St., Corner Roxas St., Sto. Nino, Isabel, Leyte', hours: '8:00 AM – 7:00 PM (Mon - Fri); 8:00 AM – 8:00 PM (Sat - Sun)', phone: '09355810936' }),
  listedBranch('store-vs-la-carlota', 'Prince Town La Carlota', 'Visayas', 'La Carlota City', 'Negros Occidental', { address: 'Poblacion, La Carlota City, Negros Occidental', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '(034) 735 1327' }),
  listedBranch('store-vs-larena', 'Prince Hypermart Larena', 'Visayas', 'Larena', 'Siquijor', { address: 'Port Side Poblacion Larena Siquijor', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '0917-638-4564' }),
  listedBranch('store-vs-maasin', 'Prince Hypermart Maasin', 'Visayas', 'Maasin City', 'Southern Leyte', { address: 'Bantug St., Tunga-tunga, Maasin City, Southern Leyte', hours: '8:00 AM – 7:00 PM (Mon - Sun)', phone: '(053) 570-8008' }),
  listedBranch('store-vs-minglanilla', 'Prince Hypermart Minglanilla', 'Visayas', 'Minglanilla', 'Cebu', { address: 'Calajoan, Minglanilla fronting the Market Place', hours: '7:00 AM – 8:00 PM (Mon - Fri); 6:30 AM – 8:00 PM (Sat - Sun)', phone: '490-0695 / 490-0696' }),
  listedBranch('store-vs-naval', 'Prince Hypermart Naval', 'Visayas', 'Naval', 'Biliran', { address: 'P. Remedio St., Naval, Biliran', hours: '8:00 AM – 7:00 PM (Mon - Sun)', phone: '(053) 500 9359' }),
  listedBranch('store-vs-north-reclamation', 'Prince Wholesale North Reclamation', 'Visayas', 'Mandaue City', 'Cebu', { address: 'P. Basubas St., Brgy Tipolo, Mandaue City, Cebu' }),
  listedBranch('store-vs-pototan', 'Prince Hypermart Pototan', 'Visayas', 'Pototan', 'Iloilo', { address: 'Corner Solinap & San Jose St. Brgy. Poblacion, Pototan, Ilo-Ilo', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '(033) 529 6373' }),
  listedBranch('store-vs-asturias', 'Prince Hypermart Asturias', 'Visayas', 'Asturias', 'Cebu', { address: 'F. Noel Street', hours: '8:00 AM – 6:00 PM', phone: '09151658518' }),
  listedBranch('store-vs-bantayan', 'Prince Hypermart Bantayan', 'Visayas', 'Bantayan', 'Cebu', { address: 'Brgy Suba, Bantayan Island Cebu', hours: '8:00 AM – 6:30 PM (Mon - Fri)', phone: '09995498354' }),
  listedBranch('store-vs-camotes', 'Prince Hypermart Camotes', 'Visayas', 'San Francisco, Camotes', 'Cebu', { address: 'Brgy Northern Poblacion, San Francisco, Camotes, Cebu', phone: '09304860287' }),
  listedBranch('store-vs-canlaon', 'Prince Hypermart Canlaon', 'Visayas', 'Canlaon', 'Negros Oriental', { address: 'National Highway, Brgy. Mabigo, Canlaon City, Negros Oriental' }),
  listedBranch('store-vs-estancia', 'Prince Hypermart Estancia', 'Visayas', 'Estancia', 'Iloilo', { address: 'Cudilla St., Poblacion Zone II, Estancia, Iloilo', hours: '7:00 AM – 7:00 PM (Mon - Sun)', phone: '9127843075' }),
  listedBranch('store-vs-guihulngan', 'Prince Hypermart Guihulngan', 'Visayas', 'Guihulngan City', 'Negros Oriental', { address: 'Magsaysay St. Guihulngan City, Negros Oriental', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '9751817064' }),
  listedBranch('store-vs-medellin', 'Prince Hypermart Medellin', 'Visayas', 'Medellin', 'Cebu', { address: 'Munasque Street, Medellin Cebu', hours: '8:30 AM – 5:30 PM', phone: '0925 577 5286' }),
  listedBranch('store-vs-san-joaquin', 'Prince Hypermart San Joaquin', 'Visayas', 'San Joaquin', 'Iloilo', { address: 'Makiling St. Poblacion, San Joaquin, Iloilo 5024', hours: '7:00 AM – 7:00 PM', phone: '09300077527' }),
  listedBranch('store-vs-san-remigio', 'Prince Hypermart San Remigio', 'Visayas', 'San Remigio', 'Cebu', { address: 'Poblacion, San Remigio, Cebu', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '(032) 232 0280' }),
  listedBranch('store-vs-sagay', 'Prince Hypermart Sagay', 'Visayas', 'Sagay City', 'Negros Occidental', { address: 'Poblacion II, Sagay City, Negros Occidental', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '4540960' }),
  listedBranch('store-vs-sara', 'Prince Hypermart Sara', 'Visayas', 'Sara', 'Iloilo', { address: 'Calle Mabini St. corner Municipal Road, Sara, Iloilo' }),
  listedBranch('store-vs-sibonga', 'Prince Hypermart Sibonga', 'Visayas', 'Sibonga', 'Cebu', { address: 'Poblacion Sibonga, Cebu', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '(032) 486-9234' }),
  listedBranch('store-vs-silay', 'Prince Hypermart Silay', 'Visayas', 'Silay City', 'Negros Occidental', { address: 'Cor. Rizal and Antonio Luna St., Zone 1, Silay City, Negros Occidental, 6116', hours: '8:00 AM – 8:00 PM (Mon - Fri); 7:30 AM – 8:00 PM (Sat - Sun)', phone: '714-8355' }),
  listedBranch('store-vs-talisay', 'Prince Hypermart Talisay', 'Visayas', 'Talisay City', 'Negros Occidental', { address: 'Bonifacio St. Talisay City, Negros Occidental', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '(034) 432-9935' }),
  listedBranch('store-vs-tanjay', 'Prince Hypermart Tanjay', 'Visayas', 'Tanjay', 'Negros Oriental', { address: 'District 9, Opao, Tanjay City, Negros Oriental' }),
  listedBranch('store-vs-tuburan', 'Prince Hypermart Tuburan', 'Visayas', 'Tuburan', 'Cebu', { address: 'Poblacion 3, Tuburan, Cebu', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '(032) 463-9118' }),

  // MINDANAO
  listedBranch('store-mn-bad-as', 'Prince Hypermart Bad-as', 'Mindanao', 'Placer', 'Surigao del Norte', { address: 'Brgy. Bad-as, Placer, Surigao del Norte', hours: '8:00 AM – 7:00 PM (Mon - Sun)', phone: '09255517361' }),
  listedBranch('store-mn-balingasag', 'Prince Hypermart Balingasag', 'Mindanao', 'Balingasag', 'Misamis Oriental', { address: '15 de Setiembre St. cor National Highway Poblacion, Balingasag, Misamis Oriental', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '0935-255-9291' }),
  listedBranch('store-mn-bayugan', 'Prince Hypermart Bayugan', 'Mindanao', 'Bayugan', 'Agusan del Sur', { address: 'Poblacion, Bayugan, Agusan del Sur', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '(085) 303-0535 / 0948-680-7615' }),
  listedBranch('store-mn-bislig', 'Prince Town Bislig', 'Mindanao', 'Bislig City', 'Surigao del Sur', { address: 'R.B Castillo St., Cor. Lapu-Lapu St. Mangagoy, Bislig City, Surigao del Sur', hours: '8:00 AM – 8:30 PM (Mon - Sun)', phone: '(086) 853-2684' }),
  listedBranch('store-mn-cabadbaran', 'Prince Town Cabadbaran', 'Mindanao', 'Cabadbaran', 'Agusan del Norte', { address: 'Atega cor. Curato St., Brgy. 5, Poblacion, Cabadbaran, Agusan Del Norte', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '(085) 818 3048' }),
  listedBranch('store-mn-dapitan', 'Prince Hypermart Dapitan', 'Mindanao', 'Dapitan City', 'Zamboanga del Norte', { address: 'Manuel L. Quezon St. & Sunset Boulevard Dapitan City, Zamboanga Del Norte', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '(065) 908-2015' }),
  listedBranch('store-mn-gingoog', 'Prince Town Gingoog', 'Mindanao', 'Gingoog City', 'Misamis Oriental', { address: 'National Highway, Brgy. 19, Gingoog City', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '(085) 303-0535' }),
  listedBranch('store-mn-kapatagan', 'Prince Hypermart Kapatagan', 'Mindanao', 'Kapatagan', 'Lanao del Norte', { address: 'Corner Aranaydo St. & Linamon – Zamboanga Road Kapatagan, Lanao del Norte', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '+63 998 997 1806' }),
  listedBranch('store-mn-manolo', 'Prince Hypermart Manolo', 'Mindanao', 'Manolo Fortich', 'Bukidnon', { address: 'Barangay Tankulan (Poblacion), Manolo Fortich, Bukidnon', hours: '8:00 AM – 8:00 PM (Mon - Sun)' }),
  listedBranch('store-mn-opol', 'Prince Hypermart Opol', 'Mindanao', 'Opol', 'Misamis Oriental', { address: 'Gamolo St. Brgy. Poblacion, Opol, Misamis Oriental', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '0917-501-5773' }),
  listedBranch('store-mn-oroquieta', 'Prince Hypermart Oroquieta', 'Mindanao', 'Oroquieta City', 'Misamis Occidental', { address: 'Barrientos St., Poblacion II, Oroquieta City, Mis. Occ', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '(085) 521 0022' }),
  listedBranch('store-mn-aurora', 'Prince Hypermart Aurora', 'Mindanao', 'Aurora', 'Zamboanga del Sur', { address: 'Barangay San Jose, Aurora', hours: '8:00 AM – 7:00 PM', phone: '+639463515518' }),
  listedBranch('store-mn-buenavista', 'Prince Hypermart Buenavista', 'Mindanao', 'Buenavista', 'Agusan del Norte', { address: 'Barangay 1, Buenavista, Agusan Del Norte', hours: '8:00 AM – 8:00 PM', phone: '09255775286' }),
  listedBranch('store-mn-tangub', 'Prince Hypermart Tangub', 'Mindanao', 'Tangub City', 'Misamis Occidental', { address: 'Cor. First st. & Osmena st. Brgy. III, Tangub City', hours: '8:00 AM – 7:00 PM', phone: '09051716900' }),
  listedBranch('store-mn-surigao', 'Prince Town Surigao', 'Mindanao', 'Surigao City', 'Surigao del Norte', { address: 'Espina St., Taft, Surigao City', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '(086) 826-3047' }),
  listedBranch('store-mn-prosperidad', 'Prince Hypermart Prosperidad', 'Mindanao', 'Prosperidad', 'Agusan del Sur', { address: 'Purok II, Poblacion, Prosperidad, Agusan del Sur', hours: '7:00 AM – 7:00 PM (Mon - Sun)', phone: '(085) 241-0088' }),
  listedBranch('store-mn-sindangan', 'Prince Hypermart Sindangan', 'Mindanao', 'Sindangan', 'Zamboanga del Norte', { address: 'Quezon Ave., Brgy. Bantayan, Sindangan, Zamboanga del Norte', hours: '8:00 AM – 8:00 PM (Mon - Sun)', phone: '0935-536-5217' }),
  listedBranch('store-mn-tandag', 'Prince Town Tandag', 'Mindanao', 'Tandag', 'Surigao del Sur', { address: 'Poblacion, Tandag, Surigao del Sur', hours: '7:30 AM – 8:00 PM (Mon - Sun)', phone: '211-3422' })
];

const seenStoreIds = new Set<string>();
const seenStoreNames = new Set<string>();
export const storesData = allStores.filter((store) => {
  const name = `${store.region}:${store.name.normalize('NFKC').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()}`;
  if (seenStoreIds.has(store.id) || seenStoreNames.has(name)) return false;
  seenStoreIds.add(store.id);
  seenStoreNames.add(name);
  return true;
});
