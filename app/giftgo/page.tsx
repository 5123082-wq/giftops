import { Suspense } from 'react';

import { HeroCarousel } from '@/components/catalog/HeroCarousel';
import { OverviewSection } from '@/components/giftgo/OverviewSection';
import { EmployeeDirectory } from '@/components/giftgo/EmployeeDirectory';
import { EventsCalendar } from '@/components/giftgo/EventsCalendar';
import { RecommendationsSection } from '@/components/giftgo/RecommendationsSection';
import { OrdersSection } from '@/components/giftgo/OrdersSection';
import { FinanceSection } from '@/components/giftgo/FinanceSection';
import { CommunicationsSection } from '@/components/giftgo/CommunicationsSection';
import { IntegrationsSection } from '@/components/giftgo/IntegrationsSection';
import { CompanySettingsSection } from '@/components/giftgo/CompanySettingsSection';
import { getFeaturedGifts } from '@/lib/data';

export default async function GiftGoPage() {
  const featured = await getFeaturedGifts();

  return (
    <main>
      <section className="section" aria-labelledby="giftgo-hero">
        <div className="section-header">
          <h1 id="giftgo-hero">GiftGo — управление корпоративными подарками</h1>
          <p>Координируйте сотрудников, события, бюджеты и поставщиков в едином модуле.</p>
        </div>
      </section>
      <Suspense fallback={<p>Загрузка рекомендаций…</p>}>
        <HeroCarousel items={featured} />
      </Suspense>
      <OverviewSection />
      <EmployeeDirectory />
      <EventsCalendar />
      <RecommendationsSection />
      <OrdersSection />
      <FinanceSection />
      <CommunicationsSection />
      <IntegrationsSection />
      <CompanySettingsSection />
    </main>
  );
}
