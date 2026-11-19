const {Builder, By, until } = require('selenium-webdriver');
const AdminPage = require('../Pages/adminPage');
const LoginPage = require('../Pages/loginPage');
const DashboardPage = require('../Pages/dashboardPage');
const credentials = require('../Config/credentials');

describe('Admin Page Test dengan POM', function () {
    this.timeout(60000);
    let driver;
    let adminPage;
    let loginPage;
    let dashboardPage;

    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://opensource-demo.orangehrmlive.com');
        loginPage = new LoginPage(driver);
        adminPage = new AdminPage(driver);
        dashboardPage = new DashboardPage(driver);
        // Login sebelum mengakses halaman Admin
        await loginPage.login(credentials.validUser.username, credentials.validUser.password);
        // Klik menu Admin
        await dashboardPage.clickAdminMenu();
    });

    afterEach(async function () {
        if (driver) await driver.quit();
    });

    it('Filter user dengan status enable', async function () {
        await adminPage.enterUsername('Admin');
        await adminPage.selectStatus('Enabled');
        await adminPage.clickSearchButton();
        await driver.sleep(3000);
    })
    })
