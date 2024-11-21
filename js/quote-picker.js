async function getRandomQuotes() 
{
    const response = await fetch('../res/quotes.json');
    const quotes = await response.json();


    let qc = document.getElementById("quotesContainer");
    qc.innerHTML = '';

    const randomQuotes = getRandomElements(quotes, 5);
    randomQuotes.forEach((quote, index) => {
        const quoteElement = document.createElement('div');
        quoteElement.classList.add('quote');

        quoteElement.innerHTML =
                `<blockquote>"${quote.quote}"- ${quote.author}</blockquote>`;

        qc.appendChild(quoteElement);
    });
}


function getRandomElements(arr, n) 
{
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

getRandomQuotes();
