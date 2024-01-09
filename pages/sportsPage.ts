import { Page, Locator } from "@playwright/test";

export class SportsPage {
    readonly page: Page
    readonly title: Locator

    constructor(page: Page){
        this.page = page
        this.title = this.page.locator('#header h1 #title')
    }
}