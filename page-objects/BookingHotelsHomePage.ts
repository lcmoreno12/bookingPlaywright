import { Locator, Page, expect } from "@playwright/test";

export class BookingHotelsHomePage {
    page: Page;
    locationInput: Locator
    datePicker: Locator
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
    modalCloseButton: Locator
    url: string = "https://www.booking.com/index.es-ar.html";

    constructor(page: Page) {
        this.page = page;
        this.locationInput = page.locator('[data-testid="destination-container"] input');
        this.datePicker = page.locator('[data-testid="date-display-field-start"]');
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
        this.modalCloseButton = page.locator('[aria-label="No quiero iniciar sesión."]');

    }

    async go() {
        await this.page.goto(this.url, { waitUntil: 'networkidle' });
    }

    async searchLocation(location: string) {
        await this.locationInput.fill(location);
    }

    async selectDates(checkin: Date, checkout: Date) {
        await this.datePicker.click();
        await this.selectDate(checkin);
        await this.selectDate(checkout);
    }

    async selectDate(date: Date) {
        const DATE_CELL_SELECTOR = "[data-date='{date}']";
        //let month = date.toLocaleString('es', { month: 'long' });
        const dateString = date.toISOString().split('T')[0];
        const dateElement = this.page.locator(DATE_CELL_SELECTOR.replace("{date}", dateString));
        await dateElement.waitFor({ state: 'visible' });
        await dateElement.click();
    }

    async setOccupancy(adults: number, rooms: number, childrens: number, ages: string[]) {
        await this.ocupancySelector.click();
        await this.setAdults(adults);
        await this.setRooms(rooms);
        await this.setChildren(childrens, ages);
    }

    async setAdults(adults: number) {
        await this.removeAdults();
        if (adults == 1) {

        } else {
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
        if (roomQuantity == 1) { } else {
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

    async setChildren(childrenQuantity: number, age: string[]) {
        await this.removeChildrens();
        for (let i = 0; i < childrenQuantity; i++) {
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

    async closeModal() {
        if (await this.modalCloseButton.isVisible()) {
            await this.modalCloseButton.click();
        }
    }
}