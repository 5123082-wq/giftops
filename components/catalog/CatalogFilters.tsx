'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { Button, Card } from '@/components/ui';
import { track } from '@/lib/analytics';

import styles from './catalog-filters.module.css';

const genderOptions = [
  { value: 'any', label: 'Все' },
  { value: 'unisex', label: 'Унисекс' },
  { value: 'female', label: 'Женщины' },
  { value: 'male', label: 'Мужчины' }
];

const statusOptions = [
  'vip',
  'new_hire',
  'partner',
  'employee'
];

const themeOptions = [
  'birthday',
  'onboarding',
  'anniversary',
  'corporate'
];

const sortOptions = [
  { value: 'popularity', label: 'По популярности' },
  { value: 'price_asc', label: 'Цена ↑' },
  { value: 'price_desc', label: 'Цена ↓' },
  { value: 'lead', label: 'Срок поставки' },
  { value: 'rating', label: 'Рейтинг' },
  { value: 'new', label: 'Новинки' }
];

export function CatalogFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const current = useMemo(() => {
    const entries = new URLSearchParams(params.toString());
    return {
      search: entries.get('search') ?? '',
      gender: entries.get('gender') ?? 'any',
      status: entries.get('status') ?? '',
      theme: entries.get('theme') ?? '',
      sort: entries.get('sort') ?? 'popularity',
      in_stock: entries.get('in_stock') === 'true'
    };
  }, [params]);

  const updateParam = (key: string, value?: string) => {
    const next = new URLSearchParams(params.toString());
    if (value && value.length) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    router.push(`/giftgo/catalog?${next.toString()}`);
    track('catalog_filter_apply', { key, value });
  };

  const handleSearch = (formData: FormData) => {
    const search = String(formData.get('search') ?? '');
    updateParam('search', search);
  };

  return (
    <Card className={styles.wrapper}>
      <form onSubmit={(event) => { event.preventDefault(); handleSearch(new FormData(event.currentTarget)); }} className={styles.form}>
        <label className={styles.searchLabel}>
          <span>Поиск</span>
          <input
            type="search"
            name="search"
            placeholder="Название, SKU, тег"
            defaultValue={current.search}
          />
        </label>
        <div className={styles.row}>
          <label>
            <span>Пол</span>
            <select
              name="gender"
              value={current.gender}
              onChange={(event) => updateParam('gender', event.target.value)}
            >
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Статус</span>
            <select
              name="status"
              value={current.status}
              onChange={(event) => updateParam('status', event.target.value)}
            >
              <option value="">Все</option>
              {statusOptions.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Темы</span>
            <select
              name="theme"
              value={current.theme}
              onChange={(event) => updateParam('theme', event.target.value)}
            >
              <option value="">Все</option>
              {themeOptions.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={current.in_stock}
              onChange={(event) => updateParam('in_stock', event.target.checked ? 'true' : undefined)}
            />
            <span>Только в наличии</span>
          </label>
        </div>
        <div className={styles.sortRow}>
          <label>
            <span>Сортировка</span>
            <select
              name="sort"
              value={current.sort}
              onChange={(event) => updateParam('sort', event.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <Button type="submit">Найти</Button>
        </div>
      </form>
    </Card>
  );
}
