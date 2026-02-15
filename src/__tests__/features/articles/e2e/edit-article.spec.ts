import { test, expect } from '@playwright/test';

test('should edit an existing article successfully', async ({ page }) => {

    await page.goto('http://localhost:5173/dashboard');

    await page.getByRole('row').nth(1).click();

    await page.getByRole('button', { name: /update/i }).click();

    const headlineInput = page.getByLabel(/headline/i);

    await headlineInput.clear();

    await headlineInput.fill('E2E Updated Article');


    const updateButton = page.getByRole('button', { name: /update/i });

    await expect(updateButton).toBeEnabled();

    await updateButton.scrollIntoViewIfNeeded();

    await updateButton.click();

    await expect(
        page.getByRole('cell', { name: 'E2E Updated Article' })
    ).toBeVisible();

});