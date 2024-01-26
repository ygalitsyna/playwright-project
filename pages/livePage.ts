import { Page, Locator } from "@playwright/test";

export class LivePage {
    readonly page: Page
    readonly title: Locator

    constructor(page: Page){
        this.page = page
        this.title = this.page.locator('ytd-browse[page-subtype="live"] #contentContainer #page-header')
    }
}