"use client";
import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import mqtt from "mqtt";

const MQTT_SERVER = "wss://broker.hivemq.com:8884/mqtt";
const MQTT_BME_TOPIC = "esp32/bme";

const HumidityCard = () => {
  const [humidity, setHumidity] = useState(0);
  const [client, setClient] = useState(null);

  // Connect to MQTT broker
  useEffect(() => {
    const mqttClient = mqtt.connect(MQTT_SERVER, {
      clientId: "webclient-humidity-" + Math.random().toString(16).substring(2, 10),
    });

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker for BME280 humidity");
      mqttClient.subscribe(MQTT_BME_TOPIC);
    });

    mqttClient.on("message", (topic, payload) => {
      if (topic === MQTT_BME_TOPIC) {
        try {
          const data = JSON.parse(payload.toString());
          if (data.humidity !== undefined) setHumidity(data.humidity);
        } catch (e) {
          console.error("Failed to parse BME message:", e);
        }
      }
    });

    setClient(mqttClient);

    return () => mqttClient.end();
  }, []);

  return (
    <div className="neumorph p-6 flex flex-col items-center justify-center w-full">
      <h2 className="text-sm font-bold text-white/90 uppercase">Humidity</h2>
      <div className="w-40 h-40 my-4">
        <CircularProgressbar
          value={humidity}
          text={`${humidity}%`}
          styles={buildStyles({
            textColor: 'rgba(255,255,255,0.95)',
            pathColor: '#60a5fa',
            trailColor: 'rgba(255,255,255,0.12)',
          })}
        />
      </div>
      <p className="text-sm text-white/80">
        {humidity > 70 ? 'Wetter environment.' : 'Comfortable environment.'}
      </p>
    </div>
  );
};

export default HumidityCard;
