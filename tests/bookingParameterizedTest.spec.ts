import { test } from '@playwright/test';
import { BookingPage } from '../page-objects/bookingPage';

const testCases = [
  { location: 'Mar del Plata', checkin: "2024-12-12", checkout: "2024-12-19", childrenAge: '10' },
  { location: 'Chascomús', checkin: "2024-12-10", checkout: "2024-12-22", childrenAge: '9' },
  { location: 'San Carlos de Bariloche', checkin: "2024-12-08", checkout: "2024-12-26", childrenAge: '8' },
  { location: 'Salta', checkin: "2024-12-14", checkout: "2024-12-29", childrenAge: '7' },
];

testCases.forEach(({ location, checkin, checkout, childrenAge }) => {
  test(`Searching in booking -Parameterized - testing with ${location}`, async ({ page }) => {
    const homePage = new BookingPage(page);
    await homePage.navigateTo('https://www.booking.com/index.es-ar.html');

    await homePage.closeModal();

    await homePage.searchLocation(location);
    await homePage.selectDate(checkin, checkout);
    await homePage.addChildrenOcupancy(childrenAge);

    await homePage.search();

    await homePage.verifyResult(location);

    await page.close();

  });
});