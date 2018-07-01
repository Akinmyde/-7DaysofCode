if (navigator.serviceWorker){
    navigator.serviceWorker.register('/sw.js').then(function(reg) {
        console.log("registered")
       if (reg.installing){
           console.log('installing')
       } else if(reg.waiting){
           console.log('waiting')
       } else if(reg.active){
           console.log('activating')
       }
    }).catch(function(err) {
        console.log('not registered',err)
    })
}


//let result = document.querySelector('.result');
let convertCurrency = document.querySelector('#convertCurrency');
let inputAmount = document.querySelector('#amount');
let inputCurrency = document.getElementById('inputCurrency');
let outputCurrency = document.querySelector('#outputCurrency');
let result = document.getElementById('result');


function showConverted() {
    let x = inputCurrency.selectedIndex;
    let y = outputCurrency.selectedIndex;
    let fromCurrency = encodeURIComponent(document.getElementsByTagName("option")[x].value);
    let toCurrency = encodeURIComponent(document.getElementsByTagName("option")[y].value);
    let query = fromCurrency + '_' + toCurrency;
    let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=y`;
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (newresponse) {
            let conversionRate = newresponse[query].val;
            let outputAmount = conversionRate * inputAmount.value;
          //  let conversionResult = `${fromCurrency}${inputAmount.value} is ${toCurrency}${outputAmount}`;
           //result.innerHTML = conversionResult;
           let conversionResult = outputAmount.toFixed(2);
            result.value=conversionResult;
        })
}

function GetData(data) {
    fetch('https://free.currencyconverterapi.com/api/v5/countries')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            let results = myJson.results;
            
            for (let val in results) {
                let child = document.createElement('option');
                child.setAttribute('value', results[val].currencyId);
                child.innerHTML = `${results[val].currencyId} - ${results[val].currencyName}`;
                data.appendChild(child);

            }
        })
}
window.onload = () => {
 LoadData()
}

function LoadData()
{
    GetData(inputCurrency);
    GetData(outputCurrency);
}
