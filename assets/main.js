let btnsLeft = document.querySelectorAll('.currency_elements_left');
let btnsRight = document.querySelectorAll('.currency_elements_right');
let inpt = document.querySelector('.input_currency');
let baseCurrency = 'RUB', targetCurrency = 'USD';
let amount = 1;
let inptRight = document.querySelector('.money');
let money_txt = document.querySelectorAll('.money-txt');



inpt.addEventListener('input', () => {


    getValue(baseCurrency, targetCurrency, inpt.value);

});

inptRight.addEventListener('input', () => {


    getValue1(baseCurrency, targetCurrency, inptRight.value);

});


btnsLeft.forEach(button => {
    button.addEventListener('click', function () {
        baseCurrency = button.innerText
        btnsLeft.forEach(oldButton => {
            oldButton.classList.remove('active');
        });

        this.classList.add('active');


        // getValue(baseCurrency, targetCurrency, inpt.value);
        getValue1(baseCurrency, targetCurrency, inptRight.value)
    });
});

btnsRight.forEach(button => {
    button.addEventListener('click', function () {
        targetCurrency = button.innerText
        console.log(targetCurrency)
        btnsRight.forEach(oldButton => {
            oldButton.classList.remove('active');
        });

        this.classList.add('active');

        getValue(baseCurrency, targetCurrency, inpt.value);
    });
});


function getValue(baseCurrency, targetCurrency, amount) {

    let requestURL = `https://api.exchangerate.host/convert?from=${baseCurrency}&to=${targetCurrency}`;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        let response = request.response;
        // console.log(response);


        money_txt[0].innerText = `1 ${baseCurrency} = ${response.result} ${targetCurrency}`
        money_txt[1].innerText = `1 ${targetCurrency} = ${1 / response.result} ${baseCurrency}`


        if (Number(inpt.value) === 0) {
            inptRight.value = ''
        } else {
            
            inptRight.value = amount * response.result;
        }

    }

}


function getValue1(baseCurrency, targetCurrency, amount) {

    let requestURL = `https://api.exchangerate.host/convert?from=${targetCurrency}&to=${baseCurrency}`;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        let response = request.response;
        console.log(response);


        money_txt[0].innerText = `1 ${baseCurrency} = ${response.result} ${targetCurrency}`
        money_txt[1].innerText = `1 ${targetCurrency} = ${1 / response.result} ${baseCurrency}`

            console.log(amount)

            inpt.value = amount * response.result;
        

    }

}


getValue(baseCurrency, targetCurrency, amount);