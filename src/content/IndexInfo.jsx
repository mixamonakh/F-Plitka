import { site } from "./site.js";
export function IndexInfo() {
  return (
    <section className="info" id="info">
      {" "}
      <div className="container">
        {" "}
        <div className="info__grid">
          {" "}
          <div className="info-stage">
            {" "}
            <h2
              className="title title_fz45 info-stage__title"
              data-motion="reveal"
            >
              {" "}
              этапы работы{" "}
            </h2>{" "}
            <div
              className="title title_gradient title_fz22 info-stage__subtitle"
              data-motion="reveal"
            >
              {" "}
              Всё просто и прозрачно{" "}
            </div>{" "}
            <div className="stage-grid">
              {" "}
              <div className="stage-grid__block" data-motion="reveal">
                {" "}
                <div className="title title_gradient title_fz44 stage-grid__number">
                  {" "}
                  01{" "}
                </div>{" "}
                <div className="title title_fz18 title_fz18_blackFontWeight stage-grid__title">
                  {" "}
                  Оставляете заявку{" "}
                </div>{" "}
                <div className="title title_fz14 stage-grid__text">
                  {" "}
                  Наш сотрудник свяжется с Вами и ответит на все интересующие
                  Вас вопросы, скоординирует по дальнейшим дейсвтиям{" "}
                </div>{" "}
              </div>{" "}
              <div className="stage-grid__block" data-motion="reveal">
                {" "}
                <div
                  className="title title_gradient title_fz44 stage-grid__number"
                >
                  {" "}
                  02{" "}
                </div>{" "}
                <div className="title title_fz18 title_fz18_blackFontWeight stage-grid__title">
                  {" "}
                  Принимаете специалиста{" "}
                </div>{" "}
                <div className="title title_fz14 stage-grid__text">
                  {" "}
                  Наш специалист приедет к Вам на адрес бесплатно, в кратчайшие
                  сроки, для замеров и составления сметы{" "}
                </div>{" "}
              </div>{" "}
              <div className="stage-grid__block" data-motion="reveal">
                {" "}
                <div className="title title_gradient title_fz44 stage-grid__number">
                  {" "}
                  03{" "}
                </div>{" "}
                <div className="title title_fz18 title_fz18_blackFontWeight stage-grid__title">
                  {" "}
                  Согласовываем проект{" "}
                </div>{" "}
                <div className="title title_fz14 stage-grid__text">
                  {" "}
                  Согласование стоимости, проводимых работ, сроков и заключение
                  договора{" "}
                </div>{" "}
              </div>{" "}
              <div className="stage-grid__block" data-motion="reveal">
                {" "}
                <div className="title title_gradient title_fz44 stage-grid__number">
                  {" "}
                  04{" "}
                </div>{" "}
                <div className="title title_fz18 title_fz18_blackFontWeight stage-grid__title">
                  {" "}
                  Сдаём работу{" "}
                </div>{" "}
                <div className="title title_fz14 stage-grid__text">
                  {" "}
                  Выполняем всё в срок, а вы наслаждаетесь результатом{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="info-company" data-motion="reveal">
            {" "}
            <h2 className="title title_fz45 title_fz45_white info-company__title">
              {" "}
              Компания <br /> Элит-Плит{" "}
            </h2>{" "}
            <div className="title title_fz22 info-company__subtitle">
              {" "}
              Пару слов о том, кто мы{" "}
            </div>{" "}
            <div className="title title_fz14 title_fz14_white info-company__text">
              {" "}
              Ремонт ванных комнат, укладка плитки и прочие работы могут
              отнимать Ваше время, деньги и нервы, а потому наша компания
              предлагает Вам избавиться от этой головной боли и обратиться к
              профессионалам своего дела. <br /> <br /> Компания Элит-Плит давно
              зарекомендовала себя как ответственный и надежный исполнитель
              работ, связанных с любым видом по укладки плитки, ремонту ванных
              комнат и изготовлению декоративного камня. Мы качественно и в
              короткий срок произведем все необходимые работы, а Вы останетесь
              довольны!{" "}
            </div>{" "}
            <div className="info-company__social">
              {" "}
              <a href={site.telegramHref} className="title title_fz14 title_fz14_white">
                Telegram
              </a>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
