"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ForecastGraph = () => {
  const [range, setRange] = React.useState("1D");   // 1D, 5D
  const [metric, setMetric] = React.useState("temperature");

  // ----- RANGE LABELS -----
  const labels1D = Array.from({ length: 12 }, (_, i) => `${8 + i}:00`); // 8AM–8PM
  const labels5D = ["Day 1","Day 2","Day 3","Day 4","Day 5"];

  // ----- RANDOMIZED METRIC VALUES (demo only) -----
  const sampleData = (n, base, v) =>
    Array.from({ length: n }, (_, i) => {
      const noise = Math.sin(i / 2) * v + (Math.random() - 0.5) * (v / 2);
      return Math.round((base + noise) * 10) / 10;
    });

  const generateData = () => {
    let labels = range === "1D" ? labels1D : labels5D;
    let count = labels.length;

    let base = { 
      temperature: 28, 
      humidity: 70, 
      pressure: 1013, 
      wind: 12, 
      precipitation: 1 
    }[metric];

    let variability = { 
      temperature: 2.3, 
      humidity: 8, 
      pressure: 3, 
      wind: 5, 
      precipitation: 1.4 
    }[metric];

    return { labels, data: sampleData(count, base, variability) };
  };

  const current = generateData();

  // ----- COLOR PALETTE -----
  const metricColors = {
    temperature: { line: "#fb923c", fill: "rgba(251,146,60,0.15)" },
    humidity: { line: "#60a5fa", fill: "rgba(96,165,250,0.15)" },
    pressure: { line: "#a78bfa", fill: "rgba(167,139,250,0.12)" },
    wind: { line: "#34d399", fill: "rgba(52,211,153,0.12)" },
    precipitation: { line: "#38bdf8", fill: "rgba(56,189,248,0.12)" },
  };

  const colors = metricColors[metric];

  // ----- TOOLTIP LABEL FORMATTER -----
  const valueSuffix = {
    temperature: "°C",
    humidity: "%",
    pressure: " hPa",
    wind: " km/h",
    precipitation: " mm",
  }[metric];

  const chartData = {
    labels: current.labels,
    datasets: [
      {
        label: range === "1D" ? "1D" : "5D",
        data: current.data,
        borderColor: colors.line,
        backgroundColor: colors.fill,
        fill: true,
        tension: 0.4,
        pointRadius: range === "1D" ? 4 : 4,
        pointBackgroundColor: colors.line,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "white", maxRotation: 0, font: { size: 11 } },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { color: "white", font: { size: 11 } },
      },
    },
  };

  // ----- PANEL TITLE -----
  const prettyMetric = metric.charAt(0).toUpperCase() + metric.slice(1);
  const title = `${prettyMetric} — ${range}`;

  return (
    <div className="neumorph p-4 w-full h-full rounded-xl">

      {/* ----- CONTROLS AREA ----- */}
      <div className="flex items-center justify-between mb-4">
        <div className=" text-white/95 text-sm font-semibold">
          {title}
        </div>
          
        {/* METRIC DROPDOWN */}
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg bg-white/10 text-white/95 neumorph-inset"
        >
          <option value="temperature">Temperature</option>
          <option value="humidity">Humidity</option>
          <option value="pressure">Pressure</option>
          <option value="wind">Wind</option>
          <option value="precipitation">Rain</option>
        </select>

        {/* RANGE BUTTONS (1D / 5D) */}
        <div className="flex bg-white/10 rounded-xl neumorph-inset p-1">
          {["1D", "5D"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1 rounded-lg text-sm transition-all ${
                range === r
                  ? "bg-white/10 text-white shadow-inner"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* GRAPH */}
      <div className="w-full h-60">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ForecastGraph;
