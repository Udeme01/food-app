import fs from "fs/promises";
import path from "path";

// WARNING: Writing to local disk in Vercel serverless functions is ephemeral.
// For production persistence, use an external DB (Supabase, Postgres, etc.).

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const orderData = req.body?.order || req.body;
    if (!orderData || !orderData.items || orderData.items.length === 0) {
      return res.status(400).json({ message: "Missing order data" });
    }

    const ordersPath = path.join(process.cwd(), "data", "orders.json");
    const raw = await fs.readFile(ordersPath, "utf8").catch(() => "[]");
    const orders = JSON.parse(raw || "[]");
    const newOrder = { ...orderData, id: (Math.random() * 1000).toString() };
    orders.push(newOrder);
    await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2));

    return res.status(201).json({ message: "Order received", orderId: newOrder.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to save order" });
  }
}
