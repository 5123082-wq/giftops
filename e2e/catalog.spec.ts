import { expect, test } from '@playwright/test';

test('hero carousel and add to cart', async ({ page }) => {
  await page.goto('/giftgo/catalog');
  const region = page.getByRole('region', { name: /готовые решения/i });
  await expect(region).toBeVisible();

  const firstCard = page.getByRole('article').first();
  await firstCard.hover();

  await page.getByRole('button', { name: /в корзину/i }).first().click();
  await expect(page.getByText(/Корзина/i)).toBeVisible();
});
