import { test as setup  } from "@playwright/test";
import { startPageDataTestId, loginPageDataTestId } from "../support/e2e";
import 'dotenv/config';
import { get } from "http";
import { STORAGE_STATE } from "../../playwright.config";

const userName = process.env.USERNAME === undefined ? '' : process.env.USERNAME;
const password= process.env.PASSWORD === undefined ? '' : process.env.PASSWORD;

setup('login to site', async ({page, context}) =>{
    await page.goto('/');
    await page.getByTestId(startPageDataTestId.signInElementNavi).click();
    await page.getByTestId(loginPageDataTestId.emailInput).fill(userName);
    await page.getByTestId(loginPageDataTestId.passwordInput).fill(password);
    await page.getByTestId(loginPageDataTestId.signInButton).click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: STORAGE_STATE});
})