"use client";
import React, { useState, useEffect } from "react";
import { WiStrongWind, WiWindy, WiCloudyWindy } from "react-icons/wi";

const MQTT_SERVER = "wss://broker.hivemq.com:8884/mqtt";
const MQTT_TOF_TOPIC = "esp32/tof";
const MQTT_DIR_TOPIC = "esp32/dir";  // <-- added

export default function WindCard() {
  const [tof, setTof] = useState(null);
  const [direction, setDirection] = useState("N"); // <-- new

  useEffect(() => {
    const client = window.mqtt?.connect(MQTT_SERVER, {
      clientId: "webclient-" + Math.random().toString(16).substring(2, 10),
    });

    client?.on("connect", () => {
      console.log("Web: Connected to MQTT Broker");

      client.subscribe(MQTT_TOF_TOPIC);
      client.subscribe(MQTT_DIR_TOPIC); // <-- subscribe
    });

    client?.on("message", (topic, message) => {
      const value = message.toString();

      if (topic === MQTT_TOF_TOPIC) {
        setTof(Number(value));
      }

      if (topic === MQTT_DIR_TOPIC) {
        setDirection(value);   // <-- update direction live
      }
    });

    return () => client?.end();
  }, []);

  const speed = tof ? Math.min(Math.floor(tof / 10), 120) : 0;

  // Determine wind category
  let category = "calm";
  if (speed > 19 && speed <= 38) category = "breeze";
  else if (speed > 38) category = "strong";

  // Choose icon & description
  let Icon = WiWindy;
  let iconSize = "text-6xl";
  let description = "The breeze makes you feel comfortable.";

  if (category === "calm") {
    Icon = WiWindy;
    iconSize = "text-8xl";
    description = "Calm conditions — pleasant and still.";
  } else if (category === "breeze") {
    Icon = WiCloudyWindy;
    iconSize = "text-8xl";
    description = "A gentle breeze — comfortable conditions.";
  } else {
    Icon = WiStrongWind;
    iconSize = "text-6xl";
    description = "Strong wind — secure loose objects and take care.";
  }

  return (
    <div className="neumorph p-6 flex flex-col items-center justify-center h-full w-full text-center">
      <h2 className="text-sm font-bold text-white/90 uppercase">Wind</h2>

      <div className={`${iconSize} text-white/95 my-2 transition-transform`}>
        <Icon />
      </div>

      <div className="text-4xl font-bold text-white/95">
        {speed} {direction}
      </div>

      <div className="text-sm text-white/80 mt-1">{speed} km/h</div>

      <p className="text-sm text-white/70 mt-3">{description}</p>
    </div>
  );
}
