import { PathLike as ParsedPath } from "fs";
import path from "path";

export function checkCwd(): string {
  let cwd = process.cwd();

  if (!(path.parse(cwd).base === "semantic-spectrum")) {
    let errMsg = "Aborting: not in the semantic-spectrum directory, instead: " +
      cwd;
    console.error(errMsg);
    throw (Error(errMsg));
  }
  return cwd;
}
