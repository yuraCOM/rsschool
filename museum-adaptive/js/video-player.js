/* Vide and audio range */
// цвет инпута
const progress = document.querySelectorAll('.control-input');

progress.forEach(item =>item.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4)`
}))


const player = document.querySelector('.video-player');
let video = document.querySelector('.player-video');
// console.log(video)
const  bigButtonPlay = player.querySelector('.video-btn-big-play')

video.addEventListener('click', togglePlay)

bigButtonPlay.addEventListener('click', ()=>{

    togglePlay()
})

// включение выключени видео
// нашли видео наше и если пауза то игарть или наоборот и передаем метод в video[method]();
// и также прячем или показываем большую снопку
function togglePlay() {
    video = player.querySelector('.player-video');
    const method = video.paused ? 'play' : 'pause';
    video[method]()
    console.log(video[method]())
    method === 'play' ? bigButtonPlay.style.display = 'none' : bigButtonPlay.style.display = ''
}