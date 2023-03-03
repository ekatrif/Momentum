import {getLanguage} from './changeLanguage.js';

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector(".city");
const error = document.querySelector(".weather-error");
const defaultCity = "Minsk";

getLocalStorage();
getWeather();

//Перед перезагрузкой страницы сохраняем город
window.addEventListener('beforeunload', setLocalStorage);

//При загрузке страницы извлекаем сохраненное в Localstorage
window.addEventListener('load', getLocalStorage);

//При вводе нового города в input получаем погоду
city.addEventListener("change", getWeather);

hideShowWeather();

function setLocalStorage() {
    city.value ? localStorage.setItem('city', city.value) :  localStorage.setItem('city', defaultCity);
}

function getLocalStorage() {
    city.value = localStorage.getItem('city') ? localStorage.getItem('city') : defaultCity;
}

async function getWeather() {
    let currentLanguage = getLanguage(); 
    try { 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${currentLanguage}&appid=2e637b43ddb8c25679fa7373b4ca3b2a&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    city.value = data.name;
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    const windSpeedTitle = currentLanguage ==="en" ? "Wind speed" : "Скорость ветра";
    const windSpeedUnits = currentLanguage ==="en" ? "m/s" : "м/c";
    const humidityTitle = currentLanguage ==="en" ? "Humidity" : "Влажность";
    error.textContent = "";
    wind.textContent = `${windSpeedTitle}: ${Math.round(data.wind.speed)} ${windSpeedUnits}`;
    humidity.textContent = `${humidityTitle}: ${Math.round(data.main.humidity)}%` 
    }
    catch(err) {
        error.textContent = `An error occurred while retrieving data, ${err}`;
        city.value = "";
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = ``;
        weatherDescription.textContent = "";
        wind.textContent = ``;
        humidity.textContent = ``;
    }    
}

function hideShowWeather() {
    const activeItems = localStorage.getItem("Hide/Show widgets");
    const weatherContainer = document.querySelector(".weather");
    if (!activeItems.includes("weather")) {
        weatherContainer.classList.add("hide")
    } else {
        weatherContainer.classList.remove("hide") 
    }
}

export {getWeather, hideShowWeather};
