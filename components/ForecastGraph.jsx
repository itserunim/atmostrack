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
  const [range, setRange] = React.useState('daily');

  // sample datasets for hourly and daily
  const sample = {
    hourly: {
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      data: Array.from({ length: 24 }, () => 18 + Math.round(Math.random() * 8 + Math.random() * 2))
    },
    daily: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      data: [22,21,22,23,24,25,23]
    },
  };

  const current = range === 'hourly' ? sample.hourly : sample.daily;
  // choose a line color based on current hour to match the TimeBasedBackground
  const hour = (new Date()).getHours();
  let lineColor = '#fb7185';
  let fillColor = 'rgba(251,113,133,0.12)';

  if (hour >= 5 && hour < 9) {
    // morning: warm/orange
    lineColor = '#fb923c';
    fillColor = 'rgba(251,146,60,0.12)';
  } else if (hour >= 9 && hour < 17) {
    // day: blue
    lineColor = '#60a5fa';
    fillColor = 'rgba(96,165,250,0.12)';
  } else if (hour >= 17 && hour < 20) {
    // evening: pink/orange
    lineColor = '#fb7185';
    fillColor = 'rgba(251,113,133,0.12)';
  } else {
    // night: soft purple/gray
    lineColor = '#a78bfa';
    fillColor = 'rgba(167,139,250,0.08)';
  }

  const chartData = {
    labels: current.labels,
    datasets: [
      {
        label: range === 'hourly' ? 'Hourly' : 'Daily',
        data: current.data,
        borderColor: lineColor,
        backgroundColor: fillColor,
        tension: 0.3,
        pointRadius: range === 'hourly' ? 2 : 4,
        pointBackgroundColor: lineColor
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
    <div className="neumorph p-6 w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold text-m text-white/90">{range === 'hourly' ? 'Next 24 hours' : 'Next 7 day(s)'}</div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setRange('hourly')} className={`px-3 py-1 rounded ${range==='hourly' ? 'bg-white/20 text-white' : 'text-white/60'}`}>Hourly</button>
          <button onClick={() => setRange('daily')} className={`px-3 py-1 rounded ${range==='daily' ? 'bg-white/20 text-white' : 'text-white/60'}`}>Daily</button>
        </div>
      </div>
      <div className="w-full h-56">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ForecastGraph;
