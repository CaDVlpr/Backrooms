const video = document.getElementById("video");


// YOUR GOOGLE DRIVE VIDEO

video.src =
"https://drive.google.com/uc?export=download&id=1AevCyt-osqPDQdu4zV2cL1A7MiBq6pFY";



const play =
document.getElementById("play");

const back =
document.getElementById("back");

const forward =
document.getElementById("forward");

const mute =
document.getElementById("mute");

const volume =
document.getElementById("volume");

const speed =
document.getElementById("speed");

const pip =
document.getElementById("pip");

const fullscreen =
document.getElementById("fullscreen");

const progress =
document.querySelector(".progress");

const progressFilled =
document.querySelector(".progress-filled");

const time =
document.getElementById("time");




// PLAY BUTTON

play.onclick = ()=>{

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




// AUTO PLAY WHEN LOADED

video.onloadeddata = ()=>{

video.play().catch(()=>{});

};




// TIME UPDATE

video.ontimeupdate = ()=>{


if(!video.duration)
return;


let percent =
(video.currentTime /
video.duration) * 100;


progressFilled.style.width =
percent+"%";


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





function format(seconds){

if(isNaN(seconds))
return "0:00";


let min =
Math.floor(seconds/60);


let sec =
Math.floor(seconds%60);


if(sec < 10)
sec="0"+sec;


return min+":"+sec;

}




// LOAD LAST POSITION

video.onloadedmetadata = ()=>{

let saved =
localStorage.getItem(
"video-position"
);


if(saved){

video.currentTime =
Number(saved);

}

};




// SEEK

progress.onclick=(e)=>{


let width =
progress.clientWidth;


video.currentTime =
(e.offsetX / width)
*
video.duration;


};





// SKIP

back.onclick=()=>{

video.currentTime-=10;

};


forward.onclick=()=>{

video.currentTime+=10;

};




// VOLUME

volume.oninput=()=>{

video.volume =
volume.value;

};





mute.onclick=()=>{

video.muted =
!video.muted;

};





// SPEED

speed.onclick=()=>{


if(video.playbackRate===1){

video.playbackRate=2;

}

else{

video.playbackRate=1;

}


};





// USER CONTROLLED FULLSCREEN

fullscreen.onclick=()=>{


if(!document.fullscreenElement){

document.querySelector(".player")
.requestFullscreen();

}

else{

document.exitFullscreen();

}


};





// PICTURE IN PICTURE

pip.onclick=async()=>{


try{

await video.requestPictureInPicture();

}

catch(e){}

};





// KEYBOARD

document.addEventListener(
"keydown",
(e)=>{


if(e.code==="Space"){

e.preventDefault();

play.click();

}


if(e.key==="ArrowRight")
video.currentTime+=5;


if(e.key==="ArrowLeft")
video.currentTime-=5;


if(e.key==="m")
mute.click();


}
);
