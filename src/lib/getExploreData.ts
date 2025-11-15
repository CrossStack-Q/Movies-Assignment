import fs from "fs";
import path from "path";

export function getExploreData() {
  const filePath = path.join(process.cwd(), "src/data/explore.json");
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}
