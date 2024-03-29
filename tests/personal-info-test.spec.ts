import { test, Page, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import {configJson} from '../config.json';
import { InfoPage} from '../logic/pages/personal-info-page';
import { ApiCalls } from '../logic/api/api-calls';
import {setUserBodyRequest } from '../logic/api/request-body/user-body-request';
import { parseBodyToJSON } from '../utils/utils';

test.describe('test dashboard personal information',()=>{
  let browserWrapper:BrowserWrapper;
  let page:Page;

  test.beforeEach(async()=>{
    browserWrapper=new BrowserWrapper();
    page = await browserWrapper.getPage(configJson.url+'dashboard')
 
  });
  test.afterEach(async()=>{
    await browserWrapper.
    closeBrowser();
  })
  test("check if info is updated",async()=>{
    const apiRequest = new ApiCalls();
   const data = setUserBodyRequest("legend","maher","053-3376659",1,"1997-10-22")
   await apiRequest.updateCustomeData(parseBodyToJSON(data))
   const infoPage =new InfoPage(page);
   expect(await infoPage.isFullNameMatches(data.first_name,data.last_name)).toBeTruthy();
  })
})