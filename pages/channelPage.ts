import { Page, Locator } from "@playwright/test";

export class ChannelPage {
    readonly page: Page
    readonly channelInfo: Locator
    readonly channelCountry: Locator
    readonly closeChannelInfoDialogButton: Locator

    constructor(page: Page){
        this.page = page
        this.channelInfo = this.page.locator('#channel-tagline')
        this.channelCountry = this.page.locator('#additional-info-container table tbody tr').last()
        this.closeChannelInfoDialogButton = this.page.locator('tp-yt-paper-dialog #visibility-button')
    }

    async getCurrentUrl(){
        return this.page.url()
    }
    
    async clickOnChannelInfo(){
        await this.channelInfo.click()
    }

    async closeChannelInfoDialog(){
        await this.closeChannelInfoDialogButton.click()
    }
}
