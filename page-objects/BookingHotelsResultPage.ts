import { Locator, Page, expect } from "@playwright/test";
import { BookingHotelsHomePage } from "./BookingHotelsHomePage";

export class BookingHotelsResultPage extends BookingHotelsHomePage{
    page: Page;
    textResult: Locator

    constructor(page: Page) {
        super(page);
        this.textResult = page.locator("div h1");
    }

    async bookingHotelsHomePage() {
        await this.page.goto("https://www.booking.com/index.es-ar.html", { waitUntil: 'networkidle' });
    }

    async validateSearchResult(expectedResult: string) {
        await expect(this.textResult).toContainText(expectedResult + ": ");
    }
}