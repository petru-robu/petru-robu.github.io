
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function random_quote() 
{
    var quoteContainer = document.getElementById("quote-container");
    var quotes = Array.from(quoteContainer.getElementsByTagName("p"));

    quotes.sort(() => Math.random() - 0.5);
    var randomQuotes = quotes.slice(0, 5);
    
    var randomQuotesContainer = document.getElementById("random-quotes");

    randomQuotes.forEach(function(quote){
        randomQuotesContainer.innerHTML += "<p class=\"q\">" + quote.innerText + "</p>";
    });   
}

window.onload = function() {
    random_quote();
};

