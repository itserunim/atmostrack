"use client";
import React, { useEffect, useState } from "react";
import mqtt from "mqtt";

const MQTT_SERVER = "wss://broker.hivemq.com:8884/mqtt";
const TOPIC_LDR = "esp32/ldr";
const TOPIC_RAIN = "esp32/rain";

export default function TimeBasedBackground({ children }) {
  const [timeOfDay, setTimeOfDay] = useState("day");
  const [ldr, setLdr] = useState(null);
  const [rain, setRain] = useState(null);
  const [client, setClient] = useState(null);

  // --------------------------
  // TIME-BASED BACKGROUND
  // --------------------------
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 9) setTimeOfDay("morning");
    else if (hour >= 9 && hour < 17) setTimeOfDay("day");
    else if (hour >= 17 && hour < 20) setTimeOfDay("evening");
    else setTimeOfDay("night");
  }, []);

  // --------------------------
  // MQTT CONNECT
  // --------------------------
  useEffect(() => {
    const mqttClient = mqtt.connect(MQTT_SERVER, {
      clientId: "bgclient-" + Math.random().toString(16).slice(2),
    });

    mqttClient.on("connect", () => {
      console.log("Background: Connected to MQTT");
      mqttClient.subscribe(TOPIC_LDR);
      mqttClient.subscribe(TOPIC_RAIN);
    });

    mqttClient.on("message", (topic, message) => {
      const value = Number(message.toString());

      if (topic === TOPIC_LDR) setLdr(value);
      if (topic === TOPIC_RAIN) setRain(value);
    });

    setClient(mqttClient);

    return () => mqttClient.end();
  }, []);

  // --------------------------
  // BACKGROUND SELECTION LOGIC
  // --------------------------
  let final = timeOfDay;

  // 1. Rain overrides everything
  if (rain !== null && rain < 3000) {
    final = "rainy";
  }
  // 2. LDR overrides based on brightness
  else if (ldr !== null) {
    if (ldr < 2000) final = "night";
    else if (ldr > 3500) final = "day";
  }

  // --------------------------
  // BACKGROUND IMAGES
  // --------------------------
  const bgImage = {
    morning: "/bg/sunrise.svg",
    day: "/bg/day.svg",
    evening: "/bg/sunset.svg",
    night: "/bg/night.svg",
    rainy: "/bg/rainy.svg", // NEW
  }[final];

  // --------------------------
  // COLOR OVERLAY
  // --------------------------
  const overlayClass = {
    morning: "bg-gradient-to-b from-yellow-50 via-white/40 to-transparent",
    day: "bg-gradient-to-b from-sky-50 via-white/30 to-transparent",
    evening: "bg-gradient-to-b from-orange-50 via-amber-50 to-transparent",
    night: "bg-gradient-to-b from-black/60 via-black/40 to-transparent",
    rainy: "bg-gradient-to-b from-blue-900/40 via-blue-800/40 to-transparent",
  }[final];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-700"
      style={{ backgroundImage: `url(${bgImage})` }}
      data-bg={final}
    >
      <div className={`${overlayClass} min-h-screen`}>
        {children}
      </div>
    </div>
  );
}
