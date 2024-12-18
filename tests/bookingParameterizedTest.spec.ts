import { test } from '@playwright/test';
import { BookingHotelsHomePage } from '../page-objects/BookingHotelsHomePage';
import { BookingHotelsResultPage } from '../page-objects/BookingHotelsResultPage';


const testCases = [
  { location: 'Mar del Plata', checkin: new Date('20 December 2024'), checkout: new Date('28 December 2024'), adultQuantity: 2, roomQuantity: 3, childrenQuantity: 1, childrenAge: ['10'] },
  { location: 'Chascomús', checkin: new Date('21 December 2024'), checkout: new Date('29 December 2024'), adultQuantity: 3, roomQuantity: 4, childrenQuantity: 2, childrenAge: ['9', '7'] },
  { location: 'San Carlos de Bariloche', checkin: new Date('20 December 2024'), checkout: new Date('30 December 2024'), adultQuantity: 4, roomQuantity: 2, childrenQuantity: 1, childrenAge: ['11'] },
  { location: 'Salta', checkin: new Date('19 December 2024'), checkout: new Date('31 December 2024'), adultQuantity: 0, roomQuantity: 2, childrenQuantity: 3, childrenAge: ['11', '12', '5'] },
];

testCases.forEach(({ location, checkin, checkout, adultQuantity, roomQuantity, childrenQuantity, childrenAge }) => {
  test(`Searching in booking -Parameterized - testing with ${location}`, async ({ page }) => {
    const homePage = new BookingHotelsHomePage(page);
    const resultPage = new BookingHotelsResultPage(page);

    await homePage.go();

    await homePage.closeModal();

    await homePage.searchLocation(location);
    await homePage.selectDates(checkin, checkout);

    await homePage.setOccupancy(adultQuantity, roomQuantity, childrenQuantity, childrenAge);

    await homePage.search();

    await resultPage.validateSearchResult(location);

    await page.close();

  });
});