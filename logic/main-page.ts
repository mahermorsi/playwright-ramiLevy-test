import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../infra/base-page';
export class MainPage extends BasePage {
    // LOCATORS
    private readonly cartCount: Locator;
    private readonly cartTotalPrice: Locator;

    constructor(page: Page) {
        super(page);
        this.cartCount = this.page.locator('//div[@id="market"]/ul/li');
        this.cartTotalPrice = this.page.locator('//span[@class="position-relative currency-wrap overflow-ellipsis l-text"]');
        this.initPage();
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
}