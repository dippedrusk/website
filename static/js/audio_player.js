const playPauseBtn = document.querySelector(".custom-audio-player.playpause");
const player = document.querySelector("audio.custom-audio-player");

playPauseBtn.onclick = function () {
  if (player.paused) {
    player.play();
    playPauseBtn.textContent = "Pause";
  } else {
    player.pause();
    playPauseBtn.textContent = "Play";
  }
};

player.ontimeupdate = function () {
  if (player.currentTime >= player.duration || player.paused) {
    player.pause();
    playPauseBtn.textContent = "Play";
  }
};
