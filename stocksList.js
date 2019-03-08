var stocksList = [ 'AAPL', 'AMD', 'TSLA' ];

///Creating a loop to display the stocksList array

//Creating a loop for the stock array
var stocksListInit = function (){
    for (let i = 0; i < stocksList.length; i++) {
    $('.stockList').append(`<button type="button" class="btn btn-secondary stockbutton" value=${stockList[i]}> ${stocksList[i]}</button>`);
    };
    };

//Rendering the stock array list
const render = function () {
    $('.stockList').empty();
    console.log ("Rendered!");
    stocksListInit();
};

render();

//3. When the user clicks on a button, the page should grab the company name, logo, price, and up to 10 news articles related to the stock from the iexTrading API and place them on the page.

let stockSymbol = aapl;
let queryURL = `https://api.iextrading.com/1.0/stock/market/batch?symbols='${stockSymbol}'&types=quote,logo,news&range=1m&last=10`;

 

$.ajax({
   url: queryURL,
   // Method type is 'GET' because we are retrieving data
   method: 'GET'
}).then(function(response) {
 
    console.log(response.AAPL.quote.companyName);
    console.log(response.AAPL.logo);
    console.log(response.AAPL.quote.latestPrice);
    console.log(response.AAPL.news[0].headline);

});

// Even listener for #add-stock button
$('#add-stock').on('click', addButton);


//get country code mexico

$(".stockbutton").on("click",function(){
    stockSymbol = $(this).val();
}

<button id