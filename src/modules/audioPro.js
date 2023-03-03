import playList from './playList.js';

const player = document.querySelector(".player");
let currentTrackName = playList[0].title;


const audio = new Audio();
let currentTrack = 0;
let isPlaying = false;
let currentVolume = 0.5;
let currentTime = 0;
let progress;

if (localStorage.getItem("Player type")==="Pro") {
    cleanProPlayer();
    loadProPlayer();
};

function loadProPlayer() {
    const player = document.querySelector(".player");
    if (!player.innerHTML) {
        renderPlayer(); 
    }
    const listContainer = document.querySelector(".play-list");
    playList.forEach(el => {
        const li = document.createElement('li');
        li.classList.add("play-pro-item");
        li.textContent = el.title;
        listContainer.append(li);
    });

    listContainer.addEventListener("click", playPauseTrack);

    let currentTimeLength = playList[0].duration;
    const trackNameDiv = document.querySelector(".player__track-name");
    trackNameDiv.textContent = currentTrackName;
    const timeLengthContainer = document.querySelector(".time__length");
    timeLengthContainer.textContent = currentTimeLength;
    
    
    const play = document.querySelector(".play");
    const next = document.querySelector(".play-next");
    const prev = document.querySelector(".play-prev");

    play.addEventListener("click",playAudio);
    next.addEventListener("click",nextTrack);
    prev.addEventListener("click",prevTrack);

    const timeline = document.querySelector(".player__timeline");
    timeline.addEventListener("click", timelineHandler);

    const volumeSlider = document.querySelector(".volume-slider");
    volumeSlider.addEventListener('click', changeVolume);

    document.querySelector(".volume-button").addEventListener("click", muteAudio);

    progress = setInterval(() => {
        const progressBar = document.querySelector(".player__progress");
        progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
        document.querySelector(".time__current").textContent = getTimeCodeFromNum(
        audio.currentTime
    );
  }, 500);
}

function renderPlayer() {
    player.innerHTML = `<div class="player-controls-pro"><button class="play-prev player-icon"></button><button class="play player-icon"></button><button class="play-next player-icon"></button>
    <div class="volume-container"><div class="volume-button"><div class="volume volume-medium player-icon"></div></div><div class="volume-slider"><div class="volume-percentage"></div></div>
    </div></div><div class="player__track-name"></div><div class="player__timeline"><div class="player__progress"></div></div><div class="player__time">
    <div class="time__current">0:00</div><div class="time__divider">/</div><div class="time__length"></div></div><ul class="play-list"></ul>`;
}

function nextTrack() {
    currentTrack = currentTrack === playList.length-1 ? 0 : currentTrack+1;
    removeActiveClass();
    isPlaying = false;
    currentTime = 0;
    playAudio();
    const items = document.querySelectorAll(".play-pro-item");
    [...items].forEach(el=> {
        if (el.innerText === currentTrackName) {
            el.classList.add("item-active");
            el.classList.add("item-pause");
        } else {
            el.classList.remove("item-active");
            el.classList.remove("item-pause");
        }

    });
}

function prevTrack() {
    currentTrack = currentTrack === 0 ? playList.length-1 : currentTrack-1;
    removeActiveClass();
    isPlaying = false;
    currentTime = 0;
    playAudio();
    const items = document.querySelectorAll(".play-pro-item");
    [...items].forEach(el=> {
        if (el.innerText === currentTrackName) {
            el.classList.add("item-active");
            el.classList.add("item-pause");
        } else {
            el.classList.remove("item-active");
            el.classList.remove("item-pause");
        }

    });
}

function removeActiveClass() {
    const items = document.querySelectorAll(".play-pro-item");
    items.forEach(item=>item.classList.remove("item-active"));
}

function playAudio() {
    const play = document.querySelector(".play");
    if (!isPlaying) {
    isPlaying = true;
    audio.src = playList[currentTrack].src;
    currentTrackName = playList[currentTrack].title;
    const currentTrackContainer = document.querySelector(".player__track-name");
    currentTrackContainer.textContent = currentTrackName;
    audio.currentTime = currentTime;
    audio.play();
    audio.addEventListener("loadeddata", showTrackDuration);
    play.classList.add("pause");
    audio.addEventListener("ended",nextTrack);
    const items = document.querySelectorAll(".play-pro-item");
    [...items].forEach(el=> {
        if (el.innerText === currentTrackName) {
            el.classList.add("item-active");
            el.classList.toggle("item-pause");
        } else {
            el.classList.remove("item-active");
            el.classList.remove("item-pause");
        }

    });
    } else {
        pauseAudio();
        
    }

}

function showTrackDuration() {
    document.querySelector(".time__length").textContent = getTimeCodeFromNum(audio.duration);
    audio.volume = currentVolume;
}

function pauseAudio() {
    const play = document.querySelector(".play");
    currentTime = audio.currentTime;
    audio.pause();
    play.classList.remove("pause");
    isPlaying = false;
    const items = document.querySelectorAll(".play-pro-item");
    [...items].forEach(el=> {
        if (el.innerText === currentTrackName) {
            el.classList.remove("item-pause");
        }
    })

}

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }
  

function timelineHandler(e) {
    const timeline = document.querySelector(".player__timeline");
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}

function changeVolume(e) {
    const volumeSlider = document.querySelector(".volume-slider");
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    currentVolume = newVolume;
    document.querySelector(".volume-percentage").style.width = newVolume * 100 + '%';
}

function muteAudio() {
    const volumeEl = document.querySelector(".volume");
    audio.muted = !audio.muted;
    if (audio.muted) {
        volumeEl.classList.remove("volume-medium");
        volumeEl.classList.add("volume-mute");
    } else {
        volumeEl.classList.add("volume-medium");
        volumeEl.classList.remove("volume-mute");
    }
}

function cleanProPlayer() {
    const player = document.querySelector(".player");
    player.innerHTML = ``;
    audio.pause();
    clearInterval(progress);  
}

function playPauseTrack(e) {
    const items = document.querySelectorAll(".play-pro-item");
    [...items].forEach((el,index)=> {
        if (el === e.target) {
            currentTrack = index;
        }
    });
    [...items].forEach(el=> {
        if (el !== e.target) {
        el.classList.remove("item-active");
        el.classList.remove("item-pause");
        }
    });
    if (!e.target.classList.contains("item-pause") && !e.target.classList.contains("item-active")) {
        isPlaying = false;
        currentTime = 0;
        playAudio();
        e.target.classList.add("item-active");
        e.target.classList.add("item-pause");
    } else if (e.target.classList.contains("item-active")) {
        playAudio();
    } else {
        pauseAudio();
        isPlaying = false;
        e.target.classList.remove("item-pause");
    }

}

export {loadProPlayer, cleanProPlayer};