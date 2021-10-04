
const exploreBtn = document.querySelector('.explore-btn')
const exploreSlider = document.querySelector('.explore-slider')
const imgBefore = document.querySelector('.img-before')

exploreBtn.addEventListener('mousedown', mouseTouchDown, false);


function mouseTouchDown(event) {
    //предотвратить запуск выделения (действие браузера)
    event.preventDefault()
    //Свойство event.clientX содержит в себе расстояние от левой границы экрана до курсора без учета прокрутки.
    let shiftX = event.clientX - exploreBtn.getBoundingClientRect().left;

    console.log('clientX = ', event.clientX)
    // console.log('exploreBtn.getBoundingClientRect().left = ', exploreBtn.getBoundingClientRect().left)
    // console.log(shiftX)

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {

        let newLeft = event.clientX - shiftX - exploreSlider.getBoundingClientRect().left;
        // console.log(newLeft)
        // курсор вышел из слайдера => оставить бегунок в его границах.
        if (newLeft < 0) {
            newLeft = 0;
        }

        let rightEdge = exploreSlider.offsetWidth - exploreBtn.offsetWidth;
        // console.log('rightEdge', rightEdge)
        if (newLeft > rightEdge) {
            newLeft = rightEdge + exploreBtn.offsetWidth;
        }
        exploreBtn.style.left = newLeft-exploreBtn.offsetWidth/2 + 'px';
        imgBefore.style.clipPath = `inset(0 0 0 ${newLeft}px)`
    }

    function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
    }

}