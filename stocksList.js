//storing and creating a validator array
var queryReferenceURL = "https://api.iextrading.com/1.0/ref-data/symbols";
var validationList = [];
$.ajax({
  url: queryReferenceURL,
  method: 'GET'
}).then(function(response) {

//storing reference list in array
for (let i = 0; i < response.length; i++){
  validationList.push(response[i].symbol);
};

});

 

///Creating a loop to display the stocksList array
var stocksList = [ 'AAPL', 'AMD', 'TSLA', 'AMD', 'TWTR', 'QCOM', 'GE', 'CRM', 'ANF' ];
//Creating a loop for the stock array
var stocksListInit = function (){
    for (let i = 0; i < stocksList.length; i++) {
    $('.stockList').append(`<li class="list-group-item"><button type="button" class="btn btn-secondary stockbutton" value=${stocksList[i]}>${stocksList[i]}</button></li>`);
    };
    };

//Rendering the stock array list
const render = function () {
    $('.stockList').empty();
    console.log ("Rendered!");
    stocksListInit();
};

render();

var stockSymInput = function () {
  const stockSym = $("#addStock").val();
  const uStockSym = stockSym.toUpperCase();
  

  for (let i = 0; i < validationList.length; i++){
    if (uStockSym == validationList[i]) {
      console.log('WOOOPEEEE WE GOT A MATCH BRO')
      stocksList.push(uStockSym);
      $('.stockList').empty();
      stocksListInit();
    } 
  };
}

$('#add').on("click", stockSymInput);



//logic to capture value of the button that is clicked

//(".stockList").on("click", ".stockbutton", function(){
  //do something
//});

//$(".stockbutton").on("click", function(){
$(".stockList").on("click", ".stockbutton", function(){
       stockSymbol = $(this).val().trim();
       console.log("You clicked on " + stockSymbol);

       let queryURL = `https://api.iextrading.com/1.0/stock/${stockSymbol}/batch?types=quote,logo,news&range=1m&last=10`;
       console.log(validationList[42]); 
       //hitting api with the value of the button that is clicked
       $('.stockInfo').empty();
       $('.stockLogo').empty()

       $.ajax({
   url: queryURL, method: 'GET'
   }).then(function(response) {
   
  // Log the queryURL
  console.log(queryURL);


  
  //Creating variables to hold all the responses
  var logoURL = response.logo.url;
     console.log(logoURL);

  var companyName = response.quote.companyName;   
     console.log(companyName);

  var latestPrice = response.quote.latestPrice;
      console.log(latestPrice);
  
  var headline = [];
  
  for (let i = 0; i < response.news.length; i++){
    console.log(response.news[i].headline);
    headline.push(response.news[i].headline);

  };
 //rendering DIVs and content

  $('.stockLogo').append(`<img class="rounded float-left" src="${logoURL}" alt="companyLogo"><br>`);
  $('.stockInfo').append(`<div class="text-left"><h3>${companyName}</h3></div>`);
  $('.stockInfo').append(`<div class="text-left"><h3>$${latestPrice}</h3></div>`);
  $('.stockInfo').append(`<div class="text-left font-weight-bold">News headlines: <p></p></div>`);
  for (let i = 0; i < headline.length; i++){
    console.log(headline[i]);
    $('.stockInfo').append(`<div class="text-left"><p>${headline[i]}</p></div>`);;

  };



});
});
