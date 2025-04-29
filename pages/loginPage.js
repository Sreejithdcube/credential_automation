class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
    }

    async goto() {
        await this.page.goto('https://credential.mccord.cloud/');
    }

    async login(username, password) {
        await this.usernameInput.click();
        await this.usernameInput.fill(username);
        await this.usernameInput.press('Enter');
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.passwordInput.press('Enter');
        await this.signInButton.click();
    }
}

module.exports = { LoginPage };
