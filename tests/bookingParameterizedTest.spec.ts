import { test } from '@playwright/test';
import { BookingHotelsHomePage } from '../page-objects/BookingHotelsHomePage';
import { BookingHotelsResultPage } from '../page-objects/BookingHotelsResultPage';
import { BookingHotelSearchBarPage } from '../page-objects/BookingHotelsSearchBarPage';
import { HotelSearchSpec } from '../types/HotelSearchSpec';

const testCases: HotelSearchSpec[] = [
  { location: 'Mar del Plata', checkin: new Date('10 January 2025'), checkout: new Date('25 January 2025'), adultQuantity: 2, roomQuantity: 3, childrenAge: ['10'] },
  { location: 'Chascomús', checkin: new Date('10 March 2025'), checkout: new Date('20 March 2025'), adultQuantity: 3, roomQuantity: 4, childrenAge: ['9', '7'] },
  { location: 'San Carlos de Bariloche', checkin: new Date('20 April 2025'), checkout: new Date('15 July 2025'), adultQuantity: 4, roomQuantity: 2, childrenAge: ['11'] },
  { location: 'Salta', checkin: new Date('10 March 2025'), checkout: new Date('01 June 2025'), adultQuantity: 0, roomQuantity: 2, childrenAge: ['11', '12', '5'] },
];

testCases.forEach(({ location, checkin, checkout, adultQuantity, roomQuantity, childrenAge }) => {
  test(`Searching in booking -Parameterized - testing with ${location}`, async ({ page }) => {
    const homePage = new BookingHotelsHomePage(page);
    const searchBar = new BookingHotelSearchBarPage(page);
    const resultPage = new BookingHotelsResultPage(page);

    await homePage.go();
    await homePage.closeModal();

    await searchBar.searchLocation(location);
    await searchBar.selectDates(checkin, checkout);
    await searchBar.setOccupancy(adultQuantity, roomQuantity, childrenAge);
    await searchBar.search();

    await resultPage.validateSearchResult(location);

    await page.close();
  });
});