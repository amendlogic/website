import { useEffect, useRef } from "preact/hooks";
import Chart from "chart.js/auto";

export default function ChartClient({ type, labels, datasets }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const chart = new Chart(canvasRef.current, {
      type,
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => chart.destroy();
  }, []);

  return (
    <div style="height:300px">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}