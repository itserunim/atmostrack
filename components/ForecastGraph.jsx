"use client";
import React, { useState, useEffect } from "react";
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
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Helper to format labels nicely
const formatLabel = (str) =>
  str
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const ForecastGraph = ({ initialMetric = "temperature" }) => {
  const [metric, setMetric] = useState(initialMetric);
  const [range, setRange] = useState("1D");
  const [labels, setLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);

  const metricColors = {
    temperature: { line: "#fb923c" },
    humidity: { line: "#60a5fa" },
    pressure: { line: "#a78bfa" },
    wind_speed: { line: "#34d399" },
    rain: { line: "#f87171" }
  };
  const colors = metricColors[metric] || metricColors.temperature;

  // Fetch forecast from API whenever range changes
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await fetch(`/api/hourlyReadings?range=${range}`);
        const data = await res.json();

        if (!Array.isArray(data)) return;

        // -----------------------------
        // 🟦 1 DAY RANGE (no changes)
        // -----------------------------
        if (range === "1D") {
          const currentHour = new Date().getHours();
          const hourLabels = Array.from({ length: currentHour + 1 }, (_, i) => {
            const h = i % 12 === 0 ? 12 : i % 12;
            const ampm = i < 12 ? "AM" : "PM";
            return `${h}:00 ${ampm}`;
          });

          const values = data
            .slice(-hourLabels.length)
            .map((d) => d[metric] ?? 0);

          setLabels(hourLabels);
          setDataPoints(values);
        }

        // -----------------------------
        // 🟩 5 DAY RANGE (updated to IGNORE zero values)
        // -----------------------------
        if (range === "5D") {
          const daysAgo = [4, 3, 2, 1, 0];

          const dayLabels = daysAgo.map((d) => {
            const date = new Date();
            date.setDate(date.getDate() - d);
            return date.toLocaleDateString([], { weekday: "short" });
          });

          const values = daysAgo.map((d) => {
            const dayStart = new Date();
            dayStart.setDate(dayStart.getDate() - d);
            dayStart.setHours(0, 0, 0, 0);

            const dayEnd = new Date(dayStart);
            dayEnd.setHours(23, 59, 59, 999);

            const dayData = data.filter((entry) => {
              const ts = new Date(entry.timestamp);
              return ts >= dayStart && ts <= dayEnd;
            });

            // Filter out zero values for averaging
            const validData = dayData
              .map((e) => e[metric] ?? 0)
              .filter((v) => v !== 0);

            if (!validData.length) return 0;

            return (
              validData.reduce((sum, v) => sum + v, 0) / validData.length
            );
          });

          setLabels(dayLabels);
          setDataPoints(values);
        }
      } catch (err) {
        console.error("Failed to fetch forecast:", err);
      }
    };

    fetchForecast();
  }, [range, metric]);

  const maxValue = Math.max(...dataPoints) * 1.2 || 10;

  const chartData = {
    labels,
    datasets: [
      {
        label: formatLabel(metric),
        data: dataPoints,
        borderColor: colors.line,
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: colors.line
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => ctx.raw.toFixed(1) } }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "white", font: { size: 11 } }
      },
      y: {
        min: 0,
        max: maxValue,
        ticks: { color: "white", font: { size: 11 } },
        grid: { color: "rgba(255,255,255,0.05)" }
      }
    }
  };

  return (
    <div className="neumorph p-2 w-full h-full rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="text-white/95 text-sm font-semibold">
          {formatLabel(metric)} — {range}
        </div>

        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg bg-white/10 text-white/95 neumorph-inset"
        >
          {Object.keys(metricColors).map((m) => (
            <option key={m} value={m}>
              {formatLabel(m)}
            </option>
          ))}
        </select>

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

      <div className="w-full h-60">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ForecastGraph;
