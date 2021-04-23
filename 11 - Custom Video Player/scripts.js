// Get elements
const video = document.querySelector("video.player__video");
const playButton = document.querySelector("button[title='Toggle Play']");
const skipButtons = document.querySelectorAll("button[data-skip]");
const volumeSlider = document.querySelector("input[name='volume']");
const playrateSlider = document.querySelector("input[name='playbackRate']");

// Make functions
function togglePlay() {
  video.paused ? video.play() : video.pause(); 
}

function updatePlayButton() {
  playButton.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
  const skipSeconds = this.dataset.skip;
  video.currentTime += parseFloat(skipSeconds);
}

// function adjustVolume(evt) {
//   if (evt.buttons < 1) return;
//   console.log(evt);
//   video.volume = this.value;
// }

function handleRangeUpdate(evt) {
  if (evt.buttons < 1) return;
  console.log(evt);
  video[this.name] = this.value;
}


// Hook up event listeners
playButton.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlayButton);
video.addEventListener("pause", updatePlayButton);

skipButtons.forEach(button => button.addEventListener("click", skip));

volumeSlider.addEventListener("change", handleRangeUpdate);
volumeSlider.addEventListener("mousemove", handleRangeUpdate);
playrateSlider.addEventListener("change", handleRangeUpdate);
playrateSlider.addEventListener("mousemove", handleRangeUpdate);