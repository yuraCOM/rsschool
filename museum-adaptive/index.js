const logo = document.querySelector('.logo')
const logoP = document.querySelector('.logo p')
let louvreSite = `https://louvre-museum.tickets-paris.fr/`

logo.onclick = function(){
    window.open(louvreSite)
    logoP.style.color = 'var(--color-gold)'
}

let vrCard = document.querySelector('.vr')

vrCardArr.forEach( item => {
    vrCard.innerHTML += `
    <div class="vr-card vr-card-block">
            <a class="vr-card" href="${item.http}" target="_blank"> <img src="./assets/img/vr0${vrCardArr.indexOf(item)+1}.jpg" alt="">
                <h3 class="style-title">${item.place}</h3>
                <div class="line"></div>
                <h4>360° Virtual Tour</h4>
                <p>Google Street Panorama View</p>
            </a>
         </div>
    `
})

// бургер меню адаптив 1024/768/420
const burgerMenu = document.querySelector('.burger-menu')
const welcomeInfo = document.querySelector('.welcome-info')
const popMenuWelcome = document.querySelector('.burger-nav')

burgerMenu.addEventListener('click', ()=>{
    if (burgerMenu.classList.contains('burger-menu-close')){
        burgerMenu.src = 'assets/svg/close-burger.svg'
        burgerMenu.classList.remove('burger-menu-close')
        welcomeInfo.style.opacity = 0
        popMenuWelcome.style.left = 0
    }
    else{
        burgerMenu.classList.add('burger-menu-close')
        burgerMenu.src = 'assets/svg/burger.svg'
        welcomeInfo.style.opacity = 1
        popMenuWelcome.style.left = -1000 + 'px'
    }
})

popMenuWelcome.addEventListener('click', ()=>{
    closeBurgerMenu()
})

const social = document.querySelector('.social').cloneNode(true)
popMenuWelcome.appendChild(social)


function closeBurgerMenu() {
    burgerMenu.classList.add('burger-menu-close')
    burgerMenu.src = 'assets/svg/burger.svg'
    welcomeInfo.style.opacity = 1
    popMenuWelcome.style.left = -1000 + 'px'
}

console.log(`
Ваша оценка - 136 баллов 
Отзыв по пунктам ТЗ:
Частично выполненные пункты:
1) Секция Video 

2) Секция Tickets 

3) Секция Video 

4) Секция Tickets 

5) Секция Video 

6) Секция Tickets 

7) Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки,  элементы не должны скрываться, обрезаться, наезжать друг на друга, если это не предусмотрено макетом. 

8) слайдера сравнения изображений в секции \`Explore\` 

9) кастомного видеоплеера в секции \`Video\` 

10) слайдера в секции \`Video\` 

11) YouTube-видео в плейлисте в секции \`Video\`, маленькие видео выровнены по краям большого 

12) при клике по ссылке в адаптивном меню, или при клике по любому месту сайта, кроме самого адаптивного меню, меню закрывается 

13) Результат проверки скорости сайта для мобильных устройств: 0 to 49 (red): Poor - не выполнено 0 ,баллов; 50 to 89 (orange): Needs Improvement - частично выполнено - 4 баллов; 90 to 100 (green): Good - выполнено полностью - 8 баллов 

Выполненные пункты:
1) Блок header 

2) Секция Welcome 

3) Секция Visiting 

4) Секция Explore 

5) Секция Gallery 

6) Форма покупки билетов 

7) Секция Contacts 

8) Блок footer  

9) Блок header 

10) Секция Welcome 

11) Секция Visiting 

12) Секция Explore 

13) Секция Gallery 

14) Форма покупки билетов 

15) Секция Contacts 

16) Блок footer  

17) Блок header 

18) Секция Welcome 

19) Секция Visiting 

20) Секция Explore 

21) Секция Gallery 

22) Форма покупки билетов 

23) Секция Contacts 

24) Блок footer  

25) слайдера в секции \`Welcome\` 

26) галереи изображений и изображений в ней 

27) карты 

28) при нажатии на бургер-иконку меню появляется, плавно выдвигаясь слева, бургер-иконка изменяется на крестик. При нажатии на крестик меню исчезает, плавно возвращаясь назад, иконка крестика превращается в бургер-иконку 

29) ссылки в меню работают, обеспечивая плавную прокрутку по якорям 

30) вёрстка меню соответствует макету на всех проверяемых разрешениях 


`)