AOS.init();

AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 100, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 0, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom' // defines which position of the element regarding to window should trigger the animation

});

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

//--------------------------------
//ticket
let infoAboutTicketOrder = {
    'ticketType' : 'Choice1',
    'price' : 20,
    'basic' : 0,
    'senior' : 0,
    'total': 0
}
// окна на секции тикет
const TicketBlock = document.querySelector(".choice-ticket")//
const totalPriseSectionAmount = document.querySelector(".total-span")
const amountCountAllBtnPlusMinus = document.querySelector('.amount-count').querySelectorAll('button')
const allTypeTickets = TicketBlock.querySelectorAll("input")// all radio ticket

// данные на поп форме
let date = document.querySelector('#pop-date')
let popTime = document.querySelector('#pop-time')
let popTypeTickets = document.querySelector('#ticket-type') //select type ticket
let popTypeTicketOverview = document.querySelector('.overview-exhibition')
let popBasicPrice = document.querySelectorAll('.b-price')
let popSeniorPrice = document.querySelectorAll('.s-price')
let popBasicValue = document.querySelector('#pop-basic')
let popSeniorValue = document.querySelector('#pop-senior')
let popAmountCountBtns = document.querySelector('.amount-count-pop').querySelectorAll('button')

popTypeTickets.addEventListener('change', getPopTypeTicket)

//local store
localStorage.infoAboutTicketOrder ?
    infoAboutTicketOrder = JSON.parse(localStorage.getItem('infoAboutTicketOrder')) : false

let typeTicketPrice = infoAboutTicketOrder.price
let basicTicketValue = document.querySelector(".basic").querySelector('input').value
let seniorTicketValue = document.querySelector(".senior").querySelector('input').value


date.addEventListener('change', getDate )
function getDate() {
    // console.log(date.value)
    let data = new Date(date.value)
    // console.log(data)
    // console.log(data.getMonth())
    // console.log(data.toLocaleString('en-us',{month:'long',
    //     year:'numeric', day:'numeric', weekday: 'long'}) )
    document.querySelector('.overview-date').innerHTML = data.toLocaleString('en-us', {weekday: 'long', month:'long', day:'numeric'})
}

popTime.addEventListener('change', function () {
    // console.log(popTime.value.toString().split(':'))
    let timeSelected = popTime.value.toString().split(':')
    document.querySelector('.overview-time').innerHTML = timeSelected[0] + ' : ' + timeSelected[1]
})
updateTicketOnStart()

allTypeTickets.forEach( item=>{
    item.addEventListener('click', function () {
        item.value === 'Permanent' ? (
            typeTicketPrice = 20,
                infoAboutTicketOrder.ticketType = 'Choice1') :
            item.value === 'temporary' ? (
                typeTicketPrice = 25,
                    infoAboutTicketOrder.ticketType = 'Choice2') :
                item.value === 'combined' ? (
                    typeTicketPrice = 40,
                        infoAboutTicketOrder.ticketType = 'Choice3')  : false;
        infoAboutTicketOrder['price'] = typeTicketPrice

        getTotalPrice()
        updatePopTypeTicket()
        updateLocalStore()
        updatePopTicketTypePrice()
        updateOverSumTicket()

    })
})

amountCountAllBtnPlusMinus.forEach( item=>{
    item.addEventListener('click', ()=>{
        getTotalPrice()
        updateLocalStore()
        updatePopTypeTicket()
        updateOverSumTicket()

    })
})


function getTotalPrice() {
    let basicTicketValue = document.querySelector(".basic").querySelector('input').value
    let seniorTicketValue = document.querySelector(".senior").querySelector('input').value
    infoAboutTicketOrder.basic = +basicTicketValue
    infoAboutTicketOrder.senior = +seniorTicketValue
    totalPriseSectionAmount.innerHTML = (typeTicketPrice * basicTicketValue)
        + (typeTicketPrice * seniorTicketValue) / 2
    infoAboutTicketOrder.total = +totalPriseSectionAmount.innerHTML
    updateLocalStore()
    // console.log(infoAboutTicketOrder)

}

