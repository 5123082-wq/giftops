import { mockGifts, clientCases } from '@/mocks/gifts';
import type { ClientCase, GiftSet } from '@/types/gift';

export type GiftSearchParams = {
  search?: string;
  gender?: string;
  status?: string;
  theme?: string;
  sort?: 'popularity' | 'price_asc' | 'price_desc' | 'lead' | 'rating' | 'new';
  in_stock?: string;
};

const popularityOrder = ['stellar-vip', 'aurora-delight', 'orbit-onboarding', 'nebula-birthday'];

function matchesSearch(gift: GiftSet, query?: string) {
  if (!query) return true;
  const value = query.trim().toLowerCase();
  if (!value) return true;
  return [
    gift.title,
    gift.description,
    gift.tags?.join(' '),
    gift.items.map((i) => `${i.sku} ${i.name}`).join(' ')
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .includes(value);
}

function matchesFilter(value: string | undefined, target?: string[] | string) {
  if (!value) return true;
  if (!target) return false;
  if (Array.isArray(target)) {
    return target.map((t) => t.toLowerCase()).includes(value.toLowerCase());
  }
  return target.toLowerCase() === value.toLowerCase();
}

export async function fetchGifts(params: GiftSearchParams = {}) {
  let items = mockGifts.filter((gift) => matchesSearch(gift, params.search));

  if (params.gender && params.gender !== 'any') {
    items = items.filter((gift) => gift.gender === params.gender || gift.gender === 'unisex');
  }

  if (params.status) {
    items = items.filter((gift) => matchesFilter(params.status, gift.recipient_status));
  }

  if (params.theme) {
    items = items.filter((gift) => matchesFilter(params.theme, gift.holiday_themes));
  }

  if (params.in_stock === 'true') {
    items = items.filter((gift) => gift.in_stock !== false);
  }

  items = items.sort((a, b) => {
    switch (params.sort) {
      case 'price_asc':
        return a.unit_price - b.unit_price;
      case 'price_desc':
        return b.unit_price - a.unit_price;
      case 'lead':
        return a.lead_time_days - b.lead_time_days;
      case 'rating':
        return (b.rating ?? 0) - (a.rating ?? 0);
      case 'new':
        return popularityOrder.indexOf(b.id) - popularityOrder.indexOf(a.id);
      case 'popularity':
      default:
        return popularityOrder.indexOf(a.id) - popularityOrder.indexOf(b.id);
    }
  });

  return {
    items,
    total: items.length
  };
}

export async function getFeaturedGifts(): Promise<GiftSet[]> {
  return mockGifts.slice(0, 3);
}

export async function getGiftById(id: string) {
  return mockGifts.find((gift) => gift.id === id) ?? null;
}

export async function getClientCases(): Promise<ClientCase[]> {
  return clientCases;
}
