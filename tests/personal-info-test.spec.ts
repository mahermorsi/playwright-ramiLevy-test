import { test, Page, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import { LoginPage } from '../logic/login-page';
import {configJson} from '../config.json';
import { InfoPage } from '../logic/personal-info-page';

test.describe('test dashboard personal information',()=>{
  let browserWrapper:BrowserWrapper;
  let page:Page;

  test.beforeEach(async()=>{
    browserWrapper=new BrowserWrapper();
    page = await browserWrapper.getPage(configJson.url+'dashboard')
    const loginPage = new LoginPage(page);
    await loginPage.fullLoginProcess(configJson.user,configJson.password);
  });
  test.afterEach(async()=>{
    await browserWrapper.
    closeBrowser();
  })
  test("check if info is updated",async({request})=>{
   const response = await request
   .put(configJson.ApiPutInfoUrl,{
    data:{
        "first_name": "legend",
        "last_name": "Maher",
        "phone": "053-33376659",
        "additional_phone": null,
        "sex_id": 1,
        "birth_date": "1997-10-22"
    },
    headers:{
        "Ecomtoken": configJson.token,
    }
   })
   const infoPage = new InfoPage(page);
   expect(await infoPage.isFullNameMatches("legend","Maher")).toBeTruthy();
  })
})