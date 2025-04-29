
class CreateCustomerPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Customer creation
        this.createCustomerBtn = page.getByRole('button', { name: 'Create Customer' });
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.parkingProfileDropdown = page.getByLabel('Parking Profile *');
        this.vehiclesDropdown = page.getByLabel('No Of Vehicles *');
        this.companyDropdown = page.getByLabel('Select Company *');
        this.projectDropdownActivator = page.locator('.css-8mmkcg');
        this.apacheOption = page.getByText('Apache', { exact: true });
        this.saveContinueBtn = page.getByRole('button', { name: 'Save & Continue' });

        // Vehicle details
        this.makeModelInput = page.getByRole('textbox', { name: 'Make and Model' });
        this.licensePlateInput = page.getByRole('textbox', { name: 'License Plate' });
        this.colorInput = page.getByRole('textbox', { name: 'Color' });
        this.createBtn = page.getByRole('button', { name: 'Create' });

        // Search & delete
        this.searchBox = page.getByRole('textbox', { name: 'Search by Name,Company' });
        this.deleteLink = page.getByRole('button', { name: 'delete' });
        this.permanentDeleteCheckbox = page.getByRole('checkbox', { name: 'Permanently delete RFID card' });
        this.inactiveButton = page.getByRole('button', { name: 'Inactive' });
        this.toastMessage = this.page.locator('#root').getByText('Deleted Successfully');
    }
    async fillCustomerDetails() {

        const randomSuffix = Math.floor(Math.random() * 100000);
        const email = `test${randomSuffix}@gmail.com`;
        await this.createCustomerBtn.click();
        await this.firstNameInput.fill('Test');
        await this.lastNameInput.fill('12');
        await this.emailInput.fill('email');
        await this.parkingProfileDropdown.selectOption('Level 1');
        await this.vehiclesDropdown.selectOption('1');
        await this.companyDropdown.selectOption('Mccord');
        await this.projectDropdownActivator.click();
        await this.apacheOption.click();
        await this.emailInput.fill(email);
        await this.saveContinueBtn.click();
        return email; // Return the value
    }

    async fillVehicleDetails() {
        await this.makeModelInput.fill('crista');
        await this.licensePlateInput.fill('1234');
        await this.colorInput.fill('black');
        await this.createBtn.click();

    }
    async selectRowByEmail(email) {
        const searchBox = this.page.getByPlaceholder('Search by Name,Company');
        // Clear and type email character by character
        await searchBox.fill('');
        for (const char of email) {
            await searchBox.press(char);
            await this.page.waitForTimeout(100); // Optional delay for typing effect
        }

        // Wait for the row containing the email to appear
        const targetRow = this.page.locator('div[role="row"]', { hasText: email });
        await targetRow.waitFor({ timeout: 10000 });

        const isVisible = await targetRow.isVisible();
        if (isVisible) {
            const checkbox = targetRow.locator('input[type="checkbox"][aria-label="select-row-undefined"]');
            await checkbox.check();
            return true;
        } else {
            console.warn(`Row with email ${email} not found.`);
            return false;
        }
    }
    // async isToastMessageShown() {
    //     try {
    //         await this.toastMessage.waitFor({ timeout: 5000 });
    //         return true;
    //     } catch (error) {
    //         return false;
    //     }
    // }
  // In your Page Object file
async editAndUpdateRowByEmail(email) {
    // 1. Locate the row by email
    const targetRow = this.page.locator('div[role="row"]', { hasText: email });
    await targetRow.waitFor({ timeout: 5000 });
  
    // 2. Click the Edit button (based on your first screenshot)
    const editButton = targetRow.locator('img[alt="Edit"]');
    await editButton.waitFor({ timeout: 5000 });
    await editButton.click();
  
    // 3. Wait for the Update button in modal/form (based on your second screenshot)
    const updateButton = this.page.locator('input[type="submit"][value="Update"]');
    await updateButton.waitFor({ timeout: 5000 });
  
    // Optionally, update a field before clicking Update
    // await this.page.fill('input[name="email"]', 'newemail@example.com');
  
    // 4. Click the Update button
    await updateButton.click();
  }  
  
    async deleteCustomerByEmail(email) {
        // Select the first checkbox (assuming only one row matches after search)
        await this.selectRowByEmail(email);
        await this.deleteLink.click();
        await this.permanentDeleteCheckbox.check();
        await this.inactiveButton.click();
    }
async editCustomer(email){
    await this.selectRowByEmail(email);

}
}

module.exports = { CreateCustomerPage };
