
const player = document.querySelector('.video-player');

// окно видео-ролика - через него можно навешивать управление
let video = document.querySelector('.player-video');
// console.log()

const  bigButtonPlay = player.querySelector('.video-btn-big-play')
let littleButtonPlay = player.querySelector('#little-play')


/* Vide and audio range */
// цвет инпута
const progress = document.querySelectorAll('.control-input');
let videoProgress = document.querySelector('.video-length-control');
// console.log(videoProgress.value)

progress.forEach(item =>item.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4)`
}))

function scrub(e) {
  const scrubTime = (e.offsetX / videoProgress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
// let mousedown = false;
// videoProgress.addEventListener('click', scrub);
// videoProgress.addEventListener('mousemove', (e) => mousedown && scrub(e));
// videoProgress.addEventListener('mousedown', () => mousedown = true);
// videoProgress.addEventListener('mouseup', () => mousedown = false);

// ползунок видео - прокрутка видео
videoProgress.addEventListener('input', () => {

    // console.log(video.duration)
    // console.log(videoProgress.value)
    // console.log((video.duration*videoProgress.value)/100)
    video.currentTime = (video.duration*videoProgress.value)/100
    if (video.currentTime === video.duration ){
        bigButtonPlay.style.display = '';
        littleButtonPlay.src = "./assets/img/play.png";

    }
});


video.addEventListener('timeupdate', updateVideoProgressLine);


function updateVideoProgressLine(){
    let percent = (video.currentTime / video.duration) * 100;
    videoProgress.style.background = `linear-gradient(to right, rgb(113, 7, 7) ${percent}%, rgb(113, 7, 7) ${percent}%, rgb(196, 196, 196) ${percent}%, rgb(196, 196, 196))`
    videoProgress.value = `${percent}`
    // videoProgress.value

}
function skipVideoProgressLine(){
    // console.log(videoProgress.value)
    // videoProgress.value = "0"
    // videoProgress.innerHtml = 'value = 0';
    videoProgress.style.background = `linear-gradient(to right, rgb(113, 7, 7) 0%, rgb(113, 7, 7) 0%, rgb(196, 196, 196) 0%, rgb(196, 196, 196))`

}


video.addEventListener('click', togglePlay)

bigButtonPlay.addEventListener('click', ()=>{
    togglePlay()

})
littleButtonPlay.addEventListener('click', ()=>{
    togglePlay()
})

// включение выключени видео
// нашли видео наше и если пауза то игарть или наоборот и передаем метод в video[method]();
// и также прячем или показываем большую снопку
function togglePlay() {
    video = player.querySelector('.player-video');
    const method = video.paused ? 'play' : 'pause';
    video[method]()
    // console.log(video[method]())
    method === 'play' ? bigButtonPlay.style.display = 'none' : bigButtonPlay.style.display = '';
    method === 'play' ? littleButtonPlay.src = "./assets/img/pause.png" : littleButtonPlay.src = "./assets/img/play.png";

}

//volume
// volume btn
let volumeBtn = document.querySelector('#volume-btn')
let volumeRange = document.querySelector('#volume-range')

// console.log(volumeRange)
//через ползунок звука управляем звуком видео video.volume
volumeRange.addEventListener('input', function () {
    // console.log(volumeRange.value)
    // console.log(volumeRange)
    video.volume = volumeRange.value;
    if (video.volume === 0){
        volumeBtn.src ='./assets/img/mute.png'
    }
    else {
        volumeBtn.src ='./assets/img/volume.png'
    }
    let percentVolume = (volumeRange.value*100)/1
    // console.log(percentVolume)
    volumeRange.style.background = `linear-gradient(to right, #710707 ${percentVolume}%, #710707 ${percentVolume}%, #C4C4C4 ${percentVolume}%, #C4C4C4 100%)`

}, false);

//mute
let currentVolume = volumeRange.value
volumeBtn.addEventListener('click', muteV)
// volumeBtn.addEventListener('click', function (){
//     if ( video.volume !== 0){
//         video.volume = 0
//         // volumeRange.value = 0
//         volumeBtn.src ='./assets/img/mute.png'
//     }
//     else{
//         volumeBtn.src ='./assets/img/volume.png'
//         video.volume = currentVolume
//         volumeRange.value = currentVolume
//     }
// }, false)

function muteV (){
    if ( video.volume !== 0){
        video.volume = 0
        // volumeRange.value = 0
        volumeBtn.src ='./assets/img/mute.png'
    }
    else{
        volumeBtn.src ='./assets/img/volume.png'
        video.volume = currentVolume
        volumeRange.value = currentVolume
    }
}
//фулл скрин
let fullScreenBtn = document.querySelector('#full-scr')
fullScreenBtn.addEventListener('click', function () {
    video.webkitEnterFullscreen()
})

//keys control
// window.onkeydown = function(e) {
//     return !(e.keyCode == 32);
// };
// addEventListener("click", function() {
//     console.log("You clicked!");
// });
// console.log(player.getBoundingClientRect().y)
// console.log(document.querySelector('#art-gallery').getBoundingClientRect().y
// )

document.addEventListener('keypress', function(event) {
    if (player.getBoundingClientRect().y < 320 && player.getBoundingClientRect().y > 0){

        if (event.code === "Space") {
            event.preventDefault()
            togglePlay()
            video.playbackRate = 1
        }
        if (event.code === 'KeyM') {
            muteV()
        }
        if (event.code === 'KeyF') {
            video.webkitEnterFullscreen()
            document.exitFullscreen();

        }
        if (event.code==='Period' && event.shiftKey ){
            video.playbackRate = 3
        }
        if (event.code==='Comma' && event.shiftKey ){
            video.playbackRate = .3
        }

    }
    // console.log(event)
})

// document.onkeypress = function (event) {
//     console.log(event.keyCode)}