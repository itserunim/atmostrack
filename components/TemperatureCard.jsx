"use client";
import React from "react";

const Thermometer = ({ value = 22 }) => {
  // vertical thermometer using simple markup and CSS classes
  const level = Math.max(0, Math.min(100, (value - 0) / (50 - 0) * 100));
  return (
    <div className="flex items-center space-x-4">
      <div className="thermo w-12 h-56 bg-transparent relative">
        <div className="thermo-track absolute left-1/2 transform -translate-x-1/2 top-2 bottom-2 w-2 bg-white/20 rounded-full" />
        <div className="thermo-bulb absolute left-1/2 transform -translate-x-1/2 bottom-0 w-8 h-8 rounded-full bg-red-500 shadow-inner" />
        <div
          className="thermo-fill absolute left-1/2 transform -translate-x-1/2 w-2 bg-red-500 rounded-full"
          style={{ bottom: 8, height: `calc(${level}% - 8px)` }}
        />
      </div>
    </div>
  );
};

const TemperatureCard = ({ current = 28, min = 24, max = 32 }) => {
  return (
    <div className="neumorph flex flex-col items-center justify-center h-96 w-28 text-center">
      <div className="text-white/95 text-sm uppercase tracking-wide">Temperature</div>
      <div className="text-5xl font-extrabold text-white my-4">{current}°C</div>
      <Thermometer value={current} />
      <div className="mt-4 text-sm text-red-400">{max}°C <span className="text-blue-300">{min}°C</span></div>
    </div>
  );
};

export default TemperatureCard;
