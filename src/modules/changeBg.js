const body = document.querySelector("body");
const next = document.querySelector(".slide-next");
const prev = document.querySelector(".slide-prev");
const basePathGithub = "https://raw.githubusercontent.com/ekatrif/momentum/assets/images/";
const basePathUnsplash = "https://api.unsplash.com/photos/random?orientation=landscape";
const basePathFlickr = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=10d77bdb5849646e643bd1bf108714b8&extras=url_l&format=json&nojsoncallback=1";
const minNumber = 1;
const maxNumber = 20;

const timeOfDay = getTimeOfDay();

const randomNumber = random(minNumber,maxNumber);
let currentNumber = randomNumber;

const path = setNewPath(randomNumber);

changeImg();

function getTimeOfDay() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    if (currentHour < 6) {
        return "night";
    } else if (currentHour < 12) {
        return "morning";
    } else if (currentHour < 18) {
        return "afternoon";
    }
    else {return "evening"};
}

function random(min,max) {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
}

function setNewPath(random) {
    return basePathGithub + timeOfDay + "/" + numToStr(random) + ".jpg";
}

function changeBg(path) {
    const img = new Image();
    img.src = path;
    img.addEventListener('load', () => {
        body.style.backgroundImage = `url("${path}")`;
        })  
}

function numToStr(number) {
    return number < 10 ? `0${String(number)}` : String(number);
}

function nextImage() {
    currentNumber = currentNumber===20 ? 1 : currentNumber+1;    
    //Когда загружена, сменить фон
    let nextPath = setNewPath(currentNumber);
    changeBg(nextPath);
    
}

function prevImage() {
    currentNumber = currentNumber===1 ? 20 : currentNumber-1;
    //Когда загружена, сменить фон
    let prevPath = setNewPath(currentNumber);
    changeBg(prevPath);
}

function changeImg () {
    const photoSource = localStorage.getItem("Photo source");
    switch (photoSource) {
    case "Github":
        changeBg(path);
        next.removeEventListener("click", changeImg);
        prev.removeEventListener("click", changeImg);
        next.addEventListener("click", nextImage);
        prev.addEventListener("click", prevImage);
        break;

    case "Unsplash API":
        getLinkToImageUnsplash();
        next.removeEventListener("click", nextImage);
        prev.removeEventListener("click", prevImage);
        next.addEventListener("click", changeImg);
        prev.addEventListener("click", changeImg);
        break;

    case "Flickr API":
        getLinkToImageFlickr();
        next.removeEventListener("click", nextImage);
        prev.removeEventListener("click", prevImage);
        next.addEventListener("click", changeImg);
        prev.addEventListener("click", changeImg);
        break;
}
}


async function getLinkToImageUnsplash() {
    try {
    const url = basePathUnsplash + "&query=" + timeOfDay + "&client_id=" + "_x1Ur2-TQXKcaN86Zzfmmu1aqfAp69S7ZDegsVuVPK8";
    const res = await fetch(url);
    const data = await res.json();
    const imageUrl = data.urls.regular;
    const img = new Image();
    img.src = imageUrl;
    img.addEventListener('load', () => {
        body.style.backgroundImage = `url("${imageUrl}")`;
        })  
    }
    catch(err) {
        console.error(err);
    }
}

async function getLinkToImageFlickr() {
    try {
    const url = basePathFlickr + "&tags=" + timeOfDay;
    const res = await fetch(url);
    const data = await res.json();
    const randomNum = random(0,99);
    const imageUrl = data.photos.photo[randomNum].url_l;
    const img = new Image();
    img.src = imageUrl;
    img.addEventListener('load', () => {
        body.style.backgroundImage = `url("${imageUrl}")`;
        })  
    }
    catch(err) {
        console.error(err);
    }
}

function getImageByTags() {
    const photoSource = localStorage.getItem("Photo source");
    switch (photoSource) {
        case "Unsplash API":
        getImageByTagsUnsplash();
        next.removeEventListener("click", nextImage);
        prev.removeEventListener("click", prevImage);
        next.addEventListener("click", getImageByTags);
        prev.addEventListener("click", getImageByTags);
        break;

    case "Flickr API":
        getImageByTagsFlickr();
        next.removeEventListener("click", nextImage);
        prev.removeEventListener("click", prevImage);
        next.addEventListener("click", getImageByTagsFlickr);
        prev.addEventListener("click", getImageByTagsFlickr);
        break;
}
}

async function getImageByTagsUnsplash() {
    const tags = localStorage.getItem("Tags");
    try {
    const url = basePathUnsplash + "&query=" + tags + "&client_id=" + "_x1Ur2-TQXKcaN86Zzfmmu1aqfAp69S7ZDegsVuVPK8";
    const res = await fetch(url);
    const data = await res.json();
    const imageUrl = data.urls.regular;
    const img = new Image();
    img.src = imageUrl;
    img.addEventListener('load', () => {
        body.style.backgroundImage = `url("${imageUrl}")`;
        })  
    }
    catch(err) {
        console.error(err);
    }
}

async function getImageByTagsFlickr() {
    const tags = localStorage.getItem("Tags");
    try {
    const url = basePathFlickr + "&tags=" + tags;
    const res = await fetch(url);
    const data = await res.json();
    const randomNum = random(0,99);
    const imageUrl = data.photos.photo[randomNum].url_l;
    const img = new Image();
    img.src = imageUrl;
    img.addEventListener('load', () => {
        body.style.backgroundImage = `url("${imageUrl}")`;
        })  
    }
    catch(err) {
        console.error(err);
    }
}

export {changeImg, getImageByTags};