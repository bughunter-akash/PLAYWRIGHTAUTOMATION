const {test,expect}=require('@playwright/test');
const { text } = require('stream/consumers');
 test.only(`Login to the application`,async({page})=> {
await page.goto("https://mylead-dev.heaptrace.com/");
await page.locator('[placeholder="Email address"]').fill('qauat.ht@gmail.com');
await page.locator('[placeholder="Password"]').fill('DevPassword@123');
await page.locator('[type="submit"]').click();
let text =await page.locator('.toast-body').textContent();
console.log(text);
await expect(page.locator('.toast-body')).toHaveText('Logged in successfully');

 });


 test (`create lead`, async ({page})=>{
    await page.goto("https://mylead-dev.heaptrace.com/");
    await page.locator('[placeholder="Email address"]').fill('qauat.ht@gmail.com');
    await page.locator('[placeholder="Password"]').fill('DevPassword@123');
    await page.locator('[type="submit"]').click();
    await page.locator('[ng-reflect-content="Leads"]').click();
    await 
 });