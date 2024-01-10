import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';
export class AddressPage extends BasePage{
    // LOCATORS
    private readonly addressCount:Locator;
    constructor(page: Page){
        super(page);
        this.addressCount=this.page.locator('//div[@class="d-flex flex-wrap py-3 px-5 px-md-3 wrap-addresses"]/div')
        this.initPage();
    }

    async getAllAddressCount(){
        await waitForElementToBeVisible(this.addressCount.first(),1000,5)
        return await this.addressCount.count();
    }
    
}