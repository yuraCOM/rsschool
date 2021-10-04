const logo = document.querySelector('.logo')
const logoP = document.querySelector('.logo p')
let louvreSite = `https://louvre-museum.tickets-paris.fr/`

logo.onclick = function(){
    window.open(louvreSite)
    // logo.style.color = 'var(--color-gold)'
    logoP.style.color = 'var(--color-gold)'
}


// let vrCardArr = ['Royal Palace', 'Denon Wing', 'Colonnade Perrault', 'Greek hall', 'Mona Lisa', 'Night Palace']
// console.log(vrCardArr)

//перенес в data.js
// let vrCardArr = [
//     {
//         place : "Royal Palace",
//         http : "https://goo.gl/maps/Yt9eNHZqZGeJL9Wa9"
//     },
//     {
//         place : 'Denon Wing',
//         http : "https://goo.gl/maps/MT9gw4W4NBVTpDoKA"
//     },
//     {
//         place : 'Colonnade Perrault',
//         http : "https://goo.gl/maps/kEePSTpCtoZzjwjo9"
//     },
//     {
//         place : 'Greek hall',
//         http : "https://goo.gl/maps/kBoBZRm59AYoGVuq5"
//     },
//     {
//         place : 'Mona Lisa',
//         http : "https://goo.gl/maps/5jGxo9oLitQVBf1Z8"
//     },
//     {
//         place : 'Night Palace',
//         http : "https://goo.gl/maps/uoCEJ8ZcV1kuVGtF8"
//     },
// ]

// vrCardArr.forEach( item => {
//     console.log(item)
//     vrCard.innerHTML += `
//          <div class="vr-card">
//             <a href="${item.http}"> <img src="./assets/img/vr0${vrCardArr.indexOf(item)+1}.jpg" alt=""></a>
//             <h3 class="style-title">${item.place}</h3>
//             <h4>360° Virtual Tour</h4>
//             <p>Google Street Panorama View</p>
//          </div>
//     `
// })

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