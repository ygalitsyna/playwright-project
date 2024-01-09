import { Page, Locator } from "@playwright/test";

export class MusicPage {
    readonly page: Page
    readonly title: Locator

    constructor(page: Page){
        this.page = page
        this.title = this.page.locator('#header #title')
    }
}