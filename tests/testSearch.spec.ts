import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchResultPage } from '../pages/searchResultPage';

test('check inequality of the first videos on the youtube page', async ({page}) => {
  const homePage = new HomePage(page)
  const searchResultPage = new SearchResultPage(page)
  await homePage.goto()
  await homePage.gotoSearchResultPage()
  await searchResultPage.firstVideo.scrollIntoViewIfNeeded()
  expect(await searchResultPage.firstVideoTitle.textContent()).not.toEqual(await searchResultPage.secondVideoTitle.textContent())
  expect(await searchResultPage.firstVideoChannel.textContent()).not.toEqual(await searchResultPage.secondVideoChannel.textContent())
  expect(await searchResultPage.firstVideoDescription.textContent()).not.toEqual(await searchResultPage.secondVideoDescription.textContent())
  await searchResultPage.secondVideoImage.scrollIntoViewIfNeeded()
  expect(await searchResultPage.firstVideoImage.getAttribute('src')).not.toEqual(await searchResultPage.secondVideoImage.getAttribute('src'))
})
