'use client';

import { useState } from 'react';

import { Button, Card } from '@/components/ui';
import { track } from '@/lib/analytics';

import styles from './redemption-tools.module.css';

export function RedemptionTools() {
  const [link, setLink] = useState<string | null>(null);
  const [message, setMessage] = useState('Спасибо за вклад в команду! Выберите подарок.');

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <h3>Redemption</h3>
        <p>Создайте безопасную ссылку, чтобы получатель сам выбрал набор в каталоге.</p>
      </div>
      <label className={styles.label}>
        <span>Текст для открытки</span>
        <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={4} />
      </label>
      <Button
        onClick={() => {
          const generated = `https://giftgo.example/redemption/${Date.now().toString(36)}`;
          setLink(generated);
          track('redemption_link_created');
        }}
      >
        Сгенерировать ссылку
      </Button>
      {link && (
        <div className={styles.result}>
          <p>
            Поделитесь ссылкой: <a href={link}>{link}</a>
          </p>
        </div>
      )}
    </Card>
  );
}
