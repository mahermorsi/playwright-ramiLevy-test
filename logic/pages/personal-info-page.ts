import {type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../infra/base-page';
import { waitForElementToBeVisible } from '../../utils/wait-for-elements';

export class InfoPage extends BasePage{
    // LOCATORS
    private readonly name:Locator;
    constructor(page: Page){
        super(page);
        this.name=this.page.locator("//a[@id='dashboard']//span[@class='m-text black dashboard-link']")
        this.initPage();
    }

    async isFullNameMatches(firstName:string,lastName:string){
        await waitForElementToBeVisible(this.name.first(),500,6)
        const firstNameResult =  await this.name.first().textContent()
        const lastNameResult =  await this.name.last().textContent()
        if (firstNameResult && lastNameResult) return firstNameResult.includes(firstName) && lastNameResult.includes(lastName)
        return false
    }
}