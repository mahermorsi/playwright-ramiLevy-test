// auth.setup.ts
import { test as setup } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import { LoginPage } from '../logic/pages/login-page';
import {configJson} from '../config.json';
import { MainPage } from '../logic/pages/main-page';
import { waitForElementToBeVisible } from '../utils/wait-for-elements';


const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({page}) => {
    //const browserWrapper = new BrowserWrapper();
    await page.goto(configJson.url)
    const loginPage = new LoginPage(page);
    await loginPage.fullLoginProcess(configJson.user, configJson.password);
    const mainPage = new MainPage(page)
    await page.waitForTimeout(5000)
    await page.context().storageState({ path: authFile });
});