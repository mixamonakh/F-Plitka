import {
  rateDetails,
  unpricedRates,
  serviceContent,
  homeFaq,
  projects,
} from "./catalog.js";

export const pages = {
  index: {
    key: "index",
    path: "/",
    title: 'Укладка плитки по низким ценам от компании "Элит-Плит"',
    description:
      "Укладка плитки на стену и на пол. Ремонт ванных комнат под ключ. Изготовление и укладка фотоплитки. Всё это и не только выполнят профессионалы из компании Элит-Плит. Средние цены по рынку и гарантия на все виды работ.",
    services: ["Ремонт ванных", "Укладка плитки", "Фотоплитка"],
    calculator: null,
    galleries: [
      {
        title: "Ремонт ванных",
        className: "portfolio-gallery portfolio-gallery_bathroom",
        images: [
          {
            src: "/img/portfolio/main/bathroom/bathroom_one.jpg",
            caption: "",
            className: "portfolio-gallery_bathroom-img",
          },
          {
            src: "/img/portfolio/main/bathroom/bathroom_two.jpg",
            caption: "",
            className: "portfolio-gallery_bathroom-img",
          },
          {
            src: "/img/portfolio/main/bathroom/bathroom_three.jpg",
            caption: "",
            className: "portfolio-gallery_bathroom-img",
          },
          {
            src: "/img/portfolio/main/bathroom/bathroom_four.jpg",
            caption: "",
            className: "portfolio-gallery_bathroom-img",
          },
          {
            src: "/img/portfolio/main/bathroom/bathroom_five.jpg",
            caption: "",
            className: "portfolio-gallery_bathroom-img",
          },
        ],
      },
      {
        title: "Фотоплитка",
        className: "portfolio-gallery portfolio-gallery_phototile",
        images: [
          {
            src: "/img/portfolio/main/phototile/phototile_one.jpg",
            caption: "",
            className: "portfolio-gallery_phototile-img",
          },
          {
            src: "/img/portfolio/main/phototile/phototile_two.jpg",
            caption: "",
            className: "portfolio-gallery_phototile-img",
          },
          {
            src: "/img/portfolio/main/phototile/phototile_three.jpg",
            caption: "",
            className: "portfolio-gallery_phototile-img",
          },
          {
            src: "/img/portfolio/main/phototile/phototile_four.jpg",
            caption: "",
            className: "portfolio-gallery_phototile-img",
          },
          {
            src: "/img/portfolio/main/phototile/phototile_five.jpg",
            caption: "",
            className: "portfolio-gallery_phototile-img",
          },
          {
            src: "/img/portfolio/main/phototile/phototile_six.jpg",
            caption: "",
            className: "portfolio-gallery_phototile-img",
          },
        ],
      },
      {
        title: "Укладка плитки",
        className: "portfolio-gallery portfolio-gallery_styling",
        images: [
          {
            src: "/img/portfolio/main/styling/styling_one.jpg",
            caption: "Укладка керамогранита на пол",
            className: "portfolio-gallery_styling-img",
          },
          {
            src: "/img/portfolio/main/styling/styling_two.jpg",
            caption: "Укладка плитки в ванной",
            className: "portfolio-gallery_styling-img",
          },
          {
            src: "/img/portfolio/main/styling/styling_three.jpg",
            caption: "Укладка крупноформатного керамогранита",
            className: "portfolio-gallery_styling-img",
          },
          {
            src: "/img/portfolio/main/styling/styling_four.jpg",
            caption: "Кухонынй фартук",
            className: "portfolio-gallery_styling-img",
          },
          {
            src: "/img/portfolio/main/styling/styling_five.jpg",
            caption: "Кухонынй фартук",
            className: "portfolio-gallery_styling-img",
          },
          {
            src: "/img/portfolio/main/styling/styling_six.jpg",
            caption: "Укладка крупноформатного керамогранита",
            className: "portfolio-gallery_styling-img",
          },
          {
            src: "/img/portfolio/main/styling/styling_seven.jpg",
            caption: "Укладка ступени",
            className: "portfolio-gallery_styling-img",
          },
          {
            src: "/img/portfolio/main/styling/styling_eight.jpg",
            caption: "Укладка ступени",
            className: "portfolio-gallery_styling-img",
          },
          {
            src: "/img/portfolio/main/styling/styling_nine.jpg",
            caption: "Укладка гранита",
            className: "portfolio-gallery_styling-img",
          },
        ],
      },
    ],
    portfolioTabsClass: "portfolio__tabs",
    solutions: null,
    solutionText: null,
    nav: [
      {
        href: "/index.html",
        label: "Главная",
      },
      {
        href: "/bathroom.html",
        label: "Ремонт Ванных",
      },
      {
        href: "/phototile.html",
        label: "Фотоплитка",
      },
      {
        href: "/styling.html",
        label: "Укладка плитки",
      },
      {
        href: "/styling.html#tile",
        label: "Укладка плитки на пол",
      },
      {
        href: "/styling.html#stoneware",
        label: "Укладка керамогранита на пол",
      },
      {
        href: "/styling.html#kitchen",
        label: "Укладка плитки на кухонный фартук",
      },
      {
        href: "/styling.html#largeStoneware",
        label: "Укладка крупноформатного керамогранита",
      },
      {
        href: "/styling.html#granite",
        label: "Укладка гранита",
      },
      {
        href: "/styling.html#stage",
        label: "Укладка ступени",
      },
      {
        href: "/styling.html#mosaic",
        label: "Укладка мозаики",
      },
      {
        href: "/styling.html#hammam",
        label: "Облицовка хаммама",
      },
      {
        href: "#services",
        label: "Услуги",
      },
      {
        href: "#advantage",
        label: "Преимущества",
      },
      {
        href: "#portfolio",
        label: "Портфолио",
      },
      {
        href: "#info",
        label: "О нас",
      },
      {
        href: "#contacts",
        label: "Контакты",
      },
    ],
  },
  bathroom: {
    key: "bathroom",
    path: "/bathroom.html",
    title: "Ремонт и уникальный дизайн для вашей ванной комнаты.",
    description:
      'Ремонт ванных  " Под ключ\t". Укладка плитки на пол и на стены. Бесплатный дизайн-проект ванной комнаты и смета в подарок !',
    services: ["Косметический ремонт", "Капитальный ремонт", "Евро ремонт"],
    calculator: null,
    galleries: [
      {
        title: "Косметический",
        className: "portfolio-gallery portfolio-gallery_3Col",
        images: [
          {
            src: "/img/portfolio/bathroom/redecorating/redecorating_one.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/bathroom/redecorating/redecorating_two.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/bathroom/redecorating/redecorating_three.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/bathroom/redecorating/redecorating_four.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/bathroom/redecorating/redecorating_five.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/bathroom/redecorating/redecorating_six.jpg",
            caption: "",
            className: "",
          },
        ],
      },
      {
        title: "Капитальный",
        className: "portfolio-gallery portfolio-gallery_3Col",
        images: [
          {
            src: "/img/portfolio/bathroom/overhaul/overhaul_one.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/bathroom/overhaul/overhaul_two.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/bathroom/overhaul/overhaul_three.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/bathroom/overhaul/overhaul_four.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/bathroom/overhaul/overhaul_five.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/bathroom/overhaul/overhaul_six.jpg",
            caption: "",
            className: "",
          },
        ],
      },
      {
        title: "Евро",
        className: "portfolio-gallery portfolio-gallery_3Col",
        images: [
          {
            src: "/img/portfolio/bathroom/renovation/renovation_one.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/bathroom/renovation/renovation_two.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/bathroom/renovation/renovation_three.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/bathroom/renovation/renovation_four.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/bathroom/renovation/renovation_five.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/bathroom/renovation/renovation_six.jpg",
            caption: "",
            className: "",
          },
        ],
      },
    ],
    portfolioTabsClass: "portfolio__tabs portfolio__tabs_column",
    solutions: null,
    solutionText: null,
    nav: [
      {
        href: "/index.html",
        label: "Главная",
      },
      {
        href: "/bathroom.html",
        label: "Ремонт Ванных",
      },
      {
        href: "/phototile.html",
        label: "Фотоплитка",
      },
      {
        href: "/styling.html",
        label: "Укладка плитки",
      },
      {
        href: "/styling.html#tile",
        label: "Укладка плитки на пол",
      },
      {
        href: "/styling.html#stoneware",
        label: "Укладка керамогранита на пол",
      },
      {
        href: "/styling.html#kitchen",
        label: "Укладка плитки на кухонный фартук",
      },
      {
        href: "/styling.html#largeStoneware",
        label: "Укладка крупноформатного керамогранита",
      },
      {
        href: "/styling.html#granite",
        label: "Укладка гранита",
      },
      {
        href: "/styling.html#stage",
        label: "Укладка ступени",
      },
      {
        href: "/styling.html#mosaic",
        label: "Укладка мозаики",
      },
      {
        href: "/styling.html#hammam",
        label: "Облицовка хаммама",
      },
      {
        href: "#services",
        label: "Услуги",
      },
      {
        href: "#advantage",
        label: "Преимущества",
      },
      {
        href: "#portfolio",
        label: "Портфолио",
      },
      {
        href: "#info",
        label: "О нас",
      },
      {
        href: "#contacts",
        label: "Контакты",
      },
    ],
  },
  phototile: {
    key: "phototile",
    path: "/phototile.html",
    title: "Изготовление и укладка фотоплитки. Панно с любым изображением!",
    description:
      "Перенесём любое фото на плитку. Разработаем уникальный дизайн ванной комнаты и кухонного фартука с использованием фотоплитки и панно. Используем UV печать и деколирование в изготовлении.",
    services: ["UV печать", "Деколирование"],
    calculator: [
      {
        label: "UV печать",
        price: 12000,
      },
      {
        label: "Деколирование",
        price: 20000,
      },
    ],
    galleries: [
      {
        title: "Ванная комната",
        className: "portfolio-gallery portfolio-gallery_3Col",
        images: [
          {
            src: "/img/portfolio/photo-tile/bathroom/bathroom_one.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/bathroom/bathroom_two.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/bathroom/bathroom_three.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/bathroom/bathroom_four.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/bathroom/bathroom_five.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/bathroom/bathroom_six.jpg",
            caption: "",
            className: "",
          },
        ],
      },
      {
        title: "Кухня",
        className: "portfolio-gallery portfolio-gallery_3Col",
        images: [
          {
            src: "/img/portfolio/photo-tile/kitchen/kitchen_one.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/kitchen/kitchen_two.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/kitchen/kitchen_three.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/kitchen/kitchen_four.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/kitchen/kitchen_five.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/kitchen/kitchen_six.jpg",
            caption: "",
            className: "",
          },
        ],
      },
      {
        title: "Портрет",
        className: "portfolio-gallery portfolio-gallery_3Col",
        images: [
          {
            src: "/img/portfolio/photo-tile/portrait/portrait_one.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/portrait/portrait_two.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/portrait/portrait_three.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/portrait/portrait_four.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/portrait/portrait_five.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/portrait/portrait_six.jpg",
            caption: "",
            className: "",
          },
        ],
      },
      {
        title: "Бассейн",
        className: "portfolio-gallery portfolio-gallery_3Col",
        images: [
          {
            src: "/img/portfolio/photo-tile/pool/pool_one.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/pool/pool_two.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/pool/pool_three.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/pool/pool_four.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/pool/pool_five.jpg",
            caption: "",
            className: "",
          },
          {
            src: "/img/portfolio/photo-tile/pool/pool_six.jpg",
            caption: "",
            className: "",
          },
        ],
      },
    ],
    portfolioTabsClass: "portfolio__tabs portfolio__tabs_column",
    solutions: [
      {
        title: "Морские пейзажи",
        slides: [
          {
            src: "/img/phototile/slider/sea/sea_one.jpg",
            title: "Морские пейзажи - #1",
            price: "5 500 р.",
          },
          {
            src: "/img/phototile/slider/sea/sea_two.jpg",
            title: "Морские пейзажи - #2",
            price: "7 500 р.",
          },
          {
            src: "/img/phototile/slider/sea/sea_three.jpg",
            title: "Морские пейзажи - #3",
            price: "8 000 р.",
          },
          {
            src: "/img/phototile/slider/sea/sea_four.jpg",
            title: "Морские пейзажи - #4",
            price: "3 000 р.",
          },
          {
            src: "/img/phototile/slider/sea/sea_five.jpg",
            title: "Морские пейзажи - #5",
            price: "6 000 р.",
          },
        ],
      },
      {
        title: "Природа",
        slides: [
          {
            src: "/img/phototile/slider/nature/nature_one.jpg",
            title: "Природа - #1",
            price: "7 500 р.",
          },
          {
            src: "/img/phototile/slider/nature/nature_two.jpg",
            title: "Природа - #2",
            price: "7 500 р.",
          },
          {
            src: "/img/phototile/slider/nature/nature_three.jpg",
            title: "Природа - #3",
            price: "8 000 р.",
          },
          {
            src: "/img/phototile/slider/nature/nature_four.jpg",
            title: "Природа - #4",
            price: "3 000 р.",
          },
          {
            src: "/img/phototile/slider/nature/nature_five.jpg",
            title: "Природа - #5",
            price: "6 000 р.",
          },
        ],
      },
      {
        title: "Архитектура",
        slides: [
          {
            src: "/img/phototile/slider/architecture/architecture_one.jpg",
            title: "Архитектура - #1",
            price: "8 000 р.",
          },
          {
            src: "/img/phototile/slider/architecture/architecture_two.jpg",
            title: "Архитектура - #2",
            price: "8 000 р.",
          },
          {
            src: "/img/phototile/slider/architecture/architecture_three.jpg",
            title: "Архитектура - #3",
            price: "8 000 р.",
          },
          {
            src: "/img/phototile/slider/architecture/architecture_four.jpg",
            title: "Архитектура - #4",
            price: "3 000 р.",
          },
          {
            src: "/img/phototile/slider/architecture/architecture_five.jpg",
            title: "Архитектура - #5",
            price: "6 000 р.",
          },
        ],
      },
    ],
    solutionText:
      "Фотоплитка - это безграничные возможности для создания уникального интерьера. Вы можете заказть печать абсолютно любого изображения, никаких ограничений нет. Хотите семейное фото ? - Легко ! Хотите морские волны у себя в ванной ? - Пожалуйста ! Или же вам по душе любоваться на старинный замок у себя в гостинной ? - И это тоже можно реализовать с помощью технологии нанесения фото на плитку. Ну а если вдруг вас затрудняет определиться с каким то конкретным изображением, то вы всегда можете воспользоваться нашими Готовыми решениями.",
    nav: [
      {
        href: "/index.html",
        label: "Главная",
      },
      {
        href: "/bathroom.html",
        label: "Ремонт Ванных",
      },
      {
        href: "/phototile.html",
        label: "Фотоплитка",
      },
      {
        href: "/styling.html",
        label: "Укладка плитки",
      },
      {
        href: "/styling.html#tile",
        label: "Укладка плитки на пол",
      },
      {
        href: "/styling.html#stoneware",
        label: "Укладка керамогранита на пол",
      },
      {
        href: "/styling.html#kitchen",
        label: "Укладка плитки на кухонный фартук",
      },
      {
        href: "/styling.html#largeStoneware",
        label: "Укладка крупноформатного керамогранита",
      },
      {
        href: "/styling.html#granite",
        label: "Укладка гранита",
      },
      {
        href: "/styling.html#stage",
        label: "Укладка ступени",
      },
      {
        href: "/styling.html#mosaic",
        label: "Укладка мозаики",
      },
      {
        href: "/styling.html#hammam",
        label: "Облицовка хаммама",
      },
      {
        href: "#services",
        label: "Услуги",
      },
      {
        href: "#advantage",
        label: "Преимущества",
      },
      {
        href: "#portfolio",
        label: "Портфолио",
      },
      {
        href: "#info",
        label: "О нас",
      },
      {
        href: "#contacts",
        label: "Контакты",
      },
    ],
  },
  styling: {
    key: "styling",
    path: "/styling.html",
    title: "Укладка плитки, керамогранита, тротуарной плитки, мозаики, камня.",
    description:
      "Все виды работ по укладке плитки и керамогранита. Так же укладываем ступень и гранит. Профессиональная бригада строителей с многолетним стажем выполнит работу на 100% качественно.",
    services: [
      "Укладка плитки на пол",
      "Укладка керамогранита на пол",
      "Укладка кухонного фартука",
      "Укладка гранита",
      "Укладка крупноформатного керамогранита",
      "Укладка ступени",
      "Укладка мозаики",
      "Облицовка хаммама",
    ],
    calculator: [
      {
        label: "Укладка плитки на пол",
        price: 2500,
      },
      {
        label: "Укладка керамогранита на пол",
        price: 3000,
      },
      {
        label: "Укладка кухонного фартука",
        price: 7000,
      },
      {
        label: "Укладка гранита",
        price: 15000,
      },
      {
        label: "Укладка крупноформатного керамогранита",
        price: 4500,
      },
      {
        label: "Укладка ступени",
        price: 5500,
      },
      {
        label: "Укладка мозаики",
        price: 8000,
      },
    ],
    galleries: [
      {
        title: "Плитка",
        className: "portfolio-gallery portfolio-gallery_3Col",
        images: [
          {
            src: "/img/portfolio/tile/keramica/keramica_one.jpg",
            caption: "Ванная комната",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/keramica/keramica_two.jpg",
            caption: "Ванная комната",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/keramica/keramica_three.jpg",
            caption: "Ванная комната",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/keramica/keramica_four.jpg",
            caption: "Кухонный фартук",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/keramica/keramica_five.jpg",
            caption: "Кухонный фартук",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/keramica/keramica_six.jpg",
            caption: "Облицовка пола",
            className: "portfolio-gallery_tile-img",
          },
        ],
      },
      {
        title: "Керамогранит",
        className: "portfolio-gallery portfolio-gallery_3Col",
        images: [
          {
            src: "/img/portfolio/tile/stoneware/stoneware_one.jpg",
            caption: "Облицовка стен и пола",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/stoneware/stoneware_two.jpg",
            caption: "Облицовка пола",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/stoneware/stoneware_three.jpg",
            caption: "Крупноформатный керамогранит",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/stoneware/stoneware_four.jpg",
            caption: "Ванная комната",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/stoneware/stoneware_five.jpg",
            caption: "Ванная комната",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/stoneware/stoneware_six.jpg",
            caption: "Кухонный фартук",
            className: "portfolio-gallery_tile-img",
          },
        ],
      },
      {
        title: "Ступень",
        className: "portfolio-gallery portfolio-gallery_3Col",
        images: [
          {
            src: "/img/portfolio/tile/stage/stage_one.jpg",
            caption: "Гранит",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/stage/stage_two.jpg",
            caption: "Керамогранит",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/stage/stage_three.jpg",
            caption: "Гранит",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/stage/stage_four.jpg",
            caption: "Керамическая плитка",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/stage/stage_five.jpg",
            caption: "Клинкер",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/stage/stage_six.jpg",
            caption: "Керамическая плитка",
            className: "portfolio-gallery_tile-img",
          },
        ],
      },
      {
        title: "Мозаика",
        className: "portfolio-gallery portfolio-gallery_3Col",
        images: [
          {
            src: "/img/portfolio/tile/mosaic/mosaic_one.jpg",
            caption: "Ванная комната",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/mosaic/mosaic_two.jpg",
            caption: "Ванная комната",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/mosaic/mosaic_three.jpg",
            caption: "Кухонный фартук",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/mosaic/mosaic_four.jpg",
            caption: "Кухонный фартук",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/mosaic/mosaic_five.jpg",
            caption: "Хаммам",
            className: "portfolio-gallery_tile-img",
          },
          {
            src: "/img/portfolio/tile/mosaic/mosaic_six.jpg",
            caption: "Ванная комната",
            className: "portfolio-gallery_tile-img",
          },
        ],
      },
    ],
    portfolioTabsClass: "portfolio__tabs portfolio__tabs_column",
    solutions: null,
    solutionText: null,
    nav: [
      {
        href: "/index.html",
        label: "Главная",
      },
      {
        href: "/bathroom.html",
        label: "Ремонт Ванных",
      },
      {
        href: "/phototile.html",
        label: "Фотоплитка",
      },
      {
        href: "/styling.html",
        label: "Укладка плитки",
      },
      {
        href: "/styling.html#tile",
        label: "Укладка плитки на пол",
      },
      {
        href: "/styling.html#stoneware",
        label: "Укладка керамогранита на пол",
      },
      {
        href: "/styling.html#kitchen",
        label: "Укладка плитки на кухонный фартук",
      },
      {
        href: "/styling.html#largeStoneware",
        label: "Укладка крупноформатного керамогранита",
      },
      {
        href: "/styling.html#granite",
        label: "Укладка гранита",
      },
      {
        href: "/styling.html#stage",
        label: "Укладка ступени",
      },
      {
        href: "/styling.html#mosaic",
        label: "Укладка мозаики",
      },
      {
        href: "/styling.html#hammam",
        label: "Облицовка хаммама",
      },
      {
        href: "#sentence",
        label: "Услуги",
      },
      {
        href: "#advantage",
        label: "Преимущества",
      },
      {
        href: "#portfolio",
        label: "Портфолио",
      },
      {
        href: "#info",
        label: "О нас",
      },
      {
        href: "#contacts",
        label: "Контакты",
      },
    ],
  },
  confidentiality: {
    key: "confidentiality",
    path: "/confidentiality.html",
    title: "Политика в отношении обработки персональных данных — Элит-Плит",
    description:
      "Политика Элит-Плит в отношении обработки персональных данных посетителей сайта.",
    services: ["Ремонт ванных", "Укладка плитки", "Фотоплитка"],
    calculator: null,
    galleries: [],
    portfolioTabsClass: null,
    solutions: null,
    solutionText: null,
    nav: [
      {
        href: "/index.html",
        label: "Главная",
      },
      {
        href: "/bathroom.html",
        label: "Ремонт Ванных",
      },
      {
        href: "/phototile.html",
        label: "Фотоплитка",
      },
      {
        href: "/styling.html",
        label: "Укладка плитки",
      },
      {
        href: "/styling.html#tile",
        label: "Укладка плитки на пол",
      },
      {
        href: "/styling.html#stoneware",
        label: "Укладка керамогранита на пол",
      },
      {
        href: "/styling.html#kitchen",
        label: "Укладка плитки на кухонный фартук",
      },
      {
        href: "/styling.html#largeStoneware",
        label: "Укладка крупноформатного керамогранита",
      },
      {
        href: "/styling.html#granite",
        label: "Укладка гранита",
      },
      {
        href: "/styling.html#stage",
        label: "Укладка ступени",
      },
      {
        href: "/styling.html#mosaic",
        label: "Укладка мозаики",
      },
      {
        href: "/styling.html#hammam",
        label: "Облицовка хаммама",
      },
      {
        href: "/styling.html#sentence",
        label: "Услуги",
      },
      {
        href: "/styling.html#advantage",
        label: "Преимущества",
      },
      {
        href: "/styling.html#portfolio",
        label: "Портфолио",
      },
      {
        href: "/styling.html#info",
        label: "О нас",
      },
      {
        href: "/styling.html#contacts",
        label: "Контакты",
      },
    ],
  },
};

