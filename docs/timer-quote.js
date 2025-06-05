let i = 0;
const quote1 = document.getElementById('quote1');
const quote2 = document.getElementById('quote2');
const quote3 = document.getElementById('quote3');
const arr = [quote1, quote2, quote3];
function switchQuote() {
    arr[i].classList.remove('visible');
    i++;
    if (i == 3) {
        i = 0
    };
    console.log(i);
    arr[i].classList.add('visible');


    
    
};
setInterval(switchQuote, 10000);
