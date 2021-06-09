const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currenTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const videoTimeline = document.getElementById("timeline")
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
let volumeValue = 0.5
video.volume = volumeValue;

//  video play, pause function
const handlePlayClick = (e) => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtn.innerText = video.paused ? "Play" : "Pause";
};

// mute function
const handleMute = (e) => {
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : volumeValue;
};

// video volumn change function
const handleVolumeChange = (event) => {
    const { target: { value } } = event;
    if (video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    volumeValue = value;
    video.volume = value;
}

// video time function
const formatTime = (seconds) => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
}
const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(video.duration);
    videoTimeline.max = Math.floor(video.duration);
}
const handleTimeUpdate = () => {
    currenTime.innerText = formatTime(video.currentTime);
    videoTimeline.value = Math.floor(video.currentTime);
}
const handleVideoTimeline = (event) => {
    const { target: { value } } = event;
    video.currentTime = value;
}
const handleFullScreen = () => {
    const fullscreen = document.fullscreenElement;
    if (fullscreen) {
        document.exitFullscreen();
        fullScreenBtn.innerText = "Enter Full Screen";
    } else {
        videoContainer.requestFullscreen();
        fullScreenBtn.innerText = "Exit Full Screen";
    }
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
videoTimeline.addEventListener("input", handleVideoTimeline);
fullScreenBtn.addEventListener("click", handleFullScreen);