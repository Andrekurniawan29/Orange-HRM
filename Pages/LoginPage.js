const { By, until } = require('selenium-webdriver');

class loginPage {
    constructor(driver) {
        this.driver = driver;
        // Lokator Elemen
        this.usernameInput = By.xpath("//input[@name='username']");
        this.passwordInput = By.xpath("//input[@name='password']");
        this.loginButton = By.xpath("//button[@type='submit']");
        this.errorMessage = By.xpath("//p[contains(@class, 'oxd-alert-content-text')]");
        this.errorMessageUsername = By.xpath("//span[text()='Required']");
        this.errorMessagePassword = By.xpath("//span[text()='Required']");
    }

    async enterUsername(username) {
        let element = await this.driver.wait(until.elementLocated(this.usernameInput), 10000);
        await element.clear();
        await element.sendKeys(username);
    }

    async enterPassword(password) {
        let element = await this.driver.findElement(this.passwordInput);
        await element.clear();
        await element.sendKeys(password);
    }

    async clickLogin() {
        let button = await this.driver.findElement(this.loginButton);
        await button.click();
    }

    // Helper Method: Melakukan alur login dalam satu panggilan
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin(3000);
    }

    async getErrorMessage() {
        let element = await this.driver.wait(until.elementLocated(this.errorMessage), 10000);
        return await element.getText();
    }

    async getErrorMessageUsername() {
        let element = await this.driver.wait(until.elementLocated(this.errorMessageUsername), 10000);
        return await element.getText();
    }

    async getErrorMessagePassword() {
        let element = await this.driver.wait(until.elementLocated(this.errorMessagePassword), 10000);
        return await element.getText();
    }
}

module.exports = loginPage;