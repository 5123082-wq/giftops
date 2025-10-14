import { Card, Button, Badge } from '@/components/ui';
import { mockGifts } from '@/mocks/gifts';

import styles from './recommendations-section.module.css';

export function RecommendationsSection() {
  return (
    <section className="section" aria-labelledby="recommendations">
      <div className="section-header">
        <h2 id="recommendations">Рекомендации и наборы</h2>
        <p>Адаптируйте подборку подарков под сценарий и согласуйте с заинтересованными сторонами.</p>
      </div>
      <div className={styles.grid}>
        {mockGifts.map((gift) => (
          <Card key={gift.id} className={styles.card}>
            <div className={styles.header}>
              <h3>{gift.title}</h3>
              <Badge>{gift.unit_price.toLocaleString()} ₽</Badge>
            </div>
            <p>{gift.description}</p>
            <ul>
              {gift.items.map((item) => (
                <li key={item.sku}>
                  {item.name} × {item.qty}
                </li>
              ))}
            </ul>
            <div className={styles.actions}>
              <Button>Утвердить</Button>
              <Button variant="outline">Запросить правки</Button>
              <Button variant="ghost">Отложить</Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
