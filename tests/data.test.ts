import { describe, expect, it } from 'vitest';

import { fetchGifts } from '@/lib/data';

describe('gift data filters', () => {
  it('filters by gender and status', async () => {
    const { items } = await fetchGifts({ gender: 'unisex', status: 'new_hire' });
    expect(items.every((item) => item.gender === 'unisex' || item.gender === 'male' || item.gender === 'female')).toBe(true);
    expect(items.every((item) => item.recipient_status?.includes('new_hire'))).toBe(true);
  });

  it('applies search term', async () => {
    const { items } = await fetchGifts({ search: 'VIP' });
    expect(items.length).toBeGreaterThan(0);
    expect(items[0].title).toContain('VIP');
  });
});
