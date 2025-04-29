const { test, expect } = require('@playwright/test');
const { CreateCustomerPage } = require('../pages/customers');
const { LoginPage } = require('../pages/loginPage');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('harikrishnan.cb@dcubeai.com', 'test@123');
});

test('Create and delete a customer by email', async ({ page }) => {
    const customerPage = new CreateCustomerPage(page);

    // Step 1: Create Customer
    const createdEmail = await customerPage.fillCustomerDetails(); // Capture the created email
    await customerPage.fillVehicleDetails();

    // Step 3: Delete Customer
    await customerPage.deleteCustomerByEmail(createdEmail);
   // expect(await CreateCustomerPage.isToastMessageShown()).toBe(true);
});