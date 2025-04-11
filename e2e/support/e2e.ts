import path from 'path';

export const startPageDataTestId = {
    signInElementNavi: 'nav-sign-in'
} as const;

export const loginPageDataTestId = {
    emailInput: 'email',
    passwordInput: 'password',
    signInButton: 'login-submit',
} as const;

export const getAuthFile = () => path.join(__dirname, '../../playwright/.auth/', 'auth.json');