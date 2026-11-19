const {By, until } = require('selenium-webdriver');


class DashboardPage {
    constructor(driver) {
        this.driver = driver;

        this.TextHeader = By.xpath("//h6[text()='Dashboard']");
        this.adminMenu = By.xpath("//span[text()='Admin']");

    }

    async getTextHeader() {
        const header = await this.driver.wait(until.elementLocated(this.TextHeader), 10000);
        return await header.getText();
    }  

    async clickAdminMenu() {
        let element = await this.driver.wait(until.elementLocated(this.adminMenu), 10000);
        await element.click();
    }
}
module.exports = DashboardPage;