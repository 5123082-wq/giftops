'use client';

import { addDays, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useMemo, useState } from 'react';

import { Card } from '@/components/ui';

import styles from './events-calendar.module.css';

type CalendarMode = 'month' | 'week' | 'list';

type Event = {
  id: string;
  title: string;
  date: Date;
  type: 'corporate' | 'state' | 'industry';
};

const baseEvents: Event[] = [
  { id: '1', title: 'День рождения Юлии', date: addDays(new Date(), 3), type: 'corporate' },
  { id: '2', title: 'День HR специалиста', date: addDays(new Date(), 10), type: 'industry' },
  { id: '3', title: '8 Марта', date: new Date(new Date().getFullYear(), 2, 8), type: 'state' }
];

export function EventsCalendar() {
  const [mode, setMode] = useState<CalendarMode>('month');

  const events = useMemo(() => baseEvents.sort((a, b) => a.date.getTime() - b.date.getTime()), []);

  return (
    <section className="section" aria-labelledby="events-calendar">
      <div className="section-header">
        <h2 id="events-calendar">Календарь событий</h2>
        <p>Все корпоративные, государственные и отраслевые поводы на одном таймлайне.</p>
      </div>
      <Card className={styles.card}>
        <div className={styles.modes} role="tablist" aria-label="Представление календаря">
          {['month', 'week', 'list'].map((value) => (
            <button
              key={value}
              role="tab"
              aria-selected={mode === value}
              className={mode === value ? styles.active : ''}
              onClick={() => setMode(value as CalendarMode)}
            >
              {value === 'month' ? 'Месяц' : value === 'week' ? 'Неделя' : 'Список'}
            </button>
          ))}
        </div>
        <div className={styles.viewport} role="tabpanel" aria-live="polite">
          {mode === 'list' ? (
            <ul className={styles.list}>
              {events.map((event) => (
                <li key={event.id}>
                  <span>{format(event.date, 'd MMMM', { locale: ru })}</span>
                  <strong>{event.title}</strong>
                  <span className={styles.badge}>{event.type}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.grid}>
              {events.map((event) => (
                <article key={event.id}>
                  <span>{format(event.date, 'd MMM', { locale: ru })}</span>
                  <strong>{event.title}</strong>
                  <small>{event.type}</small>
                </article>
              ))}
            </div>
          )}
        </div>
      </Card>
    </section>
  );
}
