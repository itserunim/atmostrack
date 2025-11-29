export default function HomePage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to AtmosTrack</h1>
      <p className="text-lg text-slate-600 max-w-xl">
        A responsive, neumorphism-inspired weather monitoring dashboard with
        real‑time MQTT data and dynamic time‑based background.
      </p>
    </div>
  );
}