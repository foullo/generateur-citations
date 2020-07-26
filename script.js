const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quotee From API
async function getQuote() {
    loading();
    //const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'https://api.quotable.io/random';
       try {
           const response = await fetch(apiUrl);
           const data = await response.json();
           //console.log(data.author);
            // Si il manque le nom de l'autheur, rajouter 'Inconnue'
           if (data.author === '') {
               authorText.innerText = 'Inconnue';
           } else {
               authorText.innerText = data.author;
           }
           // Reduire la taille de polices si on à un long texte
           if (data.content.length > 120) {
               quoteText.classList.add('long-quote');
           } else {
               quoteText.classList.remove('long-quote');
           }
           quoteText.innerText = data.content;
           // Stop Loader, Show Quote
           complete();
       } catch (error) {
           //getQuote();
           console.log('Whoops !!!', error);
       }

}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote()
//loading();
/*async function randomQuote() {
    const response = await fetch('https://api.quotable.io/random')
    const data = await response.json()
    console.log(`${data.content} —${data.author}`)
}
randomQuote()*/
