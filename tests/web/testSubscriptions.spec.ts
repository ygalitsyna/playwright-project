import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/homePage'
import { SubscriptionsPage } from '../../pages/subscriptionsPage'
import { testRail, CurrentTest } from '@zebrunner/javascript-agent-playwright'

test('check subscriptions section for user in incognito mode', async ({ page }) => {
  testRail.testCaseId("C3710")
  CurrentTest.setMaintainer('ygalitsyna')
  const homePage = new HomePage(page)
  const subscriptionsPage = new SubscriptionsPage(page)
  await homePage.goto()
  await homePage.gotoSubscriptionstPage()
  expect(await subscriptionsPage.title.textContent()).toEqual('Don\’t miss new videos')
  expect(await subscriptionsPage.message.textContent()).toEqual('Sign in to see updates from your favorite YouTube channels')
})