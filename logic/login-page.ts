import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../infra/base-page';
export class LoginPage extends BasePage{
    // LOCATORS
    private readonly loginMainButton:Locator
    private readonly userInput : Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    constructor(page: Page){
        super(page);
        this.loginMainButton=this.page.locator('//div[@class="d-lg-block blue align-self-center mx-1 m-text d-none" and @data-v-17f5c558=""]')
        this.userInput = this.page.locator('//input[@id="email" and @class="focus-item mb-0 position-relative bg-gray-100 w-100 p-2 border-radius-8"]')
        this.passwordInput=this.page.locator('//input[@id="password" and @class="focus-item mb-0 position-relative bg-gray-100 w-100 p-2 border-radius-8"]')
        this.loginButton = this.page.locator('//span[@data-v-5f56f444=""]')
        this.initPage();
    }
    async pressLoginMainButton(){
        await this.loginMainButton.click();
    }
    async fillUsername(user:string){
        await this.userInput.fill(user)
    }
    async fillPassword(password:string){
        await this.passwordInput.fill(password)
    }
    async pressLoginButton(){
       await this.loginButton.click();
    }
    async fullLoginProcess(user:string, password: string){ 
        await this.pressLoginMainButton();
        await this.fillUsername(user);
        await this.fillPassword(password);
        await this.pressLoginButton();
    }
}