
export enum CheckoutProceedSteps{
    ProceedToSignIn= '1',
    ProceedToBillingAddress= '2',
    ProceedToPayment= '3'
}

export enum PaymentMethods{
    BankTransfer= 'Bank Transfer',
    CashOnDelivery= 'Cash on Delivery',
    CreditCard= 'Credit Card',
    BuyNowPayLater= 'Buy Now Pay Later',
    GiftCard= 'Gift Card',
}

export enum MonthlyInstallments{
    ThreeMonthly= '3 Monthly Installments',
    SixMonthly= '6 Monthly Installments',
    NineMonthly= '9 Monthly Installments',
    TwelveMonthly= '12 Monthly Installments'
}

export const startPageDataTestId = {
    signInElementNavi: 'nav-sign-in'
} as const;

export const loginPageDataTestId = {
    emailInput: 'email',
    passwordInput: 'password',
    signInButton: 'login-submit',
} as const;

export const checkoutPageDateTestId = {
    proceedToCheckoutButton: 'proceed-1',
    quanityOfItemsInCart: 'product-quantity',
    productTitle: 'product-title',
    productPrice: 'product-price',
    totalPrice: 'line-price',
    cartTotal: 'cart-total',
    billingStreetAddress:'street',
    billingCityAddress:'city',
    billingStateAddress:'state',
    billingCountryAddress:'country',
    billingPostcodeCodeAddress:'postal_code',
    monthlyInstallments: 'monthly_installments',
    finish:'finish',
    paymentSuccessMessage: 'payment-success-message',
} as const;

export const productDescriptionPageDataTestId = {
    addToChart: 'add-to-cart',
    productName: 'product-name',
    productPrice: 'unit-price',
    productDescription:'product-description',
    productQuantity: 'quantity'
}as const;