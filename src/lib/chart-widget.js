import { getInstanceByDom, init } from 'echarts';

// Globale Variablen für State-Management
let echartsPromise = null;
const chartStore = new Map();
let resizeObserver;
let intersectionObserver;
let mutationObserver;
let resizeRaf = null;

// --- HILFSFUNKTIONEN ---

const loadEcharts = () => {
  if (!echartsPromise) {
    echartsPromise = import("echarts").then(m => m.default || m);
  }
  return echartsPromise;
};

const isObject = (item) => (item && typeof item === 'object' && !Array.isArray(item));

const deepMerge = (target, source) => {
  const output = Array.isArray(target) ? [...target] : { ...target };
  if (Array.isArray(target) && Array.isArray(source)) {
    source.forEach((item, index) => {
      if (index < output.length && isObject(output[index]) && isObject(item)) {
        output[index] = deepMerge(output[index], item);
      } else {
        output[index] = item;
      }
    });
    return output;
  }
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = deepMerge(target[key], source[key]);
      } else if (Array.isArray(source[key]) && Array.isArray(target[key])) {
         output[key] = deepMerge(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};

const getThemeConfig = () => {
  const dark = document.documentElement.classList.contains('dark');
  const text = dark ? '#cbd5e1' : '#475569';
  const split = dark ? '#334155' : '#e2e8f0';
  const bg = dark ? 'rgba(30,41,59,0.95)' : 'rgba(255,255,255,0.95)';
  const border = dark ? '#475569' : '#cbd5e1';
  
  return {
     textStyle: { color: text },
     legend: { textStyle: { color: text } },
     tooltip: { backgroundColor: bg, borderColor: border, textStyle: { color: text } },
     xAxis: { splitLine: { lineStyle: { color: split } } },
     yAxis: [{ splitLine: { lineStyle: { color: split } } }, { splitLine: { show: false } }]
  };
};

// --- RENDER LOGIK ---

const render = async (el) => {
  if (el.getAttribute('data-loaded') === 'true') return;

  const jsonId = el.getAttribute('data-json-id');
  const scriptTag = document.getElementById(jsonId);
  if (!scriptTag) return;

  let config;
  try { config = JSON.parse(scriptTag.textContent); } catch (e) { console.error("JSON Parse Error", e); return; }
  if (!config.baseOptions) return;

  const echarts = await loadEcharts();
  const chart = echarts.init(el, null, { renderer: 'canvas' });
  const { baseOptions, userOptions, locale } = config;

  const axisFormat = new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 });
  const currencyFormat = new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' });

  // 1. Merge Base + User
  let finalOptions = deepMerge(baseOptions, userOptions || {});
  
  // 2. Merge Theme
  finalOptions = deepMerge(finalOptions, getThemeConfig());

  // 3. Formatter Logic
  if (finalOptions.yAxis && finalOptions.yAxis[0]) {
      finalOptions.yAxis[0].axisLabel = { 
          ...finalOptions.yAxis[0].axisLabel, 
          formatter: val => axisFormat.format(val) 
      };
  }

  if (finalOptions.tooltip) {
      finalOptions.tooltip.formatter = (params) => {
          const items = Array.isArray(params) ? params : [params];
          if (!items.length) return '';
          let html = `<div class="font-bold mb-1">${dateFormat.format(new Date(items[0].value[0]))}</div>`;
          
          items.forEach(p => {
              const val = p.seriesName === 'Drawdown %'
                ? Math.abs(p.value[1]).toFixed(2) + '%'
                : currencyFormat.format(p.value[1]);
                
              html += `<div class="flex justify-between gap-4">
                         <span>${p.marker} ${p.seriesName}</span>
                         <span class="font-mono font-bold">${val}</span>
                       </div>`;
          });
          return html;
      };
  }

  chart.setOption(finalOptions);
  chartStore.set(el, { chart });
  el.setAttribute('data-loaded', 'true');
};

// --- EXPORTIERTE FUNKTIONEN ---

export const cleanup = () => {
  chartStore.forEach(({ chart }) => {
     if (!chart.isDisposed()) {
       chart.dispose();
     }
  });
  chartStore.clear();
  
  if (resizeRaf !== null) {
     cancelAnimationFrame(resizeRaf);
     resizeRaf = null;
  }
  if (resizeObserver) resizeObserver.disconnect();
  if (intersectionObserver) intersectionObserver.disconnect();
  if (mutationObserver) mutationObserver.disconnect();
  
  document.querySelectorAll('[data-json-id]').forEach(el => el.removeAttribute('data-loaded'));
};

export const initChartWidget = () => {
  // Sicherheitshalber cleanup aufrufen, falls noch alte Instanzen da sind
  cleanup();

  const elements = document.querySelectorAll('[data-json-id]');
  if (elements.length === 0) return;

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
      if (resizeRaf !== null) {
         cancelAnimationFrame(resizeRaf);
         resizeRaf = null;
      }
      resizeRaf = requestAnimationFrame(() => {
        entries.forEach(e => {
            const item = chartStore.get(e.target);
            if (item?.chart) item.chart.resize();
        });
      });
  });

  mutationObserver = new MutationObserver((mutations) => {
      if (mutations.some(m => m.attributeName === 'class')) {
          const themeConfig = getThemeConfig();
          chartStore.forEach(({ chart }) => {
              chart.setOption(themeConfig);
          });
      }
  });
  mutationObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  elements.forEach(el => intersectionObserver.observe(el));
};
