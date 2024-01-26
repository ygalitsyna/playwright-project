import { Page, Locator } from "@playwright/test";

export class PodcastsPage {
    readonly page: Page
    readonly title: Locator

    constructor(page: Page){
        this.page = page
        this.title = this.page.locator('ytd-browse[role="main"] #contentContainer #page-header')
    }
}