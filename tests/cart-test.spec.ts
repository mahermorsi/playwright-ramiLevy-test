import { test, Page, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import { LoginPage } from '../logic/login-page';
import {configJson} from '../config.json';
import { DateTimeFormat } from '../utils/date-time-format'; 

test.describe('test for adding items in cart',()=>{
  let browserWrapper:BrowserWrapper;
  let page:Page;

  test.beforeEach(async()=>{
    browserWrapper=new BrowserWrapper();
    page = await browserWrapper.getPage(configJson.url)
    const loginPage = new LoginPage(page);
    await loginPage.fullLoginProcess(configJson.user,configJson.password);
  });
  test.afterEach(async()=>{
    await browserWrapper.closeBrowser();
  })
  test("check item is successfully added to cart",async({request})=>{
    const newPost = await request
    .post(configJson.url+'api/v2/cart', {
        data: {
            "store": "279",
            "isClub": 0,
            "supplyAt": DateTimeFormat.getCurrentDateTime(),
            "items": {
                "336789": "1.00",
                "292804": "1.00",
            },
            "meta": null
        },
        headers:{
            "Ecomtoken": configJson.token,
        }
    })
    
    const body = await newPost.json()
    console.log(body)
  })
})