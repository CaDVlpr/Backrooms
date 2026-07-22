const video = document.getElementById("video");

const videoURL = "https://drive.google.com/file/d/1AevCyt-osqPDQdu4zV2cL1A7MiBq6pFY/view?usp=sharing";

video.src = videoURL;



const play = document.getElementById("play");
const back = document.getElementById("back");
const forward = document.getElementById("forward");

const mute = document.getElementById("mute");
const volume = document.getElementById("volume");

const fullscreen = document.getElementById("fullscreen");
const pip = document.getElementById("pip");

const progress = document.querySelector(".progress");
const progressFilled = document.querySelector(".progress-filled");

const time = document.getElementById("time");



// PLAY PAUSE

play.onclick = () => {

    if(video.paused){

        video.play();
        play.innerHTML = '<i data-lucide="pause"></i>';

    }
    else{

        video.pause();
        play.innerHTML = '<i data-lucide="play"></i>';

    }

    lucide.createIcons();

};



// SKIP

back.onclick = () => {

    video.currentTime -= 10;

};


forward.onclick = () => {

    video.currentTime += 10;

};



// TIME

video.ontimeupdate = () => {

    let percent =
    (video.currentTime / video.duration) * 100;

    progressFilled.style.width = percent + "%";


    time.textContent =
    format(video.currentTime)
    +" / "+
    format(video.duration);


    localStorage.videoTime =
    video.currentTime;

};



function format(seconds){

    if(isNaN(seconds))
    return "0:00";


    let mins =
    Math.floor(seconds/60);

    let secs =
    Math.floor(seconds%60);


    if(secs < 10)
    secs="0"+secs;


    return mins+":"+secs;

}



// RESUME POSITION

video.onloadedmetadata = () => {

    if(localStorage.videoTime){

        video.currentTime =
        localStorage.videoTime;

    }

};



// SEEK

progress.onclick = e => {

    let width =
    progress.offsetWidth;


    let click =
    e.offsetX;


    video.currentTime =
    (click / width) * video.duration;

};



// VOLUME

volume.oninput = () => {

    video.volume =
    volume.value;

};



// MUTE

mute.onclick = () => {

    video.muted =
    !video.muted;

};



// SPEED

document.getElementById("speed").onclick = () => {

    video.playbackRate =
    video.playbackRate === 1
    ? 2
    : 1;

};



// FULLSCREEN

fullscreen.onclick = () => {

    video.requestFullscreen();

};



// PICTURE IN PICTURE

pip.onclick = async()=>{

    await video.requestPictureInPicture();

};



// KEYBOARD

document.onkeydown = e => {


    if(e.code==="Space"){

        e.preventDefault();
        play.click();

    }


    if(e.key==="ArrowRight")
    video.currentTime +=5;


    if(e.key==="ArrowLeft")
    video.currentTime -=5;


};
