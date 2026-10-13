import { useEffect } from "react";

// Reveal offscreen content once; the initial viewport stays visible on hydration.
export function useScrollAnimations() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = [...document.querySelectorAll('[data-motion="reveal"]')];
    const revealed = new WeakSet();
    const threshold = 0.15;
    let observer;
    const clean = () => {
      observer?.disconnect();
      for (const element of targets) {
        element.classList.remove("motion-pending", "motion-reveal");
      }
    };
    const reveal = (element, animate = true) => {
      revealed.add(element);
      observer?.unobserve(element);
      element.classList.remove("motion-pending");
      element.classList.toggle("motion-reveal", animate);
    };
    const finish = (event) => {
      if (event.animationName === "content-reveal")
        event.target.classList.remove("motion-reveal");
    };
    const showFocused = (event) => {
      const element = event.target.closest('[data-motion="reveal"]');
      if (element) reveal(element, false);
    };
    const start = () => {
      clean();
      if (preference.matches || !("IntersectionObserver" in window)) {
        targets.forEach((element) => revealed.add(element));
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting || entry.intersectionRatio < threshold)
              continue;
            reveal(entry.target);
          }
        },
        { threshold, rootMargin: "0px 0px -80px 0px" },
      );
      for (const element of targets) {
        if (revealed.has(element)) continue;
        const bounds = element.getBoundingClientRect();
        if (bounds.height > 0 && bounds.top < window.innerHeight) {
          revealed.add(element);
          continue;
        }
        element.classList.add("motion-pending");
        observer.observe(element);
      }
    };
    start();
    document.addEventListener("animationend", finish);
    document.addEventListener("focusin", showFocused);
    preference.addEventListener("change", start);
    return () => {
      clean();
      document.removeEventListener("animationend", finish);
      document.removeEventListener("focusin", showFocused);
      preference.removeEventListener("change", start);
    };
  }, []);
}
