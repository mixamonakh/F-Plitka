import { PhototileBrief } from "./PhototileBrief.jsx";
import { IndexInfo } from "./IndexInfo.jsx";
import { Solutions } from "../components/Solutions.jsx";
import { IndexAdvantage } from "./IndexAdvantage.jsx";
import { PhototileStock } from "./PhototileStock.jsx";
import { Portfolio } from "../components/Portfolio.jsx";
export default function Page({ page }) {
  return (
    <>
      <PhototileBrief page={page} />
      <IndexInfo page={page} />
      <Solutions page={page} />
      <IndexAdvantage page={page} />
      <PhototileStock page={page} />
      <Portfolio page={page} />
    </>
  );
}