//стрелочная ф - записваем в локал
const updateLocalStore = ()=>{
    localStorage.setItem('infoAboutTicketOrder', JSON.stringify(infoAboutTicketOrder))
}

//функц - при старте страниццы - сомтрит на локал стор и в секции покупки белетов
// выставляет данные что были ранее выставлены
function updateTicketOnStart() {
    allTypeTickets.forEach( item => {
        infoAboutTicketOrder.ticketType === item.id ? item.checked = 'checked' : false;
    })
    document.querySelector(".basic").querySelector('input').value = infoAboutTicketOrder.basic.toString()
    document.querySelector(".senior").querySelector('input').value = infoAboutTicketOrder.senior.toString()
    totalPriseSectionAmount.innerHTML = infoAboutTicketOrder.total
    updatePopTypeTicket()
    updatePopTicketTypePrice()
    updateOverSumTicket()

    // updatePopTicketTypePrice()
}


// pop
// функц берет из локал стор данные и ставит тип билета в поп форме и при изменени в секции
// билеты - в поп тоже меняется тип былите и меняется также в overview-exhibition

function updatePopTypeTicket(){

    infoAboutTicketOrder.ticketType === "Choice1" ? popTypeTickets[1].selected = true :
        infoAboutTicketOrder.ticketType === "Choice2" ? popTypeTickets[2].selected = true :
            infoAboutTicketOrder.ticketType === "Choice3" ? popTypeTickets[3].selected = true : false
    let selectIndex = popTypeTickets.options.selectedIndex
    let txt= popTypeTickets.options[selectIndex].text;
    popTypeTicketOverview.innerHTML = txt;
    // console.log(txt)
    popBasicValue.value = infoAboutTicketOrder.basic.toString()
    popSeniorValue.value = infoAboutTicketOrder.senior.toString()


}
// если меняется тип билета в поп форме - меняем в локал стор значение
function getPopTypeTicket() {
    let selectIndex = popTypeTickets.options.selectedIndex
    // console.log(selectIndex)
    selectIndex === 1 ? (typeTicketPrice = 20, infoAboutTicketOrder.ticketType = 'Choice1') :
        selectIndex === 2 ? (typeTicketPrice = 25, infoAboutTicketOrder.ticketType = 'Choice2') :
            selectIndex === 3 ? (typeTicketPrice = 40, infoAboutTicketOrder.ticketType = 'Choice3') : false
    infoAboutTicketOrder['price'] = typeTicketPrice
    //обновляем все остальные элементы
    updateLocalStore()
    getTotalPrice()
    updateTicketOnStart()
    updatePopTypeTicket()
    updatePopTicketTypePrice()


}
//обновляем цену в скобках байсик и сениор
function updatePopTicketTypePrice() {
    popBasicPrice.forEach( item =>{
        item.innerHTML = infoAboutTicketOrder.price.toString()
    })
    popSeniorPrice.forEach( item =>{
        item.innerHTML = (infoAboutTicketOrder.price/2).toString()
    })
}

function updateOverSumTicket(){
    document.querySelector('.over-right-basic').innerHTML = (infoAboutTicketOrder.basic*infoAboutTicketOrder.price).toString() + ' &#8364;'

    document.querySelector('.over-right-senior').innerHTML = (infoAboutTicketOrder.senior * infoAboutTicketOrder.price/2).toString() + ' &#8364;'

    document.querySelector('#over-sum-total').innerHTML = infoAboutTicketOrder.total.toString()+ ' &#8364;'

}

// pop Entry Ticket buttons
popAmountCountBtns.forEach( item =>{
    item.addEventListener('click', () => {
        // console.log(item)
        getPopBasicSeniorValue()
        updateTicketOnStart()
        getTotalPrice()
        updateTicketOnStart()
        updatePopTypeTicket()
        updatePopTicketTypePrice()


    })
})

