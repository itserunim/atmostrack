"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the GaugeChart (client-side only)
const GaugeChart = dynamic(() => import("react-gauge-component"), { ssr: false });

export default function PressureCard({ pressure = null }) {
  const [containerWidth, setContainerWidth] = useState(1);
  const containerRef = useRef(null);

  // Show placeholder if value not yet available
  const displayPressure = pressure === null ? 1010 : pressure;

  // Real atmospheric categories
  let description = "";
  if (pressure === null) description = "Waiting for data...";
  else if (pressure < 995) description = "Very low pressure";
  else if (pressure < 1008) description = "Unsettled weather";
  else if (pressure < 1020) description = "Normal stable conditions";
  else if (pressure < 1030) description = "Fair and clear weather";
  else description = "Very high pressure";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial width immediately
    setContainerWidth(container.offsetWidth);

    const resizeObserver = new ResizeObserver(() => {
      if (container) setContainerWidth(container.offsetWidth);
    });

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  // Fixed standard pressure scale: 950 → 1050 hPa
  const minHpa = 950;
  const maxHpa = 1050;
  const pct = ((displayPressure - minHpa) / (maxHpa - minHpa)) * 100;

  return (
    <div
      ref={containerRef}
      className="neumorph flex flex-col items-center justify-center w-full max-h-60 text-center"
    >
      <h2 className="text-xl font-bold text-white/95 uppercase tracking-wide">Pressure</h2>

      {/* Responsive width container */}
      <div className="w-full max-w-[150px] sm:max-w-md h-[120px] sm:h-60 flex items-center justify-center">
        <GaugeChart
          key={containerWidth}
          id="pressure-gauge"
          value={pct}
          type="semicircle"
          arc={{
            width: 0.3,
            padding: 0,
            cornerRadius: 4,
            gradient: true,
            subArcs: [
              { limit: 10, color: "#1d37e3ff" }, // Very low
              { limit: 30, color: "#4258e6ff" }, // Low
              { limit: 50, color: "#f5f2e4ff" }, // Normal
              { limit: 70, color: "#ee9a5aff" }, // High
              { limit: 100, color: "#ef3817ff" }, // Very high
            ],
          }}
          labels={{ tickLabels: { hideMinMax: true, hideValue: true } }}
          pointer={{ type: "arrow", color: "#ffffffff", length: 0.7, width: 8 }}
          animate={true}
        />
      </div>

      <div className="text-sm font-bold text-white/95 mt-2">
        {pressure === null ? "--" : displayPressure.toFixed(1)} hPa
      </div>
      <div className="text-sm text-white/80 mt-2">{description}</div>
    </div>
  );
}
