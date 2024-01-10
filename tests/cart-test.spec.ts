import { test, Page, expect, APIResponse } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import { LoginPage } from '../logic/pages/login-page';
import { MainPage } from '../logic/pages/main-page';
import {configJson} from '../config.json';
import { DateTimeFormat } from '../utils/date-time-format'; 


test.describe('test for adding items in cart',()=>{
  let browserWrapper:BrowserWrapper;
  let page:Page;
  let newPost: APIResponse;

  test.beforeEach(async({request})=>{
    browserWrapper=new BrowserWrapper();
    page = await browserWrapper.getPage(configJson.url)
    const loginPage = new LoginPage(page);
    await loginPage.fullLoginProcess(configJson.user,configJson.password);
    newPost = await request
    .post(configJson.url+'api/v2/cart', {
        data: {
            "store": "279",
            "isClub": 0,
            "supplyAt": DateTimeFormat.getCurrentDateTime(),
            "items": {
                "336789": "1.00",
                "329483": "1.00",
            },
            "meta": null
        },
        headers:{
            "Ecomtoken": configJson.token,
        }
    })
  });

  test.afterEach(async({request})=>{
    const patch = await request
    .patch(configJson.deleteUrl,{
        headers:{
            "Ecomtoken": configJson.token,
        }
    })
    await browserWrapper.closeBrowser();
  })
  test("check API added items' total price, is equal to the total price shown on the cart page",async()=>{
    const responseBody = await newPost.json()
    const ApiPrice=await responseBody.items.reduce((sum: string, item: { finalPriceClub: string; }) => sum + (item.finalPriceClub || 0), 0);
    const mainPage = new MainPage(page);
    expect(await mainPage.getTotalPrice()).toBe(ApiPrice)
  })

  test("check API added item's count is equal to the list count of products on cart page", async()=>{
    const responseBody = await newPost.json()
    const itemsCount = responseBody.items.length
    const mainPage = new MainPage(page)
    expect(await mainPage.getCartProductCount()).toBe(itemsCount)
  })
})