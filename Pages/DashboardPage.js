const {By, until } = require('selenium-webdriver');


class DashboardPage {
    constructor(driver) {
        this.driver = driver;

        this.TextHeader = By.xpath("//h6[text()='Dashboard']");
    }

    async getTextHeader() {
        const header = await this.driver.wait(until.elementLocated(this.TextHeader), 10000);
        return await header.getText();
    }  
}
module.exports = DashboardPage;