import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../infra/base-page';
export class LoginPage extends BasePage{
    // LOCATORS
    private readonly userInput : Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    constructor(page: Page){
        super(page);
        this.userInput = this.page.locator('//input[@name="username"]')
        this.passwordInput=this.page.locator('//input[@name="password"]')
        this.loginButton = this.page.locator('//button[@type="submit"]')
        this.initPage();
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
        await this.fillUsername(user);
        await this.fillPassword(password);
        await this.pressLoginButton();
    }
}