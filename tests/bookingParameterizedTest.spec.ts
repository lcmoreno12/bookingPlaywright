import { test } from '@playwright/test';
import { BookingPage } from '../page-objects/bookingPage';

const testCases = [
  { location: 'Mar del Plata', checkin: new Date(2024, 11, 12), checkout: new Date(2024, 11, 19), extraRoomQuantity: 3,childrenAge: '10' },
  { location: 'Chascomús', checkin: new Date(2024, 11, 10), checkout: new Date(2024, 11, 22), extraRoomQuantity: 4, childrenAge: '9' },
  { location: 'San Carlos de Bariloche', checkin: new Date(2024, 11, 8), checkout: new Date(2024, 11, 26), extraRoomQuantity: 2, childrenAge: '8' },
  { location: 'Salta', checkin: new Date(2024, 11, 14), checkout: new Date(2024, 11, 29), extraRoomQuantity: 6, childrenAge: '7' },
];

testCases.forEach(({ location, checkin, checkout, extraRoomQuantity, childrenAge }) => {
  test(`Searching in booking -Parameterized - testing with ${location}`, async ({ page }) => {
    const homePage = new BookingPage(page);
    await homePage.bookingHotelsHomePage();

    await homePage.closeModal();

    await homePage.searchLocation(location);
    await homePage.selectDates(checkin, checkout);

    await homePage.addExtraRoom(extraRoomQuantity);

    await homePage.addChildrenOccupancy(childrenAge);
    await homePage.search();

    await homePage.validateSearchResult(location);

    await page.close();

  });
});