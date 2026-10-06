import { useEffect } from "react";

// Original Animate.css effects, observed natively instead of WOW.js.
export function useScrollAnimations() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;
    let targets = [];
    const clean = () => {
      observer?.disconnect();
      for (const element of targets) {
        element.classList.remove(
          "motion-pending",
          "animate__animated",
          ...element.dataset.motion.split(/\s+/),
        );
      }
    };
    const start = () => {
      clean();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      targets = [...document.querySelectorAll("[data-motion]")];
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.remove("motion-pending");
            entry.target.classList.add(
              "animate__animated",
              ...entry.target.dataset.motion.split(/\s+/),
            );
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.08 },
      );
      for (const element of targets) {
        element.classList.add("motion-pending");
        observer.observe(element);
      }
    };
    start();
    preference.addEventListener("change", start);
    return () => {
      clean();
      preference.removeEventListener("change", start);
    };
  }, []);
}
