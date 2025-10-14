import { Button, Card } from '@/components/ui';

export function OverviewSection() {
  return (
    <section className="section" aria-labelledby="giftgo-overview">
      <div className="section-header">
        <h2 id="giftgo-overview">GiftGo для HR, маркетинга и закупок</h2>
        <p>Оцифруйте корпоративные подарки: автоматизируйте подбор, бюджеты и аналитику.</p>
      </div>
      <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
        <Card className="overview-card">
          <div style={{ padding: '1.75rem', display: 'grid', gap: '0.75rem' }}>
            <h3 style={{ margin: 0 }}>Преимущества</h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'grid', gap: '0.4rem' }}>
              <li>Каталог подарков с умным поиском и рекомендациями.</li>
              <li>Интеграция с HRIS, CRM и мессенджерами.</li>
              <li>Контроль бюджетов, лимитов и статусов заказов.</li>
            </ul>
          </div>
        </Card>
        <Card>
          <div style={{ padding: '1.75rem', display: 'grid', gap: '1rem' }}>
            <h3 style={{ margin: 0 }}>Готовы показать демо</h3>
            <p style={{ margin: 0 }}>Получите персональную презентацию, сценарии внедрения и ROI-калькулятор.</p>
            <Button asChild>
              <a href="#demo">Запросить демо</a>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
