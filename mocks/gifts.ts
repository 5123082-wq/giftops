import type { ClientCase, GiftSet } from '@/types/gift';

export const mockGifts: GiftSet[] = [
  {
    id: 'aurora-delight',
    title: 'Aurora Delight',
    description: 'Универсальный набор для тёплого приветствия новых сотрудников.',
    images: ['/images/gifts/aurora.svg'],
    items: [
      { sku: 'mug-aurora', name: 'Термокружка Aurora', qty: 1 },
      { sku: 'notebook-soft', name: 'Мягкий блокнот', qty: 1 },
      { sku: 'pen-matte', name: 'Ручка с гравировкой', qty: 1 }
    ],
    unit_price: 5800,
    lead_time_days: 7,
    personalization: { name_print: true, options: ['Открытка', 'Гравировка имени'] },
    constraints: { no_alcohol: true },
    tags: ['онбординг', 'универсальный'],
    gender: 'unisex',
    recipient_status: ['new_hire'],
    holiday_themes: ['onboarding'],
    rating: 4.9,
    in_stock: true
  },
  {
    id: 'stellar-vip',
    title: 'Stellar VIP',
    description: 'Премиальный набор для ключевых партнёров и топ-менеджеров.',
    images: ['/images/gifts/stellar.svg'],
    items: [
      { sku: 'wine-premium', name: 'Коллекционное вино', qty: 1 },
      { sku: 'planner-luxe', name: 'Планер из эко-кожи', qty: 1 },
      { sku: 'chocolate-artisan', name: 'Ремесленный шоколад', qty: 1 }
    ],
    unit_price: 14800,
    lead_time_days: 21,
    personalization: { name_print: true, options: ['Открытка', 'Гравировка'] },
    constraints: { allergens: ['орехи'] },
    tags: ['vip', 'премиум'],
    gender: 'unisex',
    recipient_status: ['vip', 'partner'],
    holiday_themes: ['anniversary', 'corporate'],
    rating: 4.8,
    in_stock: true
  },
  {
    id: 'orbit-onboarding',
    title: 'Orbit Onboarding',
    description: 'Готовое решение с акцентом на digital-набор и мерч.',
    images: ['/images/gifts/orbit.svg'],
    items: [
      { sku: 'hoodie-soft', name: 'Худи с логотипом', qty: 1 },
      { sku: 'stickers-pack', name: 'Набор стикеров', qty: 1 },
      { sku: 'gift-card', name: 'Подарочная карта 3000 ₽', qty: 1 }
    ],
    unit_price: 7600,
    lead_time_days: 10,
    personalization: { name_print: true, options: ['Размер одежды', 'Цветовая схема'] },
    constraints: { no_alcohol: true },
    tags: ['digital', 'мерч'],
    gender: 'unisex',
    recipient_status: ['new_hire'],
    holiday_themes: ['onboarding'],
    rating: 4.7,
    in_stock: false
  },
  {
    id: 'nebula-birthday',
    title: 'Nebula Birthday',
    description: 'Праздничный набор с гастрономическими радостями.',
    images: ['/images/gifts/nebula.svg'],
    items: [
      { sku: 'cake-voucher', name: 'Сертификат на торт', qty: 1 },
      { sku: 'coffee-special', name: 'Спешиалти кофе', qty: 1 },
      { sku: 'candles-set', name: 'Набор свечей', qty: 1 }
    ],
    unit_price: 5200,
    lead_time_days: 5,
    tags: ['birthday'],
    gender: 'unisex',
    recipient_status: ['employee'],
    holiday_themes: ['birthday'],
    rating: 4.6,
    in_stock: true
  }
];

export const clientCases: ClientCase[] = [
  {
    id: 'nova-bank',
    company: 'Nova Bank',
    logo: '/images/logos/nova-bank.svg',
    summary: 'Автоматизировали поздравления 8 000 сотрудников по 12 сценариям.',
    challenge: 'Разные сценарии подарков для отделов и регионов.',
    scale: '8 000 сотрудников, 24 региона',
    sla: 'Доставка в течение 48 часов по всей стране',
    feedback: 'GiftGo дал прозрачность по бюджету и гарантировал высокий NPS.'
  },
  {
    id: 'orbital-tech',
    company: 'Orbital Tech',
    logo: '/images/logos/orbital-tech.svg',
    summary: 'Внедрили гибридный каталог и redemption-схему для распределённой команды.',
    challenge: 'Удалённая команда в 27 странах, разный налоговый режим.',
    scale: '1 200 сотрудников, 27 стран',
    sla: 'Обработка заказа до 24 часов, локальные фулфилменты',
    feedback: 'Команда в восторге от гибкости и персонализации.'
  },
  {
    id: 'stellar-industries',
    company: 'Stellar Industries',
    logo: '/images/logos/stellar-industries.svg',
    summary: 'Синхронизировали подарки с CRM и автоматизацией маркетинга.',
    challenge: 'Сложный цикл сделок и подарок на каждом этапе.',
    scale: '500 партнёров B2B, SLA 72 часа',
    sla: 'Доставка по СНГ и Европе',
    feedback: 'Появились единые стандарты, выросла конверсия повторных сделок.'
  }
];
