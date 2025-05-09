import {test, expect} from "@playwright/test"
import { beforeEach, describe } from "node:test"
import { USER_AUTH_STORAGE_PATH } from "../../../playwright.config";


test.describe('test navibar of the application without logged in user', () =>{
    test.beforeEach(async ({page}) =>{
        await page.goto('/');
    })
    test('elements of navbar', async({page})=>{
        await expect(page.locator('app-header')).toMatchAriaSnapshot(`
          - link "Practice Software Testing - Toolshop":
            - img
          - menubar "Main menu":
            - menuitem "Home":
              - link "Home"
            - menuitem "Categories":
              - button "Categories"
            - menuitem "Contact":
              - link "Contact"
            - menuitem "Sign in":
              - link "Sign in"
          `);

    });

});

test.describe('test navibar of the application with logged in user', () =>{

    test.use({storageState: USER_AUTH_STORAGE_PATH});
    test.beforeEach(async ({page}) =>{
        await page.goto('/');
    })
    test('elements of navbar with user', async({page})=>{
        await expect(page.locator('app-header')).toMatchAriaSnapshot(`
          - link "Practice Software Testing - Toolshop":
            - img
          - menubar "Main menu":
            - menuitem "Home":
              - link "Home"
            - menuitem "Categories":
              - button "Categories"
            - menuitem "Contact":
              - link "Contact"
            - menuitem "Jack Howe":
              - button "Jack Howe"
          `);
    });

});