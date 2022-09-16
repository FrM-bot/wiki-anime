import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should visiting an anime from the main page and show the data correctly', async ({
    page
  }) => {
    await page.goto('http://localhost:3000')

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Wiki Anime/)

    // Click img[alt="Fullmetal Alchemist\: Brotherhood"]
    await page.locator('img[alt="Fullmetal Alchemist: Brotherhood"]').click()
    await expect(page).toHaveURL('http://localhost:3000/anime/5114')
    // Click text=After a horrific alchemy experiment goes wrong in the Elric household, brothers
    await expect(page).toHaveTitle(/Fullmetal Alchemist: Brotherhood/)

    await expect(page.locator('h1')).toContainText(
      'Fullmetal Alchemist: Brotherhood'
    )
  })

  test('should visiting an manga from the main page and show the data correctly', async ({
    page
  }) => {
    // Go to http://localhost:3000/
    await page.goto('http://localhost:3000')
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

  test('should be applied filters and search correctly the data from the home page', async ({ page }) => {
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
      'http://localhost:3000/manga/filter?genres=1&subType=manga&order_by=score&sort=desc&max_score=10&min_score=9&letter=bers'
    )

    // Click img[alt="Berserk"]
    await page.locator('img[alt="Berserk"]').click()
    await expect(page).toHaveURL('http://localhost:3000/manga/2')

    // Click h1:has-text("Berserk")
    await page.locator('h1:has-text("Berserk")').click()
  })
  //   const navComponent = page.locator('text=Wiki Anime')

  //   await expect(navComponent).toBeVisible()

  //   await navComponent.click()
  //   await page.goto('http://localhost:3000/')

  //   await expect(page).toHaveURL('http://localhost:3000/')
  // Click img[alt="Berserk"]
  //   await page.locator('img[alt="Berserk"]').click()
  //   await expect(page).toHaveURL('http://localhost:3000/manga/2')
  // Go to http://localhost:3000/
  //   // Select manga
  //   await page
  //     .locator('text=Typeanimemanga >> select[name="type"]')
  //     .selectOption('manga')
  //   // Select 14
  //   await page.locator('select[name="genres"]').selectOption('14')
  //   // Select manga
  //   await page.locator('select[name="subType"]').selectOption('manga')
  //   // Click input[name="max_score"]
  //   await page.locator('input[name="max_score"]').click()
  //   // Fill input[name="max_score"]
  //   await page.locator('input[name="max_score"]').fill('10')
  //   // Click input[name="min_score"]
  //   await page.locator('input[name="min_score"]').click()
  //   // Fill input[name="min_score"]
  //   await page.locator('input[name="min_score"]').fill('9')
  //   // Click input[name="letter"]
  //   await page.locator('input[name="letter"]').click()
  //   // Fill input[name="letter"]
  //   await page.locator('input[name="letter"]').fill('bers')
  //   // Click text=Apply filters
  //   await page.locator('text=Apply filters').click()
  //   await expect(page).toHaveURL('http://localhost:3000/manga/filter?genres=14&subType=manga&order_by=score&sort=desc&max_score=10&min_score=9&letter=bers')
  //   // Click img[alt="Berserk"]
  //   await page.locator('img[alt="Berserk"]').click()
  //   await expect(page).toHaveURL('http://localhost:3000/manga/2')

  // create a locator
  //   const getStarted = page.locator('text=Anime')

  // Expect an attribute "to be strictly equal" to the value.
  //   await expect(getStarted).toHaveAttribute('href', '/')

  // Click the get started link.
  //   await getStarted.click()

  // Expects the URL to contain intro.
  //   await expect(page).toHaveURL(/.*intro/)
})
