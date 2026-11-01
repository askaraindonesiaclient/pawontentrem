import { MenuItem } from '@/types';

export const DEMO_MENU_ITEMS: MenuItem[] = [
  {
    id: 'demo-item-1',
    name: 'Nasi Liwet Gurih Solo',
    category: 'lauk',
    priceRupiah: 18000,
    priceMode: 'fixed',
    priceUnit: 'porsi',
    availability: 'available',
    sortOrder: 1,
    media: [
      {
        id: 'demo-media-1',
        mediaId: 'demo-media-1',
        url: '/assets/photos/nasi-liwet.jpg',
        focalX: 0.5,
        focalY: 0.5,
        alt: 'Nasi Liwet hangat dengan suwiran ayam dan telur pindang',
      },
    ],
  },
  {
    id: 'demo-item-2',
    name: 'Ayam Goreng Lengkuas',
    category: 'lauk',
    priceRupiah: 16000,
    priceMode: 'fixed',
    priceUnit: 'potong',
    availability: 'available',
    sortOrder: 2,
    media: [
      {
        id: 'demo-media-2',
        mediaId: 'demo-media-2',
        url: '/assets/photos/nasi-rames.jpg',
        focalX: 0.5,
        focalY: 0.5,
        alt: 'Ayam goreng lengkuas gurih renyah',
      },
    ],
  },
  {
    id: 'demo-item-3',
    name: 'Sayur Lodeh Labu Siam',
    category: 'sayur',
    priceRupiah: null, // Nullable price: do not show Rp0
    priceMode: 'fixed',
    priceUnit: null,
    availability: 'available',
    sortOrder: 3,
  },
  {
    id: 'demo-item-4',
    name: 'Tempe Bacem Legit',
    category: 'pelengkap',
    priceRupiah: 4000,
    priceMode: 'fixed',
    priceUnit: 'potong',
    availability: 'sold_out', // Demo item marked sold out
    sortOrder: 4,
  },
  {
    id: 'demo-item-5',
    name: 'Sambal Terasi Ulek Segar',
    category: 'sambal',
    priceRupiah: null, // Nullable price
    priceMode: 'fixed',
    priceUnit: null,
    availability: 'available',
    sortOrder: 5,
  },
  {
    id: 'demo-item-6',
    name: 'Es Teh Manis Melati',
    category: 'minuman',
    priceRupiah: 5000,
    priceMode: 'fixed',
    priceUnit: 'gelas',
    availability: 'available',
    sortOrder: 6,
  },
];
