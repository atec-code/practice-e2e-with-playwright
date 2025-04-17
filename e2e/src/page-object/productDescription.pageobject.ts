import { expect, Page } from "@playwright/test";
import {productDescriptionPageDataTestId as dataTestId} from "../../support/e2e";

export class ProductDescription{
    private readonly page: Page;
    
    constructor(page){
        this.page = page;
    }

    async validateUrl(productId:string) : Promise<this>{
       expect(this.page).toHaveURL(`product/${productId}`);
        return this;
    }

    async setAmountOfItemsInCart(amount: string): Promise<this>{
        await this.page.getByTestId(dataTestId.productQuantity).fill(amount);
        return this;
    }

    async clickOnAddToCartButton():Promise<this>{
        await this.page.getByTestId(dataTestId.addToChart).click();
        return this;
    }
}