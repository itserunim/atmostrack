"use client";
import React from "react";
import { WiStrongWind } from 'react-icons/wi';

const WindCard = ({ speed = 8, direction = 'SE' }) => {
  return (
    <div className="neumorph p-6 flex flex-col items-center justify-center w-full text-center">
      <h2 className="text-sm font-semibold text-white/90 uppercase">Wind</h2>
      <div className="text-6xl text-white/95 my-2"><WiStrongWind /></div>
      <div className="text-4xl font-bold text-white/95">2 {direction}</div>
      <div className="text-sm text-white/80 mt-1">{speed} km/h</div>
      <p className="text-sm text-white/70 mt-3">The breeze makes you feel comfortable.</p>
    </div>
  );
};

export default WindCard;
