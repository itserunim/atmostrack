"use client";
"use client";
import React, { useEffect, useState } from "react";

const TimeBasedBackground = ({ children }) => {
  const [timeOfDay, setTimeOfDay] = useState("day");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 9) setTimeOfDay("morning");
    else if (hour >= 9 && hour < 17) setTimeOfDay("day");
    else if (hour >= 17 && hour < 20) setTimeOfDay("evening");
    else setTimeOfDay("night");
  }, []);

  const bgImage = {
    morning: "/bg/sunrise.svg",
    day: "/bg/day.svg",
    evening: "/bg/sunset.svg",
    night: "/bg/night.svg",
  }[timeOfDay];

  const overlayClass = {
    morning: "bg-gradient-to-b from-yellow-50 via-white/40 to-transparent",
    day: "bg-gradient-to-b from-sky-50 via-white/30 to-transparent",
    evening: "bg-gradient-to-b from-orange-50 via-amber-50 to-transparent",
    night: "bg-gradient-to-b from-black/60 via-black/40 to-transparent",
  }[timeOfDay];

  return (
    <div
      className={`min-h-screen transition-colors duration-700 bg-center bg-no-repeat bg-cover`} 
      style={{ backgroundImage: `url(${bgImage})` }} date-time={timeOfDay}
    >
      <div className={`${overlayClass} min-h-screen`}>
        {children}
      </div>
    </div>
  );
};

export default TimeBasedBackground;
