import { Page, expect } from "@playwright/test";
import { CheckoutProceedSteps, checkoutPageDateTestId as dataTestId, MonthlyInstallments, PaymentMethods } from "../../support/e2e";
import { getProceedButtonDataTestId } from "../../support/util";

export class CheckoutPageObject{
    private readonly page:Page

    constructor(page) {
        this.page = page;
    }

    async clickOnProceedToCheckoutButton(atStepNumber: CheckoutProceedSteps) {
        const proceedButtonAtPage = getProceedButtonDataTestId(atStepNumber)
        await this.page.getByTestId(proceedButtonAtPage).click()
    }

    async clickOnFinishButton() {
        await this.page.getByTestId(dataTestId.finish).click()
    }

    async choosePaymentMethod(paymentMethod: PaymentMethods) {
        await this.page.getByRole('combobox', ).selectOption(paymentMethod);
    }

    async chooseMonthlyInstallments(monthly: MonthlyInstallments) {
        await this.page.getByTestId(dataTestId.monthlyInstallments).selectOption(monthly);
    }

    async validateCurrentStep(label:string){
        const listOfSteps = await this.page.locator('.steps-indicator');
        await expect(listOfSteps.locator('.current')).toContainText(label);
    }
    async validatePaymentSuccessMessage(){
        await expect(this.page.getByTestId(dataTestId.paymentSuccessMessage)).toHaveText('Payment was successful');
    }

    async validateItemInChart(nthItem, {itemName, quantity, price, lineTotalPrice}) {
        const nthItemInCart = this.page.locator('table tr').nth(nthItem);
        await expect(nthItemInCart.getByTestId(dataTestId.productTitle)).toHaveText(itemName);
        await expect(nthItemInCart.getByTestId(dataTestId.productPrice)).toHaveText(price);
        await expect(nthItemInCart.getByTestId(dataTestId.quanityOfItemsInCart)).toHaveValue(quantity);
        await expect(nthItemInCart.getByTestId(dataTestId.totalPrice)).toHaveText(lineTotalPrice); 
    }

    async fillBillingAddressWithDefaultValue() {
        await this.page.getByTestId(dataTestId.billingStreetAddress).fill('Test street 654', {force:true});
        await this.page.getByTestId(dataTestId.billingCityAddress).fill('Test city', {force:true});
        await this.page.getByTestId(dataTestId.billingStateAddress).fill('Test state', {force:true});
        await this.page.getByTestId(dataTestId.billingCountryAddress).fill('Test country', {force:true});
        await this.page.getByTestId(dataTestId.billingPostcodeCodeAddress).fill('12345', {force:true});
    }
}