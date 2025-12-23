import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const filePath = path.join(process.cwd(), "data", "available-meals.json");
    const raw = await fs.readFile(filePath, "utf8");
    const meals = JSON.parse(raw);
    return res.status(200).json(meals);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to read meals" });
  }
}
