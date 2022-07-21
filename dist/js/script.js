// Анимации WoW

new WOW().init();

// Тини слайдер

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

// Гамбургер

const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector ('.menu'),
      closeElem = document.querySelector ('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

// Аккордион

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}