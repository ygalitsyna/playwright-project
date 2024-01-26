import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/homePage'
import { SearchResultPage } from '../../pages/searchResultPage'
import { testRail, CurrentTest } from '@zebrunner/javascript-agent-playwright'

test.describe('Test video filtering and sorting option while searching for a video', () => {

  test('test video sorting by view count', async ({ page }) => {
    testRail.testCaseId("C3717")
    CurrentTest.setMaintainer('ygalitsyna')
    const homePage = new HomePage(page)
    const searchResultPage = new SearchResultPage(page)
    await homePage.goto()
    await homePage.gotoSearchResultPage()
    await searchResultPage.sortVideoByViewCount()
    const viewsCountList = await searchResultPage.getAllviewsCount()
    const sortedViewsCountList = [...viewsCountList].sort((a, b) => b - a)
    expect(viewsCountList).toEqual(sortedViewsCountList)
  })

  test('test video sorting by Today upload date', async ({ page }) => {
    testRail.testCaseId("C3718")
    CurrentTest.setMaintainer('ygalitsyna')
    const homePage = new HomePage(page)
    const searchResultPage = new SearchResultPage(page)
    await homePage.goto()
    await homePage.gotoSearchResultPage()
    await searchResultPage.sortVideoByTodayUploadDate()
    const timesList = await searchResultPage.getAllTimes()
    timesList.forEach(x => expect(x).toBeLessThanOrEqual(24))
  })

  test('test video filtering using one of the following features: Live, 4K, Subtitles/CC, 360°, 3D', async ({ page }) => {
    testRail.testCaseId("C3719")
    CurrentTest.setMaintainer('ygalitsyna')
    const homePage = new HomePage(page)
    const searchResultPage = new SearchResultPage(page)
    await homePage.goto()
    await homePage.gotoSearchResultPage()
    const feature = await searchResultPage.sortVideoByFeature('Live')
    const allVideoCount = await searchResultPage.getAllVideoCount()
    const videoWithSpecifiedTagCount = await searchResultPage.getAllVideoWithSpecifiedTag(feature)
    expect(videoWithSpecifiedTagCount).toEqual(allVideoCount)
  })

  test('test video filtering by Duration 4-20 minutes', async ({ page }) => {
    testRail.testCaseId("C3720")
    CurrentTest.setMaintainer('ygalitsyna')
    const homePage = new HomePage(page)
    const searchResultPage = new SearchResultPage(page)
    await homePage.goto()
    await homePage.gotoSearchResultPage()
    await searchResultPage.sortVideoByDuration()
    const durationsList = await searchResultPage.getAllVideoDuration()
    durationsList.forEach(x => expect(x).toBeGreaterThanOrEqual(4))
    durationsList.forEach(x => expect(x).toBeLessThanOrEqual(19))
  })

  test('test video filtering by Type Playlist', async ({ page }) => {
    testRail.testCaseId("C3721")
    CurrentTest.setMaintainer('ygalitsyna')
    const homePage = new HomePage(page)
    const searchResultPage = new SearchResultPage(page)
    await homePage.goto()
    await homePage.gotoSearchResultPage()
    await searchResultPage.sortVideoByPlaylistType()
    const allVideoCount = await searchResultPage.getAllPlaylistCount()
    const playlistCount = await searchResultPage.getAllVideoPlaylistType()
    expect(playlistCount).toEqual(allVideoCount)
  })
})
