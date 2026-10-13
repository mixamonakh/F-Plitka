import { site } from "./site.js";
export function PhototileBrief() {
  return (
    <section className="brief brief_phototile">
      {" "}
      <img
        src="/img/image-background/background_one.png"
        alt=""
        className="image-background image-background_brief"
        loading="lazy"
        decoding="async"
      />{" "}
      <div className="container">
        {" "}
        <h2
          className="title title_fz80 brief__title"
          data-motion="reveal"
        >
          {" "}
          Фотоплитка{" "}
        </h2>{" "}
        <div
          className="title title_gradient title_fz30 title_fz30_unset brief__subtitle"
          data-motion="reveal"
        >
          {" "}
          Изготовление и укладка{" "}
        </div>{" "}
        <div className="brief__grid brief__grid_phototile">
          {" "}
          <div className="brief__block">
            {" "}
            <p className="title title_fz15 title_fz15_font">
              {" "}
              Фотоплитка - это керамогранит или керамическая плитка, на которые
              наносится абсолютно любое изображение. Благодаря современным
              технологиям, изображения не поддаются коррозии более 20-и лет, они
              так же обладают свойствами обыкновенной плитки и служат для
              создания уникального дизайна ! Есть два способа наненесения фото
              на плитку:{" "}
            </p>{" "}
            <ul className="title title_fz15 title_fz15_font">
              {" "}
              <li>
                {" "}
                UV печать - ультрафиолетовая печать с использованием
                отверждаемых чернил. Затем печатный слой покрывают защитным
                лаком, что даёт защиту от воздействий окружающей среды.
                Используется везде, кроме пола.{" "}
              </li>{" "}
              <li>
                {" "}
                Деколь - это метод &quot;переводилки&quot;. Изображение печатают
                на декольной бумаге, затем вручную переводят на плитку или
                керамогранит. Далее изображение вплавляется в плитку методом
                обжига при температуре +900℃. Деколь является более дорогим и
                трудоемким методом.{" "}
              </li>{" "}
            </ul>{" "}
            <p className="title title_fz15 title_fz15_font">
              {" "}
              Наша компания Элит-Плит оказывает услуги посредника. Вам не нужно
              будет погружаться в изучение этой сферы деятельности,
              анализировать рынок, изучать отзывы и прочее. Мы всё сделаем за
              вас:{" "}
            </p>{" "}
            <ul className="title title_fz15 title_fz15_font">
              {" "}
              <li>
                {" "}
                Мы создадим проект вместе с вами, основываясь на ваших
                пожеланиях и нашем опыте.{" "}
              </li>{" "}
              <li>
                {" "}
                Подберём самые выгодные условия среди компаний, которые
                занимаются производством фотоплитки.{" "}
              </li>{" "}
              <li> Организуем доставку. </li>{" "}
              <li>
                {" "}
                Произведём весь комплекс работ по облицовки нужного вам
                помещения.{" "}
              </li>{" "}
            </ul>{" "}
            <div className="brief__buttons">
              {" "}
              <a
                href="#calc"
                className="title title_fz15 title_fz15_font button button_brief"
                data-motion="reveal"
              >
                {" "}
                <div> Рассчитать стоимость </div>{" "}
                <div>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xlink="http://www.w3.org/1999/xlink"
                    width="20"
                    height="20"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fill="#fff"
                        fillRule="evenodd"
                        d="M9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967L16.5303 11.4697C16.8232 11.7626 16.8232 12.2374 16.5303 12.5303L10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303C9.17678 18.2374 9.17678 17.7626 9.46967 17.4697L14.9393 12L9.46967 6.53033C9.17678 6.23744 9.17678 5.76256 9.46967 5.46967Z"
                        className="color030D45 svgShape"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </svg>{" "}
                </div>{" "}
              </a>{" "}
              <a
                href="#solutions"
                className="title title_fz15 title_fz15_font button button_brief"
                data-motion="reveal"
              >
                {" "}
                <div> Готовые решения </div>{" "}
                <div>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xlink="http://www.w3.org/1999/xlink"
                    width="20"
                    height="20"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fill="#fff"
                        fillRule="evenodd"
                        d="M9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967L16.5303 11.4697C16.8232 11.7626 16.8232 12.2374 16.5303 12.5303L10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303C9.17678 18.2374 9.17678 17.7626 9.46967 17.4697L14.9393 12L9.46967 6.53033C9.17678 6.23744 9.17678 5.76256 9.46967 5.46967Z"
                        className="color030D45 svgShape"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </svg>{" "}
                </div>{" "}
              </a>{" "}
            </div>{" "}
          </div>{" "}
          <div className="brief__img" data-motion="reveal">
            {" "}
            <img
              src="/img/phototile/phototile.jpeg"
              alt=""
              className="brief__picture"
              loading="lazy"
              decoding="async"
            />{" "}
          </div>{" "}
        </div>{" "}
        <div className="services services_phototile" id="services">
          {" "}
          <h2
            className="title title_fz80 services__title"
            data-motion="reveal"
          >
            {" "}
            Мы предлагаем{" "}
          </h2>{" "}
          <div
            className="title title_fz30 title_fz30_unset services__subtitle"
            data-motion="reveal"
          >
            {" "}
            Два метода нанесения{" "}
          </div>{" "}
          <div className="services__grid services__grid_phototile">
            {" "}
            <div className="services__block" data-motion="reveal">
              {" "}
              <div className="services-picture">
                {" "}
                <span
                  className="services-picture__background"
                  aria-hidden="true"
                />{" "}
                <img
                  src="/img/services/phototile/services-card-one.jpg"
                  alt="ultraviolet"
                  className="services-picture__img"
                  loading="lazy"
                  decoding="async"
                />{" "}
              </div>{" "}
              <h3 className="title title_fz23 services__caption">
                {" "}
                UV печать{" "}
              </h3>{" "}
              <div className="title title_fz18 services__text services__text_mb0">
                {" "}
                с защитным лаком{" "}
              </div>{" "}
              <div className="title title_fz18 services__text services__text_mb0">
                {" "}
                изготовление от{" "}
                <span className="title title_gradient title_fz20 title_fz20_lowercase">
                  12 000 руб/м²
                </span>{" "}
              </div>{" "}
              <details className="title title_fz18 title_fz18_color">
                {" "}
                <summary>подробнее</summary>{" "}
                <div className="services__details">Достоинства</div>{" "}
                <ul className="title title_fz14 title_fz14_montserrat">
                  {" "}
                  <li>Дешевая цена — от 12 000 руб/м²</li>{" "}
                  <li>Отличное решение для облицовки стен</li>{" "}
                  <li>Высокая укрывистость</li>{" "}
                  <li>Наличие белых чернил и лака</li>{" "}
                  <li>Яркие цвета, высокая детализация печати</li>{" "}
                  <li>Можно эксплуатировать сразу после печати</li>{" "}
                </ul>{" "}
                <div>Недостатки</div>{" "}
                <ul className="title title_fz14 title_fz14_montserrat">
                  {" "}
                  <li>Быстро теряет вид</li>{" "}
                </ul>{" "}
              </details>{" "}
              <a
                className="button button_services services__button"
                href={site.phoneHref}
              >
                {" "}
                <div className="title title_fz15 title_fz15_font ">
                  {" "}
                  Заказать{" "}
                </div>{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xlink="http://www.w3.org/1999/xlink"
                  width="20"
                  height="20"
                  aria-hidden="true"
                  focusable="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    enableBackground="new 0 0 434.002 434.002"
                    viewBox="0 0 434.002 434.002"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      fill="#fff"
                      d="M95.457,434.002l-33.105-45.076l234.094-171.928L62.352,45.077L95.456,0L360.24,194.459
                                c7.174,5.269,11.41,13.638,11.41,22.539c0,8.9-4.236,17.27-11.41,22.538L95.457,434.002z"
                      className="color000 svgShape"
                    ></path>
                  </svg>
                </svg>{" "}
              </a>{" "}
            </div>{" "}
            <div className="services__block" data-motion="reveal">
              {" "}
              <div className="services-picture">
                {" "}
                <span
                  className="services-picture__background"
                  aria-hidden="true"
                />{" "}
                <img
                  src="/img/services/phototile/services-card-two.jpg"
                  alt="decаling"
                  className="services-picture__img"
                  loading="lazy"
                  decoding="async"
                />{" "}
              </div>{" "}
              <h3 className="title title_fz23 services__caption">
                {" "}
                деколирование{" "}
              </h3>{" "}
              <div className="title title_fz18 services__text services__text_mb0">
                {" "}
                с обжигом +900℃{" "}
              </div>{" "}
              <div className="title title_fz18 services__text services__text_mb0">
                {" "}
                изготовление от{" "}
                <span className="title title_gradient title_fz20 title_fz20_lowercase">
                  20 000 руб/м²
                </span>{" "}
              </div>{" "}
              <details className="title title_fz18 title_fz18_color">
                {" "}
                <summary>подробнее</summary>{" "}
                <div className="services__details">Достоинства</div>{" "}
                <ul className="title title_fz14 title_fz14_montserrat">
                  {" "}
                  <li>Срок эксплуатации - 50лет</li>{" "}
                  <li>Подходит для помещений с высокой влажностью</li>{" "}
                  <li>Такую плитку можно стелить на пол</li>{" "}
                  <li>Можно чистить с помощью сильных абразивных веществ</li>{" "}
                  <li>Очень стойкая к механическим воздействиям</li>{" "}
                </ul>{" "}
                <div>Недостатки</div>{" "}
                <ul className="title title_fz14 title_fz14_montserrat">
                  {" "}
                  <li>Высокая стоимость — от 20 000 руб/м²</li>{" "}
                  <li>Максимальный размер деколи - A3</li>{" "}
                </ul>{" "}
              </details>{" "}
              <a
                className="button button_services services__button"
                href={site.phoneHref}
              >
                {" "}
                <div className="title title_fz15 title_fz15_font ">
                  {" "}
                  Заказать{" "}
                </div>{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xlink="http://www.w3.org/1999/xlink"
                  width="20"
                  height="20"
                  aria-hidden="true"
                  focusable="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    enableBackground="new 0 0 434.002 434.002"
                    viewBox="0 0 434.002 434.002"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      fill="#fff"
                      d="M95.457,434.002l-33.105-45.076l234.094-171.928L62.352,45.077L95.456,0L360.24,194.459
                                c7.174,5.269,11.41,13.638,11.41,22.539c0,8.9-4.236,17.27-11.41,22.538L95.457,434.002z"
                      className="color000 svgShape"
                    ></path>
                  </svg>
                </svg>{" "}
              </a>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
