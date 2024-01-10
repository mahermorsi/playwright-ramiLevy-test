import { test, Page, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import { LoginPage } from '../logic/pages/login-page';
import {configJson} from '../config.json';
import { AddressPage } from '../logic/pages/address-page';
import { MainPage } from '../logic/pages/main-page';
import { ApiCalls } from '../logic/api/api-calls';
import { parseBodyToJSON } from '../utils/utils';
import { setAddressBodyRequest } from '../logic/api/request-body/address-body-request';

test.describe('test for adding an address',()=>{
  let browserWrapper:BrowserWrapper;
  let page:Page;

  test.beforeEach(async()=>{
    browserWrapper=new BrowserWrapper();
    page = await browserWrapper.getPage(configJson.url)
    const loginPage = new LoginPage(page);
    await loginPage.fullLoginProcess(configJson.user,configJson.password);
    const mainPage = new MainPage(page)
    await mainPage.clickOnUserProfileButton();
    await mainPage.clickOnAddressManagementButton();
    
  });
  test.afterEach(async()=>{
    await browserWrapper.
    closeBrowser();
  })
  test("check address is successfully added",async()=>{

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