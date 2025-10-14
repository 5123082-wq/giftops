import { Card, Button } from '@/components/ui';

import styles from './finance-section.module.css';

const budgets = [
  { name: 'Onboarding', spent: 320000, total: 500000 },
  { name: 'Партнёры', spent: 180000, total: 250000 },
  { name: 'VIP', spent: 95000, total: 150000 }
];

export function FinanceSection() {
  return (
    <section className="section" aria-labelledby="finance">
      <div className="section-header">
        <h2 id="finance">Финансы и бюджеты</h2>
        <p>Контролируйте лимиты, распределяйте бюджеты и экспортируйте отчёты.</p>
      </div>
      <div className={styles.layout}>
        <Card className={styles.summary}>
          <h3>Исполнение бюджетов</h3>
          <ul>
            {budgets.map((budget) => {
              const ratio = Math.min(100, Math.round((budget.spent / budget.total) * 100));
              return (
                <li key={budget.name}>
                  <div className={styles.budgetRow}>
                    <span>{budget.name}</span>
                    <span>
                      {budget.spent.toLocaleString()} ₽ / {budget.total.toLocaleString()} ₽
                    </span>
                  </div>
                  <div className={styles.progress}>
                    <span style={{ width: `${ratio}%` }} aria-hidden />
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
        <Card className={styles.actions}>
          <h3>Экспорт и отчётность</h3>
          <p>Скачайте детализацию расходов, сформируйте CSV или PDF для финансовой службы.</p>
          <div className={styles.buttons}>
            <Button variant="outline">Экспорт CSV</Button>
            <Button variant="outline">Экспорт PDF</Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
