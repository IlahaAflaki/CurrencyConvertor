let btnsLeft = document.querySelectorAll('.currency_elements_left');
let btnsRight = document.querySelectorAll('.currency_elements_right');
let inpt = document.querySelector('.input_currency');
let baseCurrency = 'RUB', targetCurrency = 'USD';
let amount = 1;
let inptRight = document.querySelector('.money');
let money_txt = document.querySelectorAll('.money-txt');



inpt.addEventListener('input', () => {

    let letters = /^[A-Za-z]+$/;


    if (inpt.value.match(letters)) {
        inpt.value = ''
    } else {

        if (inpt.value.match(',')) {
            let newValue = inpt.value.replace(',', '.');
            inpt.value = newValue
        }

    }



    getValue(baseCurrency, targetCurrency, inpt.value);

});

inptRight.addEventListener('input', () => {

    let letters = /^[A-Za-z]+$/;


    if (inptRight.value.match(letters)) {
        inptRight.value = ''
    } else {

        if (inptRight.value.match(',')) {
            let newValue = inptRight.value.replace(',', '.');
            inptRight.value = newValue
        }

    }


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
        btnsRight.forEach(oldButton => {
            oldButton.classList.remove('active');
        });

        this.classList.add('active');

        getValue(baseCurrency, targetCurrency, inpt.value);
    });
});





function getValue(baseCurrency, targetCurrency, amount) {


    if (baseCurrency === targetCurrency) {

        inptRight.value = inpt.value

        money_txt[0].innerText = `1 ${baseCurrency} = 1 ${targetCurrency}`
        money_txt[1].innerText = `1 ${targetCurrency} = 1 ${baseCurrency}`

    } else {

        fetch(`https://api.exchangerate.host/convert?from=${baseCurrency}&to=${targetCurrency}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);

                money_txt[0].innerText = `1 ${baseCurrency} = ${data.result} ${targetCurrency}`
                money_txt[1].innerText = `1 ${targetCurrency} = ${1 / data.result} ${baseCurrency}`

                if (Number(inpt.value) === 0) {
                    inptRight.value = ''
                } else {

                    inptRight.value = amount * data.result;
                }

            })


        .catch(error => {
            inptRight.value = `Oops..Something is wrong!`;
            console.error('There was an error!', error);
        });


    }

}




function getValue1(baseCurrency, targetCurrency, amount) {

    if (baseCurrency === targetCurrency) {

        inpt.value = inptRight.value

        money_txt[0].innerText = `1 ${baseCurrency} = 1 ${targetCurrency}`
        money_txt[1].innerText = `1 ${targetCurrency} = 1 ${baseCurrency}`

    } else {

        fetch(`https://api.exchangerate.host/convert?from=${targetCurrency}&to=${baseCurrency}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);

            money_txt[0].innerText = `1 ${baseCurrency} = ${data.result} ${targetCurrency}`
            money_txt[1].innerText = `1 ${targetCurrency} = ${1 / data.result} ${baseCurrency}`

            inpt.value = amount * data.result;
            
        })

        .catch(error => {
            inpt.value = `Oops..Something is wrong!`;
            inpt.style.color = 'red';
            inpt.style.fontSize = '10px'
            console.error('There was an error!', error);
        });
        
    }
        
}


getValue(baseCurrency, targetCurrency, amount);




