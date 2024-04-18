function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function displayRandom() 
{
    var quoteContainer = document.getElementById("quote-container");
    var quotes = Array.from(quoteContainer.getElementsByTagName("p"));

    quotes.sort(() => Math.random() - 0.5);
    var randomQuotes = quotes.slice(0, 5);
    
    var randomQuotesContainer = document.getElementById("random-quotes");
    randomQuotesContainer.innerHTML = "<p>Cinci citate selectate aleatoriu: </p>";
    randomQuotes.forEach(function(quote){
        randomQuotesContainer.innerHTML += "<p class=\"q\">" + quote.innerText + "</p>";
    });

    var randomGifContainer = document.getElementById("random-gif");
    var rnd = 0;//getRandomInt(5);

    randomGifContainer.innerHTML = "<p><img src=\"./0_homepage/img/giphy" + rnd.toString() + ".gif\" alt=\"The sea\" style=\"float:right; padding-right: 1.25em; padding-bottom: 1.25em; max-width: 30%; height: auto;\"></p>"
    console.log(randomGifContainer.innerHTML);
}

window.onload = function() {
    displayRandom();
};
