import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  test.slow()
  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/')

  // Select manga
  await page.locator('text=Typeanimemanga >> select[name="type"]').selectOption('manga')

  // Select 1
  await page.locator('select[name="genres"]').selectOption('1')

  // Select manga
  await page.locator('select[name="subType"]').selectOption('manga')

  // Click [placeholder="\31 0"]
  await page.locator('[placeholder="\\31 0"]').click()

  // Fill [placeholder="\31 0"]
  await page.locator('[placeholder="\\31 0"]').fill('10')

  // Click [placeholder="\37 \.5"]
  await page.locator('[placeholder="\\37 \\.5"]').click()

  // Fill [placeholder="\37 \.5"]
  await page.locator('[placeholder="\\37 \\.5"]').fill('8')

  // Click [placeholder="Berserk\, Shingeki\.\.\."]
  await page.locator('[placeholder="Berserk\\, Shingeki\\.\\.\\."]').click()

  // Fill [placeholder="Berserk\, Shingeki\.\.\."]
  await page.locator('[placeholder="Berserk\\, Shingeki\\.\\.\\."]').fill('shingeki')

  // Click text=Apply filters
  await page.locator('text=Apply filters').click()
  await expect(page).toHaveURL('http://localhost:3000/manga/filter?genres=1&subType=manga&order_by=score&sort=desc&max_score=10&min_score=8&letter=shingeki')

  // Click img[alt="Shingeki no Kyojin"]
  await page.locator('img[alt="Shingeki no Kyojin"]').click()
  await expect(page).toHaveURL('http://localhost:3000/manga/23390')

  // Click h1:has-text("Shingeki no Kyojin")
  await page.locator('h1:has-text("Shingeki no Kyojin")').click()
})
