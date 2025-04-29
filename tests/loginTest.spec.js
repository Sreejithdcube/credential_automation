// loginTest.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

('User should be able to login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('harikrishnan.cb@dcubeai.com', 'test@123');

});
