import { StylingBrief } from "./StylingBrief.jsx";
import { IndexInfo } from "./IndexInfo.jsx";
import { StylingSentence } from "./StylingSentence.jsx";
import { IndexAdvantage } from "./IndexAdvantage.jsx";
import { StylingStock } from "./StylingStock.jsx";
import { Portfolio } from "../components/Portfolio.jsx";
export default function Page({ page }) {
  return (
    <>
      <StylingBrief page={page} />
      <IndexInfo page={page} />
      <StylingSentence page={page} />
      <IndexAdvantage page={page} />
      <StylingStock page={page} />
      <Portfolio page={page} />
    </>
  );
}
