/* src/scripts/chart-widget.js */

let echartsPromise = null;
const loadEcharts = () => {
  if (!echartsPromise) {
    echartsPromise = import("echarts").then(m => m.default || m);
  }
  return echartsPromise;
};

const chartStore = new Map(); 
let resizeObserver, intersectionObserver, mutationObserver, resizeRaf = null;

// Hilfsfunktionen (isObject, deepMerge, getThemeConfig) hier einfügen...
const isObject = (item) => (item && typeof item === 'object' && !Array.isArray(item));
const deepMerge = (target, source) => { /* ... Dein Code für deepMerge ... */ return target; }; 
const getThemeConfig = () => { /* ... Dein Code für getThemeConfig ... */ };

const render = async (el) => {
   // ... Dein Code für render, aber 'deepMerge' und 'getThemeConfig' referenzieren ...
   // WICHTIG: Achte darauf, dass du echarts lädst:
   const echarts = await loadEcharts();
   // ... Rest wie gehabt ...
};

// Haupt-Export
export const initChartWidget = () => {
  cleanup(); // Alten Zustand bereinigen

  const elements = document.querySelectorAll('[data-json-id]');
  
  intersectionObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        render(e.target);
        intersectionObserver.unobserve(e.target);
        if (resizeObserver) resizeObserver.observe(e.target);
      }
    });
  }, { rootMargin: '200px 0px', threshold: 0.1 });

  resizeObserver = new ResizeObserver(entries => {
      /* ... Resize Logik ... */
  });

  mutationObserver = new MutationObserver((mutations) => {
      /* ... Theme Switch Logik ... */
  });
  mutationObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  elements.forEach(el => intersectionObserver.observe(el));
};

export const cleanup = () => {
   /* ... Cleanup Logik (Dispose, Disconnect Observers) ... */
};
