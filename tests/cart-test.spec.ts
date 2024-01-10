import { test, Page, expect, APIResponse } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import { MainPage } from '../logic/pages/main-page';
import { configJson } from '../config.json';
import { ApiCalls } from '../logic/api/api-calls';
import { setCartBodyRequest } from '../logic/api/request-body/cart-body-request';
import { parseBodyToJSON } from '../utils/utils';


test.describe.serial('test for adding items in cart', () => {
  let browserWrapper: BrowserWrapper;
  let page: Page;
  let responseBody: any;

  test.beforeEach(async () => {
    const apiRequest = new ApiCalls();
    const data = setCartBodyRequest("279", 0, {"336789": "1.00","329483": "1.00",})
    const newPost = await apiRequest.addItemsToCart(parseBodyToJSON(data))
    responseBody = await newPost.json()
    browserWrapper = new BrowserWrapper();
    page = await browserWrapper.getPage(configJson.url)
  });

  test.afterEach(async () => {
    const apiRequest = new ApiCalls();
    await apiRequest.emptyItemsFromCart();
    await browserWrapper.closeBrowser();
  })
  
  test("check API added items' total price, is equal to the total price shown on the cart page", async () => {
   
    const ApiPrice = await responseBody.items.reduce((sum: string, item: { finalPriceClub: string; }) => sum + (item.finalPriceClub || 0), 0);
    const mainPage = new MainPage(page);
    expect(await mainPage.getTotalPrice()).toBe(ApiPrice)
  })

  test("check API added item's count is equal to the list count of products on cart page", async () => {
    const itemsCount = responseBody.items.length
    const mainPage = new MainPage(page)
    expect(await mainPage.getCartProductCount()).toBe(itemsCount)
  })
})