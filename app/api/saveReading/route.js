import { query } from "../../../lib/dib";

export async function POST(req) {
  try {
    const body = await req.json();
    const { temperature, humidity, pressure, wind_speed, rain } = body;

    await query(
      `INSERT INTO sensor_logs (timestamp, temperature, humidity, pressure, wind_speed, rain)
       VALUES (NOW(), $1, $2, $3, $4, $5)`,
      [temperature, humidity, pressure, wind_speed, rain]
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to save reading" }), { status: 500 });
  }
}
