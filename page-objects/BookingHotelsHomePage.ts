import { Locator, Page, expect } from "@playwright/test";
import { BookingHotelSearchBarPage } from "./BookingHotelsSearchBarPage";

export class BookingHotelsHomePage {
    page: Page;
    searchBar: BookingHotelSearchBarPage
    modalCloseButton: Locator
    url: string = "https://www.booking.com/index.es-ar.html";

    constructor(page: Page) {
        this.page = page;
        this.modalCloseButton = page.locator('[aria-label="No quiero iniciar sesión."]');
    }

    async go() {
        await this.page.goto(this.url, { waitUntil: 'networkidle' });
    }

    async closeModal() {
        if (await this.modalCloseButton.isVisible()) {
            await this.modalCloseButton.click();
        }
    }
}