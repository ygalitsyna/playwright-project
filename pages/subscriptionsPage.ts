import { Page, Locator, expect } from "@playwright/test";

export class SubscriptionsPage {
    readonly page: Page
    readonly title: Locator
    readonly message: Locator

    constructor(page: Page){
        this.page = page
        this.title = this.page.locator('.promo-title')
        this.message = this.page.locator('.promo-body-text')
    }
}