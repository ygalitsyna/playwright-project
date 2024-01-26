import { test, expect, request } from '@playwright/test'
import apiSearchIncognito from '../test-data/apiSearchIncognito.json'
import { testRail, CurrentTest } from '@zebrunner/javascript-agent-playwright'

test.describe(() => {
    test('check number of downloaded shorts on search request using API', async ({request}) => {
        testRail.testCaseId("C3715")
        CurrentTest.setMaintainer('ygalitsyna')
        const response = await request.post('/youtubei/v1/search?*', {
            data: JSON.stringify(apiSearchIncognito)
        })
        expect(response.status()).toEqual(200)
        const responseBody = await response.json()
        const reelShelfRendererList = responseBody.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents.filter(render => render.reelShelfRenderer)
        expect(reelShelfRendererList.length).toBeGreaterThanOrEqual(2)
        expect(reelShelfRendererList[0].reelShelfRenderer.items.length).toEqual(40)
        expect(reelShelfRendererList[1].reelShelfRenderer.items.length).toEqual(10)
    })
    
    test('check inequality of the first two shorts on the youtube page using API', async ({request}) => {
        testRail.testCaseId("C3716")
        CurrentTest.setMaintainer('ygalitsyna')
        const response = await request.post('/youtubei/v1/search?*', {
            data: JSON.stringify(apiSearchIncognito)
        })
        expect(response.status()).toEqual(200)
        const responseBody = await response.json()
        const firstReelShelfRendererList = responseBody.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents.filter(render => render.reelShelfRenderer)[0].reelShelfRenderer
        expect(firstReelShelfRendererList.items[0].reelItemRenderer.videoId).not.toEqual(firstReelShelfRendererList.items[1].reelItemRenderer.videoId)
        expect(firstReelShelfRendererList.items[0].reelItemRenderer.headline.simpleText).not.toEqual(firstReelShelfRendererList.items[1].reelItemRenderer.headline.simpleText)
        expect(firstReelShelfRendererList.items[0].reelItemRenderer.thumbnail.thumbnails[0].url).not.toEqual(firstReelShelfRendererList.items[1].reelItemRenderer.thumbnail.thumbnails[0].url)
    })
})
