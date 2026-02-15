import { test, expect } from '@playwright/test';

test('should open article details', async ({ page }) => {

    await page.goto('http://localhost:5173/dashboard');

    await page.getByRole('row').nth(1).click();

    await expect(
        page.getByRole('heading', { name: /article/i })
    ).toBeVisible();

});