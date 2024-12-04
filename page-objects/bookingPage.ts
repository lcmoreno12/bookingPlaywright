import { Locator, Page, expect } from "@playwright/test";

export class BookingPage {
    page: Page;
    locationInput: Locator
    datePicker: Locator
    //checkInDatePicker: Locator
    //checkOutDatePicker: Locator
    ocupancySelector: Locator
    addChildren: Locator
    childrenAge: Locator
    doneButton: Locator
    searchButton: Locator
    modalCloseButton: Locator
    textResult: Locator

    checkInOutDateBaseXpath = "[data-date='";

    constructor(page: Page) {
        this.page = page;
        this.locationInput = page.locator('[data-testid="destination-container"] input');
        this.datePicker = page.locator('[data-testid="date-display-field-start"]');
        //this.checkInDatePicker = page.locator('[data-date="2024-12-12"]');
        //this.checkOutDatePicker = page.locator('[data-date="2024-12-19"]');
        this.ocupancySelector = page.locator('button[data-testid="occupancy-config"]');
        this.addChildren = page.locator('input#group_children ~ div:last-of-type > button:last-of-type');
        this.childrenAge = page.locator("select[name='age']");
        this.doneButton = page.locator('div[data-testid="occupancy-popup"] > div ~  button');
        this.searchButton = page.locator("button[type='submit']");
        this.modalCloseButton = page.locator('[aria-label="No quiero iniciar sesión."]');
        this.textResult = page.locator("div h1");
    }

    async navigateTo(page: string) {
        await this.page.goto(page, { waitUntil: 'networkidle' });
    }

    async searchLocation(location: string) {
        await this.locationInput.fill(location);
    }

    async selectDates(checkin: Date, checkout: Date) {
        await this.datePicker.click();
        await this.selectDate(checkin, checkout);
    }

    async selectDate(checkin: Date, checkout: Date) {
        const checkinString = checkin.toISOString().split('T')[0];
        const checkoutString = checkout.toISOString().split('T')[0];
        const checkInSelector = this.checkInOutDateBaseXpath + checkinString + "']";
        const checkOutSelector = this.checkInOutDateBaseXpath + checkoutString + "']";

        const checkInElement = this.page.locator(checkInSelector);
        const checkOutElement = this.page.locator(checkOutSelector);

        await checkInElement.waitFor({ state: 'visible' });
        await checkInElement.click();

        await checkOutElement.waitFor({ state: 'visible' });
        await checkOutElement.click();
    }


    async addChildrenOcupancy(age: string) {
        await this.ocupancySelector.click();
        await this.addChildren.click();
        await this.childrenAge.selectOption({ value: age });
        await this.doneButton.click();
    }

    async validateSearchResult(expectedResult: string) {
        await expect(this.textResult).toContainText(expectedResult + ": ");
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