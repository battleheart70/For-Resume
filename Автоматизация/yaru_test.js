const puppeteer = require('puppeteer');

async function testSearchResult() {

    const browser = await puppeteer.launch  (
        {
            headless: false,
            slowMo: 100,
        }
    );

    const page = await browser.newPage();
    await page.goto('https://ya.ru/');

    const searchField = await page.$('#text'); // choose input field
    await searchField.type('Автоматизация тестирования'); // type text input field

    const searchButton = await page.$('.button[type=submit]');
    await searchButton.click();

    await page.waitForNavigation();
    const  result = await page.$('.serp-item');
        if (result == null) {
            console.log('Результаты поиска не найдены');
        } else {
            console.log('Результаты поиска отобразились');
        }

        await page.screenshot({ path: 'page.png', fullPage: 'true' });
        await browser.close();
}
testSearchResult();