export const rates = [
  ...rateDetails.map(([id, label, unit, includes, excludes], index) => ({
    id,
    label,
    unit,
    includes,
    excludes,
    price: pages.styling.calculator[index].price,
    category: "laying",
  })),
  ...unpricedRates,
];
export const rateById = Object.fromEntries(
  rates.map((rate) => [rate.id, rate]),
);
export const services = serviceContent.map((service) => ({
  ...service,
  type: "service",
  path: `/uslugi/${service.slug}/`,
  description: service.lead,
  rates: service.rateIds.map((id) => rateById[id]),
  cases: projects.filter((project) =>
    service.material
      ? project.material === service.material
      : service.room && project.room === service.room,
  ),
  faq: service.faq ?? homeFaq.slice(0, 3),
}));
export const leadServices = [
  ...new Set([
    ...Object.values(pages).flatMap((page) => page.services),
    ...services.map((service) => service.h1),
  ]),
];
Object.assign(pages.index, {
  h1: "Укладка плитки под ключ в Москве",
  title: "Укладка плитки под ключ в Москве — Элит-Плит",
  description:
    "Укладка плитки в Москве и Подмосковье до 50 км. Цены на работу и материалы отдельно, предварительный расчёт без телефона. Реальные работы Элит-Плит.",
  type: "home",
});
Object.assign(pages.styling, {
  path: "/ceny/",
  type: "prices",
  h1: "Цены на плиточные работы",
  title: "Цены на укладку плитки в Москве — прайс Элит-Плит",
  description:
    "Прайс на плиточные работы: укладка, керамогранит, мозаика, фартук и ступени. Состав ставок и отдельные операции. Скидка 10% при заказе с сайта.",
});
Object.assign(pages.confidentiality, {
  path: "/privacy/",
  type: "privacy",
  h1: "Политика конфиденциальности",
  title: "Политика конфиденциальности — Элит-Плит",
});
// В новом handoff фотоплитка не является страницей запуска.
Object.assign(pages.phototile, { redirect: "/ceny/" });
for (const service of services)
  pages[service.key] = { ...service, services: leadServices };
