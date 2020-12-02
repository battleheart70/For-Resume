const puppeteer = require('puppeteer'); 

async function testTaxiResult() {
	console.log('Запуск браузера');
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 10,
	}); // запуск браузера 
	
console.log('Создание новой вкладки в браузере');
    const page = await browser.newPage();

 console.log('Переход по ссылке');
    await page.goto('https://qa-routes.praktikum-services.ru/');

 console.log('Шаг 1: ввод часов и минут');
	const hoursInput = await page.$('#form-input-hour');
	await hoursInput.type('08'); // ввод в поле часы

	const minuteInput = await page.$('#form-input-minute');
	await minuteInput.type('00'); // ввод в поле минуты

console.log('Шаг 2: заполнение поля Откуда');
    const fromInput = await page.$('#form-input-from');
    await fromInput.type('Усачева, 3');

console.log('Шаг 3: заполнение поля Куда');
    const toInput = await page.$('#form-input-to');
    await toInput.type('Комсомольский проспект, 18');

    console.log('Шаг 4: выбор режима Свой');
    const routeMode = await page.$('#form-mode-custom');
    await routeMode.click();

    console.log('Шаг 5: выбор вида транспорта');
    const typeOfTransport = await page.$('#from-type-taxi');
    await typeOfTransport.click();

    console.log('Ожидание элемента с результатом');
    await page.waitForSelector('#result-time-price');

    console.log('Получение строки с результатом');
    const text = await page.$eval('#result-time-price', element => element.textContent);

    console.log('Проверка условия тест-кейса');
        if (text.startsWith('Такси')) {
        console.log('Успех. Текст содержит: ' + text);
    } else {
        console.log(`Ошибка. Текст не начинается со слова 'Такси'`)
    }

	await page.screenshot({path: 'testTaxiResult.png'}); // снятие скриншота 


    console.log('Закрытие браузера');
    await browser.close(); //закрытие браузера
}

testTaxiResult(); // вызов пустой функции, ничего не произошло  


//const hoursInput = await page.$('#form-input-hour'); // селектор часов
//await hoursInput.type('08'); // ввод в поле часы
//const minuteInput = await page.$('#form-input-minute'); // селектор часов
//await minuteInput.type('10'); // ввод в поле минуты
// const fromInput = await page.$('#form-input-from'); найти поле откуда
// await fromInput.type('Усачева, 3'); записать в поле откуда
// const toInput = await page.$('#form-input-to'); найти поле откуда
// await toInput.type('Комсомольский проспект, 18'); записать в поле откуда