const { test, expect } = require('@playwright/test');

test('Verify title and login', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client");

  const title = await page.title();
  console.log(title); // No need to use 'await' again here

  expect(title).toBe("Let's Shop");

  await page.locator("#userEmail").fill('akash@yopmail.com');
  await page.locator("#userPassword").fill('123456');
  await page.locator("[type='submit']").click();

  // Use console.log (lowercase), not Console.log (uppercase)
  const toastMessage = await page.locator(".toast-bottom-right.toast-container").textContent();
  console.log(toastMessage);
  await expect(page.locator(".toast-bottom-right.toast-container")).toContainText('Incorrect');

});
