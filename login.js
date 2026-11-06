const { Builder, By, until } = require('selenium-webdriver');
const assert = require ('assert');

describe('Login Test', function(){
    this.timeout(60000);

    let driver;
    
    beforeEach(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        
        await driver.get('https://opensource-demo.orangehrmlive.com');
    })              
    
    afterEach(async function(){
        await driver.sleep(3000)
        await driver.quit();
    })

    it('Menampilkan Halaman Login', async function(){
        await driver.sleep(3000)

        let title = await driver.getTitle();
        console.log('OrangeHRM',title);
    })

    it('Login Sukses', async function(){
        let inputUsername = await driver.wait(until.elementLocated(By.xpath("//input[@name='username']"))
        ,10000);
        await inputUsername.sendKeys('Admin');

        let inputPassword = await driver.wait(until.elementLocated(By.xpath("//input[@name='password']")))
        await inputPassword.sendKeys('admin123');

        let loginButton = await driver.wait(until.elementLocated(By.xpath("//button[@type='submit']")))
        await loginButton.click();

        // menampilkan judul/header "Dashboard" di OrangeHRM muncul
        let dashboardHeader = await driver.wait(
            until.elementLocated(By.xpath("//h6[text()='Dashboard']")),
        10000
        );

        let headerText = await dashboardHeader.getText();
        console.log('Header Ditemukan:', headerText); 
    });

    it('Login gagal dengan password salah', async function(){
        let inputUsername = await driver.wait(until.elementLocated(By.xpath("//input[@name='username']"))
        ,10000);
        await inputUsername.sendKeys('Admin');

        let inputPassword = await driver.wait(until.elementLocated(By.xpath("//input[@name='password']")))
        await inputPassword.sendKeys('admin');

        let loginButton = await driver.wait(until.elementLocated(By.xpath("//button[@type='submit']")))
        await loginButton.click();
        
        let errorMessageElement = await driver.wait(until.elementLocated(By.xpath("//p[contains(@class, 'oxd-alert-content-text')]")),
        10000
        );

        let actualErrorMessage = await errorMessageElement.getText();
        console.log('Pesan Error Ditemukan:', actualErrorMessage);

        // 6. Validasi Assertion (Memastikan teks sesuai ekspektasi)
        assert.strictEqual(actualErrorMessage, 
        'Invalid credentials', 
        'Pesan error tidak sesuai!'
        );
    })
});
