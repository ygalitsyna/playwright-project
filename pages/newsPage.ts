import { Page, Locator } from "@playwright/test";

export class NewsPage {
    readonly page: Page
    readonly title: Locator
    readonly firstVideoChannel: Locator

    constructor(page: Page){
        this.page = page
        this.title = this.page.locator('ytd-browse[page-subtype="news"] #contentContainer #page-header')
        this.firstVideoChannel = this.page.locator('ytd-browse[page-subtype="news"] #content #channel-name #container').first()
    }

    async clickOnChannel(locator: Locator){
        await locator.click()
        await this.page.waitForURL('/@*')
    }
}