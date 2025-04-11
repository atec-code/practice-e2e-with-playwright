import {test, expect} from '@playwright/test';

test.describe('e2e practicing with playwright', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });

    test('should have the correct title', async ({page}) => {
        expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
        console.log('Title is correct');
    });
})