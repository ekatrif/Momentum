import {getLanguage} from './changeLanguage.js';

const greetingContainer = document.querySelector(".greeting");
const nameInput = document.querySelector(".name");

//Перед перезагрузкой страницы сохраняем имя
window.addEventListener('beforeunload', setLocalStorage);

//При загрузке страницы извлекаем сохраненное в Localstorage
window.addEventListener('load', getLocalStorage);

getGreeting();

hideShowGreeting();

function setLocalStorage() {
    if (nameInput.value) {
    localStorage.setItem('name', nameInput.value);
    }
}

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        nameInput.value = localStorage.getItem('name');
    }
}

function getGreeting() {
    const greetingText = getTimeOfDay();
    greetingContainer.textContent = greetingText;
    // setInterval(getGreeting,1000);
}

function getTimeOfDay() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    let currentLanguage = getLanguage();
    switch (currentLanguage) {
        case "ru":
            if (currentHour < 6) {
                return "Доброй ночи";
            } else if (currentHour < 12) {
                return "Доброе утро";
            } else if (currentHour < 18) {
                return "Добрый день";
            }
            else {return "Добрый вечер"};
            break;
    
        case "en":
            if (currentHour < 6) {
                return "Good night";
            } else if (currentHour < 12) {
                return "Good morning";
            } else if (currentHour < 18) {
                return "Good afternoon";
            }
            else {return "Good evening"};
            break;
    }
    
}

function hideShowGreeting() {
    const activeItems = localStorage.getItem("Hide/Show widgets");
    const greeting = document.querySelector(".greeting-container");
    if (!activeItems.includes("greeting")) {
        greeting.classList.add("hide")
    } else {
        greeting.classList.remove("hide") 
    }
}

export {getGreeting,hideShowGreeting};