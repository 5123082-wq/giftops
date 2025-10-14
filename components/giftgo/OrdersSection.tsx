import { Card, Badge, Button } from '@/components/ui';

import styles from './orders-section.module.css';

type Order = {
  id: string;
  status: 'draft' | 'in_progress' | 'shipped' | 'delivered';
  gift: string;
  qty: number;
  eta: string;
};

const orders: Order[] = [
  { id: 'ORD-231', status: 'in_progress', gift: 'Orbit Onboarding', qty: 150, eta: '7 марта' },
  { id: 'ORD-228', status: 'shipped', gift: 'Nebula Birthday', qty: 32, eta: '2 марта' },
  { id: 'ORD-210', status: 'delivered', gift: 'Aurora Delight', qty: 220, eta: '22 февраля' }
];

const statusLabel: Record<Order['status'], string> = {
  draft: 'Черновик',
  in_progress: 'В производстве',
  shipped: 'Отгружен',
  delivered: 'Доставлен'
};

export function OrdersSection() {
  return (
    <section className="section" aria-labelledby="orders">
      <div className="section-header">
        <h2 id="orders">Заказы и трекинг</h2>
        <p>Следите за статусами и запускайте новые заказы из рекомендованных наборов.</p>
      </div>
      <Card className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Заказ</th>
              <th>Набор</th>
              <th>Количество</th>
              <th>Статус</th>
              <th>ETA</th>
              <th aria-label="actions" />
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.gift}</td>
                <td>{order.qty}</td>
                <td>
                  <Badge>{statusLabel[order.status]}</Badge>
                </td>
                <td>{order.eta}</td>
                <td>
                  <Button variant="outline">Создать похожий</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </section>
  );
}
