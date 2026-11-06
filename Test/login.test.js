const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const LoginPage = require('../Pages/LoginPage');
const credentials = require('../Config/credentials');
const DashboardPage = require('../Pages/DashboardPage');


describe('Login Test dengan POM', function () {
    this.timeout(60000);
    let driver;
    let loginPage;
    let dashboardPage;

    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://opensource-demo.orangehrmlive.com');
        loginPage = new LoginPage(driver);
        dashboardPage = new DashboardPage(driver);
    });

    afterEach(async function () {
        if (driver) await driver.quit();
    });

    it('Login Sukses dengan Kredensial Valid', async function () {
        // Menggunakan method login & data validUser
        await loginPage.login(credentials.validUser.username, credentials.validUser.password);
        await driver.sleep(3000);
        // validasi header dashboard muncul setelah login sukses
        const header = await dashboardPage.getTextHeader();
        assert.strictEqual(header, 'Dashboard', 'Header Dashboard harus ditampilkan');
     });

    it('Login Gagal dengan Kredensial Invalid', async function () {
        // Menggunakan method login & data invalidUser
        await loginPage.login(credentials.invalidUser.username, credentials.invalidUser.password);

        // Validasi Pesan Error
        let actualError = await loginPage.getErrorMessage();
        assert.strictEqual(actualError, credentials.invalidUser.expectedError);
    });

    it('login gagal dengan username kosong', async function () {
        await loginPage.login('', credentials.validUser.password);
        await driver.sleep(1500);
      
        const errorText = await loginPage.getErrorMessageUsername();
        assert.strictEqual(errorText, 'Required', 'Pesan error username harus muncul');
        await driver.sleep(1500);
    });

    it('login gagal dengan password kosong', async function() {
        await loginPage.login(credentials.validUser.username, '');
        await driver.sleep(1500);

        const errorText = await loginPage.getErrorMessagePassword();
        assert.strictEqual(errorText, 'Required', 'Pesan error password harus muncul');
        await driver.sleep(1500);
    })

    it('login gagal dengan langsung klik tombol login', async function(){
        await loginPage.login('', '');
        await driver.sleep(1500);

        const errorText = await loginPage.getErrorMessageUsername();
        assert.strictEqual(errorText, 'Required', 'Pesan error username harus muncul');

        const errorText2 = await loginPage.getErrorMessagePassword();
        assert.strictEqual(errorText2, 'Required', 'Pesan error password harus muncul');
        await driver.sleep(1500);
    })
});