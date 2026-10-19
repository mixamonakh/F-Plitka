import { useState } from "react";
import {
  companyText,
  homeFaq,
  projects,
  rooms,
  materials,
  workSteps,
} from "../content/catalog.js";
import { services } from "../content/pages.js";
import { site } from "../content/site.js";
import { calculationHref, formatMoney } from "../lib/calculator.js";
import { EstimateCalculator, Field } from "./EstimateCalculator.jsx";
import { ProjectCards, ProjectGallery } from "./ProjectGallery.jsx";
import { PriceTable } from "./PriceTable.jsx";
import { ServiceGrid } from "./ServiceGrid.jsx";
import { HomeServices } from "./HomeServices.jsx";
import {
  Breadcrumbs,
  Button,
  CallToAction,
  FAQ,
  Header,
  Map,
  PageHeading,
  Placeholder,
  RequestAction,
  SectionHeading,
  TextLink,
} from "./SiteLayout.jsx";

export function HomePage({ showPartners = true, showPrices = true }) {
  return (
    <>
      <section className="ep-hero">
        <img
          className="ep-hero__image"
          src="/img/header/background__header-two.jpg"
          alt="Интерьер ванной с отделкой из плитки под мрамор"
          width="1920"
          height="1080"
          fetchPriority="high"
        />
        <Header home />
        <div className="ep-container ep-hero__body">
          <div>
            <p className="ep-kicker">
              Элит-Плит · Лучшие в своём деле
              <span className="ep-only-desktop">
                {" "}
                · Москва и Подмосковье до 50 км
              </span>
            </p>
            <h1>
              Укладка плитки <span>под ключ в Москве</span>
            </h1>
            <p className="ep-hero__lead">
              Укладка плитки на стену и на пол. Ремонт ванных комнат под ключ.{" "}
              <span className="ep-only-desktop">
                Смета по строкам: работа и материал отдельно, итог виден без
                звонка.
              </span>
              <span className="ep-only-mobile">
                Смета по строкам, итог без звонка.
              </span>
            </p>
            <div className="ep-actions">
              <Button href="/kalkulyator/">Рассчитать стоимость</Button>
              <TextLink href="/raboty/" external>
                Наши работы
              </TextLink>
            </div>
          </div>
        </div>
        <div className="ep-container ep-hero__facts">
          {[
            ["Работа и материал", "отдельными строками сметы"],
            ["Итог без телефона", "предварительный расчёт виден сразу"],
            ["Скидка 10%", "при заказе с сайта"],
          ].map(([title, text]) => (
            <div key={title}>
              <b>{title}</b>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>
      <HomeServices />
      {showPrices && (
        <section
          className="ep-section ep-container ep-split ep-home-prices"
          id="ceny"
        >
          <div>
            <p className="ep-kicker">Цены</p>
            <h2>Коротко о ценах</h2>
            <p>
              Ставка — за работу. Клей, затирка и плитка идут отдельными
              строками. Для ступеней считаем погонные метры, для остальных работ
              — м².
            </p>
            <p className="ep-note">
              Ставки с сайта elit-plit.ru. Скидка 10% при заказе с сайта.
            </p>
            <TextLink href="/ceny/">Весь прайс и состав ставок</TextLink>
          </div>
          <PriceTable />
        </section>
      )}
      <section className="ep-sand" id="calculator">
        <div className="ep-section ep-container">
          <SectionHeading
            kicker="Калькулятор"
            title="Прикиньте стоимость за минуту"
            mobileTitle="Прикиньте стоимость"
          >
            <p>
              Быстрый расчёт по площади и ставкам сайта. Результат виден сразу,
              без телефона. Подробный режим с размерами комнаты, запилами и
              отверстиями — на странице калькулятора.
            </p>
          </SectionHeading>
          <EstimateCalculator compact />
        </div>
      </section>
      <section className="ep-section ep-container" id="portfolio">
        <SectionHeading kicker="Портфолио" title="Наши работы" />
        <ProjectGallery home />
      </section>
      <section className="ep-company" id="info">
        <div className="ep-company__text">
          <p className="ep-kicker">Компания Элит-Плит</p>
          <h2>Пару слов о том, кто мы</h2>
          {companyText.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <p>
            Небольшие задачи — фартук, туалет, перезатирка — берём так же охотно
            и считаем по тем же строкам. Минимального чека нет.
          </p>
          <div className="ep-actions">
            <TextLink href={site.telegramHref} external>
              Telegram
            </TextLink>
            <TextLink href="/o-nas/">О команде и подходе</TextLink>
          </div>
        </div>
        <div className="ep-company__steps">
          <p className="ep-kicker">Этапы работы</p>
          <h2>Всё просто и прозрачно</h2>
          <div className="ep-steps">
            {workSteps.map(([title, text], index) => (
              <article key={title} data-motion="reveal">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="ep-scenarios ep-container">
        <article id="nebolshie-raboty">
          <p className="ep-kicker">Небольшие работы</p>
          <h3>Фартук, туалет, пара квадратов на балконе</h3>
          <p>
            Приедем и на 3 м². Смета та же: ставка за работу, материалы
            отдельно, выезд по условиям для вашего адреса.
          </p>
          <TextLink href={calculationHref({ floorArea: "3", wallArea: "0" })}>
            Рассчитать небольшую работу
          </TextLink>
        </article>
        <article id="dizayn-proekt">
          <p className="ep-kicker">По дизайн-проекту</p>
          <h3>Сложные раскладки и работа с дизайнером</h3>
          <p>
            Читаем альбом, согласуем узлы и швы заранее, присылаем фото этапов.
            Дизайнеру — прямой контакт с мастером.
          </p>
          <RequestAction outline>Передать проект на расчёт</RequestAction>
        </article>
        <article>
          <Map compact />
          <p className="ep-kicker">Контакты и зона выезда</p>
          <h3>Москва и область до 50 км</h3>
          <p>
            {site.address}
            <br />
            {site.hours}
            <br />
            Telegram и MAX: {site.phoneLabel}
          </p>
          <TextLink href="/kontakty/#geografiya">Условия выезда</TextLink>
        </article>
      </section>
      <div className="ep-container">
        <FAQ items={homeFaq} />
      </div>
      {showPartners && (
        <div className="ep-partners ep-container">
          <b>Смежные работы</b>
          <p>
            Нужен ремонт квартиры целиком или мебель под готовую облицовку —
            познакомим с партнёрами, с которыми работаем на объектах. Сами
            делаем только плитку.
          </p>
        </div>
      )}
      <CallToAction />
    </>
  );
}
export function ServicePage({ page }) {
  const cases = page.cases.length ? page.cases.slice(0, 3) : [];
  return (
    <>
      <div className="ep-container ep-service-page">
        <section className="ep-service-hero">
          <div>
            <Breadcrumbs
              page={page}
              parent={{ href: "/#uslugi", label: "Услуги" }}
            />
            <h1>{page.h1}</h1>
            <p className="ep-lead">{page.lead}</p>
            <div className="ep-actions">
              <Button
                href={calculationHref({
                  material: page.material || "ceramic",
                  mode: "detail",
                  ...(page.price && !page.material
                    ? { items: [{ id: page.price, quantity: "1" }] }
                    : {}),
                })}
              >
                {page.key === "bathroom"
                  ? "Рассчитать свою ванную"
                  : "Рассчитать стоимость"}
              </Button>
              <TextLink
                href={page.room ? `/raboty/?room=${page.room}` : "/raboty/"}
                external
              >
                {page.key === "bathroom" ? "Реальные ванные" : "Наши работы"}
              </TextLink>
            </div>
            <div className="ep-service-facts">
              <div>
                <b>Пол и стены отдельно</b>
                <span>две площади, две ставки</span>
              </div>
              <div>
                <b>
                  {page.key === "bathroom" ? "Мокрые зоны" : "Смета по строкам"}
                </b>
                <span>
                  {page.key === "bathroom"
                    ? "гидроизоляция — явной строкой"
                    : "состав работ виден заранее"}
                </span>
              </div>
              <div>
                <b>Скидка 10%</b>
                <span>при заказе с сайта</span>
              </div>
            </div>
          </div>
          <img
            src={page.image}
            alt={page.h1}
            width="600"
            height="600"
            fetchPriority="high"
          />
        </section>
        <section className="ep-section">
          <SectionHeading
            kicker="Состав работ"
            title={
              page.key === "bathroom"
                ? "Что входит в облицовку ванной"
                : "Что входит в работу"
            }
          >
            <p>
              Каждый пункт — отдельная позиция в смете. Что не нужно на вашем
              объекте, в расчёт не попадает.
            </p>
          </SectionHeading>
          <div className="ep-includes">
            {page.includes.map(([title, text], index) => (
              <article key={title}>
                <span className="ep-kicker">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="ep-section ep-split">
          <div>
            <p className="ep-kicker">
              {page.key === "bathroom" ? "Ставки для ванной" : "Ставки"}
            </p>
            <h2>Сколько стоит работа</h2>
            <p>
              Ставки сайта за работу, материалы отдельно. Позиции без
              фиксированной ставки считаем по смете после замера.
            </p>
            <TextLink href="/ceny/">Полный прайс</TextLink>
          </div>
          <PriceTable items={page.rates} />
        </section>
        {cases.length > 0 && (
          <section className="ep-section">
            <SectionHeading
              kicker="Работы"
              title={
                page.key === "bathroom" ? "Реальные ванные" : "Примеры работ"
              }
            >
              <TextLink href="/raboty/">Все работы в портфолио</TextLink>
            </SectionHeading>
            <ProjectCards items={cases} />
          </section>
        )}
        <section className="ep-section ep-service-boundaries">
          <div>
            {page.key === "bathroom" ? (
              <>
                <p className="ep-kicker" id="tualet">
                  Туалет и малый санузел
                </p>
                <h2>Маленькое помещение — те же строки</h2>
                <p>
                  Короб под стояк, ревизионный люк, пол 1–2 м² и стены — считаем
                  по тем же ставкам. Подрезок на квадратный метр больше, поэтому
                  важна раскладка: согласуем до начала работ.
                </p>
                <TextLink href="/kalkulyator/">
                  Рассчитать облицовку туалета
                </TextLink>
              </>
            ) : page.key === "porcelain" ? (
              <>
                <p className="ep-kicker" id="pol">
                  Керамогранит на пол
                </p>
                <h2>Форматы 60×60 и 60×120</h2>
                <p>
                  Площадь пола, формат плитки, раскладка и состояние основания —
                  параметры предварительной сметы. Подготовку, клей и затирку
                  считаем отдельно.
                </p>
                <TextLink href="/kalkulyator/">
                  Рассчитать керамогранит
                </TextLink>
              </>
            ) : page.key === "floor" ? (
              <>
                <p className="ep-kicker" id="raskladka">
                  Раскладка
                </p>
                <h2>Швы и подрезки согласуем заранее</h2>
                <p>
                  Прямая, со смещением, диагональная или сложная раскладка — без
                  скрытого коэффициента. Дополнительные работы требуют оценки.
                </p>
                <TextLink href="/kalkulyator/">Перейти к расчёту</TextLink>
              </>
            ) : (
              <>
                <p className="ep-kicker">Предварительный расчёт</p>
                <h2>Каждая операция видна в смете</h2>
                <p>
                  Неизвестные объёмы и ставки уточняем по фото или на замере.
                  Материалы считаем отдельно от работы.
                </p>
                <TextLink href="/kalkulyator/">Рассчитать свою задачу</TextLink>
              </>
            )}
          </div>
          <div>
            <p className="ep-kicker">Границы услуги</p>
            <h2>За что отвечаем, а что — партнёры</h2>
            <p>
              Мы делаем облицовку: подготовку под плитку, гидроизоляцию,
              укладку, затирку, запилы, ниши и люки. Сантехнику, электрику и
              установку мебели выполняют партнёры — познакомим, если нужно.
              Бассейны и хаммамы в эту услугу не входят.
            </p>
          </div>
        </section>
        <section className="ep-section">
          <SectionHeading kicker="Смотрите также" title="Связанные услуги" />
          <ServiceGrid
            compact
            items={page.related.map((key) =>
              services.find((service) => service.key === key),
            )}
          />
        </section>
        <FAQ
          items={page.faq}
          intro={false}
          title={
            page.key === "bathroom"
              ? "Про ванную спрашивают"
              : "Вопросы об услуге"
          }
        />
      </div>
      <CallToAction service={page} />
    </>
  );
}
export function CalculatorPage({ page }) {
  return (
    <div className="ep-container">
      <PageHeading page={page}>
        <p className="ep-lead">
          Считайте работы и количество плитки отдельно. Результат виден сразу,
          без телефона.
        </p>
      </PageHeading>
      <EstimateCalculator />
    </div>
  );
}
export function PortfolioPage({ page }) {
  return (
    <div className="ep-container ep-portfolio-page">
      <ProjectGallery page={page} />
    </div>
  );
}
export function ProjectPage({ page }) {
  const project = page.project;
  const related = services
    .filter(
      (service) =>
        (project.material && service.material === project.material) ||
        (project.room && service.room === project.room),
    )
    .slice(0, 3);
  return (
    <div className="ep-container">
      <Breadcrumbs
        page={page}
        parent={{ href: "/raboty/", label: "Наши работы" }}
      />
      <div className="ep-page-heading">
        <h1>{project.title}</h1>
      </div>
      <section className="ep-project-hero">
        <img
          src={project.image}
          alt={project.title}
          width="800"
          height="600"
          fetchPriority="high"
        />
        <aside>
          <p className="ep-kicker">Паспорт проекта</p>
          <dl className="ep-definition">
            {[
              ["Помещение", rooms[project.room]],
              ["Материал", materials[project.material] || "{Материал}"],
              ["Формат", project.format || "{Формат}"],
              ["Площадь", project.area ? `${project.area} м²` : "{Площадь}"],
              [
                "Срок",
                project.clientConsent && project.term
                  ? project.term
                  : "{Срок — с согласия клиента}",
              ],
              [
                "Стоимость работ",
                project.clientConsent && project.cost
                  ? formatMoney(project.cost)
                  : "{Стоимость — с согласия клиента}",
              ],
              ["Год", project.year || "{Год}"],
            ].map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <Button
            href={calculationHref({
              material: project.material || "ceramic",
              mode: "detail",
            })}
          >
            Рассчитать похожий проект
          </Button>
        </aside>
      </section>
      <section className="ep-section ep-three">
        {[
          ["Задача", project.task],
          ["Трудности", project.difficulties],
          ["Результат", project.result],
        ].map(([title, text]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{text || `{${title} проекта}`}</p>
          </article>
        ))}
      </section>
      <section className="ep-section">
        <SectionHeading kicker="Процесс" title="Как выполняли работу" />
        <div className="ep-process">
          {project.process.length
            ? project.process.map((item) => (
                <figure key={item.image}>
                  <img src={item.image} alt={item.caption} loading="lazy" />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              ))
            : [1, 2, 3, 4].map((number) => (
                <figure key={number}>
                  <Placeholder>{`{Фото этапа ${number}}`}</Placeholder>
                  <figcaption>{`{Подпись этапа ${number}}`}</figcaption>
                </figure>
              ))}
        </div>
      </section>
      <section className="ep-section">
        <SectionHeading
          kicker="Состав проекта"
          title="Услуги из этого проекта"
        />
        <ServiceGrid compact items={related} />
      </section>
      <section className="ep-section">
        <SectionHeading kicker="Портфолио" title="Похожие проекты" />
        <ProjectCards
          items={projects
            .filter(
              (item) =>
                item.slug !== project.slug &&
                (item.room === project.room ||
                  item.material === project.material),
            )
            .slice(0, 3)}
        />
      </section>
    </div>
  );
}
export function AboutPage({ page }) {
  return (
    <div className="ep-container">
      <Breadcrumbs page={page} />
      <section className="ep-about-hero">
        <div>
          <h1>{page.h1}</h1>
          {companyText.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <div className="ep-actions">
            <RequestAction>Обсудить задачу</RequestAction>
            <TextLink href="/raboty/" external>
              Наши работы
            </TextLink>
          </div>
        </div>
        <img
          src="/img/header/background__header-one.jpg"
          alt="Мастер укладывает плитку"
          width="700"
          height="600"
          fetchPriority="high"
        />
      </section>
      <section className="ep-section">
        <SectionHeading
          kicker="Кто выполняет работы"
          title="Мастера, а не биржа"
        >
          <p>Мастер с замера — тот же, что выходит на объект.</p>
        </SectionHeading>
        <div className="ep-team">
          {[1, 2, 3].map((n) => (
            <article key={n}>
              <Placeholder>{"{портрет мастера}"}</Placeholder>
              <h3>{"{Имя}"}</h3>
              <p>{"{специализация · стаж}"}</p>
            </article>
          ))}
          <article className="ep-team__summary">
            <p className="ep-kicker">Бригада</p>
            <h3>
              {"{N}"}
              <span>мастеров в штате</span>
            </h3>
            <p>
              Укладка, затирка, запилы и подготовка — свои люди. Сантехника и
              электрика — партнёры, с которыми работаем на объектах.
            </p>
          </article>
        </div>
      </section>
      <section className="ep-section">
        <SectionHeading
          kicker="Контроль качества"
          title="Что проверяем до сдачи"
        >
          <p>
            Проверяем сами, до того как вы примете работу. Допуски и критерии
            подтверждает технический специалист компании.
          </p>
        </SectionHeading>
        <div className="ep-quality">
          {[
            [
              "Плоскость и уровень",
              "Правило и уровень по полу и стенам, перепады между соседними плитками.",
            ],
            [
              "Швы",
              "Одинаковая ширина, совпадение швов пола и стен там, где это заложено раскладкой.",
            ],
            [
              "Примыкания и углы",
              "Запилы, профили, стыки с ванной и поддоном, герметизация.",
            ],
            [
              "Пустоты и мокрые зоны",
              "Простукивание, уклоны к трапу, целостность гидроизоляции до облицовки.",
            ],
          ].map(([title, text], index) => (
            <article key={title}>
              <span className="ep-kicker">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="ep-section ep-three">
        <article>
          <p className="ep-kicker">Договор</p>
          <h2>Работаем по договору</h2>
          <p>
            Смета, сроки и порядок оплаты фиксируются в договоре до начала
            работ.
          </p>
          <p className="ep-placeholder-text">{"{образец договора — ссылка}"}</p>
        </article>
        <article>
          <p className="ep-kicker">Гарантия</p>
          <h2>Условия гарантии</h2>
          <p className="ep-placeholder-text">
            {"{срок и условия гарантии компании}"}
          </p>
        </article>
        <article>
          <p className="ep-kicker">Смежные работы и партнёры</p>
          <h2>Ремонт и мебель</h2>
          <p>
            Ремонт квартиры целиком или мебель под готовую облицовку —
            познакомим с партнёрами, с которыми работаем на объектах. Сами
            делаем только плитку.
          </p>
        </article>
      </section>
    </div>
  );
}
function AddressForm() {
  const [address, setAddress] = useState("");
  const [floor, setFloor] = useState("");
  const [lift, setLift] = useState("Есть грузовой");
  const [prepared, setPrepared] = useState("");
  const [copied, setCopied] = useState(false);
  return (
    <form
      className="ep-address-form"
      onSubmit={(event) => {
        event.preventDefault();
        setPrepared(
          `Здравствуйте! Уточните, пожалуйста, условия выезда.\nАдрес: ${address}\nЭтаж: ${floor || "не указан"}\nЛифт: ${lift}`,
        );
        setCopied(false);
      }}
    >
      <p className="ep-kicker">Уточнить выезд</p>
      <h2>Проверьте свой адрес</h2>
      <Field
        label="Адрес объекта"
        value={address}
        onChange={setAddress}
        required
        maxLength={500}
        autoComplete="street-address"
      />
      <div className="ep-fields ep-fields_two">
        <Field
          label="Этаж"
          value={floor}
          onChange={setFloor}
          maxLength={10}
          inputMode="numeric"
        />
        <Field label="Лифт" value={lift} onChange={setLift}>
          <option>Есть грузовой</option>
          <option>Только пассажирский</option>
          <option>Нет</option>
        </Field>
      </div>
      <Button type="submit">Уточнить условия выезда</Button>
      <p className="ep-note">
        Подготовим запрос для Telegram. Ответим в рабочее время. Телефон не
        обязателен.
      </p>
      {prepared && (
        <div className="ep-address-form__prepared">
          <p role="status">
            Запрос подготовлен. Скопируйте его и отправьте нам в Telegram.
          </p>
          <pre>{prepared}</pre>
          <Button
            outline
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(prepared);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? "Скопировано" : "Скопировать запрос"}
          </Button>
          <Button href={site.telegramHref} target="_blank" rel="noreferrer">
            Открыть Telegram
          </Button>
        </div>
      )}
    </form>
  );
}
export function ContactsPage({ page }) {
  return (
    <div className="ep-container">
      <Breadcrumbs page={page} />
      <section className="ep-contact-hero">
        <div>
          <h1>{page.h1}</h1>
          <dl className="ep-definition">
            <div>
              <dt>Телефон</dt>
              <dd>
                <a href={site.phoneHref}>{site.phoneLabel}</a>
              </dd>
            </div>
            <div>
              <dt>Telegram</dt>
              <dd>
                <a href={site.telegramHref}>{site.phoneLabel}</a>
              </dd>
            </div>
            <div>
              <dt>MAX</dt>
              <dd>{site.phoneLabel}</dd>
            </div>
            <div>
              <dt>Адрес</dt>
              <dd>{site.address}</dd>
            </div>
            <div>
              <dt>График</dt>
              <dd>{site.hours}</dd>
            </div>
          </dl>
          <div className="ep-actions">
            <RequestAction>Заказать звонок</RequestAction>
            <Button href={site.telegramHref} outline>
              Написать в Telegram
            </Button>
          </div>
        </div>
        <Map />
      </section>
      <section className="ep-section ep-contact-area" id="geografiya">
        <div>
          <p className="ep-kicker">Зона выезда</p>
          <h2>Москва и область до 50 км от МКАД</h2>
          <p>
            Выезжаем на замер и работаем в Москве и ближайшем Подмосковье.
            Конкретный адрес проверяем отдельно: от него зависят условия выезда,
            доставка материала и подъём.
          </p>
          <div className="ep-contact-conditions">
            {[
              ["Внутри МКАД", "замер и выезд — по условиям договора"],
              ["До 50 км", "дорога учитывается в смете отдельной строкой"],
              ["Дальше 50 км", "обсуждаем индивидуально"],
            ].map(([title, text]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
        <AddressForm />
      </section>
      <section className="ep-section ep-three">
        <div>
          <h2>Реквизиты</h2>
          <p className="ep-placeholder-text">
            {"{Наименование}"}
            <br />
            {"{ИНН / ОГРН}"}
            <br />
            {"{юридический адрес}"}
          </p>
        </div>
        <div>
          <h2>Документы</h2>
          <TextLink href="/privacy/">Политика обработки данных</TextLink>
          <TextLink href="/consent/">Согласие на обработку данных</TextLink>
        </div>
        <div>
          <h2>Быстрый путь</h2>
          <TextLink href="/kalkulyator/">Калькулятор стоимости</TextLink>
          <TextLink href="/ceny/">Прайс</TextLink>
        </div>
      </section>
    </div>
  );
}
// Шаблон второго этапа. Без реального материала маршрут и страница не создаются.
export function ArticlePage({ page }) {
  return (
    <article className="ep-container ep-article">
      <PageHeading page={page}>
        <p className="ep-lead">{page.lead}</p>
      </PageHeading>
      {page.sections?.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.text}</p>
          {section.image && (
            <img
              src={section.image}
              alt={section.caption || ""}
              loading="lazy"
            />
          )}
        </section>
      ))}
      {page.related?.length > 0 && <ServiceGrid compact items={page.related} />}
    </article>
  );
}
