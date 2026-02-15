import { test, expect } from '@playwright/test';

test('should create a new article successfully', async ({ page }) => {

    await page.goto('http://localhost:5173/dashboard');

    await page.getByRole('button', { name: /Add Article/i }).click();

    await page.getByLabel(/headline/i).fill('Test Article Headline');

    await page.getByLabel(/author/i).fill('John Doe');

    await page.getByLabel(/body/i).fill('Test Body');

    await page.getByLabel(/Publication Date/i).click();

    const today = new Date();
    const day = today.getDate().toString();

    await page.getByRole('dialog').getByText(day, { exact: true }).first().click();

    const saveButton = page.getByRole('button', { name: /save/i });

    await expect(saveButton).toBeEnabled();

    await saveButton.scrollIntoViewIfNeeded();

    await saveButton.click();

    await expect(
        page.getByRole('cell', { name: 'Test Article Headline' })
    ).toBeVisible();

});