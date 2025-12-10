"use client";
import React, { useState, useEffect, useRef } from "react";

const Thermometer = ({ value }) => {
  const pct = Math.max(0, Math.min(100, value));
  const fillHeight = `calc(${pct}% - 8px)`;

  return (
    <div className="neumorph flex flex-col items-center justify-center p-4">
      <div className="thermo w-14 h-95 bg-transparent relative flex items-center justify-center">
        <div className="thermo-track absolute left-1/2 transform -translate-x-1/2 top-3 bottom-3 w-2 bg-white/20 rounded-full" />
        <div className="thermo-bulb absolute left-1/2 transform -translate-x-1/2 bottom-0 w-8 h-8 rounded-full bg-red-500 shadow-inner" />
        <div
          className="thermo-fill absolute left-1/2 transform -translate-x-1/2 w-2 bg-red-500 rounded-full transition-all"
          style={{ bottom: 10, height: fillHeight }}
        />
      </div>
    </div>
  );
};

export default function TemperatureCard({ current = null, online = true }) {
  const [temp, setTemp] = useState(null);
  const [minTemp, setMinTemp] = useState(null);
  const [maxTemp, setMaxTemp] = useState(null);
  const bufferRef = useRef([]);

  useEffect(() => {
    if (!online || current === null) {
      setTemp(null);
      setMinTemp(null);
      setMaxTemp(null);
      bufferRef.current = [];
      return;
    }

    bufferRef.current.push(current);
    if (bufferRef.current.length > 5) bufferRef.current.shift();

    const avg = bufferRef.current.reduce((a, b) => a + b, 0) / bufferRef.current.length;
    setTemp(avg);
    setMinTemp(prev => (prev === null ? avg : Math.min(prev, avg)));
    setMaxTemp(prev => (prev === null ? avg : Math.max(prev, avg)));
  }, [current, online]);

  const displayTemp = temp === null ? "--" : temp.toFixed(1);
  const displayMin = minTemp === null ? "--" : minTemp.toFixed(1);
  const displayMax = maxTemp === null ? "--" : maxTemp.toFixed(1);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center">
      <div className="font-bold text-white/95 text-xl uppercase tracking-wide mt-5">
        Temperature
      </div>

      <div className="text-5xl font-extrabold text-white my-2">{displayTemp}°C</div>

      <Thermometer value={temp} />

      <div className="font-semibold text-l text-blue-500 mt-2">Min: {displayMin}°C</div>
      <div className="font-semibold text-l text-red-500">Max: {displayMax}°C</div>
    </div>
  );
}
