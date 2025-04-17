import { test as setup  } from "@playwright/test";
import { startPageDataTestId, loginPageDataTestId } from "../support/e2e";
import 'dotenv/config';
import { get } from "http";
import { USER_AUTH_STORAGE_PATH, userName, password } from "../../playwright.config";

setup('login to site', async ({page, context}) =>{
    await page.goto('/');
    await page.getByTestId(startPageDataTestId.signInElementNavi).click();
    await page.getByTestId(loginPageDataTestId.emailInput).fill(userName);
    await page.getByTestId(loginPageDataTestId.passwordInput).fill(password);
    await page.getByTestId(loginPageDataTestId.signInButton).click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: USER_AUTH_STORAGE_PATH});
})