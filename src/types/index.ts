export type MenuRevisionState = 'draft' | 'published' | 'archived';
export type MenuAvailability = 'available' | 'sold_out';
export type MenuCategory = 'lauk' | 'sayur' | 'pelengkap' | 'sambal' | 'minuman';
export type PriceMode = 'fixed' | 'from';

export interface MenuEntryMedia {
  id: string;
  mediaId: string;
  url?: string;
  focalX: number;
  focalY: number;
  alt: string | null;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  priceRupiah: number | null;
  priceMode: PriceMode;
  priceUnit: string | null;
  availability: MenuAvailability;
  sortOrder: number;
  hidden?: boolean;
  media?: MenuEntryMedia[];
}

export interface TodayMenuResponse {
  serverNow: string;
  serviceDate: string;
  status: 'published' | 'not_published' | 'draft_only';
  publicationId?: string;
  publishedAt?: string;
  updatedAt?: string;
  items: MenuItem[];
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  address: string | null;
  whatsapp: string | null;
  mapsUrl: string | null;
  timezone: string;
}

export interface OpeningHour {
  weekday: number; // 0=Sunday, 1=Monday...
  openTime: string;
  closeTime: string;
  closed: boolean;
}

export interface AdminProfile {
  userId: string;
  displayName: string;
  role: 'owner' | 'editor';
  active: boolean;
}

