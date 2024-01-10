import {Browser, Page } from '@playwright/test';
import { chromium } from 'playwright';
export class BrowserWrapper{
    browser: Browser | undefined;
    page: Page | undefined;

    constructor(){
    }

    async getPage(url: string){
        if (!this.page){
            this.browser = await chromium.launch();
            const context = await this.browser.newContext();
            this.page = await context.newPage();
        }
        if (url){
            await this.page.goto(url);
        }
        return this.page;
    }
    async closeBrowser(){
        if (this.page){
            await this.page.close();
        }
        if (this.browser){
            await this.browser.close();
        }
    }
    async navigateTo(url:string){
        if (this.page) await this.page.goto(url)
    }
}