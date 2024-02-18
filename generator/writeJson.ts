import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs";
import path from "path";

export function writeJson(
  directory: string,
  jsonOut: {
    filePath: string;
    contents: string;
  }
) {
  directory = path.join(process.cwd(), directory);
  console.log(directory);
  if (!existsSync(directory)) {
    mkdirSync(directory);
  } else if (existsSync(jsonOut.filePath)) {
    rmSync(jsonOut.filePath);
  }
  writeFileSync(jsonOut.filePath, jsonOut.contents);
}