for (const [key, path, type, h1, title, description] of [
  [
    "calculator",
    "/kalkulyator/",
    "calculator",
    "Калькулятор стоимости плиточных работ",
    "Калькулятор укладки плитки — расчёт работ онлайн · Элит-Плит",
    "Быстрый и подробный расчёт плиточных работ, количества плитки и запаса. Предварительная смета по строкам без телефона.",
  ],
  [
    "portfolio",
    "/raboty/",
    "portfolio",
    "Наши работы",
    "Плиточные работы: портфолио и проекты — Элит-Плит",
    "Фотографии плиточных работ Элит-Плит. Фильтры по помещению, материалу и площади. Ванные, фартуки, керамогранит и мозаика.",
  ],
  [
    "about",
    "/o-nas/",
    "about",
    "Команда Элит-Плит",
    "О команде Элит-Плит — подход к плиточным работам",
    "Команда Элит-Плит: этапы работы, подход к облицовке и контроль качества. Москва и ближайшее Подмосковье.",
  ],
  [
    "contacts",
    "/kontakty/",
    "contacts",
    "Контакты и зона выезда",
    "Элит-Плит — контакты, Москва и ближайшее Подмосковье",
    "Телефон, Telegram, MAX и адрес Элит-Плит. Москва и Подмосковье до 50 км от МКАД. Уточните условия выезда по адресу.",
  ],
  [
    "consent",
    "/consent/",
    "consent",
    "Согласие на обработку персональных данных",
    "Согласие на обработку персональных данных — Элит-Плит",
    "Место для текста согласия, предоставляемого владельцем сайта.",
  ],
])
  pages[key] = {
    key,
    path,
    type,
    h1,
    title,
    description,
    services: leadServices,
    ...(key === "consent" ? { noindex: true } : {}),
  };
for (const project of projects) {
  const key = `project-${project.slug}`;
  pages[key] = {
    key,
    path: `/raboty/${project.slug}/`,
    type: "project",
    h1: project.title,
    title: `Проект: ${project.title} — Элит-Плит`,
    description: `${project.title}. Фотография из портфолио Элит-Плит.`,
    project,
    services: leadServices,
    noindex: true,
  };
}
export const navigation = [
  { href: "/#uslugi", label: "Услуги" },
  { href: "/ceny/", label: "Цены" },
  { href: "/kalkulyator/", label: "Калькулятор" },
  { href: "/raboty/", label: "Наши работы" },
  { href: "/o-nas/", label: "О нас" },
  { href: "/kontakty/", label: "Контакты" },
];
export const redirects = {
  "/index.html": "/",
  "/bathroom.html": "/uslugi/ukladka-plitki-v-vannoy/",
  "/styling.html": "/ceny/",
  "/phototile.html": "/ceny/",
  "/confidentiality.html": "/privacy/",
};
