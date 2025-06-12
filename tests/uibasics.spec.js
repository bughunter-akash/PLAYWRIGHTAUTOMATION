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
  //await expect(page.locator(".toast-bottom-right.toast-container")).toContainText('Incorrect');
//ok
});



test('get all the prouct detail',async ({page})=>{
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill('akash@yopmail.com');
  await page.locator("#userPassword").fill('Test@123');
  await page.locator("[type='submit']").click();
  // await page.waitForLoadState('networkidle');
  page.locator('.card-body b').waitFor();
// console.log(await page.locator('.card-body b').first().textContent());
// console.log(await page.locator('.card-body b').nth(0).textContent());
let alltitles=await page.locator('.card-body b').allTextContents();
console.log(alltitles)
});




test('open child window and validate text using Promise.all', async ({ browser }) => {
  let context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill('akash@yopmail.com');
  await page.locator('#userPassword').fill('Test@123');
  await page.locator("[type='submit']").click();
  // await page.waitForLoadState('networkidle');
  // await page.locator('.card-body b').waitFor({ timeout: 10000 });

  const meetupLink = page.locator('[href="https://qasummit.org/"]');
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    meetupLink.click()
  ])

 let title = await  newPage.title();
 console.log(title);
console.log (await newPage.locator('.hero_summary').textContent());

});


test.only(`Order Product`, async ({ page }) => {
  const product=page.locator('.card-body');
  const productName='ZARA COAT 3';
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill('akash@yopmail.com');
  await page.locator('#userPassword').fill('Test@123');
  await page.locator("[type='submit']").click();

  // Wait for the products to load
  await page.locator('.card-body').first().waitFor();
  const count =await product.count();
  console.log(count);

  // // Get only the product titles inside the <b> tag
  // const productTitles = await page.locator('.card-body b').allTextContents();
  // console.log(productTitles);
for (let i=0;i<count;++i)
{
  if(await product.nth(i).locator("b").textContent()===productName)
  {
    await product.nth(i).locator("text= Add To Cart").click();
    break;
  }
}

await page.locator('[routerlink*="/dashboard/cart"]').click();
await page.locator('div li').first().waitFor();
const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(bool).toBeTruthy();
await page.locator("text=Checkout").click();
await page.locator('[placeholder="Select Country"]').pressSequentially("ind");
const dropdown=page.locator('.ta-results');
await dropdown.first().waitFor();
const options= await dropdown.locator('button').count();

for (let i=0; i<options;i++)
{
  let text =await dropdown.locator('button').nth(i).textContent();
  if (text==' India')
  {
    await dropdown.locator('button').nth(i).click();
    break;
  
  }
}
await expect(page.locator('.user__name [type="text"]').first()).toHaveText('akash@yopmail.com')
await page.locator('.action__submit').click();
await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
const orderId =await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
console.log(orderId);
await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");


for (let i = 0; i < await rows.count(); ++i) {
   const rowOrderId = await rows.nth(i).locator("th").textContent();
   if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
   }
}
const orderIdDetails = await page.locator(".col-text").textContent();
expect(orderId.includes(orderIdDetails)).toBeTruthy();


await page.pause();

});



test(`playwright special locators`, async ({page})=>
{
page.gety




});