# GiftGo Module

## Как запустить
1. Установите зависимости: `npm install`.
2. Запустите dev-сервер: `npm run dev` и откройте [http://localhost:3000](http://localhost:3000).

## Основные страницы
- `/` — главная, блок-анонс GiftGo.
- `/giftgo` — обзор платформы, разделы для сотрудников, календаря, рекомендаций, заказов, финансов, коммуникаций, интеграций и настроек.
- `/giftgo/catalog` — каталог наборов, карусель решений, фильтры, корзина, bulk/redemption/address инструменты, клиенты.

## API и данные
- `GET /api/gifts` — список подарков (поддерживает query `search`, `gender`, `status`, `theme`, `sort`, `in_stock`).
- `GET /api/gifts/:id` — детализация набора.
- Моки: `mocks/gifts.ts`.

## Стор корзины
Zustand (`store/cart.ts`) хранит элементы `{ gift, qty, personalization }` и операции `add`, `remove`, `updateQty`, `clear`.

## Аналитика
`lib/analytics.ts` — регистрируйте провайдера через `registerAnalytics`. По умолчанию в dev логирует события (`carousel_view`, `add_to_cart`, `catalog_filter_apply`, `gift_quickview_open`, `bulk_import_success`, `redemption_link_created`, `address_request_sent`, `checkout_start`, `personalization_saved`, `cart_clear`).

## Тесты
- Юнит: `npm run test` (Vitest) — покрывает стор корзины и фильтрацию.
- E2E: `npm run e2e` (Playwright) — проверка карусели и добавления в корзину на `/giftgo/catalog`.

## Фичи каталога
- Карусель «Готовые решения» с автопрокруткой и hover-увеличением.
- Фасеты: пол, статус, темы, наличие; поиск и сортировки.
- Сетка карточек с быстрым просмотром, персонализацией и добавлением в корзину.
- Bulk-order CSV импорт, Redemption ссылки, Address Request.
- Карусель заказчиков с орбитальной анимацией и модалкой кейса.
