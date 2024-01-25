import { Page, Locator } from "@playwright/test";

export class FirstVideoPage {
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async getCurrentUrl(){
        return this.page.url()
    }
}
