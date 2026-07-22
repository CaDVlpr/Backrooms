const video=document.getElementById("video");


video.src =
"https://drive.google.com/uc?export=download&id=1AevCyt-osqPDQdu4zV2cL1A7MiBq6pFY";


const play=document.getElementById("play");
const back=document.getElementById("back");
const forward=document.getElementById("forward");

const mute=document.getElementById("mute");
const volume=document.getElementById("volume");

const speed=document.getElementById("speed");
const pip=document.getElementById("pip");

const progress=document.querySelector(".progress");
const filled=document.querySelector(".progress-filled");

const time=document.getElementById("time");



play.onclick=()=>{

if(video.paused){
video.play();
play.innerHTML='<i data-lucide="pause"></i>';
}
else{
video.pause();
play.innerHTML='<i data-lucide="play"></i>';
}

lucide.createIcons();

};



video.ontimeupdate=()=>{

let percent=
(video.currentTime/video.duration)*100;

filled.style.width=percent+"%";


time.textContent=
format(video.currentTime)
+" / "+
format(video.duration);


localStorage.setItem(
"position",
video.currentTime
);

};



video.onloadedmetadata=()=>{

let saved=
localStorage.getItem("position");

if(saved)
video.currentTime=saved;

};



function format(t){

if(isNaN(t)) return "0:00";

let m=Math.floor(t/60);
let s=Math.floor(t%60);

if(s<10)s="0"+s;

return m+":"+s;

}



progress.onclick=e=>{

let width=progress.offsetWidth;

video.currentTime=
(e.offsetX/width)*video.duration;

};



back.onclick=()=>{
video.currentTime-=10;
};


forward.onclick=()=>{
video.currentTime+=10;
};



volume.oninput=()=>{

video.volume=volume.value;

};



mute.onclick=()=>{

video.muted=!video.muted;

};



speed.onclick=()=>{

video.playbackRate =
video.playbackRate===1 ? 2 : 1;

};



pip.onclick=async()=>{

if(document.pictureInPictureEnabled)
await video.requestPictureInPicture();

};



document.onkeydown=e=>{

if(e.code==="Space"){
e.preventDefault();
play.click();
}


if(e.key==="ArrowRight")
video.currentTime+=5;


if(e.key==="ArrowLeft")
video.currentTime-=5;

};
