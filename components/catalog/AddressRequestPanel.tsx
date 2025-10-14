'use client';

import { useState } from 'react';

import { Button, Card } from '@/components/ui';
import { track } from '@/lib/analytics';

import styles from './address-request-panel.module.css';

export function AddressRequestPanel() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSend = () => {
    if (!email) return;
    setStatus('Ссылка отправлена на ' + email);
    track('address_request_sent', { email });
    setEmail('');
  };

  return (
    <Card className={styles.card}>
      <h3>Address Request</h3>
      <p>Отправьте защищённую форму для уточнения адреса доставки у получателя.</p>
      <label>
        <span>Email получателя</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="employee@example.com"
        />
      </label>
      <Button onClick={handleSend} disabled={!email}>
        Отправить запрос
      </Button>
      {status && <p className={styles.status}>{status}</p>}
    </Card>
  );
}
