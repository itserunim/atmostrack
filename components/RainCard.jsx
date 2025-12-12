"use client";
import React, { useState, useEffect, useRef } from "react";
import { WiRaindrop, WiRaindrops, WiRain, WiShowers } from "react-icons/wi";

// Convert raw ESP32 analog rain value (0-4095) to mm/h
// 4096 = dry, 0 = max rain
function convertAnalogRain(raw) {
  if (raw === null) return null;
  const value = Number(raw);

  // Invert: dry = 0, wet = max 10 mm/h
  const mmh = ((4096 - value) / 4096) * 10;
  return Math.max(0, mmh);
}

export default function RainCard({ rainValue = null, online = true }) {
  const [displayIntensity, setDisplayIntensity] = useState(null);
  const totalRef = useRef(0);
  const bufferRef = useRef([]);

  // Keep latest rain value
  const latestRain = useRef(rainValue);
  useEffect(() => { 
    latestRain.current = rainValue; 
    console.log("ESP32 rain raw value:", rainValue); // DEBUG log
  }, [rainValue]);

  useEffect(() => {
    if (!online) {
      setDisplayIntensity(null);
      bufferRef.current = [];
      return;
    }

    const interval = setInterval(() => {
      if (latestRain.current !== null) {
        const mmh = convertAnalogRain(latestRain.current);

        // Moving average (last 5 readings)
        bufferRef.current.push(mmh);
        if (bufferRef.current.length > 5) bufferRef.current.shift();
        const avg = bufferRef.current.reduce((a, b) => a + b, 0) / bufferRef.current.length;

        setDisplayIntensity(avg);

        // Accumulate total rainfall (mm) over 2 seconds
        totalRef.current += avg * 2 / 3600;
      }
    }, 500); // update every 2 seconds

    return () => clearInterval(interval);
  }, [online]);

  const safeDisplay = val => (val === null ? "--" : val.toFixed(2));

  let Icon = WiShowers;
  let description = online ? "Waiting for data..." : "Waiting for data...";

  if (displayIntensity !== null) {
    if (displayIntensity === 0) { Icon = WiShowers; description = "No rain"; }
    else if (displayIntensity < 1) { Icon = WiShowers; description = "Drizzle"; }
    else if (displayIntensity < 3) { Icon = WiRaindrop; description = "Light rain"; }
    else if (displayIntensity < 7) { Icon = WiRaindrops; description = "Moderate rain"; }
    else { Icon = WiRain; description = "Heavy rain"; }
  }

  return (
    <div className="neumorph flex flex-col items-center justify-center h-60 w-full text-center">
      <h2 className="text-xl font-bold text-white/95 uppercase tracking-wide mt-1">Precipitation</h2>
      <div className="text-7xl h-25 text-white/95 transition-transform"><Icon /></div>
      <div className="text-[16px] font-bold text-white/95 -mt-5">
        Intensity: {safeDisplay(displayIntensity)} mm/h
      </div>
      <div className="text-[16px] font-bold text-white/95">
        Total Today: {safeDisplay(totalRef.current)} mm
      </div>
      <p className="text-sm text-white/80 mt-4">{description}</p>
    </div>
  );
}
