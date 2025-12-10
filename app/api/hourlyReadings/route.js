import { query } from "../../../lib/dib";

export async function GET(req) {
  try {
    const range = req.nextUrl.searchParams.get("range") || "1D";

    let sql = "";
    if (range === "1D") {
      sql = `
        SELECT * FROM sensor_logs
        WHERE timestamp >= NOW() - INTERVAL '24 HOURS'
        ORDER BY timestamp ASC
      `;
    } else if (range === "5D") {
      sql = `
        SELECT * FROM sensor_logs
        WHERE timestamp >= NOW() - INTERVAL '5 DAYS'
        ORDER BY timestamp ASC
      `;
    } else {
      return new Response(JSON.stringify({ error: "Invalid range" }), { status: 400 });
    }

    const result = await query(sql);
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch readings" }), { status: 500 });
  }
}
