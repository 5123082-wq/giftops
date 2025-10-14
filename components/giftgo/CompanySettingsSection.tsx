import { Card, Button, Badge } from '@/components/ui';

import styles from './company-settings-section.module.css';

const policies = [
  { id: 'roles', title: 'Роли и доступ', description: 'Определите, кто может создавать заказы, согласовывать бюджеты и видеть аналитику.' },
  { id: 'notifications', title: 'Уведомления', description: 'Настройте email, Slack и push-уведомления для ключевых событий.' },
  { id: 'compliance', title: 'Политики и лимиты', description: 'Укажите подарочные лимиты, ограничения по алкоголю и аллергенам.' }
];

export function CompanySettingsSection() {
  return (
    <section className="section" aria-labelledby="company-settings">
      <div className="section-header">
        <h2 id="company-settings">Настройки компании</h2>
        <p>Управляйте политиками, ролями и уведомлениями без обращения в поддержку.</p>
      </div>
      <div className={styles.grid}>
        {policies.map((policy) => (
          <Card key={policy.id} className={styles.card}>
            <div className={styles.header}>
              <h3>{policy.title}</h3>
              <Badge>Live</Badge>
            </div>
            <p>{policy.description}</p>
            <Button variant="outline">Настроить</Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
