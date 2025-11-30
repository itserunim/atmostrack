"use client";
import React from "react";

const Thermometer = ({ value = 28, min = 0, max = 50 }) => {
  // vertical thermometer using simple markup and CSS classes
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const fillHeight = `calc(${pct}% - 8px)`;
  return (
    <div className="neumorph h-full w-full flex items-center justify-center">
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

        {/* max label at top-right of track */}
        <div className="absolute -right-6 top-2 text-sm font-semibold text-red-300">{max}°C</div>
        {/* min label at bottom-right, above bulb */}
        <div className="absolute -right-6 bottom-2 text-sm font-semibold text-blue-300">{min}°C</div>
      </div>
    </div>
  );
};

const TemperatureCard = ({ current = 28, min = 24, max = 32 }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center">
      <div className="font-bold text-white/95 text-sm uppercase tracking-wide">Temperature</div>
      <div className="text-5xl font-extrabold text-white my-4">{current}°C</div>
      <div className="w-full flex items-center justify-center">
        <Thermometer value={current} min={min} max={max} />
      </div>
    </div>
  );
};

export default TemperatureCard;
