import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import {configJson} from '../config.json';
import { AddressPage } from '../logic/pages/address-page';
import { MainPage } from '../logic/pages/main-page';
import { ApiCalls } from '../logic/api/api-calls';
import { parseBodyToJSON } from '../utils/utils';
import { setAddressBodyRequest } from '../logic/api/request-body/address-body-request';

test.describe('test for adding an address',()=>{
  let browserWrapper:BrowserWrapper;


  test.beforeEach(async({page})=>{
    await page.goto(configJson.url)
    const mainPage = new MainPage(page)
    await mainPage.clickOnUserProfileButton();
    await mainPage.clickOnAddressManagementButton();
    
  });
  test.afterEach(async({page})=>{
    //await browserWrapper.closeBrowser();
    await page.close();
  })
  test("check address is successfully added",async({page})=>{

    const apiCalls = new ApiCalls();
    const dataObject = setAddressBodyRequest(1337,"עכברה","12","12","12","12")
    const newPost = await apiCalls.addNewAddress(parseBodyToJSON(dataObject))
    const body = await newPost.json()
    const allAddressesCount = Object.keys(body.data.allAddresses).length;
    const addressPage = new AddressPage(page)
    await addressPage.refreshPage();
    expect(await addressPage.getAllAddressCount()).toBe(allAddressesCount);

  })
})