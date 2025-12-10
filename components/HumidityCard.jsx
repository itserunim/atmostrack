"use client";
import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const HumidityCard = ({ humidity = null }) => {
  // Show placeholder if value not yet available
  const displayHumidity = humidity === null ? 0 : humidity;

  let desc = "";
  if (humidity === null) desc = "Waiting for data...";
  else if (humidity < 30) desc = "Dry environment";
  else if (humidity <= 60) desc = "Comfortable humidity";
  else desc = "Humid environment";

  return (
    <div className="neumorph p-6 flex flex-col items-center text-center w-full h-60">
      <h2 className="text-xl font-bold text-white/95 uppercase tracking-wide -m-1">Humidity</h2>

      <div className="my-4" style={{ width: 120, height: 120 }}>
        <CircularProgressbar
          value={displayHumidity}
          text={humidity === null ? "--%" : `${humidity.toFixed(1)}%`}
          styles={buildStyles({
            textColor: 'rgba(255,255,255,0.95)',
            pathColor: '#60fa60ff',
            trailColor: 'rgba(255,255,255,0.12)',
          })}
        />
      </div>

      <p className="text-sm text-white/80">{desc}</p>
    </div>
  );
};

export default HumidityCard;
