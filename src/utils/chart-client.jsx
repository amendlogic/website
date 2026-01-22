import { useEffect, useRef } from "react";
import { Chart, registerables } from "https://cdn.jsdelivr.net/npm/chart.js/dist/chart.esm.js";

Chart.register(...registerables);

export default function ChartClient({ type = "bar", labels = [], datasets = [] }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    const chart = new Chart(ctx, {
      type,
      data: { labels, datasets },
      options: {
        responsive: true,
        plugins: { legend: { position: "top" } },
      },
    });

    return () => chart.destroy(); // Cleanup beim Unmount
  }, [type, labels, datasets]);

  return <canvas ref={canvasRef} className="w-full h-64" />;
}