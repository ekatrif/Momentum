import {getLanguage} from './changeLanguage.js';


const reloadButton = document.querySelector(".change-quote");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");

getQuote();

hideShowQuote();

reloadButton.addEventListener("click",getQuote);

async function getQuote() {
        const currentLanguage = getLanguage();
        try { 
        const url = "./../data/quotes.json";
        const res = await fetch(url);
        const data = await res.json();
        const randomNumber = Math.floor(Math.random() * data.length);
        switch (currentLanguage) {
            case "ru":
                quote.textContent = data[randomNumber].text_ru;
                author.textContent = data[randomNumber].author_ru;
                break;
            case "en":
                quote.textContent = data[randomNumber].text_en;
                author.textContent = data[randomNumber].author_en;;
                break;
        }
        }
        catch(err) {
            quote.textContent = `An error occurred while retrieving data, ${err}`;
            author.textContent = "";
        }

}

async function translateQuote() {
    const currentLanguage = getLanguage();
    const currentQuote = document.querySelector(".quote").innerText;
    try { 
        const url = "./../data/quotes.json";
        const res = await fetch(url);
        const data = await res.json();
        switch (currentLanguage) {
            case "ru":
                const filteredQuoteEn = data.filter(obj=>obj.text_en===currentQuote).length ? data.filter(obj=>obj.text_en===currentQuote) : data.filter(obj=>obj.text_ru===currentQuote);
                quote.textContent = filteredQuoteEn[0].text_ru;
                author.textContent = filteredQuoteEn[0].author_ru;
                break;
            case "en":
                const filteredQuoteRu = data.filter(obj=>obj.text_ru===currentQuote).length ? data.filter(obj=>obj.text_ru===currentQuote) : data.filter(obj=>obj.text_en===currentQuote);
                quote.textContent = filteredQuoteRu[0].text_en;
                author.textContent = filteredQuoteRu[0].author_en;
                break;
        }
        }
        catch(err) {
            quote.textContent = `An error occurred while retrieving data, ${err}`;
            author.textContent = "";
        }
}

function hideShowQuote() {
    const activeItems = localStorage.getItem("Hide/Show widgets");
    const quoteContainer = document.querySelector(".footer__center");
    if (!activeItems.includes("quote")) {
        quoteContainer.classList.add("hide")
    } else {
        quoteContainer.classList.remove("hide") 
    }
}



export {translateQuote, hideShowQuote};