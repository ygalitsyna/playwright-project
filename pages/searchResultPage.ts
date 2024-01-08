import { Page, Locator, expect } from "@playwright/test";

export class SearchResultPage {
    readonly page: Page
    readonly firstVideo: Locator
    readonly secondVideo: Locator
    readonly firstVideoTitle: Locator
    readonly secondVideoTitle: Locator
    readonly firstVideoChannel: Locator
    readonly secondVideoChannel: Locator
    readonly firstVideoDescription: Locator
    readonly secondVideoDescription: Locator
    readonly firstVideoImage: Locator
    readonly secondVideoImage: Locator

    constructor(page: Page){
        this.page = page
        this.firstVideo = page.locator('#contents ytd-video-renderer').first()
        this.secondVideo = page.locator('#contents ytd-video-renderer').nth(1)
        this.firstVideoTitle = this.firstVideo.locator('#video-title')
        this.secondVideoTitle = this.secondVideo.locator('#video-title')
        this.firstVideoChannel = this.firstVideo.locator('#channel-info')
        this.secondVideoChannel = this.secondVideo.locator('#channel-info')
        this.firstVideoDescription = this.firstVideo.locator('.metadata-snippet-container')
        this.secondVideoDescription = this.secondVideo.locator('.metadata-snippet-container')
        this.firstVideoImage = this.firstVideo.locator('a yt-image img')
        this.secondVideoImage = this.secondVideo.locator('a yt-image img')
    }
}
