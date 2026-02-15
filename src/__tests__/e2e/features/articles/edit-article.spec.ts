import { test, expect } from '@playwright/test';

test('should edit an existing article successfully', async ({ page }) => {

    await page.goto('http://localhost:5173/dashboard');


    // Click first article row
    await page.getByRole('row').nth(1).click();


    // Click Edit button
    await page.getByRole('button', { name: /update/i }).click();


    // Update headline
    const headlineInput = page.getByLabel(/headline/i);

    await headlineInput.clear();

    await headlineInput.fill('E2E Updated Article');


    // Click UPDATE
    const updateButton = page.getByRole('button', { name: /update/i });

    await expect(updateButton).toBeEnabled();

    await updateButton.scrollIntoViewIfNeeded();

    await updateButton.click();


    // Verify update
    await expect(
        page.getByText('E2E Updated Article')
    ).toBeVisible();

});