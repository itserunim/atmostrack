"use client";
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const GaugeChart = dynamic(() => import('react-gauge-component'), { ssr: false });

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const PressureCard = ({ pressure: initial = 1013 }) => {
  const [pressure, setPressure] = useState(initial);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  // ---- PRESSURE CATEGORY ----
  let category = '';
  let description = '';

  if (pressure < 995) category = 'very low';
  else if (pressure < 1005) category = 'low';
  else if (pressure < 1018) category = 'normal';
  else if (pressure < 1030) category = 'high';
  else category = 'high';

  if (category === 'very low') description = 'Stormy weather — expect significant changes.';
  else if (category === 'low') description = 'Chance of rain — consider carrying an umbrella.';
  else if (category === 'normal') description = 'Stable weather — no significant changes expected.';
  else description = 'Likely clear skies — enjoy your day!';

  // ---- SIMULATED PRESSURE UPDATES ----
  useEffect(() => {
    const id = setInterval(() => {
      setPressure(prev => {
        const delta = (Math.random() - 0.5) * 1.2;
        return clamp(Math.round((prev + delta) * 10) / 10, 950, 1050);
      });
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // ---- MAKE GAUGE RESPONSIVE ----
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setContainerWidth(containerRef.current.offsetWidth);
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // Map pressure (950-1050) to 0–100%
  const min = 950;
  const max = 1050;
  const pct = Math.round(((pressure - min) / (max - min)) * 100);

  return (
    <div ref={containerRef} className="neumorph flex flex-col items-center justify-center w-full h-full text-center p-2">

      <h2 className="text-xl font-bold text-white/95 uppercase tracking-wide">Pressure</h2>

      <div className="w-full flex items-center justify-center mt-2">
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
              { limit: 10, color: "#1d37e3ff" },
              { limit: 30, color: "#4258e6ff" },
              { limit: 50, color: "#f5f2e4ff" },
              { limit: 70, color: "#ee9a5aff" },
              { limit: 100, color: "#ef3817ff" }
            ]
          }}
          pointer={{
            type: "arrow",
            color: "#ffffffff",
            length: 0.7,
            width: 15,
            elastic: false
          }}
          animate={true}
        />
      </div>

      <div className="text-2xl font-bold text-white/95 mt-2">{pressure} hPa</div>
      <div className="text-sm text-white/95 mt-2">{description}</div>
    </div>
  );
};

export default PressureCard;