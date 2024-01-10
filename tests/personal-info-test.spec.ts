import { test, Page, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import { LoginPage } from '../logic/pages/login-page';
import {configJson} from '../config.json';
import { InfoPage} from '../logic/pages/personal-info-page';
import { ApiCalls } from '../logic/api/api-calls';
import {setUserBodyRequest } from '../logic/api/request-body/user-body-request';
import { parseUserBodyToJSON } from '../utils/utils';

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
  test("check if info is updated",async()=>{
    const apiRequest = new ApiCalls();
   const data = setUserBodyRequest("legend","ashraf","052-4563894",1,"1922-02-15")
   await apiRequest.updateCustomeData(parseUserBodyToJSON(data))
   const infoPage =new InfoPage(page);
   expect(await infoPage.isFullNameMatches(data.first_name,data.last_name)).toBeTruthy();
  })
})