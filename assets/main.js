let btnsLeft = document.querySelectorAll('.currency_elements_left');
let btnsRight = document.querySelectorAll('.currency_elements_right');
let inpt = document.querySelector('input');
let baseCurrency = 'RUB', targetCurrency = 'USD';
let amount = 1;
let money_target = document.querySelector('.money');
let money_txt = document.querySelectorAll('.money-txt');



inpt.addEventListener('input', () => {


    getValue(baseCurrency, targetCurrency, inpt.value);

});

btnsLeft.forEach(button => {
    button.addEventListener('click', function () {
        baseCurrency = button.innerText
        console.log(baseCurrency)
        btnsLeft.forEach(oldButton => {
            oldButton.classList.remove('active');
        });

        this.classList.add('active');


        getValue(baseCurrency, targetCurrency, inpt.value);
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
        console.log(response);


        money_txt[0].innerText = `1 ${baseCurrency} = ${response.result} ${targetCurrency}`
        money_txt[1].innerText = `1 ${targetCurrency} = ${1 / response.result} ${baseCurrency}`


        if (Number(inpt.value) === 0) {
            money_target.innerText = ''
        } else {
            money_target.innerText = amount * response.result
        }
    }

}


getValue(baseCurrency, targetCurrency, amount);