"use client";
import React, { useEffect, useState } from "react";

export default function TimeBasedBackground({ children, lightValue = 1000 }) {
  const [smoothedLight, setSmoothedLight] = useState(lightValue);
  const [timeOfDay, setTimeOfDay] = useState("day");

  // --------------------------
  // Smooth light value using linear interpolation
  // --------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      // Smoothly interpolate: 90% previous + 10% new
      setSmoothedLight(prev => prev * 0.9 + lightValue * 0.1);
    }, 10); // update every 10ms

    return () => clearInterval(interval);
  }, [lightValue]);

  // --------------------------
  // Map smoothed light to time of day
  // --------------------------
  useEffect(() => {
    function mapLightToTime(light) {
      // ESP32 ADC: 0 (dark) → 4095 (bright)
      if (light > 4000) return "night";
      else if (light > 2500 && light < 4000) return "evening";
      else if (light > 1000 && light < 2500) return "day";
      else return "morning";
    }
    setTimeOfDay(mapLightToTime(smoothedLight));
  }, [smoothedLight]);

  // --------------------------
  // Background images
  // --------------------------
  const bgImageMap = {
    morning: "/bg/sunrise.svg",
    day: "/bg/day.svg",
    evening: "/bg/sunset.svg",
    night: "/bg/night.svg",
  };
  const bgImage = bgImageMap[timeOfDay];

  // --------------------------
  // Overlay classes
  // --------------------------
  const overlayClassMap = {
    morning: "bg-gradient-to-b from-yellow-50 via-white/40 to-transparent",
    day: "bg-gradient-to-b from-sky-50 via-white/30 to-transparent",
    evening: "bg-gradient-to-b from-orange-50 via-amber-50 to-transparent",
    night: "bg-gradient-to-b from-black/60 via-black/40 to-transparent",
  };
  const overlayClass = overlayClassMap[timeOfDay];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url(${bgImage})` }}
      data-bg={timeOfDay}
    >
      <div className={`${overlayClass} min-h-screen transition-all duration-1000`}>
        {children}
      </div>
    </div>
  );
}
