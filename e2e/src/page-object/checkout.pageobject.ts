import { Page, expect } from "@playwright/test";
import { checkoutPageDateTestId as dataTestId, getProceedButtonDataTestId, MonthlyInstallments, PaymentMethods } from "../../support/e2e";

export class CheckoutPageObject{
    private readonly page:Page

    constructor(page) {
        this.page = page;
    }

    async clickOnProceedToCheckoutButton(atStepNumber: string) {
        const proceedButtonAtPage = getProceedButtonDataTestId(atStepNumber)
        await this.page.getByTestId(proceedButtonAtPage).click()
        return CheckoutPageObject;
    }

    async clickOnFinishButton() {
        await this.page.getByTestId(dataTestId.finish).click()
        return CheckoutPageObject;
    }

    async choosePaymentMethod(paymentMethod: PaymentMethods) {
        await this.page.getByRole('listbox').selectOption(paymentMethod);
        return CheckoutPageObject;
    }

    async chooseMonthlyInstallments(monthly: MonthlyInstallments) {
        await this.page.getByTestId(dataTestId.monthlyInstallments).selectOption(monthly);
        return CheckoutPageObject;
    }

    async validateCurrentStep({label, value}){
        const listOfSteps = await this.page.locator('.steps-indicator');
        await expect(listOfSteps.locator('.current')).toContainText([label, value]);
        return CheckoutPageObject;
    }
    async validatePaymentSuccessMessage(){
        await expect(this.page.getByTestId(dataTestId.paymentSuccessMessage)).toHaveText('Payment was successful');
    }

    async validateItemInChart(nthItem, {itemName, quantity, price, lineTotalPrice}) {
        const nthItemInCart = this.page.getByRole('table').nth(nthItem);
        await expect(nthItemInCart.getByTestId(dataTestId.productTitle)).toHaveText(itemName);
        await expect(nthItemInCart.getByTestId(dataTestId.productPrice)).toHaveText(price);
        await expect(nthItemInCart.getByTestId(dataTestId.quanityOfItemsInCart)).toHaveText(quantity);
        await expect(nthItemInCart.getByTestId(dataTestId.totalPrice)).toHaveText(lineTotalPrice); 
        return CheckoutPageObject;
    }

    async fillBillingAddressWithDefaultValue() {
        await this.page.getByTestId(dataTestId.billingStreetAddress).fill('Test street 654');
        await this.page.getByTestId(dataTestId.billingCityAddress).fill('Test city');
        await this.page.getByTestId(dataTestId.billingStateAddress).fill('Test state');
        await this.page.getByTestId(dataTestId.billingCountryAddress).fill('Test country');
        await this.page.getByTestId(dataTestId.billingPostcodeCodeAddress).fill('12345');
        return CheckoutPageObject;
    }
}