new WOW().init();

var slider = tns({
    container: '#autoHeight',
    autoHeight: true,
    items: 1,
    swipeAngle: false,
    nav: false,
    controls: false,
    speed: 400
});

document.querySelector('.promo-arrows__prev').addEventListener('click', function () {
    slider.goTo('prev');
});

document.querySelector('.promo-arrows__next').addEventListener('click', function () {
    slider.goTo('next');
});

const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector ('.menu'),
      closeElem = document.querySelector ('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});