import { readFileSync } from "fs";

export const jsonToObj = <T>(inputPath: string): T =>
  JSON.parse(readFileSync(inputPath).toString());
