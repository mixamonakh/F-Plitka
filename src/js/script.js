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
    speed: 400,
    autoplay: true,
    autoplayButtonOutput: false
});

// Табы в галерее

$(function() {
  $('ul.portfolio__tabs').on('click', 'li:not(.portfolio__tab_active)', function() {
    $(this)
      .addClass('portfolio__tab_active').siblings().removeClass('portfolio__tab_active')
      .closest('div.container').find('div.portfolio__content').removeClass('portfolio__content_active').eq($(this).index()).addClass('portfolio__content_active');
  });
});

// Кнопки в тини слайдере ( Шапка сайта )

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
    this.classList.toggle("active-accordion");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

// Аккордион мобильная версия

var bcc = document.getElementsByClassName("accordion_mobile");
var i;

for (i = 0; i < bcc.length; i++) {
  bcc[i].addEventListener("click", function() {
    this.classList.toggle("active-accordion");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

// Гамбургер мобильная версия

const burger = document.querySelector('.hamburger'),
      menuMob = document.querySelector ('.menu-mobile'),
      closeElement = document.querySelector ('.menu-mobile__close');

burger.addEventListener('click', () => {
    menuMob.classList.add('active');
    burger.classList.add('hamburger_actives')
});

closeElement.addEventListener('click', () => {
    menuMob.classList.remove('active');
    burger.classList.remove('hamburger_actives')
});



//БугаттиБокс ( галерея )

window.addEventListener('load', function() {
  baguetteBox.run('.portfolio-gallery');
});

// Слик слайдер

$(document).ready(function(){
  $('.slider').slick({
    dots: true,
    speed: 700,
    fade: true,
    cssEase: 'linear',
    responsive: [{

      breakpoint: 576,
      settings: {
        arrows: false
      }

    }]
  });
});

// Табы в секции solutions страницы phototile

$(function() {
  
  $('ul.solutions__tabs').on('click', 'li:not(.solutions__tab_active)', function() {
    $(this)
      .addClass('solutions__tab_active').siblings().removeClass('solutions__tab_active')
      .closest('div.container').find('div.solutions__content').removeClass('solutions__content_active').eq($(this).index()).addClass('solutions__content_active');
  });
});

// Модальное окно

$('[data-modal=modalHeader]').on('click', function() {
  $('.overlay, #modalHeader').fadeIn('slow');
});

// Модальное окно Страница-styling, блок sentence

$('.button_sentence').on('click', function() {
  $('.overlay, #modalHeader').fadeIn('slow')
});

// Крестик для модального окна
$('.modal__close').on('click', function() {
  $('.overlay, #modalHeader, #modalThanks').fadeOut('slow')
});

// Маска ввода номера телефона

$('input[name=phone]').mask("+7 (999) 999-99-99");