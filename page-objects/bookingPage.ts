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
        this.modalCloseButton = page.locator('[aria-label="No quiero iniciar sesión."]');
        this.textResult = page.locator("div h1");
    }

    async navigateTo(page: string) {
        await this.page.goto(page, { waitUntil: 'networkidle' });
    }

    async searchLocation(location: string) {
        await this.locationInput.fill(location);
    }

    async selectDate(checkin: string, checkout: string) {
        await this.datePicker.click();

        const checkInSelector = this.checkInOutDateBaseXpath + checkin + "']";
        const checkOutSelector = this.checkInOutDateBaseXpath + checkout + "']";
    
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

    async verifyResult(expectedResult: string) {
        await expect(this.textResult).toContainText(expectedResult + ": ");
    }

    async search() {
        await this.page.locator(".b9fd3c6b3c").click();
    }

    async closeModal() {
        if (await this.modalCloseButton.isVisible()) {
            await this.modalCloseButton.click();
        }
    }
}