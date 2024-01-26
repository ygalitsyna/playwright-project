import { defineConfig, devices } from '@playwright/test'
import 'dotenv/config'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    [
      '@zebrunner/javascript-agent-playwright',
      {
        enabled: true,
        projectKey: 'YANA',
        server: {
          hostname: 'https://solvdinternal.zebrunner.com',
          accessToken: process.env.ZEBRUNNER_ACCESS_TOKEN
        },
        launch: {
          displayName: "Playwright launch",
          build: '1.0.0',
          environment: 'All browsers'
        },
        milestone: {
          id: null,
          name: null
        },
        notifications: {
          notifyOnEachFailure: false,
          emails: 'ygalitsyna@solvd.com'
        },
        tcm: {
          testCaseStatus: {
            onPass: 'SUCCESS',
            onFail: 'FAILED',
          },
          testRail: {
            pushResults: true,
            pushInRealTime: false,
            suiteId: 210,
            runId: 827,
            includeAllTestCasesInNewRun: true,
            runName: 'Test Run',
            assignee: 'ygalitsyna@solvd.com'
          },
        },
        pwConcurrentTasks: 10
      },
    ],
    ['html'],
  ],
  use: {
    baseURL: 'https://www.youtube.com',
    trace: 'on-first-retry',
    viewport: { width: 1920, height: 1080 },
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'api',
      testMatch: 'api/*.spec.ts',
    },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: 'web/*.spec.ts',
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: 'web/*.spec.ts',
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testMatch: 'web/*.spec.ts',
    },
  ],
});
