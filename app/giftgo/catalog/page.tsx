import { Suspense } from 'react';

import { AddressRequestPanel } from '@/components/catalog/AddressRequestPanel';
import { BulkOrderTools } from '@/components/catalog/BulkOrderTools';
import { CartPanel } from '@/components/catalog/CartPanel';
import { CatalogFilters } from '@/components/catalog/CatalogFilters';
import { ClientsOrbitShowcase } from '@/components/catalog/ClientsOrbitShowcase';
import { GiftCard } from '@/components/catalog/GiftCard';
import { HeroCarousel } from '@/components/catalog/HeroCarousel';
import { RedemptionTools } from '@/components/catalog/RedemptionTools';
import { getClientCases, getFeaturedGifts, fetchGifts } from '@/lib/data';

export default async function CatalogPage({ searchParams }: { searchParams: Record<string, string> }) {
  const [{ items }, featured, cases] = await Promise.all([
    fetchGifts(searchParams),
    getFeaturedGifts(),
    getClientCases()
  ]);

  return (
    <main>
      <section className="section" aria-labelledby="catalog-hero">
        <div className="section-header">
          <h1 id="catalog-hero">Каталог GiftGo</h1>
          <p>Готовые решения, фильтры и персонализация для любого сценария поздравлений.</p>
        </div>
      </section>
      <Suspense fallback={<p>Загрузка решений…</p>}>
        <HeroCarousel items={featured} />
      </Suspense>
      <CatalogFilters />
      <section className="section" aria-labelledby="catalog-grid">
        <div className="section-header">
          <h2 id="catalog-grid">Список наборов</h2>
          <p>Сравнивайте наборы, добавляйте в корзину и запускайте bulk-заказы.</p>
        </div>
        <div className="grid grid-cols-3">
          {items.map((gift) => (
            <GiftCard key={gift.id} gift={gift} />
          ))}
        </div>
      </section>
      <section className="section" aria-labelledby="catalog-tools">
        <div className="section-header">
          <h2 id="catalog-tools">Bulk, персонализация и адреса</h2>
          <p>Ускорьте массовые отправки и сохраните персональное впечатление.</p>
        </div>
        <div className="grid" style={{ gap: "1.5rem" }}>
          <div className="grid grid-cols-2" style={{ gap: "1.5rem" }}>
            <BulkOrderTools />
            <CartPanel />
          </div>
                    <div className="grid grid-cols-2" style={{ gap: "1.5rem" }}>
            <RedemptionTools />
            <AddressRequestPanel />
          </div>
        </div>
      </section>
      <Suspense>
        <ClientsOrbitShowcase cases={cases} />
      </Suspense>
    </main>
  );
}
