import { useState } from "react";
import { pages, leadServices } from "./content/pages.js";
import {
  HomePage,
  ServicePage,
  CalculatorPage,
  PortfolioPage,
  ProjectPage,
  AboutPage,
  ContactsPage,
  ArticlePage,
} from "./components/HandoffPages.jsx";
import { PricesPage } from "./components/PriceTable.jsx";
import {
  Footer,
  Header,
  PageHeading,
  Placeholder,
} from "./components/SiteLayout.jsx";
import { ConfidentialityBrief } from "./content/ConfidentialityBrief.jsx";
import { Dialog } from "./components/Dialog.jsx";
import { LeadForm } from "./components/LeadForm.jsx";
import { RequestContext } from "./lib/request-context.js";
import { useScrollAnimations } from "./lib/useScrollAnimations.js";

const components = {
  home: HomePage,
  service: ServicePage,
  prices: PricesPage,
  calculator: CalculatorPage,
  portfolio: PortfolioPage,
  project: ProjectPage,
  about: AboutPage,
  contacts: ContactsPage,
  article: ArticlePage,
};
export function App({ pageKey }) {
  useScrollAnimations();
  const [request, setRequest] = useState(null);
  const page = pages[pageKey];
  const Page = components[page?.type];
  return (
    <RequestContext.Provider value={(value = {}) => setRequest(value)}>
      <div className="ep-site">
        <a className="skip-link" href="#main">
          Перейти к содержимому
        </a>
        {page?.type !== "home" && <Header path={page?.path} />}
        <main id="main" tabIndex={-1}>
          {!page ? (
            <div className="ep-container ep-not-found">
              <p className="ep-kicker">404</p>
              <h1>Страница не найдена</h1>
              <p>Проверьте адрес или выберите раздел в меню.</p>
              <a className="ep-link" href="/">
                На главную →
              </a>
            </div>
          ) : Page ? (
            <Page page={page} />
          ) : page.type === "privacy" ? (
            <div className="ep-container ep-privacy">
              <PageHeading page={page} />
              <ConfidentialityBrief />
            </div>
          ) : page.type === "consent" ? (
            <div className="ep-container ep-article">
              <PageHeading page={page} />
              <Placeholder>
                {
                  "{Текст согласия на обработку персональных данных — предоставляет владелец}"
                }
              </Placeholder>
              <a className="ep-link" href="/privacy/">
                Политика конфиденциальности →
              </a>
            </div>
          ) : null}
        </main>
        <Footer />
        {request && (
          <Dialog
            label={
              request.calculation
                ? "Получить предварительный расчёт"
                : "Оставить заявку"
            }
            className="request-dialog"
            onClose={() => setRequest(null)}
          >
            <div className="ep-request">
              <p className="ep-kicker">Элит-Плит</p>
              <h2>
                {request.calculation ? "Получить расчёт" : "Оставить заявку"}
              </h2>
              <p>Скидка 10% при заказе с сайта</p>
              <LeadForm
                services={leadServices}
                calculation={request.calculation}
              />
            </div>
          </Dialog>
        )}
      </div>
    </RequestContext.Provider>
  );
}
