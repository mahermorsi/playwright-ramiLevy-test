// auth.setup.ts
import { test as setup } from '@playwright/test';
import { LoginPage } from '../logic/pages/login-page';
import {configJson} from '../config.json';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({page}) => {
    await page.goto(configJson.url)
    const loginPage = new LoginPage(page);
    await loginPage.fullLoginProcess(configJson.user, configJson.password);
    //await page.waitForTimeout(5000)
    await page.waitForResponse(response => response.url().endsWith('/login') && response.status() === 200)
    await page.context().storageState({ path: authFile });
});