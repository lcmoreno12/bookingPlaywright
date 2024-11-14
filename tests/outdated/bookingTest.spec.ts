import { test } from '@playwright/test';
import { BookingPage } from '../../page-objects/bookingPage';


test('Searching in booking', async ({ page }) => {
    const homePage = new BookingPage(page);
    await homePage.navigateTo('https://www.booking.com/index.es-ar.html');

    const modalCloseButton = page.locator('[aria-label="No quiero iniciar sesión."]');
    if (await modalCloseButton.isVisible()) {
        await modalCloseButton.click();
    }

    await page.getByText('Encontrá tu próximo alojamiento').click();
    await homePage.searchLocation('Mar del Plata');
    await homePage.selectDate();
    await homePage.addChildrenOcupancy('10');

    await page.close();

    
});