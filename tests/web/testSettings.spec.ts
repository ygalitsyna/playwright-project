import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/homePage'
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
        await homePage.changeThemeByName(color)
        await expect(homePage.headerBackground).toHaveCSS('background-color', colors[color])
      }
    })
})
  