function getPopBasicSeniorValue() {
    infoAboutTicketOrder.basic = document.querySelector('#pop-basic').value
    infoAboutTicketOrder.senior = document.querySelector('#pop-senior').value

}

console.log(`
Ваша оценка - 108 баллов 
Отзыв по пунктам ТЗ:
Не выполненные/не засчитанные пункты:
1) если видео с YouTube проигрывается, клик по кнопке Pause останавливает его проигрывание. Также проигрывание видео останавливается, если кликнуть по другому слайду или кнопке Play в центре другого слайда. В указанной ситуации другое видео должно запуститься, а текущее остановиться. Невозможно проигрывание нескольких YouTube видео одновременно 

2) есть возможность перелистывания слайдов кликами по буллетам (кружочки внизу слайдера), при этом также меняется основное видео 

3) перетягивание ползунка прогресс-бара позволяет изменить время с которого проигрывается видео 

4) если прогресс-бар перетянуть до конца, видео останавливается, соответственно, меняется внешний вид кнопок "Play" 

5) клавиша Пробел — пауза, при повторном нажатии - play 

6) Клавиша M (англ) — отключение/включение звука 

7) Клавиша F — включение/выключение полноэкранного режима 

8) Клавиши SHIFT+, (англ) — ускорение воспроизведения ролика 

9) Клавиши SHIFT+. (англ) — замедление воспроизведения ролика 

10) нельзя выбрать дату в прошлом 

11) на карте отображаются маркеры, расположение и внешний вид маркеров соответствует макету 

12) стиль карты соответствует макету 

13) Любой собственный дополнительный функционал, улучшающий качество проекта. Например, ночная тема, плавная смена изображений в блоке Tickets, всплывающее окно с информацией про картины и их авторов, кнопка прокрутки страницы вверх, возможность проголосовать за понравившиеся картины с сохранением данных в local storage, всё зависит от вашей фантазии и чувства вкуса. Для удобства проверки выполненный вами дополнительный функционал включите в самооценку, которую выведите в консоль браузера 

Частично выполненные пункты:
1) слайды перелистываются плавно с анимацией смещения вправо или влево 

2) если внутри слайда проигрывается видео с YouTube, клик по стрелке перелистывания слайдов или клик по буллету останавливает проигрывание видео 

3) слайды перелистываются плавно с анимацией смещения вправо или влево (для смены основного видео анимация смещения не требуется и не проверяется) 

4) если основное видео проигрывалось при перелистывании слайдера, проигрывание видео останавливается, прогресс бар сдвигается к началу, иконки "Play" на панели управления и по центру видео меняются на первоначальные 

5) панель управления в полноэкранном режиме визуально выглядит так же, как на макете - кнопки равномерно распределены по всей ширине страницы, относительные размеры между кнопками и ползунками, а также относительные размеры самих кнопок остались прежними 

6) валидация имени пользователя. Имя пользователя должно содержать от 3 до 15 символов, в качестве символов могут быть использованы буквы английского или русского алфавита в нижнем или верхнем регистре и пробелы 

7) валидация e-mail должна пропукать только адреса вида username@example.com, где: username - имя пользователя, должно содержать от 3 до 15 символов (буквы, цифры, знак подчёркивания, дефис), не должно содержать пробелов; @ - символ собачки; example - домен первого уровня состоит минимум из 4 латинских букв; com - домен верхнего уровня, отделяется от домена первого уровня точкой и состоит минимум из 2 латинских букв 

8) валидация номера телефона: номер содержит только цифры; без разделения или с разделением на две или три цифры; разделение цифр может быть через дефис или пробел; с ограничением по количеству цифр не больше 10 цифр 

9) при попытке ввода в форму невалидного значения выводится предупреждение, например, "номер телефона может содержать только цифры" 

Выполненные пункты:
1) есть возможность перелистывания слайдов влево и вправо кликами по стрелкам 

2) есть возможность перелистывания слайдов влево и вправо свайпами (движениями) мышки 

3) есть возможность перелистывания слайдов кликами по буллетам (квадратики внизу слайдера) 

4) перелистывание слайдов бесконечное (зацикленное) 

5) при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) 

6) при перелистывании слайдов кликами или свайпами меняется номер активного слайда 

7) даже при частых кликах или свайпах нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда 

8) при клике по самому слайду или кнопке Play в центре слайда, внутри слайда проигрывается видео с YouTube. Никакие изменения с основным видео при этом не происходят 

9) есть возможность перелистывания слайдов с видео влево и вправо кликами по стрелкам. Слайды перелистываются по одному, при этом также меняется основное видео 

10) перелистывание слайдов бесконечное (зацикленное) 

11) при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) 

12) даже при частых кликах по стрелкам нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда 

13) при клике по кнопке "Play" слева внизу на панели видео начинается проигрывание видео, иконка кнопки при этом меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Повторный клик на кнопку останавливает проигрывание видео, иконка меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается 

14) при клике по большой кнопке "Play" по центру видео, или при клике по самому видео, начинается проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Клик на видео, которое проигрывается, останавливает проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается 

15) прогресс-бар отображает прогресс проигрывания видео 

16) при клике на иконку динамика происходит toggle звука и самой иконки (звук включается или выключается, соответственно изменяется иконка) 

17) при перемещении ползунка громкости звука изменяется громкость видео 

18) если ползунок громкости звука перетянуть до 0, звук выключается, иконка динамика становится зачеркнутой 

19) если при выключенном динамике перетянуть ползунок громкости звука от 0, звук включается, иконка громкости перестаёт быть зачёркнутой 

20) при нажатии на кнопку fullscreen видео переходит в полноэкранный режим, при этом видео и панель управления разворачиваются во весь экран. При нажатии на кнопку fullscreen повторно видео выходит из полноэкранного режима. Нажатие на клавишу для выхода из полноэкранного режима Esc не проверяем и не оцениваем 

21) ползунок можно перетягивать мышкой по горизонтали 

22) ползунок никогда не выходит за границы картины 

23) при перемещении ползунка справа налево плавно появляется нижняя картина 

24) при перемещении ползунка слева направо плавно появляется верхняя картина 

25) при обновлении страницы ползунок возвращается в исходное положение 

26) при прокрутке страницы вниз появление картин секции Galery сопровождается анимацией: изображения плавно поднимаются снизу вверх, увеличиваясь и создавая эффект выплывания. В качестве образца анимации используйте анимацию на сайте Лувра https://www.louvre.fr/ 

27) если прокрутить страницу вверх и затем снова прокручивать вниз, анимация появления картин повторяется 

28) при обновлении страницы, если она к тому моменту была прокручена до секции Galery, анимация картин повторяется 

29) при изменении количества билетов Basic и Senior пересчитывается общая цена за них 

30) у каждого типа билетов своя цена (20 €, 25 €, 40 € для Basic и половина этой стоимости для Senior). При изменении типа билета пересчитывается общая цена за них 

31) при обновлении страницы сохраняется выбранное ранее количество билетов Basic и Senior, выбранный тип билета, общая цена за них 

32) когда при клике по кнопке Buy now открывается форма, она уже содержит данные, указанные на странице сайта - количество билетов, их тип, общая цена за них 

33) когда пользователь выбирает дату в форме слева, она отображается в билете справа 

34) когда пользователь выбирает время в форме слева, оно отображается в билете справа 

35) время можно выбирать с 9:00 до 18:00 с интервалом в 30 минут 

36) можно изменить тип билета в поле Ticket type слева при этом меняется тип билета, цена билета и общая стоимость билетов справа 

37) можно изменить количество билетов каждого типа в поле слева при этом меняется количество билетов и общая стоимость билетов справа 

38) в секции Contacts добавлена интерактивная карта 



`)

