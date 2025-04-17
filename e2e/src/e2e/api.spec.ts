import {test, expect} from '@playwright/test';
import { getProductIdFromApi } from '../../support/util';
import { baseApiUrl } from '../../../playwright.config';

test.describe('api testing', () =>{
    let productId:string;
    test.beforeAll(async ({request}) =>{
        productId = await getProductIdFromApi(request, 'Combination Pliers');
    })

    test('test end point product', async ({request}) =>{
        const response =  await request.get(`${baseApiUrl}/products/${productId}`);
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body.price).toBe(14.15);
        
    })
});