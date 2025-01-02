import { Locator, Page, expect } from "@playwright/test";

export class BookingHotelsResultPage{
    page: Page;
    textResult: Locator

    constructor(page: Page) {
        this.page = page;
        this.textResult = page.locator("div h1");
    }

    async validateSearchResult(expectedResult: string) {
        await this.textResult.waitFor({ state: 'visible' });
        await expect(this.textResult).toContainText(expectedResult + ": ");
    }
}