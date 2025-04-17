import { APIRequestContext } from "@playwright/test";
import { baseApiUrl } from "../../playwright.config";

export const getProceedButtonDataTestId = (stepNumber: string) =>`proceed-${stepNumber}`;

export const getProductTestId = (productId:string) => `product-${productId}`;

export async function getProductIdFromApi(request: APIRequestContext, productName:string){
    if (productName === undefined || productName === null) {
        throw new Error('productName is undefined or null');
    }
    const productRequest = await request.get(`${baseApiUrl}/products`);
    const body = await productRequest.json();
    return body.data.find(product => product.name === productName).id;
}