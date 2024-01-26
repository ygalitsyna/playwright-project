import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/homePage'
import { TrendingPage } from '../pages/trendingPage'
import { MusicPage } from '../pages/musicPage'
import { MoviesPage } from '../pages/moviesPage'
import { LivePage } from '../pages/livePage'
import { GamingPage } from '../pages/gamingPage'
import { NewsPage } from '../pages/newsPage'
import { SportsPage } from '../pages/sportsPage'
import { PodcastsPage } from '../pages/podcastsPage'
import { testRail, CurrentTest } from '@zebrunner/javascript-agent-playwright'

test('check that the explore section titles on the home page and on each section page are the same', async ({ page }) => {
  testRail.testCaseId("C3712")
  CurrentTest.setMaintainer('ygalitsyna')
  const homePage = new HomePage(page)
  const trendingPage = new TrendingPage(page)
  const musicPage = new MusicPage(page)
  const moviesPage = new MoviesPage(page)
  const livePage = new LivePage(page)
  const gamingPage = new GamingPage(page)
  const newsPage = new NewsPage(page)
  const sportsPage = new SportsPage(page)
  const podcastsPage = new PodcastsPage(page)
  await homePage.goto()
  await homePage.gotoTrendingPage()
  expect(await trendingPage.title.textContent()).toContain('Trending')
  await homePage.gotoMusicPage()
  expect(await musicPage.title.textContent()).toContain('Music')
  await homePage.gotoMoviesPage()
  expect(await moviesPage.title.textContent()).toContain('Movies')
  await homePage.gotoLivePage()
  expect(await livePage.title.textContent()).toContain('Live')
  await homePage.gotoGamingPage()
  expect(await gamingPage.title.textContent()).toContain('Gaming')
  await homePage.gotoNewsPage()
  expect(await newsPage.title.textContent()).toContain('News')
  await homePage.gotoSportsPage()
  expect(await sportsPage.title.textContent()).toContain('Sports')
  await homePage.gotoPodcastsPage()
  expect(await podcastsPage.title.textContent()).toContain('Podcasts')
})