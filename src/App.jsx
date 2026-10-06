import { useState } from "react";
import { pages } from "./content/pages.js";
import Index from "./content/index.jsx";
import Bathroom from "./content/bathroom.jsx";
import Phototile from "./content/phototile.jsx";
import Styling from "./content/styling.jsx";
import Confidentiality from "./content/confidentiality.jsx";
import { Hero } from "./components/Hero.jsx";
import { Navigation } from "./components/Navigation.jsx";
import { Contacts } from "./components/Contacts.jsx";
import { Dialog } from "./components/Dialog.jsx";
import { LeadForm } from "./components/LeadForm.jsx";
import { RequestContext } from "./lib/request-context.js";
import { useScrollAnimations } from "./lib/useScrollAnimations.js";

const components = {
  index: Index,
  bathroom: Bathroom,
  phototile: Phototile,
  styling: Styling,
  confidentiality: Confidentiality,
};

export function App({ pageKey }) {
  useScrollAnimations();
  const [requestOpen, setRequestOpen] = useState(false);
  const page = pages[pageKey];
  const Page = components[pageKey];
  if (!page || !Page)
    return (
      <main className="not-found">
        <h1>Страница не найдена</h1>
        <a href="/">На главную</a>
      </main>
    );
  return (
    <RequestContext.Provider value={() => setRequestOpen(true)}>
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <Hero page={page} />
      <Navigation page={page} />
      <main id="main" tabIndex={-1}>
        <h1 className="sr-only">{page.title}</h1>
        <Page page={page} />
      </main>
      <Contacts />
      {requestOpen && (
        <Dialog
          label="Оставить заявку"
          className="request-dialog"
          onClose={() => setRequestOpen(false)}
        >
          <div className="form form_modal">
            <h2 className="title title_fz45 title_fz45_white form__title">
              ЗАЯВКА
            </h2>
            <p className="title title_fz22 form__subtitle">
              Оставьте заявку прямо сейчас
            </p>
            <LeadForm services={page.services} />
          </div>
        </Dialog>
      )}
    </RequestContext.Provider>
  );
}
