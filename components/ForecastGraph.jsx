import React from "react";
import { Line } from "react-chartjs-2";

const ForecastGraph = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data,
        borderColor: "#f87171",
        backgroundColor: "rgba(248, 113, 113, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: false },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ForecastGraph;
