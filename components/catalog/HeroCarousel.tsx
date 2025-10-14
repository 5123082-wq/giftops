'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import { Button, Card } from '@/components/ui';
import type { GiftSet } from '@/types/gift';
import { track } from '@/lib/analytics';

import styles from './hero-carousel.module.css';

type HeroCarouselProps = {
  items: GiftSet[];
};

export function HeroCarousel({ items }: HeroCarouselProps) {
  const listRef = useRef<HTMLUListElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    track('carousel_view', { module: 'hero', total: items.length });
  }, [items.length]);

  const startAutoplay = () => {
    const list = listRef.current;
    if (!list) return;
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % items.length;
        const child = list.children[next] as HTMLElement | undefined;
        if (child) {
          child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
        return next;
      });
    }, 6000);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [items.length]);

  const pauseAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div className={styles.wrapper} role="region" aria-label="Готовые решения">
      <ul ref={listRef} className={styles.list}>
        {items.map((gift, index) => (
          <li key={gift.id} className={styles.item}>
            <Card
              className={clsx(styles.card, index === active && styles.active)}
              aria-label={`${gift.title}. Стоимость ${gift.unit_price.toLocaleString()} ₽`}
              onMouseEnter={() => {
                pauseAutoplay();
                setActive(index);
                track('carousel_hover_expand', { id: gift.id });
              }}
              onMouseLeave={() => startAutoplay()}
              onFocus={() => setActive(index)}
            >
              <div className={styles.media}>
                <Image
                  src={gift.images[0]}
                  alt={gift.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 520px"
                  priority={index === 0}
                />
              </div>
              <div className={styles.body}>
                <h3>{gift.title}</h3>
                <p>{gift.description}</p>
                <div className={styles.meta}>
                  <div>
                    <span className={styles.price}>{gift.unit_price.toLocaleString()} ₽</span>
                    <span className={styles.lead}>Срок {gift.lead_time_days} дней</span>
                  </div>
                  <Button asChild>
                    <a href={`/giftgo/catalog?focus=${gift.id}`}>Смотреть</a>
                  </Button>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
