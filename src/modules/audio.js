import playList from './playList.js';

const player = document.querySelector(".player");

const audio = new Audio();
let currentTrack = 0;
let isPlaying = false;

if (localStorage.getItem("Player type")==="Original") {
    cleanPlayer();
    loadPlayer();
};

hideShowAudio();

function loadPlayer() {
    const player = document.querySelector(".player");
    if (!player.innerHTML) {
        renderPlayer(); 
    }
    const listContainer = document.querySelector(".play-list");
    playList.forEach(el => {
        const li = document.createElement('li');
        li.classList.add("play-item");
        li.textContent = el.title;
        listContainer.append(li);
    });
    const play = document.querySelector(".play");
    const next = document.querySelector(".play-next");
    const prev = document.querySelector(".play-prev");
    play.addEventListener("click",playAudio);
    next.addEventListener("click",nextTrack);
    prev.addEventListener("click",prevTrack);    
}

function renderPlayer() {
    const controls = document.createElement("div");
    controls.classList.add("player-controls");
    const prev = document.createElement("button");
    prev.classList.add("play-prev");
    prev.classList.add("player-icon");
    const next = document.createElement("button");
    next.classList.add("play-next");
    next.classList.add("player-icon");
    const playButton = document.createElement("button");
    playButton.classList.add("play");
    playButton.classList.add("player-icon");
    controls.append(prev,playButton,next);
    const ulPlaylist = document.createElement("ul");
    ulPlaylist.classList.add("play-list");
    player.append(controls,ulPlaylist);
}

function nextTrack() {
    currentTrack = currentTrack === playList.length-1 ? 0 : currentTrack+1;
    removeActiveClass();
    isPlaying = false;
    playAudio();
}

function prevTrack() {
    currentTrack = currentTrack === 0 ? playList.length-1 : currentTrack-1;
    removeActiveClass();
    isPlaying = false;
    playAudio();
}

function removeActiveClass() {
    const items = document.querySelectorAll(".play-item");
    items.forEach(item=>item.classList.remove("item-active"));
}

function playAudio() {
    const play = document.querySelector(".play");
    if (!isPlaying) {
    isPlaying = true;
    audio.src = playList[currentTrack].src;
    audio.currentTime = 0;
    audio.play();
    play.classList.add("pause");
    const items = document.querySelectorAll(".play-item");
    items[currentTrack].classList.add("item-active");
    audio.addEventListener("ended",nextTrack);
    } else {
        pauseAudio();
    }

}

function pauseAudio() {
    const play = document.querySelector(".play");
    audio.pause();
    play.classList.remove("pause");
    isPlaying = false;
}


function hideShowAudio() {
    const activeItems = localStorage.getItem("Hide/Show widgets");
    const playerContainer = document.querySelector(".player");
    if (!activeItems.includes("audio")) {
        playerContainer.classList.add("hide")
    } else {
        playerContainer.classList.remove("hide") 
    }
}

function cleanPlayer() {
    const player = document.querySelector(".player");
    player.innerHTML = ``;
    audio.pause();
}

export {loadPlayer,hideShowAudio,cleanPlayer};
