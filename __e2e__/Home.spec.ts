import { test, expect, Page, Browser, BrowserServer } from '@playwright/test'

const URL_TEST = 'https://anime-app-eight.vercel.app'

// test.describe.configure({ mode: 'serial' })

test.describe('Homepage', () => {
  let page: Page
  test.beforeAll(async ({ browser }: any) => {
    page = await browser.newPage()
  })
  // test.slow()
  test('should visiting an anime from the main page and show the data correctly', async () => {
    await page.goto('http://localhost:3000/')

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Wiki Anime/i)

    const goToAnime = 'Fullmetal Alchemist: Brotherhood'

    // Click img[alt="Fullmetal Alchemist\: Brotherhood"]
    await page.locator(`img[alt="${goToAnime}"]`).click()
    await expect(page).toHaveURL('http://localhost:3000/anime/5114')
    // Click text=After a horrific alchemy experiment goes wrong in the Elric household, brothers
    await expect(page).toHaveTitle(goToAnime)

    await expect(page.locator('h1')).toContainText(
      'Fullmetal Alchemist: Brotherhood'
    )
  })

  test('should visiting an manga from the main page and show the data correctly', async () => {
    // Go to http://localhost:3000/
    await page.goto('http://localhost:3000/')
    await expect(page).toHaveTitle(/Wiki Anime/)
    // Click img[alt="Berserk"]
    await page.locator('img[alt="Berserk"]').click()
    await expect(page).toHaveURL('http://localhost:3000/manga/2')
    // Click h1:has-text("Berserk")
    await page.locator('h1:has-text("Berserk")').click()
    // Click text=All characters(75)
    await page.locator('text=All characters(75)').click()
    // Click text=Wiki Anime
    await page.locator('text=Wiki Anime').click()
    await expect(page).toHaveURL('http://localhost:3000/')
  })

  test('should be applied filters and search correctly the data from the home page', async () => {
    // Go to http://localhost:3000/
    await page.goto('http://localhost:3000/')

    // Select manga
    await page
      .locator('text=Typeanimemanga >> select[name="type"]')
      .selectOption('manga')

    // Select 1
    await page.locator('select[name="genres"]').selectOption('1')

    // Select manga
    await page.locator('select[name="subType"]').selectOption('manga')

    // Click input[name="max_score"]
    await page.locator('input[name="max_score"]').click()

    // Fill input[name="max_score"]
    await page.locator('input[name="max_score"]').fill('10')

    // Click input[name="min_score"]
    await page.locator('input[name="min_score"]').click()

    // Fill input[name="min_score"]
    await page.locator('input[name="min_score"]').fill('9')

    // Click input[name="letter"]
    await page.locator('input[name="letter"]').click()

    // Fill input[name="letter"]
    await page.locator('input[name="letter"]').fill('bers')

    // Click text=Apply filters
    await page.locator('text=Apply filters').click()
    await expect(page).toHaveURL(
      'http://localhost:3000/manga/filter?genres=1&subType=manga&order_by=members&sort=asc&max_score=10&min_score=9&letter=bers'
    )

    // Click img[alt="Berserk"]
    await page.locator('img[alt="Berserk"]').click()
    await expect(page).toHaveURL('http://localhost:3000/manga/2')

    // Click h1:has-text("Berserk")
    await page.locator('h1:has-text("Berserk")').click()
  })
})
