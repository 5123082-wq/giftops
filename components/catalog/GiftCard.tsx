'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';

import { Badge, Button, Card, Modal } from '@/components/ui';
import { track } from '@/lib/analytics';
import { useCart } from '@/store/cart';
import type { GiftSet } from '@/types/gift';

import styles from './gift-card.module.css';

type GiftCardProps = {
  gift: GiftSet;
};

export function GiftCard({ gift }: GiftCardProps) {
  const add = useCart((state) => state.add);
  const [open, setOpen] = useState(false);
  const [personalizationOpen, setPersonalizationOpen] = useState(false);
  const [personalization, setPersonalization] = useState<Record<string, string>>({});

  const handleAdd = (customization?: Record<string, string>) => {
    const payload = customization ?? personalization;
    add(gift, 1, Object.keys(payload).length ? payload : undefined);
    track('add_to_cart', { id: gift.id, personalization: Object.keys(payload).length > 0 });
  };

  const handlePersonalizationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: Record<string, string> = {} as Record<string, string>;
    if (formData.get('recipient')) {
      data.recipient = String(formData.get('recipient'));
    }
    if (formData.get('message')) {
      data.message = String(formData.get('message'));
    }
    setPersonalization(data);
    setPersonalizationOpen(false);
    track('personalization_saved', { id: gift.id });
  };

  return (
    <>
      <Card as="article" className={styles.card}>
        <div className={styles.media}>
          <Image src={gift.images[0]} alt={gift.title} fill sizes="(max-width: 768px) 50vw, 320px" />
          <div className={styles.badges} aria-hidden>
            {gift.constraints?.no_alcohol && <Badge>Без алкоголя</Badge>}
            {gift.constraints?.allergens && <Badge>Может содержать аллергены</Badge>}
            {gift.in_stock === false && <Badge>Под заказ</Badge>}
          </div>
        </div>
        <div className={styles.body}>
          <h4>{gift.title}</h4>
          <p className={styles.items}>{gift.items.map((item) => item.name).join(', ')}</p>
          <div className={styles.meta}>
            <span className={styles.price}>{gift.unit_price.toLocaleString()} ₽</span>
            <span className={styles.lead}>Срок {gift.lead_time_days} дн.</span>
          </div>
          <div className={styles.actions}>
            <Button onClick={() => handleAdd()}>В корзину</Button>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(true);
                track('gift_quickview_open', { id: gift.id });
              }}
            >
              Быстрый просмотр
            </Button>
            {gift.personalization && (
              <Button variant="ghost" onClick={() => setPersonalizationOpen(true)}>
                Персонализировать
              </Button>
            )}
          </div>
        </div>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)} title={gift.title}>
        <p>{gift.description}</p>
        <ul>
          {gift.items.map((item) => (
            <li key={item.sku}>
              {item.name} × {item.qty}
            </li>
          ))}
        </ul>
        <p>
          Стоимость: <strong>{gift.unit_price.toLocaleString()} ₽</strong>
        </p>
        <p>Срок поставки: {gift.lead_time_days} дней</p>
        {gift.personalization && (
          <div>
            <strong>Персонализация:</strong>
            <ul>
              {gift.personalization.options?.map((option) => (
                <li key={option}>{option}</li>
              ))}
            </ul>
          </div>
        )}
        <Button
          onClick={() => {
            handleAdd();
            setOpen(false);
          }}
        >
          Добавить в корзину
        </Button>
      </Modal>
      <Modal open={personalizationOpen} onClose={() => setPersonalizationOpen(false)} title={`Персонализация — ${gift.title}`}>
        <form className={styles.personalization} onSubmit={handlePersonalizationSubmit}>
          <label>
            <span>Имя получателя</span>
            <input name="recipient" defaultValue={personalization.recipient ?? ''} />
          </label>
          <label>
            <span>Текст открытки</span>
            <textarea name="message" rows={4} defaultValue={personalization.message ?? ''} />
          </label>
          <div className={styles.personalizationActions}>
            <Button type="submit">Сохранить</Button>
            <Button type="button" variant="outline" onClick={() => setPersonalizationOpen(false)}>
              Отменить
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
