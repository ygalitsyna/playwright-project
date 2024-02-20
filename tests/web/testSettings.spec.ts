import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/homePage'
import { NewsPage } from '../../pages/newsPage'
import { ChannelPage } from '../../pages/ChannelPage'
import { testRail, CurrentTest } from '@zebrunner/javascript-agent-playwright'

test.describe('Test user settings', () => {

  test('test that user is able to change the theme', async ({ page }) => {
    testRail.testCaseId("C3726")
    CurrentTest.setMaintainer('ygalitsyna')
    const homePage = new HomePage(page)
    await homePage.goto()
    const colors = {
      'Use device theme': 'rgb(255, 255, 255)',
      'Dark theme': 'rgb(15, 15, 15)',
      'Light theme': 'rgb(255, 255, 255)',
    }
    for(const color in colors){
      await homePage.clickOnSettinsButton()
      await homePage.clickOnAppearanceButton() 
      await homePage.changeTheme(color)
      await expect(homePage.headerBackground).toHaveCSS('background-color', colors[color])
    }
  })

  test('test that user is able to change language', async ({ page }) => {
    testRail.testCaseId("C3727")
    CurrentTest.setMaintainer('ygalitsyna')
    const homePage = new HomePage(page)
    await homePage.goto()
    const languages = {
      'Deutsch': ['Startseite', 'Shorts', 'Abos', 'Mein YouTube', 'Verlauf'],
      'Español (España)': ['Inicio', 'Shorts', 'Suscripciones', 'Tú', 'Historial'],
      'Français (Canada)': ['Accueil', 'Shorts', 'Abonnements', 'Vous', 'Historique'],
      'English (UK)': ['Home', 'Shorts', 'Subscriptions', 'You', 'History'],
    }
    for(const language in languages){
      await homePage.clickOnSettinsButton()
      await homePage.clickOnLanguageButton() 
      await homePage.changeLanguage(language)
      await expect(homePage.navigationBarTitles).toHaveText(languages[language])
    }
  })

  test('test that user is able to change location and it affects news section', async ({ page }) => {
    testRail.testCaseId("C3728")
    CurrentTest.setMaintainer('ygalitsyna')
    const homePage = new HomePage(page)
    const newsPage = new NewsPage(page)
    const channelPage = new ChannelPage(page)
    await homePage.goto()
    const locations = ['Argentina', 'Germany', 'France']
    for(const location of locations){
      await homePage.clickOnSettinsButton()
      await homePage.clickOnLocationButton()
      await homePage.changeLocation(location)
      await homePage.gotoNewsPage()
      await newsPage.clickOnChannel(newsPage.firstVideoChannel)
      await channelPage.clickOnChannelInfo()
      await expect(channelPage.channelCountry).toHaveText(location)
      await channelPage.closeChannelInfoDialog()
    }
  })
})
  