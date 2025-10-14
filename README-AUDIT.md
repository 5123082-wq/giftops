# GiftOps Audit

## Технологический стек
- **Next.js**: 14.2.3 (App Router).
- **TypeScript**: 5.4.5.
- **React**: 18.3.1.
- **Стили**: CSS-модули и глобальные токены (spacing через утилитарные классы `.section`, `.grid`, радиусы 1rem/999px, тени через `color-mix`).
- **ESLint**: `next/core-web-vitals` (конфигурация `.eslintrc.json`).
- **Prettier**: отсутствует.
- **CI**: отсутствует.

## Дизайн-система
- Базовые компоненты UI: `Button`, `Card`, `Badge`, `Modal`, `GiftCard`, `HeroCarousel`, `ClientsOrbit`.
- Сетка и лейаут: `.grid`, `.grid-cols-*`, `.section`, `.section-header`.
- Токены: радиусы (`1rem`, `999px`), прозрачные фоны и тени через `color-mix` с `currentColor`, focus-outline `2px`.
- Иконки: SVG в `public/images` (логотипы и иллюстрации). Отдельной икон-библиотеки нет.

## Сущности и API
- **GiftSet** типизирован в `types/gift.ts`.
- Мок-данные подарков и кейсов в `mocks/gifts.ts`.
- API App Router: `GET /api/gifts`, `GET /api/gifts/:id`.
- **Стор корзины**: Zustand (`store/cart.ts`).
- **Аналитика**: `lib/analytics.ts` с возможностью регистрации провайдера, по умолчанию логирует события в dev.
- Сущности заказов, сотрудников, бюджетов представлены мок-коллекциями в компонентах страницы `/giftgo`.

## Маршруты и блоки
- Главная (`/`): содержит блок-анонс GiftGo с CTA.
- `/giftgo`: разделы обзор, картотека сотрудников, календарь, рекомендации, заказы, финансы, коммуникации, интеграции, настройки.
- `/giftgo/catalog`: карусель «Готовые решения», фасеты и поиск, сетка каталога, карусель заказчиков, bulk/personalization инструменты, корзина.

## Тестовый стек
- **Юнит**: Vitest + Testing Library (`vitest.config.ts`).
- **E2E**: Playwright (`playwright.config.ts`).
- Покрытие: добавлены тесты для стора корзины и фильтрации (см. `tests/`), e2e сценарий каталога (`e2e/catalog.spec.ts`).
