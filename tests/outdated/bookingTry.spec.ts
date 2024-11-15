import { test, expect } from '@playwright/test';

test('Searching in booking', async ({ page }) => {
    //const context = await browser.newContext();

    // Crear una nueva página en el contexto
    //const page = await context.newPage();

 
    await page.goto('https://www.booking.com/index.es-ar.html', { waitUntil: 'networkidle' });
    const modalCloseButton = page.locator('[aria-label="No quiero iniciar sesión."]');
    if (await modalCloseButton.isVisible()) {
        await modalCloseButton.click();
    }


    await page.getByText('Encontrá tu próximo alojamiento').click();


    await page.locator('.eb46370fe1').fill('Mar del plata');

 
    await page.locator('.f73e6603bf').click();

    await page.locator('[data-date="2024-11-12"]').waitFor({ state: 'visible' });
    await page.locator('[data-date="2024-11-12"]').click();

    await page.locator('[data-date="2024-11-19"]').waitFor({ state: 'visible' });
    await page.locator('[data-date="2024-11-19"]').click();


    await page.locator('button[data-testid="occupancy-config"]').waitFor({ state: 'visible' });

    await page.locator('button[data-testid="occupancy-config"]').click();
    await page.locator('input#group_children ~ div:last-of-type > button:last-of-type').click();
    await page.locator("select[name='age']").selectOption({ value: '10' });

    //await page.locator("select[name='age']").click();

    await expect(page.locator('.eb46370fe1')).toHaveValue('Mar del plata');

    // Cerrar el contexto
    //await context.close();
});