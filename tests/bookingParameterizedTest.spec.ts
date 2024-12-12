import { test } from '@playwright/test';
import { BookingPage } from '../page-objects/bookingPage';

const testCases = [
  { location: 'Mar del Plata', checkin: new Date(2024, 11, 12), checkout: new Date(2024, 11, 19), extraAdults: 2, extraRoomQuantity: 3, childrenQuantity: 1, childrenAge: ['10'] },
  { location: 'Chascomús', checkin: new Date(2024, 11, 10), checkout: new Date(2024, 11, 22), extraAdults: 3, extraRoomQuantity: 4, childrenQuantity: 2, childrenAge: ['9', '7' ]},
  { location: 'San Carlos de Bariloche', checkin: new Date(2024, 11, 8), checkout: new Date(2024, 11, 26), extraRoomQuantity: 2,  childrenQuantity: 1, childrenAge: ['11']},
  { location: 'Salta', checkin: new Date(2024, 11, 14), checkout: new Date(2024, 11, 29), extraAdults: 1, extraRoomQuantity: 6,  childrenQuantity: 3, childrenAge: ['11', '12', '5']},
];

testCases.forEach(({ location, checkin, checkout, extraAdults, extraRoomQuantity,childrenQuantity, childrenAge }) => {
  test(`Searching in booking -Parameterized - testing with ${location}`, async ({ page }) => {
    const homePage = new BookingPage(page);
    await homePage.bookingHotelsHomePage();

    await homePage.closeModal();

    await homePage.searchLocation(location);
    await homePage.selectDates(checkin, checkout);

    await homePage.setOccupancy(extraAdults, extraRoomQuantity, childrenQuantity, childrenAge);

    await homePage.search();

    await homePage.validateSearchResult(location);

    await page.close();

  });
});