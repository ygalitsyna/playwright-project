import { Page, Locator } from "@playwright/test";

export class NewsPage {
    readonly page: Page
    readonly title: Locator

    constructor(page: Page){
        this.page = page
        this.title = this.page.locator('ytd-browse[page-subtype="news"] #contentContainer #page-header')
    }
}