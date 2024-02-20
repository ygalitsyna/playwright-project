import { Page, Locator, expect } from "@playwright/test"

export class HomePage {
    readonly page: Page
    readonly dialog: Locator
    readonly acceptCookiesButton: Locator
    readonly searchBar: Locator
    readonly subscriptionsButton: Locator
    readonly menuButton: Locator
    readonly trendingButton: Locator
    readonly musicButton: Locator
    readonly moviesButton: Locator
    readonly liveButton: Locator
    readonly gamingButton: Locator
    readonly newsButton: Locator
    readonly sportsButton: Locator
    readonly podcastsButton: Locator
    readonly firstVideoThumbnail: Locator
    readonly firstVideoTitle: Locator
    readonly firstVideoChannelName: Locator
    readonly firstVideoChannelAvatar: Locator
    readonly settingsButton: Locator
    readonly appearanceButton: Locator
    readonly themeOptions: Locator
    readonly header: Locator
    readonly headerBackground: Locator
    readonly languageButton: Locator
    readonly languageOptions: Locator
    readonly navigationBar: Locator
    readonly navigationBarTitles: Locator
    readonly locationButton: Locator
    readonly locationOptions: Locator

    constructor(page: Page){
        this.page = page
        this.dialog = page.locator('#dialog')
        this.acceptCookiesButton = page.locator('#dialog').getByRole('button').filter({hasText: 'Accept all'})
        this.searchBar = page.getByPlaceholder('Search')
        this.subscriptionsButton = page.getByRole('link', { name: 'Subscriptions' })
        this.menuButton = page.getByRole('button', { name: 'Guide', exact:true })
        this.trendingButton = page.locator('#sections').getByRole('link', { name: 'Trending' })
        this.musicButton = page.getByRole('link', { name: 'Music' }).first()
        this.moviesButton = page.getByRole('link', { name: 'Movies' }).first()
        this.liveButton = page.getByRole('link', { name: 'Live' }).first()
        this.gamingButton = page.getByRole('link', { name: 'Gaming' }).first()
        this.newsButton = page.getByRole('link', { name: 'News' }).first()
        this.sportsButton = page.getByRole('link', { name: 'Sports' }).first()
        this.podcastsButton = page.getByRole('link', { name: 'Podcasts' }).first()
        this.firstVideoThumbnail = page.locator('ytd-rich-grid-media ytd-thumbnail #thumbnail').first()
        this.firstVideoTitle = page.locator('#video-title-link').first()
        this.firstVideoChannelName = page.locator('ytd-rich-grid-media #channel-name a').first()
        this.firstVideoChannelAvatar = page.locator('#avatar-link').first()
        this.header = page.locator('ytd-masthead#masthead')
        this.settingsButton = this.header.locator('ytd-topbar-menu-button-renderer')
        this.appearanceButton = page.locator('ytd-toggle-theme-compact-link-renderer #label')
        this.themeOptions = page.locator('#submenu ytd-compact-link-renderer').filter({hasText: 'theme'})
        this.headerBackground = this.header.locator('#background')
        this.languageButton = page.locator('ytd-compact-link-renderer #label').nth(1)
        this.languageOptions = page.locator('#submenu ytd-compact-link-renderer')
        this.navigationBar = page.locator('ytd-mini-guide-renderer')
        this.navigationBarTitles = this.navigationBar.locator('#items ytd-mini-guide-entry-renderer span')
        this.locationButton = page.locator('ytd-compact-link-renderer #label').filter({hasText: 'Location'})
        this.locationOptions = page.locator('#submenu ytd-compact-link-renderer')
    }

    async goto() {
        await this.page.goto('/')
        await this.acceptCookiesButton.click()
        await expect(this.dialog).not.toBeVisible()
        await this.page.waitForLoadState('domcontentloaded')
    }

    async gotoSearchResultPage(){
        await this.searchBar.pressSequentially('funny cats')
        await this.searchBar.press('Enter')
        await this.page.waitForURL('/results?search_query=funny+cats')
    }

    async gotoSubscriptionstPage(){
        await this.subscriptionsButton.click()
        await this.page.waitForURL('/feed/subscriptions')
    }

    async gotoTrendingPage(){
        await this.page.waitForSelector('#contents ytd-thumbnail')
        await this.menuButton.click()
        await this.trendingButton.click()
        await this.page.waitForURL('/feed/trending*')
    }

    async gotoMusicPage(){
        await this.menuButton.click()
        await expect(this.musicButton).toBeEnabled()
        await this.musicButton.click()
        await this.page.waitForURL('/channel/*')
    }

    async gotoMoviesPage(){
        await this.menuButton.click()
        await expect(this.moviesButton).toBeEnabled()
        await this.moviesButton.click()
        await this.page.waitForURL('/feed/storefront*')
    }

    async gotoLivePage(){
        await this.menuButton.click()
        await expect(this.liveButton).toBeEnabled()
        await this.liveButton.click()
        await this.page.waitForURL('/channel/*')
    }

    async gotoGamingPage(){
        await this.menuButton.click()
        await expect(this.gamingButton).toBeEnabled()
        await this.gamingButton.click()
        await this.page.waitForURL('/gaming*')
    }

    async gotoNewsPage(){
        await this.menuButton.click()
        await expect(this.newsButton).toBeEnabled()
        await this.newsButton.click()
        await this.page.waitForURL('/channel/*')
    }

    async gotoSportsPage(){
        await this.menuButton.click()
        await expect(this.sportsButton).toBeEnabled()
        await this.sportsButton.click()
        await this.page.waitForURL('/channel/*')
    }

    async gotoPodcastsPage(){
        await this.menuButton.click()
        await expect(this.podcastsButton).toBeEnabled()
        await this.podcastsButton.click()
        await this.page.waitForURL('/podcasts*')
    }

    async clickOnVideo(locator: Locator){
        await locator.click()
        await this.page.waitForURL('/watch?v=*')
    }

    async clickOnChannel(locator: Locator){
        await locator.click()
        await this.page.waitForURL('/@*')
    }

    async clickOnSettinsButton(){
        await this.settingsButton.click();
    }

    async clickOnAppearanceButton(){
        await this.appearanceButton.click();
    }

    async changeTheme(theme: string){
        await this.themeOptions.filter({hasText: `${theme}`}).click();
    }

    async clickOnLanguageButton(){
        await this.languageButton.click();
    }

    async changeLanguage(language: string){
        await this.languageOptions.filter({hasText: `${language}`}).click()
    }

    async clickOnLocationButton(){
        await this.locationButton.click();
    }

    async changeLocation(location: string){
        await this.locationOptions.filter({hasText: `${location}`}).click()
        await this.page.waitForSelector('#contents ytd-thumbnail')
    }
}
