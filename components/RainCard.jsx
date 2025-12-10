"use client";
import React, { useState, useEffect, useRef } from "react";
import { WiRaindrop, WiRaindrops, WiRain, WiShowers } from 'react-icons/wi';

// --- Convert raw analog rain sensor value to mm/h ---
function convertAnalogRain(raw) {
  if (raw === null) return null;

  // Invert: 0 = heavy rain, 4095 = no rain
  const inverted = 4095 - raw;

  // Scale to mm/h (adjust divisor for your sensor)
  const mmh = inverted / 400;

  return Math.max(0, mmh);  // prevent negatives
}

export default function RainCard({ rainValue = null, online = true }) {
  const [displayIntensity, setDisplayIntensity] = useState(null);
  const totalRef = useRef(0);
  const bufferRef = useRef([]);

  useEffect(() => {
    if (!online) {
      setDisplayIntensity(null);
      bufferRef.current = [];
      return;
    }

    const interval = setInterval(() => {
      if (rainValue !== null) {
        const mmh = convertAnalogRain(rainValue);

        bufferRef.current.push(mmh);
        if (bufferRef.current.length > 5) bufferRef.current.shift();

        const avg = bufferRef.current.reduce((a, b) => a + b, 0) / bufferRef.current.length;
        setDisplayIntensity(avg);

        totalRef.current += avg / 3600;
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [rainValue, online]);

  const safeDisplay = val => val === null ? "--" : val.toFixed(2);

  let Icon = WiShowers;
  let description = online ? "Waiting for data..." : "Waiting for data...";

  if (displayIntensity !== null) {
    if (displayIntensity === 0) { Icon = WiShowers; description = 'No rain'; }
    else if (displayIntensity < 0.5) { Icon = WiShowers; description = 'Drizzle'; }
    else if (displayIntensity < 2) { Icon = WiRaindrop; description = 'Light rain'; }
    else if (displayIntensity < 10) { Icon = WiRaindrops; description = 'Moderate rain'; }
    else { Icon = WiRain; description = 'Heavy rain'; }
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
