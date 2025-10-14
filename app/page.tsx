import { GiftGoTeaser } from '@/components/home/GiftGoTeaser';

export default function HomePage() {
  return (
    <main>
      <section className="section" aria-labelledby="landing-intro">
        <div className="section-header">
          <h1 id="landing-intro">GiftOps корпоративный портал</h1>
          <p>Центр управления корпоративными программами и вовлечённостью сотрудников.</p>
        </div>
        <p style={{ maxWidth: '60ch', opacity: 0.85 }}>
          GiftOps помогает HR и операционным командам управлять корпоративными ритуалами, автоматизировать коммуникации и интегрироваться с существующими процессами. Новый модуль GiftGo закрывает потребности в подарках.
        </p>
      </section>
      <section className="section" aria-labelledby="giftgo-teaser">
        <h2 id="giftgo-teaser" style={{ position: 'absolute', left: '-9999px' }}>
          GiftGo teaser
        </h2>
        <GiftGoTeaser />
      </section>
    </main>
  );
}
