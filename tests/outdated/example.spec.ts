
import { test } from '@playwright/test'

/*
test.beforeEach.(async ({ page }) => {
  await page.goto('https://www.booking.com/index.es-ar.html');
  await page.getByText('Encontrá tu próximo alojamiento').click;

})
//Sino usar el beforeAll -  hooks
*/

test.skip('first test', async ({ page }) => {
  //its a promise, need to wait until its resolved
  await page.goto('https://www.booking.com/index.es-ar.html');
  await page.getByText('Encontrá tu próximo alojamiento').click;

})

test.skip('navigate to', async ({ page }) => {
  await page.goto('https://www.booking.com/index.es-ar.html');
  await page.getByText('Encontrá tu próximo alojamiento').click();
  //by tag name
  page.locator('input');

  //by id
  await page.locator('#airport_taxis').click();

  //by class value
  page.locator('.f034cf5568');

  //by attribute
  page.locator('[placeholder="Email"]');

  //by entire class value
  page.locator('[class="f034cf5568 f034cf3123123 f03444444"]');


  //combine different selector
  page.locator('input[placeholder="Email"]')

  //NOT USE XPATH, NOT RECOMMENDED 

  //by partial text match
  page.locator(':text("Using")')

  //by exact text match
  await page.locator(':text-is("Using the grid")').first().click()

  //User facing locators

  //role del web element, mimica del comportamiento real, buena practica cuando se puede
  await page.getByRole('textbox', { name: "Email" }).first().click()
  await page.getByRole('button', { name: "Sign in" }).first().click()

  await page.getByRole('button', { name: "Sign in" }).first().click()
  await page.getByLabel('Email').first().click()
  await page.getByPlaceholder('Jane Doe').first().click()

  await page.getByText('Using the grid').first().click()
  await page.getByTitle('IoT dashboard').first().click()

  //buena practica hay que ponerlo en el codigo .getTestId


})

test.describe('test suite 1', () => {
  /* ADD TESTS */
})

test('locating child elements', async ({ page }) => {
  await page.goto('https://www.booking.com/index.es-ar.html');
  await page.getByText('Encontrá tu próximo alojamiento').click();

  //await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  //await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")').click()

//avoid using first and last element and .nth(3)
})