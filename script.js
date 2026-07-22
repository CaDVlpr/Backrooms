const video = document.getElementById("video");


// GOOGLE DRIVE VIDEO
video.src =
"https://drive.google.com/uc?export=download&id=1AevCyt-osqPDQdu4zV2cL1A7MiBq6pFY";


// ELEMENTS

const play = document.getElementById("play");
const back = document.getElementById("back");
const forward = document.getElementById("forward");

const mute = document.getElementById("mute");
const volume = document.getElementById("volume");

const speed = document.getElementById("speed");
const speedText = document.getElementById("speedText");

const pip = document.getElementById("pip");
const fullscreen = document.getElementById("fullscreen");

const progress = document.querySelector(".progress");
const progressFilled = document.querySelector(".progress-filled");

const time = document.getElementById("time");



// SPEEDS

const speeds = [
0.5,
0.75,
1,
1.25,
1.5,
2
];

let speedIndex = 2;



// PLAY / PAUSE

play.onclick = () => {

    if(video.paused){

        video.play();

        play.innerHTML =
        '<i data-lucide="pause"></i>';

    }
    else{

        video.pause();

        play.innerHTML =
        '<i data-lucide="play"></i>';

    }

    lucide.createIcons();

};




// AUTO PLAY WHEN READY

video.onloadeddata = () => {

    video.play().catch(()=>{});

};




// TIME UPDATE

video.ontimeupdate = () => {


    if(!video.duration)
    return;


    let percent =
    (video.currentTime / video.duration) * 100;


    progressFilled.style.width =
    percent + "%";


    time.textContent =
    format(video.currentTime)
    +
    " / "
    +
    format(video.duration);



    localStorage.setItem(
        "video-position",
        video.currentTime
    );


};




// LOAD SAVED TIME

video.onloadedmetadata = () => {


    let saved =
    localStorage.getItem(
        "video-position"
    );


    if(saved){

        video.currentTime =
        Number(saved);

    }

};





function format(seconds){

    if(isNaN(seconds))
    return "0:00";


    let minutes =
    Math.floor(seconds / 60);


    let secs =
    Math.floor(seconds % 60);


    if(secs < 10)
    secs = "0" + secs;


    return minutes + ":" + secs;

}




// SKIP

back.onclick = () => {

    video.currentTime -= 10;

};



forward.onclick = () => {

    video.currentTime += 10;

};




// PROGRESS BAR

progress.onclick = (e) => {


    let width =
    progress.clientWidth;


    let click =
    e.offsetX;


    video.currentTime =
    (click / width)
    *
    video.duration;


};





// VOLUME

volume.oninput = () => {


    video.volume =
    volume.value / 100;


};





// MUTE

mute.onclick = () => {


    video.muted =
    !video.muted;


    if(video.muted){

        mute.innerHTML =
        '<i data-lucide="volume-x"></i>';

    }
    else{

        mute.innerHTML =
        '<i data-lucide="volume-2"></i>';

    }


    lucide.createIcons();

};





// SPEED

speed.onclick = () => {


    speedIndex++;


    if(speedIndex >= speeds.length){

        speedIndex = 0;

    }


    video.playbackRate =
    speeds[speedIndex];


    speedText.textContent =
    speeds[speedIndex] + "x";


};





// FULLSCREEN BUTTON

fullscreen.onclick = () => {


    const player =
    document.querySelector(".player");


    if(!document.fullscreenElement){

        player.requestFullscreen();

    }
    else{

        document.exitFullscreen();

    }


};





// PICTURE IN PICTURE

pip.onclick = async () => {


    try{

        await video.requestPictureInPicture();

    }

    catch(error){

        console.log(error);

    }


};





// KEYBOARD CONTROLS

document.addEventListener(
"keydown",
(e)=>{


    if(e.code === "Space"){

        e.preventDefault();

        play.click();

    }


    if(e.key === "ArrowRight"){

        video.currentTime += 5;

    }


    if(e.key === "ArrowLeft"){

        video.currentTime -= 5;

    }


    if(e.key === "m"){

        mute.click();

    }


    if(e.key === "f"){

        fullscreen.click();

    }


});





// SHOW ERRORS

video.onerror = () => {

    console.log(
    "Video failed to load. Google Drive may be blocking streaming."
    );

};
