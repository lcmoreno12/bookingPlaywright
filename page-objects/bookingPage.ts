import { Locator, Page, expect } from "@playwright/test";

export class BookingPage {
    page: Page;
    locationInput: Locator
    datePicker: Locator
    checkInDatePicker: Locator
    checkOutDatePicker: Locator
    ocupancySelector: Locator
    addChildren: Locator
    childrenAge: Locator
    doneButton: Locator
    modalCloseButton: Locator
    textResult: Locator

    constructor(page: Page) {
        this.page = page;
        this.locationInput = page.locator('.eb46370fe1');
        this.datePicker = page.locator('.f73e6603bf');
        this.checkInDatePicker = page.locator('[data-date="2024-11-12"]');
        this.checkOutDatePicker = page.locator('[data-date="2024-11-19"]');
        this.ocupancySelector = page.locator('button[data-testid="occupancy-config"]');
        this.addChildren = page.locator('input#group_children ~ div:last-of-type > button:last-of-type');
        this.childrenAge = page.locator("select[name='age']");
        this.doneButton = page.locator('.c213355c26');
        this.modalCloseButton = page.locator('[aria-label="No quiero iniciar sesión."]');
        this.textResult = page.locator(".d5f78961c3");
    }

    async navigateTo(page: string) {
        await this.page.goto(page, { waitUntil: 'networkidle' });
    }

    async searchLocation(location: string) {
        await this.locationInput.fill(location);
    }

    async selectDate() {
        await this.datePicker.click();

        await this.checkInDatePicker.waitFor({ state: 'visible' });
        await this.checkInDatePicker.click();

        await this.checkOutDatePicker.waitFor({ state: 'visible' });
        await this.checkOutDatePicker.click();
    }

    async addChildrenOcupancy(age: string) {
        await this.ocupancySelector.click();
        await this.addChildren.click();
        await this.childrenAge.selectOption({ value: age });
        await this.doneButton.click();
    }

    async verifyResult(expectedResult: string) {
        await expect(this.textResult).toContainText(expectedResult);
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