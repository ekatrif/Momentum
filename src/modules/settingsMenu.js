import { settings } from './settings.js';
import {getGreeting,hideShowGreeting} from "./hello.js";
import {translateQuote, hideShowQuote} from "./quote.js";
import {getWeather, hideShowWeather} from "./weather.js";
import { changeImg } from './changeBg.js';
import { getImageByTags } from './changeBg.js';
import { hideShowAudio, loadPlayer, cleanPlayer } from './audio.js';
import { loadProPlayer, cleanProPlayer } from './audioPro.js';
import { hideShowTodo } from './todo.js';

const settingsButton = document.querySelector(".footer__left");
const settingsMenu = document.querySelector(".settings");
const options = document.querySelector(".options");
const values = document.querySelector(".values");


settingsButton.addEventListener("click", openMenu);
window.addEventListener("click", closeMenu);

function closeMenu(e) {
    // если этот элемент или его родительские элементы не меню и не кнопка
    if (settingsButton.classList.contains("footer__left-active")&&!e.target.closest('.settings') && !e.target.closest('.footer__left')) {
        settingsButton.classList.toggle("footer__left-active");
        settingsMenu.classList.toggle("settings-active");
    }
}

function openMenu() {
    if (document.querySelector(".options__list")) {
        document.querySelector(".options__list").remove();
    }
    if (document.querySelector(".values__tags")) {
        document.querySelector(".values__tags").remove();
    }
    settingsButton.classList.toggle("footer__left-active");
    settingsMenu.classList.toggle("settings-active");
    const ul = document.createElement('ul');
    ul.classList.add("options__list");
    options.append(ul);    
    settings.forEach(function(obj) {
        const li = document.createElement('li');
        li.classList.add("options__item");
        li.textContent = obj.name_en;
        ul.append(li);
    });
    document.querySelector(".options__item").classList.add("options__item-active");
    //show settings values for the 1 option
    if (document.querySelector(".values__list")) {
        document.querySelector(".values__list").remove();
    }
    const ulValues = document.createElement('ul');
    ulValues.classList.add("values__list");
    values.append(ulValues);    
    const firstSetting = settings[0];
    firstSetting.options.forEach(function(value) {
        const li = document.createElement('li');
        li.classList.add("values__item");
        li.textContent = value;
        if (value===localStorage.getItem(firstSetting.name_en)) {
            li.classList.add("values__item-active");
        }
        ulValues.append(li);
    })    
    setActiveValue();  
    setActiveItem();
}

function setActiveItem() {
    const ul = document.querySelector(".options__list");
    ul.addEventListener("click", showSettingsValues);     
}

function showSettingsValues(e) {
    if (document.querySelector(".values__list")) {
        document.querySelector(".values__list").remove();
    }
    if (document.querySelector(".values__tags")) {
        document.querySelector(".values__tags").remove();
    }
    const items = document.querySelectorAll(".options__item");
    if (e.target.classList.contains("options__item")) {
        //add active class
        [...items].forEach(function(item) {
            item.classList.remove("options__item-active")
        });
        e.target.classList.add("options__item-active");
        //show settings values
        const ul = document.createElement('ul');
        ul.classList.add("values__list");
        values.append(ul);    
        //Отображаем настроки Language
        if (e.target.innerText === settings[0].name_en||e.target.innerText === settings[0].name_ru)
        {
            settings[0].options.forEach(function(value) {
                const li = document.createElement('li');
                li.classList.add("values__item");
                li.textContent = value;
                if (value===localStorage.getItem(settings[0].name_en)) {
                    li.classList.add("values__item-active");
                }
                ul.append(li);
            })
        }
        //Отображаем настройки Photo source
        if (e.target.innerText === settings[1].name_en||e.target.innerText === settings[1].name_ru)
        {
            settings[1].options.forEach(function(value) {
                const li = document.createElement('li');
                li.classList.add("values__item");
                li.textContent = value;
                if (value===localStorage.getItem(settings[1].name_en)) {
                    li.classList.add("values__item-active");
                }
                ul.append(li);
            })
        }
        //Отображаем настройки Hide/Show
        if (e.target.innerText === settings[2].name_en||e.target.innerText === settings[2].name_ru)
        {
            settings[2].options.forEach(function(value) {
                const activeItems = localStorage.getItem("Hide/Show widgets");
                ul.classList.add("widgets");
                if (activeItems.includes(value.toLowerCase())) {
                    const li = document.createElement('li');
                    li.classList.add("widgets__item");
                    li.textContent = value;
                    ul.append(li);
                    const span = document.createElement("span");
                    span.classList.add("slider");
                    span.classList.add("slider-active");
                    li.append(span);
                    span.innerHTML = `<svg class="switch switch-active" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50"></circle></svg>`
                } else {
                const li = document.createElement('li');
                li.classList.add("widgets__item");
                li.textContent = value;
                ul.append(li);
                const span = document.createElement("span");
                span.classList.add("slider");
                li.append(span);
                span.innerHTML = `<svg class="switch" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50"></circle></svg>`
                }
                
            })
            const ulWidgets = document.querySelector(".widgets");
            ulWidgets.addEventListener("click", showHideWidgets);
        }
        //Отображаем настроки Плеера
        if (e.target.innerText === settings[3].name_en||e.target.innerText === settings[3].name_ru)
        {
            settings[3].options.forEach(function(value) {
                const li = document.createElement('li');
                li.classList.add("values__item");
                li.textContent = value;
                if (value===localStorage.getItem(settings[3].name_en)) {
                    li.classList.add("values__item-active");
                }
                ul.append(li);
            })
        }
        setActiveValue();

    }
    const activeValue = document.querySelector(".values__item-active");
    if (activeValue&&(activeValue.innerText=== "Unsplash API"||activeValue.innerText === "Flickr API")) {
        drawTags();
    }
    
}
function showHideWidgets(e) {
    toggleSlider(e);
    saveStatement(e);
    reloadWidgets();
}

