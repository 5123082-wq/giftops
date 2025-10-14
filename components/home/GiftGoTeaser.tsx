import { Button, Card } from '@/components/ui';

export function GiftGoTeaser() {
  return (
    <Card role="region" aria-label="GiftGo — сервис корпоративных подарков">
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            GiftGo — управление корпоративными подарками
          </h2>
          <p style={{ margin: '0.75rem 0 0', maxWidth: '48ch', opacity: 0.85 }}>
            Автоматизация выбора, персонализации и доставки подарков для сотрудников, партнёров и клиентов.
          </p>
        </div>
        <Button asChild aria-label="Подробнее о GiftGo">
          <a href="/giftgo">Подробнее</a>
        </Button>
      </div>
    </Card>
  );
}
