import { test, expect, request } from '@playwright/test'
import apiSearchIncognito from '../../test-data/apiSearchIncognito.json'
import { testRail, CurrentTest } from '@zebrunner/javascript-agent-playwright'

test('check number of downloaded videos on search request using API', async ({request}) => {
    testRail.testCaseId("C3714")
    CurrentTest.setMaintainer('ygalitsyna')
    const response = await request.post('/youtubei/v1/search?*', {
        data: JSON.stringify(apiSearchIncognito)
    })
    expect(response.status()).toEqual(200)
    const responseBody = await response.json()
    const videoRenderersList = responseBody.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents.filter( render => render.videoRenderer)
    expect(videoRenderersList.length).toEqual(20)
})