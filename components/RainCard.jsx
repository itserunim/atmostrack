"use client";
import React, { useState, useEffect, useRef } from "react";
import { WiRaindrop, WiRaindrops, WiRain } from 'react-icons/wi';

const RainCard = ({ intensity = 2.5 }) => {
  let category = 'light';
  if (intensity >= 0 && intensity < 2.5) category = 'light';
  else if (intensity >= 2.5 && intensity < 7.6) category = 'moderate';
  else category = 'heavy';

  let Icon = WiRaindrop;
    let iconSize = 'text-9xl';
    let description = 'Light rain — carry an umbrella just in case.';
  
    if (category === 'light') {
      Icon = WiRaindrop;
      iconSize = 'text-9xl';
      description = 'Light rain — carry an umbrella just in case.';
    } else if (category === 'moderate') {
      Icon = WiRaindrops;
      iconSize = 'text-9xl';
      description = 'Moderate rain — take an umbrella with you.';
    } else {
      Icon = WiRain;
      iconSize = 'text-9xl';
      description = 'Heavy rain — stay indoors if possible.';
    }

  return (
    <div className="neumorph flex flex-col items-center justify-center h-full w-full text-center">
      <h2 className="text-xl font-bold text-white/95 uppercase tracking-wide">Precipitation</h2>
      <div className={`${iconSize} h-25 text-white/95 transition-transform`}>
        <Icon />
      </div>
      <div className="text-l font-bold text-white/95">Intensity: {intensity} mm/h</div>
      <div className="text-l font-bold text-white/95">Total Today: {intensity} mm</div>
      <p className="text-sm text-white/95 mt-3">{description}</p>
    </div>
  );
};

export default RainCard;