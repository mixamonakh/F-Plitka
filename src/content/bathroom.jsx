import { BathroomServices } from "./BathroomServices.jsx";
import { IndexInfo } from "./IndexInfo.jsx";
import { IndexAdvantage } from "./IndexAdvantage.jsx";
import { IndexStock } from "./IndexStock.jsx";
import { Portfolio } from "../components/Portfolio.jsx";
export default function Page({ page }) {
  return (
    <>
      <BathroomServices page={page} />
      <IndexInfo page={page} />
      <IndexAdvantage page={page} />
      <IndexStock page={page} />
      <Portfolio page={page} />
    </>
  );
}
