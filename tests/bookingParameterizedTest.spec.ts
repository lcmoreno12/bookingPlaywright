import { test } from '@playwright/test';
import { BookingPage } from '../page-objects/bookingPage';

const testCases = [
  { location: 'Mar del Plata', checkin: new Date(2024, 11, 12), checkout: new Date(2024, 11, 19), childrenAge: '10' },
  { location: 'Chascomús', checkin: new Date(2024, 11, 10), checkout: new Date(2024, 11, 22), childrenAge: '9' },
  { location: 'San Carlos de Bariloche', checkin: new Date(2024, 11, 8), checkout: new Date(2024, 11, 26), childrenAge: '8' },
  { location: 'Salta', checkin: new Date(2024, 11, 14), checkout: new Date(2024, 11, 29), childrenAge: '7' },
];

testCases.forEach(({ location, checkin, checkout, childrenAge }) => {
  test(`Searching in booking -Parameterized - testing with ${location}`, async ({ page }) => {
    const homePage = new BookingPage(page);
    await homePage.navigateTo('https://www.booking.com/index.es-ar.html');

    await homePage.closeModal();

    await homePage.searchLocation(location);
    await homePage.selectDates(checkin, checkout);
    await homePage.addChildrenOcupancy(childrenAge);

    await homePage.search();

    await homePage.validateSearchResult(location);

    await page.close();

  });
});