import { describe, expect, it } from 'vitest';

import { mockGifts } from '@/mocks/gifts';
import { useCart } from '@/store/cart';

describe('cart store', () => {
  it('adds and updates items', () => {
    const first = mockGifts[0];
    const second = mockGifts[1];

    useCart.getState().clear();

    useCart.getState().add(first, 2);
    expect(useCart.getState().items).toHaveLength(1);
    expect(useCart.getState().items[0].qty).toBe(2);

    useCart.getState().add(first);
    expect(useCart.getState().items[0].qty).toBe(3);

    useCart.getState().add(second, 1, { recipient: 'Ольга' });
    expect(useCart.getState().items).toHaveLength(2);
    expect(useCart.getState().items[1].personalization?.recipient).toBe('Ольга');

    useCart.getState().updateQty(first.id, 5);
    expect(useCart.getState().items[0].qty).toBe(5);

    useCart.getState().remove(second.id);
    expect(useCart.getState().items).toHaveLength(1);

    useCart.getState().clear();
    expect(useCart.getState().items).toHaveLength(0);
  });
});
