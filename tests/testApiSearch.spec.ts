import { test, expect, request } from '@playwright/test'
import apiSearchIncognito from '../test-data/apiSearchIncognito.json'
import { testRail, CurrentTest } from '@zebrunner/javascript-agent-playwright'

test('check inequality of the first videos on the youtube page using API', async ({request}) => {
    testRail.testCaseId("C3713")
    CurrentTest.setMaintainer('ygalitsyna')
    const response = await request.post('/youtubei/v1/search?*', {
        data: JSON.stringify(apiSearchIncognito)
    })
    expect(response.status()).toEqual(200)
    const responseBody = await response.json()
    const videoRenderersList = responseBody.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents.filter( render => render.videoRenderer)
    expect(videoRenderersList[0].videoRenderer.title.runs[0].text).not.toEqual(videoRenderersList[1].videoRenderer.title.runs[0].text)
    expect(videoRenderersList[0].videoRenderer.longBylineText.runs[0].text).not.toEqual(videoRenderersList[1].videoRenderer.longBylineText.runs[0].text)
    expect(videoRenderersList[0].videoRenderer.detailedMetadataSnippets[0].snippetText.runs[0].text).not.toEqual(videoRenderersList[1].videoRenderer.detailedMetadataSnippets[0].snippetText.runs[0].text)
    expect(videoRenderersList[0].videoRenderer.thumbnail.thumbnails[0].url).not.toEqual(videoRenderersList[1].videoRenderer.thumbnail.thumbnails[0].url)
})