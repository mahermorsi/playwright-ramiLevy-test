import { test, Page, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import { LoginPage } from '../logic/login-page';
import { configJson } from '../config.json';
import { MainPage } from '../logic/main-page';

test.describe('test for login', () => {
    let browserWrapper: BrowserWrapper;
    let page: Page;
    let loginPage: LoginPage
    let mainPage: MainPage

    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper();
        page = await browserWrapper.getPage(configJson.url)
        loginPage = new LoginPage(page);
        mainPage = new MainPage(page);
    });
    test.afterEach(async () => {
        await browserWrapper.
            closeBrowser();
    })
    test("check the user name after login", async () => {
        await loginPage.fullLoginProcess(configJson.user, configJson.password);
        expect(await mainPage.getUserName()).toBe(configJson.userName)
    })
})