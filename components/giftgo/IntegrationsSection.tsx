import { Card, Badge, Button } from '@/components/ui';

import styles from './integrations-section.module.css';

const integrations = [
  { id: 'crm', name: 'CRM', description: 'Синхронизация сделок и подарков по этапам воронки.', actions: ['Подключить', 'Настроить триггеры'] },
  { id: 'hris', name: 'HRIS', description: 'Праздничные сценарии по событиям в кадрах: онбординг, юбилеи.', actions: ['Сконфигурировать', 'Настроить SSO'] },
  { id: 'slack', name: 'Slack/Teams', description: 'Уведомления о подарках и согласование через чат-бота.', actions: ['Установить бота'] },
  { id: 'marketplaces', name: 'Маркетплейсы', description: 'Расширенный каталог и локальные фулфилменты.', actions: ['Запросить прайс'] }
];

export function IntegrationsSection() {
  return (
    <section className="section" aria-labelledby="integrations">
      <div className="section-header">
        <h2 id="integrations">Интеграции и плагины</h2>
        <p>Подключите GiftGo к вашим корпоративным системам и каналам коммуникации.</p>
      </div>
      <div className={styles.grid}>
        {integrations.map((integration) => (
          <Card key={integration.id} className={styles.card}>
            <div className={styles.header}>
              <h3>{integration.name}</h3>
              <Badge>Beta</Badge>
            </div>
            <p>{integration.description}</p>
            <div className={styles.actions}>
              {integration.actions.map((action) => (
                <Button key={action} variant="outline">
                  {action}
                </Button>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
