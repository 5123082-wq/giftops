'use client';

import { useMemo, useState } from 'react';

import { Card } from '@/components/ui';

import styles from './employee-directory.module.css';

type Employee = {
  id: string;
  name: string;
  role: string;
  location: string;
  tags: string[];
};

const employees: Employee[] = [
  { id: '1', name: 'Алексей Власов', role: 'Разработка', location: 'Москва', tags: ['инженер', 'юбиляр'] },
  { id: '2', name: 'Мария Петрова', role: 'Продажи', location: 'Казань', tags: ['vip', 'партнёр'] },
  { id: '3', name: 'Сергей Смирнов', role: 'HR', location: 'Санкт-Петербург', tags: ['новый сотрудник'] },
  { id: '4', name: 'Елена Орлова', role: 'Маркетинг', location: 'Новосибирск', tags: ['юбилей'] }
];

export function EmployeeDirectory() {
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');

  const filtered = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch = `${employee.name} ${employee.role} ${employee.location}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesTag = tag ? employee.tags.includes(tag) : true;
      return matchesSearch && matchesTag;
    });
  }, [search, tag]);

  return (
    <section className="section" aria-labelledby="employee-directory">
      <div className="section-header">
        <h2 id="employee-directory">Картотека сотрудников</h2>
        <p>Все события, предпочтения и статусы сотрудников в одной базе.</p>
      </div>
      <Card className={styles.card}>
        <div className={styles.controls}>
          <label>
            <span>Поиск</span>
            <input
              type="search"
              placeholder="ФИО, роль, город"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <label>
            <span>Тег</span>
            <select value={tag} onChange={(event) => setTag(event.target.value)}>
              <option value="">Все</option>
              <option value="инженер">Инженеры</option>
              <option value="юбиляр">Юбиляры</option>
              <option value="новый сотрудник">Новые сотрудники</option>
              <option value="vip">VIP</option>
            </select>
          </label>
        </div>
        <ul className={styles.list}>
          {filtered.map((employee) => (
            <li key={employee.id}>
              <div>
                <strong>{employee.name}</strong>
                <p>{employee.role}</p>
              </div>
              <div>
                <p>{employee.location}</p>
                <p className={styles.tags}>{employee.tags.join(', ')}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
