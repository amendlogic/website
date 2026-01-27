(() => {
  const SELECTOR = ".intersect-once";
  let observer;

  const reveal = el => {
    el.classList.add("intersect:animate-fade");
    el.style.opacity = "1";
  };

  const initObserver = () => {
    if (observer) return;

    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    document.querySelectorAll(SELECTOR).forEach(el => {
      if (el.offsetWidth > 0 && el.offsetHeight > 0) {
        observer.observe(el);
      } else {
        // Fallback: sofort sichtbar
        reveal(el);
      }
    });
  };

  document.addEventListener("DOMContentLoaded", initObserver);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      document.querySelectorAll(SELECTOR).forEach(reveal);
    }
  });
})();
