import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/homePage'
import { testRail, CurrentTest } from '@zebrunner/javascript-agent-playwright'
import { FirstVideoPage } from '../../pages/firstVideoPage'
import { ChannelPage } from '../../pages/ChannelPage'

test.describe('Test correct link redirection for the first video on Home Page', () => {

    test('test that clicking on video thumbnail opens the related video', async ({ page }) => {
        testRail.testCaseId("C3722")
        CurrentTest.setMaintainer('ygalitsyna')
        const homePage = new HomePage(page)
        const firstVideoPage = new FirstVideoPage(page)
        await homePage.goto()
        const videoHrefAttr = await homePage.firstVideoThumbnail.getAttribute('href')
        await homePage.clickOnVideo(homePage.firstVideoThumbnail)
        const currentUrl = await firstVideoPage.getCurrentUrl()
        expect(currentUrl).toEqual(`https://www.youtube.com${videoHrefAttr}`)
    })

    test('test that clicking on video title opens the related video', async ({ page }) => {
        testRail.testCaseId("C3723")
        CurrentTest.setMaintainer('ygalitsyna')
        const homePage = new HomePage(page)
        const firstVideoPage = new FirstVideoPage(page)
        await homePage.goto()
        const videoHrefAttr = await homePage.firstVideoTitle.getAttribute('href')
        await homePage.clickOnVideo(homePage.firstVideoTitle)
        const currentUrl = await firstVideoPage.getCurrentUrl()
        expect(currentUrl).toEqual(`https://www.youtube.com${videoHrefAttr}`)
    })

    test('test that clicking on video channel name opens the related Channel Page', async ({ page }) => {
        testRail.testCaseId("C3724")
        CurrentTest.setMaintainer('ygalitsyna')
        const homePage = new HomePage(page)
        const channelPage = new ChannelPage(page)
        await homePage.goto()
        const channelHrefAttr = await homePage.firstVideoChannelName.getAttribute('href')
        await homePage.clickOnChannel(homePage.firstVideoChannelName)
        const currentUrl = await channelPage.getCurrentUrl()
        expect(currentUrl).toEqual(`https://www.youtube.com${channelHrefAttr}`)
    })

    test('test that clicking on video channel avatar opens the related Channel Page', async ({ page }) => {
        testRail.testCaseId("C3725")
        CurrentTest.setMaintainer('ygalitsyna')
        const homePage = new HomePage(page)
        const channelPage = new ChannelPage(page)
        await homePage.goto()
        const channelHrefAttr = await homePage.firstVideoChannelAvatar.getAttribute('href')
        await homePage.clickOnChannel(homePage.firstVideoChannelAvatar)
        const currentUrl = await channelPage.getCurrentUrl()
        expect(currentUrl).toEqual(`https://www.youtube.com${channelHrefAttr}`)
    })
})
