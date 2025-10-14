import { Card, Button } from '@/components/ui';

import styles from './communications-section.module.css';

type Ticket = {
  id: string;
  subject: string;
  status: 'open' | 'resolved' | 'in_progress';
  owner: string;
};

const tickets: Ticket[] = [
  { id: 'CASE-98', subject: 'Запрос скидки на bulk-онбординг', status: 'open', owner: 'Анастасия' },
  { id: 'CASE-84', subject: 'Уточнить сроки поставки VIP набора', status: 'in_progress', owner: 'Сергей' }
];

export function CommunicationsSection() {
  return (
    <section className="section" aria-labelledby="communications">
      <div className="section-header">
        <h2 id="communications">Коммуникации и тикеты</h2>
        <p>Поддерживайте прозрачный диалог с GiftGo: чат, файлы и SLA в одном окне.</p>
      </div>
      <div className={styles.layout}>
        <Card className={styles.chat}>
          <h3>Чат-центр</h3>
          <div className={styles.messages}>
            <div>
              <strong>GiftGo</strong>
              <p>Добро пожаловать! Обновили каталог к 8 Марта и добавили redemption.</p>
            </div>
            <div className={styles.reply}>
              <strong>Вы</strong>
              <p>Отлично! Нужен bulk заказ по онбордингу на 150 человек.</p>
            </div>
          </div>
          <Button variant="outline">Написать сообщение</Button>
        </Card>
        <Card className={styles.tickets}>
          <h3>Открытые тикеты</h3>
          <ul>
            {tickets.map((ticket) => (
              <li key={ticket.id}>
                <div>
                  <strong>{ticket.subject}</strong>
                  <span>{ticket.id}</span>
                </div>
                <div>
                  <span>{ticket.owner}</span>
                  <span className={styles.status}>{ticket.status}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
