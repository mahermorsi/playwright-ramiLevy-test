import { test, Page, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import { LoginPage } from '../logic/pages/login-page';
import {configJson} from '../config.json';
import { AddressPage } from '../logic/pages/address-page';
import { MainPage } from '../logic/pages/main-page';

test.describe('test for adding an address',()=>{
  let browserWrapper:BrowserWrapper;
  let page:Page;
  let loginPage:LoginPage
  let addressPage:AddressPage


  test.beforeEach(async()=>{
    browserWrapper=new BrowserWrapper();
    page = await browserWrapper.getPage(configJson.url)
    loginPage = new LoginPage(page);
    await loginPage.fullLoginProcess(configJson.user,configJson.password);
    const mainPage = new MainPage(page)
    await mainPage.clickOnUserProfileButton();
    await mainPage.clickOnAddressManagementButton();
    
  });
  test.afterEach(async()=>{
    await browserWrapper.
    closeBrowser();
  })
  test("check address is successfully added",async({request})=>{
    const newPost = await request
    .post(configJson.addressUrl, {
        data: {
            "name": null,
            "city_id": 1337,
            "city": "עכברה",
            "street": "12",
            "street_number": "12",
            "zip": "",
            "apartment": "12",
            "entrance": null,
            "floor": "12"
        },
        headers:{
            "Ecomtoken": configJson.token,
        }
        
    });
    const body = await newPost.json()
    const allAddressesCount = Object.keys(body.data.allAddresses).length;
    addressPage = new AddressPage(page)
    await addressPage.refreshPage();
    expect(await addressPage.getAllAddressCount()).toBe(allAddressesCount);

  })
})