import { useEffect, useState } from "react";

export function useUrlFilters(defaults) {
  const [filters, setFilters] = useState(defaults);
  useEffect(() => {
    const read = () => {
      const search = new URLSearchParams(window.location.search);
      setFilters((current) =>
        Object.fromEntries(
          Object.keys(current).map((key) => [key, search.get(key) || ""]),
        ),
      );
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);
  const update = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
    const url = new URL(window.location.href);
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
    window.history.replaceState(null, "", url);
  };
  return [filters, update];
}
