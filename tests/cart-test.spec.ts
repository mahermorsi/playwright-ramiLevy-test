import { test, Page, expect, APIResponse } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import { LoginPage } from '../logic/pages/login-page';
import { MainPage } from '../logic/pages/main-page';
import { configJson } from '../config.json';
import { ApiCalls } from '../logic/api/api-calls';
import { setCartBodyRequest } from '../logic/api/request-body/cart-body-request';
import { parseBodyToJSON } from '../utils/utils';


test.describe('test for adding items in cart', () => {
  let browserWrapper: BrowserWrapper;
  let page: Page;
  let newPost: APIResponse;

  test.beforeEach(async ({page}) => {
    await page.goto(configJson.url)
    const loginPage = new LoginPage(page);
    await loginPage.fullLoginProcess(configJson.user, configJson.password);

    const apiRequest = new ApiCalls();
    const data = setCartBodyRequest("279", 0, {"336789": "1.00","329483": "1.00",})
    newPost = await apiRequest.addItemsToCart(parseBodyToJSON(data))

  });

  test.afterEach(async ({page}) => {
    const apiRequest = new ApiCalls();
    await apiRequest.emptyItemsFromCart();
    await page.close();


  })
  

  test("check API added items' total price, is equal to the total price shown on the cart page", async () => {
    const responseBody = await newPost.json()
    const ApiPrice = await responseBody.items.reduce((sum: string, item: { finalPriceClub: string; }) => sum + (item.finalPriceClub || 0), 0);
    const mainPage = new MainPage(page);
    expect(await mainPage.getTotalPrice()).toBe(ApiPrice)
  })

  test("check API added item's count is equal to the list count of products on cart page", async () => {
    const responseBody = await newPost.json()
    const itemsCount = responseBody.items.length
    const mainPage = new MainPage(page)
    expect(await mainPage.getCartProductCount()).toBe(itemsCount)
  })
})