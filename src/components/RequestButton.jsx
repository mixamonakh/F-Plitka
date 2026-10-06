import { useContext } from "react";
import { RequestContext } from "../lib/request-context.js";

export function RequestButton({ children, ...props }) {
  const openRequest = useContext(RequestContext);
  return (
    <button {...props} type="button" onClick={openRequest}>
      {children}
    </button>
  );
}
