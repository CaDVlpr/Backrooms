const fullscreen =
document.getElementById("fullscreen");


fullscreen.onclick = () => {

    const player =
    document.querySelector(".player");


    if (!document.fullscreenElement) {

        player.requestFullscreen();

    } else {

        document.exitFullscreen();

    }

};
