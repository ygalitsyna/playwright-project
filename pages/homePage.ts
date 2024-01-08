import { Page, Locator, expect } from "@playwright/test"

export class HomePage {
    readonly page: Page
    readonly dialog: Locator
    readonly acceptCookiesButton: Locator
    readonly searchBar: Locator
    readonly subscriptionsButton: Locator

    constructor(page: Page){
        this.page = page
        this.dialog = page.locator('#dialog')
        this.acceptCookiesButton = page.locator('#dialog').getByRole('button').filter({hasText: 'Accept all'})
        this.searchBar = page.getByPlaceholder('Search')
        this.subscriptionsButton = page.getByRole('link', { name: 'Subscriptions' })
    }

    async goto() {
        await this.page.goto('/')
        await this.acceptCookiesButton.click()
        await expect(this.dialog).not.toBeVisible()
        await expect(this.searchBar).toBeEditable()
    }

    async gotoSearchResultPage(){
        await this.searchBar.fill('funny cats')
        await this.searchBar.press('Enter')
        await this.page.waitForURL('/results?search_query=funny+cats')
    }

    async gotoSubscriptionstPage(){
        await this.subscriptionsButton.click()
        await this.page.waitForURL('/feed/subscriptions')
    }
}
