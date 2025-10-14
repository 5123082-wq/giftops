'use client';

import { useState } from 'react';

import { Button, Card } from '@/components/ui';
import { track } from '@/lib/analytics';

import styles from './bulk-order-tools.module.css';

type BulkEntry = {
  name: string;
  email: string;
  address?: string;
};

export function BulkOrderTools() {
  const [entries, setEntries] = useState<BulkEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    const text = await file.text();
    const rows = text.trim().split(/\r?\n/);
    const parsed: BulkEntry[] = [];
    for (const row of rows.slice(1)) {
      const [name, email, address] = row.split(',').map((value) => value?.trim());
      if (!name || !email) {
        setError('Неверный формат CSV: имя и email обязательны');
        return;
      }
      parsed.push({ name, email, address });
    }
    setEntries(parsed);
    setError(null);
    track('bulk_import_success', { count: parsed.length });
  };

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <h3>Bulk-order</h3>
        <p>Импортируйте получателей из CSV, проверьте адреса и сформируйте смету.</p>
      </div>
      <label className={styles.upload}>
        <span>Загрузить CSV</span>
        <input
          type="file"
          accept="text/csv"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              void handleFile(file);
            }
          }}
        />
      </label>
      {error && <p className={styles.error}>{error}</p>}
      {entries.length > 0 && (
        <div className={styles.results}>
          <p>Импортировано получателей: {entries.length}</p>
          <Button
            onClick={() => {
              track('address_request_sent', { entries: entries.length });
              alert('Демо: запрос адресов отправлен');
            }}
          >
            Запросить подтверждение адресов
          </Button>
        </div>
      )}
    </Card>
  );
}
