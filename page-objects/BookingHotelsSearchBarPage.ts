import { Locator, Page } from "@playwright/test";

export class BookingHotelSearchBarPage {
    page: Page;
    locationInput: Locator
    calendar: Locator
    datePicker: Locator
    firstMonth: Locator
    sndMonth: Locator
    nextMonth: Locator
    occupancyPopup: Locator
    ocupancySelector: Locator
    addChildren: Locator
    removeChildren: Locator
    childrenCount: Locator
    addAdult: Locator
    removeAdult: Locator
    adultCount: Locator
    addRoom: Locator
    removeRoom: Locator
    roomCount: Locator
    childrenAge: Locator
    doneButton: Locator
    searchButton: Locator
    readonly DATE_CELL_SELECTOR: string = "[data-date='{date}']";

    constructor(page: Page) {
        this.page = page;
        this.locationInput = page.locator('[data-testid="destination-container"] input');
        this.calendar = page.locator('div#calendar-searchboxdatepicker');
        this.datePicker = page.locator('[data-testid="date-display-field-start"]');
        this.firstMonth = page.locator('div[data-testid="searchbox-datepicker-calendar"] > div > div:first-of-type > h3');
        this.sndMonth = page.locator('div[data-testid="searchbox-datepicker-calendar"] > div > div:last-of-type > h3');
        this.nextMonth = page.locator('div[data-testid="searchbox-datepicker-calendar"] > button:last-of-type');
        this.occupancyPopup = page.locator('[data-testid="occupancy-popup"]');
        this.ocupancySelector = page.locator('button[data-testid="occupancy-config"]');
        this.addChildren = page.locator('input#group_children ~ div:last-of-type > button:last-of-type');
        this.removeChildren = page.locator('input#group_children ~ div:last-of-type > button:first-of-type');
        this.childrenCount = page.locator('input#group_children ~ div:last-of-type > span');
        this.addAdult = page.locator('input#group_adults ~ div:last-of-type > button:last-of-type');
        this.removeAdult = page.locator('input#group_adults ~ div:last-of-type > button:first-of-type');
        this.adultCount = page.locator('input#group_adults ~ div:last-of-type > span');
        this.addRoom = page.locator('input#no_rooms ~ div:last-of-type > button:last-of-type');
        this.removeRoom = page.locator('input#no_rooms ~ div:last-of-type > button:first-of-type');
        this.roomCount = page.locator('input#no_rooms ~ div:last-of-type > span');
        this.childrenAge = page.locator("select[name='age']");
        this.doneButton = page.locator('div[data-testid="occupancy-popup"] > div ~  button');
        this.searchButton = page.locator("button[type='submit']");
    }


    async searchLocation(location: string) {
        await this.locationInput.fill(location);
    }

    async openCalendar() {
        if (!(await this.calendar.isVisible())) {
            await this.datePicker.click();
            await this.calendar.waitFor({ state: 'visible' });
        }
    }

    async selectDates(checkin: Date, checkout: Date) {
        await this.openCalendar();
        await this.selectDate(checkin);
        await this.selectDate(checkout);
    }

    async moveToMonth(date: Date) {
        let month = date.toLocaleString('es', { month: 'long' });
        while (!(await this.firstMonth.innerText()).includes(month) &&
            !(await this.sndMonth.innerText()).includes(month)) {
            await this.nextMonth.click();
        }
    }

    async selectDate(date: Date) {
        //const DATE_CELL_SELECTOR = "[data-date='{date}']";
        const dateString = date.toISOString().split('T')[0];
        const dateElement = this.page.locator(this.DATE_CELL_SELECTOR.replace("{date}", dateString));
        await this.moveToMonth(date);
        await dateElement.waitFor({ state: 'visible' });
        await dateElement.click();
    }

    async isOccupancyPopupVisible() {
        if (!(await this.occupancyPopup.isVisible())) {
            await this.ocupancySelector.click();
            await this.occupancyPopup.waitFor({ state: 'visible' });
        }
    }
    async setOccupancy(adults: number, rooms: number, ages: string[]) {
        this.isOccupancyPopupVisible();
        await this.setAdults(adults);
        await this.setRooms(rooms);
        await this.setChildren(ages);
    }

    async setAdults(adults: number) {
        await this.removeAdults();
        if (!(adults == 1)) {
            for (let i = 1; i <= (adults - 1); i++) {
                await this.addAdult.click();
            }
        }
    }

    async removeAdults() {
        if (parseInt(await this.adultCount.textContent()) > 1) {
            await this.removeAdult.click();
        }
    }

    async setRooms(roomQuantity: number) {
        await this.removeRooms();
        if (!(roomQuantity == 1)) {
            for (let i = 1; i <= (roomQuantity - 1); i++) {
                await this.addRoom.click();
            }
        }
    }

    async removeRooms() {
        if (parseInt(await this.roomCount.textContent()) > 1) {
            await this.removeRoom.click();
        }
    }

    async setChildren(age: string[]) {
        await this.removeChildrens();
        for (let i = 0; i < age.length; i++) {
            await this.addChildren.click();
            await this.childrenAge.nth(i).selectOption({ value: age[i] });
        }
        await this.doneButton.click();
    }

    async removeChildrens() {
        if (parseInt(await this.childrenCount.textContent()) > 0) {
            await this.removeChildren.click();
        }
    }

    async search() {
        await this.searchButton.click();
    }
}