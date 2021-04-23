// Get elements
const video = document.querySelector("video.player__video");
const playButton = document.querySelector("button[title='Toggle Play']");
const skipButtons = document.querySelectorAll("button[data-skip]");
const sliders = document.querySelectorAll("input[type='range']");
const progress = document.getElementsByClassName("progress")[0];
const progressBar = document.getElementsByClassName("progress__filled")[0];
const fullscreenButton = document.querySelector("button.fullscreen");

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

function handleRangeUpdate(evt) {
  if (evt.buttons < 1) return;
  console.log(evt);
  video[this.name] = this.value;
}

function updateProgressBar() {
  const videoProgress = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${videoProgress}%`;
}

function scrub(evt) {
  const scrubTime = (evt.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Hook up event listeners
playButton.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlayButton);
video.addEventListener("pause", updatePlayButton);
video.addEventListener("timeupdate", updateProgressBar); // or 'progress' event, but 'progress' isn't automatic

skipButtons.forEach(button => button.addEventListener("click", skip));

let sliderMousedown = false;
sliders.forEach(slider => {
  slider.addEventListener("mousedown", () => sliderMousedown = true);
  slider.addEventListener("mouseup", () => sliderMousedown = false);
  slider.addEventListener("mouseout", () => sliderMousedown = false);
  slider.addEventListener("change", handleRangeUpdate);
  slider.addEventListener("mousemove", function (evt) {
    sliderMousedown && handleRangeUpdate(evt);
  });
});

let progressMousedown = false; // limits mousemove event to trigger scrub only if mouse is down
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (evt) => progressMousedown && scrub(evt));
progress.addEventListener("mousedown", () => progressMousedown = true);
progress.addEventListener("mouseup", () => progressMousedown = false);
// progress.addEventListener("mouseout", () => progressMousedown = false);

fullscreenButton.addEventListener("click", () => video.requestFullscreen());