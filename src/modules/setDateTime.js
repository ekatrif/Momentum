import { getLanguage } from './changeLanguage.js';

const timeContainer = document.querySelector(".time");
const dateContainer = document.querySelector(".date");

showTime();

function showTime() {
    const activeItems = localStorage.getItem("Hide/Show widgets");
    if (!activeItems.includes("time")) {
        timeContainer.classList.add("hide")
    } else {
        timeContainer.classList.remove("hide") 
    }
    if (!activeItems.includes("date")) {
        dateContainer.classList.add("hide")
    } else {
        dateContainer.classList.remove("hide") 
    }
    let currentLanguage = getLanguage();
    const timeFormat = currentLanguage==="en" ? 'En-EN' : "Ru-RU";
    const dateFormat = currentLanguage==="en" ? 'en-En' : "ru-Ru";
    const date = new Date();
    const currentTime = date.toLocaleTimeString(timeFormat);
    timeContainer.textContent = currentTime;

    const options = {weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC'};
    let currentDate = date.toLocaleDateString(dateFormat, options);
    dateContainer.textContent = currentDate;
    setTimeout(showTime,1000);
}

export {showTime};