function toggleSlider(e) {
    const slider = e.target.closest(".widgets__item").querySelector(".slider");
    slider.classList.toggle("slider-active");
    const sliderSwitch = e.target.closest(".widgets__item").querySelector(".switch");
    sliderSwitch.classList.toggle("switch-active");
}

function saveStatement(e) {
    const array = [];
    const activeSliders = document.querySelectorAll(".slider-active");
    [...activeSliders].forEach(function(item) {
        array.push(item.closest(".widgets__item").innerText.toLowerCase())
    })
    localStorage.setItem("Hide/Show widgets",array);
}

function setActiveValue() {    
    const ul = document.querySelector(".values__list");
    ul.addEventListener("click", setValue); 
}

function setValue(e) {
    if (document.querySelector(".values__tags")) {
        document.querySelector(".values__tags").remove();
    }
    if (e.target.classList.contains("values__item")) {
        const option = settings.filter(obj=>
            obj.options.includes(e.target.innerText))
        localStorage.setItem(option[0].name_en, e.target.innerText);
    }
    const items = document.querySelectorAll(".values__item"); 
    [...items].forEach(function(item) {
        item.classList.remove("values__item-active");
    })
    e.target.classList.add("values__item-active");
    
    //Если изменился язык, обновить виджеты, которые нужно перевести
    if (e.target.innerText === localStorage.getItem("Language")) {
        reloadTranslations();
    }
    if (e.target.innerText === localStorage.getItem("Photo source")) {
        changeImg();
    }
    if (e.target.innerText === "Unsplash API"||e.target.innerText === "Flickr API") {
        drawTags();
    }
    if (e.target.innerText === "Original"||e.target.innerText === "Pro") {
        selectPlayer();
    }

}

function drawTags() {
    if (document.querySelector(".values__tags")) {
        document.querySelector(".values__tags").remove();
    }
    const div = document.createElement("div");
    div.classList.add("values__tags");
    values.append(div);
    const input = document.createElement("input");
    input.classList.add("values__input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "tags separated by commas");
    div.append(input);
    const button = document.createElement("a");
    button.classList.add("values__button");
    button.textContent = "Save";
    div.append(button);
    const buttonSave = document.querySelector(".values__button");
    buttonSave.addEventListener("click", saveTags);
}

function saveTags() {
    const input = document.querySelector(".values__input");
    localStorage.setItem("Tags", input.value);
    getImageByTags();
}

function reloadTranslations() {
    getGreeting();
    translateQuote();
    getWeather();
}

function reloadWidgets() {
    hideShowGreeting();
    hideShowQuote();
    hideShowWeather();
    hideShowAudio();
    hideShowTodo();
}

function selectPlayer() {
    const playerType = localStorage.getItem("Player type");
    if (playerType==="Original") {
        cleanPlayer();
        cleanProPlayer();
        loadPlayer();
    } else {
        cleanPlayer();
        cleanProPlayer();
        loadProPlayer();
    }
}