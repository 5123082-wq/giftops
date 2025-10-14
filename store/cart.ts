'use client';

import { create } from 'zustand';
import type { GiftSet } from '@/types/gift';

type CartItem = {
  gift: GiftSet;
  qty: number;
  personalization?: Record<string, string>;
};

type CartState = {
  items: CartItem[];
  add: (gift: GiftSet, qty?: number, personalization?: Record<string, string>) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],
  add: (gift, qty = 1, personalization) =>
    set((state) => {
      const index = state.items.findIndex((entry) => entry.gift.id === gift.id);
      if (index >= 0) {
        const updated = [...state.items];
        const existing = updated[index];
        updated[index] = {
          ...existing,
          qty: existing.qty + qty,
          personalization: personalization ?? existing.personalization
        };
        return { items: updated };
      }
      return {
        items: [...state.items, { gift, qty, personalization }]
      };
    }),
  remove: (id) => set((state) => ({ items: state.items.filter((entry) => entry.gift.id !== id) })),
  updateQty: (id, qty) =>
    set((state) => ({
      items: state.items.map((entry) =>
        entry.gift.id === id ? { ...entry, qty: Math.max(1, qty) } : entry
      )
    })),
  clear: () => set({ items: [] })
}));
