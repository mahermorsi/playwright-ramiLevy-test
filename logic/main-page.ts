import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../infra/base-page';
export class MainPage extends BasePage {
    // LOCATORS
    private readonly cartCount: Locator;
    private readonly cartTotalPrice: Locator;
    private readonly userAcountButton:Locator;
    private readonly addressManagementButton:Locator;
    private readonly userName:Locator;

    constructor(page: Page) {
        super(page);
        this.cartCount = this.page.locator('//div[@id="market"]/ul/li');
        this.cartTotalPrice = this.page.locator('//span[@class="position-relative currency-wrap overflow-ellipsis l-text"]');
        this.userAcountButton=this.page.locator('//div[@class="login border-radius-10 header-item d-flex bd-highlight p-lg-2 align-items-center justify-content-center focus-item gray-profile-hover"]')
        this.addressManagementButton=this.page.locator('//a[@id="dashboard-addresses"]')
        this.userName=this.page.locator('//*[@id="login-user"]/div/div/div[2]/div/span')
        this.initPage();
    }

    async clickOnUserProfileButton(){
        await this.userAcountButton.click()
    }
    async clickOnAddressManagementButton(){
        await  this.addressManagementButton.click()
    }
    async getCartProductCount() {
        return await this.cartCount.count();
    }
    async getTotalPrice() {
        const sumShekels = await this.cartTotalPrice.textContent();
        if (sumShekels) {
            const cleanedString = sumShekels.replace(" ₪", "");
            return parseFloat(cleanedString);
        }
    }
    async getUserName(){
        return await this.userName.textContent();
    }
}