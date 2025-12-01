"use client";
import React from "react";

const Thermometer = ({ value = 28, min = 0, max = 50 }) => {
  // vertical thermometer using simple markup and CSS classes
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const fillHeight = `calc(${pct}% - 8px)`;
  
  return (
    <div className="neumorph flex flex-col items-center justify-center p-4">
      <div className="thermo w-14 h-95 bg-transparent relative flex items-center justify-center">
        {/* track */}
        <div className="thermo-track absolute left-1/2 transform -translate-x-1/2 top-3 bottom-3 w-2 bg-white/20 rounded-full" />
        {/* bulb */}
        <div className="thermo-bulb absolute left-1/2 transform -translate-x-1/2 bottom-0 w-8 h-8 rounded-full bg-red-500 shadow-inner" />
        {/* fill */}
        <div
          className="thermo-fill absolute left-1/2 transform -translate-x-1/2 w-2 bg-red-500 rounded-full"
          style={{ bottom: 10, height: fillHeight }}
        />
      </div>
    </div>
  );
};

const TemperatureCard = ({ current = 28, min = 24, max = 32 }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="font-bold text-white/95 text-xl uppercase tracking-wide">Temperature</div>
      <div className="text-5xl font-extrabold text-white my-4">{current}°C</div>
      <div className="w-full flex items-center justify-center">
        <Thermometer value={current} min={min} max={max} />
      </div>
      <div className="font-semibold text-l text-blue-500 mt-4">Min: {min}°C</div>
      <div className="font-semibold text-l text-red-500">Max: {max}°C</div>
    </div>
  );
};

export default TemperatureCard;
