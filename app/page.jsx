"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// --- Dynamic imports (client-side only) ---
const TimeBasedBackground = dynamic(() => import("../components/TimeBasedBackground"), { ssr: false });
const TemperatureCard = dynamic(() => import("../components/TemperatureCard"), { ssr: false });
const HumidityCard = dynamic(() => import("../components/HumidityCard"), { ssr: false });
const PressureCard = dynamic(() => import("../components/PressureCard"), { ssr: false });
const WindCard = dynamic(() => import("../components/WindCard"), { ssr: false });
const ForecastGraph = dynamic(() => import("../components/ForecastGraph"), { ssr: false });
const RainCard = dynamic(() => import("../components/RainCard"), { ssr: false });
const ControlPanel = dynamic(() => import("../components/ControlPanel"), { ssr: false });
const StatusIndicator = dynamic(() => import("../components/StatusIndicator"), { ssr: false });

const MQTT_SERVER = "wss://broker.hivemq.com:8884/mqtt";

export default function DashboardPage() {
  const [now, setNow] = useState(new Date());
  const [espConnected, setEspConnected] = useState(false);

  // --- Sensor states ---
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [ledOn, setLedOn] = useState(false);
  const [rainValue, setRainValue] = useState(null); // <- fixed
  const [lightValue, setLightValue] = useState(null);
  const [windMsPerRotation, setWindMsPerRotation] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [windHeading, setWindHeading] = useState(null);

  const mqttClientRef = useRef(null);
  const lastHeartbeatRef = useRef(Date.now());
  const hourlyReadings = useRef({});

  const [forecastLabels, setForecastLabels] = useState([]);
  const [forecastData, setForecastData] = useState([]);

  const TOPIC_LED = "esp32/led";
  const TOPIC_TEMP = "esp32/temperature";
  const TOPIC_HUM = "esp32/humidity";
  const TOPIC_PRESS = "esp32/pressure";
  const TOPIC_RAIN = "esp32/rain";
  const TOPIC_LIGHT = "esp32/light";
  const TOPIC_WINDSPD = "esp32/windspeed";
  const TOPIC_WINDDIR = "esp32/winddirection";
  const TOPIC_HEARTBEAT = "esp32/heartbeat";

  const topics = [
    TOPIC_LED, TOPIC_TEMP, TOPIC_HUM, TOPIC_PRESS,
    TOPIC_RAIN, TOPIC_LIGHT, TOPIC_WINDSPD, TOPIC_WINDDIR, TOPIC_HEARTBEAT
  ];

  // --- MQTT Setup ---
  useEffect(() => {
    async function initMQTT() {
      const mqttModule = await import("mqtt");
      const mqtt = mqttModule.default;

      const client = mqtt.connect(MQTT_SERVER, {
        clientId: "dashboard-" + Math.random().toString(16).slice(2, 10),
        reconnectPeriod: 1000,
      });

      mqttClientRef.current = client;

      const handleDisconnect = () => {
        setEspConnected(false);
        setTemperature(null);
        setHumidity(null);
        setPressure(null);
        setWindSpeed(null);
        setWindHeading(null);
        setRainValue(null);
        setLedOn(false);
        setLightValue(null);
      };

      client.on("close", handleDisconnect);
      client.on("offline", handleDisconnect);
      client.on("error", handleDisconnect);

      client.on("message", (topic, message) => {
        const msg = message.toString();
        const num = parseFloat(msg);

        switch (topic) {
          case TOPIC_HEARTBEAT:
            lastHeartbeatRef.current = Date.now();
            setEspConnected(true);
            break;

          case TOPIC_TEMP: setTemperature(!isNaN(num) ? num : 0); break;
          case TOPIC_HUM: setHumidity(!isNaN(num) ? num : 0); break;
          case TOPIC_PRESS: setPressure(!isNaN(num) ? num : 0); break;
          case TOPIC_LED: setLedOn(msg === "ON"); break;

          case TOPIC_RAIN: {
            if (!isNaN(num)) {
              setRainValue(num);
              console.log("MQTT rain received:", num); // <- debug
            } else {
              setRainValue(0);
            }
            break;
          }

          case TOPIC_LIGHT: setLightValue(!isNaN(num) ? num : 0); break;
          case TOPIC_WINDSPD:
            if (!isNaN(num) && num > 0) {
              setWindMsPerRotation(num);
              setWindSpeed((1000 / num) * 60 * 0.05);
            } else {
              setWindMsPerRotation(0);
              setWindSpeed(0);
            }
            break;
          case TOPIC_WINDDIR: setWindHeading(!isNaN(num) ? num : 0); break;
          default: console.warn("Unhandled topic:", topic, msg);
        }

        hourlyReadings.current = {
          temperature: !isNaN(temperature) ? temperature : 0,
          humidity: !isNaN(humidity) ? humidity : 0,
          pressure: !isNaN(pressure) ? pressure : 0,
          wind_speed: !isNaN(windSpeed) ? windSpeed : 0,
          rain: !isNaN(rainValue) ? rainValue : 0,
        };
      });

      client.on("connect", () => topics.forEach(t => client.subscribe(t)));
    }

    initMQTT();
    return () => {
      if (mqttClientRef.current) mqttClientRef.current.end();
    };
  }, []);

  // --- Heartbeat & Clock ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastHeartbeatRef.current > 5000) setEspConnected(false);
      setNow(new Date());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // --- Hourly save ---
  useEffect(() => {
    const interval = setInterval(() => {
      async function saveReading() {
        try {
          await fetch("/api/saveReading", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(hourlyReadings.current),
          });
        } catch (err) {
          console.error("Failed to save hourly reading:", err);
        }
      }
      saveReading();
    }, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  // --- Forecast ---
  useEffect(() => {
    async function fetchForecast() {
      try {
        const res = await fetch(`/api/hourlyReadings?range=1D`);
        const data = await res.json();

        const currentHour = new Date().getHours();
        const labels = Array.from({ length: currentHour + 1 }, (_, i) => {
          const h = i % 12 === 0 ? 12 : i % 12;
          const ampm = i < 12 ? "AM" : "PM";
          return `${h}:00 ${ampm}`;
        });
        const values = data.slice(0, labels.length).map(d => d.temperature);
        setForecastLabels(labels);
        setForecastData(values);
      } catch (err) {
        console.error("Failed to fetch forecast:", err);
      }
    }
    fetchForecast();
  }, []);

  return (
    <TimeBasedBackground lightValue={lightValue}>
      <div className="min-h-screen mx-auto p-4 space-y-4">
        <header className="neumorph p-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between mb-6 h-18">
          <div className="flex sm:hidden items-center justify-center space-x-3 w-full">
            <img src="/atmostrack-logo.svg" alt="AtmosTrack" className="w-30 h-auto" />
            <StatusIndicator status={espConnected ? "Online" : "Offline"} />
            <p className="text-[12px] text-white/95">
              {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <img src="/atmostrack-logo.svg" alt="AtmosTrack" className="w-40 h-auto" />
          </div>
          <div className="hidden sm:flex font-bold text-[12px] text-white/95">Subscribed Topics:</div>
          <div className="hidden sm:flex items-start space-x-2 text-[12px] text-white/95 w-[500px]">
            <div className="break-words text-center">{topics.join(" | ")}</div>
          </div>
          <div className="hidden sm:flex items-center space-x-5">
            <StatusIndicator status={espConnected ? "Online" : "Offline"} />
            <p className="text-[13px] w-15 text-white/95">
              {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div className="neumorph h-152 sm:col-span-2 md:col-span-1 lg:row-span-2">
            <TemperatureCard current={espConnected ? temperature : null} />
          </div>
          <div><HumidityCard humidity={espConnected ? humidity : null} /></div>
          <div><PressureCard pressure={espConnected ? pressure : null} /></div>
          <div><WindCard speed={espConnected ? windSpeed : null} heading={espConnected ? windHeading : null} /></div>

          {/* ✅ Updated RainCard */}
          <div><RainCard rainValue={espConnected ? rainValue : null} online={espConnected} /></div>

          <div className="sm:col-span-2 md:col-span-1 lg:col-start-5 lg:row-start-2">
            <ControlPanel initial={ledOn} online={espConnected} />
          </div>
          <div className="sm:col-span-2 md:col-span-2 lg:col-span-3 lg:col-start-2 lg:row-start-2">
            <ForecastGraph labels={forecastLabels} data={forecastData} />
          </div>
        </div>
      </div>
    </TimeBasedBackground>
  );
}
