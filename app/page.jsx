import React from "react";
import TimeBasedBackground from "../components/TimeBasedBackground";
import TemperatureCard from "../components/TemperatureCard";
import HumidityCard from "../components/HumidityCard";
import PressureCard from "../components/PressureCard";
import ForecastGraph from "../components/ForecastGraph";
import RainCard from "../components/RainCard";
import ControlPanel from "../components/ControlPanel";
import StatusIndicator from "../components/StatusIndicator";

export default function DashboardPage() {
    const now = new Date();
    const sampleForecast = {
        labels: ["Now", "1h", "2h", "3h", "4h", "5h"],
        data: [22, 22.5, 23, 22.8, 21.9, 21],
    };

    const controls = [
        { id: 1, name: "Heater", state: false },
        { id: 2, name: "Humidifier", state: true },
        { id: 3, name: "Vent", state: false },
    ];

    const topics = ['weather/temp','weather/humidity','weather/pressure', 'weather/wind', 'weather/rain'];

    return (
        <TimeBasedBackground>
            <div className="min-h-screen mx-auto p-6 space-y-6">
                <header className="neumorph p-4 flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <img src="/atmostrack-logo.svg" alt="AtmosTrack" className="w-60 h-auto" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="font-bold text-sm text-white/95">Subscribed Topics:</div>
                        <div className="text-sm text-white/95 text-center">
                            {topics.join(' | ')}
                        </div>
                        <StatusIndicator status="online" />
                        <p className="text-sm text-white/95">Updated: {now.toLocaleTimeString()}</p>
                    </div>
                </header>

                <div className="grid grid-cols-4 grid-rows-2 gap-6">
                                        
                    <div className="row-span-2 neumorph flex items-center justify-center p-4 w-full h-full">
                        <TemperatureCard current={30} min={15} max={45} />
                    </div>

                    <div className="w-full h-full">
                        <HumidityCard humidity={65} />
                    </div>
                    <div className="w-full h-full">
                        <PressureCard pressure={1013} />
                    </div>
                    <div className="w-full h-full">
                        <RainCard intensity={2.5} />
                    </div>
                    <div className="col-start-4 row-start-2">
                        <ControlPanel initial={true} />
                    </div>
                    <div className="col-span-2 col-start-2 row-start-2">
                        <ForecastGraph labels={sampleForecast.labels} data={[22,21,22,23,24,25,23]} />
                    </div>
                </div>
            </div>
        </TimeBasedBackground>
    );
}