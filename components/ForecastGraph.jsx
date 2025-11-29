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
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ForecastGraph = ({ labels = [], data = [] }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Next 7 day(s)',
        data,
        borderColor: '#fb7185',
        backgroundColor: 'rgba(251,113,133,0.12)',
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: '#fb7185'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.9)' } },
      y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: 'rgba(255,255,255,0.9)' } }
    }
  };

  return (
    <div className="neumorph p-6 w-full h-72">
      <div className="text-sm text-white/90 mb-4">Next 7 day(s)</div>
      <div className="w-full h-56">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ForecastGraph;
