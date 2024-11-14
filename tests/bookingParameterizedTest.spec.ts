import { test } from '@playwright/test';
import { BookingPage } from '../page-objects/bookingPage';

const testCases = [
  { location: 'Mar del Plata', childrenAge: '10' },
  { location: 'Chascomús', childrenAge: '9' },
  { location: 'San Carlos de Bariloche', childrenAge: '8' },
  { location: 'Salta', childrenAge: '7' },
];

testCases.forEach(({ location, childrenAge }) => {
  test(`Searching in booking -Parameterized - testing with ${location}`, async ({ page }) => {
    const homePage = new BookingPage(page);
    await homePage.navigateTo('https://www.booking.com/index.es-ar.html');

    await homePage.closeModal();

    await homePage.searchLocation(location);
    await homePage.selectDate();
    await homePage.addChildrenOcupancy(childrenAge);

    await homePage.search();

    await homePage.verifyResult(location + ": ");

    await page.close();

  });
});