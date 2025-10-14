'use client';

import { useMemo } from 'react';

import { Button, Card } from '@/components/ui';
import { track } from '@/lib/analytics';
import { useCart } from '@/store/cart';

import styles from './cart-panel.module.css';

export function CartPanel() {
  const { items, updateQty, remove, clear } = useCart();

  const total = useMemo(
    () => items.reduce((acc, entry) => acc + entry.gift.unit_price * entry.qty, 0),
    [items]
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <aside className={styles.wrapper} aria-live="polite">
      <Card className={styles.card}>
        <header className={styles.header}>
          <h3>Корзина</h3>
          <button
            type="button"
            onClick={() => {
              clear();
              track('cart_clear');
            }}
            className={styles.clear}
          >
            Очистить
          </button>
        </header>
        <ul className={styles.list}>
          {items.map((entry) => (
            <li key={entry.gift.id}>
              <div>
                <strong>{entry.gift.title}</strong>
                <p>{entry.gift.unit_price.toLocaleString()} ₽</p>
              </div>
              <div className={styles.controls}>
                <label>
                  <span className="sr-only">Количество</span>
                  <input
                    type="number"
                    min={1}
                    value={entry.qty}
                    onChange={(event) => updateQty(entry.gift.id, Number(event.target.value))}
                  />
                </label>
                <button type="button" onClick={() => remove(entry.gift.id)}>
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.footer}>
          <span>Итого: {total.toLocaleString()} ₽</span>
          <Button
            onClick={() => {
              track('checkout_start', { items: items.length, total });
              alert('Демо: переход к оформлению заказа');
            }}
          >
            Оформить
          </Button>
        </div>
      </Card>
    </aside>
  );
}
