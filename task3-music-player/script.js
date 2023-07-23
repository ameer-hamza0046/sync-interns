///////////// global variables
const playPauseIcon = document.querySelector("#play-pause");
const currentTimeElement = document.querySelector("#current-time");
const durationElement = document.querySelector("#duration");
const timeRange = document.querySelector("#time-range");
const muteIcon = document.querySelector("#mute-nomute");
const volumeRange = document.querySelector("#volume-range");
const audioPath = "./rain-and-thunder.mp3";
let audioDuration = 0;
const audio = new Audio(audioPath);

const icon = {
  play: "https://img.icons8.com/?size=512&id=398&format=png",
  pause: "https://img.icons8.com/?size=512&id=403&format=png",
  noMute: "https://img.icons8.com/?size=512&id=2795&format=png",
  mute: "https://img.icons8.com/?size=512&id=7913&format=png",
};

//////////// event listeners
playPauseIcon.onclick = () => {
  if (playPauseIcon.src === icon.play) {
    audio.play();
    playPauseIcon.src = icon.pause;
  } else {
    audio.pause();
    playPauseIcon.src = icon.play;
  }
};

muteIcon.onclick = () => {
  if (muteIcon.src === icon.noMute) {
    muteIcon.src = icon.mute;
    audio.muted = true;
  } else {
    muteIcon.src = icon.noMute;
    audio.muted = false;
  }
};

timeRange.onchange = () => {
  const time = (timeRange.value / 100) * audioDuration;
  currentTimeElement.innerHTML = convertTime(time);
  audio.currentTime = time;
};

volumeRange.onchange = () => {
  const volume = volumeRange.value / 100;
  audio.volume = volume;
};

/////////////////////////////////////////
setInterval(() => {
  if (audio.paused) {
    return;
  }
  timeRange.value = (audio.currentTime / audio.duration) * 100;
  currentTimeElement.innerHTML = convertTime(audio.currentTime);
}, 1000);

function convertTime(seconds) {
  seconds = Math.floor(seconds);
  const mins = Math.floor(seconds / 60);
  seconds %= 60;
  const secs = seconds < 10 ? `0${seconds}` : seconds;
  return `${mins}:${secs}`;
}

///////code from stack overflow to get duration of audio///////
var getDuration = function (url, next) {
  var _player = new Audio(url);
  _player.addEventListener(
    "durationchange",
    function (e) {
      if (this.duration != Infinity) {
        var duration = this.duration;
        _player.remove();
        next(duration);
      }
    },
    false
  );
  _player.load();
  _player.currentTime = 24 * 60 * 60; //fake big time
  _player.volume = 0;
  _player.play();
  //waiting...
};

getDuration(audioPath, function (duration) {
  audioDuration = duration;
  durationElement.innerHTML = convertTime(audioDuration);
});
///////////////////////////////////////////////////////////////

playPauseIcon.src = icon.play;
muteIcon.src = icon.noMute;
