"use client";
import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const HumidityCard = ({ humidity = 90 }) => {
  return (
    <div className="neumorph p-6 flex flex-col items-center justify-center text-center w-full h-full">
      <h2 className="text-xl font-bold text-white/95 uppercase tracking-wide">Humidity</h2>
      <div className="w-40 h-40 my-4 font-semibold">
        <CircularProgressbar
          value={humidity}
          text={`${humidity}%`}
          styles={buildStyles({
            textColor: 'rgba(255,255,255,0.95)',
            pathColor: '#60fa60ff',
            trailColor: 'rgba(255,255,255,0.12)',
          })}
        />
      </div>
      <p className="text-sm text-white/95">{humidity > 70 ? 'Wetter environment.' : 'Comfortable environment.'}</p>
    </div>
  );
};

export default HumidityCard;
