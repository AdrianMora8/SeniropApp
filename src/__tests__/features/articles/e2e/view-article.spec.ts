import { test, expect } from '@playwright/test';

test('should open article details', async ({ page }) => {

    await page.goto('/dashboard');

    await page.getByRole('row').nth(1).click();

    await expect(
        page.getByRole('button', { name: /update/i })
    ).toBeVisible();

    await expect(
        page.locator('span', { hasText: /^Author$/ })
    ).toBeVisible();

});