import {test, expect} from '@playwright/test';
import { getProductTestId } from '../../support/util';
import { ProductDescription } from '../page-object/productDescription.pageobject';
import { CheckoutPageObject } from '../page-object/checkout.pageobject';
import { CheckoutProceedSteps, MonthlyInstallments, PaymentMethods } from '../../support/e2e';
import { baseApiUrl } from '../../../playwright.config';

test.describe('e2e practicing with playwright with logged in user', () => {
    let productId:string;

    test.beforeAll(async ({request}) =>{
        const productRequest = await request.get(`${baseApiUrl}/products`);
        const body = await productRequest.json();
        productId = body.data.find(product => product.name === 'Combination Pliers').id;
    })
    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });

    test('should have the correct title', async ({page}) => {
        expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
    });

    test('visual test of the start page', async ({page}) =>{
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveScreenshot('startPage.png', {mask: [page.locator('title')]});
    });

    test('should provide a checkout of a product', async ({page}) =>{
        const productDescriptionPage = new ProductDescription(page);
        const checkoutPage = new CheckoutPageObject(page);
        
        const productQuantity = '3';

        // select a plier product
        await page.getByTestId(getProductTestId(productId)).click();

        // click on the add chart button--> this is the chainable way
        (await (await productDescriptionPage.validateUrl(productId))
        .setAmountOfItemsInCart(productQuantity))
        .clickOnAddToCartButton();

        // check the badge count at the cart icon
        await expect(page.getByTestId('cart-quantity')).toHaveText(productQuantity); 

        // click on the cart icon
        await page.getByTestId('nav-cart').click();

        // check the checkout page--> this is the best practice way of using page object
        await checkoutPage.validateCurrentStep('Cart1');
        await checkoutPage.validateItemInChart(1, 
            {itemName:'Combination Pliers', quantity: productQuantity, price: '$14.15', lineTotalPrice: '$42.45'});
        await checkoutPage.clickOnProceedToCheckoutButton(CheckoutProceedSteps.ProceedToSignIn);
        await checkoutPage.validateCurrentStep('Sign in2');
        await checkoutPage.clickOnProceedToCheckoutButton(CheckoutProceedSteps.ProceedToBillingAddress);
        await checkoutPage.validateCurrentStep('Billing Address3');
        await checkoutPage.fillBillingAddressWithDefaultValue();
        await checkoutPage.clickOnProceedToCheckoutButton(CheckoutProceedSteps.ProceedToPayment);
        await checkoutPage.validateCurrentStep('Payment4');
        await checkoutPage.choosePaymentMethod(PaymentMethods.BuyNowPayLater);
        await checkoutPage.chooseMonthlyInstallments(MonthlyInstallments.ThreeMonthly);
        await checkoutPage.clickOnFinishButton();
        await checkoutPage.validatePaymentSuccessMessage();
    })
});