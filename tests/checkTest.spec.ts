import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('/');
  await page.locator('#dialog').getByRole('button').filter({hasText: 'Accept all'}).click()
})

test('page has title', async ({ page }) => {
  await expect(page).toHaveTitle('YouTube');
});

