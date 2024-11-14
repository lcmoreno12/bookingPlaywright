
import { test } from '@playwright/test'

test.skip('locating parent elements', async ({ page }) => {
    page.goto('https://playwright.dev/');
    //await page.locator('nb-card', { hasText: "Using the grid" }).getByRole('textbox',{name:"Email"}).click()
})


test.skip('locating parent elements', async ({ page }) => {
    const installationPage = page.locator('buttons_pzbO')
    await page.goto('https://playwright.dev/');
    await installationPage.click()
    await installationPage.getByTitle('Installation').click();
    //await page.locator('nb-card', { hasText: "Using the grid" }).getByRole('textbox',{name:"Email"}).click()
})