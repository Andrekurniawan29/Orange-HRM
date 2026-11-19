const { By, until } = require ('selenium-webdriver');

class adminPage {
    constructor(driver) {
    this.driver = driver;

    this.addButon = By.xpath("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']");
    this.usernameInput = By.xpath("//input[@placeholder='Type for hints...']");
    this.selectUserRole = By.xpath("//div[@class='oxd-select-text oxd-select-text--active']/div[@class='oxd-select-text-input']");
    this.adminRoleOption = By.xpath("//div[@role='listbox']//span[text()='Admin']");
    this.essRoleOption = By.xpath("//div[@role='listbox']//span[text()='ESS']");
    this.employeeNameInput = By.xpath("//input[@placeholder='Employee Name']");
    this.selectStatus = By.xpath("//div[@class='oxd-select-text oxd-select-text--active']/div[@class='oxd-select-text-input']");
    this.enableStatusOption = By.xpath("//div[@role='listbox']//span[text()='Enabled']");
    this.disableStatusOption = By.xpath("//div[@role='listbox']//span[text()='Disabled']");
    this.resetButton = By.xpath("//button[@type='reset']");
    this.searchButton = By.xpath("//button[@type='submit']");
    }


    async clickAddButton() {
        let button = await this.driver.wait(until.elementLocated(this.addButton), 10000);
        await button.click();
    }

    async enterUsername(username) {
        let element = await this.driver.wait(until.elementLocated(this.usernameInput), 10000);
        await element.clear();
        await element.sendKeys(username);
    }

    async selectAdminRole() {
        let select = await this.driver.wait(until.elementLocated(this.selectUserRole), 10000);
        await select.click();
        let option = await this.driver.wait(until.elementLocated(this.adminRoleOption), 10000);
        await option.click();
    }

    async selectEssRole() {
        let select = await this.driver.wait(until.elementLocated(this.selectUserRole), 10000);
        await select.click();
        let option = await this.driver.wait(until.elementLocated(this.essRoleOption), 10000);
        await option.click();
    }

    async enterEmployeeName(employeeName) {
        let element = await this.driver.wait(until.elementLocated(this.employeeNameInput), 10000);
        await element.clear();
        await element.sendKeys(employeeName);
    }

    async selectEnabledStatus() {
        let select = await this.driver.wait(until.elementLocated(this.selectStatus), 10000);
        await select.click();
        let option = await this.driver.wait(until.elementLocated(this.enableStatusOption), 10000);
        await option.click();
    }

    async selectDisabledStatus() {
        let select = await this.driver.wait(until.elementLocated(this.selectStatus), 10000);
        await select.click();
        let option = await this.driver.wait(until.elementLocated(this.disableStatusOption), 10000);
        await option.click();
    }

    async clickResetButton() {
        let button = await this.driver.wait(until.elementLocated(this.resetButton), 10000);
        await button.click();
    }

    async clickSearchButton() {
        let button = await this.driver.wait(until.elementLocated(this.searchButton), 10000);
        await button.click();
    }

}
module.exports = adminPage;